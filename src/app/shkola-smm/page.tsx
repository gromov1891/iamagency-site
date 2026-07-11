import type { Metadata } from "next";
import Link from "next/link";
import ResponsiveBlock from "../blocks/ResponsiveBlock";
import { futerHtml, futerH } from "../blocks/gen/futerHtml";
import { futerTabletHtml, futerTabletH } from "../blocks/gen/futerTabletHtml";
import { futerMobileHtml, futerMobileH } from "../blocks/gen/futerMobileHtml";
import { shkolaHtml, shkolaH } from "../shkola/gen/shkolaHtml";
import { shkolaPageTabletHtml, shkolaPageTabletH } from "../shkola/gen/shkolaPageTabletHtml";
import { shkolaPageMobileHtml, shkolaPageMobileH } from "../shkola/gen/shkolaPageMobileHtml";

/* Страница «Школа SMM» — /shkola-smm. Холст 1:1 из Figma (фрейм «Школа»),
   ниже SEO-блок (текст + FAQ) и футер. JSON-LD: BreadcrumbList + Course. */

const SITE = "https://iamagency.su";

export const metadata: Metadata = {
  title: { absolute: "Школа SMM — обучение SMM с нуля до профессии | I AM AGENCY" },
  description:
    "Школа SMM от агентства I AM AGENCY: обучение SMM с нуля — запуск проекта, Instagram, Reels, работа с блогерами, Telegram, ВКонтакте, маркетинг. Мастермайнды, практика и онлайн-выпускной.",
  alternates: { canonical: "/shkola-smm" },
  openGraph: {
    title: "Школа SMM — обучение SMM с нуля до профессии",
    description:
      "Обучение SMM с нуля: запуск проекта, Instagram, Reels, блогеры, Telegram, ВКонтакте, маркетинг. Практика и поддержка команды I AM AGENCY.",
    url: `${SITE}/shkola-smm`,
    siteName: "I am Agency",
    locale: "ru_RU",
    type: "website",
  },
  robots: { index: true, follow: true },
};

const FAQ = [
  {
    q: "Нужен ли опыт в SMM, чтобы начать обучение?",
    a: "Нет. Курс построен с нуля: от запуска проекта и упаковки аккаунта до рекламы и маркетинга. Подойдёт новичкам и тем, кто хочет системно разложить свои знания.",
  },
  {
    q: "Кому подойдёт школа?",
    a: "Тем, кто хочет сменить профессию, найти стабильный удалённый доход, зарабатывать в декрете или попасть в команду сильного агентства. Обучение практическое, а не только теория.",
  },
  {
    q: "Что входит в программу?",
    a: "Введение и 7 блоков: запуск проекта, Instagram, Reels, работа с блогерами, Telegram, ВКонтакте и маркетинг. Плюс еженедельные мастермайнды и онлайн-выпускной.",
  },
  {
    q: "Как проходит обучение?",
    a: "Онлайн, с практикой и разборами. Каждую неделю — мастермайнды, в конце — выпускной. Формат позволяет учиться из любой точки и совмещать с работой.",
  },
];

export default function ShkolaSmmPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Главная", item: SITE },
        { "@type": "ListItem", position: 2, name: "Школа SMM", item: `${SITE}/shkola-smm` },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Course",
      name: "Школа SMM I AM AGENCY",
      description:
        "Обучение SMM с нуля: запуск проекта, Instagram, Reels, работа с блогерами, Telegram, ВКонтакте, маркетинг. Практика, мастермайнды и онлайн-выпускной.",
      provider: { "@type": "Organization", name: "I am Agency", sameAs: SITE },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQ.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];

  return (
    <>
      <div className="header-spacer" style={{ background: "#1C1C1C" }} />
      <ResponsiveBlock
        desktopHtml={shkolaHtml}
        desktopH={shkolaH}
        tabletHtml={shkolaPageTabletHtml}
        tabletH={shkolaPageTabletH}
        mobileHtml={shkolaPageMobileHtml}
        mobileH={shkolaPageMobileH}
        overflow="hidden"
      />

      <section
        className="shkola-seo"
        style={{
          maxWidth: 1000,
          margin: "0 auto",
          padding: "clamp(32px,5vw,72px) clamp(20px,5vw,40px)",
          fontFamily: "Inter, sans-serif",
          color: "#1C1C1C",
        }}
      >
        <h1
          style={{
            fontFamily: "var(--font-display), Inter, sans-serif",
            fontWeight: 400,
            textTransform: "uppercase",
            fontSize: "clamp(28px,5vw,56px)",
            lineHeight: 1.0,
            letterSpacing: "-.01em",
            margin: "0 0 24px",
          }}
        >
          Школа SMM: обучение с нуля до профессии
        </h1>
        <p style={{ fontSize: "clamp(16px,1.4vw,19px)", lineHeight: 1.5, margin: "0 0 16px", color: "#3a3a3a" }}>
          Авторский курс агентства I AM AGENCY: учим SMM системно и на практике — от запуска проекта и упаковки
          аккаунта до Reels, работы с блогерами, Telegram, ВКонтакте и маркетинга. Это не только теория: каждую
          неделю мастермайнды, в конце — онлайн-выпускной.
        </p>
        <p style={{ fontSize: "clamp(16px,1.4vw,19px)", lineHeight: 1.5, margin: "0 0 16px", color: "#3a3a3a" }}>
          Подойдёт тем, кто хочет сменить профессию, найти стабильный удалённый доход или попасть в команду сильного
          агентства. Учим тому, что сами делаем для клиентов каждый день.
        </p>

        <h2 style={{ fontSize: "clamp(22px,3vw,34px)", fontWeight: 700, margin: "40px 0 20px" }}>Частые вопросы</h2>
        <div>
          {FAQ.map((f, i) => (
            <details key={i} style={{ borderTop: "1px solid #e5e3e0", padding: "16px 0" }}>
              <summary style={{ cursor: "pointer", listStyle: "none", fontSize: "clamp(17px,1.6vw,21px)", fontWeight: 600 }}>
                {f.q}
              </summary>
              <p style={{ margin: "12px 0 0", fontSize: "clamp(15px,1.3vw,18px)", lineHeight: 1.55, color: "#3a3a3a" }}>
                {f.a}
              </p>
            </details>
          ))}
        </div>

        <nav style={{ marginTop: 44, display: "flex", flexWrap: "wrap", gap: "12px 24px", fontSize: 16 }}>
          <Link href="/#kontakty" style={{ color: "#F55D1C", fontWeight: 600 }}>Записаться</Link>
          <Link href="/keisy" style={{ color: "#1C1C1C" }}>Кейсы</Link>
          <Link href="/#uslugi" style={{ color: "#1C1C1C" }}>Услуги</Link>
        </nav>
      </section>

      <ResponsiveBlock
        desktopHtml={futerHtml}
        desktopH={futerH}
        tabletHtml={futerTabletHtml}
        tabletH={futerTabletH}
        mobileHtml={futerMobileHtml}
        mobileH={futerMobileH}
        overflow="hidden"
      />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
