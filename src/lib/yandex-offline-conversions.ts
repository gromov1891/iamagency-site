import "server-only";

import type { StoredLead } from "@/lib/lead-store";

type SyncResult = NonNullable<StoredLead["offlineConversion"]>;

function csv(value: string) {
  return `"${value.replace(/"/g, '""')}"`;
}

export async function uploadQualifiedLead(record: StoredLead): Promise<SyncResult> {
  const updatedAt = new Date().toISOString();
  const token = process.env.YANDEX_METRIKA_OAUTH_TOKEN?.trim();
  const counterId = process.env.YANDEX_METRIKA_COUNTER_ID?.trim() || "99802137";
  const target = process.env.YANDEX_METRIKA_QUALIFIED_LEAD_GOAL?.trim() || "qualified_lead";
  const touch = record.attribution?.lastTouch;
  const clientId = touch?.client_id || "";
  const yclid = touch?.yclid || touch?.ymclid || "";

  if (!token) return { status: "skipped", updatedAt, message: "Не задан OAuth-токен Метрики" };
  if (!clientId && !yclid) return { status: "skipped", updatedAt, message: "У заявки нет ClientID или YCLID" };

  const identifier = clientId ? "ClientId" : "Yclid";
  const identifierValue = clientId || yclid;
  const timestamp = Math.max(1, Math.floor(new Date(record.validatedAt || updatedAt).getTime() / 1000) - 5);
  const payload = `${identifier},Target,DateTime\r\n${csv(identifierValue)},${csv(target)},${timestamp}\r\n`;
  const form = new FormData();
  form.append("file", new Blob([payload], { type: "text/csv;charset=utf-8" }), `lead-${record.id}.csv`);

  try {
    const response = await fetch(`https://api-metrika.yandex.net/management/v1/counter/${counterId}/offline_conversions/upload?type=BASIC&comment=${encodeURIComponent(`I AM AGENCY lead ${record.id}`)}`, {
      method: "POST",
      headers: { Authorization: `OAuth ${token}` },
      body: form,
      cache: "no-store",
    });
    const body = await response.json().catch(() => null) as { uploading?: { id?: number | string }; message?: string } | null;
    if (!response.ok) return { status: "error", updatedAt, message: body?.message || `Метрика вернула HTTP ${response.status}` };
    return { status: "sent", updatedAt, uploadId: String(body?.uploading?.id || ""), message: "Передано в Метрику" };
  } catch (error) {
    return { status: "error", updatedAt, message: error instanceof Error ? error.message : "Ошибка подключения к Метрике" };
  }
}
