import { brendbukHtml } from "./gen/brendbukHtml";
import { vedenieHtml } from "./gen/vedenieHtml";
import { marketingProdvizhenieHtml } from "./gen/marketingProdvizhenieHtml";
import { kontentSyomkiHtml } from "./gen/kontentSyomkiHtml";
import { mobileFigmaFrame } from "../blocks/gen/mobileFigmaFrame";

/* Реестр страниц услуг /uslugi/<slug>. Каждая страница — 1:1 холст из Figma
   (фреймы «Услуги 1..4»), рендерится через BuilderBlock. */

export type Usluga = {
  slug: string;
  name: string; // как на карточке блока УСЛУГИ на главной
  html: string; // готовый холст 1440×height
  height: number; // высота фрейма в Figma
  mobileHtml: string;
  mobileHeight: number;
  metaTitle: string;
  metaDescription: string;
};

export const USLUGI: Usluga[] = [
  {
    slug: "brendbuk-i-smm-strategiya",
    name: "Брендбук и SMM-стратегия",
    html: brendbukHtml,
    height: 7944,
    mobileHeight: 3126,
    mobileHtml: mobileFigmaFrame({
      src: "/blk/responsive/mobile/service-brendbuk.webp",
      height: 3126,
      alt: "Разработка SMM-стратегии, айдентики и брендбука",
      eager: true,
      hotspots: [
        { x: 73, y: 818, width: 132, height: 42, label: "Заказать услугу" },
        { x: 76, y: 1814, width: 132, height: 42, label: "Заказать услугу" },
        { x: 73, y: 2371, width: 132, height: 42, label: "Заказать услугу" },
        { x: 73, y: 3021, width: 132, height: 42, label: "Заказать услугу" },
      ],
    }),
    metaTitle: "Брендбук и SMM-стратегия — разработка под ключ",
    metaDescription:
      "SMM-стратегия развития, концептуальная стратегия бренда, айдентика и брендбук под ключ. Анализ ниши и конкурентов, позиционирование, контент-план. От 150 000 ₽.",
  },
  {
    slug: "vedenie-sotssetey",
    name: "Ведение соцсетей",
    html: vedenieHtml,
    height: 5425,
    mobileHeight: 2037,
    mobileHtml: mobileFigmaFrame({
      src: "/blk/responsive/mobile/service-vedenie.webp",
      height: 2037,
      alt: "Ведение Instagram, Telegram и ВКонтакте для бизнеса",
      eager: true,
      hotspots: [
        { x: 220, y: 543, width: 135, height: 43, label: "Смотреть тарифы", href: "/#tarify" },
        { x: 217, y: 1108, width: 138, height: 43, label: "Смотреть тарифы", href: "/#tarify" },
        { x: 217, y: 1704, width: 138, height: 43, label: "Смотреть тарифы", href: "/#tarify" },
        { x: 245, y: 1944, width: 120, height: 56, label: "Получить консультацию" },
      ],
    }),
    metaTitle: "Ведение соцсетей под ключ для бизнеса | I AM AGENCY",
    metaDescription:
      "Ведение соцсетей под ключ: стратегия, контент-план, посты, Reels, сторис, оформление и отчётность. Instagram, Telegram, ВКонтакте и другие площадки.",
  },
  {
    slug: "marketing-i-prodvizhenie",
    name: "Маркетинг и продвижение",
    html: marketingProdvizhenieHtml,
    height: 5528,
    mobileHeight: 2022,
    mobileHtml: mobileFigmaFrame({
      src: "/blk/responsive/mobile/service-marketing.webp",
      height: 2022,
      alt: "Маркетинг и продвижение: инфлюенс, посевы и performance-реклама",
      eager: true,
      hotspots: [
        { x: 220, y: 561, width: 135, height: 43, label: "Смотреть тарифы", href: "/#tarify" },
        { x: 198, y: 1059, width: 157, height: 44, label: "Получить консультацию" },
        { x: 216, y: 1618, width: 139, height: 43, label: "Смотреть тарифы", href: "/#tarify" },
        { x: 216, y: 1928, width: 139, height: 44, label: "Подробнее", href: "/marketing" },
      ],
    }),
    metaTitle: "Маркетинг и продвижение в соцсетях — рост охватов и аудитории",
    metaDescription:
      "Продвижение соцсетей под заявки и продажи: рост охватов, работа с аудиторией, блогеры, UGC-креаторы, контекстная и таргетированная реклама.",
  },
  {
    slug: "kontent-syomki",
    name: "Контент / Съёмки",
    html: kontentSyomkiHtml,
    height: 2807,
    mobileHeight: 1096,
    mobileHtml: mobileFigmaFrame({
      src: "/blk/responsive/mobile/service-kontent.webp",
      height: 1096,
      alt: "Мобильный контент и профессиональные съёмки для соцсетей",
      eager: true,
      hotspots: [
        { x: 92, y: 491, width: 132, height: 42, label: "Заказать услугу" },
        { x: 228, y: 491, width: 127, height: 42, label: "Смотреть тарифы", href: "/#tarify" },
        { x: 231, y: 996, width: 124, height: 43, label: "Обсудить проект" },
      ],
    }),
    metaTitle: "Контент и съёмки — мобильный контент и съёмка под ключ",
    metaDescription:
      "Мобильный контент и имиджевая съёмка под ключ: концепция, ТЗ, команда, съёмочный день, монтаж и обработка фото и видео для соцсетей.",
  },
];

export const getUsluga = (slug: string) => USLUGI.find((u) => u.slug === slug);
