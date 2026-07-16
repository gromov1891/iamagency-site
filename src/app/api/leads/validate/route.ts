import { NextResponse } from "next/server";
import {
  getLeadRecord,
  validateLead,
  verifyLeadValidation,
  verifyStoredLeadValidation,
} from "@/lib/lead-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function responsePage(title: string, message: string, status = 200) {
  return new NextResponse(`<!doctype html><html lang="ru"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>${title}</title><style>*{box-sizing:border-box}body{margin:0;min-height:100vh;display:grid;place-items:center;padding:20px;background:#f4f4f2;color:#1c1c1c;font:16px/1.45 Arial,sans-serif}.panel{width:min(520px,100%);background:#fff;border:1px solid #d8d8d4;border-radius:8px;padding:40px;box-shadow:0 18px 60px rgba(0,0,0,.08)}.brand{display:inline-block;margin-bottom:48px;padding:6px 12px;border-radius:999px;background:linear-gradient(90deg,#8fc8ee,#9291e8);color:#fff;font-size:12px;font-weight:700}h1{max-width:430px;font-size:clamp(34px,7vw,54px);line-height:.95;margin:0 0 22px;letter-spacing:0}p{margin:0;color:#666;font-size:18px}.hint{margin-top:34px;padding-top:22px;border-top:1px solid #ddd;color:#999;font-size:14px}</style></head><body><main class="panel"><span class="brand">I AM AGENCY</span><h1>${title}</h1><p>${message}</p><p class="hint">Эту вкладку можно закрыть и вернуться в Telegram.</p></main></body></html>`, {
    status,
    headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" },
  });
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const id = (url.searchParams.get("id") || "").trim().toUpperCase();
  const signature = url.searchParams.get("signature") || "";
  if (!/^[A-F0-9]{8}$/.test(id) || !signature) {
    return responsePage("Ссылка недействительна", "Проверьте, что ссылка из сообщения скопирована полностью.", 403);
  }
  try {
    const storedLead = await getLeadRecord(id);
    if (!storedLead) return responsePage("Заявка не найдена", `Заявка ${id} отсутствует в журнале.`, 404);
    const isValidSignature = verifyStoredLeadValidation(storedLead, signature) || verifyLeadValidation(id, signature);
    if (!isValidSignature) {
      return responsePage("Ссылка устарела", "Эта заявка была создана до переноса системы. Новые ссылки уже защищены от смены сервера.", 403);
    }
    const lead = await validateLead(id);
    if (!lead) return responsePage("Заявка не найдена", `Заявка ${id} отсутствует в журнале.`, 404);
    return responsePage("Качественный лид сохранён", `Заявка ${id} отмечена как ценная конверсия и добавлена в журнал для рекламной аналитики.`);
  } catch (error) {
    console.error("Lead validation failed", error instanceof Error ? error.message : error);
    return responsePage("Не удалось сохранить", "Попробуйте открыть ссылку ещё раз через минуту.", 502);
  }
}
