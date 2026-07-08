import type { Metadata } from "next";
import BuilderBlock from "../blocks/BuilderBlock";
import FloatChips from "../blocks/FloatChips";
import { portfolioHtml } from "../blocks/gen/portfolioHtml";
import { CASES, caseScrollLinks } from "../case/cases";

/* Хаб «Кейсы» — /keisy. Одностраничник: сверху блок с плашками ниш (внутри
   холста крошка «Главная → Кейсы» — тем же кеглем и позицией, что на /case),
   ниже все 10 кейсов подряд. Клик по плашке = плавная прокрутка к секции.
   Внутри секций собственная крошка убрана. Коричневая спираль показана целиком
   (холст расширен по высоте + overflow visible). */

export const metadata: Metadata = {
  title: "Кейсы — портфолио SMM-агентства",
  description:
    "Кейсы I AM AGENCY в разных нишах: beauty, fashion, sport & education, эксперты, недвижимость, туризм, авто, HoReCa, товарный бизнес и события. Результаты продвижения в соцсетях.",
  robots: { index: true, follow: true },
};

/* крошка внутри холста — идентична /case по кеглю (23.42px) и позиции (left:65,top:30) */
const CRUMB =
  `<div style="position:absolute;left:65px;top:30px;display:flex;gap:13px;align-items:baseline;white-space:nowrap;` +
  `font-family:Inter,sans-serif;font-weight:500;font-size:23.42px;line-height:1;letter-spacing:-0.05em;text-transform:uppercase;">` +
  `<a href="/" style="color:#9A9895;text-decoration:none;">Главная</a>` +
  `<span style="color:#9A9895;">→</span>` +
  `<span style="color:#1C1C1C;">Кейсы</span></div>`;

/* портфолио-блок для хаба: крошка внутри + холст выше и без обрезки (полная спираль) */
const HUB_H = 1313;
const hubPortfolio = portfolioHtml.replace(
  'width:1440px;height:1024px;background:#FFF;overflow:visible">',
  `width:1440px;height:${HUB_H}px;background:#FFF;overflow:visible">` + CRUMB
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
      <div className="header-spacer" style={{ background: "#FFFFFF" }} />
      {/* плашки: клик = прокрутка к секции; крошка «Главная → Кейсы» внутри холста */}
      <FloatChips html={hubPortfolio} h={HUB_H} links={caseScrollLinks} mode="flee" />
      {/* все кейсы подряд, у каждого id = slug для якорной прокрутки */}
      {CASES.map((c) => (
        <div key={c.slug} id={c.slug} style={{ scrollMarginTop: "90px" }}>
          <BuilderBlock html={stripCrumb(c.html)} h={c.height} />
        </div>
      ))}
    </>
  );
}
