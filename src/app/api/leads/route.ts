import { randomUUID } from "node:crypto";
import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type LeadPayload = {
  kind?: unknown;
  source?: unknown;
  page?: unknown;
  name?: unknown;
  phone?: unknown;
  contact?: unknown;
  project?: unknown;
  budget?: unknown;
  tariff?: unknown;
  experience?: unknown;
  goal?: unknown;
  message?: unknown;
  website?: unknown;
};

const rateLimit = new Map<string, number[]>();

function clean(value: unknown, max = 500) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  })[char] || char);
}

function isSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  try {
    const forwardedHost = request.headers.get("x-forwarded-host")?.split(",")[0]?.trim();
    const requestHost = forwardedHost || request.headers.get("host") || new URL(request.url).host;
    const configuredHost = process.env.NEXT_PUBLIC_SITE_URL
      ? new URL(process.env.NEXT_PUBLIC_SITE_URL).host
      : "";

    return [requestHost, configuredHost].filter(Boolean).includes(new URL(origin).host);
  } catch {
    return false;
  }
}

function allowRequest(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const key = forwarded || "unknown";
  const now = Date.now();
  const recent = (rateLimit.get(key) || []).filter((time) => now - time < 10 * 60_000);
  if (recent.length >= 6) return false;
  recent.push(now);
  rateLimit.set(key, recent);
  return true;
}

function requiredEnv(name: string) {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`Missing ${name}`);
  return value;
}

export async function POST(request: Request) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: "Недопустимый запрос" }, { status: 403 });
  if (!allowRequest(request)) return NextResponse.json({ error: "Слишком много заявок. Попробуйте чуть позже." }, { status: 429 });

  try {
    const raw = await request.json() as LeadPayload;
    if (clean(raw.website)) return NextResponse.json({ ok: true });

    const lead = {
      kind: clean(raw.kind, 40) || "business",
      source: clean(raw.source, 180) || "Форма на сайте",
      page: clean(raw.page, 300) || "/",
      name: clean(raw.name, 120),
      phone: clean(raw.phone, 80),
      contact: clean(raw.contact, 240),
      project: clean(raw.project, 500),
      budget: clean(raw.budget, 120),
      tariff: clean(raw.tariff, 120),
      experience: clean(raw.experience, 160),
      goal: clean(raw.goal, 1200),
      message: clean(raw.message, 1200),
    };

    if (lead.name.length < 2) return NextResponse.json({ error: "Укажите имя" }, { status: 400 });
    if (lead.phone.length < 5) return NextResponse.json({ error: "Укажите телефон" }, { status: 400 });

    const id = randomUUID().slice(0, 8).toUpperCase();
    const createdAt = new Intl.DateTimeFormat("ru-RU", {
      dateStyle: "medium",
      timeStyle: "medium",
      timeZone: "Europe/Moscow",
    }).format(new Date());
    const labels: Array<[string, string]> = [
      ["Источник", lead.source],
      ["Страница", lead.page],
      ["Тип", lead.kind === "course" ? "Обучение" : lead.kind === "tariff" ? "Тариф" : "Услуги агентства"],
      ["Тариф", lead.tariff],
      ["Имя", lead.name],
      ["Телефон", lead.phone],
      ["Telegram / соцсеть", lead.contact],
      ["Проект", lead.project],
      ["Бюджет", lead.budget],
      ["Уровень в SMM", lead.experience],
      ["Цель", lead.goal],
      ["Комментарий", lead.message],
      ["Время", `${createdAt} МСК`],
      ["ID", id],
    ];
    const visibleLabels = labels.filter(([, value]) => Boolean(value));

    const smtpPort = Number(process.env.LEADS_SMTP_PORT || 465);
    const smtpUser = requiredEnv("LEADS_SMTP_USER");
    const emailTo = requiredEnv("LEADS_EMAIL_TO");
    const telegramToken = requiredEnv("LEADS_TELEGRAM_BOT_TOKEN");
    const telegramChatId = requiredEnv("LEADS_TELEGRAM_CHAT_ID");
    const transporter = nodemailer.createTransport({
      host: requiredEnv("LEADS_SMTP_HOST"),
      port: smtpPort,
      secure: smtpPort === 465,
      auth: { user: smtpUser, pass: requiredEnv("LEADS_SMTP_PASSWORD") },
    });
    const emailText = visibleLabels.map(([label, value]) => `${label}: ${value}`).join("\n");
    const emailHtml = `<div style="font-family:Arial,sans-serif;color:#1c1c1c"><h2 style="margin:0 0 18px">Новая заявка · ${escapeHtml(lead.source)}</h2><table cellpadding="8" cellspacing="0" style="border-collapse:collapse;width:100%;max-width:720px">${visibleLabels.map(([label, value]) => `<tr><td style="border-bottom:1px solid #ddd;color:#777;width:180px">${escapeHtml(label)}</td><td style="border-bottom:1px solid #ddd"><strong>${escapeHtml(value)}</strong></td></tr>`).join("")}</table></div>`;

    const telegramText = [
      `<b>Новая заявка · I AM AGENCY</b>`,
      ...visibleLabels.map(([label, value]) => `<b>${escapeHtml(label)}:</b> ${escapeHtml(value)}`),
    ].join("\n");

    const deliveryWebhookUrl = process.env.LEADS_DELIVERY_WEBHOOK_URL?.trim();
    const deliveryWebhookSecret = process.env.LEADS_DELIVERY_WEBHOOK_SECRET?.trim();

    if (deliveryWebhookUrl && deliveryWebhookSecret) {
      const relayResponse = await fetch(deliveryWebhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-IAM-Lead-Secret": deliveryWebhookSecret,
        },
        body: JSON.stringify({
          emailSubject: `[I AM AGENCY] ${lead.source} · ${lead.name}`,
          emailText,
          emailHtml,
          telegramTextPlain: visibleLabels.map(([label, value]) => `${label}: ${value}`).join("\n"),
        }),
      });

      if (!relayResponse.ok) throw new Error(`Lead relay ${relayResponse.status}`);
      return NextResponse.json({ ok: true, id });
    }

    await Promise.all([
      transporter.sendMail({
        from: process.env.LEADS_SMTP_FROM || `I AM AGENCY <${smtpUser}>`,
        to: emailTo,
        subject: `[I AM AGENCY] ${lead.source} · ${lead.name}`,
        text: emailText,
        html: emailHtml,
      }),
      fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: telegramChatId,
          text: telegramText,
          parse_mode: "HTML",
          disable_web_page_preview: true,
        }),
      }).then(async (response) => {
        if (!response.ok) throw new Error(`Telegram ${response.status}`);
      }),
    ]);

    return NextResponse.json({ ok: true, id });
  } catch (error) {
    console.error("Lead delivery failed", error instanceof Error ? error.message : error);
    return NextResponse.json(
      { error: "Не удалось отправить заявку. Напишите нам в Telegram или попробуйте ещё раз." },
      { status: 502 },
    );
  }
}
