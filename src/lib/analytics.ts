export type AnalyticsParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    ym?: (counterId: number, method: string, ...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackAnalyticsGoal(goal: string, params?: AnalyticsParams) {
  if (typeof window === "undefined") return;

  const metrikaId = Number(process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID || "99802137");
  if (Number.isFinite(metrikaId)) window.ym?.(metrikaId, "reachGoal", goal, params);
  window.gtag?.("event", goal, params || {});
}
