import type { Metadata } from "next";
import ContactPage from "@/app/contact/ContactPage";
import { getSeoAlternates } from "@/lib/i18n/routes";

const TITLE = "Контакты SMM-агентства I AM AGENCY";
const DESCRIPTION = "Свяжитесь с I AM AGENCY по SMM, контенту и продвижению: телефон, email, Telegram, WhatsApp и соцсети. Сыграйте и получите скидку до 10%.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: getSeoAlternates("/kontakty"),
  openGraph: { title: TITLE, description: DESCRIPTION, url: "https://iamagency.su/kontakty", siteName: "I AM AGENCY", locale: "ru_RU", type: "website" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

export default function ContactsPage() {
  return <ContactPage locale="ru" />;
}
