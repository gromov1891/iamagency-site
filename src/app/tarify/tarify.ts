import { dvizhenieHtml } from "./gen/dvizhenieHtml";
import { proryvHtml } from "./gen/proryvHtml";
import { triumfHtml } from "./gen/triumfHtml";

/* Реестр страниц тарифов /tarify/<slug>. Каждая страница — 1:1 холст из Figma
   (фреймы «Движение» #12391:6403 и «ПРОРЫВ» #12404:6644), рендерится через
   BuilderBlock. Тип совпадает с Usluga из uslugi.ts. */

export type Tarif = {
  slug: string;
  name: string;
  html: string; // готовый холст 1440×height
  height: number; // высота фрейма в Figma
  metaTitle: string;
  metaDescription: string;
};

export const TARIFY: Tarif[] = [
  {
    slug: "dvizhenie",
    name: "Движение",
    html: dvizhenieHtml,
    height: 5589,
    metaTitle: "Тариф «Движение» — ведение соцсетей от 140 000 ₽",
    metaDescription:
      "Стратегия, фирменный стиль и ведение одной площадки: до 15 постов или Reels, сторис, ТЗ к съёмкам, отчёт и менеджер. От 140 000 ₽.",
  },
  {
    slug: "proryv",
    name: "ПРОРЫВ",
    html: proryvHtml,
    height: 4133,
    metaTitle: "Тариф «Прорыв» — ведение и продвижение соцсетей от 230 000 ₽",
    metaDescription:
      "Ведение соцсетей и Telegram, рост охватов, работа с аудиторией, чат-бот и ежемесячная стратегическая сессия. Тариф от 230 000 ₽.",
  },
  {
    slug: "triumf",
    name: "ТРИУМФ",
    html: triumfHtml,
    height: 4053,
    metaTitle: "Тариф «Триумф» — маркетинг-команда под ключ от 450 000 ₽",
    metaDescription:
      "Маркетинг-команда под ключ: ведение, ежемесячная фото- и видеосъёмка, performance- и influence-маркетинг, приоритетное сопровождение. От 450 000 ₽.",
  },
];

export const getTarif = (slug: string) => TARIFY.find((t) => t.slug === slug);
