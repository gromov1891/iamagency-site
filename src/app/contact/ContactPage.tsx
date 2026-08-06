import Link from "next/link";
import ContactGame from "./ContactGame";
import { CONTACT_CHANNELS, SOCIAL_CHANNELS } from "./contact-data";
import styles from "./contact-page.module.css";

type Locale = "ru" | "en";

const PAGE_COPY = {
  ru: {
    crumbHome: "Главная",
    crumb: "Контакты",
    eyebrow: "I AM AGENCY · НА СВЯЗИ",
    h1: <>ДАВАЙТЕ<br />СДЕЛАЕМ<br /><i>ШУМ</i></>,
    intro: "Обсудим SMM, контент, продвижение или новый сайт. Напишите удобным способом — команда ответит, задаст несколько точных вопросов и предложит следующий шаг.",
    lead: "Обсудить проект",
    phone: "Позвонить",
    response: "Обычно отвечаем в течение 15 минут в рабочее время",
    directTitle: "Напишите напрямую",
    socialTitle: "Следите за агентством",
    socialText: "Кейсы, разборы, бэкстейджи съёмок и наблюдения команды — на наших площадках.",
    gameKicker: "НЕБОЛЬШАЯ ПАУЗА ПЕРЕД БРИФОМ",
    gameTitle: <>СОБЕРИТЕ ЛАЙКИ.<br />ЗАБЕРИТЕ СКИДКУ.</>,
    gameText: "Помогите SMM-специалисту пережить контент-спринт: перепрыгивайте токсичные комментарии и собирайте реакции. 30 секунд — и промокод ваш.",
    faqTitle: "Частые вопросы перед стартом",
    faq: [
      ["С какими задачами можно обратиться?", "Со стратегией, ведением социальных сетей, контентом и съёмками, performance-маркетингом, influencer-маркетингом, брендингом и разработкой сайтов."],
      ["Вы работаете только с российскими проектами?", "Нет. Команда работает удалённо и ведёт проекты из России и других стран. Состав площадок и продвижение адаптируем под рынок и аудиторию."],
      ["Что подготовить к первому разговору?", "Достаточно ссылки на проект и короткого описания задачи. Если есть сроки, бюджет, аналитика или примеры, которые нравятся, — приложите их, но это не обязательно."],
      ["Как использовать скидку из игры?", "Завершите контент-спринт, скопируйте промокод и нажмите «Забрать скидку». Код автоматически попадёт в источник заявки; менеджер учтёт его при подготовке предложения."],
    ],
    legal: "ИП Громова Мария Андреевна · ИНН 420545021010",
    privacy: "Политика конфиденциальности",
  },
  en: {
    crumbHome: "Home",
    crumb: "Contacts",
    eyebrow: "I AM AGENCY · ONLINE",
    h1: <>LET&apos;S<br />MAKE<br /><i>NOISE</i></>,
    intro: "Let’s talk about social media, content, growth or a new website. Choose the channel that suits you — our team will ask a few focused questions and suggest the next step.",
    lead: "Start a project",
    phone: "Call us",
    response: "We usually reply within 15 minutes during working hours",
    directTitle: "Contact us directly",
    socialTitle: "Follow the agency",
    socialText: "Case studies, practical breakdowns, production backstage and ideas from the team — across our social channels.",
    gameKicker: "A SHORT BREAK BEFORE THE BRIEF",
    gameTitle: <>COLLECT LIKES.<br />UNLOCK A DISCOUNT.</>,
    gameText: "Help our social media manager survive a content sprint: jump over toxic comments and collect reactions. Thirty seconds later, the promo code is yours.",
    faqTitle: "Questions before we start",
    faq: [
      ["What can I contact you about?", "Social media strategy and management, content and production, performance marketing, influencer campaigns, branding and website development."],
      ["Do you work with international projects?", "Yes. Our team works remotely with businesses in Russia and other markets. We adapt channels, content and promotion to the audience and location."],
      ["What should I prepare for the first call?", "A link to your project and a short description of the challenge are enough. Timelines, budget, analytics and references are useful, but not required."],
      ["How do I use the game discount?", "Finish the content sprint, copy the promo code and select “Claim discount”. The code is attached to your enquiry for our manager to apply to the proposal."],
    ],
    legal: "Individual Entrepreneur Maria Gromova · Tax ID 420545021010",
    privacy: "Privacy policy",
  },
} as const;

export function getContactFaq(locale: Locale) {
  return PAGE_COPY[locale].faq.map(([question, answer]) => ({ question, answer }));
}

export default function ContactPage({ locale }: { locale: Locale }) {
  const t = PAGE_COPY[locale];
  const homeHref = locale === "ru" ? "/" : "/en";
  const privacyHref = locale === "ru" ? "/privacy-policy" : "/en/privacy-policy";
  const pagePath = locale === "ru" ? "/kontakty" : "/en/contacts";
  const contactLabels: Record<string, string> = locale === "ru"
    ? { telegram: "Telegram", whatsapp: "WhatsApp", phone: "Телефон", email: "Email" }
    : { telegram: "Telegram", whatsapp: "WhatsApp", phone: "Phone", email: "Email" };
  const faq = getContactFaq(locale);
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "@id": `https://iamagency.su${pagePath}#contact-page`,
      url: `https://iamagency.su${pagePath}`,
      name: locale === "ru" ? "Контакты I AM AGENCY" : "Contact I AM AGENCY",
      inLanguage: locale === "ru" ? "ru-RU" : "en",
      about: { "@id": "https://iamagency.su/#organization" },
      mainEntity: {
        "@type": "Organization",
        "@id": "https://iamagency.su/#organization",
        name: "I AM AGENCY",
        email: "iamagency.su@gmail.com",
        telephone: "+7-953-555-67-60",
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "sales",
          telephone: "+7-953-555-67-60",
          email: "iamagency.su@gmail.com",
          availableLanguage: ["Russian", "English"],
        },
        sameAs: SOCIAL_CHANNELS.map((channel) => channel.href),
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: t.crumbHome, item: `https://iamagency.su${homeHref === "/" ? "" : homeHref}` },
        { "@type": "ListItem", position: 2, name: t.crumb, item: `https://iamagency.su${pagePath}` },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
  ];

  return (
    <main className={styles.page}>
      {schemas.map((schema, index) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <section className={styles.hero}>
        <div className={styles.heroGrid} aria-hidden="true" />
        <div className={styles.breadcrumbs}>
          <Link href={homeHref}>{t.crumbHome}</Link><span>→</span><span>{t.crumb}</span>
        </div>
        <p className={styles.eyebrow}>{t.eyebrow}</p>
        <h1>{t.h1}</h1>
        <div className={styles.heroCopy}>
          <p>{t.intro}</p>
          <div className={styles.heroActions}>
            <button type="button">{t.lead}</button>
            <a href="tel:+79535556760">{t.phone}</a>
          </div>
          <small><i />{t.response}</small>
        </div>
        <div className={styles.heroSticker} aria-hidden="true"><span>♥</span><b>+1</b></div>
        <div className={styles.heroOrb} aria-hidden="true" />
      </section>

      <section className={styles.direct} aria-labelledby="direct-title">
        <div className={styles.sectionHeading}>
          <span>01</span>
          <h2 id="direct-title">{t.directTitle}</h2>
        </div>
        <div className={styles.contactGrid}>
          {CONTACT_CHANNELS.map((channel, index) => (
            <a key={channel.key} href={channel.href} target={channel.key === "phone" || channel.key === "email" ? undefined : "_blank"} rel={channel.key === "phone" || channel.key === "email" ? undefined : "noopener noreferrer"} className={styles.contactCard}>
              <span>{String(index + 1).padStart(2, "0")} · {contactLabels[channel.key]}</span>
              <strong>{channel.value}</strong>
              <i>{channel.mark}</i>
              <b aria-hidden="true">↗</b>
            </a>
          ))}
        </div>
      </section>

      <section className={styles.socials} aria-labelledby="social-title">
        <div className={styles.socialIntro}>
          <div className={styles.sectionHeading}>
            <span>02</span>
            <h2 id="social-title">{t.socialTitle}</h2>
          </div>
          <p>{t.socialText}</p>
        </div>
        <div className={styles.socialList}>
          {SOCIAL_CHANNELS.map((channel, index) => (
            <a key={channel.label} href={channel.href} target="_blank" rel="noopener noreferrer">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{locale === "en" && channel.href.includes("dzen.ru") ? "Dzen" : channel.label}</strong>
              <small>{channel.handle}</small>
              <b aria-hidden="true">↗</b>
            </a>
          ))}
        </div>
      </section>

      <section className={styles.gameSection} aria-labelledby="game-title">
        <div className={styles.gameIntro}>
          <p>{t.gameKicker}</p>
          <h2 id="game-title">{t.gameTitle}</h2>
          <span>{t.gameText}</span>
        </div>
        <ContactGame locale={locale} />
      </section>

      <section className={styles.faq} aria-labelledby="faq-title">
        <div className={styles.sectionHeading}>
          <span>03</span>
          <h2 id="faq-title">{t.faqTitle}</h2>
        </div>
        <div className={styles.faqList}>
          {faq.map((item, index) => (
            <details key={item.question} open={index === 0}>
              <summary><span>{String(index + 1).padStart(2, "0")}</span>{item.question}<b aria-hidden="true">+</b></summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className={styles.endCta}>
        <p>I AM AGENCY</p>
        <h2>{locale === "ru" ? "ВАШ ПРОЕКТ — НАШ СЛЕДУЮЩИЙ ХОРОШИЙ КЕЙС" : "YOUR PROJECT — OUR NEXT GREAT CASE"}</h2>
        <button type="button">{t.lead}</button>
        <div><span>{t.legal}</span><Link href={privacyHref}>{t.privacy}</Link></div>
      </section>
    </main>
  );
}
