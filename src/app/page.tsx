import Partners from "./blocks/Partners";
import BuilderBlock from "./blocks/BuilderBlock";
import ResponsiveBlock from "./blocks/ResponsiveBlock";
import MarqueeBlock from "./blocks/MarqueeBlock";
import ContactBlock from "./blocks/ContactBlock";
import FloatChips from "./blocks/FloatChips";
import { heroHtml, heroH } from "./blocks/gen/heroHtml";
import { heroTabletHtml, heroTabletH } from "./blocks/gen/heroTabletHtml";
import { heroMobileHtml, heroMobileH } from "./blocks/gen/heroMobileHtml";
import { utpHtml, utpH } from "./blocks/gen/utpHtml";
import { utpTabletHtml, utpTabletH } from "./blocks/gen/utpTabletHtml";
import { utpMobileHtml, utpMobileH } from "./blocks/gen/utpMobileHtml";
import { uslugiHtml, uslugiH } from "./blocks/gen/uslugiHtml";
import { uslugiTabletHtml, uslugiTabletH } from "./blocks/gen/uslugiTabletHtml";
import { tarifyHtml, tarifyH } from "./blocks/gen/tarifyHtml";
import { tarifyTabletHtml, tarifyTabletH } from "./blocks/gen/tarifyTabletHtml";
import { portfolioHtml, portfolioH } from "./blocks/gen/portfolioHtml";
import { portfolioTabletHtml, portfolioTabletH } from "./blocks/gen/portfolioTabletHtml";
import { marketingHtml, marketingH } from "./blocks/gen/marketingHtml";
import { marketingTabletHtml, marketingTabletH } from "./blocks/gen/marketingTabletHtml";
import { otzyvyHtml } from "./blocks/gen/otzyvyHtml";
import { otzyvyTabletHtml, otzyvyTabletH } from "./blocks/gen/otzyvyTabletHtml";
import { shkolaHtml, shkolaH } from "./blocks/gen/shkolaHtml";
import { shkolaTabletHtml, shkolaTabletH } from "./blocks/gen/shkolaTabletHtml";
import { blogHtml, blogH } from "./blocks/gen/blogHtml";
import { blogTabletHtml, blogTabletH } from "./blocks/gen/blogTabletHtml";
import { kontaktyHtml, kontaktyH } from "./blocks/gen/kontaktyHtml";
import { kontaktyTabletHtml, kontaktyTabletH } from "./blocks/gen/kontaktyTabletHtml";
import { futerHtml, futerH } from "./blocks/gen/futerHtml";
import { futerTabletHtml, futerTabletH } from "./blocks/gen/futerTabletHtml";
import { caseLinks } from "./case/cases";

/* Главная 1:1 из экспортов Builder.io. Между Hero и УТП — лента Партнёров.
   Блок «Маркетинг» — тизер: по кнопке «Узнать больше» ведёт на /marketing
   (там Направления, Кейсы, Создание, Q&A, Процесс, Скидка). */
export default function Home() {
  return (
    <>
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
        <ResponsiveBlock desktopHtml={uslugiHtml} desktopH={uslugiH} tabletHtml={uslugiTabletHtml} tabletH={uslugiTabletH} />
      </div>
      <div id="tarify">
        <ResponsiveBlock desktopHtml={tarifyHtml} desktopH={tarifyH} tabletHtml={tarifyTabletHtml} tabletH={tarifyTabletH} />
      </div>
      <div id="portfolio">
        <FloatChips html={portfolioHtml} h={portfolioH} tabletHtml={portfolioTabletHtml} tabletH={portfolioTabletH} links={caseLinks} />
      </div>
      {/* подтягиваем вверх на 2px — закрываем зазор между половинками спирали на стыке блоков */}
      <div style={{ marginTop: "-2px" }}>
        <ResponsiveBlock
          desktopHtml={marketingHtml}
          desktopH={marketingH}
          tabletHtml={marketingTabletHtml}
          tabletH={marketingTabletH}
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
      />
      <div id="shkola">
        <ResponsiveBlock desktopHtml={shkolaHtml} desktopH={shkolaH} tabletHtml={shkolaTabletHtml} tabletH={shkolaTabletH} />
      </div>
      <div id="blog">
        <ResponsiveBlock desktopHtml={blogHtml} desktopH={blogH} tabletHtml={blogTabletHtml} tabletH={blogTabletH} />
      </div>
      <div id="kontakty">
        <ContactBlock html={kontaktyHtml} h={kontaktyH} tabletHtml={kontaktyTabletHtml} tabletH={kontaktyTabletH} />
      </div>
      <ResponsiveBlock desktopHtml={futerHtml} desktopH={futerH} tabletHtml={futerTabletHtml} tabletH={futerTabletH} />
    </>
  );
}
