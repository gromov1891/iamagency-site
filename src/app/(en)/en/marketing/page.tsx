import type { Metadata } from "next";
import { EnglishHub, englishMetadata } from "@/app/en/EnglishPages";
import { EN_MARKETING } from "@/lib/i18n/en-content";

const page = {
  metaTitle: "Digital Marketing Services | I AM AGENCY",
  metaDescription: "Explore paid media, SEO, analytics, influencer marketing, digital PR, creative campaigns, marketing technology and web development services.",
};

export const metadata: Metadata = englishMetadata(page, "/en/marketing", "/marketing");

export default function EnglishMarketingPage() {
  return <EnglishHub eyebrow="DIGITAL EXPERTISE" title="THE RIGHT CHANNELS. CONNECTED BY ONE PLAN." intro="Sixteen focused capabilities that can work independently or as part of an integrated growth programme." items={EN_MARKETING} basePath="/en/marketing" numberLabel="CAPABILITY" />;
}
