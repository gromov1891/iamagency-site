import type { Metadata } from "next";
import Link from "next/link";
import { englishMetadata } from "@/app/en/EnglishPages";
import styles from "@/app/en/english-pages.module.css";

const page = {
  metaTitle: "Personal Data Processing Consent | I AM AGENCY",
  metaDescription: "Terms governing consent to the processing of personal data submitted through forms on iamagency.su.",
};

export const metadata: Metadata = englishMetadata(page, "/en/personal-data-consent", "/privacy-consent");

export default function EnglishConsentPage() {
  return (
    <main className={styles.page}>
      <article className={styles.legal}>
        <header><p>LEGAL</p><h1>Personal Data Processing Consent</h1><strong>Effective date: 3 August 2026</strong></header>
        <section><p>By selecting the consent checkbox and submitting a form on iamagency.su, I freely, specifically, knowingly and unambiguously consent to Individual Entrepreneur Maria Andreevna Gromova, Tax ID 420545021010 (“I AM AGENCY”), processing the personal data I provide.</p></section>
        <section><h2>Data covered</h2><p>The data may include my name, email address, telephone number, messenger or social profile, company or project details, budget, message and related technical or attribution information associated with the submission.</p></section>
        <section><h2>Purposes</h2><p>The data may be used to respond to my enquiry, contact me through the channels I provide, prepare and discuss a proposal, administer a possible service relationship, maintain records and protect the security of the website and enquiry process.</p></section>
        <section><h2>Operations and providers</h2><p>Processing may include collection, recording, organisation, storage, updating, retrieval, use, transmission to necessary service providers, restriction, deletion and destruction. Providers may include hosting, storage, email, messaging and other technical services acting for these purposes.</p></section>
        <section><h2>Duration and withdrawal</h2><p>This consent remains valid until the stated purposes are completed or I withdraw it, subject to any processing or retention required by law. I can withdraw consent by emailing <a href="mailto:iamagency.su@gmail.com">iamagency.su@gmail.com</a>. Withdrawal does not affect processing already carried out lawfully.</p></section>
        <section><p>More information is available in the <Link href="/en/privacy-policy">Privacy Policy</Link>.</p></section>
      </article>
    </main>
  );
}
