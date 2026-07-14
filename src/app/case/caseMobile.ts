import { mobileFigmaFrame } from "../blocks/gen/mobileFigmaFrame";

type MobileCase = { html: string; height: number };

const specs: Record<string, { file: string; height: number; alt: string }> = {
  beauty: { file: "case-beauty.webp", height: 2504, alt: "SMM-кейсы для салонов красоты и beauty-брендов" },
  fashion: { file: "case-fashion.webp", height: 2504, alt: "SMM-кейсы для fashion-брендов и магазинов одежды" },
  sport: { file: "case-sport.webp", height: 1626, alt: "SMM-кейсы в спорте и образовании" },
  experts: { file: "case-experts.webp", height: 874, alt: "Кейсы продвижения экспертов и личного бренда" },
  "real-estate": { file: "case-real-estate.webp", height: 2504, alt: "SMM-кейсы агентств недвижимости и застройщиков" },
  tourism: { file: "case-tourism.webp", height: 1626, alt: "SMM-кейсы отелей, туров и travel-брендов" },
  cars: { file: "case-cars.webp", height: 874, alt: "SMM-кейсы автомобильного бизнеса и техники" },
  horeca: { file: "case-horeca.webp", height: 1626, alt: "SMM-кейсы ресторанов, кафе и баров" },
  product: { file: "case-product.webp", height: 4253, alt: "SMM-кейсы товарного бизнеса и интернет-магазинов" },
  events: { file: "case-events.webp", height: 1626, alt: "SMM-кейсы мероприятий, фестивалей и событий" },
};

export const CASE_MOBILE: Record<string, MobileCase> = Object.fromEntries(
  Object.entries(specs).map(([slug, spec]) => [
    slug,
    {
      height: spec.height,
      html: mobileFigmaFrame({
        src: `/blk/responsive/mobile/${spec.file}`,
        height: spec.height,
        alt: spec.alt,
        eager: true,
      }),
    },
  ]),
);

export const getCaseMobile = (slug: string) => CASE_MOBILE[slug];
