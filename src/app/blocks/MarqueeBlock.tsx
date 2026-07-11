"use client";

import { useEffect, useRef } from "react";
import BuilderBlock from "./BuilderBlock";

type MarqueeCanvasProps = {
  html: string;
  h?: number;
  w?: number;
  rowTop: number;
  rowHeight: number;
  speed?: number;
  clipLeft?: number;
  clipWidth?: number;
  clipRadius?: number;
  clip?: boolean;
};

function MarqueeCanvas({
  html,
  h,
  w = 1440,
  rowTop,
  rowHeight,
  speed = 45,
  clipLeft,
  clipWidth,
  clipRadius = 24,
  clip = false,
}: MarqueeCanvasProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    let cleanup = () => {};

    const t = setTimeout(() => {
      const match = (c: HTMLElement) => {
        const top = parseFloat(c.style.top || "NaN");
        const height = parseFloat(c.style.height || "NaN");
        return Math.abs(top - rowTop) < 0.75 && Math.abs(height - rowHeight) < 0.75;
      };
      const cards = ([...root.querySelectorAll("div")] as HTMLElement[]).filter(match);
      if (cards.length < 2) return;
      const canvas = cards[0].parentElement;
      if (!canvas) return;

      let maxRight = 0;
      let minLeft = Infinity;
      for (const c of cards) {
        const left = parseFloat(c.style.left || "0");
        const width = parseFloat(c.style.width || "0");
        maxRight = Math.max(maxRight, left + width);
        minLeft = Math.min(minLeft, left);
      }
      const gap = 32;
      const period = maxRight - minLeft + gap;

      const shouldClip = clip && clipLeft != null && clipWidth != null;
      const offX = shouldClip ? clipLeft! : 0;
      const offY = shouldClip ? rowTop : 0;

      let host: HTMLElement = canvas;
      if (shouldClip) {
        const box = document.createElement("div");
        box.style.cssText =
          `position:absolute;left:${clipLeft}px;top:${rowTop}px;width:${clipWidth}px;` +
          `height:${rowHeight}px;overflow:hidden;border-radius:${clipRadius}px`;
        canvas.appendChild(box);
        host = box;
      }

      const track = document.createElement("div");
      track.dataset.marqueeTrack = "true";
      track.style.cssText = `position:absolute;left:0;top:0;width:${period * 2}px;height:${rowHeight}px;will-change:transform`;
      host.appendChild(track);
      for (const c of cards) {
        c.style.left = parseFloat(c.style.left || "0") - offX + "px";
        c.style.top = parseFloat(c.style.top || "0") - offY + "px";
        track.appendChild(c);
      }
      for (const c of cards) {
        const clone = c.cloneNode(true) as HTMLElement;
        clone.style.left = parseFloat(c.style.left || "0") + period + "px";
        track.appendChild(clone);
      }

      const anim = track.animate(
        [{ transform: "translateX(0)" }, { transform: `translateX(-${period}px)` }],
        { duration: (period / speed) * 1000, iterations: Infinity, easing: "linear" }
      );

      const pause = () => anim.pause();
      const play = () => anim.play();
      track.addEventListener("mouseenter", pause);
      track.addEventListener("mouseleave", play);
      cleanup = () => {
        track.removeEventListener("mouseenter", pause);
        track.removeEventListener("mouseleave", play);
        anim.cancel();
        track.remove();
      };
    }, 120);

    return () => {
      clearTimeout(t);
      cleanup();
    };
  }, [rowTop, rowHeight, speed, clip, clipLeft, clipWidth, clipRadius]);

  return (
    <div ref={ref} style={{ overflow: "hidden" }}>
      <BuilderBlock html={html} w={w} h={h} />
    </div>
  );
}

export default function MarqueeBlock({
  html,
  h,
  rowTop,
  rowHeight,
  speed = 45,
  clipLeft,
  clipWidth,
  clipRadius = 24,
  clip = false,
  tabletHtml,
  tabletH,
  tabletRowTop,
  tabletRowHeight,
  tabletSpeed,
  mobileHtml,
  mobileH,
  mobileRowTop,
  mobileRowHeight,
  mobileSpeed,
}: MarqueeCanvasProps & {
  tabletHtml?: string;
  tabletH?: number;
  tabletRowTop?: number;
  tabletRowHeight?: number;
  tabletSpeed?: number;
  mobileHtml?: string;
  mobileH?: number;
  mobileRowTop?: number;
  mobileRowHeight?: number;
  mobileSpeed?: number;
}) {
  const desktop = (
    <MarqueeCanvas
      html={html}
      h={h}
      rowTop={rowTop}
      rowHeight={rowHeight}
      speed={speed}
      clipLeft={clipLeft}
      clipWidth={clipWidth}
      clipRadius={clipRadius}
      clip={clip}
    />
  );

  if (!tabletHtml) return desktop;

  return (
    <>
      <div className="rb-desktop">{desktop}</div>
      <div className={mobileHtml ? "rb-tablet rb-has-mobile" : "rb-tablet"}>
        <MarqueeCanvas
          html={tabletHtml}
          h={tabletH}
          w={768}
          rowTop={tabletRowTop ?? rowTop}
          rowHeight={tabletRowHeight ?? rowHeight}
          speed={tabletSpeed ?? speed}
          clip={clip}
        />
      </div>
      {mobileHtml ? (
        <div className="rb-mobile">
          <MarqueeCanvas
            html={mobileHtml}
            h={mobileH}
            w={375}
            rowTop={mobileRowTop ?? tabletRowTop ?? rowTop}
            rowHeight={mobileRowHeight ?? tabletRowHeight ?? rowHeight}
            speed={mobileSpeed ?? tabletSpeed ?? speed}
            clip={clip}
          />
        </div>
      ) : null}
    </>
  );
}
