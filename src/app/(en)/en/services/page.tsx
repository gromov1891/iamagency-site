import type { Metadata } from "next";
import { EnglishHub, englishMetadata } from "@/app/en/EnglishPages";
import { EN_SERVICES } from "@/lib/i18n/en-content";

const page = {
  metaTitle: "Social Media Services | I AM AGENCY",
  metaDescription: "Explore I AM AGENCY services for social media strategy, management, content production and integrated social media marketing.",
};

export const metadata: Metadata = englishMetadata(page, "/en/services", "/#uslugi");

export default function EnglishServicesPage() {
  return <EnglishHub eyebrow="SERVICES" title="ONE TEAM. EVERY PART OF SOCIAL." intro="Strategy, management, production and growth work designed together — then adapted to the team and market in front of us." items={EN_SERVICES} basePath="/en/services" numberLabel="SERVICE" />;
}
