import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Карта сайта",
  robots: { index: true, follow: true },
};

/* HTML-карта сайта (по аналогии с seo-lebedev.ru/sitemap) — простой список
   всех разделов со ссылками. Ссылка «Карта сайта» ведёт сюда из футера. */
const TREE: { title: string; href: string; children?: { title: string; href: string }[] }[] = [
  {
    title: "Главная",
    href: "/",
    children: [
      { title: "Услуги", href: "/#uslugi" },
      { title: "Брендбук и SMM-стратегия", href: "/uslugi/brendbuk-i-smm-strategiya" },
      { title: "Ведение соцсетей", href: "/uslugi/vedenie-sotssetey" },
      { title: "Маркетинг и продвижение", href: "/uslugi/marketing-i-prodvizhenie" },
      { title: "Контент / Съёмки", href: "/uslugi/kontent-syomki" },
      { title: "Портфолио", href: "/#portfolio" },
      { title: "Школа SMM", href: "/#shkola" },
      { title: "Блог", href: "/#blog" },
      { title: "Контакты", href: "/#kontakty" },
    ],
  },
  { title: "Маркетинг", href: "/marketing" },
  { title: "Политика конфиденциальности", href: "/privacy-policy" },
];

export default function SitemapPage() {
  return (
    <>
      <div className="header-spacer" />
      <main
        style={{
          maxWidth: 880,
          margin: "0 auto",
          padding: "clamp(24px,4vw,64px) clamp(20px,5vw,40px) 120px",
          fontFamily: "Inter, sans-serif",
          color: "#1C1C1C",
        }}
      >
        <h1 style={{ fontSize: "clamp(28px,4vw,46px)", fontWeight: 700, margin: "0 0 28px" }}>
          Карта сайта
        </h1>

        <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {TREE.map((n) => (
            <li key={n.href} style={{ marginBottom: 18 }}>
              <Link
                href={n.href}
                style={{
                  color: "#1C1C1C",
                  textDecoration: "none",
                  fontSize: "clamp(18px,2vw,24px)",
                  fontWeight: 600,
                  borderBottom: "1px solid #1C1C1C",
                }}
              >
                {n.title}
              </Link>
              {n.children && (
                <ul style={{ listStyle: "none", margin: "12px 0 0", paddingLeft: 24 }}>
                  {n.children.map((c) => (
                    <li key={c.href} style={{ marginBottom: 8 }}>
                      <Link
                        href={c.href}
                        style={{
                          color: "#5b5b5b",
                          textDecoration: "none",
                          fontSize: "clamp(15px,1.5vw,19px)",
                        }}
                      >
                        — {c.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
