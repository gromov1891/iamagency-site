import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import { getCmsSession, isSameOrigin } from "@/lib/cms-auth";

export const runtime = "nodejs";

const MAX_UPLOAD_BYTES = 4_000_000;
const ALLOWED_TYPES = new Set(["image/webp", "image/jpeg", "image/png"]);

export async function POST(request: Request) {
  if (!await getCmsSession()) return NextResponse.json({ error: "Требуется вход" }, { status: 401 });
  if (!isSameOrigin(request)) return NextResponse.json({ error: "Недопустимый запрос" }, { status: 403 });

  const formData = await request.formData();
  const file = formData.get("file");
  if (!(file instanceof File)) return NextResponse.json({ error: "Файл не выбран" }, { status: 400 });
  if (!ALLOWED_TYPES.has(file.type)) return NextResponse.json({ error: "Поддерживаются JPG, PNG и WebP" }, { status: 415 });
  if (file.size > MAX_UPLOAD_BYTES) return NextResponse.json({ error: "Изображение должно быть меньше 4 МБ" }, { status: 413 });

  const baseName = file.name
    .replace(/\.[^.]+$/, "")
    .toLowerCase()
    .replace(/[^a-z0-9а-яё]+/gi, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60) || "article-image";
  const extension = file.type === "image/webp" ? "webp" : file.type === "image/png" ? "png" : "jpg";
  const yearMonth = new Date().toISOString().slice(0, 7);
  const blob = await put(`cms/media/${yearMonth}/${baseName}.${extension}`, file, {
    access: "public",
    addRandomSuffix: true,
    contentType: file.type,
    cacheControlMaxAge: 31_536_000,
  });

  return NextResponse.json({ url: blob.url, pathname: blob.pathname });
}
