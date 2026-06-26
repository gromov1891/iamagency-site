"use client";

import { useEffect, useRef, useState } from "react";

/* Hero «Маркетинг» — единый холст 1440×1024. Масштабируется так, чтобы целиком
   вписаться в первый экран (высота = 100vh − хедер): берём меньший из масштабов
   по ширине и по высоте, поэтому вся композиция (от «МАРКЕТИНГ» до кнопки
   «Консультация») всегда помещается без прокрутки. Холст центрируется по
   горизонтали. Правая группа (карточка «Как мы работаем») вписана в тот же холст
   со сдвигом вправо (left: 780 = 1440 − 660). */
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
    // вписываем холст целиком: что меньше — ширина или высота
    const update = () => setScale(Math.min(el.clientWidth / W, el.clientHeight / H));
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
      style={{
        height: "calc(100vh - var(--header-h))",
        overflow: "hidden",
        background: "#fff",
      }}
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
        {/* правая группа — сдвинута на 780px вправо (вписана в правый край холста) */}
        <div
          style={{ position: "absolute", top: 0, left: 780, width: 660, height: H }}
          dangerouslySetInnerHTML={{ __html: rightHtml }}
        />
      </div>
    </div>
  );
}
