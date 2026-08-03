import type { Metadata } from "next";
import { EnglishHub, englishMetadata } from "@/app/en/EnglishPages";
import { EN_PACKAGES } from "@/lib/i18n/en-content";

const page = {
  metaTitle: "Social Media Packages | I AM AGENCY",
  metaDescription: "Compare three flexible social media service frameworks for consistent management, active growth and full-service delivery.",
};

export const metadata: Metadata = englishMetadata(page, "/en/packages", "/#tarify");

export default function EnglishPackagesPage() {
  return <EnglishHub eyebrow="SERVICE FRAMEWORKS" title="A CLEAR START. A SCOPE BUILT FOR YOU." intro="Our packages provide useful starting points. Final deliverables, production and media responsibilities are always confirmed around the real project." items={EN_PACKAGES} basePath="/en/packages" numberLabel="PACKAGE" />;
}
