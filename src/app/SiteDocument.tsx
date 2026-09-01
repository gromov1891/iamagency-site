import type { Metadata } from "next";
import "./globals.css";
import SocialLinks from "./blocks/SocialLinks";
import FooterLinks from "./blocks/FooterLinks";
import FloatFigures from "./blocks/FloatFigures";
import Header from "./blocks/Header";
import ServicesDropdown from "./blocks/ServicesDropdown";
import SchoolDropdown from "./blocks/SchoolDropdown";
import LeadModal from "./blocks/LeadModal";
import IntensivePromoModal from "./blocks/IntensivePromoModal";
import Analytics from "./blocks/Analytics";
import SiteEnglishFooter from "./en/SiteEnglishFooter";

export const siteMetadata: Metadata = {
  metadataBase: new URL("https://iamagency.su"),
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon-96.png", sizes: "96x96", type: "image/png" },
    ],
    shortcut: "/favicon-96.png",
    apple: [{ url: "/apple-icon.png", sizes: "288x288", type: "image/png" }],
  },
  title: {
    default: "I am Agency — SMM-агентство полного цикла",
    template: "%s — I am Agency",
  },
  description:
    "SMM-агентство I AM AGENCY: стратегия, ведение и продвижение соцсетей, контент, съёмки и performance-маркетинг под ключ. 7 лет в нише, 450+ клиентов.",
  applicationName: "I AM AGENCY",
  authors: [{ name: "I AM AGENCY", url: "https://iamagency.su" }],
  creator: "I AM AGENCY",
  publisher: "I AM AGENCY",
  category: "SMM и digital-маркетинг",
  openGraph: {
    title: "I am Agency — SMM-агентство полного цикла",
    description:
      "Ведение соцсетей, таргет, контент и продакшн под ключ. 7 лет в нише, 450+ довольных клиентов.",
    url: "https://iamagency.su",
    siteName: "I am Agency",
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "I AM AGENCY - SMM-агентство полного цикла",
    description: "Стратегия, ведение и продвижение соцсетей, контент и performance-маркетинг под ключ.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const englishSiteMetadata: Metadata = {
  ...siteMetadata,
  title: {
    default: "I AM AGENCY | Full-Service Social Media Agency",
    template: "%s | I AM AGENCY",
  },
  description:
    "Full-service social media agency for strategy, content production, social media management, paid campaigns and influencer marketing.",
  category: "Social media and digital marketing",
  openGraph: {
    title: "I AM AGENCY | Full-Service Social Media Agency",
    description: "Strategy, content, paid social and influencer marketing from one connected team.",
    url: "https://iamagency.su/en",
    siteName: "I AM AGENCY",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "I AM AGENCY | Full-Service Social Media Agency",
    description: "Strategy, content, paid social and influencer marketing from one connected team.",
  },
};

const siteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://iamagency.su/#organization",
      name: "I AM AGENCY",
      url: "https://iamagency.su",
      logo: {
        "@type": "ImageObject",
        url: "https://iamagency.su/apple-icon.png",
        width: 288,
        height: 288,
      },
      description: "SMM-агентство полного цикла: стратегия, ведение и продвижение социальных сетей, контент, съёмки и digital-маркетинг.",
      foundingDate: "2019",
      email: "iamagency.su@gmail.com",
      telephone: "+7-993-437-67-60",
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: "+7-993-437-67-60",
        email: "iamagency.su@gmail.com",
        availableLanguage: ["Russian", "English"],
      },
      legalName: "ИП Громова Мария Андреевна",
      taxID: "420545021010",
      areaServed: { "@type": "Country", name: "Россия" },
      knowsAbout: [
        "SMM",
        "продвижение в социальных сетях",
        "ведение социальных сетей",
        "SMM-стратегия",
        "контент-маркетинг",
        "performance-маркетинг",
      ],
      sameAs: [
        "https://t.me/iam_smmagency",
        "https://www.instagram.com/iamagency.smm",
        "https://vk.ru/imagencysmm",
        "https://dzen.ru/iamagency",
        "https://www.youtube.com/@iamagency",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://iamagency.su/#website",
      url: "https://iamagency.su",
      name: "I AM AGENCY",
      inLanguage: "ru-RU",
      publisher: { "@id": "https://iamagency.su/#organization" },
    },
  ],
};

export default function SiteDocument({
  children,
  locale,
}: Readonly<{ children: React.ReactNode; locale: "ru" | "en" }>) {
  const localizedSiteJsonLd =
    locale === "en"
      ? {
          ...siteJsonLd,
          "@graph": [
            {
              ...siteJsonLd["@graph"][0],
              description:
                "Full-service social media agency for strategy, content production, social media management, paid campaigns and influencer marketing.",
              knowsAbout: [
                "Social media strategy",
                "Social media management",
                "Content production",
                "Paid social",
                "Influencer marketing",
              ],
            },
            { ...siteJsonLd["@graph"][1], inLanguage: "en" },
          ],
        }
      : siteJsonLd;

  return (
    <html lang={locale} className="antialiased" suppressHydrationWarning>
      <body>
        <Analytics />
        <noscript>
          <div>
            <img
              src="https://mc.yandex.ru/watch/98432843"
              style={{ position: "absolute", left: "-9999px" }}
              alt=""
            />
          </div>
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localizedSiteJsonLd) }}
        />
        <Header />
        <ServicesDropdown />
        <SchoolDropdown />
        <LeadModal />
        <IntensivePromoModal locale={locale} />
        <div className="site-shell">{children}</div>
        {locale === "en" ? <SiteEnglishFooter /> : null}
        <div
          className="tantal-credit"
          aria-label={locale === "en" ? "Website development by Tantal" : "Разработка сайта Tantal"}
        >
          <a href="https://tantal.ai" target="_blank" rel="noopener noreferrer">
            <span>{locale === "en" ? "MADE BY" : "СДЕЛАНО BY"}</span>
            <i aria-hidden="true" />
            <strong>TANTAL</strong>
          </a>
        </div>
        <SocialLinks />
        <FooterLinks />
        <FloatFigures />
      </body>
    </html>
  );
}
