"use client";

import { CSSProperties, useEffect, useRef, useState } from "react";
import ResponsiveBlock from "./ResponsiveBlock";

const SERVICES = [
  {
    number: "01",
    title: "Брендбук и SMM-стратегия",
    text: "Фундамент коммуникации бренда: позиционирование, тон общения, визуальная система и правила контента. На выходе вы получаете понятную систему, по которой команда сможет вести соцсети без хаоса.",
    href: "/uslugi/brendbuk-i-smm-strategiya",
  },
  {
    number: "02",
    title: "Ведение соцсетей",
    text: "Ведём соцсети под ключ: стратегия, контент, оформление и регулярные публикации. Работу адаптируем под конкретную площадку, аудиторию и задачи бизнеса.",
    href: "/uslugi/vedenie-sotssetey",
  },
  {
    number: "03",
    title: "Маркетинг и продвижение",
    text: "Привлекаем новую аудиторию и заявки через рекламу, посевы, спецпроекты и другие каналы продвижения. Подбираем инструменты под цели и бюджет проекта.",
    href: "/uslugi/marketing-i-prodvizhenie",
  },
  {
    number: "04",
    title: "Создание сайтов",
    text: "Разрабатываем корпоративные сайты, лендинги и интернет-магазины: от структуры и прототипа до дизайна, вёрстки и запуска.",
    href: "/marketing",
  },
  {
    number: "05",
    title: "Контент / Съёмки",
    text: "Создаём фото и видео для соцсетей, брендов и мероприятий: съёмка, монтаж и готовые материалы для регулярного контента.",
    href: "/uslugi/kontent-syomki",
  },
];

type Props = {
  desktopHtml: string;
  desktopH: number;
  tabletHtml: string;
  tabletH: number;
  mobileHtml: string;
  mobileH: number;
};

function ServiceList({
  variant,
  open,
  setOpen,
}: {
  variant: "desktop" | "tablet" | "mobile";
  open: number | null;
  setOpen: (value: number | null) => void;
}) {
  return (
    <div className={`services-live-list services-live-list-${variant}`}>
      {SERVICES.map((service, index) => {
        const expanded = open === index;
        const panelId = `service-${variant}-${index}`;
        return (
          <div className={`services-live-row${expanded ? " is-open" : ""}`} key={service.number}>
            <button
              type="button"
              className="services-live-toggle"
              aria-expanded={expanded}
              aria-controls={panelId}
              onClick={() => setOpen(expanded ? null : index)}
            >
              <span className="services-live-number">{service.number}</span>
              <span className="services-live-title">{service.title}</span>
              <span className="services-live-icon" aria-hidden="true">{expanded ? "−" : "+"}</span>
            </button>
            <div className="services-live-panel" id={panelId} aria-hidden={!expanded}>
              <div>
                <p>{service.text}</p>
                <a href={service.href}>Подробнее →</a>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function ServicesAccordion(props: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const canvas = [...root.querySelectorAll<HTMLElement>('.rb-mobile div[style*="width:375px"]')].find(
      (el) => Boolean(el.style.backgroundColor)
    );
    if (!canvas) return;

    const cta = canvas.querySelector<HTMLElement>('a[href="/#kontakty"]');
    if (cta) cta.style.top = open === null ? "380px" : "480px";
    const directChildren = [...canvas.children].filter((el): el is HTMLElement => el instanceof HTMLElement);
    const helper = directChildren.find((el) => el.style.top === "346px" || el.dataset.baseTop === "346");
    const footnote = directChildren.find((el) => el.style.top === "470px" || el.dataset.baseTop === "470");
    if (helper) {
      helper.dataset.baseTop = "346";
      helper.style.top = open === null ? "346px" : "446px";
    }
    if (footnote) {
      footnote.dataset.baseTop = "470";
      footnote.style.top = open === null ? "470px" : "570px";
    }
  }, [open]);

  return (
    <div
      ref={rootRef}
      className="services-accordion-root"
      style={{ "--services-mobile-extra": open === null ? "0px" : "100px" } as CSSProperties}
    >
      <ResponsiveBlock {...props} />
      <div className="rb-desktop rb-has-tablet services-live-overlay"><ServiceList variant="desktop" open={open} setOpen={setOpen} /></div>
      <div className="rb-tablet rb-has-mobile services-live-overlay"><ServiceList variant="tablet" open={open} setOpen={setOpen} /></div>
      <div className="rb-mobile services-live-overlay"><ServiceList variant="mobile" open={open} setOpen={setOpen} /></div>
    </div>
  );
}
