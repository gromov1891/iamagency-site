"use client";

import Image from "next/image";
import { useEffect, useMemo, useState, type CSSProperties } from "react";
import BlogCard from "./BlogCard";
import { BLOG_TAGS, type BlogArticle, type BlogTag } from "./articles";
import styles from "./blog.module.css";

const EN_TAG_LABELS: Record<string, string> = {
  "СММ": "SMM",
  "Маркетинг": "Marketing",
  "Продвижение": "Growth",
  "Визуал": "Visuals",
  "Социальные сети": "Social media",
  "Нейросети": "AI",
  "Тренды": "Trends",
};

export default function BlogIndex({ articles, locale = "ru" }: { articles: BlogArticle[]; locale?: "ru" | "en" }) {
  const english = locale === "en";
  const tagLabel = (tag: string) => english ? EN_TAG_LABELS[tag] || tag : tag;
  const [activeTag, setActiveTag] = useState<BlogTag | null>(null);

  useEffect(() => {
    const requestedTag = new URLSearchParams(window.location.search).get("tag");
    const tag = BLOG_TAGS.find((candidate) => candidate === requestedTag);
    // Read the URL after hydration so direct links to a filter remain shareable.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (tag) setActiveTag(tag);
  }, []);

  const visibleArticles = useMemo(() => {
    const matching = articles.filter((article) => !activeTag || article.tags.includes(activeTag));
    return activeTag ? matching.slice(0, 4) : matching;
  }, [activeTag, articles]);

  function selectTag(tag: BlogTag) {
    const nextTag = activeTag === tag ? null : tag;
    setActiveTag(nextTag);
    const base = english ? "/en/blog" : "/blog";
    const url = nextTag ? `${base}?tag=${encodeURIComponent(nextTag)}` : base;
    window.history.replaceState(null, "", url);
  }

  return (
    <main className={styles.blogPage}>
      <div className={styles.blogLayout}>
        <header className={styles.blogIntro}>
          <h1 className={styles.blogTitle}>{english ? "Blog" : "Блог"}</h1>
          <div className={styles.filtersBlock}>
            <p className={styles.filtersLabel}>{english ? "Categories" : "Категории"}</p>
            <div className={styles.filters} aria-label={english ? "Filter articles by category" : "Фильтр статей по категориям"}>
              {BLOG_TAGS.map((tag, index) => {
                const active = tag === activeTag;
                return (
                  <button
                    key={tag}
                    type="button"
                    className={`${styles.filter} ${active ? styles.filterActive : ""}`}
                    onClick={() => selectTag(tag)}
                    aria-pressed={active}
                  >
                    <span>{tagLabel(tag)}</span>
                    <span
                      className={styles.filterIcon}
                      style={{ "--filter-accent": index % 2 ? "#ffad19" : "#8992e4" } as CSSProperties}
                      aria-hidden="true"
                    >
                      {active ? "−" : "+"}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </header>

        <section className={styles.cardsSection} aria-live="polite">
          <p className="sr-only">
            {activeTag ? (english ? `Articles about ${tagLabel(activeTag)}` : `Статьи по теме ${activeTag}`) : (english ? "All articles" : "Все статьи")}
          </p>
          <div className={styles.cardsGrid}>
            {visibleArticles.map((article) => (
              <BlogCard key={article.slug} article={article} locale={locale} />
            ))}
          </div>
          {visibleArticles.length === 0 && (
            <p className={styles.emptyState}>{english ? "New articles are coming to this category." : "В этой категории скоро появятся статьи."}</p>
          )}
        </section>
      </div>
      <Image
        src="/blk/blog/orange_flower.webp"
        alt=""
        width={439}
        height={399}
        className={styles.orangeFlower}
        aria-hidden="true"
      />
    </main>
  );
}
