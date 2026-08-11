import type { Metadata } from "next";
import { getSeoAlternates } from "@/lib/i18n/routes";
import SchoolTranslatedCanvas from "./SchoolTranslatedCanvas";
import styles from "./school.module.css";

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

      <section className={styles.seoSection} aria-labelledby="school-seo-title">
        <div className={styles.seoIntro}>
          <p className={styles.seoKicker}>I AM AGENCY EDUCATION</p>
          <h1 id="school-seo-title">SMM SCHOOL:<br />FROM ZERO TO A<br />NEW PROFESSION</h1>
          <p className={styles.seoLead}>
            I AM AGENCY&apos;s practical SMM course covers the complete workflow: strategy, visual content, platforms, influencer partnerships, AI tools and marketing. You learn through real tasks, build a portfolio and receive individual guidance.
          </p>
        </div>

        <div className={styles.seoFaq}>
          <header>
            <p className={styles.seoKicker}>FREQUENTLY ASKED QUESTIONS</p>
            <h2>BEFORE YOU<br />BEGIN.</h2>
          </header>
          <div className={styles.seoFaqList}>
            {FAQ.map((item, index) => (
              <details key={item.q}>
                <summary>
                  <span className={styles.seoFaqNumber}>{String(index + 1).padStart(2, "0")}</span>
                  <span className={styles.seoFaqQuestion}>{item.q}</span>
                  <span className={styles.seoFaqToggle} aria-hidden="true">+</span>
                </summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
