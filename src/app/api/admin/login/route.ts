import { NextResponse } from "next/server";
import {
  CMS_COOKIE,
  CMS_SESSION_TTL,
  createCmsSessionToken,
  isSameOrigin,
  validateCmsCredentials,
} from "@/lib/cms-auth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: "Недопустимый запрос" }, { status: 403 });

  const body = await request.json().catch(() => ({}));
  const user = typeof body.user === "string" ? body.user.trim() : "";
  const password = typeof body.password === "string" ? body.password : "";

  if (!validateCmsCredentials(user, password)) {
    await new Promise((resolve) => setTimeout(resolve, 450));
    return NextResponse.json({ error: "Неверный логин или пароль" }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(CMS_COOKIE, createCmsSessionToken(user), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: CMS_SESSION_TTL,
  });
  response.headers.set("Cache-Control", "no-store");
  return response;
}
