import Image from "next/image";
import Link from "next/link";
import type { BlogArticle } from "./articles";
import styles from "./blog.module.css";

type BlogCardProps = {
  article: BlogArticle;
  compact?: boolean;
};

export default function BlogCard({ article, compact = false }: BlogCardProps) {
  return (
    <article className={`${styles.card} ${compact ? styles.cardCompact : ""}`}>
      <Link
        href={`/blog/${article.slug}`}
        className={styles.cardLink}
        aria-label={`Читать статью: ${article.title}`}
      >
        <div className={styles.cardCopy}>
          <div className={styles.cardMeta}>
            <span className={styles.cardLogo} aria-hidden="true">
              <span>I</span>
              <span>AM</span>
              <span>AGENCY</span>
            </span>
            <span className={styles.newBadge}>Новое</span>
          </div>
          <h2 className={styles.cardTitle}>{article.title}</h2>
          <p className={styles.cardExcerpt}>{article.excerpt}</p>
          <span className={styles.readMore}>Читать <span aria-hidden="true">↘</span></span>
        </div>
        <div className={styles.cardImageWrap}>
          <Image
            src={article.image}
            alt={article.imageAlt}
            fill
            sizes={compact ? "(max-width: 767px) 100vw, 33vw" : "(max-width: 767px) 100vw, 35vw"}
            className={styles.cardImage}
          />
        </div>
      </Link>
    </article>
  );
}
