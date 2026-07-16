import "server-only";

import { createHmac, randomUUID, timingSafeEqual } from "node:crypto";
import { getJsonObject, listStoredObjects, putJsonObject } from "@/lib/object-storage";

const LEAD_RECORDS_PREFIX = "leads/records/";

export type StoredLeadAttributionTouch = {
  landingPage: string;
  referrer: string;
  capturedAt: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  gclid?: string;
  gbraid?: string;
  wbraid?: string;
  yclid?: string;
  ymclid?: string;
  fbclid?: string;
  vk_click_id?: string;
};

export type StoredLeadAttribution = {
  firstTouch: StoredLeadAttributionTouch;
  lastTouch: StoredLeadAttributionTouch;
};

export type StoredLead = {
  id: string;
  status: "new" | "valid";
  createdAt: string;
  validatedAt?: string;
  validationSignature?: string;
  lead: Record<string, string>;
  attribution: StoredLeadAttribution | null;
};

function leadPrefix(id: string) {
  return `${LEAD_RECORDS_PREFIX}${id}/`;
}

function recordKey(id: string) {
  return `${leadPrefix(id)}${Date.now().toString().padStart(13, "0")}-${randomUUID()}.json`;
}

function signingSecret() {
  const secret = process.env.LEADS_VALIDATION_SECRET?.trim() || process.env.CMS_SESSION_SECRET?.trim();
  if (!secret) throw new Error("Lead validation secret is not configured");
  return secret;
}

export function signLeadValidation(id: string) {
  return createHmac("sha256", signingSecret()).update(`valid-lead:${id}`).digest("base64url");
}

export function verifyLeadValidation(id: string, suppliedSignature: string) {
  try {
    const expected = Buffer.from(signLeadValidation(id));
    const supplied = Buffer.from(suppliedSignature);
    return expected.length === supplied.length && timingSafeEqual(expected, supplied);
  } catch {
    return false;
  }
}

export function createLeadValidation(id: string) {
  const signature = signLeadValidation(id);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://iamagency.su";
  const url = new URL("/api/leads/validate", siteUrl);
  url.searchParams.set("id", id);
  url.searchParams.set("signature", signature);
  return { signature, url: url.toString() };
}

export function verifyStoredLeadValidation(record: StoredLead, suppliedSignature: string) {
  if (!record.validationSignature) return false;
  const expected = Buffer.from(record.validationSignature);
  const supplied = Buffer.from(suppliedSignature);
  return expected.length === supplied.length && timingSafeEqual(expected, supplied);
}

export async function saveLeadRecord(record: StoredLead) {
  await putJsonObject(recordKey(record.id), record);
}

export async function getLeadRecord(id: string) {
  const objects = await listStoredObjects(leadPrefix(id));
  const latest = objects.sort((a, b) => b.key.localeCompare(a.key))[0];
  return latest ? getJsonObject<StoredLead>(latest.key) : null;
}

export async function validateLead(id: string) {
  const current = await getLeadRecord(id);
  if (!current) return null;
  if (current.status === "valid") return current;
  const updated: StoredLead = { ...current, status: "valid", validatedAt: new Date().toISOString() };
  await saveLeadRecord(updated);
  return updated;
}

export async function listLeadRecords() {
  const objects = await listStoredObjects(LEAD_RECORDS_PREFIX);
  const latestById = new Map<string, (typeof objects)[number]>();
  for (const object of objects) {
    const id = object.key.split("/")[2];
    if (!id) continue;
    const current = latestById.get(id);
    if (!current || object.key.localeCompare(current.key) > 0) latestById.set(id, object);
  }
  const records = await Promise.all([...latestById.values()].map((object) => getJsonObject<StoredLead>(object.key)));
  return records.filter((record): record is StoredLead => Boolean(record));
}
