import type { Metadata } from "next";
import ContactPage from "@/app/contact/ContactPage";
import { getSeoAlternates } from "@/lib/i18n/routes";

const TITLE = "Contact I AM AGENCY | Social Media Agency";
const DESCRIPTION = "Contact I AM AGENCY for social media strategy, content and growth. Find our email, phone and social channels, then play to unlock up to 10% off.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: getSeoAlternates("/en/contacts"),
  openGraph: { title: TITLE, description: DESCRIPTION, url: "https://iamagency.su/en/contacts", siteName: "I AM AGENCY", locale: "en_US", type: "website" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

export default function EnglishContactsPage() {
  return <ContactPage locale="en" />;
}

