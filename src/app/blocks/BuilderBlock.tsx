"use client";

import { useEffect, useRef, useState } from "react";

/* Универсальная обёртка для блоков из Builder.io (Figma→HTML).
   Нативный холст w×h (по умолчанию 1440×1024) масштабируется под ширину контейнера.
   Для планшета передаём w=768, для мобайла w=375. */
export default function BuilderBlock({
  html,
  w = 1440,
  h = 1024,
  overflow = "hidden",
}: {
  html: string;
  w?: number;
  h?: number;
  overflow?: "hidden" | "visible";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setScale(el.clientWidth / w);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [w]);

  return (
    <div ref={ref} className="relative w-full" style={{ aspectRatio: `${w} / ${h}`, overflow }}>
      <div
        style={{
          width: w,
          height: h,
          position: "absolute",
          top: 0,
          left: 0,
          transformOrigin: "top left",
          transform: `scale(${scale})`,
          visibility: scale ? "visible" : "hidden",
        }}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
