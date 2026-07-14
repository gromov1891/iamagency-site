import { mobileFigmaFrame } from "../blocks/gen/mobileFigmaFrame";

const consultationCover = [{ x: 218, y: 785, width: 145, height: 60 }];

export const MARKETING_MOBILE_FRAMES = [
  {
    height: 874,
    html: mobileFigmaFrame({
      src: "/blk/responsive/mobile/marketing-hero.webp",
      height: 874,
      alt: "Маркетинговое агентство: performance, media и digital-маркетинг",
      eager: true,
      covers: consultationCover,
      hotspots: [{ x: 145, y: 520, width: 120, height: 54, label: "Оставить заявку" }],
    }),
  },
  {
    height: 874,
    html: mobileFigmaFrame({
      src: "/blk/responsive/mobile/marketing-directions.webp",
      height: 874,
      alt: "Направления digital-маркетинга I AM AGENCY",
      covers: consultationCover,
      hotspots: [{ x: 20, y: 786, width: 190, height: 54, label: "Обсудить проект" }],
    }),
  },
  {
    height: 816,
    html: mobileFigmaFrame({
      src: "/blk/responsive/mobile/marketing-cases.webp",
      height: 816,
      alt: "Кейсы маркетингового продвижения и привлечения клиентов",
      covers: [{ x: 218, y: 510, width: 145, height: 60 }],
      hotspots: [{ x: 48, y: 270, width: 110, height: 52, label: "Оставить заявку" }],
    }),
  },
  {
    height: 874,
    html: mobileFigmaFrame({
      src: "/blk/responsive/mobile/marketing-process.webp",
      height: 874,
      alt: "Процесс работы маркетингового агентства",
      covers: consultationCover,
    }),
  },
  {
    height: 874,
    html: mobileFigmaFrame({
      src: "/blk/responsive/mobile/marketing-sites.webp",
      height: 874,
      alt: "Создание сайтов, лендингов и приложений для бизнеса",
      covers: consultationCover,
      hotspots: [{ x: 20, y: 786, width: 190, height: 54, label: "Обсудить проект" }],
    }),
  },
  {
    height: 874,
    html: mobileFigmaFrame({
      src: "/blk/responsive/mobile/marketing-qa.webp",
      height: 874,
      alt: "Ответы на вопросы о маркетинге, рекламе и SEO-продвижении",
      covers: consultationCover,
    }),
  },
  {
    height: 650,
    html: mobileFigmaFrame({
      src: "/blk/responsive/mobile/marketing-discount.webp",
      height: 650,
      alt: "Скидка на продвижение от I AM AGENCY",
      hotspots: [{ x: 202, y: 522, width: 153, height: 54, label: "Получить скидку" }],
    }),
  },
];
