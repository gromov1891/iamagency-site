"use client";

import Link from "next/link";
import { FormEvent, useEffect, useRef, useState } from "react";
import { getLeadAttribution } from "@/lib/lead-attribution";
import { trackAnalyticsGoal } from "@/lib/analytics";
import { translateGeneratedHtml as en } from "@/lib/i18n/translate-generated-html";
import ResponsiveBlock from "@/app/blocks/ResponsiveBlock";
import { futerHtml, futerH } from "@/app/blocks/gen/futerHtml";
import { futerTabletHtml, futerTabletH } from "@/app/blocks/gen/futerTabletHtml";
import { futerMobileHtml, futerMobileH } from "@/app/blocks/gen/futerMobileHtml";
import styles from "./intensive.module.css";

const DEADLINE = new Date("2026-09-12T17:00:00+03:00").getTime();

const AUDIENCES = [
  ["Фрилансер / СММ-специалист в Digital", "Ускоряете рутину — отчёты, сбор статистики, типовые тексты — и глубже копаете в стратегию и аналитику. Берёте больше проектов или поднимаете чек. Освобождаете часы каждую неделю и вкладываете их в клиентов."],
  ["СММ- или маркетинговое агентство", "Покупаете доступ на тарифе «Премиум» — материалы остаются у вас навсегда. Один специалист проходит интенсив, выполняет практические задания и передаёт знания остальной команде. Один тариф — прокачана вся команда."],
  ["Предприниматель со своим продуктом", "Закрываете часть SMM-задач самостоятельно, без подрядчика, но автоматизированно. Экономите бюджет на команду или агентство и заодно лучше понимаете, как ваш бизнес выглядит в соцсетях."],
] as const;

const EN_AUDIENCES = [
  ["Freelancer / SMM specialist in digital", "Automate reports, statistics and routine copy, then go deeper into strategy and analytics. Take on more projects or raise your rates while freeing up hours for client work every week."],
  ["SMM or marketing agency", "Choose Premium and keep the materials forever. One specialist completes the intensive and practical tasks, then passes the system to the rest of the team — one plan upgrades the whole agency."],
  ["Founder with their own product", "Handle part of your SMM work independently and with automation. Save on contractors while gaining a clearer understanding of how your business performs on social media."],
] as const;

const PROGRAM = [
  { number: "01", title: "Вводный блок", lines: [<> <b>как это работает</b><span> – что такое Claude, как подключить к задачам, база</span></>, <> <b>как скачать –</b><span> установка, что выбрать: телефон / десктоп</span></>, <> <b>как научить –</b><span> скиллы, обучение под нишу и тон, промпты</span></>, <> <b>что делать,</b><span> если проблемы с доступом</span></>] },
  { number: "02", title: "Стратегия", lines: [<> <b>подготовка:</b><span> как настроить регулярный сбор данных о конкурентах и трендах ниши (Apify)</span></>, <> <b>промпты для разработки контент-стратегии,</b><span> примеры агентства</span></>, <> <b>работа с большими объемами данных</b><span> для разработки стратегии</span></>] },
  { number: "03", title: "Воронка и чат-боты", lines: [<> <b>построение и тестирование гипотез воронки</b></>, <> <b>анализ точек отвала на основе данных</b><span> (заявка → запись)</span></>, <> <b>автогенерация офферов/сообщений</b><span> под этапы воронки – на майнд-карте</span></>, <> <b>создание простого чат-бота</b><span> на базе Claude</span></>] },
  { number: "04", title: "Аналитика", lines: [<> <b>подключение Claude к API соцсетей</b><span> (Instagram, Threads и др.) для мониторинга</span></>, <> <b>разбор отчетов и цифр с помощью Claude</b></>, <> <b>поиск точек роста на основе данных</b></>, <> <b>как превращать сырые цифры в выводы</b><span> для клиента (или себя)</span></>] },
];

const EN_PROGRAM = [
  { number: "01", title: "Getting started", lines: [<> <b>how it works</b><span> — what Claude is, how to connect it to tasks, the essentials</span></>, <> <b>how to install it —</b><span> setup and choosing mobile or desktop</span></>, <> <b>how to train it —</b><span> skills, niche and tone training, prompts</span></>, <> <b>what to do</b><span> if you have access issues</span></>] },
  { number: "02", title: "Strategy", lines: [<> <b>preparation:</b><span> setting up regular competitor and industry trend collection with Apify</span></>, <> <b>prompts for building a content strategy,</b><span> with agency examples</span></>, <> <b>working with large data sets</b><span> to develop a strategy</span></>] },
  { number: "03", title: "Funnels and chatbots", lines: [<> <b>building and testing funnel hypotheses</b></>, <> <b>analysing drop-off points using data</b><span> (enquiry → booking)</span></>, <> <b>automatically generating offers and messages</b><span> for each funnel stage on a mind map</span></>, <> <b>building a simple chatbot</b><span> with Claude</span></>] },
  { number: "04", title: "Analytics", lines: [<> <b>connecting Claude to social media APIs</b><span> (Instagram, Threads and others) for monitoring</span></>, <> <b>reviewing reports and metrics with Claude</b></>, <> <b>finding data-backed growth opportunities</b></>, <> <b>turning raw numbers into conclusions</b><span> for a client or your own business</span></>] },
];

const TARIFFS = [
  { id: "Старт", duration: "5 дней", chat: "Без чата", curator: "Без куратора", price: "7 990", old: "14 990" },
  { id: "База", duration: "5 дней", chat: "Общий чат", chatNote: <>со всеми участниками. остается<br />у вас навсегда. дальше –<br />самостоятельное общение</>, curator: "Куратор в чате", curatorNote: <>на связи 7 дней после старта,<br />отвечает на все вопросы</>, price: "11 990", old: "22 990" },
  { id: "Премиум", duration: "5 дней", durationNote: "+ бессрочный доступ", chat: "Общий чат", chatNote: <>со всеми участниками. остается<br />у вас навсегда. дальше –<br />самостоятельное общение</>, curator: "Личный куратор", curatorNote: <>индивидуально проверяет<br />и комментирует ваши задания<br />весь период</>, price: "19 990", old: "38 990" },
];

const EN_TARIFFS = [
  { id: "Start", duration: "5 days", chat: "No group chat", curator: "No curator", price: "7,990", old: "14,990" },
  { id: "Core", duration: "5 days", chat: "Group chat", chatNote: <>with all participants; available<br />to you permanently for continued<br />independent communication</>, curator: "Chat curator", curatorNote: <>available for 7 days after launch<br />to answer every question</>, price: "11,990", old: "22,990" },
  { id: "Premium", duration: "5 days", durationNote: "+ lifetime access", chat: "Group chat", chatNote: <>with all participants; available<br />to you permanently for continued<br />independent communication</>, curator: "Personal curator", curatorNote: <>personally reviews and comments<br />on your assignments throughout<br />the programme</>, price: "19,990", old: "38,990" },
];

function pad(value: number) { return String(Math.max(0, value)).padStart(2, "0"); }

export default function IntensiveClient({ locale = "ru" }: { locale?: "ru" | "en" }) {
  const isEnglish = locale === "en";
  const audiences = isEnglish ? EN_AUDIENCES : AUDIENCES;
  const program = isEnglish ? EN_PROGRAM : PROGRAM;
  const tariffs = isEnglish ? EN_TARIFFS : TARIFFS;
  const [tariff, setTariff] = useState(isEnglish ? "Premium" : "Премиум");
  const [openAudience, setOpenAudience] = useState<number | null>(null);
  const [remaining, setRemaining] = useState(0);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [scrollProgress, setScrollProgress] = useState({ percent: 0, section: 0 });
  const motionRoot = useRef<HTMLDivElement>(null);
  const progressFrame = useRef<number | null>(null);

  useEffect(() => {
    const roots = [document.documentElement, document.body];
    roots.forEach((root) => root.classList.add("intensive-scroll-boundary"));
    return () => roots.forEach((root) => root.classList.remove("intensive-scroll-boundary"));
  }, []);

  useEffect(() => {
    const update = () => setRemaining(Math.max(0, DEADLINE - Date.now()));
    const initial = window.setTimeout(update, 0);
    const timer = window.setInterval(update, 1000);
    return () => { window.clearTimeout(initial); window.clearInterval(timer); };
  }, []);

  useEffect(() => {
    const page = motionRoot.current;
    if (!page) return;

    const revealTargets = Array.from(page.querySelectorAll<HTMLElement>("[data-reveal]"));
    revealTargets.forEach((target, index) => {
      target.style.setProperty("--reveal-delay", `${(index % 5) * 70}ms`);
    });
    page.classList.add(styles.motionReady);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          (entry.target as HTMLElement).classList.add(styles.revealed);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    revealTargets.forEach((target) => observer.observe(target));

    const sections = Array.from(page.querySelectorAll<HTMLElement>("section"));
    const updateScrollProgress = () => {
      progressFrame.current = null;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const percent = Math.min(100, Math.max(0, Math.round((window.scrollY / maxScroll) * 100)));
      const marker = window.scrollY + window.innerHeight * 0.42;
      let section = 0;
      sections.forEach((item, index) => {
        if (item.offsetTop <= marker) section = index;
      });
      setScrollProgress((current) => current.percent === percent && current.section === section ? current : { percent, section });
    };
    const onScroll = () => {
      if (progressFrame.current !== null) return;
      progressFrame.current = window.requestAnimationFrame(updateScrollProgress);
    };
    updateScrollProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (progressFrame.current !== null) window.cancelAnimationFrame(progressFrame.current);
      page.classList.remove(styles.motionReady);
    };
  }, []);

  const seconds = Math.floor(remaining / 1000);
  const time = [Math.floor(seconds / 86400), Math.floor((seconds % 86400) / 3600), Math.floor((seconds % 3600) / 60), seconds % 60];
  const progressSections = isEnglish
    ? ["Introduction", "Format", "Who it is for", "Programme", "Plans", "Enquiry"]
    : ["Вступление", "Формат", "Для кого", "Программа", "Тарифы", "Заявка"];

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
      const leadSource = isEnglish ? `Applied Claude Intensive · plan ${tariff}` : `Прикладной интенсив по Claude · тариф ${tariff}`;
      const response = await fetch("/api/leads", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...values, kind: "course", source: leadSource, tariff, page: `${window.location.pathname}${window.location.search}`, attribution: getLeadAttribution() }) });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || (isEnglish ? "Unable to send your enquiry" : "Не удалось отправить заявку"));
      trackAnalyticsGoal("lead_sent", { kind: "course", source: isEnglish ? "Applied Claude Intensive" : "Прикладной интенсив по Claude", tariff });
      form.reset(); setSent(true);
    } catch (submitError) { setError(submitError instanceof Error ? submitError.message : isEnglish ? "Unable to send your enquiry" : "Не удалось отправить заявку"); }
    finally { setSending(false); }
  };

  return <div ref={motionRoot}>
    <aside
      className={`${styles.scrollProgress} ${scrollProgress.percent > 2 ? styles.scrollProgressVisible : ""}`}
      aria-label={isEnglish ? `Page progress: ${scrollProgress.percent}%` : `Прогресс страницы: ${scrollProgress.percent}%`}
    >
      <span><small>{isEnglish ? "INTENSIVE" : "ИНТЕНСИВ"}</small>{progressSections[Math.min(scrollProgress.section, progressSections.length - 1)]}</span>
      <i><b style={{ width: `${scrollProgress.percent}%` }} /></i>
      <strong>{scrollProgress.percent}%</strong>
    </aside>
    <section className={`${styles.canvas} ${styles.hero}`}>
      <nav data-reveal className={styles.breadcrumbs} aria-label={isEnglish ? "Breadcrumbs" : "Хлебные крошки"}><Link href={isEnglish ? "/en" : "/"}>{isEnglish ? "Home" : "Главная"}</Link><span>→</span><Link href={isEnglish ? "/en/smm-school" : "/shkola-smm"}>{isEnglish ? "SMM School" : "Школа SMM"}</Link><span>→</span><b>{isEnglish ? "Applied intensive" : "Прикладной интенсив"}</b></nav>
      <h1 data-reveal>{isEnglish ? <>Raise your rates<br />with <em>Claude</em></> : <>Поднимаем чек<br />с помощью <em>Claude</em></>}</h1>
      <img className={styles.heroStar} src="/intensive/hero-star.svg" alt="" />
      <p data-reveal className={styles.days}>{isEnglish ? "In" : "За"} <strong>5</strong> {isEnglish ? "days" : "дней"}</p>
      <div data-reveal className={styles.heroNote}><strong>{isEnglish ? <>With Claude, we tripled<br />our revenue!</> : <>С ним мы увеличили выручку<br />в 3 раза!</>}</strong><span>{isEnglish ? <>a practical intensive for marketers /<br />agencies / businesses</> : <>прикладной интенсив для маркетологов /<br />агентств / бизнеса</>}</span></div>
      <a data-reveal className={styles.heroButton} href="#tariffs">{isEnglish ? "Choose a plan" : "Выбрать тариф"}</a>
    </section>

    <section className={`${styles.canvas} ${styles.format}`} id="format">
      <img data-reveal data-reveal-figure className={styles.formatStar} src="/intensive/format-star.svg" alt="" />
      <h2 data-reveal>{isEnglish ? "Format" : "Формат"}</h2>
      <div data-reveal className={styles.formatCard}><strong>{isEnglish ? <>Pre-recorded lessons<br />with detailed<br />instructions</> : <>Записанные лекции<br />с подробными<br />инструкциями</>}</strong><span>{isEnglish ? <>complete them at your own pace<br />within one working week</> : <>вы проходите в своем темпе<br />за рабочую неделю</>}</span></div>
      <div data-reveal className={styles.formatFacts}>{isEnglish ? <><p><span>Every lesson includes</span><br /><b>a practical assignment,</b><br /><span>to reinforce the topic</span></p><p><b>3 plans</b><br /><span>with different levels of support<br />for these 5 days</span></p><p><b>no filler,</b><br /><span>only what you can<br />put into practice</span></p></> : <><p><span>К каждой лекции идет</span><b> практическое задание, </b><span>которое закрепляет тему</span></p><p><b>3 тарифа<br /></b><span>Разница – в поддержке<br />на эти 5 дней</span></p><p><b>Никакой воды,<br /></b><span>только то что<br />реально нужно<br />применить!</span></p></>}</div>
      <a data-reveal className={styles.more} href="#audience">↓ {isEnglish ? "learn more" : "подробнее"} ↓</a>
    </section>

    <section className={`${styles.canvas} ${styles.audience}`} id="audience">
      <div data-reveal className={styles.audienceIntro}><h2>{isEnglish ? "Who should take the intensive?" : "Кому рекомендуем пройти интенсив?"}</h2><p><b>{isEnglish ? "SMM specialists, agencies and businesses" : "Смм-специалисты, агентства и бизнесы"}</b><br /><span>{isEnglish ? "already using AI for copy and routine tasks, but ready to move to the next level" : "которые уже пробовали ИИ для текстов и рутины, но хотят выйти на новый уровень"}</span></p></div>
      <div data-reveal className={styles.audienceList}>{audiences.map(([title, text], index) => <article key={title} className={openAudience === index ? styles.open : ""}><button type="button" aria-expanded={openAudience === index} aria-controls={`audience-answer-${index}`} onClick={() => setOpenAudience(current => current === index ? null : index)}><span>{pad(index + 1)}</span><b>{index === 0 ? <>{isEnglish ? "Freelancer /" : "Фрилансер /"}<br />{isEnglish ? "SMM specialist in digital" : "СММ-специалист в Digital"}</> : title}</b><i aria-hidden="true" /></button><div id={`audience-answer-${index}`}><p>{text}</p></div></article>)}</div>
      <p data-reveal className={styles.income}><b>{isEnglish ? "×3–5 to your current fee" : "×3-5 к текущему чеку"}</b><span>{isEnglish ? "is what people achieve when they integrate" : "делают те, кто внедряют"}</span><span><em>Claude</em> {isEnglish ? "into their work and life" : "в свою работу и жизнь"}</span></p>
    </section>

    <section className={`${styles.canvas} ${styles.program}`} id="program">
      <h2 data-reveal>{isEnglish ? "Programme" : "Программа"}</h2>
      <img data-reveal data-reveal-figure className={styles.programFigureTop} src="/intensive/program-figure-top.png" alt="" />
      <img data-reveal data-reveal-figure className={styles.programFigureSide} src="/intensive/program-figure-side.png" alt="" />
      <img data-reveal data-reveal-figure className={styles.programClaudeIcon} src="/intensive/program-claude-icon.png" alt="" />
      <div className={styles.programList}>{program.map((item) => <article data-reveal key={item.number}><span>{item.number}</span><div><h3>{item.title}</h3>{item.lines.map((line, index) => <p key={index}>{line}</p>)}</div></article>)}</div>
    </section>

    <section className={`${styles.canvas} ${styles.tariffs}`} id="tariffs">
      <img data-reveal data-reveal-figure className={styles.tariffFigure} src="/intensive/tariff-figure.png" alt="" />
      <header data-reveal><h2>{isEnglish ? "Plans" : "Тарифы"}</h2><p>{isEnglish ? <>While others sell this for ₽60,000,<br /><b>we are making an exceptionally generous offer —</b><br /><strong>for this cohort only</strong></> : <>Пока другие продают за 60 000₽,<br /><b>мы устраиваем аукцион невиданной щедрости –</b><br /><strong>только в этом потоке</strong></>}</p></header>
      <div data-reveal className={styles.tariffTable}>
        <div className={styles.tariffLabels}><h3>{isEnglish ? "Course" : "О курсе"}</h3><p>{isEnglish ? "Duration" : "Длительность"}</p><p>{isEnglish ? "Chat" : "Чат"}</p><p>{isEnglish ? "Curator" : "Куратор"}</p><p>{isEnglish ? "Price" : "Стоимость"}</p></div>
        {tariffs.map(item => <button key={item.id} type="button" className={tariff === item.id ? styles.selected : ""} onClick={() => chooseTariff(item.id)} aria-label={isEnglish ? `Choose ${item.id} plan for ${item.price} rubles` : `Выбрать тариф ${item.id} за ${item.price} рублей`}><h3>{item.id}<i aria-hidden="true" /></h3><p>{item.duration}{item.durationNote && <small>{item.durationNote}</small>}</p><p>{item.chat}{item.chatNote && <small>{item.chatNote}</small>}</p><p>{item.curator}{item.curatorNote && <small>{item.curatorNote}</small>}</p><p className={styles.price}>{item.price} ₽<small>{isEnglish ? "instead of" : "вместо"} {item.old} ₽</small></p></button>)}
      </div>
      <div data-reveal className={styles.deadline}><h3>{isEnglish ? "Price valid" : "Цена действует"}<br /><span>{isEnglish ? "until 12 September, 17:00 MSK" : "до 12 сентября, 17:00 МСК"}</span></h3><p>{isEnglish ? "price rises in" : "повышение через"}</p><div className={styles.clock}>{time.map((value, index) => <b key={index}>{pad(value)}<small>{(isEnglish ? ["days","hours","minutes","seconds"] : ["дней","часов","минут","секунд"])[index]}</small></b>)}</div><button type="button" onClick={() => chooseTariff(tariff)}>{isEnglish ? "Get the discount" : "Получить скидку"}</button></div>
    </section>

    <section className={`${styles.canvas} ${styles.formSection}`} id="intensive-form">
      <h2 data-reveal>{sent ? isEnglish ? <>Thank you!<br />Enquiry sent</> : <>Спасибо!<br />Заявка отправлена</> : isEnglish ? <>Claim your discount<br />for the intensive</> : <>Забрать скидку<br />на интенсив</>}</h2>
      {!sent ? <form data-reveal onSubmit={submit}>
        <label>{isEnglish ? "Name" : "Имя"}<input name="name" autoComplete="name" placeholder={isEnglish ? "Your name" : "Ваше имя"} required /></label>
        <label>{isEnglish ? "Phone" : "Телефон"}<input name="phone" type="tel" autoComplete="tel" placeholder={isEnglish ? "+__ ___ ___ ____" : "+7 999 999 99 99"} required /></label>
        <label>{isEnglish ? "Email" : "Почта"}<input name="email" type="email" autoComplete="email" placeholder="mail@example.com" /></label>
        <label>{isEnglish ? "Plan" : "Тариф"}<select name="selectedTariff" value={tariff} onChange={e => setTariff(e.target.value)}>{tariffs.map(item => <option key={item.id}>{item.id}</option>)}</select></label>
        <label className={styles.consent}><input name="consent" type="checkbox" required /><span>{isEnglish ? "I agree to the " : "Согласен с "}<Link href={isEnglish ? "/en/personal-data-consent" : "/privacy-consent"} target="_blank">{isEnglish ? "processing of my personal data" : "обработкой персональных данных"}</Link></span></label>
        <input className={styles.honeypot} name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
        {error && <p className={styles.error}>{error}</p>}<button type="submit" disabled={sending}>{sending ? isEnglish ? "Sending…" : "Отправляем…" : isEnglish ? "Send enquiry" : "Отправить"}</button>
      </form> : <p data-reveal className={styles.sent}>{isEnglish ? "We have received your enquiry and will contact you shortly." : "Мы получили заявку и скоро свяжемся с вами."}</p>}
      <img data-reveal data-reveal-figure className={styles.contactStar} src="/intensive/contact-star.svg" alt="" />
    </section>

    <ResponsiveBlock
      desktopHtml={isEnglish ? en(futerHtml) : futerHtml}
      desktopH={futerH}
      tabletHtml={isEnglish ? en(futerTabletHtml) : futerTabletHtml}
      tabletH={futerTabletH}
      mobileHtml={isEnglish ? en(futerMobileHtml) : futerMobileHtml}
      mobileH={futerMobileH}
      overflow="hidden"
    />
  </div>;
}
