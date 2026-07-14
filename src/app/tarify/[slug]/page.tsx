import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ResponsiveBlock from "../../blocks/ResponsiveBlock";
import { futerHtml, futerH } from "../../blocks/gen/futerHtml";
import { futerTabletHtml, futerTabletH } from "../../blocks/gen/futerTabletHtml";
import { futerMobileHtml, futerMobileH } from "../../blocks/gen/futerMobileHtml";
import { TARIFY, getTarif } from "../tarify";

/* Страница тарифа — тёмный холст 1:1 из Figma (фреймы «Движение» и «ПРОРЫВ»),
   масштабируется BuilderBlock'ом как остальные блоки сайта. */

export function generateStaticParams() {
  return TARIFY.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const t = getTarif(slug);
  if (!t) return {};
  const path = `/tarify/${t.slug}`;
  return {
    title: { absolute: t.metaTitle },
    description: t.metaDescription,
    alternates: { canonical: path },
    openGraph: {
      title: t.metaTitle,
      description: t.metaDescription,
      url: path,
      siteName: "I AM AGENCY",
      locale: "ru_RU",
      type: "website",
    },
    robots: { index: true, follow: true },
  };
}

export default async function TarifPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const t = getTarif(slug);
  if (!t) notFound();
  const tabletHtml = t.html.replace(/<h1\b/g, "<h2").replace(/<\/h1>/g, "</h2>");

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: "https://iamagency.su/" },
      { "@type": "ListItem", position: 2, name: "Тарифы", item: "https://iamagency.su/#tarify" },
      { "@type": "ListItem", position: 3, name: t.name, item: `https://iamagency.su/tarify/${t.slug}` },
    ],
  };
  const tariffJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Тариф «${t.name}»`,
    description: t.metaDescription,
    url: `https://iamagency.su/tarify/${t.slug}`,
    serviceType: "Ведение и продвижение социальных сетей",
    provider: { "@id": "https://iamagency.su/#organization" },
    areaServed: { "@type": "Country", name: "Россия" },
    offers: {
      "@type": "Offer",
      price: t.price,
      priceCurrency: "RUB",
      availability: "https://schema.org/InStock",
      url: `https://iamagency.su/tarify/${t.slug}`,
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbJsonLd, tariffJsonLd]) }} />
      <div className="header-spacer" style={{ background: "#1C1C1C" }} />
      <ResponsiveBlock
        desktopHtml={t.html}
        desktopH={t.height}
        tabletHtml={tabletHtml}
        tabletH={t.height}
        tabletW={1440}
        mobileHtml={t.mobileHtml}
        mobileH={t.mobileHeight}
      />
      <ResponsiveBlock
        desktopHtml={futerHtml}
        desktopH={futerH}
        tabletHtml={futerTabletHtml}
        tabletH={futerTabletH}
        mobileHtml={futerMobileHtml}
        mobileH={futerMobileH}
        overflow="hidden"
      />
    </>
  );
}
