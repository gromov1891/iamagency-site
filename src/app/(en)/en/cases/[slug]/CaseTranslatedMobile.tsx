import BuilderSlice, { type BuilderSliceSpec } from "@/app/blocks/BuilderSlice";
import styles from "./case-translated-mobile.module.css";

const TOP: BuilderSliceSpec[] = [
  { x: 30, y: 0, w: 600, h: 900 },
  { x: 560, y: 150, w: 860, h: 740 },
];

const band = (y: number): BuilderSliceSpec[] => [
  { x: 20, y, w: 750, h: 740 },
  { x: 670, y, w: 750, h: 740 },
];

const compact: BuilderSliceSpec[] = [
  { x: 0, y: 0, w: 1440, h: 180 },
  { x: 20, y: 145, w: 770, h: 760 },
  { x: 650, y: 145, w: 770, h: 760 },
];

const slicesBySlug: Record<string, BuilderSliceSpec[]> = {
  beauty: [...TOP, ...band(950), ...band(1780)],
  fashion: [...TOP, ...band(950), ...band(1765)],
  "sports-education": [...TOP, ...band(950)],
  "personal-brands": compact,
  "real-estate": [...TOP, ...band(945), ...band(1780)],
  "travel-hospitality": [...TOP, ...band(945)],
  automotive: compact,
  horeca: [...TOP, ...band(920)],
  ecommerce: [...TOP, ...band(950), ...band(1780), ...band(2615), ...band(3450)],
  events: [...TOP, ...band(955)],
};

export default function CaseTranslatedMobile({ slug, html, height }: { slug: string; html: string; height: number }) {
  const slices = slicesBySlug[slug] ?? [{ x: 0, y: 0, w: 1440, h: height }];
  return (
    <section className={styles.root} aria-label="Case study visuals">
      {slices.map((slice, index) => <BuilderSlice key={`${slug}-${index}`} html={html} sourceH={height} slice={slice} />)}
    </section>
  );
}
