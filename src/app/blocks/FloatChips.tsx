"use client";

import { useEffect, useRef } from "react";
import BuilderBlock from "./BuilderBlock";

/* Плашки-ниши в блоке кейсов.
   mode="float" (по умолчанию, главная) — лёгкое бесконечное «парение», у каждой
     свои параметры, двигаются вразнобой.
   mode="flee" (хаб /keisy) — плашки «убегают» от курсора: чем ближе мышь, тем
     сильнее плашка сдвигается прочь; отодвинулся — плавно возвращается.
   Через links плашки кликабельны: подстрока названия ниши → href. */
export default function FloatChips({
  html,
  h,
  links,
  mode = "float",
}: {
  html: string;
  h?: number;
  links?: Record<string, string>;
  mode?: "float" | "flee";
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const t = setTimeout(() => {
      // таблетки-ниши находятся стабильно (border-radius:99px, height:80px, без детей),
      // анимируем их родителя-обёртку (там текст ниши + кнопка «+»)
      const pills = ([...root.querySelectorAll("div")] as HTMLElement[]).filter((d) => {
        const s = d.getAttribute("style") || "";
        return (
          s.includes("border-radius:99px") &&
          s.includes("height:80px") &&
          d.children.length === 0
        );
      });
      const chips = pills
        .map((p) => p.parentElement)
        .filter((el): el is HTMLElement => !!el);
      if (!chips.length) return;

      // кликабельность (делегирование + hit-test по прямоугольнику пилюли —
      // так ловится клик по всей видимой плашке: тексту, «+», фону)
      if (links) {
        const targets = pills
          .map((pill) => {
            const chip = pill.parentElement;
            const name = (chip?.textContent || "").toLowerCase();
            const key = Object.keys(links).find((k) => name.includes(k));
            if (!key) return null;
            // курсор-указатель на всю плашку
            pill.style.cursor = "pointer";
            if (chip) chip.style.cursor = "pointer";
            return { pill, href: links[key] };
          })
          .filter((x): x is { pill: HTMLElement; href: string } => !!x);

        const onClick = (e: MouseEvent) => {
          for (const { pill, href } of targets) {
            const r = pill.getBoundingClientRect();
            if (
              e.clientX >= r.left &&
              e.clientX <= r.right &&
              e.clientY >= r.top &&
              e.clientY <= r.bottom
            ) {
              if (href.startsWith("#")) {
                document
                  .getElementById(href.slice(1))
                  ?.scrollIntoView({ behavior: "smooth", block: "start" });
              } else {
                window.location.href = href;
              }
              break;
            }
          }
        };
        root.addEventListener("click", onClick);
      }

      if (reduced) return;

      if (mode === "float") {
        chips.forEach((chip, i) => {
          const dx = 5 + (i % 3) * 2; // 5..9px
          const dy = 6 + (i % 4) * 2; // 6..12px
          const rot = 1 + (i % 3) * 0.5; // 1..2deg
          const dur = 4500 + (i % 5) * 900; // 4.5..8.1с
          chip.style.willChange = "transform";
          const a = chip.animate(
            [
              { transform: "translate(0,0) rotate(0deg)" },
              { transform: `translate(${dx}px,${-dy}px) rotate(${rot}deg)` },
              { transform: `translate(${-dx}px,${-dy * 0.45}px) rotate(${-rot}deg)` },
              { transform: "translate(0,0) rotate(0deg)" },
            ],
            { duration: dur, iterations: Infinity, easing: "ease-in-out" }
          );
          a.currentTime = i * 700; // десинхрон старта
        });
        return;
      }

      // mode === "flee": плашки отодвигаются от курсора
      const RADIUS = 190; // зона реакции вокруг курсора, px (в координатах экрана)
      const STRENGTH = 0.55; // насколько сильно убегают
      chips.forEach((chip) => {
        chip.style.willChange = "transform";
        chip.style.transition = "transform 0.35s cubic-bezier(.22,1,.36,1)";
      });

      let raf = 0;
      const onMove = (e: MouseEvent) => {
        if (raf) return;
        raf = requestAnimationFrame(() => {
          raf = 0;
          chips.forEach((chip) => {
            const r = chip.getBoundingClientRect();
            const cx = r.left + r.width / 2;
            const cy = r.top + r.height / 2;
            const dx = cx - e.clientX;
            const dy = cy - e.clientY;
            const dist = Math.hypot(dx, dy);
            if (dist < RADIUS && dist > 0.001) {
              const push = (RADIUS - dist) * STRENGTH;
              const ux = (dx / dist) * push;
              const uy = (dy / dist) * push;
              chip.style.transform = `translate(${ux}px,${uy}px)`;
            } else {
              chip.style.transform = "translate(0,0)";
            }
          });
        });
      };
      const onLeave = () => {
        chips.forEach((chip) => (chip.style.transform = "translate(0,0)"));
      };
      root.addEventListener("mousemove", onMove);
      root.addEventListener("mouseleave", onLeave);
      // сохраняем очистку на элементе
      (root as HTMLElement & { _fleeCleanup?: () => void })._fleeCleanup = () => {
        root.removeEventListener("mousemove", onMove);
        root.removeEventListener("mouseleave", onLeave);
        if (raf) cancelAnimationFrame(raf);
      };
    }, 150);

    return () => {
      clearTimeout(t);
      const r = ref.current as (HTMLElement & { _fleeCleanup?: () => void }) | null;
      r?._fleeCleanup?.();
    };
  }, [links, mode]);

  return (
    <div ref={ref}>
      <BuilderBlock html={html} h={h} overflow={mode === "flee" ? "visible" : "hidden"} />
    </div>
  );
}
