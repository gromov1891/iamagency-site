import { NextResponse } from "next/server";
import { getCmsSession } from "@/lib/cms-auth";
import { isTestLeadRecord, listLeadRecords, type StoredLead } from "@/lib/lead-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const HEADERS = [
  "Lead ID",
  "Статус",
  "Дата заявки",
  "Дата валидации",
  "Имя",
  "Телефон",
  "Источник формы",
  "Страница",
  "UTM Source",
  "UTM Medium",
  "UTM Campaign",
  "UTM Content",
  "UTM Term",
  "GCLID",
  "GBRAID",
  "WBRAID",
  "YCLID",
  "Metrika Client ID",
  "FBCLID",
  "Первая посадочная",
  "Referrer",
  "Conversion Name",
  "Conversion Time",
  "Conversion Value",
  "Conversion Currency",
];

function csvCell(value: unknown) {
  const text = String(value ?? "").replace(/"/g, '""');
  return `"${text}"`;
}

function moscowTime(value?: string) {
  if (!value) return "";
  const parts = new Intl.DateTimeFormat("sv-SE", {
    timeZone: "Europe/Moscow",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).formatToParts(new Date(value));
  const part = (type: Intl.DateTimeFormatPartTypes) => parts.find((item) => item.type === type)?.value || "";
  return `${part("year")}-${part("month")}-${part("day")} ${part("hour")}:${part("minute")}:${part("second")}+03:00`;
}

function row(record: StoredLead) {
  const touch = record.attribution?.lastTouch;
  return [
    record.id,
    record.status === "valid" ? "Валидный" : "Новый",
    moscowTime(record.createdAt),
    moscowTime(record.validatedAt),
    record.lead.name,
    record.lead.phone,
    record.lead.source,
    record.lead.page,
    touch?.utm_source,
    touch?.utm_medium,
    touch?.utm_campaign,
    touch?.utm_content,
    touch?.utm_term,
    touch?.gclid,
    touch?.gbraid,
    touch?.wbraid,
    touch?.yclid || touch?.ymclid,
    touch?.client_id,
    touch?.fbclid,
    record.attribution?.firstTouch.landingPage,
    record.attribution?.firstTouch.referrer,
    "qualified_lead",
    moscowTime(record.validatedAt),
    "",
    "RUB",
  ];
}

export async function GET() {
  if (!(await getCmsSession())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const records = (await listLeadRecords())
    .filter((record) => record.status === "valid" && !isTestLeadRecord(record))
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  const csv = [HEADERS, ...records.map(row)].map((values) => values.map(csvCell).join(",")).join("\r\n");
  return new NextResponse(`\uFEFF${csv}`, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="iamagency-valid-leads-${new Date().toISOString().slice(0, 10)}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
