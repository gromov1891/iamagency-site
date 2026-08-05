"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useRouter } from "next/navigation";

const CTA_LINKS: Record<string, string> = {
  "start a project": "/en#kontakty",
  "book a free consultation": "/en#kontakty",
  "get a free consultation": "/en#kontakty",
  "book a consultation": "/en#kontakty",
  "apply for the course": "/en/smm-school",
  "learn more": "/en/marketing",
  "view project": "/en/cases",
};

function setFontSize(element: HTMLElement, size: number) {
  element.style.fontSize = `${size}px`;
  element.querySelectorAll<HTMLElement>("span").forEach((span) => {
    span.style.fontSize = `${size}px`;
  });
}

function fitEnglishText(root: HTMLElement) {
  root.querySelectorAll<HTMLElement>("span, div").forEach((element) => {
    const text = (element.textContent || "").replace(/\s+/g, " ").trim();
    if (!text || element.children.length > 0) return;
    const inlineSize = Number.parseFloat(element.style.fontSize || "0");
    const upper = text.toUpperCase();

    if (["MOMENTUM", "BREAKTHROUGH", "TRIUMPH"].includes(upper)) {
      const desktopSizes: Record<string, number> = { MOMENTUM: 46, BREAKTHROUGH: 37, TRIUMPH: 48 };
      const tabletSizes: Record<string, number> = { MOMENTUM: 27, BREAKTHROUGH: 22, TRIUMPH: 28 };
      const mobileSizes: Record<string, number> = { MOMENTUM: 21, BREAKTHROUGH: 17, TRIUMPH: 21 };
      const size = inlineSize >= 50 ? desktopSizes[upper] : inlineSize >= 30 ? tabletSizes[upper] : mobileSizes[upper];
      setFontSize(element, size);
      if (element.parentElement && element.parentElement.textContent?.trim() === text) {
        setFontSize(element.parentElement, size);
      }
    }

    if (upper === "7 YEARS") {
      const size = inlineSize >= 150 ? 164 : inlineSize >= 55 ? 52 : inlineSize;
      if (size) {
        setFontSize(element, size);
        if (element.parentElement && element.parentElement.textContent?.trim() === text) {
          setFontSize(element.parentElement, size);
        }
      }
    }

    if (text.startsWith("We will explain what your business actually needs")) {
      const size = inlineSize >= 20 ? 17 : inlineSize >= 10 ? 10.5 : Math.min(inlineSize || 6.4, 6.4);
      setFontSize(element, size);
      element.style.lineHeight = "94%";
    }

    if (text.startsWith("From analysis to measurable results:")) {
      const size = inlineSize >= 20 ? 19 : inlineSize >= 10 ? 10.5 : Math.min(inlineSize || 6.5, 6.5);
      setFontSize(element, size);
      element.style.lineHeight = "98%";
    }

    if (text.startsWith("Learn the profession from scratch")) {
      const size = inlineSize >= 45 ? 42 : inlineSize >= 25 ? 24 : Math.min(inlineSize || 18, 18);
      setFontSize(element, size);
      element.style.lineHeight = "100%";
      if (element.parentElement && element.parentElement.textContent?.trim() === text) {
        setFontSize(element.parentElement, size);
      }
    }
  });
}

function findButtonHost(element: HTMLElement, root: HTMLElement) {
  let current: HTMLElement | null = element;
  while (current && current !== root) {
    if (current.tagName === "A" || current.tagName === "BUTTON") return current;
    const style = current.style;
    if (style.display === "flex" && (style.borderRadius || style.background || style.backgroundColor)) return current;
    current = current.parentElement;
  }
  return element;
}

function resolveCtaHref(element: HTMLElement, label: string) {
  if (label !== "view project") return CTA_LINKS[label];
  const projectRoutes: Array<[string, string]> = [
    ["maxim", "/en/cases/real-estate"],
    ["yulia", "/en/cases/events"],
    ["travel times", "/en/cases/travel-hospitality"],
    ["connected show", "/en/cases/events"],
    ["altay village", "/en/cases/travel-hospitality"],
  ];
  let current: HTMLElement | null = element.parentElement;
  for (let depth = 0; current && depth < 4; depth += 1, current = current.parentElement) {
    const cardText = (current.textContent || "").replace(/\s+/g, " ").toLowerCase();
    const match = projectRoutes.find(([name]) => cardText.includes(name));
    if (match) return match[1];
  }
  return CTA_LINKS[label];
}

export default function EnglishFigmaEnhancer({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    fitEnglishText(root);

    const cleanups: Array<() => void> = [];
    root.querySelectorAll<HTMLElement>("span, div").forEach((element) => {
      if (element.closest("[data-en-cta-ignore]")) return;
      if (element.children.length > 0) return;
      const label = (element.textContent || "").replace(/\s+/g, " ").trim().toLowerCase();
      const href = resolveCtaHref(element, label);
      if (!href) return;
      const host = findButtonHost(element, root);
      host.style.zIndex = "90";
      host.style.pointerEvents = "auto";
      host.style.cursor = "pointer";
      if (host.tagName === "A") return;
      if (host.dataset.enCtaReady === "1") return;
      host.dataset.enCtaReady = "1";
      host.setAttribute("role", "link");
      host.setAttribute("tabindex", "0");
      host.setAttribute("aria-label", element.textContent?.trim() || label);
      const activate = () => {
        if (href === "/en#kontakty" && window.location.pathname === "/en") {
          document.getElementById("kontakty")?.scrollIntoView({ behavior: "smooth", block: "start" });
          return;
        }
        router.push(href);
      };
      const onClick = () => activate();
      const onKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          activate();
        }
      };
      host.addEventListener("click", onClick);
      host.addEventListener("keydown", onKeyDown);
      cleanups.push(() => {
        host.removeEventListener("click", onClick);
        host.removeEventListener("keydown", onKeyDown);
      });
    });

    return () => cleanups.forEach((cleanup) => cleanup());
  }, [router]);

  return <div ref={rootRef}>{children}</div>;
}
