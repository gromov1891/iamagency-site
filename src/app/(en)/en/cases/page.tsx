import type { Metadata } from "next";
import { EnglishHub, englishMetadata } from "@/app/en/EnglishPages";
import { EN_CASES } from "@/lib/i18n/en-content";

const page = {
  metaTitle: "Social Media Case Studies by Industry | I AM AGENCY",
  metaDescription: "Explore I AM AGENCY social media experience across beauty, fashion, hospitality, real estate, ecommerce, personal brands and more.",
};

export const metadata: Metadata = englishMetadata(page, "/en/cases", "/keisy");

export default function EnglishCasesPage() {
  return <EnglishHub eyebrow="SELECTED EXPERIENCE" title="WE LEARN THE CATEGORY. THEN MAKE IT MOVE." intro="Explore how our strategic and creative approach adapts across ten different categories. Detailed client examples can be shared where permissions allow." items={EN_CASES} basePath="/en/cases" numberLabel="SECTOR" />;
}
