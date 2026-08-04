import type { Metadata } from "next";
import BlogIndex from "@/app/blog/BlogIndex";
import ResponsiveBlock from "@/app/blocks/ResponsiveBlock";
import { futerHtml, futerH } from "@/app/blocks/gen/futerHtml";
import { futerTabletHtml, futerTabletH } from "@/app/blocks/gen/futerTabletHtml";
import { futerMobileHtml, futerMobileH } from "@/app/blocks/gen/futerMobileHtml";
import { getPublishedArticles } from "@/lib/cms-store";
import { getSeoAlternates } from "@/lib/i18n/routes";
import { translateGeneratedHtml as en } from "@/lib/i18n/translate-generated-html";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: { absolute: "Social Media and Marketing Insights | I AM AGENCY" },
  description: "Practical articles on social media, content, brand growth, marketing systems, design tools and AI for business.",
  alternates: getSeoAlternates("/blog"),
  openGraph: { title: "I AM AGENCY Blog", description: "Practical social media and marketing insights.", url: "https://iamagency.su/en/blog", siteName: "I AM AGENCY", locale: "en_US", type: "website" },
};

export default async function EnglishBlogPage() {
  const articles = await getPublishedArticles("en");
  return <><div className="header-spacer" style={{ background: "#fff" }} /><BlogIndex articles={articles} locale="en" /><ResponsiveBlock desktopHtml={en(futerHtml)} desktopH={futerH} tabletHtml={en(futerTabletHtml)} tabletH={futerTabletH} mobileHtml={en(futerMobileHtml)} mobileH={futerMobileH} overflow="hidden" /></>;
}
