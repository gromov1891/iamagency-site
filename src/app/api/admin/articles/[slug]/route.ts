import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getCmsSession, isSameOrigin } from "@/lib/cms-auth";
import { deleteCmsArticle, getCmsArticles } from "@/lib/cms-store";

export const runtime = "nodejs";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  if (!await getCmsSession()) return NextResponse.json({ error: "Требуется вход" }, { status: 401 });
  if (!isSameOrigin(request)) return NextResponse.json({ error: "Недопустимый запрос" }, { status: 403 });

  const { slug } = await params;
  const articles = await getCmsArticles();
  if (!articles.some((article) => article.slug === slug)) {
    return NextResponse.json({ error: "Статья не найдена" }, { status: 404 });
  }

  await deleteCmsArticle(slug);
  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  revalidatePath("/sitemap");
  revalidatePath("/sitemap.xml");
  return NextResponse.json({ ok: true });
}
