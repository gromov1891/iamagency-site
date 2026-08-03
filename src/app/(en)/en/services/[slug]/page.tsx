import { notFound } from "next/navigation";
import { EnglishDetail, englishMetadata } from "@/app/en/EnglishPages";
import { EN_SERVICES, findEnglishOffer } from "@/lib/i18n/en-content";
import { TRANSLATION_ROUTES } from "@/lib/i18n/routes";

export const generateStaticParams = () => EN_SERVICES.map(({ slug }) => ({ slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = findEnglishOffer(EN_SERVICES, slug);
  if (!item) return {};
  const path = `/en/services/${slug}`;
  const translation = TRANSLATION_ROUTES.find((route) => route.en === path);
  return englishMetadata(item, path, translation?.ru || "/#uslugi");
}

export default async function EnglishServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = findEnglishOffer(EN_SERVICES, slug);
  if (!item) notFound();
  return <EnglishDetail item={item} eyebrow="SOCIAL MEDIA SERVICE" parentLabel="Services" parentHref="/en/services" canonicalPath={`/en/services/${slug}`} />;
}
