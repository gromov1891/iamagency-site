import { notFound } from "next/navigation";
import ResponsiveBlock from "@/app/blocks/ResponsiveBlock";
import EnglishFigmaEnhancer from "@/app/en/EnglishFigmaEnhancer";
import { englishMetadata } from "@/app/en/EnglishPages";
import { futerHtml, futerH } from "@/app/blocks/gen/futerHtml";
import { futerTabletHtml, futerTabletH } from "@/app/blocks/gen/futerTabletHtml";
import { futerMobileHtml, futerMobileH } from "@/app/blocks/gen/futerMobileHtml";
import { USLUGI } from "@/app/uslugi/uslugi";
import { EN_SERVICES, findEnglishOffer } from "@/lib/i18n/en-content";
import { TRANSLATION_ROUTES } from "@/lib/i18n/routes";
import { translateGeneratedHtml as en } from "@/lib/i18n/translate-generated-html";

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
  const index = EN_SERVICES.findIndex((item) => item.slug === slug);
  const item = EN_SERVICES[index];
  const source = USLUGI[index];
  if (!item || !source) notFound();
  const desktopHtml = en(source.html);
  const tabletHtml = desktopHtml.replace(/<h1\b/g, "<h2").replace(/<\/h1>/g, "</h2>");
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: item.name,
    description: item.metaDescription,
    url: `https://iamagency.su/en/services/${slug}`,
    serviceType: item.name,
    provider: { "@id": "https://iamagency.su/#organization" },
  };

  return (
    <EnglishFigmaEnhancer>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="header-spacer" style={{ background: "#1C1C1C" }} />
      <ResponsiveBlock
        desktopHtml={desktopHtml}
        desktopH={source.height}
        tabletHtml={tabletHtml}
        tabletH={source.height}
        tabletW={1440}
        mobileHtml={tabletHtml}
        mobileH={source.height}
        mobileW={1440}
      />
      <ResponsiveBlock
        desktopHtml={en(futerHtml)}
        desktopH={futerH}
        tabletHtml={en(futerTabletHtml)}
        tabletH={futerTabletH}
        mobileHtml={en(futerMobileHtml)}
        mobileH={futerMobileH}
        overflow="hidden"
      />
    </EnglishFigmaEnhancer>
  );
}
