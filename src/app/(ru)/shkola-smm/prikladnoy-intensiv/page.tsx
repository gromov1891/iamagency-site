import type { Metadata } from "next";
import IntensiveClient from "./IntensiveClient";
import styles from "./intensive.module.css";

const SITE = "https://iamagency.su";
const PATH = "/shkola-smm/prikladnoy-intensiv";

export const metadata: Metadata = {
  title: { absolute: "Практический интенсив по Claude для SMM и маркетинга | I AM AGENCY" },
  description: "Практический интенсив по Claude за 5 дней: стратегия, воронки, чат-боты и аналитика для SMM-специалистов, агентств и бизнеса. Три тарифа от 3 990 ₽." ,
  alternates: { canonical: `${SITE}${PATH}` },
  openGraph: {
    title: "Поднимаем чек с помощью Claude за 5 дней",
    description: "Прикладной интенсив по Claude для SMM, маркетинговых агентств и бизнеса: стратегия, воронки, чат-боты и аналитика.",
    url: `${SITE}${PATH}`,
    siteName: "I AM AGENCY",
    locale: "ru_RU",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function AppliedIntensivePage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Главная", item: SITE },
        { "@type": "ListItem", position: 2, name: "Школа SMM", item: `${SITE}/shkola-smm` },
        { "@type": "ListItem", position: 3, name: "Прикладной интенсив", item: `${SITE}${PATH}` },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Course",
      name: "Прикладной интенсив по Claude для SMM и маркетинга",
      description: "Пятидневный практический интенсив: стратегия, воронки, чат-боты и аналитика с Claude.",
      provider: { "@type": "Organization", name: "I AM AGENCY", sameAs: SITE },
      hasCourseInstance: { "@type": "CourseInstance", courseMode: "online", startDate: "2026-08-28", inLanguage: "ru" },
      offers: TARIFF_OFFERS,
    },
  ];

  return (
    <>
      <div className="header-spacer" />
      <main className={styles.page}>
        <IntensiveClient />
      </main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}

const TARIFF_OFFERS = [
  { "@type": "Offer", name: "Старт", price: "3990", priceCurrency: "RUB", availability: "https://schema.org/InStock", url: `${SITE}${PATH}#tariffs` },
  { "@type": "Offer", name: "База", price: "7990", priceCurrency: "RUB", availability: "https://schema.org/InStock", url: `${SITE}${PATH}#tariffs` },
  { "@type": "Offer", name: "Премиум", price: "13990", priceCurrency: "RUB", availability: "https://schema.org/InStock", url: `${SITE}${PATH}#tariffs` },
];
