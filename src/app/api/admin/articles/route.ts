import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { BLOG_ARTICLES } from "@/app/blog/articles";
import { getCmsSession, isSameOrigin } from "@/lib/cms-auth";
import { deleteCmsArticle, getCmsArticles, sanitizeCmsArticle, upsertCmsArticle } from "@/lib/cms-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  if (!await getCmsSession()) return NextResponse.json({ error: "Требуется вход" }, { status: 401 });
  const response = NextResponse.json({ articles: await getCmsArticles() });
  response.headers.set("Cache-Control", "no-store");
  return response;
}

export async function POST(request: Request) {
  if (!await getCmsSession()) return NextResponse.json({ error: "Требуется вход" }, { status: 401 });
  if (!isSameOrigin(request)) return NextResponse.json({ error: "Недопустимый запрос" }, { status: 403 });

  try {
    const body = await request.json();
    const originalSlug = typeof body.originalSlug === "string" ? body.originalSlug : "";
    const articles = await getCmsArticles();
    const existingIndex = originalSlug ? articles.findIndex((article) => article.slug === originalSlug) : -1;
    const existing = existingIndex >= 0 ? articles[existingIndex] : undefined;
    const article = sanitizeCmsArticle(body.article, existing);

    if (BLOG_ARTICLES.some((item) => item.slug === article.slug)) {
      return NextResponse.json({ error: "Этот адрес занят встроенной статьёй" }, { status: 409 });
    }
    if (articles.some((item, index) => item.slug === article.slug && index !== existingIndex)) {
      return NextResponse.json({ error: "Статья с таким адресом уже существует" }, { status: 409 });
    }

    await upsertCmsArticle(article);
    if (originalSlug && originalSlug !== article.slug) await deleteCmsArticle(originalSlug);

    revalidatePath("/blog");
    revalidatePath(`/blog/${article.slug}`);
    if (originalSlug && originalSlug !== article.slug) revalidatePath(`/blog/${originalSlug}`);
    revalidatePath("/sitemap");
    revalidatePath("/sitemap.xml");

    return NextResponse.json({ article });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Не удалось сохранить статью";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
