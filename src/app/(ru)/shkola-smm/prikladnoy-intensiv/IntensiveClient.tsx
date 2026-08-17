"use client";

import { FormEvent, useEffect, useState } from "react";
import { getLeadAttribution } from "@/lib/lead-attribution";
import { trackAnalyticsGoal } from "@/lib/analytics";
import styles from "./intensive.module.css";

const DEADLINE = new Date("2026-08-27T23:59:59+03:00").getTime();

const AUDIENCES = [
  {
    title: "Фрилансер / SMM-специалист в digital",
    text: "Ускорите рутину: анализ, стратегия, контент и отчёты. Освободите время, чтобы брать больше проектов и сильнее погружаться в задачи клиентов.",
  },
  {
    title: "SMM- или маркетинговое агентство",
    text: "Встройте Claude в процессы команды: от исследования ниши до воронок и аналитики. Делайте больше без раздувания штата и потери качества.",
  },
  {
    title: "Предприниматель со своим продуктом",
    text: "Поймите, как ставить задачи нейросети для маркетинга, находить точки роста и превращать данные в решения, которые влияют на выручку.",
  },
];

const TARIFFS = [
  { id: "Старт", price: "3 990 ₽", old: "7 990 ₽", chat: "Без чата", curator: "Без куратора" },
  { id: "База", price: "7 990 ₽", old: "11 990 ₽", chat: "Общий чат", curator: "Куратор в чате" },
  { id: "Премиум", price: "13 990 ₽", old: "19 990 ₽", chat: "Общий чат", curator: "Личный куратор", unlimited: true },
];

function pad(value: number) {
  return String(Math.max(0, value)).padStart(2, "0");
}

export default function IntensiveClient() {
  const [tariff, setTariff] = useState("База");
  const [openAudience, setOpenAudience] = useState<number | null>(null);
  const [remaining, setRemaining] = useState(0);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const initialTimer = window.setTimeout(() => setRemaining(Math.max(0, DEADLINE - Date.now())), 0);
    const timer = window.setInterval(() => setRemaining(Math.max(0, DEADLINE - Date.now())), 1000);
    return () => {
      window.clearTimeout(initialTimer);
      window.clearInterval(timer);
    };
  }, []);

  const totalSeconds = Math.floor(remaining / 1000);
  const time = {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };

  const chooseTariff = (name: string) => {
    setTariff(name);
    document.getElementById("intensive-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (sending) return;
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form).entries());
    setSending(true);
    setError("");
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          kind: "course",
          source: `Прикладной интенсив по Claude · тариф ${tariff}`,
          tariff,
          page: `${window.location.pathname}${window.location.search}`,
          attribution: getLeadAttribution(),
        }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || "Не удалось отправить заявку");
      trackAnalyticsGoal("lead_sent", { kind: "course", source: "Прикладной интенсив по Claude", tariff });
      form.reset();
      setSent(true);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Не удалось отправить заявку");
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <section className={styles.format} id="format">
        <p className={styles.eyebrow}>Формат</p>
        <div className={styles.formatLead}>
          <h2>Записанные лекции с подробными инструкциями</h2>
          <p>Вы проходите интенсив в своём темпе за рабочую неделю</p>
        </div>
        <div className={styles.formatFacts}>
          <p>К каждой лекции идёт <strong>практическое задание</strong>, которое закрепляет тему</p>
          <p><strong>3 тарифа</strong><br />разница — в поддержке на эти 5 дней</p>
          <p><strong>Никакой воды</strong><br />только то, что реально нужно применить</p>
        </div>
      </section>

      <section className={styles.audience}>
        <div className={styles.sectionIntro}>
          <h2>Кому рекомендуем пройти интенсив?</h2>
          <p><strong>SMM-специалисты, агентства и бизнесы</strong>, которые уже пробовали ИИ для текстов и рутины, но хотят выйти на новый уровень.</p>
        </div>
        <div className={styles.audienceList}>
          {AUDIENCES.map((item, index) => {
            const open = openAudience === index;
            return (
              <article key={item.title} className={open ? styles.audienceOpen : ""}>
                <button type="button" onClick={() => setOpenAudience(open ? null : index)} aria-expanded={open}>
                  <span>{pad(index + 1)}</span><strong>{item.title}</strong><i aria-hidden="true">{open ? "↖" : "↘"}</i>
                </button>
                <div><p>{item.text}</p></div>
              </article>
            );
          })}
        </div>
        <p className={styles.income}><span>×3–5 к текущему чеку</span> делают те, кто внедряют <em>Claude</em> в свою работу и жизнь</p>
      </section>

      <section className={styles.program} id="program">
        <h2>Программа</h2>
        <div className={styles.programGrid}>
          <article><span>01</span><h3>Вводный блок</h3><p><strong>Как это работает</strong> — что такое Claude, как подключить к задачам, база</p><p><strong>Как скачать</strong> — установка и выбор устройства</p><p><strong>Как научить</strong> — скиллы, обучение под нишу и тон, промпты</p><p><strong>Что делать</strong>, если проблемы с доступом</p></article>
          <article><span>02</span><h3>Стратегия</h3><p><strong>Подготовка:</strong> регулярный сбор данных о конкурентах и трендах ниши</p><p><strong>Промпты</strong> для контент-стратегии, примеры агентства</p><p>Работа с большими объёмами данных для разработки стратегии</p></article>
          <article><span>03</span><h3>Воронка и чат-боты</h3><p>Построение и тестирование гипотез воронки</p><p>Анализ точек отвала на основе данных</p><p>Автогенерация офферов и сообщений под этапы воронки</p><p>Создание простого чат-бота на базе Claude</p></article>
          <article><span>04</span><h3>Аналитика</h3><p>Подключение Claude к API соцсетей для мониторинга</p><p>Разбор отчётов и цифр с помощью Claude</p><p>Поиск точек роста на основе данных</p><p>Как превращать сырые цифры в выводы для клиента или себя</p></article>
        </div>
      </section>

      <section className={styles.tariffs} id="tariffs">
        <div className={styles.tariffHeading}><h2>Тарифы</h2><p>Пока другие продают за 60 000 ₽, мы устраиваем аукцион невиданной щедрости — <strong>только в этом потоке</strong></p></div>
        <div className={styles.tariffGrid}>
          <div className={`${styles.tariffCard} ${styles.tariffLabels}`}><h3>О курсе</h3><p>Длительность</p><p>Чат</p><p>Куратор</p><p>Стоимость</p></div>
          {TARIFFS.map((item) => (
            <button key={item.id} type="button" className={`${styles.tariffCard} ${tariff === item.id ? styles.selected : ""}`} onClick={() => chooseTariff(item.id)}>
              <h3>{item.id}<span aria-hidden="true">↘</span></h3>
              <p>5 дней {item.unlimited ? <small>+ бессрочный доступ</small> : null}</p>
              <p>{item.chat}</p><p>{item.curator}</p>
              <p className={styles.price}>{item.price}<small>вместо {item.old}</small></p>
            </button>
          ))}
        </div>
        <div className={styles.countdown}>
          <p>Цена действует<br /><strong>до 27 августа</strong></p>
          <span>Повышение через</span>
          <div>{[[time.days, "дней"], [time.hours, "часов"], [time.minutes, "минут"], [time.seconds, "секунд"]].map(([value, label]) => <b key={label as string}>{pad(value as number)}<small>{label}</small></b>)}</div>
          <button type="button" onClick={() => chooseTariff(tariff)}>Получить скидку</button>
        </div>
      </section>

      <section className={styles.formSection} id="intensive-form">
        <div>
          <p className={styles.eyebrow}>Прикладной интенсив · I AM AGENCY</p>
          <h2>{sent ? <>Спасибо!<br />Заявка отправлена</> : <>Забрать скидку<br />на интенсив</>}</h2>
          {sent ? <p className={styles.sent}>Мы получили заявку и скоро свяжемся с вами.</p> : (
            <form onSubmit={submit}>
              <label>Имя<input name="name" autoComplete="name" required /></label>
              <label>Телефон<input name="phone" type="tel" autoComplete="tel" required /></label>
              <label>Почта<input name="email" type="email" autoComplete="email" /></label>
              <label>Тариф<select name="selectedTariff" value={tariff} onChange={(event) => setTariff(event.target.value)}>{TARIFFS.map((item) => <option key={item.id}>{item.id}</option>)}</select></label>
              <label className={styles.consent}><input name="consent" type="checkbox" required /><span>Согласен с <a href="/privacy-consent" target="_blank">обработкой персональных данных</a></span></label>
              <input className={styles.honeypot} name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
              {error ? <p className={styles.error} role="alert">{error}</p> : null}
              <button type="submit" disabled={sending}>{sending ? "Отправляем…" : "Отправить"}</button>
            </form>
          )}
        </div>
        <div className={styles.formBurst} aria-hidden="true" />
      </section>
    </>
  );
}
