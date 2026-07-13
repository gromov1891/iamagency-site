"use client";

import { useEffect } from "react";

/* Делает легал-ссылки футера кликабельными и добавляет «Карта сайта».
   Политика и согласие ведут на отдельные юридические документы.
   Новая строка «Карта сайта» (клон «Согласия», ниже) → /sitemap. */
export default function FooterLinks() {
  useEffect(() => {
    const run = () => {
      const all = [...document.querySelectorAll("div[layer-name]")] as HTMLElement[];
      const byName = (t: string) =>
        all.find((d) => (d.getAttribute("layer-name") || "").includes(t));

      const wrap = (el: HTMLElement | undefined, href: string) => {
        if (!el || el.dataset.flink) return;
        el.dataset.flink = "1";
        el.style.cursor = "pointer";
        const a = document.createElement("a");
        a.href = href;
        a.style.textDecoration = "none";
        a.style.color = "inherit";
        el.parentElement?.insertBefore(a, el);
        a.appendChild(el);
      };

      const pol = byName("Политика конфиденциальности");
      const sog = byName("Согласие на обработку");

      // 1) добавить «Карта сайта» (клон «Согласия», строкой ниже) — до оборачивания
      if (sog && !document.querySelector("[data-sitemap-link]")) {
        const clone = sog.cloneNode(true) as HTMLElement;
        clone.setAttribute("data-sitemap-link", "1");
        clone.removeAttribute("data-flink");
        const span = (clone.querySelector("span") as HTMLElement) || clone;
        span.textContent = "Карта сайта";
        clone.style.top = parseFloat(sog.style.top || "0") + 70 + "px";
        clone.style.height = "auto";
        sog.parentElement?.appendChild(clone);
        const a = document.createElement("a");
        a.href = "/sitemap";
        a.style.textDecoration = "none";
        a.style.color = "inherit";
        a.style.cursor = "pointer";
        clone.parentElement?.insertBefore(a, clone);
        a.appendChild(clone);
      }

      // 2) оборачиваем существующие легал-ссылки
      wrap(pol, "/privacy-policy");
      wrap(sog, "/privacy-consent");
    };

    const t1 = setTimeout(run, 280);
    const t2 = setTimeout(run, 1000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);
  return null;
}
