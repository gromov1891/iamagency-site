import type { Metadata } from "next";
import { getSeoAlternates } from "@/lib/i18n/routes";
import BlogIndex from "@/app/blog/BlogIndex";
import ResponsiveBlock from "@/app/blocks/ResponsiveBlock";
import { futerHtml, futerH } from "@/app/blocks/gen/futerHtml";
import { futerTabletHtml, futerTabletH } from "@/app/blocks/gen/futerTabletHtml";
import { futerMobileHtml, futerMobileH } from "@/app/blocks/gen/futerMobileHtml";
import { getPublishedArticles } from "@/lib/cms-store";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: { absolute: "Блог о SMM, маркетинге и визуале | I AM AGENCY" },
  description:
    "Практический блог I AM AGENCY о SMM, продвижении в социальных сетях, digital-маркетинге, визуале, нейросетях и контенте для бизнеса с примерами.",
  alternates: getSeoAlternates("/blog"),
  openGraph: {
    title: "Блог I AM AGENCY",
    description:
      "Практические статьи о SMM, маркетинге, продвижении, визуале и нейросетях.",
    url: "https://iamagency.su/blog",
    siteName: "I AM AGENCY",
    locale: "ru_RU",
    type: "website",
  },
};

export default async function BlogPage() {
  const articles = await getPublishedArticles();
  return (
    <>
      <div className="header-spacer" style={{ background: "#fff" }} />
      <BlogIndex articles={articles} />
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
