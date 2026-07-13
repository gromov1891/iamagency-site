import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DIRECTIONS, getDirection } from "../directions";

/* Общий шаблон SEO-лендинга направления. Берёт данные из реестра directions.ts
   и рендерит в стиле сайта (Coolvetica-заголовки, Inter, оранжевый #F55D1C).
   Контент/семантику наполняет агент — здесь только вёрстка «общей базы». */

export function generateStaticParams() {
  return DIRECTIONS.filter((d) => d.status === "ready").map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const d = getDirection(slug);
  if (!d) return {};
  const path = `/marketing/${d.slug}`;
  return {
    title: { absolute: d.metaTitle || `${d.name} | I AM AGENCY` },
    description: d.metaDescription || d.subtitle,
    keywords: d.keywords,
    alternates: { canonical: path },
    openGraph: {
      title: d.metaTitle || `${d.name} | I AM AGENCY`,
      description: d.metaDescription || d.subtitle,
      url: path,
      siteName: "I AM AGENCY",
      locale: "ru_RU",
      type: "website",
    },
    robots: { index: true, follow: true },
  };
}

const STATS = [
  { num: "6+", label: "лет опыта" },
  { num: "400+", label: "отзывов" },
  { num: "200+", label: "проектов" },
];

export default async function DirectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const d = getDirection(slug);
  if (!d || d.status !== "ready") notFound();

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Главная", item: "https://iamagency.su/" },
        { "@type": "ListItem", position: 2, name: "Маркетинг", item: "https://iamagency.su/marketing" },
        { "@type": "ListItem", position: 3, name: d.name, item: `https://iamagency.su/marketing/${d.slug}` },
      ],
    },
    ...(d.faq?.length
      ? [{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: d.faq.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        }]
      : []),
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="header-spacer" />
      <main
        style={{
          maxWidth: 1000,
          margin: "0 auto",
          padding: "clamp(20px,3vw,48px) clamp(20px,5vw,40px) 120px",
          fontFamily: "Inter, sans-serif",
          color: "#1C1C1C",
        }}
      >
        {/* хлебные крошки */}
        <div style={{ display: "flex", gap: 8, fontSize: 14, color: "#9A9895", marginBottom: 20, flexWrap: "wrap" }}>
          <Link href="/" style={{ color: "#9A9895", textDecoration: "none" }}>Главная</Link>
          <span>→</span>
          <Link href="/marketing" style={{ color: "#9A9895", textDecoration: "none" }}>Маркетинг</Link>
          <span>→</span>
          <span style={{ color: "#1C1C1C" }}>{d.name}</span>
        </div>

        <h1
          style={{
            fontFamily: "var(--font-display), Inter, sans-serif",
            fontWeight: 400,
            textTransform: "uppercase",
            fontSize: "clamp(40px,7vw,104px)",
            lineHeight: 0.92,
            letterSpacing: "-.01em",
            margin: "0 0 24px",
          }}
        >
          {d.h1 || d.name}
        </h1>

        {d.intro && (
          <p style={{ fontSize: "clamp(17px,2vw,25px)", lineHeight: 1.5, maxWidth: 760, margin: "0 0 36px", color: "#1C1C1C" }}>
            {d.intro}
          </p>
        )}

        {/* статистика — как на странице Маркетинг */}
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 48 }}>
          {STATS.map((s) => (
            <div
              key={s.label}
              style={{
                background: "#1C1C1C",
                color: "#fff",
                borderRadius: 16,
                padding: "20px 28px",
                minWidth: 150,
                boxShadow: "0 2px 2px rgba(0,0,0,0.25) inset",
              }}
            >
              <div style={{ fontFamily: "var(--font-display), Inter, sans-serif", fontSize: 48, lineHeight: 1, textTransform: "uppercase" }}>{s.num}</div>
              <div style={{ fontSize: 15, textTransform: "uppercase", marginTop: 6, color: "#cfcfcf" }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* SEO-секции */}
        {(d.sections || []).map((sec) => (
          <section key={sec.h} style={{ marginBottom: 32, maxWidth: 820 }}>
            <h2 style={{ fontSize: "clamp(22px,2.6vw,34px)", fontWeight: 700, margin: "0 0 12px" }}>{sec.h}</h2>
            <p style={{ fontSize: "clamp(16px,1.8vw,19px)", lineHeight: 1.6, color: "#333" }}>{sec.body}</p>
          </section>
        ))}

        {/* FAQ */}
        {d.faq && d.faq.length > 0 && (
          <section style={{ marginBottom: 40, maxWidth: 820 }}>
            <h2 style={{ fontSize: "clamp(22px,2.6vw,34px)", fontWeight: 700, margin: "0 0 16px" }}>Частые вопросы</h2>
            {d.faq.map((f) => (
              <div key={f.q} style={{ marginBottom: 16, paddingBottom: 16, borderBottom: "1px solid #eee" }}>
                <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 6 }}>{f.q}</div>
                <div style={{ fontSize: 16, lineHeight: 1.55, color: "#555" }}>{f.a}</div>
              </div>
            ))}
          </section>
        )}

        {/* Партнёр-подрядчик (Tantal / Villo) */}
        {d.partner && (
          <div
            style={{
              border: "1px solid #e6e6e6",
              borderRadius: 18,
              padding: "clamp(20px,3vw,32px)",
              marginBottom: 32,
              maxWidth: 820,
              background: "#fafafa",
            }}
          >
            <p style={{ fontSize: "clamp(16px,1.8vw,19px)", lineHeight: 1.55, color: "#333", margin: "0 0 16px" }}>
              {d.partner.note}
            </p>
            <a
              href={d.partner.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                color: "#fff",
                background: "#F55D1C",
                textDecoration: "none",
                fontWeight: 600,
                padding: "11px 26px",
                borderRadius: 999,
                fontSize: 16,
              }}
            >
              {d.partner.label} →
            </a>
          </div>
        )}

        {/* CTA — «поможем с …» */}
        <div
          style={{
            background: "#1C1C1C",
            borderRadius: 28,
            padding: "clamp(28px,4vw,48px)",
            color: "#fff",
            maxWidth: 980,
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-display), Inter, sans-serif",
              fontWeight: 400,
              textTransform: "uppercase",
              fontSize: "clamp(26px,3.4vw,44px)",
              lineHeight: 1,
              margin: "0 0 14px",
            }}
          >
            {d.ctaTitle || `Поможем с «${d.name}»`}
          </h2>
          {d.ctaText && <p style={{ fontSize: "clamp(16px,1.8vw,20px)", lineHeight: 1.55, color: "#cfcfcf", margin: "0 0 24px", maxWidth: 720 }}>{d.ctaText}</p>}
          <Link
            href="/#kontakty"
            style={{
              display: "inline-block",
              background: "linear-gradient(90deg,#F55D1C 0%,#1C1C1C 74%)",
              border: "2px solid #F55D1C",
              color: "#fff",
              textDecoration: "none",
              fontWeight: 500,
              padding: "16px 38px",
              borderRadius: 77,
              fontSize: 20,
            }}
          >
            Получить консультацию
          </Link>
        </div>
      </main>
    </>
  );
}
