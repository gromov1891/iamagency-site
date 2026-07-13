/* Универсальная обёртка для блоков из Builder.io (Figma→HTML).
   Нативный холст w×h (по умолчанию 1440×1024) масштабируется под ширину контейнера.
   Для планшета передаём w=768, для мобайла w=375. */
export default function BuilderBlock({
  html,
  w = 1440,
  h = 1024,
  overflow = "visible",
}: {
  html: string;
  w?: number;
  h?: number;
  overflow?: "hidden" | "visible";
}) {
  const optimizedHtml = html.replace(
    /<img(?![^>]*\bloading=)/g,
    '<img loading="lazy" decoding="async"'
  );

  return (
    <div
      className="relative w-full"
      style={{ aspectRatio: `${w} / ${h}`, overflow, containerType: "inline-size" }}
    >
      <div
        style={{
          width: w,
          height: h,
          position: "absolute",
          top: 0,
          left: 0,
          transformOrigin: "top left",
          transform: `scale(calc(100cqw / ${w}px))`,
        }}
        dangerouslySetInnerHTML={{ __html: optimizedHtml }}
      />
    </div>
  );
}
