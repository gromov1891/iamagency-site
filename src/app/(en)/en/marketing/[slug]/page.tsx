import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EnglishDetail, englishMetadata } from "@/app/en/EnglishPages";
import { EN_MARKETING, findEnglishOffer } from "@/lib/i18n/en-content";

export const generateStaticParams = () => EN_MARKETING.map(({ slug }) => ({ slug }));

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = findEnglishOffer(EN_MARKETING, slug);
  if (!item) return {};

  return englishMetadata(
    item,
    `/en/marketing/${slug}`,
    "/marketing",
  );
}

export default async function EnglishMarketingDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = findEnglishOffer(EN_MARKETING, slug);
  if (!item) notFound();

  const canonicalPath = `/en/marketing/${slug}`;

  return (
    <EnglishDetail
      item={item}
      eyebrow="MARKETING CAPABILITY"
      parentLabel="Marketing"
      parentHref="/en/marketing"
      canonicalPath={canonicalPath}
    />
  );
}
