"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useRouter } from "next/navigation";

const CARD_LINKS = [
  ["96fe8ff810d3", "/blog/claude-dlya-biznesa-prostym-yazykom"],
  ["0b713db08b53", "/blog/chto-vliyaet-na-prodazhi-v-2026"],
  ["e7fa50c7bae4", "/blog/instagram-po-starim-pravilam"],
  ["f41a088987f8", "/blog/servisy-dlya-sozdaniya-vizuala"],
] as const;

const EN_CARD_LINKS = [
  ["96fe8ff810d3", "/en/blog/claude-for-business-explained"],
  ["0b713db08b53", "/en/blog/what-drives-sales-in-2026"],
  ["e7fa50c7bae4", "/en/blog/instagram-growth-rules-have-changed"],
  ["f41a088987f8", "/en/blog/tools-for-social-media-visuals"],
] as const;

const CATEGORY_LINKS = [
  ["смм", "SMM"],
  ["маркетинг", "Маркетинг"],
  ["продвижение", "Продвижение"],
  ["визуал", "Визуал"],
  ["социальные сети", "Социальные сети"],
  ["нейросети", "Нейросети"],
  ["тренды", "Тренды"],
] as const;

const EN_CATEGORY_LINKS = [
  ["smm", "SMM"],
  ["marketing", "Marketing"],
  ["growth", "Growth"],
  ["visuals", "Visuals"],
  ["social media", "Social media"],
  ["ai", "AI"],
  ["trends", "Trends"],
] as const;

export default function BlogCardsLinker({ children, locale = "ru" }: { children: ReactNode; locale?: "ru" | "en" }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const cleanups: Array<() => void> = [];

    const cardLinks = locale === "en" ? EN_CARD_LINKS : CARD_LINKS;
    for (const [imageKey, href] of cardLinks) {
      root.querySelectorAll<HTMLImageElement>(`img[src*="${imageKey}"]`).forEach((image) => {
        const card = image.parentElement;
        if (!card || card === root) return;

        // Keep the Figma card silhouette stable at every responsive scale.
        const radius = Math.max(9, card.getBoundingClientRect().width * 0.038);
        card.style.overflow = "hidden";
        card.style.borderRadius = `${radius}px`;
        card.style.background = "#fff";
        image.style.borderRadius = `${radius}px`;

        const activate = (event: Event) => {
          if (event instanceof MouseEvent && event.button !== 0) return;
          router.push(href);
        };
        const onKeyDown = (event: KeyboardEvent) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            activate(event);
          }
        };

        card.setAttribute("role", "link");
        card.setAttribute("tabindex", "0");
        card.setAttribute("aria-label", `${locale === "en" ? "Read article" : "Читать статью"}: ${image.alt}`);
        card.style.cursor = "pointer";
        card.addEventListener("click", activate);
        card.addEventListener("keydown", onKeyDown);
        cleanups.push(() => {
          card.removeEventListener("click", activate);
          card.removeEventListener("keydown", onKeyDown);
        });
      });
    }

    const categoryLinks = locale === "en" ? EN_CATEGORY_LINKS : CATEGORY_LINKS;
    for (const [label, tag] of categoryLinks) {
      root.querySelectorAll<HTMLElement>("[layer-name]").forEach((element) => {
        const text = (element.textContent || "").replace(/\s+/g, " ").trim().toLowerCase();
        if (text !== label || element.dataset.blogCategory) return;
        const chip = element.parentElement;
        if (!chip || chip === root) return;
        const href = `${locale === "en" ? "/en/blog" : "/blog"}?tag=${encodeURIComponent(tag)}`;
        const activate = () => router.push(href);
        const onKeyDown = (event: KeyboardEvent) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            activate();
          }
        };
        element.dataset.blogCategory = "1";
        chip.setAttribute("role", "link");
        chip.setAttribute("tabindex", "0");
        chip.setAttribute("aria-label", `${locale === "en" ? "Open articles" : "Открыть статьи"}: ${tag}`);
        chip.style.cursor = "pointer";
        chip.addEventListener("click", activate);
        chip.addEventListener("keydown", onKeyDown);
        cleanups.push(() => {
          chip.removeEventListener("click", activate);
          chip.removeEventListener("keydown", onKeyDown);
        });
      });
    }

    return () => cleanups.forEach((cleanup) => cleanup());
  }, [locale, router]);

  return <div ref={rootRef}>{children}</div>;
}
