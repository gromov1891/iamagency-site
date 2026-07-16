import { NextResponse } from "next/server";
import { getCmsSession, isSameOrigin } from "@/lib/cms-auth";
import { listLeadRecords } from "@/lib/lead-store";
import { qualifyLead } from "@/lib/lead-qualification";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await getCmsSession())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const records = (await listLeadRecords()).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  return NextResponse.json({ records }, { headers: { "Cache-Control": "no-store" } });
}

export async function PATCH(request: Request) {
  if (!(await getCmsSession())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!isSameOrigin(request)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const body = await request.json() as { id?: unknown };
  const id = typeof body.id === "string" ? body.id.trim().toUpperCase() : "";
  if (!/^[A-F0-9]{8}$/.test(id)) return NextResponse.json({ error: "Некорректный ID" }, { status: 400 });
  const record = await qualifyLead(id);
  if (!record) return NextResponse.json({ error: "Заявка не найдена" }, { status: 404 });
  return NextResponse.json({ record });
}
