import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import BuilderBlock from "@/app/blocks/BuilderBlock";
import ResponsiveBlock from "@/app/blocks/ResponsiveBlock";
import EnglishFigmaEnhancer from "@/app/en/EnglishFigmaEnhancer";
import { CASES } from "@/app/case/cases";
import { futerHtml, futerH } from "@/app/blocks/gen/futerHtml";
import { futerTabletHtml, futerTabletH } from "@/app/blocks/gen/futerTabletHtml";
import { futerMobileHtml, futerMobileH } from "@/app/blocks/gen/futerMobileHtml";
import { EN_CASES, findEnglishOffer } from "@/lib/i18n/en-content";
import { TRANSLATION_ROUTES, getSeoAlternates } from "@/lib/i18n/routes";
import { translateGeneratedHtml as en } from "@/lib/i18n/translate-generated-html";
import styles from "@/app/case/[slug]/case-page.module.css";

const SITE = "https://iamagency.su";

export const generateStaticParams = () => EN_CASES.map(({ slug }) => ({ slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = findEnglishOffer(EN_CASES, slug);
  if (!item) return {};
  const path = `/en/cases/${slug}`;
  const translation = TRANSLATION_ROUTES.find((route) => route.en === path);
  return {
    title: { absolute: item.metaTitle },
    description: item.metaDescription,
    alternates: getSeoAlternates(translation?.ru || "/keisy"),
    openGraph: { title: item.metaTitle, description: item.metaDescription, url: `${SITE}${path}`, siteName: "I AM AGENCY", locale: "en_US", type: "article" },
    robots: { index: true, follow: true },
  };
}

export default async function EnglishCasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = findEnglishOffer(EN_CASES, slug);
  const index = EN_CASES.findIndex((entry) => entry.slug === slug);
  const source = CASES[index];
  if (!item || !source) notFound();

  const images = Array.from(source.html.matchAll(/<img\b[^>]*\bsrc=["']([^"']+)["'][^>]*>/gi))
    .map((match) => {
      const tag = match[0];
      return {
        src: match[1],
        width: Number(tag.match(/(?:^|;)\s*width:\s*([\d.]+)px/i)?.[1] || 1),
        height: Number(tag.match(/(?:^|;)\s*height:\s*([\d.]+)px/i)?.[1] || 1),
      };
    })
    .filter((image, imageIndex, all) => image.src.startsWith("/blk/keisy/") && all.findIndex((candidate) => candidate.src === image.src) === imageIndex)
    .slice(0, 24);

  const jsonLd = [
    {
      "@context": "https://schema.org", "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/en` },
        { "@type": "ListItem", position: 2, name: "Cases", item: `${SITE}/en/cases` },
        { "@type": "ListItem", position: 3, name: item.name, item: `${SITE}/en/cases/${slug}` },
      ],
    },
    { "@context": "https://schema.org", "@type": "Article", headline: item.h1, description: item.metaDescription, mainEntityOfPage: `${SITE}/en/cases/${slug}`, inLanguage: "en", about: item.name, author: { "@id": `${SITE}/#organization` }, publisher: { "@id": `${SITE}/#organization` } },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: item.faq.map((entry) => ({ "@type": "Question", name: entry.q, acceptedAnswer: { "@type": "Answer", text: entry.a } })) },
  ];

  return (
    <EnglishFigmaEnhancer>
      <div className="header-spacer" style={{ background: "#fff" }} />
      <div className={styles.desktopCanvas}><BuilderBlock html={en(source.html)} h={source.height} /></div>

      <section className={`${styles.responsiveCanvas} ${styles.englishResponsiveCanvas}`} aria-labelledby="case-title">
        <div className={styles.responsiveInner}>
          <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
            <Link href="/en">Home</Link><span>→</span><Link href="/en/cases">Cases</Link><span>→</span><span>{item.name}</span>
          </nav>
          <h2 id="case-title">{item.h1}</h2>
          <p className={styles.lead}>{item.intro}</p>
          <div className={styles.gallery} aria-label={`${item.name} project gallery`}>
            {images.map((image, imageIndex) => (
              <figure className={styles.galleryItem} key={image.src}>
                <img src={image.src} width={image.width} height={image.height} alt={`${item.name} social media project by I AM AGENCY — visual ${imageIndex + 1}`} loading="lazy" />
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.seo}>
        <div className={styles.seoIntro}><h1>{item.h1}</h1><p>{item.intro}</p></div>
        <div className={styles.faqBand}>
          <div className={styles.faqInner}>
            <p className={styles.faqKicker}>Questions and answers</p><h2 className={styles.faqTitle}>Frequently asked questions</h2>
            <div className={styles.faqList}>{item.faq.map((entry) => <details key={entry.q} className={styles.faqItem}><summary>{entry.q}</summary><p>{entry.a}</p></details>)}</div>
          </div>
        </div>
      </section>

      <ResponsiveBlock desktopHtml={en(futerHtml)} desktopH={futerH} tabletHtml={en(futerTabletHtml)} tabletH={futerTabletH} mobileHtml={en(futerMobileHtml)} mobileH={futerMobileH} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </EnglishFigmaEnhancer>
  );
}
