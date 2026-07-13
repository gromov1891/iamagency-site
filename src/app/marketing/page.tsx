import type { Metadata } from "next";
import BuilderBlock from "../blocks/BuilderBlock";
import HeroBlock from "../blocks/HeroBlock";
import SkidkaCountdown from "../blocks/SkidkaCountdown";
import MarqueeBlock from "../blocks/MarqueeBlock";
import AppearBlock from "../blocks/AppearBlock";
import HoverMarkers from "../blocks/HoverMarkers";
import DirectionLinks from "../blocks/DirectionLinks";
import Reveal from "../blocks/Reveal";
import { marketingHeroLeftHtml, marketingHeroRightHtml } from "../blocks/gen/marketingHeroHtml";
import { napravleniyaHtml } from "../blocks/gen/napravleniyaHtml";
import { keysyHtml } from "../blocks/gen/keysyHtml";
import { memeHtml, memeH } from "../blocks/gen/memeHtml";
import { processHtml, processH } from "../blocks/gen/processHtml";
import { sozdanieHtml } from "../blocks/gen/sozdanieHtml";
import { qaHtml, qaH } from "../blocks/gen/qaHtml";
import { skidkaHtml, skidkaH } from "../blocks/gen/skidkaHtml";
import { futerHtml, futerH } from "../blocks/gen/futerHtml";
import MarketingLeadModal from "./MarketingLeadModal";

export const metadata: Metadata = {
  title: { absolute: "Маркетинговое агентство полного цикла | I AM AGENCY" },
  description:
    "Performance, media и digital-маркетинг под ключ: реклама, SEO, аналитика, PR, influence-маркетинг и разработка сайтов. Команда экспертов I AM AGENCY.",
  alternates: { canonical: "/marketing" },
};

const EXTRA_SITES = [
  { title: "UPPERCUTS", subtitle: "музыкальная академия", mark: "UC", href: "https://uppercuts.academy/" },
  { title: "PRIVATE TRAVEL", subtitle: "travel & concierge", mark: "PT", href: "https://private-travel-club.com/" },
];

/* Отдельная посадочная «Маркетинг» — открывается по кнопке «Узнать больше»
   с блока Маркетинг на главной. Здесь вся подробная инфа про направления. */
export default function MarketingPage() {
  return (
    <>
      <h1 className="sr-only">Маркетинговое агентство полного цикла</h1>
      {/* отступ под липкий хедер */}
      <div className="header-spacer" />
      <MarketingLeadModal />
      {/* Hero «Маркетинг» — резиновый, на всю ширину, вписан в первый экран */}
      <HeroBlock leftHtml={marketingHeroLeftHtml} rightHtml={marketingHeroRightHtml} />
      <AppearBlock html={napravleniyaHtml} targets={["Класс"]} />
      {/* делает «+»/заголовки готовых направлений ссылками на их лендинги */}
      <DirectionLinks />
      {/* Кейсы без Reveal: blur-фильтр обрезал бы выходящие за блок фигуры (гора, кольца) */}
      <HoverMarkers html={keysyHtml} labels={["1", "2", "3", "4", "5"]} />
      {/* мем-блок «наведи мышкой»: прическа↔агентство + облачко I AM AGENCY (CSS hover) */}
      <BuilderBlock html={memeHtml} h={memeH} />
      {/* Процесс без Reveal: blur резал бы жгут на стыке с мем-блоком (одна фигура на два блока) */}
      <BuilderBlock html={processHtml} h={processH} />
      {/* секции ниже плавно появляются из размытия при входе в экран на 30% */}
      <Reveal><MarqueeBlock html={sozdanieHtml} rowTop={660} rowHeight={192} clipLeft={75} clipWidth={1290} extraCards={EXTRA_SITES} /></Reveal>
      {/* Q&A без Reveal: фигуры (слиток, airship) выходят за блок, blur бы их резал */}
      <BuilderBlock html={qaHtml} h={qaH} />
      <Reveal><SkidkaCountdown html={skidkaHtml} h={skidkaH} /></Reveal>
      <Reveal><BuilderBlock html={futerHtml} h={futerH} overflow="hidden" /></Reveal>
    </>
  );
}
