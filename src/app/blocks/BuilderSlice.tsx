import { enrichImageAlts } from "./imageAlt";

export type BuilderSliceSpec = { x: number; y: number; w: number; h: number };

export default function BuilderSlice({ html, sourceW = 1440, sourceH, slice }: {
  html: string;
  sourceW?: number;
  sourceH: number;
  slice: BuilderSliceSpec;
}) {
  const optimizedHtml = enrichImageAlts(html).replace(
    /<img(?![^>]*\bloading=)/g,
    '<img loading="lazy" decoding="async"',
  );

  return (
    <div style={{ position: "relative", width: "100%", aspectRatio: `${slice.w} / ${slice.h}`, overflow: "hidden", containerType: "inline-size", background: "#fff" }}>
      <div
        suppressHydrationWarning
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: sourceW,
          height: sourceH,
          transform: `scale(calc(100cqw / ${slice.w}px)) translate(${-slice.x}px, ${-slice.y}px)`,
          transformOrigin: "top left",
        }}
        dangerouslySetInnerHTML={{ __html: optimizedHtml }}
      />
    </div>
  );
}
