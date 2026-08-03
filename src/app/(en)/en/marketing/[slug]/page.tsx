import { notFound } from "next/navigation";
import { EnglishDetail, englishMetadata } from "@/app/en/EnglishPages";
import { EN_MARKETING, findEnglishOffer } from "@/lib/i18n/en-content";
import { TRANSLATION_ROUTES } from "@/lib/i18n/routes";

export const generateStaticParams = () => EN_MARKETING.map(({ slug }) => ({ slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = findEnglishOffer(EN_MARKETING, slug);
  if (!item) return {};
  const path = `/en/marketing/${slug}`;
  const translation = TRANSLATION_ROUTES.find((route) => route.en === path);
  return englishMetadata(item, path, translation?.ru || "/marketing");
}

export default async function EnglishMarketingDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = findEnglishOffer(EN_MARKETING, slug);
  if (!item) notFound();
  return <EnglishDetail item={item} eyebrow="DIGITAL MARKETING CAPABILITY" parentLabel="Marketing" parentHref="/en/marketing" canonicalPath={`/en/marketing/${slug}`} />;
}
