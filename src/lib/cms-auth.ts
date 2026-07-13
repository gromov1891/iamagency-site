import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const CMS_COOKIE = "iamagency_cms_session";
export const CMS_SESSION_TTL = 60 * 60 * 24 * 7;

type SessionPayload = {
  user: string;
  exp: number;
};

function safeEqual(left: string, right: string) {
  const a = Buffer.from(left);
  const b = Buffer.from(right);
  return a.length === b.length && timingSafeEqual(a, b);
}

function secret() {
  const value = process.env.CMS_SESSION_SECRET;
  if (!value) throw new Error("CMS_SESSION_SECRET is not configured");
  return value;
}

function signature(payload: string) {
  return createHmac("sha256", secret()).update(payload).digest("base64url");
}

export function createCmsSessionToken(user: string) {
  const payload = Buffer.from(
    JSON.stringify({ user, exp: Math.floor(Date.now() / 1000) + CMS_SESSION_TTL } satisfies SessionPayload)
  ).toString("base64url");
  return `${payload}.${signature(payload)}`;
}

export function verifyCmsSessionToken(token?: string) {
  if (!token) return null;
  const [payload, suppliedSignature] = token.split(".");
  if (!payload || !suppliedSignature || !safeEqual(signature(payload), suppliedSignature)) return null;

  try {
    const parsed = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as SessionPayload;
    if (!parsed.user || parsed.exp <= Math.floor(Date.now() / 1000)) return null;
    return parsed;
  } catch {
    return null;
  }
}

export async function getCmsSession() {
  const store = await cookies();
  return verifyCmsSessionToken(store.get(CMS_COOKIE)?.value);
}

export function validateCmsCredentials(user: string, password: string) {
  const expectedUser = process.env.CMS_ADMIN_USER;
  const expectedPassword = process.env.CMS_ADMIN_PASSWORD;
  if (!expectedUser || !expectedPassword) return false;
  return safeEqual(user, expectedUser) && safeEqual(password, expectedPassword);
}

export function isSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (!origin || !host) return true;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}
