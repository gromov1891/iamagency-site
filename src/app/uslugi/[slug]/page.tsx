import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ResponsiveBlock from "../../blocks/ResponsiveBlock";
import { futerHtml, futerH } from "../../blocks/gen/futerHtml";
import { futerTabletHtml, futerTabletH } from "../../blocks/gen/futerTabletHtml";
import { futerMobileHtml, futerMobileH } from "../../blocks/gen/futerMobileHtml";
import { USLUGI, getUsluga } from "../uslugi";

/* Страница услуги — тёмный холст 1:1 из Figma (фреймы «Услуги 1..4»),
   масштабируется BuilderBlock'ом как остальные блоки сайта. */

export function generateStaticParams() {
  return USLUGI.map((u) => ({ slug: u.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const u = getUsluga(slug);
  if (!u) return {};
  const path = `/uslugi/${u.slug}`;
  return {
    title: { absolute: u.metaTitle },
    description: u.metaDescription,
    alternates: { canonical: path },
    openGraph: {
      title: u.metaTitle,
      description: u.metaDescription,
      url: path,
      siteName: "I AM AGENCY",
      locale: "ru_RU",
      type: "website",
    },
    robots: { index: true, follow: true },
  };
}

export default async function UslugaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const u = getUsluga(slug);
  if (!u) notFound();
  const tabletHtml = u.html.replace(/<h1\b/g, "<h2").replace(/<\/h1>/g, "</h2>");

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: "https://iamagency.su/" },
      { "@type": "ListItem", position: 2, name: "Услуги", item: "https://iamagency.su/#uslugi" },
      { "@type": "ListItem", position: 3, name: u.name, item: `https://iamagency.su/uslugi/${u.slug}` },
    ],
  };
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: u.name,
    description: u.metaDescription,
    url: `https://iamagency.su/uslugi/${u.slug}`,
    serviceType: u.name,
    areaServed: { "@type": "Country", name: "Россия" },
    provider: { "@id": "https://iamagency.su/#organization" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbJsonLd, serviceJsonLd]) }} />
      <div className="header-spacer" style={{ background: "#1C1C1C" }} />
      <ResponsiveBlock
        desktopHtml={u.html}
        desktopH={u.height}
        tabletHtml={tabletHtml}
        tabletH={u.height}
        tabletW={1440}
        mobileHtml={u.mobileHtml}
        mobileH={u.mobileHeight}
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
