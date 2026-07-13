import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BuilderBlock from "../../blocks/BuilderBlock";
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

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: "https://iamagency.su/" },
      { "@type": "ListItem", position: 2, name: "Тарифы", item: "https://iamagency.su/#tarify" },
      { "@type": "ListItem", position: 3, name: t.name, item: `https://iamagency.su/tarify/${t.slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <div className="header-spacer" style={{ background: "#1C1C1C" }} />
      <BuilderBlock html={t.html} h={t.height} />
    </>
  );
}
