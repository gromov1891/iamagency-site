import BuilderBlock from "./BuilderBlock";

/* Показывает десктоп-холст (1440) на широких экранах и планшетный холст (768)
   на узких. Переключение чисто через CSS (оба в разметке, один скрыт) —
   без сдвига layout и без JS. Точка перелома — 900px (см. globals.css). */
export default function ResponsiveBlock({
  desktopHtml,
  desktopH,
  tabletHtml,
  tabletH,
  overflow = "hidden",
}: {
  desktopHtml: string;
  desktopH: number;
  tabletHtml: string;
  tabletH: number;
  overflow?: "hidden" | "visible";
}) {
  return (
    <>
      <div className="rb-desktop">
        <BuilderBlock html={desktopHtml} h={desktopH} overflow={overflow} />
      </div>
      <div className="rb-tablet">
        <BuilderBlock html={tabletHtml} h={tabletH} overflow={overflow} />
      </div>
    </>
  );
}
