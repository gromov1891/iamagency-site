"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { getLeadAttribution } from "@/lib/lead-attribution";
import { trackAnalyticsGoal } from "@/lib/analytics";
import styles from "./intensive.module.css";

const DEADLINE = new Date("2026-08-27T23:59:59+03:00").getTime();

const AUDIENCES = [
  ["Фрилансер / SMM-специалист в digital", "Ускорите анализ, стратегию, контент и отчёты. Освободите время для новых проектов и более глубокой работы с клиентами."],
  ["SMM- или маркетинговое агентство", "Встройте Claude в процессы команды — от исследования ниши до воронок и аналитики — без раздувания штата."],
  ["Предприниматель со своим продуктом", "Научитесь ставить задачи Claude для маркетинга, находить точки роста и превращать данные в решения для бизнеса."],
] as const;

const PROGRAM = [
  { number: "01", title: "Вводный блок", lines: [<> <b>как это работает</b><span> – что такое Claude, как подключить к задачам, база</span></>, <> <b>как скачать –</b><span> установка, что выбрать: телефон / десктоп</span></>, <> <b>как научить –</b><span> скиллы, обучение под нишу и тон, промпты</span></>, <> <b>что делать,</b><span> если проблемы с доступом</span></>] },
  { number: "02", title: "Стратегия", lines: [<> <b>подготовка:</b><span> как настроить регулярный сбор данных о конкурентах и трендах ниши (Apify)</span></>, <> <b>промпты для разработки контент-стратегии,</b><span> примеры агентства</span></>, <> <b>работа с большими объемами данных</b><span> для разработки стратегии</span></>] },
  { number: "03", title: "Воронка и чат-боты", lines: [<> <b>построение и тестирование гипотез воронки</b></>, <> <b>анализ точек отвала на основе данных</b><span> (заявка → запись)</span></>, <> <b>автогенерация офферов/сообщений</b><span> под этапы воронки – на майнд-карте</span></>, <> <b>создание простого чат-бота</b><span> на базе Claude</span></>] },
  { number: "04", title: "Аналитика", lines: [<> <b>подключение Claude к API соцсетей</b><span> (Instagram, Threads и др.) для мониторинга</span></>, <> <b>разбор отчетов и цифр с помощью Claude</b></>, <> <b>поиск точек роста на основе данных</b></>, <> <b>как превращать сырые цифры в выводы</b><span> для клиента (или себя)</span></>] },
];

const TARIFFS = [
  { id: "Старт", duration: "5 дней", chat: "без чата", curator: "без куратора", price: "3 990", old: "7 990" },
  { id: "База", duration: "5 дней", chat: "общий чат", curator: "куратор в чате", price: "7 990", old: "11 990" },
  { id: "Премиум", duration: "5 дней + бессрочный доступ", chat: "общий чат", curator: "личный куратор", price: "13 990", old: "19 990" },
];

function pad(value: number) { return String(Math.max(0, value)).padStart(2, "0"); }

export default function IntensiveClient() {
  const [tariff, setTariff] = useState("База");
  const [openAudience, setOpenAudience] = useState<number | null>(null);
  const [remaining, setRemaining] = useState(0);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const update = () => setRemaining(Math.max(0, DEADLINE - Date.now()));
    const initial = window.setTimeout(update, 0);
    const timer = window.setInterval(update, 1000);
    return () => { window.clearTimeout(initial); window.clearInterval(timer); };
  }, []);

  const seconds = Math.floor(remaining / 1000);
  const time = [Math.floor(seconds / 86400), Math.floor((seconds % 86400) / 3600), Math.floor((seconds % 3600) / 60), seconds % 60];

  const chooseTariff = (name: string) => {
    setTariff(name);
    document.getElementById("intensive-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (sending) return;
    const form = event.currentTarget;
    setSending(true); setError("");
    try {
      const values = Object.fromEntries(new FormData(form).entries());
      const response = await fetch("/api/leads", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...values, kind: "course", source: `Прикладной интенсив по Claude · тариф ${tariff}`, tariff, page: `${window.location.pathname}${window.location.search}`, attribution: getLeadAttribution() }) });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || "Не удалось отправить заявку");
      trackAnalyticsGoal("lead_sent", { kind: "course", source: "Прикладной интенсив по Claude", tariff });
      form.reset(); setSent(true);
    } catch (submitError) { setError(submitError instanceof Error ? submitError.message : "Не удалось отправить заявку"); }
    finally { setSending(false); }
  };

  return <>
    <section className={`${styles.canvas} ${styles.hero}`}>
      <nav className={styles.breadcrumbs} aria-label="Хлебные крошки"><Link href="/">Главная</Link><span>→</span><Link href="/shkola-smm">Школа SMM</Link><span>→</span><b>Прикладной интенсив</b></nav>
      <h1>Поднимаем чек<br />с помощью <em>Claude</em></h1>
      <img className={styles.heroStar} src="/intensive/hero-star.svg" alt="" />
      <p className={styles.days}>За <strong>5</strong> дней</p>
      <div className={styles.heroNote}><strong>С ним мы увеличили выручку<br />в 3 раза!</strong><span>прикладной интенсив для маркетологов /<br />агентств / бизнеса</span></div>
      <a className={styles.heroButton} href="#tariffs">Выбрать тариф</a>
    </section>

    <section className={`${styles.canvas} ${styles.format}`} id="format">
      <img className={styles.formatStar} src="/intensive/format-star.svg" alt="" />
      <h2>Формат</h2>
      <div className={styles.formatCard}><strong>Записанные лекции с подробными<br />инструкциями</strong><span>вы проходите в своем темпе за рабочую неделю</span></div>
      <div className={styles.formatFacts}><p>К каждой лекции идет<br /><b>практическое задание,</b><br />которое закрепляет тему</p><p><b>3 тарифа</b><br />разница – в поддержке<br />на эти 5 дней</p><p><b>никакой воды,</b><br />только то что реально<br />нужно применить!</p></div>
      <a className={styles.more} href="#audience">↓ подробнее ↓</a>
    </section>

    <section className={`${styles.canvas} ${styles.audience}`} id="audience">
      <div className={styles.audienceIntro}><h2>Кому рекомендуем пройти<br />интенсив?</h2><p><b>SMM-специалисты, агентства и бизнесы</b><br /><span>которые уже пробовали ИИ для текстов<br />и рутины, но хотят выйти на новый<br />уровень</span></p></div>
      <div className={styles.audienceList}>{AUDIENCES.map(([title, text], index) => <article key={title} className={openAudience === index ? styles.open : ""}><button type="button" aria-expanded={openAudience === index} onClick={() => setOpenAudience(openAudience === index ? null : index)}><span>{pad(index + 1)}</span><b>{title}</b><i>{openAudience === index ? "↖" : "↘"}</i></button><div><p>{text}</p></div></article>)}</div>
      <p className={styles.income}><b>×3-5 к текущему чеку</b><span>делают те, кто внедряют</span><em>Claude</em> в свою работу и жизнь</p>
    </section>

    <section className={`${styles.canvas} ${styles.program}`} id="program"><h2>Программа</h2><div className={styles.programList}>{PROGRAM.map((item) => <article key={item.number}><span>{item.number}</span><div><h3>{item.title}</h3>{item.lines.map((line, index) => <p key={index}>{line}</p>)}</div></article>)}</div></section>

    <section className={`${styles.canvas} ${styles.tariffs}`} id="tariffs">
      <header><h2>Тарифы</h2><p>Пока другие продают за 60 000₽,<br /><b>мы устраиваем аукцион невиданной щедрости –</b><br /><strong>только в этом потоке</strong></p></header>
      <div className={styles.tariffTable}>
        <div className={styles.tariffLabels}><h3>О курсе</h3><p>Длительность</p><p>Чат</p><p>Куратор</p><p>Стоимость</p></div>
        {TARIFFS.map(item => <button key={item.id} type="button" className={tariff === item.id ? styles.selected : ""} onClick={() => setTariff(item.id)}><h3>{item.id}<i>↘</i></h3><p>{item.duration}</p><p>{item.chat}</p><p>{item.curator}</p><p className={styles.price}>{item.price} ₽<small>вместо {item.old} ₽</small></p></button>)}
      </div>
      <div className={styles.deadline}><h3>Цена действует<br /><span>до 27 августа</span></h3><p>повышение через</p><div className={styles.clock}>{time.map((value, index) => <b key={index}>{pad(value)}<small>{["дней","часов","минут","секунд"][index]}</small></b>)}</div><button type="button" onClick={() => chooseTariff(tariff)}>Получить скидку</button></div>
    </section>

    <section className={`${styles.canvas} ${styles.formSection}`} id="intensive-form">
      <h2>{sent ? <>Спасибо!<br />Заявка отправлена</> : <>Забрать скидку<br />на интенсив</>}</h2>
      {!sent ? <form onSubmit={submit}>
        <label>Имя<input name="name" autoComplete="name" placeholder="Ваше имя" required /></label>
        <label>Телефон<input name="phone" type="tel" autoComplete="tel" placeholder="+7 999 999 99 99" required /></label>
        <label>Почта<input name="email" type="email" autoComplete="email" placeholder="mail@example.com" /></label>
        <label>Тариф<select name="selectedTariff" value={tariff} onChange={e => setTariff(e.target.value)}>{TARIFFS.map(item => <option key={item.id}>{item.id}</option>)}</select></label>
        <label className={styles.consent}><input name="consent" type="checkbox" required /><span>Согласен с <Link href="/privacy-consent" target="_blank">обработкой персональных данных</Link></span></label>
        <input className={styles.honeypot} name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
        {error && <p className={styles.error}>{error}</p>}<button type="submit" disabled={sending}>{sending ? "Отправляем…" : "Отправить"}</button>
      </form> : <p className={styles.sent}>Мы получили заявку и скоро свяжемся с вами.</p>}
      <img className={styles.contactStar} src="/intensive/contact-star.svg" alt="" />
    </section>

    <footer className={`${styles.canvas} ${styles.footer}`}><img src="/intensive/footer-logo.svg" alt="I AM AGENCY" /><p>I AM AGENCY © 2019<br />— 2026</p><div><Link href="/privacy-policy">Политика конфиденциальности</Link><Link href="/privacy-consent">Согласие на обработку данных</Link></div><p>ИП Громова М. А.<br />ИНН 420545021010<br />ОГРНИП 324420500100030</p></footer>
  </>;
}
