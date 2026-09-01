import type { Metadata } from "next";
import IntensiveClient from "@/app/(ru)/shkola-smm/prikladnoy-intensiv/IntensiveClient";
import styles from "@/app/(ru)/shkola-smm/prikladnoy-intensiv/intensive.module.css";
import { getSeoAlternates } from "@/lib/i18n/routes";

const SITE = "https://iamagency.su";
const PATH = "/en/smm-school/applied-claude-intensive";

export const metadata: Metadata = {
  title: { absolute: "Practical Claude Intensive for SMM and Marketing | I AM AGENCY" },
  description: "A five-day practical Claude intensive covering strategy, funnels, chatbots and analytics for SMM specialists, agencies and business owners.",
  alternates: getSeoAlternates(PATH),
  openGraph: {
    title: "Raise Your Rates with Claude in Five Days",
    description: "A practical Claude intensive for SMM specialists, marketing agencies and businesses: strategy, funnels, chatbots and analytics.",
    url: `${SITE}${PATH}`,
    siteName: "I AM AGENCY",
    locale: "en_US",
    type: "website",
  },
  robots: { index: true, follow: true },
};

const TARIFF_OFFERS = [
  { "@type": "Offer", name: "Start", price: "7990", priceCurrency: "RUB", availability: "https://schema.org/InStock", url: `${SITE}${PATH}#tariffs` },
  { "@type": "Offer", name: "Core", price: "11990", priceCurrency: "RUB", availability: "https://schema.org/InStock", url: `${SITE}${PATH}#tariffs` },
  { "@type": "Offer", name: "Premium", price: "19990", priceCurrency: "RUB", availability: "https://schema.org/InStock", url: `${SITE}${PATH}#tariffs` },
];

export default function AppliedClaudeIntensivePage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/en` },
        { "@type": "ListItem", position: 2, name: "SMM School", item: `${SITE}/en/smm-school` },
        { "@type": "ListItem", position: 3, name: "Applied Claude Intensive", item: `${SITE}${PATH}` },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Course",
      name: "Applied Claude Intensive for SMM and Marketing",
      description: "A five-day practical intensive covering strategy, funnels, chatbots and analytics with Claude.",
      provider: { "@type": "Organization", name: "I AM AGENCY", sameAs: SITE },
      hasCourseInstance: { "@type": "CourseInstance", courseMode: "online", startDate: "2026-08-28", inLanguage: "en" },
      offers: TARIFF_OFFERS,
    },
  ];

  return (
    <>
      <div className="header-spacer" />
      <main className={styles.page}>
        <IntensiveClient locale="en" />
      </main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
