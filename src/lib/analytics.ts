export type AnalyticsParams = Record<string, string | number | boolean | undefined>;

function isTestTraffic() {
  const params = new URLSearchParams(window.location.search);
  if (params.get("utm_source")?.toLowerCase() === "codex_qa") return true;
  if (params.has("integration-test")) return true;

  try {
    const stored = JSON.parse(window.localStorage.getItem("iamagency_lead_attribution_v1") || "null") as {
      lastTouch?: { utm_source?: string; landingPage?: string };
    } | null;
    return stored?.lastTouch?.utm_source?.toLowerCase() === "codex_qa" ||
      stored?.lastTouch?.landingPage?.includes("integration-test=") === true;
  } catch {
    return false;
  }
}

declare global {
  interface Window {
    ym?: (counterId: number, method: string, ...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackAnalyticsGoal(goal: string, params?: AnalyticsParams) {
  if (typeof window === "undefined") return;
  if (isTestTraffic()) return;

  const metrikaId = Number(process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID || "98432843");
  if (Number.isFinite(metrikaId)) window.ym?.(metrikaId, "reachGoal", goal, params);

  const isCourseLead = params?.kind === "course" ||
    window.location.pathname.startsWith("/shkola-smm") ||
    window.location.pathname.startsWith("/schoolsmm");
  const courseMetrikaId = Number(process.env.NEXT_PUBLIC_YANDEX_COURSE_METRIKA_ID || "98572678");
  if (isCourseLead && Number.isFinite(courseMetrikaId)) {
    window.ym?.(courseMetrikaId, "reachGoal", goal, params);
  }
  window.gtag?.("event", goal, params || {});
}
