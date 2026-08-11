import type { Metadata } from "next";
import BuilderBlock from "@/app/blocks/BuilderBlock";
import HeroBlock from "@/app/blocks/HeroBlock";
import SkidkaCountdown from "@/app/blocks/SkidkaCountdown";
import MarqueeBlock from "@/app/blocks/MarqueeBlock";
import AppearBlock from "@/app/blocks/AppearBlock";
import HoverMarkers from "@/app/blocks/HoverMarkers";
import DirectionLinks from "@/app/blocks/DirectionLinks";
import Reveal from "@/app/blocks/Reveal";
import MarketingTranslatedMobile from "./MarketingTranslatedMobile";
import { marketingHeroLeftHtml, marketingHeroRightHtml } from "@/app/blocks/gen/marketingHeroHtml";
import { napravleniyaHtml } from "@/app/blocks/gen/napravleniyaHtml";
import { keysyHtml } from "@/app/blocks/gen/keysyHtml";
import { memeHtml, memeH } from "@/app/blocks/gen/memeHtml";
import { processHtml, processH } from "@/app/blocks/gen/processHtml";
import { sozdanieHtml } from "@/app/blocks/gen/sozdanieHtml";
import { qaHtml, qaH } from "@/app/blocks/gen/qaHtml";
import { skidkaHtml, skidkaH } from "@/app/blocks/gen/skidkaHtml";
import { getSeoAlternates } from "@/lib/i18n/routes";
import { translateGeneratedHtml as en } from "@/lib/i18n/translate-generated-html";
import styles from "@/app/marketing/marketing-page.module.css";

const SITE_URL = "https://iamagency.su";
const TITLE = "Full-Service Digital Marketing Agency | I AM AGENCY";
const DESCRIPTION = "Performance, media and digital marketing: paid search, SEO, analytics, PR, influencer campaigns, creative and web development.";

export const metadata: Metadata = {
  title: { absolute: TITLE }, description: DESCRIPTION,
  alternates: getSeoAlternates("/en/marketing"),
  openGraph: { title: TITLE, description: DESCRIPTION, url: `${SITE_URL}/en/marketing`, siteName: "I AM AGENCY", locale: "en_US", type: "website" },
  robots: { index: true, follow: true },
};

const EXTRA_SITES = [
  { title: "UPPERCUTS", subtitle: "Music academy", logo: "/blk/sozdanie/uppercuts-logo.webp", href: "https://uppercuts.academy/" },
  { title: "PRIVATE TRAVEL", subtitle: "Travel & concierge", logo: "/blk/sozdanie/private-travel-logo.svg", href: "https://private-travel-club.com/" },
];
const SITE_LINKS = { "КЕТОРОЛ": "https://ketorolgel.ru/", "TAU.PLACE": "https://tau.place/" };

export default function EnglishMarketingPage() {
  return (
    <>
      <h1 className="sr-only">Full-service digital marketing agency</h1>
      <div className="header-spacer" />
      <div className={`${styles.desktopPage} ${styles.englishDesktop}`}>
        <HeroBlock leftHtml={en(marketingHeroLeftHtml)} rightHtml={en(marketingHeroRightHtml)} />
        <AppearBlock html={en(napravleniyaHtml)} targets={["Класс"]} />
        <DirectionLinks locale="en" />
        <HoverMarkers html={en(keysyHtml)} labels={["1", "2", "3", "4", "5"]} locale="en" />
        <BuilderBlock html={en(memeHtml)} h={memeH} />
        <BuilderBlock html={en(processHtml)} h={processH} />
        <Reveal><MarqueeBlock html={en(sozdanieHtml)} rowTop={660} rowHeight={192} clipLeft={75} clipWidth={1290} extraCards={EXTRA_SITES} siteLinks={SITE_LINKS} /></Reveal>
        <BuilderBlock html={en(qaHtml)} h={qaH} />
        <Reveal><SkidkaCountdown html={en(skidkaHtml)} h={skidkaH} /></Reveal>
      </div>
      <div className={styles.mobilePage}>
        <MarketingTranslatedMobile />
      </div>
    </>
  );
}
