"use client";

const STORAGE_KEY = "iamagency_lead_attribution_v1";

const ATTRIBUTION_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "gclid",
  "gbraid",
  "wbraid",
  "yclid",
  "ymclid",
  "fbclid",
  "vk_click_id",
] as const;

type AttributionKey = (typeof ATTRIBUTION_KEYS)[number];

export type LeadAttributionTouch = Partial<Record<AttributionKey, string>> & {
  landingPage: string;
  referrer: string;
  capturedAt: string;
};

export type LeadAttribution = {
  firstTouch: LeadAttributionTouch;
  lastTouch: LeadAttributionTouch;
};

function clean(value: string | null, max = 500) {
  return (value || "").trim().slice(0, max);
}

function currentTouch(): LeadAttributionTouch {
  const params = new URLSearchParams(window.location.search);
  const touch: LeadAttributionTouch = {
    landingPage: `${window.location.pathname}${window.location.search}`.slice(0, 1000),
    referrer: clean(document.referrer, 1000),
    capturedAt: new Date().toISOString(),
  };

  for (const key of ATTRIBUTION_KEYS) {
    const value = clean(params.get(key), 500);
    if (value) touch[key] = value;
  }
  return touch;
}

function hasCampaignData(touch: LeadAttributionTouch) {
  return ATTRIBUTION_KEYS.some((key) => Boolean(touch[key]));
}

function readStored(): LeadAttribution | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) as LeadAttribution : null;
  } catch {
    return null;
  }
}

export function captureLeadAttribution() {
  if (typeof window === "undefined") return null;
  const current = currentTouch();
  const stored = readStored();
  const shouldRefreshLastTouch = hasCampaignData(current) || !stored;
  const attribution: LeadAttribution = {
    firstTouch: stored?.firstTouch || current,
    lastTouch: shouldRefreshLastTouch ? current : stored.lastTouch,
  };

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(attribution));
  } catch {
    // Private browsing can disable storage; the current touch is still returned.
  }
  return attribution;
}

export function getLeadAttribution() {
  if (typeof window === "undefined") return null;
  return readStored() || captureLeadAttribution();
}
