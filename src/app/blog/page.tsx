import type { Metadata } from "next";
import BlogIndex from "./BlogIndex";
import ResponsiveBlock from "../blocks/ResponsiveBlock";
import { futerHtml, futerH } from "../blocks/gen/futerHtml";
import { futerTabletHtml, futerTabletH } from "../blocks/gen/futerTabletHtml";
import { futerMobileHtml, futerMobileH } from "../blocks/gen/futerMobileHtml";

export const metadata: Metadata = {
  title: { absolute: "Блог о SMM, маркетинге и визуале | I AM AGENCY" },
  description:
    "Статьи I AM AGENCY о SMM, продвижении, маркетинге, визуале, социальных сетях, нейросетях и трендах для бизнеса.",
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

export default function BlogPage() {
  return (
    <>
      <div className="header-spacer" style={{ background: "#fff" }} />
      <BlogIndex />
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
