import Link from "next/link";
import styles from "@/app/en/english-pages.module.css";

export default function EnglishNotFound() {
  return <main className={styles.notFound}><p>404 · PAGE NOT FOUND</p><h1>THIS PAGE<br />MISSED THE BRIEF.</h1><span>The address may have changed, or the page may not exist in English yet.</span><div><Link href="/en">English home</Link><Link href="/en/sitemap">Sitemap</Link></div></main>;
}
