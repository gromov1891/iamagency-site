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
  extraCards?: Array<{ title: string; subtitle: string; mark?: string; logo?: string; href: string }>;
  siteLinks?: Record<string, string>;
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
  extraCards = [],
  siteLinks = {},
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

      for (const card of cards) {
        const text = (card.textContent || "").replace(/\s+/g, " ").trim().toLocaleUpperCase("ru-RU");
        const match = Object.entries(siteLinks).find(([title]) => text.includes(title.toLocaleUpperCase("ru-RU")));
        if (!match) continue;
        card.dataset.siteHref = match[1];
        card.setAttribute("role", "link");
        card.setAttribute("tabindex", "0");
        card.setAttribute("aria-label", `${match[0]}: открыть сайт`);
        card.style.cursor = "pointer";
      }

      let nextLeft = Math.max(...cards.map((card) => parseFloat(card.style.left || "0") + parseFloat(card.style.width || "0"))) + 5;
      for (const item of extraCards) {
        const card = document.createElement("a");
        card.href = item.href;
        card.target = "_blank";
        card.rel = "noreferrer";
        card.setAttribute("aria-label", `${item.title}: открыть сайт`);
        card.style.cssText = `display:block;width:254px;height:192px;position:absolute;left:${nextLeft}px;top:${rowTop}px;border-radius:15.462px;background:#1C1C1C;box-shadow:0 1.995px 1.995px rgba(0,0,0,.25) inset;color:#fff;text-decoration:none`;
        const visual = item.logo
          ? `<img src="${item.logo}" alt="" style="position:absolute;left:77px;top:20px;width:100px;height:82px;object-fit:contain${item.title === "UPPERCUTS" ? ";filter:invert(1)" : ""}"/>`
          : `<div style="position:absolute;left:89px;top:28px;width:76px;height:66px;border:2px solid #90BEE9;border-radius:50%;display:grid;place-items:center;color:#90BEE9;font:600 22px Inter,sans-serif">${item.mark || ""}</div>`;
        card.innerHTML = `${visual}<div style="position:absolute;left:12px;right:12px;top:120px;text-align:center;color:#fff;font:400 30px/86% Coolvetica,Inter,sans-serif;text-transform:uppercase;white-space:nowrap">${item.title}</div><div style="position:absolute;left:12px;right:12px;top:151px;text-align:center;color:#9A9895;font:400 15px/1 Inter,sans-serif;white-space:nowrap">${item.subtitle}</div>`;
        canvas.appendChild(card);
        cards.push(card);
        nextLeft += 259;
      }

      let maxRight = 0;
      let minLeft = Infinity;
      for (const c of cards) {
        const left = parseFloat(c.style.left || "0");
        const width = parseFloat(c.style.width || "0");
        maxRight = Math.max(maxRight, left + width);
        minLeft = Math.min(minLeft, left);
      }
      const gap = 5;
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
      const openSite = (event: MouseEvent | KeyboardEvent) => {
        if (event instanceof KeyboardEvent && event.key !== "Enter" && event.key !== " ") return;
        const element = event.target instanceof Element ? event.target.closest<HTMLElement>("[data-site-href]") : null;
        if (!element?.dataset.siteHref) return;
        event.preventDefault();
        window.open(element.dataset.siteHref, "_blank", "noopener,noreferrer");
      };
      track.addEventListener("mouseenter", pause);
      track.addEventListener("mouseleave", play);
      track.addEventListener("click", openSite);
      track.addEventListener("keydown", openSite);
      cleanup = () => {
        track.removeEventListener("mouseenter", pause);
        track.removeEventListener("mouseleave", play);
        track.removeEventListener("click", openSite);
        track.removeEventListener("keydown", openSite);
        anim.cancel();
        track.remove();
      };
    }, 120);

    return () => {
      clearTimeout(t);
      cleanup();
    };
  }, [rowTop, rowHeight, speed, clip, clipLeft, clipWidth, clipRadius, extraCards, siteLinks]);

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
  extraCards = [],
  siteLinks = {},
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
      extraCards={extraCards}
      siteLinks={siteLinks}
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
