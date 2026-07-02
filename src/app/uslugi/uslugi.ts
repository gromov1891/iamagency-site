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
      "Ведение соцсетей под ключ: стратегия и контент-план под площадку, посты, Reels и сторис, оформление профиля, тексты, монтаж, работа с вовлечением и отчётность. Instagram, Telegram, ВКонтакте и другие площадки — ведение входит в тарифы.",
  },
  {
    slug: "marketing-i-prodvizhenie",
    name: "Маркетинг и продвижение",
    html: marketingProdvizhenieHtml,
    height: 5528,
    metaTitle: "Маркетинг и продвижение в соцсетях — рост охватов и аудитории",
    metaDescription:
      "Продвижение для роста охватов и работа с аудиторией, ручная рассылка по смежным нишам, инфлюенс-маркетинг и работа с UGC-креаторами, performance-маркетинг: контекстная и таргетированная реклама под заявки и продажи.",
  },
  {
    slug: "kontent-syomki",
    name: "Контент / Съёмки",
    html: kontentSyomkiHtml,
    height: 2807,
    metaTitle: "Контент и съёмки — мобильный контент и съёмка под ключ",
    metaDescription:
      "Съёмка мобильного контента на вашей локации и имиджевая съёмка под ключ: концепция и ТЗ, команда и оборудование, съёмочный день, монтаж и обработка. Фото и видео для соцсетей — от идеи до готовых роликов.",
  },
];

export const getUsluga = (slug: string) => USLUGI.find((u) => u.slug === slug);
