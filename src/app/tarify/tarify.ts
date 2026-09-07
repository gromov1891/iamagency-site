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
    price: 80000,
    mobileHtml: mobileFigmaFrame({
      src: "/blk/responsive/mobile/tarif-dvizhenie.webp",
      height: 3184,
      alt: "Тариф Движение: стратегия, оформление и ведение соцсетей",
      eager: true,
      hotspots: [
        { x: 198, y: 748, width: 157, height: 58, label: "Купить тариф" },
        { x: 20, y: 3071, width: 335, height: 53, label: "Получить консультацию" },
      ],
      covers: [
        { x: 12, y: 190, width: 351, height: 210, color: "#1C1C1C" },
        { x: 12, y: 472, width: 351, height: 258, color: "#1C1C1C" },
        { x: 15, y: 1080, width: 345, height: 165, color: "#1C1C1C" },
      ],
      textPatches: [
        { x: 20, y: 216, width: 335, height: 56, text: "ДВИЖЕНИЕ", color: "#FFFFFF", fontFamily: "Coolvetica,sans-serif", fontSize: 52, lineHeight: 1, textTransform: "uppercase" },
        { x: 20, y: 286, width: 38, height: 52, text: "/", color: "#90BEE9", fontFamily: "Coolvetica,sans-serif", fontSize: 50, lineHeight: 1 },
        { x: 68, y: 290, width: 284, height: 52, text: "от 80 000₽", color: "#9A9895", fontFamily: "Coolvetica,sans-serif", fontSize: 45, lineHeight: 1 },
        { x: 18, y: 485, width: 340, height: 30, text: "ЧТО ВХОДИТ В ТАРИФ:", color: "#9A9895", fontFamily: "Coolvetica,sans-serif", fontSize: 22, lineHeight: 1, textTransform: "uppercase" },
        { x: 18, y: 530, width: 340, height: 190, text: ">  стратегия развития\n\n>  фирменный стиль и оформление аккаунта\n\n>  ведение одной площадки: до 9 постов/reels +\n   2 сторис-серии в неделю\n\n>  ТЗ к съёмкам\n\n>  ежемесячный отчёт\n\n>  персональный менеджер на связи", color: "#FFFFFF", fontSize: 11, lineHeight: 1.05 },
        { x: 20, y: 1098, width: 335, height: 28, text: "ВЕДЕНИЕ ОДНОЙ ПЛОЩАДКИ", color: "#FFFFFF", fontFamily: "Coolvetica,sans-serif", fontSize: 18, lineHeight: 1, textTransform: "uppercase" },
        { x: 20, y: 1138, width: 335, height: 96, text: "до 9 постов/reels в месяц + 2 сторис-серии в неделю\nдля каждой публикации пишем текст или сценарий, верстаем креативы, монтируем видео, готовим описание, работаем с альт-тегами и хештегами, выкладываем", color: "#FFFFFF", fontSize: 11, lineHeight: 1.05 },
      ],
    }),
    metaTitle: "Тариф «Движение» — ведение соцсетей от 80 000 ₽",
    metaDescription:
      "Стратегия, фирменный стиль и ведение одной площадки: до 9 постов или Reels и 2 сторис-серии в неделю, ТЗ к съёмкам, отчёт и менеджер. От 80 000 ₽.",
  },
  {
    slug: "proryv",
    name: "ПРОРЫВ",
    html: proryvHtml,
    height: 4133,
    mobileHeight: 2145,
    price: 140000,
    mobileHtml: mobileFigmaFrame({
      src: "/blk/responsive/mobile/tarif-proryv.webp",
      height: 2145,
      alt: "Тариф Прорыв: ведение и продвижение соцсетей",
      eager: true,
      hotspots: [
        { x: 198, y: 748, width: 157, height: 58, label: "Купить тариф" },
        { x: 20, y: 2048, width: 335, height: 56, label: "Получить консультацию" },
      ],
      covers: [
        { x: 12, y: 190, width: 351, height: 210, color: "#1C1C1C" },
        { x: 12, y: 450, width: 351, height: 280, color: "#1C1C1C" },
      ],
      textPatches: [
        { x: 20, y: 216, width: 335, height: 56, text: "ПРОРЫВ", color: "#FFFFFF", fontFamily: "Coolvetica,sans-serif", fontSize: 52, lineHeight: 1, textTransform: "uppercase" },
        { x: 20, y: 286, width: 38, height: 52, text: "/", color: "#8992E4", fontFamily: "Coolvetica,sans-serif", fontSize: 50, lineHeight: 1 },
        { x: 68, y: 290, width: 284, height: 52, text: "от 140 000₽", color: "#9A9895", fontFamily: "Coolvetica,sans-serif", fontSize: 45, lineHeight: 1 },
        { x: 18, y: 463, width: 340, height: 30, text: "ЧТО ВХОДИТ В ТАРИФ:", color: "#9A9895", fontFamily: "Coolvetica,sans-serif", fontSize: 22, lineHeight: 1, textTransform: "uppercase" },
        { x: 18, y: 508, width: 340, height: 210, text: ">  всё, что в тарифе «Движение»\n\n>  Telegram-канал (вторая площадка)\n\n>  продвижение для роста охватов\n\n>  работа с аудиторией и сообщениями\n\n>  чат-бот с приветственным сообщением\n\n>  стратегическая сессия раз в месяц", color: "#FFFFFF", fontSize: 11, lineHeight: 1.05 },
      ],
    }),
    metaTitle: "Тариф «Прорыв» — ведение и продвижение соцсетей от 140 000 ₽",
    metaDescription:
      "Ведение и продвижение соцсетей и Telegram: рост охватов, работа с аудиторией, чат-бот и ежемесячная стратегическая сессия. От 140 000 ₽.",
  },
  {
    slug: "triumf",
    name: "ТРИУМФ",
    html: triumfHtml,
    height: 4053,
    mobileHeight: 2145,
    price: 280000,
    mobileHtml: mobileFigmaFrame({
      src: "/blk/responsive/mobile/tarif-triumf.webp",
      height: 2145,
      alt: "Тариф Триумф: маркетинг-команда под ключ",
      eager: true,
      hotspots: [
        { x: 198, y: 748, width: 157, height: 58, label: "Купить тариф" },
        { x: 20, y: 2050, width: 335, height: 56, label: "Получить консультацию" },
      ],
      covers: [
        { x: 12, y: 190, width: 351, height: 210, color: "#1C1C1C" },
        { x: 12, y: 450, width: 351, height: 280, color: "#1C1C1C" },
      ],
      textPatches: [
        { x: 20, y: 216, width: 335, height: 56, text: "ТРИУМФ", color: "#FFFFFF", fontFamily: "Coolvetica,sans-serif", fontSize: 52, lineHeight: 1, textTransform: "uppercase" },
        { x: 20, y: 286, width: 38, height: 52, text: "/", color: "#F55D1C", fontFamily: "Coolvetica,sans-serif", fontSize: 50, lineHeight: 1 },
        { x: 68, y: 290, width: 284, height: 52, text: "от 280 000₽", color: "#9A9895", fontFamily: "Coolvetica,sans-serif", fontSize: 45, lineHeight: 1 },
        { x: 18, y: 463, width: 340, height: 30, text: "ЧТО ВХОДИТ В ТАРИФ:", color: "#9A9895", fontFamily: "Coolvetica,sans-serif", fontSize: 22, lineHeight: 1, textTransform: "uppercase" },
        { x: 18, y: 508, width: 340, height: 210, text: ">  всё, что в тарифе «Прорыв»\n\n>  выездная съёмка фото и видео раз в месяц\n   (от 2 часов съёмки)\n\n>  перформанс-маркетинг, контекстная реклама\n   (бюджет отдельно)\n\n>  инфлюенс-маркетинг: от 3 коллабораций в месяц\n   (оплата блогеров отдельно)\n\n>  расширенное сопровождение в приоритете", color: "#FFFFFF", fontSize: 10.5, lineHeight: 1.03 },
      ],
    }),
    metaTitle: "Тариф «Триумф» — маркетинг-команда под ключ от 280 000 ₽",
    metaDescription:
      "Маркетинг-команда под ключ: ведение, ежемесячная фото- и видеосъёмка, performance- и influence-маркетинг, приоритетное сопровождение. От 280 000 ₽.",
  },
];

export const getTarif = (slug: string) => TARIFY.find((t) => t.slug === slug);
