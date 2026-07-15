"use client";

import Image from "next/image";
import { useEffect, useMemo, useState, type ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import {
  FiChevronDown,
  FiChevronUp,
  FiDownload,
  FiEdit3,
  FiExternalLink,
  FiFileText,
  FiImage,
  FiLogOut,
  FiPlus,
  FiSave,
  FiTrash2,
  FiUploadCloud,
} from "react-icons/fi";
import { BLOG_TAGS, type ArticleSection, type BlogTag } from "@/app/blog/articles";
import styles from "../admin.module.css";

type Status = "draft" | "published";
type CmsArticle = {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  tags: BlogTag[];
  sections: ArticleSection[];
  status: Status;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
};

const emptySection = (): ArticleSection => ({ heading: "", paragraphs: [""] });
const emptyArticle = (): CmsArticle => ({
  slug: "",
  title: "",
  excerpt: "",
  image: "",
  imageAlt: "",
  tags: [],
  sections: [emptySection()],
  status: "draft",
});

const translit: Record<string, string> = {
  а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "e", ж: "zh", з: "z", и: "i", й: "y",
  к: "k", л: "l", м: "m", н: "n", о: "o", п: "p", р: "r", с: "s", т: "t", у: "u", ф: "f",
  х: "h", ц: "ts", ч: "ch", ш: "sh", щ: "sch", ъ: "", ы: "y", ь: "", э: "e", ю: "yu", я: "ya",
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .split("")
    .map((letter) => translit[letter] ?? letter)
    .join("")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 100);
}

async function prepareImage(file: File) {
  if (!file.type.startsWith("image/")) throw new Error("Выберите изображение");
  const bitmap = await createImageBitmap(file);
  const maxSide = 2000;
  const scale = Math.min(1, maxSide / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Не удалось обработать изображение");
  context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();
  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/webp", 0.84));
  if (!blob) throw new Error("Не удалось конвертировать изображение");
  return new File([blob], `${file.name.replace(/\.[^.]+$/, "")}.webp`, { type: "image/webp" });
}

export default function CmsEditor({ user }: { user: string }) {
  const router = useRouter();
  const [articles, setArticles] = useState<CmsArticle[]>([]);
  const [form, setForm] = useState<CmsArticle>(emptyArticle);
  const [originalSlug, setOriginalSlug] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState("");
  const [notice, setNotice] = useState<{ type: "ok" | "error"; text: string } | null>(null);

  async function loadArticles(selectSlug?: string) {
    const response = await fetch("/api/admin/articles", { cache: "no-store" });
    if (response.status === 401) {
      router.replace("/admin");
      return;
    }
    const data = await response.json();
    setArticles(data.articles || []);
    if (selectSlug) {
      const selected = (data.articles || []).find((item: CmsArticle) => item.slug === selectSlug);
      if (selected) selectArticle(selected);
    }
    setLoading(false);
  }

  useEffect(() => {
    // The request resolves asynchronously; this effect only starts the external synchronization.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void loadArticles();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const selectedArticle = useMemo(
    () => articles.find((article) => article.slug === originalSlug),
    [articles, originalSlug]
  );

  function selectArticle(article: CmsArticle) {
    setForm(JSON.parse(JSON.stringify(article)) as CmsArticle);
    setOriginalSlug(article.slug);
    setSlugTouched(true);
    setNotice(null);
  }

  function createNew() {
    setForm(emptyArticle());
    setOriginalSlug("");
    setSlugTouched(false);
    setNotice(null);
  }

  function update<K extends keyof CmsArticle>(key: K, value: CmsArticle[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function updateTitle(title: string) {
    setForm((current) => ({ ...current, title, slug: slugTouched ? current.slug : slugify(title) }));
  }

  function updateSection(index: number, patch: Partial<ArticleSection>) {
    update("sections", form.sections.map((section, sectionIndex) => sectionIndex === index ? { ...section, ...patch } : section));
  }

  function moveSection(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= form.sections.length) return;
    const sections = [...form.sections];
    [sections[index], sections[target]] = [sections[target], sections[index]];
    update("sections", sections);
  }

  async function upload(file: File, target: "cover" | number) {
    const key = target === "cover" ? "cover" : `section-${target}`;
    setUploading(key);
    setNotice(null);
    try {
      const prepared = await prepareImage(file);
      const body = new FormData();
      body.append("file", prepared);
      const response = await fetch("/api/admin/upload", { method: "POST", body });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Не удалось загрузить изображение");
      if (target === "cover") update("image", result.url);
      else updateSection(target, { image: result.url });
      setNotice({ type: "ok", text: "Изображение загружено и оптимизировано в WebP" });
    } catch (error) {
      setNotice({ type: "error", text: error instanceof Error ? error.message : "Ошибка загрузки" });
    } finally {
      setUploading("");
    }
  }

  async function save(status: Status) {
    setSaving(true);
    setNotice(null);
    const response = await fetch("/api/admin/articles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ originalSlug, article: { ...form, status } }),
    });
    const result = await response.json();
    setSaving(false);
    if (!response.ok) {
      setNotice({ type: "error", text: result.error || "Не удалось сохранить статью" });
      return;
    }
    setNotice({ type: "ok", text: status === "published" ? "Статья опубликована" : "Черновик сохранён" });
    await loadArticles(result.article.slug);
  }

  async function removeArticle() {
    if (!originalSlug || !window.confirm(`Удалить статью «${form.title}»?`)) return;
    const response = await fetch(`/api/admin/articles/${encodeURIComponent(originalSlug)}`, { method: "DELETE" });
    const result = await response.json();
    if (!response.ok) {
      setNotice({ type: "error", text: result.error || "Не удалось удалить статью" });
      return;
    }
    createNew();
    await loadArticles();
    setNotice({ type: "ok", text: "Статья удалена" });
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin");
    router.refresh();
  }

  return (
    <main className={styles.cmsPage}>
      <header className={styles.cmsTopbar}>
        <div>
          <span className={styles.cmsMark}>IAM</span>
          <div><strong>CMS блога</strong><span>Менеджер: {user}</span></div>
        </div>
        <div className={styles.topbarActions}>
          <a href="/api/admin/leads/export" className={styles.iconTextButton}><FiDownload />Валидные лиды</a>
          <a href="/blog" target="_blank" rel="noreferrer" className={styles.iconTextButton}><FiExternalLink />Открыть блог</a>
          <button type="button" className={styles.iconButton} onClick={logout} title="Выйти"><FiLogOut /><span className="sr-only">Выйти</span></button>
        </div>
      </header>

      <div className={styles.cmsWorkspace}>
        <aside className={styles.articleSidebar}>
          <div className={styles.sidebarHeader}>
            <div><span>Материалы</span><strong>{articles.length}</strong></div>
            <button type="button" className={styles.iconButtonDark} onClick={createNew} title="Новая статья"><FiPlus /><span className="sr-only">Новая статья</span></button>
          </div>
          <div className={styles.articleList}>
            {loading && <p className={styles.muted}>Загружаем статьи…</p>}
            {!loading && articles.length === 0 && <p className={styles.emptyAdmin}>Пока нет материалов. Создайте первую статью.</p>}
            {articles.map((article) => (
              <button
                type="button"
                key={article.slug}
                className={`${styles.articleListItem} ${article.slug === originalSlug ? styles.articleListItemActive : ""}`}
                onClick={() => selectArticle(article)}
              >
                <span className={article.status === "published" ? styles.statusPublished : styles.statusDraft}>
                  {article.status === "published" ? "Опубликовано" : "Черновик"}
                </span>
                <strong>{article.title}</strong>
                <small>{article.updatedAt ? new Date(article.updatedAt).toLocaleDateString("ru-RU") : "Новая"}</small>
              </button>
            ))}
          </div>
        </aside>

        <section className={styles.editorPane}>
          <div className={styles.editorHeader}>
            <div>
              <p>{originalSlug ? "Редактирование" : "Новая статья"}</p>
              <h1>{form.title || "Без названия"}</h1>
            </div>
            <div className={styles.editorActions}>
              {selectedArticle?.status === "published" && (
                <a href={`/blog/${selectedArticle.slug}`} target="_blank" rel="noreferrer" className={styles.iconButton} title="Открыть статью"><FiExternalLink /><span className="sr-only">Открыть статью</span></a>
              )}
              {originalSlug && <button type="button" data-testid="delete-article" className={styles.dangerIconButton} onClick={removeArticle} title="Удалить"><FiTrash2 /><span className="sr-only">Удалить</span></button>}
            </div>
          </div>

          {notice && <div className={notice.type === "ok" ? styles.noticeOk : styles.noticeError} role="status">{notice.text}</div>}

          <div className={styles.editorForm}>
            <section className={styles.formSection}>
              <div className={styles.formSectionTitle}><FiEdit3 /><div><h2>Основное</h2><p>Название, адрес и описание карточки</p></div></div>
              <div className={styles.twoColumns}>
                <label className={styles.fieldWide}><span>Название статьи</span><input data-testid="article-title" value={form.title} onChange={(event) => updateTitle(event.target.value)} maxLength={180} placeholder="Например: Как оформить соцсети бизнеса" /></label>
                <label><span>Адрес страницы</span><div className={styles.slugField}><span>/blog/</span><input data-testid="article-slug" value={form.slug} onChange={(event) => { setSlugTouched(true); update("slug", slugify(event.target.value)); }} placeholder="adres-stati" /></div></label>
                <label className={styles.fieldWide}><span>Краткое описание</span><textarea data-testid="article-excerpt" value={form.excerpt} onChange={(event) => update("excerpt", event.target.value)} rows={3} maxLength={500} placeholder="Два-три предложения для карточки статьи и поисковых систем" /><small>{form.excerpt.length}/500</small></label>
              </div>
            </section>

            <section className={styles.formSection}>
              <div className={styles.formSectionTitle}><FiImage /><div><h2>Обложка</h2><p>Автоматически уменьшим и переведём в WebP</p></div></div>
              <div className={styles.coverEditor}>
                <label className={styles.uploadArea}>
                  {form.image ? <Image src={form.image} alt="Предпросмотр обложки" fill sizes="320px" /> : <><FiUploadCloud /><strong>Загрузить обложку</strong><span>JPG, PNG или WebP</span></>}
                  <input data-testid="cover-upload" type="file" accept="image/jpeg,image/png,image/webp" onChange={(event) => event.target.files?.[0] && void upload(event.target.files[0], "cover")} />
                  {uploading === "cover" && <span className={styles.uploading}>Обрабатываем…</span>}
                </label>
                <label><span>Alt-текст для SEO</span><textarea data-testid="cover-alt" value={form.imageAlt} onChange={(event) => update("imageAlt", event.target.value)} rows={4} maxLength={240} placeholder="Опишите, что изображено и как это связано с SMM-агентством" /></label>
              </div>
            </section>

            <section className={styles.formSection}>
              <div className={styles.formSectionTitle}><FiFileText /><div><h2>Хэштеги</h2><p>Используются в фильтрах блога</p></div></div>
              <div className={styles.tagPicker}>
                {BLOG_TAGS.map((tag) => {
                  const selected = form.tags.includes(tag);
                  return <button type="button" data-testid={`tag-${tag}`} key={tag} className={selected ? styles.tagSelected : styles.tagOption} onClick={() => update("tags", selected ? form.tags.filter((item) => item !== tag) : [...form.tags, tag])}>#{tag}<span>{selected ? "−" : "+"}</span></button>;
                })}
              </div>
            </section>

            <section className={styles.formSection}>
              <div className={styles.formSectionTitle}><FiFileText /><div><h2>Содержание</h2><p>Соберите статью из последовательных блоков</p></div></div>
              <div className={styles.sectionsList}>
                {form.sections.map((section, index) => (
                  <div className={styles.contentBlock} key={index}>
                    <div className={styles.blockToolbar}>
                      <strong>Блок {String(index + 1).padStart(2, "0")}</strong>
                      <div>
                        <button type="button" onClick={() => moveSection(index, -1)} disabled={index === 0} title="Поднять"><FiChevronUp /></button>
                        <button type="button" onClick={() => moveSection(index, 1)} disabled={index === form.sections.length - 1} title="Опустить"><FiChevronDown /></button>
                        <button type="button" onClick={() => update("sections", form.sections.filter((_, itemIndex) => itemIndex !== index))} disabled={form.sections.length === 1} title="Удалить блок"><FiTrash2 /></button>
                      </div>
                    </div>
                    <label><span>Подзаголовок, если нужен</span><input data-testid={`section-heading-${index}`} value={section.heading || ""} onChange={(event) => updateSection(index, { heading: event.target.value })} placeholder="Подзаголовок H2" /></label>
                    <label><span>Текст</span><textarea data-testid={`section-text-${index}`} value={(section.paragraphs || []).join("\n\n")} onChange={(event) => updateSection(index, { paragraphs: event.target.value.split(/\n\s*\n/).filter(Boolean) })} rows={7} placeholder="Разделяйте абзацы пустой строкой" /></label>
                    <label><span>Маркированный список, по одному пункту в строке</span><textarea value={(section.bullets || []).join("\n")} onChange={(event) => updateSection(index, { bullets: event.target.value.split("\n").map((item) => item.trim()).filter(Boolean) })} rows={3} placeholder="Первый пункт&#10;Второй пункт" /></label>
                    <div className={styles.inlineImageEditor}>
                      {section.image && <div className={styles.inlineImagePreview}><Image src={section.image} alt="" fill sizes="240px" /></div>}
                      <label className={styles.smallUploadButton}><FiUploadCloud />{section.image ? "Заменить изображение" : "Добавить изображение"}<input data-testid={`section-upload-${index}`} type="file" accept="image/jpeg,image/png,image/webp" onChange={(event: ChangeEvent<HTMLInputElement>) => event.target.files?.[0] && void upload(event.target.files[0], index)} /></label>
                      {uploading === `section-${index}` && <span className={styles.muted}>Обрабатываем…</span>}
                      {section.image && <button type="button" className={styles.textDanger} onClick={() => updateSection(index, { image: undefined, imageAlt: undefined, caption: undefined })}>Убрать</button>}
                    </div>
                    {section.image && <div className={styles.twoColumns}><label><span>Alt-текст изображения</span><input data-testid={`section-alt-${index}`} value={section.imageAlt || ""} onChange={(event) => updateSection(index, { imageAlt: event.target.value })} /></label><label><span>Подпись, если нужна</span><input value={section.caption || ""} onChange={(event) => updateSection(index, { caption: event.target.value })} /></label></div>}
                  </div>
                ))}
              </div>
              <button type="button" className={styles.addBlockButton} onClick={() => update("sections", [...form.sections, emptySection()])}><FiPlus />Добавить блок</button>
            </section>
          </div>

          <footer className={styles.saveBar}>
            <div><span className={form.status === "published" ? styles.statusPublished : styles.statusDraft}>{form.status === "published" ? "Опубликовано" : "Черновик"}</span><small>Изменения попадут на сайт сразу после публикации</small></div>
            <div>
              <button type="button" className={styles.secondaryButton} disabled={saving || !!uploading} onClick={() => void save("draft")}><FiSave />Сохранить черновик</button>
              <button type="button" data-testid="publish-article" className={styles.publishButton} disabled={saving || !!uploading} onClick={() => void save("published")}><FiUploadCloud />{saving ? "Сохраняем…" : "Опубликовать"}</button>
            </div>
          </footer>
        </section>
      </div>
    </main>
  );
}
