import type { Metadata } from "next";
import { getSeoAlternates, getTranslatedPath } from "@/lib/i18n/routes";
import { translateGeneratedHtml as en } from "@/lib/i18n/translate-generated-html";
import Partners from "@/app/blocks/Partners";
import ResponsiveBlock from "@/app/blocks/ResponsiveBlock";
import ServicesAccordion from "@/app/blocks/ServicesAccordion";
import MarqueeBlock from "@/app/blocks/MarqueeBlock";
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
import { otzyvyShkolaMobileHtml, otzyvyShkolaMobileH, shkolaMobileEmptyHtml, shkolaMobileEmptyH } from "@/app/blocks/gen/otzyvyShkolaMobileHtml";
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
import { CASES } from "@/app/case/cases";
import EnglishFigmaEnhancer from "@/app/en/EnglishFigmaEnhancer";

export const metadata: Metadata = {
  title: { absolute: "Full-Service SMM Agency | I AM AGENCY" },
  description: "I AM AGENCY is a full-service social media agency for strategy, management, content production and growth. Seven years in the industry and 450+ clients.",
  alternates: getSeoAlternates("/en"),
};

const englishCaseLinks = Object.fromEntries(
  CASES.map((item) => [item.chipKey, getTranslatedPath(`/case/${item.slug}`, "en") || "/en/cases"]),
);

export default function EnglishHome() {
  return (
    <EnglishFigmaEnhancer>
      <Preloader />
      <h1 className="sr-only">Full-service SMM agency I AM AGENCY</h1>
      <div className="relative z-20">
        <ResponsiveBlock desktopHtml={en(heroHtml)} desktopH={heroH} tabletHtml={en(heroTabletHtml)} tabletH={heroTabletH} mobileHtml={en(heroMobileHtml)} mobileH={heroMobileH} />
      </div>
      <div className="relative z-30"><Partners /></div>
      <ResponsiveBlock desktopHtml={en(utpHtml)} desktopH={utpH} tabletHtml={en(utpTabletHtml)} tabletH={utpTabletH} mobileHtml={en(utpMobileHtml)} mobileH={utpMobileH} />
      <div id="uslugi">
        <ServicesAccordion locale="en" desktopHtml={en(uslugiHtml)} desktopH={uslugiH} tabletHtml={en(uslugiTabletHtml)} tabletH={uslugiTabletH} mobileHtml={en(uslugiMobileHtml)} mobileH={uslugiMobileH} />
      </div>
      <div id="tarify">
        <ResponsiveBlock desktopHtml={en(tarifyHtml)} desktopH={tarifyH} tabletHtml={en(tarifyTabletHtml)} tabletH={tarifyTabletH} mobileHtml={en(tarifyMobileHtml)} mobileH={tarifyMobileH} />
      </div>
      <div id="portfolio">
        <FloatChips html={en(portfolioHtml)} h={portfolioH} tabletHtml={en(portfolioTabletHtml)} tabletH={portfolioTabletH} mobileHtml={en(portfolioMobileHtml)} mobileH={portfolioMobileH} links={englishCaseLinks} />
      </div>
      <div style={{ marginTop: "-2px" }}>
        <ResponsiveBlock desktopHtml={en(marketingHtml)} desktopH={marketingH} tabletHtml={en(marketingTabletHtml)} tabletH={marketingTabletH} mobileHtml={en(marketingMobileHtml)} mobileH={marketingMobileH} />
      </div>
      <MarqueeBlock html={en(otzyvyHtml)} rowTop={275} rowHeight={475} speed={32} tabletHtml={en(otzyvyTabletHtml)} tabletH={otzyvyTabletH} tabletRowTop={201} tabletRowHeight={288.41} tabletSpeed={32} mobileHtml={en(otzyvyShkolaMobileHtml)} mobileH={otzyvyShkolaMobileH} mobileRowTop={123} mobileRowHeight={231.81} mobileSpeed={32} />
      <div id="shkola">
        <ResponsiveBlock desktopHtml={en(shkolaHtml)} desktopH={shkolaH} tabletHtml={en(shkolaTabletHtml)} tabletH={shkolaTabletH} mobileHtml={en(shkolaMobileEmptyHtml)} mobileH={shkolaMobileEmptyH} />
      </div>
      <div id="blog">
        <BlogCardsLinker locale="en">
          <ResponsiveBlock desktopHtml={en(blogHtml)} desktopH={blogH} tabletHtml={en(blogTabletHtml)} tabletH={blogTabletH} mobileHtml={en(blogMobileHtml)} mobileH={blogMobileH} />
        </BlogCardsLinker>
      </div>
      <div id="kontakty">
        <ContactBlock locale="en" html={en(kontaktyHtml)} h={kontaktyH} tabletHtml={en(kontaktyTabletHtml)} tabletH={kontaktyTabletH} mobileHtml={en(kontaktyMobileHtml)} mobileH={kontaktyMobileH} />
      </div>
      <ResponsiveBlock desktopHtml={en(futerHtml)} desktopH={futerH} tabletHtml={en(futerTabletHtml)} tabletH={futerTabletH} mobileHtml={en(futerMobileHtml)} mobileH={futerMobileH} />
    </EnglishFigmaEnhancer>
  );
}
