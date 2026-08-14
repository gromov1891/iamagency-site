import type { Metadata } from "next";
import { getSeoAlternates } from "@/lib/i18n/routes";
import Partners from "@/app/blocks/Partners";
import ResponsiveBlock from "@/app/blocks/ResponsiveBlock";
import ServicesAccordion from "@/app/blocks/ServicesAccordion";
import MarqueeBlock from "@/app/blocks/MarqueeBlock";
import { TESTIMONIAL_CASE_LINKS } from "@/app/blocks/testimonialCaseLinks";
import ContactBlock from "@/app/blocks/ContactBlock";
import FloatChips from "@/app/blocks/FloatChips";
import BlogCardsLinker from "@/app/blocks/BlogCardsLinker";
import Preloader from "@/app/blocks/Preloader";
import { heroHtml, heroH } from "@/app/blocks/gen/heroHtml";
import { heroTabletHtml, heroTabletH } from "@/app/blocks/gen/heroTabletHtml";
import { heroMobileHtml, heroMobileH } from "@/app/blocks/gen/heroMobileHtml";
import { utpHtml, utpH } from "@/app/blocks/gen/utpHtml";
import { utpTabletHtml, utpTabletH } from "@/app/blocks/gen/utpTabletHtml";
import { utpMobileHtml, utpMobileH } from "@/app/blocks/gen/utpMobileHtml";
import { uslugiHtml, uslugiH } from "@/app/blocks/gen/uslugiHtml";
import { uslugiTabletHtml, uslugiTabletH } from "@/app/blocks/gen/uslugiTabletHtml";
import { uslugiMobileHtml, uslugiMobileH } from "@/app/blocks/gen/uslugiMobileHtml";
import { tarifyHtml, tarifyH } from "@/app/blocks/gen/tarifyHtml";
import { tarifyTabletHtml, tarifyTabletH } from "@/app/blocks/gen/tarifyTabletHtml";
import { tarifyMobileHtml, tarifyMobileH } from "@/app/blocks/gen/tarifyMobileHtml";
import { portfolioHtml, portfolioH } from "@/app/blocks/gen/portfolioHtml";
import { portfolioTabletHtml, portfolioTabletH } from "@/app/blocks/gen/portfolioTabletHtml";
import { portfolioMobileHtml, portfolioMobileH } from "@/app/blocks/gen/portfolioMobileHtml";
import { marketingHtml, marketingH } from "@/app/blocks/gen/marketingHtml";
import { marketingTabletHtml, marketingTabletH } from "@/app/blocks/gen/marketingTabletHtml";
import { marketingMobileHtml, marketingMobileH } from "@/app/blocks/gen/marketingMobileHtml";
import { otzyvyHtml } from "@/app/blocks/gen/otzyvyHtml";
import { otzyvyTabletHtml, otzyvyTabletH } from "@/app/blocks/gen/otzyvyTabletHtml";
import {
  otzyvyShkolaMobileHtml,
  otzyvyShkolaMobileH,
  shkolaMobileEmptyHtml,
  shkolaMobileEmptyH,
} from "@/app/blocks/gen/otzyvyShkolaMobileHtml";
import { shkolaHtml, shkolaH } from "@/app/blocks/gen/shkolaHtml";
import { shkolaTabletHtml, shkolaTabletH } from "@/app/blocks/gen/shkolaTabletHtml";
import { blogHtml, blogH } from "@/app/blocks/gen/blogHtml";
import { blogTabletHtml, blogTabletH } from "@/app/blocks/gen/blogTabletHtml";
import { blogMobileHtml, blogMobileH } from "@/app/blocks/gen/blogMobileHtml";
import { kontaktyHtml, kontaktyH } from "@/app/blocks/gen/kontaktyHtml";
import { kontaktyTabletHtml, kontaktyTabletH } from "@/app/blocks/gen/kontaktyTabletHtml";
import { kontaktyMobileHtml, kontaktyMobileH } from "@/app/blocks/gen/kontaktyMobileHtml";
import { futerHtml, futerH } from "@/app/blocks/gen/futerHtml";
import { futerTabletHtml, futerTabletH } from "@/app/blocks/gen/futerTabletHtml";
import { futerMobileHtml, futerMobileH } from "@/app/blocks/gen/futerMobileHtml";
import { caseLinks } from "@/app/case/cases";

export const metadata: Metadata = {
  title: { absolute: "SMM-агентство полного цикла | I AM AGENCY" },
  description:
    "SMM-агентство I AM AGENCY: стратегия, ведение и продвижение соцсетей, контент, съёмки и performance-маркетинг под ключ. 7 лет в нише, 450+ клиентов.",
  alternates: getSeoAlternates("/"),
};

/* Главная 1:1 из экспортов Builder.io. Между Hero и УТП — лента Партнёров.
   Блок «Маркетинг» — тизер: по кнопке «Узнать больше» ведёт на /marketing
   (там Направления, Кейсы, Создание, Q&A, Процесс, Скидка). */
export default function Home() {
  return (
    <>
      <Preloader />
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
        siteLinks={TESTIMONIAL_CASE_LINKS}
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
