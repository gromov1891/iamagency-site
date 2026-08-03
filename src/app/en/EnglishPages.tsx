import type { Metadata } from "next";
import Link from "next/link";
import type { EnglishOffer } from "@/lib/i18n/en-content";
import { getSeoAlternates } from "@/lib/i18n/routes";
import styles from "./english-pages.module.css";

const SITE_URL = "https://iamagency.su";

export function englishMetadata(
  item: Pick<EnglishOffer, "metaTitle" | "metaDescription">,
  enPath: string,
  _ruPath: string,
  index = true,
): Metadata {
  return {
    title: { absolute: item.metaTitle },
    description: item.metaDescription,
    alternates: getSeoAlternates(enPath),
    openGraph: {
      title: item.metaTitle,
      description: item.metaDescription,
      url: `${SITE_URL}${enPath}`,
      siteName: "I AM AGENCY",
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: item.metaTitle,
      description: item.metaDescription,
    },
    robots: index ? { index: true, follow: true } : { index: false, follow: false },
  };
}

type HubProps = {
  eyebrow: string;
  title: string;
  intro: string;
  items: EnglishOffer[];
  basePath: string;
  numberLabel?: string;
};

export function EnglishHub({ eyebrow, title, intro, items, basePath, numberLabel = "AREA" }: HubProps) {
  return (
    <main className={styles.page}>
      <section className={styles.hubHero}>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h1>{title}</h1>
        <p className={styles.lead}>{intro}</p>
      </section>
      <section className={styles.cardGrid} aria-label={title}>
        {items.map((item, index) => (
          <Link href={`${basePath}/${item.slug}`} className={styles.card} key={item.slug}>
            <span>{numberLabel} {String(index + 1).padStart(2, "0")}</span>
            <h2>{item.name}</h2>
            <p>{item.short}</p>
            <strong aria-hidden="true">↗</strong>
          </Link>
        ))}
      </section>
      <EnglishCta />
    </main>
  );
}

type DetailProps = {
  item: EnglishOffer;
  eyebrow: string;
  parentLabel: string;
  parentHref: string;
  canonicalPath: string;
};

export function EnglishDetail({ item, eyebrow, parentLabel, parentHref, canonicalPath }: DetailProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${SITE_URL}${canonicalPath}#service`,
        name: item.h1,
        description: item.metaDescription,
        url: `${SITE_URL}${canonicalPath}`,
        provider: { "@id": `${SITE_URL}/#organization` },
        areaServed: "Worldwide",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/en` },
          { "@type": "ListItem", position: 2, name: parentLabel, item: `${SITE_URL}${parentHref}` },
          { "@type": "ListItem", position: 3, name: item.name, item: `${SITE_URL}${canonicalPath}` },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: item.faq.map((entry) => ({
          "@type": "Question",
          name: entry.q,
          acceptedAnswer: { "@type": "Answer", text: entry.a },
        })),
      },
    ],
  };

  return (
    <main className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className={styles.detailHero}>
        <nav aria-label="Breadcrumb">
          <Link href="/en">Home</Link><span>/</span><Link href={parentHref}>{parentLabel}</Link>
        </nav>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h1>{item.h1}</h1>
        <p className={styles.lead}>{item.short}</p>
        <a className={styles.heroCta} href="#contact">Discuss your project <span>↗</span></a>
      </section>

      <section className={styles.introBlock}>
        <span>THE APPROACH</span>
        <p>{item.intro}</p>
      </section>

      <section className={styles.splitSection}>
        <header><span>WHAT WE DELIVER</span><h2>A practical scope, built around the goal.</h2></header>
        <ol>
          {item.deliverables.map((deliverable, index) => (
            <li key={deliverable}><span>{String(index + 1).padStart(2, "0")}</span>{deliverable}</li>
          ))}
        </ol>
      </section>

      <section className={styles.process}>
        <p className={styles.eyebrow}>HOW WE WORK</p>
        <h2>Clear ownership.<br />Useful decisions.<br />No black box.</h2>
        <div>
          <article><span>01</span><h3>Discover</h3><p>We align on the audience, business context, constraints and the decision the work must influence.</p></article>
          <article><span>02</span><h3>Design</h3><p>We turn the brief into a focused strategy, delivery plan, responsibilities and measurement framework.</p></article>
          <article><span>03</span><h3>Deliver</h3><p>Our team produces, launches and manages the agreed work with visible approvals and communication.</p></article>
          <article><span>04</span><h3>Improve</h3><p>We review evidence, explain what it means and turn it into the next set of practical actions.</p></article>
        </div>
      </section>

      <section className={styles.outcomes}>
        <header><span>WHAT THIS CREATES</span><h2>Work that is easier to use, measure and improve.</h2></header>
        <div>{item.outcomes.map((outcome) => <p key={outcome}>{outcome}<span>↗</span></p>)}</div>
      </section>

      <section className={styles.faq}>
        <p className={styles.eyebrow}>FAQ</p>
        <h2>Before we begin.</h2>
        <div>{item.faq.map((entry) => <details key={entry.q}><summary>{entry.q}<span>+</span></summary><p>{entry.a}</p></details>)}</div>
      </section>
      <EnglishCta />
    </main>
  );
}

export function EnglishCta() {
  return (
    <section className={styles.cta} id="contact">
      <p>HAVE A PROJECT IN MIND?</p>
      <h2>LET&apos;S TURN IT<br />INTO <em>MOMENTUM.</em></h2>
      <div>
        <a href="mailto:iamagency.su@gmail.com">iamagency.su@gmail.com</a>
        <a href="https://t.me/iam_smmagency" target="_blank" rel="noopener noreferrer">Message us on Telegram ↗</a>
      </div>
    </section>
  );
}

export function EnglishFooter() {
  const groups = [
    { title: "Explore", links: [["Home", "/en"], ["Services", "/en/services"], ["Cases", "/en/cases"], ["Marketing", "/en/marketing"], ["Insights", "/en/blog"]] },
    { title: "Services", links: [["Strategy", "/en/services/brand-social-strategy"], ["Management", "/en/services/social-media-management"], ["Production", "/en/services/content-production"], ["Packages", "/en/packages"]] },
    { title: "Company", links: [["SMM School", "/en/smm-school"], ["English sitemap", "/en/sitemap"], ["Privacy", "/en/privacy-policy"], ["Data consent", "/en/personal-data-consent"]] },
  ];
  return (
    <footer className={styles.footer}>
      <Link className={styles.footerBrand} href="/en">I AM AGENCY</Link>
      {groups.map((group) => <nav key={group.title} aria-label={group.title}><p>{group.title}</p>{group.links.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}</nav>)}
      <div className={styles.footerContact}><p>Contact</p><a href="mailto:iamagency.su@gmail.com">iamagency.su@gmail.com</a><a href="https://t.me/iam_smmagency" target="_blank" rel="noopener noreferrer">Telegram ↗</a></div>
      <small>© {new Date().getFullYear()} I AM AGENCY</small>
    </footer>
  );
}
