import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EnglishCta, englishMetadata } from "@/app/en/EnglishPages";
import { EN_ARTICLES } from "@/lib/i18n/en-articles";
import { getPublishedArticle } from "@/lib/cms-store";
import { TRANSLATION_ROUTES } from "@/lib/i18n/routes";
import styles from "@/app/en/english-pages.module.css";

export const generateStaticParams = () => EN_ARTICLES.map(({ slug }) => ({ slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getPublishedArticle(slug, "en");
  if (!article) return {};
  const path = `/en/blog/${article.slug}`;
  const translation = TRANSLATION_ROUTES.find((route) => route.en === path);
  return englishMetadata(
    { metaTitle: `${article.title} | I AM AGENCY`, metaDescription: article.excerpt },
    path,
    translation?.ru || "/blog",
  );
}

export default async function EnglishArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getPublishedArticle(slug, "en");
  if (!article) notFound();
  const canonical = `https://iamagency.su/en/blog/${article.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    image: new URL(article.image, "https://iamagency.su").toString(),
    inLanguage: "en",
    mainEntityOfPage: canonical,
    author: { "@type": "Organization", name: "I AM AGENCY", url: "https://iamagency.su" },
    publisher: { "@id": "https://iamagency.su/#organization" },
  };

  return (
    <main className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <article className={styles.article}>
        <header>
          <nav aria-label="Breadcrumb"><Link href="/en">Home</Link><span>/</span><Link href="/en/blog">Insights</Link></nav>
          <p>{article.tags.join(" · ")}</p>
          <h1>{article.title}</h1>
          <strong>{article.excerpt}</strong>
        </header>
        <Image className={styles.articleHeroImage} src={article.image} alt={article.imageAlt} width={1440} height={900} priority sizes="100vw" />
        <div className={styles.articleBody}>
          {article.sections.map((section, index) => (
            <section key={`${section.heading || "intro"}-${index}`}>
              {section.heading ? <h2>{section.heading}</h2> : null}
              {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.bullets ? <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul> : null}
            </section>
          ))}
        </div>
      </article>
      <EnglishCta />
    </main>
  );
}
