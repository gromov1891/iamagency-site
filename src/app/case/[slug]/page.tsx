import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import BuilderBlock from "../../blocks/BuilderBlock";
import ResponsiveBlock from "../../blocks/ResponsiveBlock";
import { futerHtml, futerH } from "../../blocks/gen/futerHtml";
import { futerTabletHtml, futerTabletH } from "../../blocks/gen/futerTabletHtml";
import { futerMobileHtml, futerMobileH } from "../../blocks/gen/futerMobileHtml";
import { CASES, getCase } from "../cases";
import { getCaseMobile } from "../caseMobile";
import styles from "./case-page.module.css";

/* Посадочная одного направления кейсов — /case/<slug>. Сверху холст 1:1 из Figma
   (с хлебной крошкой), ниже — SEO-блок (H1 + текст + FAQ + перелинковка) и футер.
   Разметка BreadcrumbList + FAQPage отдаётся в JSON-LD. */

const SITE = "https://iamagency.su";

export function generateStaticParams() {
  return CASES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = getCase(slug);
  if (!c) return {};
  const url = `${SITE}/case/${c.slug}`;
  return {
    title: { absolute: c.metaTitle },
    description: c.metaDescription,
    alternates: { canonical: `/case/${c.slug}` },
    openGraph: {
      title: c.metaTitle,
      description: c.metaDescription,
      url,
      siteName: "I am Agency",
      locale: "ru_RU",
      type: "article",
    },
    robots: { index: true, follow: true },
  };
}

export default async function CasePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = getCase(slug);
  if (!c) notFound();
  const mobile = getCaseMobile(slug);

  const h1 = c.h1 || `Кейсы SMM: ${c.name}`;
  const caseImages = Array.from(c.html.matchAll(/<img\b[^>]*\bsrc=["']([^"']+)["']/gi))
    .map((match) => match[1])
    .filter((src, index, all) => src.startsWith("/blk/keisy/") && all.indexOf(src) === index)
    .slice(0, 24);

  const jsonLd: Record<string, unknown>[] = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Главная", item: SITE },
        { "@type": "ListItem", position: 2, name: "Кейсы", item: `${SITE}/keisy` },
        { "@type": "ListItem", position: 3, name: c.name, item: `${SITE}/case/${c.slug}` },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: h1,
      description: c.metaDescription,
      mainEntityOfPage: `${SITE}/case/${c.slug}`,
      inLanguage: "ru-RU",
      about: c.name,
      author: { "@id": `${SITE}/#organization` },
      publisher: { "@id": `${SITE}/#organization` },
    },
  ];
  if (c.faq?.length) {
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: c.faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
  }

  return (
    <>
      <div className="header-spacer" style={{ background: "#FFFFFF" }} />
      <div className={styles.desktopCanvas}>
        <BuilderBlock html={c.html} h={c.height} />
      </div>

      <section className={styles.responsiveCanvas} aria-labelledby="case-responsive-title">
        <div className={styles.responsiveInner}>
          <nav className={styles.breadcrumbs} aria-label="Хлебные крошки">
            <Link href="/">Главная</Link><span>→</span>
            <Link href="/keisy">Кейсы</Link><span>→</span>
            <span>{c.name}</span>
          </nav>
          <h2 id="case-responsive-title">{h1}</h2>
          {c.intro?.[0] ? <p className={styles.lead}>{c.intro[0]}</p> : null}
          {caseImages.length ? (
            <div className={styles.gallery} aria-label={`Работы в направлении ${c.name}`}>
              {caseImages.map((src, index) => (
                <figure className={styles.galleryItem} key={src}>
                  <img
                    src={src}
                    alt={`SMM-кейс I AM AGENCY в нише ${c.name}: пример визуала и контента ${index + 1}`}
                    loading="lazy"
                  />
                </figure>
              ))}
            </div>
          ) : null}
        </div>
      </section>

      {mobile ? (
        <div className={styles.mobileCanvas}>
          <BuilderBlock html={mobile.html} w={375} h={mobile.height} overflow="hidden" />
        </div>
      ) : null}

      {/* SEO-блок: заголовок, текст, FAQ, перелинковка */}
      <section className={styles.seo}>
        <div className={styles.seoIntro}>
          <h1>{h1}</h1>
          {c.intro?.map((p, i) => <p key={i}>{p}</p>)}
        </div>

        {c.faq?.length ? (
          <div className={styles.faqBand}>
            <div className={styles.faqInner}>
              <p className={styles.faqKicker}>Вопросы и ответы</p>
              <h2 className={styles.faqTitle}>Частые вопросы</h2>
              <div className={styles.faqList}>
                {c.faq.map((f, i) => (
                  <details key={i} className={styles.faqItem}>
                    <summary>{f.q}</summary>
                    <p>{f.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </section>

      <ResponsiveBlock
        desktopHtml={futerHtml}
        desktopH={futerH}
        tabletHtml={futerTabletHtml}
        tabletH={futerTabletH}
        mobileHtml={futerMobileHtml}
        mobileH={futerMobileH}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
