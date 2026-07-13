import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ResponsiveBlock from "../../blocks/ResponsiveBlock";
import { futerHtml, futerH } from "../../blocks/gen/futerHtml";
import { futerTabletHtml, futerTabletH } from "../../blocks/gen/futerTabletHtml";
import { futerMobileHtml, futerMobileH } from "../../blocks/gen/futerMobileHtml";
import BlogCard from "../BlogCard";
import { BLOG_ARTICLES, getArticle, getRelatedArticles } from "../articles";
import styles from "../blog.module.css";

const SITE = "https://iamagency.su";

export function generateStaticParams() {
  return BLOG_ARTICLES.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};

  return {
    title: { absolute: `${article.title} | I AM AGENCY` },
    description: article.excerpt,
    alternates: { canonical: `/blog/${article.slug}` },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: `${SITE}/blog/${article.slug}`,
      siteName: "I AM AGENCY",
      locale: "ru_RU",
      type: "article",
      images: [{ url: article.image, alt: article.imageAlt }],
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const related = getRelatedArticles(article);
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Главная", item: SITE },
        { "@type": "ListItem", position: 2, name: "Блог", item: `${SITE}/blog` },
        {
          "@type": "ListItem",
          position: 3,
          name: article.title,
          item: `${SITE}/blog/${article.slug}`,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: article.title,
      description: article.excerpt,
      image: `${SITE}${article.image}`,
      mainEntityOfPage: `${SITE}/blog/${article.slug}`,
      author: { "@type": "Organization", name: "I AM AGENCY" },
      publisher: {
        "@type": "Organization",
        name: "I AM AGENCY",
        logo: { "@type": "ImageObject", url: `${SITE}/apple-icon.png` },
      },
      keywords: article.tags.join(", "),
    },
  ];

  return (
    <>
      <div className="header-spacer" style={{ background: "#fff" }} />
      <main className={styles.articlePage}>
        <article className={styles.articleShell}>
          <nav className={styles.breadcrumbs} aria-label="Хлебные крошки">
            <Link href="/">Главная</Link>
            <span className={styles.breadcrumbArrow}>→</span>
            <Link href="/blog">Блог</Link>
            <span className={styles.breadcrumbArrow}>→</span>
            <span className={styles.breadcrumbCurrent}>{article.title}</span>
          </nav>

          <h1 className={styles.articleTitle}>{article.title}</h1>

          <div className={styles.articleCover}>
            <Image
              src={article.image}
              alt={article.imageAlt}
              fill
              priority
              sizes="(max-width: 767px) 58vw, 450px"
              className={styles.articleCoverImage}
            />
          </div>

          <div className={styles.articleTags} aria-label="Темы статьи">
            {article.tags.map((tag) => (
              <Link key={tag} href={`/blog?tag=${encodeURIComponent(tag)}`} className={styles.articleTag}>
                #{tag}
              </Link>
            ))}
          </div>

          <div className={styles.articleBody}>
            {article.sections.map((section, index) => (
              <section key={`${section.heading || "text"}-${index}`} className={styles.articleSection}>
                {section.heading && <h2>{section.heading}</h2>}
                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.commands && (
                  <div className={styles.commands}>
                    {section.commands.map((command) => <code key={command}>{command}</code>)}
                  </div>
                )}
                {section.bullets && (
                  <ul>
                    {section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                  </ul>
                )}
              </section>
            ))}
          </div>
        </article>

        <section className={styles.related} aria-labelledby="related-articles-title">
          <h2 id="related-articles-title" className={styles.relatedTitle}>Читайте также</h2>
          <div className={styles.relatedGrid}>
            {related.map((item) => (
              <BlogCard key={item.slug} article={item} compact />
            ))}
          </div>
        </section>
      </main>

      <ResponsiveBlock
        desktopHtml={futerHtml}
        desktopH={futerH}
        tabletHtml={futerTabletHtml}
        tabletH={futerTabletH}
        mobileHtml={futerMobileHtml}
        mobileH={futerMobileH}
        overflow="hidden"
      />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
