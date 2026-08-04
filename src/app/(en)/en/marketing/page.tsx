import type { Metadata } from "next";
import { EnglishHub } from "@/app/en/EnglishPages";
import { EN_MARKETING } from "@/lib/i18n/en-content";
import { getSeoAlternates } from "@/lib/i18n/routes";

const SITE_URL = "https://iamagency.su";
const TITLE = "Full-Service Digital Marketing Agency | I AM AGENCY";
const DESCRIPTION =
  "Performance, media and digital marketing: paid search, SEO, analytics, PR, influencer campaigns, creative and web development.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: getSeoAlternates("/en/marketing"),
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/en/marketing`,
    siteName: "I AM AGENCY",
    locale: "en_US",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function EnglishMarketingPage() {
  return (
    <EnglishHub
      eyebrow="INTEGRATED GROWTH"
      title="Marketing"
      intro="Sixteen specialist capabilities, connected by one strategy. Choose a focused workstream or ask us to build the right combination around your business goal."
      items={EN_MARKETING}
      basePath="/en/marketing"
      numberLabel="DIRECTION"
    />
  );
}
