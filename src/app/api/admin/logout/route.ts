import { NextResponse } from "next/server";
import { CMS_COOKIE, isSameOrigin } from "@/lib/cms-auth";

export async function POST(request: Request) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: "Недопустимый запрос" }, { status: 403 });
  const response = NextResponse.json({ ok: true });
  response.cookies.set(CMS_COOKIE, "", { httpOnly: true, sameSite: "lax", path: "/", maxAge: 0 });
  return response;
}
