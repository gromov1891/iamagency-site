import type { Metadata } from "next";
import Partners from "./blocks/Partners";
import BuilderBlock from "./blocks/BuilderBlock";
import ResponsiveBlock from "./blocks/ResponsiveBlock";
import ServicesAccordion from "./blocks/ServicesAccordion";
import MarqueeBlock from "./blocks/MarqueeBlock";
import ContactBlock from "./blocks/ContactBlock";
import FloatChips from "./blocks/FloatChips";
import BlogCardsLinker from "./blocks/BlogCardsLinker";
import { heroHtml, heroH } from "./blocks/gen/heroHtml";
import { heroTabletHtml, heroTabletH } from "./blocks/gen/heroTabletHtml";
import { heroMobileHtml, heroMobileH } from "./blocks/gen/heroMobileHtml";
import { utpHtml, utpH } from "./blocks/gen/utpHtml";
import { utpTabletHtml, utpTabletH } from "./blocks/gen/utpTabletHtml";
import { utpMobileHtml, utpMobileH } from "./blocks/gen/utpMobileHtml";
import { uslugiHtml, uslugiH } from "./blocks/gen/uslugiHtml";
import { uslugiTabletHtml, uslugiTabletH } from "./blocks/gen/uslugiTabletHtml";
import { uslugiMobileHtml, uslugiMobileH } from "./blocks/gen/uslugiMobileHtml";
import { tarifyHtml, tarifyH } from "./blocks/gen/tarifyHtml";
import { tarifyTabletHtml, tarifyTabletH } from "./blocks/gen/tarifyTabletHtml";
import { tarifyMobileHtml, tarifyMobileH } from "./blocks/gen/tarifyMobileHtml";
import { portfolioHtml, portfolioH } from "./blocks/gen/portfolioHtml";
import { portfolioTabletHtml, portfolioTabletH } from "./blocks/gen/portfolioTabletHtml";
import { portfolioMobileHtml, portfolioMobileH } from "./blocks/gen/portfolioMobileHtml";
import { marketingHtml, marketingH } from "./blocks/gen/marketingHtml";
import { marketingTabletHtml, marketingTabletH } from "./blocks/gen/marketingTabletHtml";
import { marketingMobileHtml, marketingMobileH } from "./blocks/gen/marketingMobileHtml";
import { otzyvyHtml } from "./blocks/gen/otzyvyHtml";
import { otzyvyTabletHtml, otzyvyTabletH } from "./blocks/gen/otzyvyTabletHtml";
import {
  otzyvyShkolaMobileHtml,
  otzyvyShkolaMobileH,
  shkolaMobileEmptyHtml,
  shkolaMobileEmptyH,
} from "./blocks/gen/otzyvyShkolaMobileHtml";
import { shkolaHtml, shkolaH } from "./blocks/gen/shkolaHtml";
import { shkolaTabletHtml, shkolaTabletH } from "./blocks/gen/shkolaTabletHtml";
import { blogHtml, blogH } from "./blocks/gen/blogHtml";
import { blogTabletHtml, blogTabletH } from "./blocks/gen/blogTabletHtml";
import { blogMobileHtml, blogMobileH } from "./blocks/gen/blogMobileHtml";
import { kontaktyHtml, kontaktyH } from "./blocks/gen/kontaktyHtml";
import { kontaktyTabletHtml, kontaktyTabletH } from "./blocks/gen/kontaktyTabletHtml";
import { kontaktyMobileHtml, kontaktyMobileH } from "./blocks/gen/kontaktyMobileHtml";
import { futerHtml, futerH } from "./blocks/gen/futerHtml";
import { futerTabletHtml, futerTabletH } from "./blocks/gen/futerTabletHtml";
import { futerMobileHtml, futerMobileH } from "./blocks/gen/futerMobileHtml";
import { caseLinks } from "./case/cases";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: { absolute: "SMM-агентство полного цикла | I AM AGENCY" },
  description:
    "SMM-агентство I AM AGENCY: стратегия, ведение соцсетей, контент, съёмки и performance-маркетинг под ключ. 7 лет в нише и 450+ клиентов.",
  alternates: { canonical: "/" },
};

/* Главная 1:1 из экспортов Builder.io. Между Hero и УТП — лента Партнёров.
   Блок «Маркетинг» — тизер: по кнопке «Узнать больше» ведёт на /marketing
   (там Направления, Кейсы, Создание, Q&A, Процесс, Скидка). */
export default function Home() {
  return (
    <>
      <h1 className="sr-only">SMM-агентство полного цикла I AM AGENCY</h1>
      <div className="relative z-20">
        <ResponsiveBlock
          desktopHtml={heroHtml}
          desktopH={heroH}
          tabletHtml={heroTabletHtml}
          tabletH={heroTabletH}
          mobileHtml={heroMobileHtml}
          mobileH={heroMobileH}
        />
      </div>
      <div className="relative z-30">
        <Partners />
      </div>
      <ResponsiveBlock
        desktopHtml={utpHtml}
        desktopH={utpH}
        tabletHtml={utpTabletHtml}
        tabletH={utpTabletH}
        mobileHtml={utpMobileHtml}
        mobileH={utpMobileH}
      />
      <div id="uslugi">
        <ServicesAccordion
          desktopHtml={uslugiHtml}
          desktopH={uslugiH}
          tabletHtml={uslugiTabletHtml}
          tabletH={uslugiTabletH}
          mobileHtml={uslugiMobileHtml}
          mobileH={uslugiMobileH}
        />
      </div>
      <div id="tarify">
        <ResponsiveBlock
          desktopHtml={tarifyHtml}
          desktopH={tarifyH}
          tabletHtml={tarifyTabletHtml}
          tabletH={tarifyTabletH}
          mobileHtml={tarifyMobileHtml}
          mobileH={tarifyMobileH}
        />
      </div>
      <div id="portfolio">
        <FloatChips
          html={portfolioHtml}
          h={portfolioH}
          tabletHtml={portfolioTabletHtml}
          tabletH={portfolioTabletH}
          mobileHtml={portfolioMobileHtml}
          mobileH={portfolioMobileH}
          links={caseLinks}
        />
      </div>
      {/* подтягиваем вверх на 2px — закрываем зазор между половинками спирали на стыке блоков */}
      <div style={{ marginTop: "-2px" }}>
        <ResponsiveBlock
          desktopHtml={marketingHtml}
          desktopH={marketingH}
          tabletHtml={marketingTabletHtml}
          tabletH={marketingTabletH}
          mobileHtml={marketingMobileHtml}
          mobileH={marketingMobileH}
        />
      </div>
      <MarqueeBlock
        html={otzyvyHtml}
        rowTop={275}
        rowHeight={475}
        speed={32}
        tabletHtml={otzyvyTabletHtml}
        tabletH={otzyvyTabletH}
        tabletRowTop={201}
        tabletRowHeight={288.41}
        tabletSpeed={32}
        mobileHtml={otzyvyShkolaMobileHtml}
        mobileH={otzyvyShkolaMobileH}
        mobileRowTop={123}
        mobileRowHeight={231.81}
        mobileSpeed={32}
      />
      <div id="shkola">
        <ResponsiveBlock
          desktopHtml={shkolaHtml}
          desktopH={shkolaH}
          tabletHtml={shkolaTabletHtml}
          tabletH={shkolaTabletH}
          mobileHtml={shkolaMobileEmptyHtml}
          mobileH={shkolaMobileEmptyH}
        />
      </div>
      <div id="blog">
        <BlogCardsLinker>
          <ResponsiveBlock
            desktopHtml={blogHtml}
            desktopH={blogH}
            tabletHtml={blogTabletHtml}
            tabletH={blogTabletH}
            mobileHtml={blogMobileHtml}
            mobileH={blogMobileH}
          />
        </BlogCardsLinker>
      </div>
      <div id="kontakty">
        <ContactBlock
          html={kontaktyHtml}
          h={kontaktyH}
          tabletHtml={kontaktyTabletHtml}
          tabletH={kontaktyTabletH}
          mobileHtml={kontaktyMobileHtml}
          mobileH={kontaktyMobileH}
        />
      </div>
      <ResponsiveBlock
        desktopHtml={futerHtml}
        desktopH={futerH}
        tabletHtml={futerTabletHtml}
        tabletH={futerTabletH}
        mobileHtml={futerMobileHtml}
        mobileH={futerMobileH}
      />
    </>
  );
}
