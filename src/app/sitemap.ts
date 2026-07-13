import type { MetadataRoute } from "next";
import { CASES } from "./case/cases";
import { DIRECTIONS } from "./marketing/directions";
import { TARIFY } from "./tarify/tarify";
import { USLUGI } from "./uslugi/uslugi";
import { getPublishedArticles } from "@/lib/cms-store";

const BASE = "https://iamagency.su";
const UPDATED = new Date("2026-07-13T00:00:00+03:00");

const entry = (
  path: string,
  priority: number,
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "monthly",
  lastModified: Date = UPDATED
): MetadataRoute.Sitemap[number] => ({
  url: `${BASE}${path}`,
  lastModified,
  changeFrequency,
  priority,
});

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogArticles = await getPublishedArticles();
  return [
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
}
