"use client";

import Link from "next/link";
import styles from "./marketing-mobile.module.css";

type TextLayer = {
  x: number; y: number; w: number; h: number;
  text: string; size: number;
  color?: string; background?: string; weight?: number;
  lineHeight?: number; radius?: number; align?: "left" | "center";
};

type Hotspot = { x: number; y: number; w: number; h: number; href?: string; label: string; form?: boolean };
type FrameData = { src: string; height: number; layers: TextLayer[]; hotspots?: Hotspot[] };

const WHITE = "#fff";
const DARK = "#1c1c1c";
const GRAY = "#9a9895";
const ORANGE = "#f55d1c";

const directionCards = [
  ["PAID SEARCH", "Google Ads and Yandex Direct", "/en/marketing/paid-search"],
  ["SEO SERVICES", "Search visibility and growth", "/en/marketing/seo-services"],
  ["CPA MARKETING", "Performance-based acquisition", "/en/marketing/cpa-marketing"],
  ["MARKETING ANALYTICS", "End-to-end measurement", "/en/marketing/marketing-analytics"],
  ["PR SERVICES", "Media coverage and expert PR", "/en/marketing/pr-services"],
  ["PROGRAMMATIC", "Automated media buying", "/en/marketing/programmatic-advertising"],
  ["CREATIVE CAMPAIGNS", "Special projects and formats", "/en/marketing/creative-campaigns"],
  ["MARKETING TECHNOLOGY", "Digital products for growth", "/en/marketing/marketing-technology"],
  ["PAID SOCIAL", "VK Ads, myTarget and Meta*", "/en/marketing/paid-social"],
  ["TELEGRAM ADS", "Channels, placements and creatives", "/en/marketing/telegram-advertising"],
  ["INFLUENCER MARKETING", "Creators, briefs and reporting", "/en/marketing/influencer-marketing"],
  ["REPUTATION MANAGEMENT", "Reviews and brand mentions", "/en/marketing/online-reputation-management"],
  ["APP MARKETING", "Installs and mobile growth", "/en/marketing/app-marketing"],
  ["YOUTUBE MARKETING", "Channel growth and advertising", "/en/marketing/youtube-marketing"],
  ["EXPERIENTIAL", "Events and offline promotion", "/en/marketing/experiential-marketing"],
  ["WEB DEVELOPMENT", "Websites, stores and apps", "/en/marketing/web-development"],
] as const;

const directionLayers: TextLayer[] = [
  { x: 18, y: 67, w: 340, h: 58, text: "CAPABILITIES", size: 37, background: WHITE },
  { x: 164, y: 168, w: 190, h: 49, text: "Performance  +  Media  +  Web\nFrom paid campaigns to influencer marketing and conversion-ready websites", size: 7.5, color: WHITE, background: DARK, radius: 7, lineHeight: 1.12 },
  ...directionCards.map((card, index): TextLayer => {
    const row = Math.floor(index / 2);
    const col = index % 2;
    return {
      x: col ? 201 : 21,
      y: 313 + row * 51.5,
      w: 128,
      h: 31,
      text: `${card[0]}\n${card[1]}`,
      size: card[0].length > 20 ? 7.2 : 8.2,
      color: DARK,
      background: WHITE,
      lineHeight: 1.02,
      weight: 600,
    };
  }),
  { x: 17, y: 800, w: 198, h: 32, text: "Discuss my project  ↘", size: 16, color: WHITE, background: DARK, radius: 18, align: "center" },
  { x: 226, y: 800, w: 129, h: 32, text: "Consultation", size: 15, color: WHITE, background: "linear-gradient(90deg,#f55d1c,#1c1c1c)", radius: 18, align: "center" },
];

const directionHotspots: Hotspot[] = directionCards.map((card, index) => ({
  x: index % 2 ? 194 : 20,
  y: 310 + Math.floor(index / 2) * 51.5,
  w: 164,
  h: 42,
  href: card[2],
  label: card[0],
}));

const frames: FrameData[] = [
  {
    src: "/blk/responsive/mobile/marketing-hero.webp", height: 874,
    layers: [
      { x: 18, y: 58, w: 165, h: 18, text: "HOME  →  MARKETING", size: 8, color: DARK, background: WHITE },
      { x: 18, y: 145, w: 340, h: 58, text: "MARKETING", size: 43, color: DARK, background: WHITE },
      { x: 18, y: 255, w: 340, h: 97, text: "We help established businesses solve performance and media marketing challenges.\n\nWe immerse ourselves in your business and build strategies and landing pages that convert.", size: 11, color: DARK, background: WHITE, lineHeight: 1.02 },
      { x: 55, y: 407, w: 296, h: 45, text: "HOW WE WORK", size: 23, color: WHITE, background: DARK, radius: 10, align: "center" },
      { x: 55, y: 465, w: 296, h: 67, text: "For every client we assemble a dedicated expert team. We study the business and keep analysing the data so no opportunity is missed.", size: 10, color: DARK, background: "#f1f1f1", lineHeight: 1.04 },
      { x: 55, y: 531, w: 296, h: 29, text: "START A PROJECT", size: 8, color: GRAY, background: WHITE, radius: 16, align: "center" },
      { x: 20, y: 738, w: 68, h: 32, text: "6+\nYEARS", size: 16, color: WHITE, background: DARK, radius: 6, align: "center", lineHeight: .9 },
      { x: 92, y: 738, w: 69, h: 32, text: "400+\nREVIEWS", size: 16, color: WHITE, background: DARK, radius: 6, align: "center", lineHeight: .9 },
      { x: 166, y: 738, w: 69, h: 32, text: "200+\nPROJECTS", size: 16, color: WHITE, background: DARK, radius: 6, align: "center", lineHeight: .9 },
      { x: 226, y: 805, w: 129, h: 31, text: "Consultation", size: 15, color: WHITE, background: "linear-gradient(90deg,#f55d1c,#1c1c1c)", radius: 18, align: "center" },
    ],
    hotspots: [{ x: 55, y: 525, w: 296, h: 38, label: "Start a marketing project", form: true }, { x: 226, y: 800, w: 129, h: 40, label: "Book a consultation", form: true }],
  },
  { src: "/blk/responsive/mobile/marketing-directions.webp", height: 874, layers: directionLayers, hotspots: [...directionHotspots, { x: 17, y: 796, w: 338, h: 42, label: "Discuss my project", form: true }] },
  {
    src: "/blk/responsive/mobile/marketing-cases.webp", height: 816,
    layers: [
      { x: 25, y: 72, w: 326, h: 28, text: "MARKETING GROWTH CASES", size: 17, color: WHITE, background: DARK, radius: 8, align: "center" },
      { x: 26, y: 104, w: 325, h: 45, text: "Each marker is a client we helped move upward. Tap a point to explore.", size: 9, color: DARK, background: "#f1f1f1" },
      { x: 26, y: 153, w: 185, h: 72, text: "– Custom audience databases\n– Precise audience segments\n– High-LTV lookalikes\n– Warm-audience remarketing", size: 10, color: DARK, background: "#f1f1f1", lineHeight: 1.02 },
      { x: 213, y: 205, w: 136, h: 78, text: "CUSTOM SEGMENTS HELP US ATTRACT TRAFFIC\n8× MORE EFFICIENTLY", size: 11, color: DARK, background: "#f1f1f1", lineHeight: .98 },
      { x: 26, y: 281, w: 175, h: 19, text: "Want to see more cases? ↓", size: 7.5, color: DARK, background: "#f1f1f1" },
      { x: 26, y: 300, w: 147, h: 20, text: "START A PROJECT", size: 7, color: GRAY, background: WHITE, radius: 12, align: "center" },
      { x: 226, y: 532, w: 129, h: 31, text: "Consultation", size: 15, color: WHITE, background: "linear-gradient(90deg,#f55d1c,#1c1c1c)", radius: 18, align: "center" },
      { x: 24, y: 644, w: 328, h: 24, text: "hairstyle women like                 hairstyle women dislike", size: 7.5, color: DARK, background: "#f1f1f1", align: "center" },
    ],
    hotspots: [{ x: 26, y: 294, w: 147, h: 32, label: "Start a project", form: true }, { x: 226, y: 527, w: 129, h: 40, label: "Book a consultation", form: true }],
  },
  {
    src: "/blk/responsive/mobile/marketing-process.webp", height: 874,
    layers: [
      { x: 18, y: 70, w: 210, h: 47, text: "PROCESS", size: 38, color: DARK, background: WHITE },
      { x: 188, y: 150, w: 170, h: 66, text: "Full-service marketing\n\nA strategist, media buyer, analyst and designer work as one team.", size: 11, color: DARK, background: WHITE, lineHeight: 1.03 },
      ...[
        ["01", "BRIEFING", "We study the business, product, competitors and current funnel."],
        ["02", "STRATEGY", "We select channels, metrics, budget, media plan and KPIs."],
        ["03", "LAUNCH", "We produce creative, launch campaigns and scale what works."],
        ["04", "ANALYTICS", "Weekly reporting with CPL and ROI, followed by practical optimisation."],
      ].map((item, index): TextLayer => ({ x: 121, y: 250 + index * 129, w: 145, h: 95, text: `${item[0]}\n${item[1]}\n\n${item[2]}`, size: 12, color: WHITE, background: DARK, radius: 8, lineHeight: 1.02 })),
      { x: 226, y: 805, w: 129, h: 31, text: "Consultation", size: 15, color: WHITE, background: "linear-gradient(90deg,#f55d1c,#1c1c1c)", radius: 18, align: "center" },
    ],
    hotspots: [{ x: 226, y: 800, w: 129, h: 40, label: "Book a consultation", form: true }],
  },
  {
    src: "/blk/responsive/mobile/marketing-sites.webp", height: 874,
    layers: [
      { x: 18, y: 26, w: 340, h: 66, text: "WEBSITES AND APPS\nBUILT FOR MARKETING", size: 24, color: DARK, background: WHITE, lineHeight: .95 },
      { x: 163, y: 108, w: 190, h: 50, text: "We build more than campaigns: websites that sell. Demand for turnkey web development is up 60%.", size: 10, color: GRAY, background: WHITE, lineHeight: 1.02 },
      { x: 28, y: 317, w: 96, h: 72, text: "TURNKEY\nWEBSITES\n\nCorporate sites and stores", size: 13, color: DARK, background: WHITE, lineHeight: .95 },
      { x: 139, y: 317, w: 96, h: 72, text: "LANDING\nPAGES\n\nCampaign pages built to convert", size: 13, color: DARK, background: WHITE, lineHeight: .95 },
      { x: 250, y: 317, w: 96, h: 72, text: "MOBILE\nAPPS\n\niOS and Android, from MVP to launch", size: 13, color: DARK, background: WHITE, lineHeight: .95 },
      { x: 28, y: 416, w: 322, h: 127, text: "✓ Competitor and market analysis        ✓ SEO strategy for top rankings\n\n✓ Motion and interactive elements          ✓ Responsive on every device\n\n✓ Conversion-focused UX                         ✓ A/B tests after launch", size: 11, color: DARK, background: WHITE, lineHeight: 1.15 },
      { x: 28, y: 557, w: 320, h: 20, text: "Websites we have built  ↓ tap to pause", size: 10, color: DARK, background: WHITE },
      { x: 17, y: 800, w: 198, h: 32, text: "Discuss my project  ↘", size: 16, color: WHITE, background: DARK, radius: 18, align: "center" },
      { x: 226, y: 800, w: 129, h: 32, text: "Consultation", size: 15, color: WHITE, background: "linear-gradient(90deg,#f55d1c,#1c1c1c)", radius: 18, align: "center" },
    ],
    hotspots: [{ x: 17, y: 796, w: 338, h: 42, label: "Discuss a website project", form: true }],
  },
  {
    src: "/blk/responsive/mobile/marketing-qa.webp", height: 874,
    layers: [
      { x: 18, y: 68, w: 340, h: 70, text: "MARKETING\nFAQ", size: 39, color: DARK, background: WHITE, lineHeight: .88 },
      { x: 216, y: 200, w: 138, h: 40, text: "Can't find your question? Message us for a personal answer.", size: 9, color: GRAY, background: WHITE, lineHeight: 1.03 },
      ...[
        "HOW MUCH DOES PAID SEARCH COST?",
        "WHAT IS PERFORMANCE MARKETING?",
        "PAID SEARCH VS PAID SOCIAL: WHAT IS THE DIFFERENCE?",
        "HOW LONG DOES SEO TAKE?",
        "HOW DO I CHOOSE A MARKETING AGENCY?",
      ].map((text, index): TextLayer => ({ x: 54, y: 361 + index * 48, w: 278, h: 35, text: `${String(index + 1).padStart(2, "0")}   ${text}`, size: text.length > 38 ? 11 : 12.5, color: DARK, background: WHITE, lineHeight: .95 })),
      { x: 226, y: 805, w: 129, h: 31, text: "Consultation", size: 15, color: WHITE, background: "linear-gradient(90deg,#f55d1c,#1c1c1c)", radius: 18, align: "center" },
    ],
    hotspots: [{ x: 226, y: 800, w: 129, h: 40, label: "Book a consultation", form: true }],
  },
  {
    src: "/blk/responsive/mobile/marketing-discount.webp", height: 650,
    layers: [
      { x: 72, y: 127, w: 286, h: 52, text: "MARKETING DISCOUNT\nUNTIL MONTH-END", size: 23, color: DARK, background: WHITE, align: "center", lineHeight: .95 },
      { x: 185, y: 198, w: 118, h: 27, text: "PROMO CODE:\nA DISCOUNT FOR YOU", size: 8, color: DARK, background: WHITE, lineHeight: 1 },
      { x: 62, y: 350, w: 73, h: 19, text: "DAYS", size: 10, color: "#c8c8c8", background: DARK, align: "center" },
      { x: 182, y: 350, w: 73, h: 19, text: "HOURS", size: 10, color: "#c8c8c8", background: DARK, align: "center" },
      { x: 62, y: 470, w: 73, h: 19, text: "MINUTES", size: 10, color: "#c8c8c8", background: DARK, align: "center" },
      { x: 182, y: 470, w: 73, h: 19, text: "SECONDS", size: 10, color: "#c8c8c8", background: DARK, align: "center" },
      { x: 211, y: 541, w: 144, h: 25, text: "GET THE DISCOUNT", size: 13, color: WHITE, background: ORANGE, radius: 15, align: "center" },
    ],
    hotspots: [{ x: 205, y: 535, w: 155, h: 38, label: "Get the marketing discount", form: true }],
  },
];

function Frame({ frame }: { frame: FrameData }) {
  const openForm = () => document.getElementById("global-course-lead-trigger")?.click();
  return (
    <div className={styles.frameWrap} style={{ aspectRatio: `375 / ${frame.height}` }}>
      <div className={styles.frame} style={{ width: 375, height: frame.height }}>
        <img src={frame.src} alt="I AM AGENCY digital marketing services" width={375} height={frame.height} />
        {frame.layers.map((layer, index) => (
          <div className={styles.layer} key={`${frame.src}-${index}`} style={{
            left: layer.x, top: layer.y, width: layer.w, height: layer.h,
            fontSize: layer.size, color: layer.color ?? DARK, background: layer.background,
            fontWeight: layer.weight ?? 400, lineHeight: layer.lineHeight ?? .95,
            borderRadius: layer.radius, textAlign: layer.align ?? "left",
          }}>{layer.text}</div>
        ))}
        {frame.hotspots?.map((spot, index) => spot.href ? (
          <Link className={styles.hotspot} key={`${spot.label}-${index}`} href={spot.href} aria-label={spot.label} style={{ left: spot.x, top: spot.y, width: spot.w, height: spot.h }} />
        ) : (
          <button className={styles.hotspot} key={`${spot.label}-${index}`} type="button" aria-label={spot.label} onClick={spot.form ? openForm : undefined} style={{ left: spot.x, top: spot.y, width: spot.w, height: spot.h }} />
        ))}
      </div>
    </div>
  );
}

export default function MarketingTranslatedMobile() {
  return <section className={styles.root} aria-label="Digital marketing services" data-en-cta-ignore>{frames.map((frame) => <Frame frame={frame} key={frame.src} />)}</section>;
}
