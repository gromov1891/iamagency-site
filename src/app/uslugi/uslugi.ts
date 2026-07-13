import { brendbukHtml } from "./gen/brendbukHtml";
import { vedenieHtml } from "./gen/vedenieHtml";
import { marketingProdvizhenieHtml } from "./gen/marketingProdvizhenieHtml";
import { kontentSyomkiHtml } from "./gen/kontentSyomkiHtml";

/* Реестр страниц услуг /uslugi/<slug>. Каждая страница — 1:1 холст из Figma
   (фреймы «Услуги 1..4»), рендерится через BuilderBlock. */

export type Usluga = {
  slug: string;
  name: string; // как на карточке блока УСЛУГИ на главной
  html: string; // готовый холст 1440×height
  height: number; // высота фрейма в Figma
  metaTitle: string;
  metaDescription: string;
};

export const USLUGI: Usluga[] = [
  {
    slug: "brendbuk-i-smm-strategiya",
    name: "Брендбук и SMM-стратегия",
    html: brendbukHtml,
    height: 7944,
    metaTitle: "Брендбук и SMM-стратегия — разработка под ключ",
    metaDescription:
      "SMM-стратегия развития, концептуальная стратегия бренда, айдентика и брендбук под ключ. Анализ ниши и конкурентов, позиционирование, контент-план. От 150 000 ₽.",
  },
  {
    slug: "vedenie-sotssetey",
    name: "Ведение соцсетей",
    html: vedenieHtml,
    height: 5425,
    metaTitle: "Ведение соцсетей под ключ — Instagram, Telegram, ВКонтакте",
    metaDescription:
      "Ведение соцсетей под ключ: стратегия, контент-план, посты, Reels, сторис, оформление и отчётность. Instagram, Telegram, ВКонтакте и другие площадки.",
  },
  {
    slug: "marketing-i-prodvizhenie",
    name: "Маркетинг и продвижение",
    html: marketingProdvizhenieHtml,
    height: 5528,
    metaTitle: "Маркетинг и продвижение в соцсетях — рост охватов и аудитории",
    metaDescription:
      "Продвижение соцсетей под заявки и продажи: рост охватов, работа с аудиторией, блогеры, UGC-креаторы, контекстная и таргетированная реклама.",
  },
  {
    slug: "kontent-syomki",
    name: "Контент / Съёмки",
    html: kontentSyomkiHtml,
    height: 2807,
    metaTitle: "Контент и съёмки — мобильный контент и съёмка под ключ",
    metaDescription:
      "Мобильный контент и имиджевая съёмка под ключ: концепция, ТЗ, команда, съёмочный день, монтаж и обработка фото и видео для соцсетей.",
  },
];

export const getUsluga = (slug: string) => USLUGI.find((u) => u.slug === slug);
