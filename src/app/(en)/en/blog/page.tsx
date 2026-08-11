import type { Metadata } from "next";
import BlogIndex from "@/app/blog/BlogIndex";
import { getPublishedArticles } from "@/lib/cms-store";
import { getSeoAlternates } from "@/lib/i18n/routes";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: { absolute: "Social Media and Marketing Insights | I AM AGENCY" },
  description: "Practical articles on social media, content, brand growth, marketing systems, design tools and AI for business.",
  alternates: getSeoAlternates("/blog"),
  openGraph: { title: "I AM AGENCY Blog", description: "Practical social media and marketing insights.", url: "https://iamagency.su/en/blog", siteName: "I AM AGENCY", locale: "en_US", type: "website" },
};

export default async function EnglishBlogPage() {
  const articles = await getPublishedArticles("en");
  return <><div className="header-spacer" style={{ background: "#fff" }} /><BlogIndex articles={articles} locale="en" /></>;
}
