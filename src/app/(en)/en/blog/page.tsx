import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { EnglishCta, englishMetadata } from "@/app/en/EnglishPages";
import { getPublishedArticles } from "@/lib/cms-store";
import styles from "@/app/en/english-pages.module.css";

const page = {
  metaTitle: "Social Media and Marketing Insights | I AM AGENCY",
  metaDescription: "Practical articles from I AM AGENCY on social media, content, brand growth, marketing systems, design tools and AI for business.",
};

export const metadata: Metadata = englishMetadata(page, "/en/blog", "/blog");

export default async function EnglishBlogPage() {
  const articles = await getPublishedArticles("en");
  return (
    <main className={styles.page}>
      <section className={styles.hubHero}>
        <p className={styles.eyebrow}>INSIGHTS</p>
        <h1>USEFUL THINKING FOR PEOPLE BUILDING BRANDS.</h1>
        <p className={styles.lead}>Practical notes on social media, marketing systems, creative work and the tools changing how teams operate.</p>
      </section>
      <section className={styles.articleGrid} aria-label="Articles">
        {articles.map((article) => (
          <Link href={`/en/blog/${article.slug}`} key={article.slug} className={styles.articleCard}>
            <Image src={article.image} alt={article.imageAlt} width={900} height={620} sizes="(max-width: 800px) 100vw, 50vw" />
            <div><p>{article.tags.join(" · ")}</p><h2>{article.title}</h2><span>{article.excerpt}</span><strong>READ ARTICLE ↗</strong></div>
          </Link>
        ))}
      </section>
      <EnglishCta />
    </main>
  );
}
