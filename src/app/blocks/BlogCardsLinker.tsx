"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useRouter } from "next/navigation";

const CARD_LINKS = [
  ["96fe8ff810d3", "/blog/claude-dlya-biznesa-prostym-yazykom"],
  ["0b713db08b53", "/blog/chto-vliyaet-na-prodazhi-v-2026"],
  ["e7fa50c7bae4", "/blog/instagram-po-starim-pravilam"],
  ["f41a088987f8", "/blog/servisy-dlya-sozdaniya-vizuala"],
] as const;

export default function BlogCardsLinker({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const cleanups: Array<() => void> = [];

    for (const [imageKey, href] of CARD_LINKS) {
      root.querySelectorAll<HTMLImageElement>(`img[src*="${imageKey}"]`).forEach((image) => {
        const card = image.parentElement;
        if (!card || card === root) return;

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
        card.setAttribute("aria-label", `Читать статью: ${image.alt}`);
        card.style.cursor = "pointer";
        card.addEventListener("click", activate);
        card.addEventListener("keydown", onKeyDown);
        cleanups.push(() => {
          card.removeEventListener("click", activate);
          card.removeEventListener("keydown", onKeyDown);
        });
      });
    }

    return () => cleanups.forEach((cleanup) => cleanup());
  }, [router]);

  return <div ref={rootRef}>{children}</div>;
}
