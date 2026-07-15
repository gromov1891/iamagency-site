import { NextResponse } from "next/server";
import { validateLead, verifyLeadValidation } from "@/lib/lead-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function responsePage(title: string, message: string, status = 200) {
  return new NextResponse(`<!doctype html><html lang="ru"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>${title}</title><style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#f5f5f5;color:#1c1c1c;font:16px/1.4 Arial,sans-serif}.panel{width:min(440px,calc(100% - 32px));box-sizing:border-box;background:#fff;border:1px solid #ddd;border-radius:8px;padding:36px}h1{font-size:32px;line-height:1;margin:0 0 18px}p{margin:0;color:#555}</style></head><body><main class="panel"><h1>${title}</h1><p>${message}</p></main></body></html>`, {
    status,
    headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" },
  });
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const id = (url.searchParams.get("id") || "").trim().toUpperCase();
  const signature = url.searchParams.get("signature") || "";
  if (!/^[A-F0-9]{8}$/.test(id) || !signature || !verifyLeadValidation(id, signature)) {
    return responsePage("Ссылка недействительна", "Проверьте, что ссылка из сообщения скопирована полностью.", 403);
  }
  try {
    const lead = await validateLead(id);
    if (!lead) return responsePage("Заявка не найдена", `Заявка ${id} отсутствует в журнале.`, 404);
    return responsePage("Лид отмечен валидным", `Заявка ${id} записана как ценная конверсия. Повторно отмечать её не нужно.`);
  } catch (error) {
    console.error("Lead validation failed", error instanceof Error ? error.message : error);
    return responsePage("Не удалось сохранить", "Попробуйте открыть ссылку ещё раз через минуту.", 502);
  }
}
