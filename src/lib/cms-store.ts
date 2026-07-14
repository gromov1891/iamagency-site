import "server-only";

import { randomUUID } from "node:crypto";
import { unstable_noStore as noStore } from "next/cache";
import { BLOG_ARTICLES, BLOG_TAGS, getRelatedArticles, type ArticleSection, type BlogArticle, type BlogTag } from "@/app/blog/articles";
import { getJsonObject, getStorageBackend, listStoredObjects, putJsonObject } from "@/lib/object-storage";

const CMS_RECORDS_PREFIX = "cms/records/";

export type CmsArticleStatus = "draft" | "published";

export type CmsArticle = BlogArticle & {
  status: CmsArticleStatus;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
};

type CmsRecord =
  | { kind: "article"; article: CmsArticle; updatedAt: string }
  | { kind: "delete"; slug: string; updatedAt: string };

function cleanText(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function cleanStringList(value: unknown, maxItems: number, maxLength: number) {
  if (!Array.isArray(value)) return undefined;
  const items = value
    .map((item) => cleanText(item, maxLength))
    .filter(Boolean)
    .slice(0, maxItems);
  return items.length ? items : undefined;
}

function cleanImage(value: unknown) {
  const image = cleanText(value, 1200);
  if (!image) return "";
  if (image.startsWith("/")) return image;
  try {
    const url = new URL(image);
    return url.protocol === "https:" ? url.toString() : "";
  } catch {
    return "";
  }
}

function cleanSections(value: unknown): ArticleSection[] {
  if (!Array.isArray(value)) return [];
  return value
    .slice(0, 40)
    .map((item) => {
      const section = item && typeof item === "object" ? item as Record<string, unknown> : {};
      return {
        heading: cleanText(section.heading, 180) || undefined,
        paragraphs: cleanStringList(section.paragraphs, 20, 5000),
        bullets: cleanStringList(section.bullets, 30, 500),
        commands: cleanStringList(section.commands, 20, 160),
        image: cleanImage(section.image) || undefined,
        imageAlt: cleanText(section.imageAlt, 240) || undefined,
        caption: cleanText(section.caption, 300) || undefined,
      } satisfies ArticleSection;
    })
    .filter((section) => section.heading || section.paragraphs || section.bullets || section.commands || section.image);
}

export function sanitizeCmsArticle(value: unknown, existing?: CmsArticle): CmsArticle {
  const raw = value && typeof value === "object" ? value as Record<string, unknown> : {};
  const now = new Date().toISOString();
  const slug = cleanText(raw.slug, 120).toLowerCase();
  const title = cleanText(raw.title, 180);
  const excerpt = cleanText(raw.excerpt, 500);
  const image = cleanImage(raw.image);
  const imageAlt = cleanText(raw.imageAlt, 240);
  const tags = Array.isArray(raw.tags)
    ? raw.tags.filter((tag): tag is BlogTag => BLOG_TAGS.includes(tag as BlogTag)).slice(0, BLOG_TAGS.length)
    : [];
  const sections = cleanSections(raw.sections);
  const status: CmsArticleStatus = raw.status === "published" ? "published" : "draft";

  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) throw new Error("Некорректный адрес статьи");
  if (title.length < 5) throw new Error("Добавьте название статьи");
  if (excerpt.length < 20) throw new Error("Добавьте краткое описание от 20 символов");
  if (!image) throw new Error("Загрузите обложку статьи");
  if (imageAlt.length < 10) throw new Error("Добавьте содержательный alt-текст обложки");
  if (!tags.length) throw new Error("Выберите хотя бы один хэштег");
  if (!sections.length) throw new Error("Добавьте хотя бы один блок текста");

  return {
    slug,
    title,
    excerpt,
    image,
    imageAlt,
    tags: [...new Set(tags)],
    sections,
    status,
    createdAt: existing?.createdAt || now,
    updatedAt: now,
    publishedAt: status === "published" ? existing?.publishedAt || now : existing?.publishedAt,
  };
}

export async function getCmsArticles(): Promise<CmsArticle[]> {
  noStore();
  if (getStorageBackend() === "none") return [];

  try {
    const objects = await listStoredObjects(CMS_RECORDS_PREFIX);
    const latestBySlug = new Map<string, (typeof objects)[number]>();

    for (const object of objects) {
      const parts = object.key.split("/");
      const slug = parts[2];
      if (!slug) continue;
      const current = latestBySlug.get(slug);
      if (!current || object.key.localeCompare(current.key) > 0) latestBySlug.set(slug, object);
    }

    const records = await Promise.all(
      [...latestBySlug.values()].map((object) => getJsonObject<CmsRecord>(object.key)),
    );

    return records
      .filter((record): record is Extract<CmsRecord, { kind: "article" }> => record?.kind === "article")
      .map((record) => record.article);
  } catch (error) {
    console.error("Unable to load CMS articles", error);
    return [];
  }
}

function recordPath(slug: string) {
  return `${CMS_RECORDS_PREFIX}${slug}/${Date.now().toString().padStart(13, "0")}-${randomUUID()}.json`;
}

async function saveRecord(slug: string, record: CmsRecord) {
  await putJsonObject(recordPath(slug), record);
}

export async function upsertCmsArticle(article: CmsArticle) {
  await saveRecord(article.slug, { kind: "article", article, updatedAt: article.updatedAt });
}

export async function deleteCmsArticle(slug: string) {
  await saveRecord(slug, { kind: "delete", slug, updatedAt: new Date().toISOString() });
}

export async function getPublishedArticles() {
  const cms = (await getCmsArticles()).filter((article) => article.status === "published");
  const bySlug = new Map<string, BlogArticle>();
  for (const article of BLOG_ARTICLES) bySlug.set(article.slug, article);
  for (const article of cms) bySlug.set(article.slug, article);
  return [...bySlug.values()].sort((a, b) => {
    if (!a.publishedAt && !b.publishedAt) return 0;
    if (!a.publishedAt) return 1;
    if (!b.publishedAt) return -1;
    return Date.parse(b.publishedAt) - Date.parse(a.publishedAt);
  });
}

export async function getPublishedArticle(slug: string) {
  return (await getPublishedArticles()).find((article) => article.slug === slug);
}

export async function getPublishedRelatedArticles(article: BlogArticle, limit = 3) {
  return getRelatedArticles(article, limit, await getPublishedArticles());
}
