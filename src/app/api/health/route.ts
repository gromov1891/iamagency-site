import { NextResponse } from "next/server";
import { getStorageBackend } from "@/lib/object-storage";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export function GET() {
  return NextResponse.json({
    status: "ok",
    service: "iamagency-site",
    storage: getStorageBackend(),
    timestamp: new Date().toISOString(),
  });
}
