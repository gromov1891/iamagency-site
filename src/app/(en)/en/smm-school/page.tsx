import type { Metadata } from "next";
import { EnglishCta, englishMetadata } from "@/app/en/EnglishPages";
import styles from "@/app/en/english-pages.module.css";

const page = {
  metaTitle: "Practical SMM Course | I AM AGENCY School",
  metaDescription: "A practical social media marketing course from I AM AGENCY covering strategy, content, production, publishing, paid campaigns and client work.",
};

export const metadata: Metadata = englishMetadata(page, "/en/smm-school", "/shkola-smm");

const modules = [
  ["01", "Strategy", "Audience research, positioning, channel roles, objectives and a useful measurement framework."],
  ["02", "Content systems", "Pillars, formats, editorial planning, copy and a workflow that can survive a real client calendar."],
  ["03", "Visuals & production", "References, briefs, mobile production, design systems, short-form video and quality control."],
  ["04", "Publishing & community", "Platform adaptation, approvals, community workflows and practical risk management."],
  ["05", "Growth", "Organic distribution, paid social fundamentals, creator work, experiments and interpreting results."],
  ["06", "Client work", "Briefing, proposals, scope, reporting, feedback and building a sustainable specialist practice."],
];

export default function EnglishSchoolPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hubHero}><p className={styles.eyebrow}>I AM AGENCY SCHOOL</p><h1>LEARN SMM BY DOING THE WORK.</h1><p className={styles.lead}>A practical programme built from agency workflows — from strategy and content to delivery, measurement and client communication.</p><a className={styles.heroCta} href="#course">Explore the programme <span>↓</span></a></section>
      <section className={styles.introBlock} id="course"><span>THE PROGRAMME</span><p>Learn how the parts of social media work together, then practise turning a brief into a clear, publishable and measurable system.</p></section>
      <section className={styles.courseGrid}>{modules.map(([number, title, text]) => <article key={number}><span>{number}</span><h2>{title}</h2><p>{text}</p></article>)}</section>
      <section className={styles.outcomes}><header><span>FORMAT & AVAILABILITY</span><h2>Confirm the right cohort before you enrol.</h2></header><div><p>Programme format, dates and cohort language are confirmed before enrolment.<span>↗</span></p><p>Submit an enquiry and we will share the current schedule and entry requirements.<span>↗</span></p><p>No prior agency experience is required; practical commitment is.<span>↗</span></p></div></section>
      <EnglishCta />
    </main>
  );
}
