import type { Metadata } from "next";
import Link from "next/link";
import { englishMetadata } from "@/app/en/EnglishPages";
import { EN_ARTICLES } from "@/lib/i18n/en-articles";
import { EN_CASES, EN_MARKETING, EN_PACKAGES, EN_SERVICES } from "@/lib/i18n/en-content";
import styles from "@/app/en/english-pages.module.css";

const page = { metaTitle: "English Sitemap | I AM AGENCY", metaDescription: "Browse every English-language page available on the I AM AGENCY website." };
export const metadata: Metadata = englishMetadata(page, "/en/sitemap", "/sitemap");

const groups = [
  { title: "Main", links: [["Home", "/en"], ["Services", "/en#uslugi"], ["Cases", "/en/cases"], ["Marketing", "/en/marketing"], ["Packages", "/en#tarify"], ["Insights", "/en/blog"], ["SMM School", "/en/smm-school"], ["Applied Claude Intensive", "/en/smm-school/applied-claude-intensive"], ["Contacts", "/en/contacts"]] },
  { title: "Services", links: EN_SERVICES.map((item) => [item.name, `/en/services/${item.slug}`]) },
  { title: "Cases", links: EN_CASES.map((item) => [item.name, `/en/cases/${item.slug}`]) },
  { title: "Marketing", links: EN_MARKETING.map((item) => [item.name, `/en/marketing/${item.slug}`]) },
  { title: "Packages", links: EN_PACKAGES.map((item) => [item.name, `/en/packages/${item.slug}`]) },
  { title: "Insights", links: EN_ARTICLES.map((item) => [item.title, `/en/blog/${item.slug}`]) },
  { title: "Legal", links: [["Privacy Policy", "/en/privacy-policy"], ["Personal Data Processing Consent", "/en/personal-data-consent"]] },
] satisfies { title: string; links: string[][] }[];

export default function EnglishSitemapPage() {
  return <main className={styles.page}><section className={styles.hubHero}><p className={styles.eyebrow}>SITE DIRECTORY</p><h1>ENGLISH SITEMAP</h1><p className={styles.lead}>Every English-language section and page in one place.</p></section><section className={styles.sitemapGrid}>{groups.map((group) => <section key={group.title}><h2>{group.title}</h2>{group.links.map(([label, href]) => <Link href={href} key={href}>{label}<span>↗</span></Link>)}</section>)}</section></main>;
}
