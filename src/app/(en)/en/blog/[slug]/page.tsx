import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ResponsiveBlock from "@/app/blocks/ResponsiveBlock";
import BlogCard from "@/app/blog/BlogCard";
import { futerHtml, futerH } from "@/app/blocks/gen/futerHtml";
import { futerTabletHtml, futerTabletH } from "@/app/blocks/gen/futerTabletHtml";
import { futerMobileHtml, futerMobileH } from "@/app/blocks/gen/futerMobileHtml";
import { EN_ARTICLES } from "@/lib/i18n/en-articles";
import { getPublishedArticle, getPublishedRelatedArticles } from "@/lib/cms-store";
import { TRANSLATION_ROUTES, getSeoAlternates } from "@/lib/i18n/routes";
import { translateGeneratedHtml as en } from "@/lib/i18n/translate-generated-html";
import styles from "@/app/blog/blog.module.css";

const SITE = "https://iamagency.su";
const absoluteImage = (image: string) => image.startsWith("http") ? image : `${SITE}${image}`;
export const generateStaticParams = () => EN_ARTICLES.map(({ slug }) => ({ slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = await getPublishedArticle(slug, "en");
  if (!article) return {};
  const path = `/en/blog/${article.slug}`;
  const ru = TRANSLATION_ROUTES.find((route) => route.en === path)?.ru || "/blog";
  return { title: { absolute: `${article.title} | I AM AGENCY` }, description: article.excerpt, alternates: getSeoAlternates(ru), openGraph: { title: article.title, description: article.excerpt, url: `${SITE}${path}`, siteName: "I AM AGENCY", locale: "en_US", type: "article", images: [{ url: article.image, alt: article.imageAlt }] } };
}

export default async function EnglishArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getPublishedArticle(slug, "en");
  if (!article) notFound();
  const related = await getPublishedRelatedArticles(article);
  const canonical = `${SITE}/en/blog/${article.slug}`;
  const jsonLd = [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/en` }, { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE}/en/blog` }, { "@type": "ListItem", position: 3, name: article.title, item: canonical }] },
    { "@context": "https://schema.org", "@type": "Article", headline: article.title, description: article.excerpt, image: absoluteImage(article.image), inLanguage: "en", mainEntityOfPage: canonical, author: { "@type": "Organization", name: "I AM AGENCY" }, publisher: { "@type": "Organization", name: "I AM AGENCY", logo: { "@type": "ImageObject", url: `${SITE}/apple-icon.png` } }, keywords: article.tags.join(", "), datePublished: article.publishedAt, dateModified: article.updatedAt || article.publishedAt },
  ];
  return <>
    <div className="header-spacer" style={{ background: "#fff" }} />
    <main className={styles.articlePage}>
      <article className={styles.articleShell}>
        <nav className={styles.breadcrumbs} aria-label="Breadcrumb"><Link href="/en">Home</Link><span className={styles.breadcrumbArrow}>→</span><Link href="/en/blog">Blog</Link><span className={styles.breadcrumbArrow}>→</span><span className={styles.breadcrumbCurrent}>{article.title}</span></nav>
        <h1 className={styles.articleTitle}>{article.title}</h1>
        <div className={styles.articleCover}><Image src={article.image} alt={article.imageAlt} fill priority sizes="(max-width: 767px) 58vw, 450px" className={styles.articleCoverImage} /></div>
        <div className={styles.articleTags} aria-label="Article topics">{article.tags.map((tag) => <Link key={tag} href={`/en/blog?tag=${encodeURIComponent(tag)}`} className={styles.articleTag}>#{tag}</Link>)}</div>
        <div className={styles.articleBody}>{article.sections.map((section, index) => <section key={`${section.heading || "text"}-${index}`} className={styles.articleSection}>
          {section.heading && <h2>{section.heading}</h2>}{section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          {section.commands && <div className={styles.commands}>{section.commands.map((command) => <code key={command}>{command}</code>)}</div>}
          {section.bullets && <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}
          {section.image && <figure className={styles.articleInlineFigure}><Image src={section.image} alt={section.imageAlt || "I AM AGENCY article illustration"} width={1200} height={800} sizes="(max-width: 767px) calc(100vw - 30px), 768px" className={styles.articleInlineImage} />{section.caption && <figcaption>{section.caption}</figcaption>}</figure>}
        </section>)}</div>
      </article>
      <section className={styles.related} aria-labelledby="related-title"><h2 id="related-title" className={styles.relatedTitle}>Read next</h2><div className={styles.relatedGrid}>{related.map((item) => <BlogCard key={item.slug} article={item} compact locale="en" />)}</div></section>
    </main>
    <ResponsiveBlock desktopHtml={en(futerHtml)} desktopH={futerH} tabletHtml={en(futerTabletHtml)} tabletH={futerTabletH} mobileHtml={en(futerMobileHtml)} mobileH={futerMobileH} overflow="hidden" />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
  </>;
}
