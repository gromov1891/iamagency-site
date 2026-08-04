import type { Metadata } from "next";
import BuilderBlock from "@/app/blocks/BuilderBlock";
import FloatChips from "@/app/blocks/FloatChips";
import ResponsiveBlock from "@/app/blocks/ResponsiveBlock";
import { portfolioHtml } from "@/app/blocks/gen/portfolioHtml";
import { portfolioTabletHtml } from "@/app/blocks/gen/portfolioTabletHtml";
import { portfolioMobileHtml } from "@/app/blocks/gen/portfolioMobileHtml";
import { futerHtml, futerH } from "@/app/blocks/gen/futerHtml";
import { futerTabletHtml, futerTabletH } from "@/app/blocks/gen/futerTabletHtml";
import { futerMobileHtml, futerMobileH } from "@/app/blocks/gen/futerMobileHtml";
import { CASES, caseScrollLinks } from "@/app/case/cases";
import { translateGeneratedHtml as en } from "@/lib/i18n/translate-generated-html";
import { getSeoAlternates } from "@/lib/i18n/routes";

export const metadata: Metadata = {
  title: "Social Media Case Studies by Industry | I AM AGENCY",
  description: "Explore I AM AGENCY social media work across beauty, fashion, hospitality, real estate, ecommerce, personal brands and more.",
  alternates: getSeoAlternates("/keisy"),
  robots: { index: true, follow: true },
};

const CRUMB = '<div style="position:absolute;left:65px;top:30px;display:flex;gap:13px;align-items:baseline;white-space:nowrap;font-family:Inter,sans-serif;font-weight:500;font-size:23.42px;line-height:1;letter-spacing:-0.05em;text-transform:uppercase;"><a href="/en" style="color:#9A9895;text-decoration:none;">HOME</a><span style="color:#9A9895;">→</span><span style="color:#1C1C1C;">CASES</span></div>';
const CRUMB_TABLET = '<div style="position:absolute;left:40px;top:24px;display:flex;gap:8px;align-items:baseline;white-space:nowrap;font-family:Inter,sans-serif;font-weight:500;font-size:14px;line-height:1;letter-spacing:-0.05em;text-transform:uppercase;z-index:5"><a href="/en" style="color:#9A9895;text-decoration:none;">HOME</a><span style="color:#9A9895;">→</span><span style="color:#1C1C1C;">CASES</span></div>';
const CRUMB_MOBILE = '<div style="position:absolute;left:20px;top:28px;display:flex;gap:6px;align-items:baseline;white-space:nowrap;font-family:Inter,sans-serif;font-weight:500;font-size:11px;line-height:1;letter-spacing:-0.05em;text-transform:uppercase;z-index:5"><a href="/en" style="color:#9A9895;text-decoration:none;">HOME</a><span style="color:#9A9895;">→</span><span style="color:#1C1C1C;">CASES</span></div>';
const HUB_H = 1313;
const HUB_TABLET_H = 1172;
const HUB_MOBILE_H = 1232;
const hubDesktop = en(portfolioHtml.replace('width:1440px;height:1024px;background:#FFF;overflow:visible">', `width:1440px;height:${HUB_H}px;background:#FFF;overflow:visible">${CRUMB}`));
const hubTablet = en(portfolioTabletHtml.replace('width:768px;height:941px;background:#FFF;overflow:visible">', `width:768px;height:${HUB_TABLET_H}px;background:#FFF;overflow:visible">${CRUMB_TABLET}`));
const hubMobile = en(portfolioMobileHtml.replace('width:375px;height:999px;background:#FFF;overflow:visible">', `width:375px;height:${HUB_MOBILE_H}px;background:#FFF;overflow:visible">${CRUMB_MOBILE}`));
const stripCrumb = (html: string) => html.replace(/<div style="position:absolute;left:65px;top:30px;[^"]*">[\s\S]*?<\/div>/, "");

export default function EnglishCasesPage() {
  return (
    <>
      <h1 className="sr-only">Social media case studies and portfolio by I AM AGENCY</h1>
      <div className="header-spacer" style={{ background: "#fff" }} />
      <FloatChips html={hubDesktop} h={HUB_H} tabletHtml={hubTablet} tabletH={HUB_TABLET_H} mobileHtml={hubMobile} mobileH={HUB_MOBILE_H} links={caseScrollLinks} mode="flee" />
      {CASES.map((source) => (
        <div key={source.slug} id={source.slug} style={{ scrollMarginTop: 90 }}>
          <ResponsiveBlock desktopHtml={en(stripCrumb(source.html))} desktopH={source.height} tabletHtml={en(stripCrumb(source.html))} tabletH={source.height} tabletW={1440} mobileHtml={en(stripCrumb(source.html))} mobileH={source.height} mobileW={1440} overflow="hidden" />
        </div>
      ))}
      <ResponsiveBlock desktopHtml={en(futerHtml)} desktopH={futerH} tabletHtml={en(futerTabletHtml)} tabletH={futerTabletH} mobileHtml={en(futerMobileHtml)} mobileH={futerMobileH} overflow="hidden" />
    </>
  );
}
