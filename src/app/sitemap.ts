import type { MetadataRoute } from "next";
import { CASES } from "./case/cases";
import { DIRECTIONS } from "./marketing/directions";
import { TARIFY } from "./tarify/tarify";
import { USLUGI } from "./uslugi/uslugi";
import { getPublishedArticles } from "@/lib/cms-store";
import { TRANSLATION_ROUTES, findTranslationRoute } from "@/lib/i18n/routes";

const BASE = "https://iamagency.su";
const UPDATED = new Date("2026-07-13T00:00:00+03:00");

const entry = (
  path: string,
  priority: number,
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "monthly",
  lastModified: Date = UPDATED,
  includeAlternates = true,
): MetadataRoute.Sitemap[number] => {
  const normalizedPath = path || "/";
  const translation = includeAlternates ? findTranslationRoute(normalizedPath) : undefined;
  return ({
  url: `${BASE}${path}`,
  lastModified,
  changeFrequency,
  priority,
  alternates:
    translation?.status === "published"
      ? {
          languages: {
            ru: `${BASE}${translation.ru}`,
            en: `${BASE}${translation.en}`,
            "x-default": `${BASE}${translation.ru}`,
          },
        }
      : undefined,
  });
};

const priorityFor = (path: string) => {
  if (path === "/en") return 1;
  if (["/en/cases", "/en/marketing", "/en/services", "/en/blog"].includes(path)) return 0.9;
  if (path.startsWith("/en/blog/")) return 0.75;
  if (path.startsWith("/en/privacy") || path.startsWith("/en/personal-data") || path === "/en/sitemap") return 0.2;
  return 0.8;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [blogArticles, englishBlogArticles] = await Promise.all([
    getPublishedArticles("ru"),
    getPublishedArticles("en"),
  ]);
  const russianEntries = [
    entry("", 1, "weekly"),
    entry("/keisy", 0.9, "monthly"),
    ...CASES.map((item) => entry(`/case/${item.slug}`, 0.8)),
    entry("/marketing", 0.9, "monthly"),
    ...DIRECTIONS.filter((item) => item.status === "ready").map((item) =>
      entry(`/marketing/${item.slug}`, 0.8)
    ),
    entry("/shkola-smm", 0.9, "monthly"),
    entry("/blog", 0.9, "weekly"),
    ...blogArticles.map((item) => entry(
      `/blog/${item.slug}`,
      0.75,
      "monthly",
      item.updatedAt ? new Date(item.updatedAt) : UPDATED
    )),
    ...USLUGI.map((item) => entry(`/uslugi/${item.slug}`, 0.8)),
    ...TARIFY.map((item) => entry(`/tarify/${item.slug}`, 0.7)),
    entry("/privacy-consent", 0.2, "yearly"),
    entry("/privacy-policy", 0.2, "yearly"),
    entry("/sitemap", 0.2, "monthly"),
  ];

  const translatedEntries = TRANSLATION_ROUTES
    .filter((route) => route.status === "published")
    .map((route) => entry(route.en, priorityFor(route.en), route.en.startsWith("/en/blog") ? "monthly" : "monthly"));

  const registeredEnglishPaths = new Set(TRANSLATION_ROUTES.map((route) => route.en));
  const cmsEnglishEntries = englishBlogArticles
    .filter((article) => !registeredEnglishPaths.has(`/en/blog/${article.slug}`))
    .map((article) => entry(
      `/en/blog/${article.slug}`,
      0.75,
      "monthly",
      article.updatedAt ? new Date(article.updatedAt) : UPDATED,
      false,
    ));

  return [...russianEntries, ...translatedEntries, ...cmsEnglishEntries];
}
