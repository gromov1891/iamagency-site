import { notFound } from "next/navigation";
import { EnglishDetail, englishMetadata } from "@/app/en/EnglishPages";
import { EN_PACKAGES, findEnglishOffer } from "@/lib/i18n/en-content";
import { TRANSLATION_ROUTES } from "@/lib/i18n/routes";

export const generateStaticParams = () => EN_PACKAGES.map(({ slug }) => ({ slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = findEnglishOffer(EN_PACKAGES, slug);
  if (!item) return {};
  const path = `/en/packages/${slug}`;
  const translation = TRANSLATION_ROUTES.find((route) => route.en === path);
  return englishMetadata(item, path, translation?.ru || "/#tarify");
}

export default async function EnglishPackagePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = findEnglishOffer(EN_PACKAGES, slug);
  if (!item) notFound();
  return <EnglishDetail item={item} eyebrow="SOCIAL MEDIA PACKAGE" parentLabel="Packages" parentHref="/en/packages" canonicalPath={`/en/packages/${slug}`} />;
}
