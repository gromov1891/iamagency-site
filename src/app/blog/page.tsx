import type { Metadata } from "next";
import BlogIndex from "./BlogIndex";
import ResponsiveBlock from "../blocks/ResponsiveBlock";
import { futerHtml, futerH } from "../blocks/gen/futerHtml";
import { futerTabletHtml, futerTabletH } from "../blocks/gen/futerTabletHtml";
import { futerMobileHtml, futerMobileH } from "../blocks/gen/futerMobileHtml";
import { getPublishedArticles } from "@/lib/cms-store";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: { absolute: "Блог о SMM, маркетинге и визуале | I AM AGENCY" },
  description:
    "Практический блог I AM AGENCY о SMM, продвижении в социальных сетях, digital-маркетинге, визуале, нейросетях и контенте для бизнеса с примерами.",
  alternates: { canonical: "/blog" },
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
