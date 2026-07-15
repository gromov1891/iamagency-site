"use client";

import { useEffect } from "react";

/* Делает легал-ссылки футера кликабельными и добавляет «Карта сайта».
   Политика и согласие ведут на отдельные юридические документы.
   Новая строка «Карта сайта» (клон «Согласия», ниже) → /sitemap. */
export default function FooterLinks() {
  useEffect(() => {
    const run = () => {
      const footerRoots = ([...document.querySelectorAll("div")] as HTMLElement[]).filter(
        (root) =>
          root.querySelector(':scope > div[layer-name="> компания"]') &&
          root.querySelector(':scope > div[layer-name="> Контакты"]')
      );

      const wrap = (el: HTMLElement | null, href: string) => {
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

      const navigation: Record<string, string> = {
        "Услуги": "/#uslugi",
        "Портфолио": "/keisy",
        "Маркетинг": "/marketing",
        "Блог": "/blog",
        "Школа СММ": "/shkola-smm",
        "Брендбук и SMM-стратегия": "/uslugi/brendbuk-i-smm-strategiya",
        "Ведение соцсетей": "/uslugi/vedenie-sotssetey",
        "Маркетинг и продвижение": "/uslugi/marketing-i-prodvizhenie",
        "Создание сайтов": "/marketing/razrabotka-saytov",
        "Контент / Съёмки": "/uslugi/kontent-syomki",
      };

      for (const root of footerRoots) {
        const byName = (name: string) =>
          root.querySelector<HTMLElement>(`div[layer-name="${name}"]`);

        for (const [name, href] of Object.entries(navigation)) wrap(byName(name), href);

        const pol = byName("Политика конфиденциальности");
        const sog = root.querySelector<HTMLElement>('div[layer-name^="Согласие на обработку"]');

        if (sog && !root.querySelector("[data-sitemap-link]")) {
          const clone = sog.cloneNode(true) as HTMLElement;
          clone.setAttribute("data-sitemap-link", "1");
          clone.removeAttribute("data-flink");
          const span = (clone.querySelector("span") as HTMLElement) || clone;
          span.textContent = "Карта сайта";
          clone.style.top = parseFloat(sog.style.top || "0") + 70 + "px";
          clone.style.height = "auto";
          sog.parentElement?.appendChild(clone);
          wrap(clone, "/sitemap");
        }

        wrap(pol, "/privacy-policy");
        wrap(sog, "/privacy-consent");
      }
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
