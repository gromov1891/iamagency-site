import { dvizhenieHtml } from "./gen/dvizhenieHtml";
import { proryvHtml } from "./gen/proryvHtml";
import { triumfHtml } from "./gen/triumfHtml";
import { mobileFigmaFrame } from "../blocks/gen/mobileFigmaFrame";

/* Реестр страниц тарифов /tarify/<slug>. Каждая страница — 1:1 холст из Figma
   (фреймы «Движение» #12391:6403 и «ПРОРЫВ» #12404:6644), рендерится через
   BuilderBlock. Тип совпадает с Usluga из uslugi.ts. */

export type Tarif = {
  slug: string;
  name: string;
  html: string; // готовый холст 1440×height
  height: number; // высота фрейма в Figma
  mobileHtml: string;
  mobileHeight: number;
  price: number;
  metaTitle: string;
  metaDescription: string;
};

export const TARIFY: Tarif[] = [
  {
    slug: "dvizhenie",
    name: "Движение",
    html: dvizhenieHtml,
    height: 5589,
    mobileHeight: 3184,
    price: 140000,
    mobileHtml: mobileFigmaFrame({
      src: "/blk/responsive/mobile/tarif-dvizhenie.webp",
      height: 3184,
      alt: "Тариф Движение: стратегия, оформление и ведение соцсетей",
      eager: true,
      hotspots: [
        { x: 198, y: 748, width: 157, height: 58, label: "Купить тариф" },
        { x: 20, y: 3071, width: 335, height: 53, label: "Получить консультацию" },
      ],
    }),
    metaTitle: "Тариф «Движение» — ведение соцсетей от 140 000 ₽",
    metaDescription:
      "Стратегия, фирменный стиль и ведение одной площадки: до 15 постов или Reels, сторис, ТЗ к съёмкам, отчёт и менеджер. Системный SMM от 140 000 ₽.",
  },
  {
    slug: "proryv",
    name: "ПРОРЫВ",
    html: proryvHtml,
    height: 4133,
    mobileHeight: 2145,
    price: 230000,
    mobileHtml: mobileFigmaFrame({
      src: "/blk/responsive/mobile/tarif-proryv.webp",
      height: 2145,
      alt: "Тариф Прорыв: ведение и продвижение соцсетей",
      eager: true,
      hotspots: [
        { x: 198, y: 748, width: 157, height: 58, label: "Купить тариф" },
        { x: 20, y: 2048, width: 335, height: 56, label: "Получить консультацию" },
      ],
    }),
    metaTitle: "Тариф «Прорыв» — ведение и продвижение соцсетей от 230 000 ₽",
    metaDescription:
      "Ведение и продвижение соцсетей и Telegram: рост охватов, работа с аудиторией, чат-бот и ежемесячная стратегическая сессия. От 230 000 ₽.",
  },
  {
    slug: "triumf",
    name: "ТРИУМФ",
    html: triumfHtml,
    height: 4053,
    mobileHeight: 2145,
    price: 450000,
    mobileHtml: mobileFigmaFrame({
      src: "/blk/responsive/mobile/tarif-triumf.webp",
      height: 2145,
      alt: "Тариф Триумф: маркетинг-команда под ключ",
      eager: true,
      hotspots: [
        { x: 198, y: 748, width: 157, height: 58, label: "Купить тариф" },
        { x: 20, y: 2050, width: 335, height: 56, label: "Получить консультацию" },
      ],
    }),
    metaTitle: "Тариф «Триумф» — маркетинг-команда под ключ от 450 000 ₽",
    metaDescription:
      "Маркетинг-команда под ключ: ведение, ежемесячная фото- и видеосъёмка, performance- и influence-маркетинг, приоритетное сопровождение. От 450 000 ₽.",
  },
];

export const getTarif = (slug: string) => TARIFY.find((t) => t.slug === slug);
