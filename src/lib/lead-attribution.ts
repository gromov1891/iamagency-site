"use client";

import {
  LEAD_ATTRIBUTION_KEYS,
  type LeadAttribution,
  type LeadAttributionTouch,
} from "@/lib/lead-attribution-schema";

const STORAGE_KEY = "iamagency_lead_attribution_v1";
const SESSION_KEY = "iamagency_lead_attribution_session_v1";

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

  for (const key of LEAD_ATTRIBUTION_KEYS) {
    const value = clean(params.get(key), 500);
    if (value) touch[key] = value;
  }
  const metrikaClientId = document.cookie
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith("_ym_uid="))
    ?.slice("_ym_uid=".length);
  if (metrikaClientId) touch.client_id = clean(decodeURIComponent(metrikaClientId), 120);
  return touch;
}

function hasCampaignData(touch: LeadAttributionTouch) {
  return LEAD_ATTRIBUTION_KEYS.some((key) => key !== "client_id" && Boolean(touch[key]));
}

function hasExternalReferrer(touch: LeadAttributionTouch) {
  if (!touch.referrer) return false;
  try {
    return new URL(touch.referrer).origin !== window.location.origin;
  } catch {
    return true;
  }
}

function readStored(): LeadAttribution | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) as LeadAttribution : null;
  } catch {
    return null;
  }
}

function readSessionTouch(): LeadAttributionTouch | null {
  try {
    const raw = window.sessionStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) as LeadAttributionTouch : null;
  } catch {
    return null;
  }
}

function sessionTouch() {
  const stored = readSessionTouch();
  const current = currentTouch();
  const touch = stored || current;
  if (!touch.client_id && current.client_id) touch.client_id = current.client_id;
  try {
    window.sessionStorage.setItem(SESSION_KEY, JSON.stringify(touch));
  } catch {
    // A session touch can still be returned when storage is unavailable.
  }
  return touch;
}

export function captureLeadAttribution() {
  if (typeof window === "undefined") return null;
  const current = sessionTouch();
  const stored = readStored();
  const shouldRefreshLastTouch = hasCampaignData(current) || hasExternalReferrer(current) || !stored;
  const firstTouch = stored?.firstTouch || current;
  if (!firstTouch.client_id && current.client_id) firstTouch.client_id = current.client_id;
  const lastTouch = shouldRefreshLastTouch ? current : stored!.lastTouch;
  if (!lastTouch.client_id && current.client_id) lastTouch.client_id = current.client_id;
  const attribution: LeadAttribution = {
    firstTouch,
    lastTouch,
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
  return captureLeadAttribution();
}
