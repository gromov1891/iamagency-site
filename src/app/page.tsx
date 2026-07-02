import Partners from "./blocks/Partners";
import BuilderBlock from "./blocks/BuilderBlock";
import MarqueeBlock from "./blocks/MarqueeBlock";
import ContactBlock from "./blocks/ContactBlock";
import FloatChips from "./blocks/FloatChips";
import { heroHtml } from "./blocks/gen/heroHtml";
import { utpHtml } from "./blocks/gen/utpHtml";
import { uslugiHtml } from "./blocks/gen/uslugiHtml";
import { tarifyHtml } from "./blocks/gen/tarifyHtml";
import { portfolioHtml } from "./blocks/gen/portfolioHtml";
import { marketingHtml } from "./blocks/gen/marketingHtml";
import { otzyvyHtml } from "./blocks/gen/otzyvyHtml";
import { shkolaHtml } from "./blocks/gen/shkolaHtml";
import { blogHtml } from "./blocks/gen/blogHtml";
import { kontaktyHtml } from "./blocks/gen/kontaktyHtml";
import { futerHtml } from "./blocks/gen/futerHtml";

/* Главная 1:1 из экспортов Builder.io. Между Hero и УТП — лента Партнёров.
   Блок «Маркетинг» — тизер: по кнопке «Узнать больше» ведёт на /marketing
   (там Направления, Кейсы, Создание, Q&A, Процесс, Скидка). */
export default function Home() {
  return (
    <>
      <BuilderBlock html={heroHtml} />
      <Partners />
      <BuilderBlock html={utpHtml} />
      <div id="uslugi">
        <BuilderBlock html={uslugiHtml} />
      </div>
      <div id="tarify">
        <BuilderBlock html={tarifyHtml} />
      </div>
      <div id="portfolio">
        <FloatChips html={portfolioHtml} />
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
      <BuilderBlock html={futerHtml} />
    </>
  );
}
