import type { Metadata } from "next";
import { englishMetadata } from "@/app/en/EnglishPages";
import styles from "@/app/en/english-pages.module.css";

const page = {
  metaTitle: "Privacy Policy | I AM AGENCY",
  metaDescription: "Learn how I AM AGENCY collects, uses, stores and protects personal data submitted through iamagency.su.",
};

export const metadata: Metadata = englishMetadata(page, "/en/privacy-policy", "/privacy-policy");

export default function EnglishPrivacyPolicyPage() {
  return (
    <main className={styles.page}>
      <article className={styles.legal}>
        <header><p>LEGAL</p><h1>Privacy Policy</h1><strong>Effective date: 3 August 2026</strong></header>
        <section><h2>1. Who controls your data</h2><p>The operator of iamagency.su and controller of personal data submitted through the website is Individual Entrepreneur Maria Andreevna Gromova, Tax ID 420545021010 (“I AM AGENCY”, “we”, “us”). You can contact us at <a href="mailto:iamagency.su@gmail.com">iamagency.su@gmail.com</a>.</p></section>
        <section><h2>2. What we collect</h2><p>Depending on the form and your choices, we may collect your name, email address, telephone number, messenger or social profile, company or project details, budget range, message and the page from which the enquiry was sent.</p><p>We may also receive limited technical and attribution data such as IP address, browser information, referring page, landing page, UTM parameters, advertising click identifiers and analytics client identifiers.</p></section>
        <section><h2>3. Why we use it</h2><ul><li>to respond to an enquiry and prepare a proposal;</li><li>to provide and administer requested services;</li><li>to operate, secure and improve the website;</li><li>to measure marketing effectiveness where consent or another lawful basis applies;</li><li>to meet legal, accounting and fraud-prevention obligations.</li></ul></section>
        <section><h2>4. Legal basis and consent</h2><p>We process data to take steps at your request, perform an agreement, comply with legal obligations, pursue legitimate interests that do not override your rights, or on the basis of consent. Where consent is the basis, you may withdraw it for future processing by contacting us.</p></section>
        <section><h2>5. Service providers and transfers</h2><p>We may use hosting, storage, email, messaging, analytics, advertising and technical service providers only to the extent necessary for the stated purposes. Some providers may process data in another country. Where applicable, we use legally recognised safeguards and limit the data shared.</p></section>
        <section><h2>6. Retention and security</h2><p>We keep personal data only for as long as necessary for the purpose, the relationship with you and applicable record-keeping requirements. We use organisational and technical controls intended to prevent unauthorised access, alteration, disclosure or loss. No internet transmission can be guaranteed completely secure.</p></section>
        <section><h2>7. Your choices and rights</h2><p>You may ask for information about your data, request correction or deletion, object to or restrict certain processing, withdraw consent and raise a concern with the competent authority, subject to applicable law. Email your request to <a href="mailto:iamagency.su@gmail.com">iamagency.su@gmail.com</a>; we may need to verify your identity.</p></section>
        <section><h2>8. Cookies and analytics</h2><p>The website may use necessary storage and analytics or advertising technologies. You can control cookies through your browser and, where a consent interface is shown, through those settings. Restricting some technologies may affect site functionality.</p></section>
        <section><h2>9. Changes</h2><p>We may update this policy when the website, our services or legal requirements change. The current version and effective date will remain available on this page.</p></section>
      </article>
    </main>
  );
}
