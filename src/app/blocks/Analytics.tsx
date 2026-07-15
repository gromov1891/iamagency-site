"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { captureLeadAttribution } from "@/lib/lead-attribution";

const metrikaId = Number(process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID || "99802137");
const gaId = process.env.NEXT_PUBLIC_GA_ID?.trim();
type QueuedMetrika = NonNullable<Window["ym"]> & { a?: unknown[][]; l?: number };
type AnalyticsWindow = Window & { dataLayer?: unknown[][] };

export default function Analytics() {
  const pathname = usePathname();
  const initialPath = useRef(pathname);
  const started = useRef(false);

  useEffect(() => {
    captureLeadAttribution();

    const startAnalytics = () => {
      if (started.current) return;
      started.current = true;

      const queuedMetrika = (window.ym as QueuedMetrika | undefined) ||
        (function (...args: unknown[]) {
          (queuedMetrika.a = queuedMetrika.a || []).push(args);
        } as QueuedMetrika);
      queuedMetrika.l = Date.now();
      window.ym = queuedMetrika;

      const metrika = document.createElement("script");
      metrika.async = true;
      metrika.src = "https://mc.yandex.ru/metrika/tag.js";
      document.head.appendChild(metrika);
      window.ym(metrikaId, "init", {
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
        webvisor: true,
      });

      if (gaId) {
        const analyticsWindow = window as AnalyticsWindow;
        analyticsWindow.dataLayer = analyticsWindow.dataLayer || [];
        window.gtag =
          window.gtag ||
          function (...args: unknown[]) {
            analyticsWindow.dataLayer!.push(args);
          };
        window.gtag("js", new Date());
        window.gtag("config", gaId);

        const analytics = document.createElement("script");
        analytics.async = true;
        analytics.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
        document.head.appendChild(analytics);
      }
    };

    const events: Array<keyof WindowEventMap> = ["pointerdown", "touchstart", "keydown", "scroll"];
    events.forEach((event) => window.addEventListener(event, startAnalytics, { once: true, passive: true }));
    const fallback = window.setTimeout(startAnalytics, 8000);

    return () => {
      window.clearTimeout(fallback);
      events.forEach((event) => window.removeEventListener(event, startAnalytics));
    };
  }, []);

  useEffect(() => {
    if (pathname === initialPath.current) return;
    captureLeadAttribution();
    window.ym?.(metrikaId, "hit", pathname);
    if (gaId) window.gtag?.("config", gaId, { page_path: pathname });
  }, [pathname]);

  return null;
}
