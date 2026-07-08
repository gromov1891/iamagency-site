import Partners from "./blocks/Partners";
import BuilderBlock from "./blocks/BuilderBlock";
import ResponsiveBlock from "./blocks/ResponsiveBlock";
import MarqueeBlock from "./blocks/MarqueeBlock";
import ContactBlock from "./blocks/ContactBlock";
import FloatChips from "./blocks/FloatChips";
import { heroHtml, heroH } from "./blocks/gen/heroHtml";
import { heroTabletHtml, heroTabletH } from "./blocks/gen/heroTabletHtml";
import { utpHtml, utpH } from "./blocks/gen/utpHtml";
import { utpTabletHtml, utpTabletH } from "./blocks/gen/utpTabletHtml";
import { uslugiHtml } from "./blocks/gen/uslugiHtml";
import { tarifyHtml } from "./blocks/gen/tarifyHtml";
import { tarifyTabletHtml, tarifyTabletH } from "./blocks/gen/tarifyTabletHtml";
import { portfolioHtml } from "./blocks/gen/portfolioHtml";
import { marketingHtml } from "./blocks/gen/marketingHtml";
import { otzyvyHtml } from "./blocks/gen/otzyvyHtml";
import { shkolaHtml } from "./blocks/gen/shkolaHtml";
import { blogHtml } from "./blocks/gen/blogHtml";
import { kontaktyHtml } from "./blocks/gen/kontaktyHtml";
import { futerHtml, futerH } from "./blocks/gen/futerHtml";
import { futerTabletHtml, futerTabletH } from "./blocks/gen/futerTabletHtml";
import { caseLinks } from "./case/cases";

/* Главная 1:1 из экспортов Builder.io. Между Hero и УТП — лента Партнёров.
   Блок «Маркетинг» — тизер: по кнопке «Узнать больше» ведёт на /marketing
   (там Направления, Кейсы, Создание, Q&A, Процесс, Скидка). */
export default function Home() {
  return (
    <>
      <ResponsiveBlock desktopHtml={heroHtml} desktopH={heroH} tabletHtml={heroTabletHtml} tabletH={heroTabletH} />
      <Partners />
      <ResponsiveBlock desktopHtml={utpHtml} desktopH={utpH} tabletHtml={utpTabletHtml} tabletH={utpTabletH} />
      <div id="uslugi">
        <BuilderBlock html={uslugiHtml} />
      </div>
      <div id="tarify">
        <BuilderBlock html={tarifyHtml} />
      </div>
      <div id="portfolio">
        <FloatChips html={portfolioHtml} links={caseLinks} />
      </div>
      {/* подтягиваем вверх на 2px — закрываем зазор между половинками спирали на стыке блоков */}
      <div style={{ marginTop: "-2px" }}>
        <BuilderBlock html={marketingHtml} />
      </div>
      <MarqueeBlock html={otzyvyHtml} rowTop={275} rowHeight={475} speed={32} />
      <div id="shkola">
        <BuilderBlock html={shkolaHtml} />
      </div>
      <div id="blog">
        <BuilderBlock html={blogHtml} />
      </div>
      <div id="kontakty">
        <ContactBlock html={kontaktyHtml} />
      </div>
      <BuilderBlock html={futerHtml} h={futerH} />
    </>
  );
}
