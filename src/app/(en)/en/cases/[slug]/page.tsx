import { notFound } from "next/navigation";
import { EnglishDetail, englishMetadata } from "@/app/en/EnglishPages";
import { EN_CASES, findEnglishOffer } from "@/lib/i18n/en-content";
import { TRANSLATION_ROUTES } from "@/lib/i18n/routes";

export const generateStaticParams = () => EN_CASES.map(({ slug }) => ({ slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = findEnglishOffer(EN_CASES, slug);
  if (!item) return {};
  const path = `/en/cases/${slug}`;
  const translation = TRANSLATION_ROUTES.find((route) => route.en === path);
  return englishMetadata(item, path, translation?.ru || "/keisy");
}

export default async function EnglishCasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = findEnglishOffer(EN_CASES, slug);
  if (!item) notFound();
  return <EnglishDetail item={item} eyebrow="CATEGORY EXPERIENCE" parentLabel="Cases" parentHref="/en/cases" canonicalPath={`/en/cases/${slug}`} />;
}
