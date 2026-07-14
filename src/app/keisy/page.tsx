import type { Metadata } from "next";
import BuilderBlock from "../blocks/BuilderBlock";
import FloatChips from "../blocks/FloatChips";
import { portfolioHtml } from "../blocks/gen/portfolioHtml";
import { portfolioTabletHtml } from "../blocks/gen/portfolioTabletHtml";
import { portfolioMobileHtml } from "../blocks/gen/portfolioMobileHtml";
import { CASES, caseScrollLinks } from "../case/cases";
import { getCaseMobile } from "../case/caseMobile";
import ResponsiveBlock from "../blocks/ResponsiveBlock";
import { futerHtml, futerH } from "../blocks/gen/futerHtml";
import { futerTabletHtml, futerTabletH } from "../blocks/gen/futerTabletHtml";
import { futerMobileHtml, futerMobileH } from "../blocks/gen/futerMobileHtml";

/* Хаб «Кейсы» — /keisy. Одностраничник: сверху блок с плашками ниш (внутри
   холста крошка «Главная → Кейсы» — тем же кеглем и позицией, что на /case),
   ниже все 10 кейсов подряд. Клик по плашке = плавная прокрутка к секции.
   Внутри секций собственная крошка убрана. Коричневая спираль показана целиком
   (холст расширен по высоте + overflow visible). */

export const metadata: Metadata = {
  title: "Кейсы — портфолио SMM-агентства",
  description:
    "SMM-кейсы I AM AGENCY: продвижение beauty, fashion, HoReCa, недвижимости, туризма, экспертов и товарных брендов. Визуал, контент и результаты.",
  alternates: { canonical: "/keisy" },
  robots: { index: true, follow: true },
};

/* крошка внутри холста — идентична /case по кеглю (23.42px) и позиции (left:65,top:30) */
const CRUMB =
  `<div style="position:absolute;left:65px;top:30px;display:flex;gap:13px;align-items:baseline;white-space:nowrap;` +
  `font-family:Inter,sans-serif;font-weight:500;font-size:23.42px;line-height:1;letter-spacing:-0.05em;text-transform:uppercase;">` +
  `<a href="/" style="color:#9A9895;text-decoration:none;">Главная</a>` +
  `<span style="color:#9A9895;">→</span>` +
  `<span style="color:#1C1C1C;">Кейсы</span></div>`;

const CRUMB_TABLET =
  `<div style="position:absolute;left:40px;top:24px;display:flex;gap:8px;align-items:baseline;white-space:nowrap;` +
  `font-family:Inter,sans-serif;font-weight:500;font-size:14px;line-height:1;letter-spacing:-0.05em;text-transform:uppercase;z-index:5">` +
  `<a href="/" style="color:#9A9895;text-decoration:none;">Главная</a>` +
  `<span style="color:#9A9895;">→</span>` +
  `<span style="color:#1C1C1C;">Кейсы</span></div>`;

const CRUMB_MOBILE =
  `<div style="position:absolute;left:20px;top:28px;display:flex;gap:6px;align-items:baseline;white-space:nowrap;` +
  `font-family:Inter,sans-serif;font-weight:500;font-size:11px;line-height:1;letter-spacing:-0.05em;text-transform:uppercase;z-index:5">` +
  `<a href="/" style="color:#9A9895;text-decoration:none;">Главная</a>` +
  `<span style="color:#9A9895;">→</span>` +
  `<span style="color:#1C1C1C;">Кейсы</span></div>`;

/* портфолио-блок для хаба: крошка внутри + холст выше и без обрезки (полная спираль) */
const HUB_H = 1313;
const hubPortfolio = portfolioHtml.replace(
  'width:1440px;height:1024px;background:#FFF;overflow:visible">',
  `width:1440px;height:${HUB_H}px;background:#FFF;overflow:visible">` + CRUMB
);
const HUB_TABLET_H = 1172;
const hubPortfolioTablet = portfolioTabletHtml.replace(
  'width:768px;height:941px;background:#FFF;overflow:visible">',
  `width:768px;height:${HUB_TABLET_H}px;background:#FFF;overflow:visible">` + CRUMB_TABLET
);
const HUB_MOBILE_H = 1232;
const hubPortfolioMobile = portfolioMobileHtml.replace(
  'width:375px;height:999px;background:#FFF;overflow:visible">',
  `width:375px;height:${HUB_MOBILE_H}px;background:#FFF;overflow:visible">` + CRUMB_MOBILE
);

/* убрать внутреннюю хлебную крошку из холста секции (она нужна только на /case) */
const stripCrumb = (html: string) =>
  html.replace(
    /<div style="position:absolute;left:65px;top:30px;[^"]*">[\s\S]*?<\/div>/,
    ""
  );

export default function KeisyPage() {
  return (
    <>
      <h1 className="sr-only">Кейсы и портфолио SMM-агентства I AM AGENCY</h1>
      <div className="header-spacer" style={{ background: "#FFFFFF" }} />
      {/* плашки: клик = прокрутка к секции; крошка «Главная → Кейсы» внутри холста */}
      <FloatChips
        html={hubPortfolio}
        h={HUB_H}
        tabletHtml={hubPortfolioTablet}
        tabletH={HUB_TABLET_H}
        mobileHtml={hubPortfolioMobile}
        mobileH={HUB_MOBILE_H}
        links={caseScrollLinks}
        mode="flee"
      />
      {/* все кейсы подряд, у каждого id = slug для якорной прокрутки */}
      {CASES.map((c) => (
        <div key={c.slug} id={c.slug} style={{ scrollMarginTop: "90px" }}>
          <div className="case-hub-desktop-canvas">
            <BuilderBlock html={stripCrumb(c.html)} h={c.height} />
          </div>
          {getCaseMobile(c.slug) ? (
            <div className="case-hub-mobile-canvas">
              <BuilderBlock html={getCaseMobile(c.slug)!.html} w={375} h={getCaseMobile(c.slug)!.height} overflow="hidden" />
            </div>
          ) : null}
        </div>
      ))}
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
