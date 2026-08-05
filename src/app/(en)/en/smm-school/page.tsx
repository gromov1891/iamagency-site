import type { Metadata } from "next";
import Link from "next/link";
import { getSeoAlternates } from "@/lib/i18n/routes";
import SchoolTranslatedCanvas from "./SchoolTranslatedCanvas";

const SITE = "https://iamagency.su";

const FAQ = [
  {
    q: "Do I need previous SMM experience?",
    a: "No. The course starts from zero and takes you from project launch and account packaging to content, promotion and marketing.",
  },
  {
    q: "Who is the SMM School for?",
    a: "It is for career changers, students, parents on parental leave and anyone who wants a practical route into remote creative work.",
  },
  {
    q: "What does the programme cover?",
    a: "Strategy, visual content, Instagram, Telegram, VK, influencer partnerships, AI tools and marketing fundamentals.",
  },
  {
    q: "How is the training delivered?",
    a: "Online and one-to-one with a personal curator, practical assignments and detailed feedback. The guided programme lasts six weeks.",
  },
];

export const metadata: Metadata = {
  title: { absolute: "Practical SMM Course from Zero to Profession | I AM AGENCY" },
  description: "Learn SMM through real agency projects: strategy, content, platforms, influencers, AI tools and marketing. Personal guidance and a portfolio included.",
  alternates: getSeoAlternates("/en/smm-school"),
  openGraph: {
    title: "I AM AGENCY SMM School",
    description: "A practical SMM course based on real agency workflows and portfolio-ready work.",
    url: `${SITE}/en/smm-school`,
    siteName: "I AM AGENCY",
    locale: "en_US",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function EnglishSchoolPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/en` },
        { "@type": "ListItem", position: 2, name: "SMM School", item: `${SITE}/en/smm-school` },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Course",
      name: "I AM AGENCY SMM School",
      description: "Practical social media marketing training from strategy and content to platforms, creators, AI tools and marketing.",
      provider: { "@type": "Organization", name: "I AM AGENCY", sameAs: SITE },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQ.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  ];

  return (
    <>
      <div className="header-spacer" style={{ background: "#1c1c1c" }} />
      <SchoolTranslatedCanvas />

      <section style={{ maxWidth: 1000, margin: "0 auto", padding: "clamp(32px,5vw,72px) clamp(20px,5vw,40px)", fontFamily: "Inter,sans-serif", color: "#1c1c1c" }}>
        <h1 style={{ fontFamily: "var(--font-display),Inter,sans-serif", fontWeight: 400, textTransform: "uppercase", fontSize: "clamp(28px,5vw,56px)", lineHeight: 1, margin: "0 0 24px" }}>
          SMM School: from zero to a new profession
        </h1>
        <p style={{ fontSize: "clamp(16px,1.4vw,19px)", lineHeight: 1.5, color: "#3a3a3a" }}>
          I AM AGENCY&apos;s practical SMM course covers the complete workflow: strategy, visual content, platforms, influencer partnerships, AI tools and marketing. You learn through real tasks, build a portfolio and receive individual guidance.
        </p>
        <h2 style={{ fontSize: "clamp(22px,3vw,34px)", fontWeight: 700, margin: "40px 0 20px" }}>Frequently asked questions</h2>
        {FAQ.map((item) => (
          <details key={item.q} style={{ borderTop: "1px solid #e5e3e0", padding: "16px 0" }}>
            <summary style={{ cursor: "pointer", listStyle: "none", fontSize: "clamp(17px,1.6vw,21px)", fontWeight: 600 }}>{item.q}</summary>
            <p style={{ margin: "12px 0 0", fontSize: "clamp(15px,1.3vw,18px)", lineHeight: 1.55, color: "#3a3a3a" }}>{item.a}</p>
          </details>
        ))}
        <nav style={{ marginTop: 44, display: "flex", flexWrap: "wrap", gap: "12px 24px", fontSize: 16 }}>
          <Link href="/en#contact" style={{ color: "#f55d1c", fontWeight: 600 }}>Apply</Link>
          <Link href="/en/cases" style={{ color: "#1c1c1c" }}>Cases</Link>
          <Link href="/en/services" style={{ color: "#1c1c1c" }}>Services</Link>
        </nav>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
