import type { Metadata } from "next";
import Link from "next/link";
import ResponsiveBlock from "@/app/blocks/ResponsiveBlock";
import EnglishFigmaEnhancer from "@/app/en/EnglishFigmaEnhancer";
import { futerHtml, futerH } from "@/app/blocks/gen/futerHtml";
import { futerTabletHtml, futerTabletH } from "@/app/blocks/gen/futerTabletHtml";
import { futerMobileHtml, futerMobileH } from "@/app/blocks/gen/futerMobileHtml";
import { shkolaPageDesktopHtml, shkolaPageDesktopH } from "@/app/shkola/gen/shkolaPageDesktopHtml";
import { shkolaPageTabletHtml, shkolaPageTabletH } from "@/app/shkola/gen/shkolaPageTabletHtml";
import { shkolaPageMobileHtml, shkolaPageMobileH } from "@/app/shkola/gen/shkolaPageMobileHtml";
import { getSeoAlternates } from "@/lib/i18n/routes";
import { translateGeneratedHtml as en } from "@/lib/i18n/translate-generated-html";

const SITE = "https://iamagency.su";
const FAQ = [
  { q: "Do I need previous SMM experience?", a: "No. The course starts with the foundations and moves from project setup and account packaging to content, promotion and marketing." },
  { q: "Who is the course for?", a: "It is designed for people changing careers, building a stable remote income or aiming to join a professional social media team." },
  { q: "What does the programme include?", a: "Seven practical modules cover project launch, Instagram, Reels, influencer work, Telegram, VK and marketing, plus weekly masterminds and an online graduation project." },
  { q: "How is the course delivered?", a: "The programme is online and practice-led, with regular reviews and live mastermind sessions, so it can be combined with work from any location." },
];

export const metadata: Metadata = {
  title: { absolute: "Practical SMM Course from Zero to Profession | I AM AGENCY" },
  description: "A practical social media marketing course covering strategy, content, Reels, influencers, Telegram, VK, marketing and client work.",
  alternates: getSeoAlternates("/shkola-smm"),
  openGraph: { title: "I AM AGENCY SMM School", description: "Learn social media marketing through real agency workflows and practical assignments.", url: `${SITE}/en/smm-school`, siteName: "I AM AGENCY", locale: "en_US", type: "website" },
  robots: { index: true, follow: true },
};

export default function EnglishSchoolPage() {
  const jsonLd = [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/en` }, { "@type": "ListItem", position: 2, name: "SMM School", item: `${SITE}/en/smm-school` }] },
    { "@context": "https://schema.org", "@type": "Course", name: "I AM AGENCY SMM School", description: "Practical social media marketing training from project launch to content, channels and marketing.", provider: { "@type": "Organization", name: "I AM AGENCY", sameAs: SITE } },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQ.map((entry) => ({ "@type": "Question", name: entry.q, acceptedAnswer: { "@type": "Answer", text: entry.a } })) },
  ];
  return (
    <EnglishFigmaEnhancer>
      <div className="header-spacer" style={{ background: "#1c1c1c" }} />
      <ResponsiveBlock desktopHtml={en(shkolaPageDesktopHtml)} desktopH={shkolaPageDesktopH} tabletHtml={en(shkolaPageTabletHtml)} tabletH={shkolaPageTabletH} mobileHtml={en(shkolaPageMobileHtml)} mobileH={shkolaPageMobileH} overflow="hidden" />
      <section style={{ maxWidth: 1000, margin: "0 auto", padding: "clamp(32px,5vw,72px) clamp(20px,5vw,40px)", fontFamily: "Inter,sans-serif", color: "#1c1c1c" }}>
        <h1 style={{ fontFamily: "var(--font-display),Inter,sans-serif", fontWeight: 400, textTransform: "uppercase", fontSize: "clamp(28px,5vw,56px)", lineHeight: 1, margin: "0 0 24px" }}>SMM school: from zero to a professional workflow</h1>
        <p style={{ fontSize: "clamp(16px,1.4vw,19px)", lineHeight: 1.5, color: "#3a3a3a" }}>I AM AGENCY’s practical course teaches social media as a connected system — from project launch and account setup to Reels, creator work, Telegram, VK and marketing. Weekly mastermind sessions and a graduation project turn theory into work you can actually deliver.</p>
        <h2 style={{ fontSize: "clamp(22px,3vw,34px)", margin: "40px 0 20px" }}>Frequently asked questions</h2>
        {FAQ.map((entry) => <details key={entry.q} style={{ borderTop: "1px solid #e5e3e0", padding: "16px 0" }}><summary style={{ cursor: "pointer", listStyle: "none", fontSize: "clamp(17px,1.6vw,21px)", fontWeight: 600 }}>{entry.q}</summary><p style={{ margin: "12px 0 0", fontSize: "clamp(15px,1.3vw,18px)", lineHeight: 1.55, color: "#3a3a3a" }}>{entry.a}</p></details>)}
        <nav style={{ marginTop: 44, display: "flex", flexWrap: "wrap", gap: "12px 24px", fontSize: 16 }}><Link href="/en#kontakty" style={{ color: "#f55d1c", fontWeight: 600 }}>Apply</Link><Link href="/en/cases">Cases</Link><Link href="/en#uslugi">Services</Link></nav>
      </section>
      <ResponsiveBlock desktopHtml={en(futerHtml)} desktopH={futerH} tabletHtml={en(futerTabletHtml)} tabletH={futerTabletH} mobileHtml={en(futerMobileHtml)} mobileH={futerMobileH} overflow="hidden" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </EnglishFigmaEnhancer>
  );
}
