import type { Metadata } from "next";
import BuilderBlock from "@/app/blocks/BuilderBlock";
import HeroBlock from "@/app/blocks/HeroBlock";
import SkidkaCountdown from "@/app/blocks/SkidkaCountdown";
import MarqueeBlock from "@/app/blocks/MarqueeBlock";
import AppearBlock from "@/app/blocks/AppearBlock";
import HoverMarkers from "@/app/blocks/HoverMarkers";
import DirectionLinks from "@/app/blocks/DirectionLinks";
import Reveal from "@/app/blocks/Reveal";
import EnglishFigmaEnhancer from "@/app/en/EnglishFigmaEnhancer";
import { marketingHeroLeftHtml, marketingHeroRightHtml } from "@/app/blocks/gen/marketingHeroHtml";
import { napravleniyaHtml } from "@/app/blocks/gen/napravleniyaHtml";
import { keysyHtml } from "@/app/blocks/gen/keysyHtml";
import { memeHtml, memeH } from "@/app/blocks/gen/memeHtml";
import { processHtml, processH } from "@/app/blocks/gen/processHtml";
import { sozdanieHtml } from "@/app/blocks/gen/sozdanieHtml";
import { qaHtml, qaH } from "@/app/blocks/gen/qaHtml";
import { skidkaHtml, skidkaH } from "@/app/blocks/gen/skidkaHtml";
import { futerHtml, futerH } from "@/app/blocks/gen/futerHtml";
import { futerMobileHtml, futerMobileH } from "@/app/blocks/gen/futerMobileHtml";
import { MARKETING_MOBILE_FRAMES } from "@/app/marketing/marketingMobile";
import { getSeoAlternates } from "@/lib/i18n/routes";
import { translateGeneratedHtml as en } from "@/lib/i18n/translate-generated-html";
import styles from "@/app/marketing/marketing-page.module.css";

export const metadata: Metadata = { title: { absolute: "Full-Service Digital Marketing Agency | I AM AGENCY" }, description: "Performance, media and digital marketing: paid search, SEO, analytics, PR, influencer campaigns, creative and web development.", alternates: getSeoAlternates("/marketing") };
const EXTRA_SITES = [{ title: "UPPERCUTS", subtitle: "music academy", logo: "/blk/sozdanie/uppercuts-logo.webp", href: "https://uppercuts.academy/" }, { title: "PRIVATE TRAVEL", subtitle: "travel & concierge", logo: "/blk/sozdanie/private-travel-logo.svg", href: "https://private-travel-club.com/" }];
const SITE_LINKS = { "КЕТОРОЛ": "https://ketorolgel.ru/", "TAU.PLACE": "https://tau.place/" };

export default function EnglishMarketingPage() {
  return <EnglishFigmaEnhancer>
    <h1 className="sr-only">Full-service digital marketing agency</h1><div className="header-spacer" />
    <div className={styles.desktopPage}>
      <HeroBlock leftHtml={en(marketingHeroLeftHtml)} rightHtml={en(marketingHeroRightHtml)} />
      <AppearBlock html={en(napravleniyaHtml)} targets={["CLASS"]} /><DirectionLinks locale="en" />
      <HoverMarkers html={en(keysyHtml)} labels={["1", "2", "3", "4", "5"]} />
      <BuilderBlock html={en(memeHtml)} h={memeH} /><BuilderBlock html={en(processHtml)} h={processH} />
      <Reveal><MarqueeBlock html={en(sozdanieHtml)} rowTop={660} rowHeight={192} clipLeft={75} clipWidth={1290} extraCards={EXTRA_SITES} siteLinks={SITE_LINKS} /></Reveal>
      <BuilderBlock html={en(qaHtml)} h={qaH} /><Reveal><SkidkaCountdown html={en(skidkaHtml)} h={skidkaH} /></Reveal><Reveal><BuilderBlock html={en(futerHtml)} h={futerH} overflow="hidden" /></Reveal>
    </div>
    <div className={styles.mobilePage}>{MARKETING_MOBILE_FRAMES.map((frame, index) => <BuilderBlock key={index} html={en(frame.html)} w={375} h={frame.height} overflow="hidden" />)}<BuilderBlock html={en(futerMobileHtml)} w={375} h={futerMobileH} overflow="hidden" /></div>
  </EnglishFigmaEnhancer>;
}
