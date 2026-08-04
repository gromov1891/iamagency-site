"use client";

import { useEffect } from "react";
import { DIRECTIONS } from "../marketing/directions";
import { EN_MARKETING } from "@/lib/i18n/en-content";
import { translateGeneratedHtml } from "@/lib/i18n/translate-generated-html";

/* Делает карточки направлений на /marketing кликабельными: заголовок и «+»
   ведут на лендинг /marketing/<slug>. Линкуем ТОЛЬКО готовые (status: "ready"),
   чтобы незаполненные не вели на 404. По мере генерации агентом новых лендингов
   они автоматически становятся кликабельными. */
/* нормализация: регистр, пробелы, дефис/тире и кирилл/лат-омоглифы —
   чтобы «СРА»=«CPA», «ІТ»=«IT», «ORM — …»=«ORM - …» совпадали. */
const FOLD: Record<string, string> = {
  с: "c", р: "p", а: "a", е: "e", о: "o", і: "i", у: "y", х: "x",
  к: "k", м: "m", т: "t", н: "n", в: "v", "—": "-", "–": "-",
};
const norm = (s: string) =>
  [...s.toLowerCase()].map((ch) => FOLD[ch] || ch).join("").replace(/\s+/g, " ").trim();

export default function DirectionLinks({ locale = "ru" }: { locale?: "ru" | "en" }) {
  useEffect(() => {
    const ready = DIRECTIONS.filter((d) => d.status === "ready");
    if (!ready.length) return;

    const wrap = (el: HTMLElement | undefined, href: string) => {
      if (!el || el.dataset.dlink) return;
      el.dataset.dlink = "1";
      el.style.cursor = "pointer";
      const a = document.createElement("a");
      a.href = href;
      a.style.textDecoration = "none";
      a.style.color = "inherit";
      el.parentElement?.insertBefore(a, el);
      a.appendChild(el);
    };

    const run = () => {
      const divs = [...document.querySelectorAll("div")] as HTMLElement[];
      ready.forEach((d, index) => {
        const english = EN_MARKETING[index];
        const href = locale === "en" && english ? `/en/marketing/${english.slug}` : `/marketing/${d.slug}`;
        // заголовок карточки: div, чей нормализованный текст = названию направления
        const translatedDirectionName = locale === "en"
          ? translateGeneratedHtml(`>${d.name}<`).slice(1, -1)
          : d.name;
        const dn = norm(translatedDirectionName);
        const title = divs.find(
          (el) => !el.dataset.dlink && norm((el.textContent || "").trim()) === dn
        );
        if (!title) return;
        const tr = title.getBoundingClientRect();
        const canvas = title.parentElement; // холст (захватываем ДО оборачивания)
        const tl = parseFloat(title.style.left || "0");
        const tt = parseFloat(title.style.top || "0");
        wrap(title, href);
        // «+» на той же строке справа от заголовка → тоже кликабельный
        const plus = divs.find((el) => {
          if ((el.textContent || "").trim() !== "+" || el.dataset.dlink) return false;
          const r = el.getBoundingClientRect();
          return Math.abs(r.top - tr.top) < 60 && r.left > tr.left && r.left - tr.left < 420;
        });
        wrap(plus, href);

        // ВСЯ карточка кликабельна: оверлей по координатам заголовка
        // (карточка ~324×81, заголовок смещён внутрь на ~19px)
        if (tl && tt && canvas) {
          const a = document.createElement("a");
          a.href = href;
          a.setAttribute("aria-label", d.name);
          a.style.cssText =
            "position:absolute;cursor:pointer;z-index:60;border-radius:39px;left:" +
            (tl - 19) + "px;top:" + (tt - 19) + "px;width:324px;height:81px";
          canvas.appendChild(a);
        }
      });
    };

    const t1 = setTimeout(run, 300);
    const t2 = setTimeout(run, 1100);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [locale]);
  return null;
}
