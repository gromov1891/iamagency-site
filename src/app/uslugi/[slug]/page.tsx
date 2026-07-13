import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BuilderBlock from "../../blocks/BuilderBlock";
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

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: "https://iamagency.su/" },
      { "@type": "ListItem", position: 2, name: "Услуги", item: "https://iamagency.su/#uslugi" },
      { "@type": "ListItem", position: 3, name: u.name, item: `https://iamagency.su/uslugi/${u.slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <div className="header-spacer" style={{ background: "#1C1C1C" }} />
      <BuilderBlock html={u.html} h={u.height} />
    </>
  );
}
