export type MobileHotspot = {
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  href?: string;
};

type MobileFrameOptions = {
  src: string;
  height: number;
  alt: string;
  eager?: boolean;
  hotspots?: MobileHotspot[];
  covers?: { x: number; y: number; width: number; height: number; color?: string }[];
  textPatches?: {
    x: number;
    y: number;
    width: number;
    height: number;
    text: string;
    color?: string;
    background?: string;
    fontFamily?: string;
    fontSize?: number;
    fontWeight?: number;
    lineHeight?: number;
    textAlign?: "left" | "center" | "right";
    textTransform?: "none" | "lowercase" | "uppercase";
  }[];
};

const escapeAttribute = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

export const mobileFigmaFrame = ({
  src,
  height,
  alt,
  eager = false,
  hotspots = [],
  covers = [],
  textPatches = [],
}: MobileFrameOptions) => {
  const patches = covers
    .map(
      (cover) =>
        `<span aria-hidden="true" style="position:absolute;left:${cover.x}px;top:${cover.y}px;width:${cover.width}px;height:${cover.height}px;background:${cover.color || "#FFF"};z-index:1"></span>`,
    )
    .join("");
  const labels = textPatches
    .map(
      (patch) =>
        `<span aria-hidden="true" style="position:absolute;left:${patch.x}px;top:${patch.y}px;width:${patch.width}px;height:${patch.height}px;display:flex;align-items:flex-start;justify-content:${patch.textAlign === "right" ? "flex-end" : patch.textAlign === "center" ? "center" : "flex-start"};background:${patch.background || "transparent"};color:${patch.color || "#FFF"};font-family:${patch.fontFamily || "Inter,sans-serif"};font-size:${patch.fontSize || 14}px;font-weight:${patch.fontWeight || 400};line-height:${patch.lineHeight || 1};text-align:${patch.textAlign || "left"};text-transform:${patch.textTransform || "none"};white-space:pre-line;z-index:2">${escapeAttribute(patch.text)}</span>`,
    )
    .join("");
  const links = hotspots
    .map(
      (spot) =>
        `<a href="${spot.href || "/#kontakty"}" aria-label="${escapeAttribute(spot.label)}" ` +
        `style="position:absolute;left:${spot.x}px;top:${spot.y}px;width:${spot.width}px;height:${spot.height}px;display:block;border-radius:999px;z-index:3"></a>`,
    )
    .join("");

  return `<div style="position:absolute;left:0;top:0;width:375px;height:${height}px;background:#1C1C1C;overflow:hidden">
    <img src="${src}" alt="${escapeAttribute(alt)}" width="750" height="${height * 2}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async" style="position:absolute;inset:0;width:375px;height:${height}px;display:block;object-fit:contain" />
    ${patches}
    ${labels}
    ${links}
  </div>`;
};
