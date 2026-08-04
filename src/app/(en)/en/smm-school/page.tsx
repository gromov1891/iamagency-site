import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getSeoAlternates } from "@/lib/i18n/routes";
import SchoolLeadButton from "./SchoolLeadButton";
import styles from "./school.module.css";

const SITE = "https://iamagency.su";

const TEACHING = [
  ["90% practice", "Most of the programme is hands-on, so every topic becomes a skill you can use in client work."],
  ["Real agency projects", "Learn through the workflows and templates our team uses on active I AM AGENCY projects."],
  ["A ready portfolio", "Finish with polished case studies you can confidently show to your first clients or employers."],
  ["Help with first clients", "Learn where to find relevant projects and how to build a professional client relationship."],
  ["A route into the agency", "We invite the strongest graduates to intern with us and develop inside the team."],
];

const AUDIENCES = [
  ["People who want freedom", "Work online from anywhere and keep travelling."],
  ["Students", "Build an in-demand skill and income alongside your studies."],
  ["Parents on parental leave", "Learn a remote profession while staying close to your family."],
  ["People ready for change", "Move from an unfulfilling job into a creative, relevant career."],
];

const MODULES = [
  ["Strategy", "Analysis, positioning, content pillars and a practical content plan."],
  ["Visuals and content", "Creative production, layouts and video editing for everyday SMM work."],
  ["Platforms", "How Instagram, Telegram and VK differ — and how to grow on each platform."],
  ["Influencer partnerships", "How to find, assess and brief creators and negotiate integrations."],
  ["AI tools", "Using AI for copy, imagery and faster routine production without losing quality."],
  ["Marketing fundamentals", "How content supports sales and how to make better commercial decisions."],
];

const STORIES = [
  ["Kristina, 29", "Saint Petersburg", "Joined the course while caring for a five-month-old baby and received her first projects during the programme. She later became a course curator and now works as a creative director for a major cosmetics brand."],
  ["Kira, 32", "Yekaterinburg", "Moved from manicure work into SMM. She built a portfolio on real projects, found her first clients and now works remotely while living in Thailand."],
  ["Diana, 25", "Moscow", "Left banking for creative work. Her first course project was a clothing brand; today she combines three client projects and continues to grow her practice."],
  ["Nastya, 31", "Krasnoyarsk", "Started while working a demanding office schedule. Today she manages major international clients as part of an agency team."],
];

const FAQ = [
  { q: "Do I need previous SMM experience?", a: "No. The course starts from the foundations and takes you through strategy, content, platforms, promotion and client work." },
  { q: "Who is the course for?", a: "It is designed for career changers, students, parents on parental leave and anyone who wants a practical route into remote creative work." },
  { q: "How is the course delivered?", a: "The current format is individual online learning with a personal curator who reviews every assignment and adjusts the pace to you." },
  { q: "How long does the programme take?", a: "The guided programme lasts six weeks. You keep lifetime access to the learning materials." },
];

export const metadata: Metadata = {
  title: { absolute: "Practical SMM Course from Zero to Profession | I AM AGENCY" },
  description: "Learn SMM through real agency projects: strategy, content, platforms, influencers, AI tools and marketing. Individual guidance and a portfolio included.",
  alternates: getSeoAlternates("/en/smm-school"),
  openGraph: {
    title: "I AM AGENCY SMM School",
    description: "A practical, guided SMM course built around real agency workflows and portfolio-ready work.",
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
      mainEntity: FAQ.map((entry) => ({
        "@type": "Question",
        name: entry.q,
        acceptedAnswer: { "@type": "Answer", text: entry.a },
      })),
    },
  ];

  return (
    <main className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className={styles.hero}>
        <nav aria-label="Breadcrumb"><Link href="/en">Home</Link><span>→</span><span>SMM School</span></nav>
        <div className={styles.heroCopy}>
          <p className={styles.kicker}>I AM AGENCY EDUCATION</p>
          <h1><span>SMM</span><span>SCHOOL</span><span>BY</span><span>I AM AGENCY</span></h1>
          <p className={styles.heroLead}>Learn the profession from zero — through the same system we use every day.</p>
          <div className={styles.heroStats}><strong>7 years</strong><span>teaching SMM</span><strong>350+</strong><span>graduates</span></div>
          <SchoolLeadButton className={styles.primary}>Book a consultation</SchoolLeadButton>
        </div>
        <Image className={styles.heroArt} src="/marketing-hero/pink-swirl.webp" alt="" width={768} height={768} priority />
      </section>

      <section className={`${styles.darkSection} ${styles.method}`}>
        <header className={styles.sectionHeader}><p>THE METHOD</p><h2>HOW WE TEACH</h2></header>
        <div className={styles.methodGrid}>{TEACHING.map(([title, text], index) => <article key={title} className={styles.methodCard}><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
      </section>

      <section className={styles.format}>
        <p className={styles.kicker}>FORMAT</p>
        <h2>Personal guidance.<br />A pace that works for you.</h2>
        <p>The course is currently delivered one-to-one. A personal curator supports you throughout the programme, reviews every assignment and adapts the pace to your situation.</p>
        <div><strong>6 weeks</strong><span>guided programme</span><strong>Lifetime</strong><span>access to materials</span></div>
      </section>

      <section className={`${styles.darkSection} ${styles.audience}`}>
        <header className={styles.sectionHeader}><p>WHO IT IS FOR</p><h2>A NEW PROFESSION<br />CAN START HERE.</h2></header>
        <div className={styles.audienceGrid}>{AUDIENCES.map(([title, text]) => <article key={title}><h3>{title}</h3><p>{text}</p><span>↘</span></article>)}</div>
      </section>

      <section className={styles.curriculum}>
        <header className={styles.sectionHeader}><p>THE PROGRAMME</p><h2>WHAT YOU WILL LEARN</h2><span>From the first strategy to independently managing a complete social media project.</span></header>
        <ol>{MODULES.map(([title, text], index) => <li key={title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{title}</h3><p>{text}</p></div></li>)}</ol>
      </section>

      <section className={styles.stories}>
        <header className={styles.sectionHeader}><p>REAL OUTCOMES</p><h2>OUR STUDENTS&apos;<br />STORIES</h2></header>
        <div>{STORIES.map(([name, city, text]) => <article key={name}><div className={styles.studentPhoto} aria-hidden="true" /><p>{city}</p><h3>{name}</h3><span>{text}</span></article>)}</div>
      </section>

      <section className={styles.apply}>
        <div><p>READY FOR A NEW PROFESSION?</p><h2>LET&apos;S BUILD YOUR<br />FIRST REAL PORTFOLIO.</h2><span>We will explain the programme, format and current course terms.</span></div>
        <div className={styles.actions}><SchoolLeadButton className={styles.primary}>Book a consultation</SchoolLeadButton><SchoolLeadButton className={styles.secondary}>Request a proposal</SchoolLeadButton></div>
      </section>

      <section className={styles.faq}>
        <p className={styles.kicker}>FAQ</p><h2>Before you begin.</h2>
        <div>{FAQ.map((entry) => <details key={entry.q}><summary>{entry.q}<span>+</span></summary><p>{entry.a}</p></details>)}</div>
      </section>
    </main>
  );
}
