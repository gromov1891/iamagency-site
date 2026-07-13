import type { Metadata } from "next";
import Link from "next/link";
import { CASES } from "../case/cases";
import { DIRECTIONS } from "../marketing/directions";
import { TARIFY } from "../tarify/tarify";
import { USLUGI } from "../uslugi/uslugi";
import { BLOG_ARTICLES } from "../blog/articles";

export const metadata: Metadata = {
  title: "Карта сайта",
  description: "Карта сайта I AM AGENCY: главная, услуги, тарифы, кейсы, школа SMM, маркетинговые направления и юридические документы агентства.",
  alternates: { canonical: "/sitemap" },
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
      ...USLUGI.map((item) => ({ title: item.name, href: `/uslugi/${item.slug}` })),
      { title: "Портфолио / Кейсы", href: "/keisy" },
      { title: "Школа SMM", href: "/shkola-smm" },
      { title: "Блог", href: "/blog" },
      { title: "Контакты", href: "/#kontakty" },
    ],
  },
  {
    title: "Кейсы",
    href: "/keisy",
    children: CASES.map((item) => ({ title: item.name, href: `/case/${item.slug}` })),
  },
  {
    title: "Маркетинг",
    href: "/marketing",
    children: DIRECTIONS.filter((item) => item.status === "ready").map((item) => ({
      title: item.name,
      href: `/marketing/${item.slug}`,
    })),
  },
  {
    title: "Тарифы",
    href: "/#tarify",
    children: TARIFY.map((item) => ({ title: item.name, href: `/tarify/${item.slug}` })),
  },
  {
    title: "Блог",
    href: "/blog",
    children: BLOG_ARTICLES.map((item) => ({ title: item.title, href: `/blog/${item.slug}` })),
  },
  { title: "Согласие на обработку персональных данных", href: "/privacy-consent" },
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
