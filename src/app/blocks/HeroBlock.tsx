"use client";

import { useEffect, useRef, useState } from "react";

/* Hero «Маркетинг» — единый холст 1440×1024 в натуральных пропорциях, как в
   Figma-эталоне. Масштабируется под ширину контейнера (scale = ширина/1440),
   поэтому заголовок «МАРКЕТИНГ» всегда во всю строку, а вся композиция один в
   один повторяет макет. Правая группа (карточка «Как мы работаем») вписана в
   тот же холст со сдвигом вправо (left: 780 = 1440 − 660). */
const W = 1440;
const H = 1024;

export default function HeroBlock({
  leftHtml,
  rightHtml,
}: {
  leftHtml: string;
  rightHtml: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setScale(el.clientWidth / W);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="relative w-full"
      style={{ aspectRatio: `${W} / ${H}`, overflow: "hidden", background: "#fff" }}
    >
      <div
        style={{
          width: W,
          height: H,
          position: "absolute",
          top: 0,
          left: 0,
          transformOrigin: "top left",
          transform: `scale(${scale})`,
          visibility: scale ? "visible" : "hidden",
        }}
      >
        {/* левая группа — координаты как в Figma на холсте 1440 */}
        <div dangerouslySetInnerHTML={{ __html: leftHtml }} />
        {/* Не создаём прозрачный слой, если правая группа уже встроена в leftHtml. */}
        {rightHtml.trim() ? (
          <div
            style={{ position: "absolute", top: 0, left: 780, width: 660, height: H }}
            dangerouslySetInnerHTML={{ __html: rightHtml }}
          />
        ) : null}
      </div>
    </div>
  );
}
