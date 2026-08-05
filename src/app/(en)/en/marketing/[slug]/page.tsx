import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { englishMetadata } from "@/app/en/EnglishPages";
import { DIRECTIONS } from "@/app/marketing/directions";
import { EN_MARKETING, findEnglishOffer } from "@/lib/i18n/en-content";

export const generateStaticParams = () => EN_MARKETING.map(({ slug }) => ({ slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = findEnglishOffer(EN_MARKETING, slug);
  if (!item) return {};
  return englishMetadata(item, `/en/marketing/${slug}`, "/marketing");
}

const STATS = [
  { num: "6+", label: "years of experience" },
  { num: "400+", label: "client reviews" },
  { num: "200+", label: "projects" },
];

export default async function EnglishMarketingDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const index = EN_MARKETING.findIndex((entry) => entry.slug === slug);
  const item = EN_MARKETING[index];
  const source = DIRECTIONS[index];
  if (!item || !source) notFound();
  const sections = [
    { heading: "What we deliver", body: item.deliverables.join(" · ") },
    { heading: "How we approach the work", body: item.intro },
    { heading: "What this creates", body: item.outcomes.join(" · ") },
  ];

  const jsonLd = [
    {
      "@context": "https://schema.org", "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://iamagency.su/en" },
        { "@type": "ListItem", position: 2, name: "Marketing", item: "https://iamagency.su/en/marketing" },
        { "@type": "ListItem", position: 3, name: item.name, item: `https://iamagency.su/en/marketing/${slug}` },
      ],
    },
    {
      "@context": "https://schema.org", "@type": "FAQPage",
      mainEntity: item.faq.map((entry) => ({ "@type": "Question", name: entry.q, acceptedAnswer: { "@type": "Answer", text: entry.a } })),
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="header-spacer" />
      <main style={{ maxWidth: 1000, margin: "0 auto", padding: "clamp(20px,3vw,48px) clamp(20px,5vw,40px) 120px", fontFamily: "Inter, sans-serif", color: "#1C1C1C" }}>
        <div style={{ display: "flex", gap: 8, fontSize: 14, color: "#9A9895", marginBottom: 20, flexWrap: "wrap" }}>
          <Link href="/en" style={{ color: "#9A9895", textDecoration: "none" }}>Home</Link><span>→</span>
          <Link href="/en/marketing" style={{ color: "#9A9895", textDecoration: "none" }}>Marketing</Link><span>→</span>
          <span style={{ color: "#1C1C1C" }}>{item.name}</span>
        </div>

        <h1 style={{ fontFamily: "var(--font-display), Inter, sans-serif", fontWeight: 400, textTransform: "uppercase", fontSize: "clamp(40px,7vw,104px)", lineHeight: .92, letterSpacing: "-.01em", margin: "0 0 24px" }}>{item.h1}</h1>
        <p style={{ fontSize: "clamp(17px,2vw,25px)", lineHeight: 1.5, maxWidth: 760, margin: "0 0 36px", color: "#1C1C1C" }}>{item.intro}</p>

        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 48 }}>
          {STATS.map((stat) => <div key={stat.label} style={{ background: "#1C1C1C", color: "#fff", borderRadius: 16, padding: "20px 28px", minWidth: 150, boxShadow: "0 2px 2px rgba(0,0,0,.25) inset" }}>
            <div style={{ fontFamily: "var(--font-display), Inter, sans-serif", fontSize: 48, lineHeight: 1, textTransform: "uppercase" }}>{stat.num}</div>
            <div style={{ fontSize: 15, textTransform: "uppercase", marginTop: 6, color: "#cfcfcf" }}>{stat.label}</div>
          </div>)}
        </div>

        {sections.map((section) => <section key={section.heading} style={{ marginBottom: 32, maxWidth: 820 }}>
          <h2 style={{ fontSize: "clamp(22px,2.6vw,34px)", fontWeight: 700, margin: "0 0 12px" }}>{section.heading}</h2>
          <p style={{ fontSize: "clamp(16px,1.8vw,19px)", lineHeight: 1.6, color: "#333" }}>{section.body}</p>
        </section>)}

        <section style={{ marginBottom: 40, maxWidth: 820 }}>
          <h2 style={{ fontSize: "clamp(22px,2.6vw,34px)", fontWeight: 700, margin: "0 0 16px" }}>Frequently asked questions</h2>
          {item.faq.map((entry) => <div key={entry.q} style={{ marginBottom: 16, paddingBottom: 16, borderBottom: "1px solid #eee" }}>
            <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 6 }}>{entry.q}</div>
            <div style={{ fontSize: 16, lineHeight: 1.55, color: "#555" }}>{entry.a}</div>
          </div>)}
        </section>

        {source.partner && <div style={{ border: "1px solid #e6e6e6", borderRadius: 18, padding: "clamp(20px,3vw,32px)", marginBottom: 32, maxWidth: 820, background: "#fafafa" }}>
          <p style={{ fontSize: "clamp(16px,1.8vw,19px)", lineHeight: 1.55, color: "#333", margin: "0 0 16px" }}>For specialised production and development work, we collaborate with this trusted partner.</p>
          <a href={source.partner.url} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", color: "#fff", background: "#F55D1C", textDecoration: "none", fontWeight: 600, padding: "11px 26px", borderRadius: 999, fontSize: 16 }}>Visit partner →</a>
        </div>}

        <div style={{ background: "#1C1C1C", borderRadius: 28, padding: "clamp(28px,4vw,48px)", color: "#fff", maxWidth: 980 }}>
          <h2 style={{ fontFamily: "var(--font-display), Inter, sans-serif", fontWeight: 400, textTransform: "uppercase", fontSize: "clamp(26px,3.4vw,44px)", lineHeight: 1, margin: "0 0 14px" }}>Let&apos;s build your {item.name.toLowerCase()} programme</h2>
          <p style={{ fontSize: "clamp(16px,1.8vw,20px)", lineHeight: 1.55, color: "#cfcfcf", margin: "0 0 24px", maxWidth: 720 }}>{item.short}</p>
          <Link href="/en#kontakty" style={{ display: "inline-block", background: "linear-gradient(90deg,#F55D1C 0%,#1C1C1C 74%)", border: "2px solid #F55D1C", color: "#fff", textDecoration: "none", fontWeight: 500, padding: "16px 38px", borderRadius: 77, fontSize: 20 }}>Get a consultation</Link>
        </div>
      </main>
    </>
  );
}
