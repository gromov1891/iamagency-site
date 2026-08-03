import type { Metadata } from "next";
import Link from "next/link";
import { getSeoAlternates } from "@/lib/i18n/routes";
import styles from "@/app/en/page.module.css";

export const metadata: Metadata = {
  title: { absolute: "Full-Service Social Media Agency | I AM AGENCY" },
  description:
    "Strategy, content, social media management, paid campaigns and influencer marketing from one team. Explore I AM AGENCY services and selected work.",
  alternates: getSeoAlternates("/en"),
  openGraph: {
    title: "Full-Service Social Media Agency | I AM AGENCY",
    description: "Strategy, content, paid social and influencer marketing built to move brands forward.",
    url: "https://iamagency.su/en",
    siteName: "I AM AGENCY",
    locale: "en_US",
    type: "website",
  },
  robots: { index: true, follow: true },
};

const services = [
  ["01", "Social media management", "Strategy, calendars, platform-native content, publishing, community and reporting.", "/en/services/social-media-management"],
  ["02", "Content production", "Concepts, mobile shoots, photography, short-form video, editing and design systems.", "/en/services/content-production"],
  ["03", "Paid social & growth", "Creative testing, audience strategy, campaign management and transparent performance analytics.", "/en/marketing/paid-social"],
  ["04", "Influencer marketing", "Creator sourcing, campaign production, UGC, approvals, rights and performance tracking.", "/en/marketing/influencer-marketing"],
] as const;

const sectors = ["BEAUTY", "FASHION", "HORECA", "REAL ESTATE", "TRAVEL", "ECOMMERCE", "EXPERTS", "EVENTS"];

const pageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://iamagency.su/en#webpage",
  url: "https://iamagency.su/en",
  name: "Full-Service Social Media Agency | I AM AGENCY",
  description: "Strategy, content, paid social and influencer marketing for ambitious brands.",
  inLanguage: "en",
  isPartOf: { "@id": "https://iamagency.su/#website" },
  about: { "@id": "https://iamagency.su/#organization" },
};

export default function EnglishPreviewPage() {
  return (
    <main className={styles.page} lang="en">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }} />

      <section className={styles.hero}>
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className={styles.eyebrow}><span>I AM AGENCY</span><i /> GLOBAL SOCIAL, BUILT WITH INTENT</div>
        <h1>FULL-SERVICE<br /><em>SOCIAL MEDIA</em><br />AGENCY</h1>
        <div className={styles.heroBottom}>
          <p>Strategy, content, paid campaigns and creator partnerships — connected by one senior team and measured against real business goals.</p>
          <a href="#contact" className={styles.primaryCta}>DISCUSS YOUR PROJECT <span>↗</span></a>
        </div>
        <div className={styles.orbit} aria-hidden="true"><span /><span /><span /></div>
      </section>

      <section className={styles.proof} id="about" aria-label="Agency facts">
        <p><strong>7+</strong><span>YEARS IN SOCIAL</span></p>
        <p><strong>450+</strong><span>CLIENT PROJECTS</span></p>
        <p><strong>ONE</strong><span>CONNECTED TEAM</span></p>
      </section>

      <section className={styles.services} id="services">
        <header>
          <span>WHAT WE DO</span>
          <h2>SOCIAL THAT LOOKS SHARP.<br />STRATEGY THAT HOLDS UP.</h2>
        </header>
        <div className={styles.serviceList}>
          {services.map(([number, title, text, href]) => (
            <article key={number}>
              <span>{number}</span>
              <h3><Link href={href}>{title}</Link></h3>
              <p>{text}</p>
              <i aria-hidden="true">↗</i>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.work} id="work">
        <div className={styles.workCopy}>
          <span>SELECTED EXPERIENCE</span>
          <h2>WE LEARN THE CATEGORY.<br />THEN MAKE IT MOVE.</h2>
          <p>Our work spans service businesses, consumer brands, hospitality, real estate and expert-led products. Explore the thinking we bring to each category.</p>
          <Link href="/en/cases">VIEW CATEGORY EXPERIENCE <span>↗</span></Link>
        </div>
        <div className={styles.sectors}>
          {sectors.map((sector, index) => <span key={sector} style={{ "--i": index } as React.CSSProperties}>{sector}</span>)}
        </div>
      </section>

      <section className={styles.contact} id="contact">
        <p>HAVE A BRAND<br />THAT NEEDS MOMENTUM?</p>
        <h2>LET&apos;S MAKE<br /><em>SOMETHING</em><br />PEOPLE NOTICE.</h2>
        <div>
          <a href="mailto:iamagency.su@gmail.com">iamagency.su@gmail.com</a>
          <a href="https://t.me/iam_smmagency" target="_blank" rel="noopener noreferrer">MESSAGE US ON TELEGRAM ↗</a>
        </div>
      </section>
    </main>
  );
}
