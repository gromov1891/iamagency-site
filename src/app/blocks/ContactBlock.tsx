"use client";

import { useEffect, useRef } from "react";
import BuilderBlock from "./BuilderBlock";
import { trackAnalyticsGoal } from "@/lib/analytics";
import { getLeadAttribution } from "@/lib/lead-attribution";

/* Блок «Свяжитесь с нами» (переработан по Figma to Code).
   Статичный HTML рисует заголовок, фигуру, подписи полей, линии, кнопки и модалку (#kf-modal, скрыта).
   Здесь кладём настоящие input'ы на линии полей и отправляем данные через единый API заявок. */
const FIELDS = [
  { name: "Имя", line: 389, ph: "Ваше имя" },
  { name: "Телефон", line: 514, ph: "+7 ___ ___ __ __" },
  { name: "Сайт", line: 639, ph: "Сайт / соцсети проекта" },
  { name: "Бюджет", line: 764, ph: "Бюджет" },
];

const TABLET_FIELDS = [
  { name: "Имя", line: 337.08, ph: "Ваше имя" },
  { name: "Телефон", line: 403.84, ph: "+7 ___ ___ __ __" },
  { name: "Сайт", line: 470.61, ph: "Сайт / соцсети проекта" },
  { name: "Бюджет", line: 537.38, ph: "Бюджет" },
];

const MOBILE_FIELDS = [
  { name: "Имя", line: 380.84, ph: "Ваше имя" },
  { name: "Телефон", line: 455.62, ph: "+7 ___ ___ __ __" },
  { name: "Сайт", line: 530.4, ph: "Сайт / соцсети проекта" },
  { name: "Бюджет", line: 605.17, ph: "Бюджет" },
];

export default function ContactBlock({
  html,
  h,
  tabletHtml,
  tabletH,
  mobileHtml,
  mobileH,
}: {
  html: string;
  h?: number;
  tabletHtml?: string;
  tabletH?: number;
  mobileHtml?: string;
  mobileH?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const t = setTimeout(() => {
      root.querySelectorAll<HTMLElement>('[id="kf-submit"]').forEach((submit) => {
        const canvas = submit.parentElement as HTMLElement | null;
        if (!canvas || canvas.dataset.kfReady === "1") return;
        const modal = canvas.querySelector('[id="kf-modal"]') as HTMLElement | null;
        const close = canvas.querySelector('[id="kf-close"]') as HTMLElement | null;
        if (!modal || !close) return;
        canvas.dataset.kfReady = "1";

        const variant = canvas.getAttribute("data-contact-variant");
        const isTablet = variant === "tablet";
        const isMobile = variant === "mobile";
        const fields = isMobile ? MOBILE_FIELDS : isTablet ? TABLET_FIELDS : FIELDS;
        const left = isMobile ? 20 : isTablet ? 429 : 815;
        const topOffset = isMobile ? 23 : isTablet ? 33 : 44;
        const width = isMobile ? 335 : isTablet ? 299 : 560;
        const height = isMobile ? 20 : isTablet ? 22 : 44;
        const fontSize = isMobile ? 13 : isTablet ? 13.45 : 26.9;

        const inputs: HTMLInputElement[] = [];
        for (const [fieldIndex, f] of fields.entries()) {
          const inp = document.createElement("input");
          inp.type = fieldIndex === 1 ? "tel" : "text";
          inp.name = ["name", "phone", "project", "budget"][fieldIndex];
          if (fieldIndex < 2) inp.required = true;
          inp.placeholder = f.ph;
          inp.setAttribute("aria-label", f.name);
          if (isMobile) {
            const mobileLabels = ["Имя", "Телефон", "Сайт", "Бюджет"];
            const mobilePlaceholders = ["Ваше имя", "+7 ___ ___ __ __", "Сайт / соцсети проекта", "Бюджет"];
            const idx = inputs.length;
            inp.placeholder = mobilePlaceholders[idx] ?? f.ph;
            inp.setAttribute("aria-label", mobileLabels[idx] ?? f.name);
          }
          inp.style.cssText = [
            "position:absolute",
            `left:${left}px`,
            `top:${f.line - topOffset}px`,
            `width:${width}px`,
            `height:${height}px`,
            "background:transparent",
            "border:none",
            "outline:none",
            "font-family:Inter,sans-serif",
            `font-size:${fontSize}px`,
            "color:#1C1C1C",
            "padding:0",
          ].join(";");
          canvas.appendChild(inp);
          inputs.push(inp);
        }

        const consent = document.createElement("label");
        const consentTop = isMobile ? 612 : isTablet ? 542 : 780;
        const consentFont = isMobile ? 8.5 : isTablet ? 9.5 : 13;
        consent.style.cssText = [
          "position:absolute",
          `left:${left}px`,
          `top:${consentTop}px`,
          `width:${width}px`,
          "display:flex",
          "align-items:center",
          "gap:8px",
          "font-family:Inter,sans-serif",
          `font-size:${consentFont}px`,
          "line-height:1.2",
          "color:#5b5b5b",
          "cursor:pointer",
        ].join(";");
        consent.innerHTML = `<input type="checkbox" required aria-label="Согласие на обработку персональных данных" style="width:14px;height:14px;margin:0;accent-color:#8992E4"><span>Я согласен с <a href="/privacy-consent" target="_blank" style="color:inherit;text-underline-offset:2px">обработкой персональных данных</a></span>`;
        canvas.appendChild(consent);
        const consentInput = consent.querySelector("input") as HTMLInputElement;

        const status = document.createElement("div");
        status.setAttribute("role", "status");
        status.setAttribute("aria-live", "polite");
        status.style.cssText = [
          "position:absolute",
          `left:${left}px`,
          `top:${Math.max(0, submit.offsetTop - (isMobile ? 19 : 30))}px`,
          `width:${width}px`,
          "font-family:Inter,sans-serif",
          `font-size:${isMobile ? 8.5 : isTablet ? 10 : 13}px`,
          "line-height:1.2",
          "color:#B52A18",
          "display:none",
        ].join(";");
        canvas.appendChild(status);

        const showForm = () => {
          modal.style.display = "none";
          inputs.forEach((i) => (i.style.display = ""));
          consent.style.display = "flex";
          submit.style.display = "flex";
          submit.style.pointerEvents = "";
          submit.style.opacity = "";
          status.style.display = "none";
        };
        const showThanks = () => {
          inputs.forEach((i) => (i.style.display = "none"));
          consent.style.display = "none";
          submit.style.display = "none";
          modal.style.display = "";
        };
        showForm();

        submit.addEventListener("click", async () => {
          if (submit.dataset.sending === "1") return;
          const name = inputs[0].value.trim();
          const phone = inputs[1].value.trim();
          if (!name || !phone) {
            const bad = !name ? 0 : 1;
            inputs[bad].focus();
            return;
          }
          if (!consentInput.checked) {
            consentInput.focus();
            return;
          }
          submit.dataset.sending = "1";
          submit.style.pointerEvents = "none";
          submit.style.opacity = "0.6";
          status.style.display = "none";
          try {
            const response = await fetch("/api/leads", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                kind: "business",
                source: `Главная · форма контактов · ${variant || "desktop"}`,
                page: `${window.location.pathname}${window.location.search}`,
                name,
                phone,
                project: inputs[2].value.trim(),
                budget: inputs[3].value.trim(),
                attribution: getLeadAttribution(),
              }),
            });
            const result = await response.json().catch(() => ({}));
            if (!response.ok) throw new Error(result.error || "Не удалось отправить заявку");
            trackAnalyticsGoal("lead_sent", { kind: "business", source: `contact_${variant || "desktop"}` });
            showThanks();
          } catch (submitError) {
            status.textContent = submitError instanceof Error ? submitError.message : "Не удалось отправить заявку";
            status.style.display = "block";
            submit.style.pointerEvents = "";
            submit.style.opacity = "";
          } finally {
            delete submit.dataset.sending;
          }
        });
        close.addEventListener("click", () => {
          inputs.forEach((i) => (i.value = ""));
          consentInput.checked = false;
          showForm();
        });
      });
    }, 140);

    return () => clearTimeout(t);
  }, []);

  return (
    /* z-30 + relative — голубая фигура вылезает вниз и лежит ПОВЕРХ чёрного футера */
    <div ref={ref} className="relative" style={{ zIndex: 30 }}>
      {tabletHtml ? (
        <>
          <div className="rb-desktop">
            <BuilderBlock html={html} h={h} overflow="visible" />
          </div>
          <div className={mobileHtml ? "rb-tablet rb-has-mobile" : "rb-tablet"}>
            <BuilderBlock html={tabletHtml} w={768} h={tabletH} overflow="visible" />
          </div>
          {mobileHtml ? (
            <div className="rb-mobile">
              <BuilderBlock html={mobileHtml} w={375} h={mobileH} overflow="visible" />
            </div>
          ) : null}
        </>
      ) : (
        <BuilderBlock html={html} h={h} overflow="visible" />
      )}
    </div>
  );
}
