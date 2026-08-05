"use client";

import { useEffect, useRef } from "react";
import BuilderBlock from "./BuilderBlock";

/* Интерактив золотой горы (Кейсы).
   Метки = элементы layer-name "1".."5". При наведении на метку:
   - сама метка увеличивается и светится;
   - альпинист 🧗 переезжает к этой метке;
   - рядом всплывает карточка кейса с текстом (данные из Figma).
   Координаты меток/альпиниста — из макета (холст 1440×1024). */

// центры меток на холсте (из Figma 78:969: группа + ~23px)
const MARKERS = [
  { cx: 689, cy: 698 },
  { cx: 799, cy: 586 },
  { cx: 864, cy: 498 },
  { cx: 962, cy: 335 },
  { cx: 1082, cy: 281 },
];

// карточки кейсов по меткам (тексты из Figma 78:1066-1086)
const CARDS = [
  { m: "+250% заявок", c: "Стоматология", d: "Яндекс Директ + SEO, 4 мес, бюджет — 180 тыс/мес" },
  { m: "х3 заказы", c: "Ресторан", d: "Telegram Ads + таргет VK, 3 мес" },
  { m: "CPL ↓ в 2 раза", c: "EDTECH-курсы", d: "Influence + контекст, 6 мес" },
  { m: "+180% выручки", c: "E-commerce", d: "Сквозная аналитика + ремаркетинг, 5 мес" },
  { m: "320 заявок/мес", c: "B2B SAAS", d: "Контекст + SEO + PR, 8 мес" },
];

const EN_CARDS = [
  { m: "+250% enquiries", c: "Dental clinic", d: "Paid search + SEO · four months" },
  { m: "3× orders", c: "Restaurant", d: "Telegram Ads + VK paid social · three months" },
  { m: "CPL cut in half", c: "EdTech courses", d: "Influencer marketing + paid search · six months" },
  { m: "+180% revenue", c: "Ecommerce", d: "Connected analytics + remarketing · five months" },
  { m: "320 enquiries/month", c: "B2B SaaS", d: "Paid search + SEO + PR · eight months" },
];

export default function HoverMarkers({
  html,
  h,
  labels,
  locale = "ru",
}: {
  html: string;
  h?: number;
  labels: string[];
  locale?: "ru" | "en";
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const t = setTimeout(() => {
      const digits = ([...root.querySelectorAll("[layer-name]")] as HTMLElement[]).filter(
        (e) => labels.includes(e.getAttribute("layer-name") || "")
      );
      if (!digits.length) return;

      // холст 1440×1024 (родитель меток в координатах макета)
      const canvas =
        (root.querySelector('[style*="width:1440px"]') as HTMLElement) ||
        (digits[0].offsetParent as HTMLElement);
      if (!canvas) return;

      // альпинист (теперь картинка из Figma)
      const climber =
        (canvas.querySelector('.climber, [layer-name="🧗🏻"]') as HTMLElement) ||
        ([...canvas.querySelectorAll("div")] as HTMLElement[]).find((e) =>
          (e.textContent || "").includes("🧗")
        ) ||
        null;
      const climberBase = climber ? { x: 640, y: 658 } : null; // центр бокса альпиниста
      if (climber) {
        climber.style.transition = "transform .45s cubic-bezier(.4,.8,.3,1)";
        climber.style.zIndex = "40";
        climber.style.willChange = "transform";
      }

      // всплывающая карточка кейса (одна, переиспользуется)
      const card = document.createElement("div");
      card.style.cssText =
        "position:absolute;width:228px;padding:14px 16px;background:#1C1C1C;border-radius:16px;" +
        "box-shadow:0 8px 24px rgba(0,0,0,.35);opacity:0;transform:translateY(8px);pointer-events:none;" +
        "transition:opacity .2s ease,transform .2s ease;z-index:60;font-family:Inter";
      card.innerHTML =
        '<div data-m style="color:#fff;font-family:Coolvetica;font-size:30px;line-height:1;text-transform:uppercase"></div>' +
        '<div data-c style="display:inline-block;margin-top:8px;padding:3px 9px;background:#F55D1C;border-radius:20px;color:#fff;font-size:12px;font-weight:600;letter-spacing:-0.03em"></div>' +
        '<div data-d style="margin-top:8px;color:#9A9895;font-size:12.5px;line-height:1.25;letter-spacing:-0.03em"></div>';
      canvas.appendChild(card);
      const mEl = card.querySelector("[data-m]") as HTMLElement;
      const cEl = card.querySelector("[data-c]") as HTMLElement;
      const dEl = card.querySelector("[data-d]") as HTMLElement;

      const targets = digits.map((d) => {
        const p = d.parentElement as HTMLElement;
        return p && p !== canvas ? p : d;
      });

      targets.forEach((el, i) => {
        const base = el.style.transform || "";
        el.style.transition =
          "transform .25s cubic-bezier(.34,1.56,.64,1), filter .25s ease";
        el.style.transformOrigin = "center";
        el.style.cursor = "pointer";

        el.addEventListener("mouseenter", () => {
          el.style.transform = (base ? base + " " : "") + "scale(1.4)";
          el.style.filter = "drop-shadow(0 0 10px rgba(255,184,0,.95)) brightness(1.08)";
          el.style.zIndex = "50";

          const mk = MARKERS[i];
          // альпинист едет к метке (чуть ниже кружка)
          if (climber && climberBase) {
            const dx = mk.cx - climberBase.x - 6;
            const dy = mk.cy - climberBase.y + 18;
            climber.style.transform = `translate(${dx}px, ${dy}px)`;
          }
          // карточка слева-сверху от метки, не вылезая за холст
          const cd = (locale === "en" ? EN_CARDS : CARDS)[i];
          mEl.textContent = cd.m;
          cEl.textContent = cd.c;
          dEl.textContent = cd.d;
          let left = mk.cx - 248;
          if (left < 70) left = mk.cx + 36;
          let top = mk.cy - 60;
          if (top < 200) top = 200;
          card.style.left = left + "px";
          card.style.top = top + "px";
          card.style.opacity = "1";
          card.style.transform = "translateY(0)";
        });

        el.addEventListener("mouseleave", () => {
          el.style.transform = base;
          el.style.filter = "";
          el.style.zIndex = "";
          if (climber) climber.style.transform = "";
          card.style.opacity = "0";
          card.style.transform = "translateY(8px)";
        });
      });
    }, 150);

    return () => clearTimeout(t);
  }, [labels, locale]);

  return (
    <div ref={ref}>
      <BuilderBlock html={html} h={h} />
    </div>
  );
}
