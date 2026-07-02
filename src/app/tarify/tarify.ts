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
      "Стратегия развития, фирменный стиль и оформление аккаунта, ведение одной площадки: до 15 постов/reels + сторис, ТЗ к съёмкам, ежемесячный отчёт и персональный менеджер. От 140 000 ₽.",
  },
  {
    slug: "proryv",
    name: "ПРОРЫВ",
    html: proryvHtml,
    height: 4133,
    metaTitle: "Тариф «Прорыв» — ведение и продвижение соцсетей от 230 000 ₽",
    metaDescription:
      "Всё, что в тарифе «Движение», плюс telegram-канал, продвижение для роста охватов, работа с аудиторией и сообщениями, чат-бот с приветствием и стратегическая сессия раз в месяц. От 230 000 ₽.",
  },
  {
    slug: "triumf",
    name: "ТРИУМФ",
    html: triumfHtml,
    height: 4053,
    metaTitle: "Тариф «Триумф» — маркетинг-команда под ключ от 450 000 ₽",
    metaDescription:
      "Всё, что в тарифе «Прорыв», плюс выездная съёмка фото и видео раз в месяц, перформанс-маркетинг (контекстная реклама), инфлюенс-маркетинг и расширенное сопровождение в приоритете. От 450 000 ₽.",
  },
];

export const getTarif = (slug: string) => TARIFY.find((t) => t.slug === slug);
