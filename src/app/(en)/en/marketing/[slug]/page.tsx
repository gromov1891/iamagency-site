import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EN_MARKETING, findEnglishOffer } from "@/lib/i18n/en-content";
import { TRANSLATION_ROUTES, getSeoAlternates } from "@/lib/i18n/routes";

const SITE = "https://iamagency.su";
const STATS = [{ num: "7+", label: "years of experience" }, { num: "400+", label: "client reviews" }, { num: "200+", label: "projects" }];
export const generateStaticParams = () => EN_MARKETING.map(({ slug }) => ({ slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = findEnglishOffer(EN_MARKETING, slug);
  if (!item) return {};
  const path = `/en/marketing/${slug}`;
  const ru = TRANSLATION_ROUTES.find((route) => route.en === path)?.ru || "/marketing";
  return { title: { absolute: item.metaTitle }, description: item.metaDescription, alternates: getSeoAlternates(ru), openGraph: { title: item.metaTitle, description: item.metaDescription, url: `${SITE}${path}`, siteName: "I AM AGENCY", locale: "en_US", type: "website" }, robots: { index: true, follow: true } };
}

export default async function EnglishMarketingDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = findEnglishOffer(EN_MARKETING, slug);
  if (!item) notFound();
  const jsonLd = [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/en` }, { "@type": "ListItem", position: 2, name: "Marketing", item: `${SITE}/en/marketing` }, { "@type": "ListItem", position: 3, name: item.name, item: `${SITE}/en/marketing/${slug}` }] },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: item.faq.map((entry) => ({ "@type": "Question", name: entry.q, acceptedAnswer: { "@type": "Answer", text: entry.a } })) },
  ];
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <div className="header-spacer" />
    <main style={{ maxWidth: 1000, margin: "0 auto", padding: "clamp(20px,3vw,48px) clamp(20px,5vw,40px) 120px", fontFamily: "Inter,sans-serif", color: "#1c1c1c" }}>
      <nav style={{ display: "flex", gap: 8, fontSize: 14, color: "#9a9895", marginBottom: 20, flexWrap: "wrap" }}><Link href="/en" style={{ color: "inherit", textDecoration: "none" }}>Home</Link><span>→</span><Link href="/en/marketing" style={{ color: "inherit", textDecoration: "none" }}>Marketing</Link><span>→</span><span style={{ color: "#1c1c1c" }}>{item.name}</span></nav>
      <h1 style={{ fontFamily: "var(--font-display),Inter,sans-serif", fontWeight: 400, textTransform: "uppercase", fontSize: "clamp(40px,7vw,104px)", lineHeight: .92, letterSpacing: "-.01em", margin: "0 0 24px" }}>{item.h1}</h1>
      <p style={{ fontSize: "clamp(17px,2vw,25px)", lineHeight: 1.5, maxWidth: 760, margin: "0 0 36px" }}>{item.intro}</p>
      <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 48 }}>{STATS.map((stat) => <div key={stat.label} style={{ background: "#1c1c1c", color: "#fff", borderRadius: 16, padding: "20px 28px", minWidth: 150, boxShadow: "inset 0 2px 2px rgba(0,0,0,.25)" }}><div style={{ fontFamily: "var(--font-display),Inter,sans-serif", fontSize: 48, lineHeight: 1 }}>{stat.num}</div><div style={{ fontSize: 15, textTransform: "uppercase", marginTop: 6, color: "#cfcfcf" }}>{stat.label}</div></div>)}</div>
      <section style={{ marginBottom: 32, maxWidth: 820 }}><h2 style={{ fontSize: "clamp(22px,2.6vw,34px)", margin: "0 0 12px" }}>What we deliver</h2><ul style={{ fontSize: "clamp(16px,1.8vw,19px)", lineHeight: 1.6, color: "#333" }}>{item.deliverables.map((entry) => <li key={entry}>{entry}</li>)}</ul></section>
      <section style={{ marginBottom: 40, maxWidth: 820 }}><h2 style={{ fontSize: "clamp(22px,2.6vw,34px)", margin: "0 0 16px" }}>Frequently asked questions</h2>{item.faq.map((entry) => <div key={entry.q} style={{ marginBottom: 16, paddingBottom: 16, borderBottom: "1px solid #eee" }}><div style={{ fontWeight: 600, fontSize: 18, marginBottom: 6 }}>{entry.q}</div><div style={{ fontSize: 16, lineHeight: 1.55, color: "#555" }}>{entry.a}</div></div>)}</section>
      <div style={{ background: "#1c1c1c", borderRadius: 28, padding: "clamp(28px,4vw,48px)", color: "#fff", maxWidth: 980 }}><h2 style={{ fontFamily: "var(--font-display),Inter,sans-serif", fontWeight: 400, textTransform: "uppercase", fontSize: "clamp(26px,3.4vw,44px)", lineHeight: 1, margin: "0 0 14px" }}>Let’s build the right {item.name.toLowerCase()} system</h2><p style={{ fontSize: "clamp(16px,1.8vw,20px)", lineHeight: 1.55, color: "#cfcfcf", maxWidth: 720 }}>{item.short}</p><Link href="/en#kontakty" style={{ display: "inline-block", background: "linear-gradient(90deg,#f55d1c 0%,#1c1c1c 74%)", border: "2px solid #f55d1c", color: "#fff", textDecoration: "none", fontWeight: 500, padding: "16px 38px", borderRadius: 77, fontSize: 20 }}>Book a consultation</Link></div>
    </main>
  </>;
}
