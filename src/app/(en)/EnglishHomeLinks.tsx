"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const normalizedText = (element: HTMLElement) =>
  (element.textContent || "").replace(/\s+/g, " ").trim().toUpperCase();

const isDrawnHomeBreadcrumb = (element: HTMLElement) => {
  const text = normalizedText(element);
  return element.children.length === 0 && /^HOME\s*(?:→|â†’)/.test(text);
};

export default function EnglishHomeLinks() {
  const router = useRouter();

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;

    const decorate = () => {
      document.querySelectorAll<HTMLAnchorElement>("a").forEach((anchor) => {
        if (normalizedText(anchor) !== "HOME") return;
        anchor.href = "/en";
        anchor.style.position = "relative";
        anchor.style.zIndex = "100";
        anchor.style.pointerEvents = "auto";
      });

      document.querySelectorAll<HTMLElement>("div,span,p").forEach((element) => {
        if (!isDrawnHomeBreadcrumb(element)) return;
        element.dataset.englishHomeLink = "true";
        element.setAttribute("role", "link");
        element.setAttribute("tabindex", "0");
        element.setAttribute("aria-label", "Home");
        element.style.cursor = "pointer";
      });
    };

    const queueDecorate = () => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(decorate, 50);
    };

    const activate = (target: EventTarget | null, event: Event) => {
      const element = target instanceof HTMLElement ? target : null;
      const trigger = element?.closest<HTMLElement>('[data-english-home-link="true"]');
      if (!trigger) return;
      event.preventDefault();
      router.push("/en");
    };

    const onClick = (event: MouseEvent) => activate(event.target, event);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter" || event.key === " ") activate(event.target, event);
    };

    decorate();
    const observer = new MutationObserver(queueDecorate);
    observer.observe(document.body, { childList: true, subtree: true });
    document.addEventListener("click", onClick, true);
    document.addEventListener("keydown", onKeyDown, true);

    return () => {
      if (timer) clearTimeout(timer);
      observer.disconnect();
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("keydown", onKeyDown, true);
    };
  }, [router]);

  return null;
}
