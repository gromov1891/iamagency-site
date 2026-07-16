"use client";

import Image from "next/image";
import { useEffect, useMemo, useState, type CSSProperties } from "react";
import BlogCard from "./BlogCard";
import { BLOG_TAGS, type BlogArticle, type BlogTag } from "./articles";
import styles from "./blog.module.css";

export default function BlogIndex({ articles }: { articles: BlogArticle[] }) {
  const [activeTag, setActiveTag] = useState<BlogTag | null>(null);

  useEffect(() => {
    const requestedTag = new URLSearchParams(window.location.search).get("tag");
    const tag = BLOG_TAGS.find((candidate) => candidate === requestedTag);
    // Read the URL after hydration so direct links to a filter remain shareable.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (tag) setActiveTag(tag);
  }, []);

  const visibleArticles = useMemo(() => {
    return articles.filter((article) => !activeTag || article.tags.includes(activeTag));
  }, [activeTag, articles]);

  function selectTag(tag: BlogTag) {
    const nextTag = activeTag === tag ? null : tag;
    setActiveTag(nextTag);
    const url = nextTag ? `/blog?tag=${encodeURIComponent(nextTag)}` : "/blog";
    window.history.replaceState(null, "", url);
  }

  return (
    <main className={styles.blogPage}>
      <div className={styles.blogLayout}>
        <header className={styles.blogIntro}>
          <h1 className={styles.blogTitle}>Блог</h1>
          <div className={styles.filtersBlock}>
            <p className={styles.filtersLabel}>Категории</p>
            <div className={styles.filters} aria-label="Фильтр статей по категориям">
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
                    <span>{tag}</span>
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
            {activeTag ? `Статьи по теме ${activeTag}` : "Все статьи"}
          </p>
          <div className={styles.cardsGrid}>
            {visibleArticles.map((article) => (
              <BlogCard key={article.slug} article={article} />
            ))}
          </div>
          {visibleArticles.length === 0 && (
            <p className={styles.emptyState}>В этой категории скоро появятся статьи.</p>
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
