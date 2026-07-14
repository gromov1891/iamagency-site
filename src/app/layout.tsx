import type { Metadata } from "next";
import "./globals.css";
import SocialLinks from "./blocks/SocialLinks";
import FooterLinks from "./blocks/FooterLinks";
import FloatFigures from "./blocks/FloatFigures";
import Header from "./blocks/Header";
import ServicesDropdown from "./blocks/ServicesDropdown";
import LeadModal from "./blocks/LeadModal";
import Analytics from "./blocks/Analytics";

export const metadata: Metadata = {
  metadataBase: new URL("https://iamagency.su"),
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
  alternates: { canonical: "/" },
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

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className="antialiased" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Oswald:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Analytics />
        <noscript>
          <div>
            <img
              src="https://mc.yandex.ru/watch/99802137"
              style={{ position: "absolute", left: "-9999px" }}
              alt=""
            />
          </div>
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
        />
        <Header />
        <ServicesDropdown />
        <LeadModal />
        <div className="site-shell">{children}</div>
        <SocialLinks />
        <FooterLinks />
        <FloatFigures />
      </body>
    </html>
  );
}
