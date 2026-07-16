"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { FiCheck, FiDownload, FiFileText, FiRefreshCw, FiSearch } from "react-icons/fi";
import type { StoredLead } from "@/lib/lead-store";
import styles from "../admin.module.css";

type Props = { user: string };

function sourceOf(record: StoredLead) {
  const touch = record.attribution?.lastTouch;
  if (touch?.utm_source) return touch.utm_source;
  if (touch?.referrer) {
    try { return new URL(touch.referrer).hostname.replace(/^www\./, ""); } catch { return touch.referrer; }
  }
  return "Прямой переход";
}

function campaignOf(record: StoredLead) {
  return record.attribution?.lastTouch.utm_campaign || "Без кампании";
}

function date(value?: string) {
  return value ? new Intl.DateTimeFormat("ru-RU", { dateStyle: "short", timeStyle: "short", timeZone: "Europe/Moscow" }).format(new Date(value)) : "—";
}

export default function LeadsDashboard({ user }: Props) {
  const [records, setRecords] = useState<StoredLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [busyId, setBusyId] = useState("");

  async function load() {
    setLoading(true);
    const response = await fetch("/api/admin/leads", { cache: "no-store" });
    if (response.ok) setRecords((await response.json()).records);
    setLoading(false);
  }

  useEffect(() => { void load(); }, []);

  const filtered = useMemo(() => records.filter((record) => {
    if (status !== "all" && record.status !== status) return false;
    const haystack = [record.id, record.lead.name, record.lead.phone, record.lead.source, sourceOf(record), campaignOf(record)].join(" ").toLowerCase();
    return haystack.includes(query.toLowerCase());
  }), [records, query, status]);

  const valid = records.filter((record) => record.status === "valid").length;
  const grouped = useMemo(() => {
    const map = new Map<string, number>();
    records.forEach((record) => map.set(sourceOf(record), (map.get(sourceOf(record)) || 0) + 1));
    return [...map.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6);
  }, [records]);

  async function qualify(id: string) {
    setBusyId(id);
    const response = await fetch("/api/admin/leads", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    if (response.ok) {
      const { record } = await response.json();
      setRecords((current) => current.map((item) => item.id === id ? record : item));
    }
    setBusyId("");
  }

  return <main className={`${styles.cmsPage} ${styles.leadsPage}`}>
    <header className={styles.cmsTopbar}>
      <div><span className={styles.cmsMark}>IAM</span><div><strong>Заявки и аналитика</strong><span>Менеджер: {user}</span></div></div>
      <div className={styles.topbarActions}>
        <Link href="/admin/blog" className={styles.iconTextButton}><FiFileText />Статьи</Link>
        <a href="/api/admin/leads/export" className={styles.iconTextButton}><FiDownload />CSV</a>
      </div>
    </header>

    <section className={styles.leadsContent}>
      <div className={styles.leadStats}>
        <article><span>Все заявки</span><strong>{records.length}</strong></article>
        <article><span>Новые</span><strong>{records.length - valid}</strong></article>
        <article><span>Качественные</span><strong>{valid}</strong></article>
        <article><span>Конверсия в валидный лид</span><strong>{records.length ? Math.round(valid / records.length * 100) : 0}%</strong></article>
      </div>

      <div className={styles.leadsOverview}>
        <div><h2>Источники</h2>{grouped.length ? grouped.map(([name, count]) => <p key={name}><span>{name}</span><strong>{count}</strong></p>) : <p className={styles.muted}>Данные появятся после первых заявок.</p>}</div>
        <div><h2>Что здесь видно</h2><p className={styles.leadsHint}>Последний источник, UTM-кампания, первая посадочная страница и рекламные Click ID. Подтверждённые заявки входят в CSV для загрузки офлайн-конверсий.</p></div>
      </div>

      <div className={styles.leadToolbar}>
        <label><FiSearch /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Имя, телефон, источник, кампания" /></label>
        <select value={status} onChange={(event) => setStatus(event.target.value)}><option value="all">Все статусы</option><option value="new">Новые</option><option value="valid">Качественные</option></select>
        <button className={styles.iconButton} onClick={() => void load()} title="Обновить"><FiRefreshCw /></button>
      </div>

      <div className={styles.leadsTableWrap}>
        <table className={styles.leadsTable}><thead><tr><th>Заявка</th><th>Контакт</th><th>Форма</th><th>Последний источник</th><th>Кампания</th><th>Идентификатор</th><th>Статус</th></tr></thead>
          <tbody>{filtered.map((record) => {
            const touch = record.attribution?.lastTouch;
            const clickId = touch?.yclid || touch?.gclid || touch?.vk_click_id || touch?.fbclid || touch?.client_id || "—";
            return <tr key={record.id}><td><strong>{record.id}</strong><small>{date(record.createdAt)}</small></td><td><strong>{record.lead.name}</strong><small>{record.lead.phone}</small></td><td>{record.lead.source}<small>{record.lead.page}</small></td><td>{sourceOf(record)}<small>{touch?.utm_medium || record.attribution?.firstTouch.referrer || "—"}</small></td><td>{campaignOf(record)}<small>{touch?.utm_content || "—"}</small></td><td className={styles.idCell}>{clickId}<small>{record.offlineConversion?.message || "Не подтверждено"}</small></td><td>{record.status === "valid" ? <span className={styles.statusValid}>Качественный</span> : <button disabled={busyId === record.id} onClick={() => void qualify(record.id)} className={styles.qualifyButton}><FiCheck /> Подтвердить</button>}</td></tr>;
          })}</tbody></table>
        {!loading && !filtered.length && <p className={styles.emptyAdmin}>Заявок по выбранным условиям нет.</p>}
        {loading && <p className={styles.emptyAdmin}>Загружаю заявки…</p>}
      </div>
    </section>
  </main>;
}
