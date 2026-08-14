"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/* Делает иконки соцсетей кликабельными во всех блоках (Hero/УТП/Контакты/Футер).
   Опознаём по layer-name (whatsapp/instagram/vk) или по началу SVG-пути.
   Hero/УТП/Контакты: Telegram, Дзен(пузырёк), Instagram, WhatsApp.
   Футер: +Pinterest(P), Max(звезда), YouTube, VK — всего 8. */
const URLS: Record<string, string> = {
  Telegram: "https://t.me/iam_smmagency",
  Instagram: "https://www.instagram.com/iamagency.smm",
  WhatsApp: "https://wa.me/79934376760",
  VK: "https://vk.ru/imagencysmm",
  Pinterest: "https://pin.it/3toibIyDY",
  Dzen: "https://dzen.ru/iamagency",
  Max: "https://max.ru/u/f9LHodD0cOKbELAJKi1eVN5Rai5cGNxNIP3VB781r1iMvNZdUyuic3sD9U8",
  YouTube: "https://www.youtube.com/@iamagency",
};

function detect(svg: SVGElement): string | null {
  const ln = (svg.getAttribute("layer-name") || "").toLowerCase();
  const d = svg.querySelector("path")?.getAttribute("d") || "";
  if (ln.includes("whatsapp") || d.startsWith("M13.4889")) return "WhatsApp";
  if (ln.includes("instagram") || d.startsWith("M7.25 0H17") || d.startsWith("M14.5244"))
    return "Instagram";
  if (ln.includes("vk") || d.startsWith("M24.4509")) return "VK";
  if (d.startsWith("M22.9686") || d.startsWith("M22.6484")) return "Telegram";
  if (d.startsWith("M9.21067")) return "Pinterest";
  if (d.startsWith("M10.5903") || d.startsWith("M10.4426")) return "Dzen";
  if (d.startsWith("M13.9177")) return "Max";
  if (d.startsWith("M11.5 0C")) return "YouTube";
  return null;
}

export default function SocialLinks() {
  const pathname = usePathname();

  useEffect(() => {
    const wire = () => {
      document.querySelectorAll("svg").forEach((svg) => {
        const name = detect(svg as unknown as SVGElement);
        if (!name) return;
        const box = svg.parentElement as HTMLElement | null;
        if (!box || box.dataset.social) return;
        box.dataset.social = name;
        box.style.cursor = "pointer";
        const a = document.createElement("a");
        a.href = URLS[name];
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        a.setAttribute("aria-label", name);
        box.parentElement?.insertBefore(a, box);
        a.appendChild(box);
      });
    };
    const t1 = setTimeout(wire, 200);
    const t2 = setTimeout(wire, 900);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [pathname]);
  return null;
}
