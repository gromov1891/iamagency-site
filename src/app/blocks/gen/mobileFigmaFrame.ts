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
}: MobileFrameOptions) => {
  const patches = covers
    .map(
      (cover) =>
        `<span aria-hidden="true" style="position:absolute;left:${cover.x}px;top:${cover.y}px;width:${cover.width}px;height:${cover.height}px;background:${cover.color || "#FFF"};z-index:1"></span>`,
    )
    .join("");
  const links = hotspots
    .map(
      (spot) =>
        `<a href="${spot.href || "/#kontakty"}" aria-label="${escapeAttribute(spot.label)}" ` +
        `style="position:absolute;left:${spot.x}px;top:${spot.y}px;width:${spot.width}px;height:${spot.height}px;display:block;border-radius:999px;z-index:2"></a>`,
    )
    .join("");

  return `<div style="position:absolute;left:0;top:0;width:375px;height:${height}px;background:#1C1C1C;overflow:hidden">
    <img src="${src}" alt="${escapeAttribute(alt)}" width="750" height="${height * 2}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async" style="position:absolute;inset:0;width:375px;height:${height}px;display:block;object-fit:contain" />
    ${patches}
    ${links}
  </div>`;
};
