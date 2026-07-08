import BuilderBlock from "./BuilderBlock";

/* Показывает нужный холст по ширине экрана: десктоп (1440) > 900px,
   планшет (768) 600–900px, мобайл (375) < 600px. Переключение чисто через CSS
   (все в разметке, лишние скрыты) — без сдвига layout и без JS.
   mobileHtml опционален: если его нет, планшетный холст показывается и на мобайле. */
export default function ResponsiveBlock({
  desktopHtml,
  desktopH,
  tabletHtml,
  tabletH,
  mobileHtml,
  mobileH,
  overflow = "visible",
}: {
  desktopHtml: string;
  desktopH: number;
  tabletHtml: string;
  tabletH: number;
  mobileHtml?: string;
  mobileH?: number;
  overflow?: "hidden" | "visible";
}) {
  return (
    <>
      <div className="rb-desktop">
        <BuilderBlock html={desktopHtml} w={1440} h={desktopH} overflow={overflow} />
      </div>
      <div className={mobileHtml ? "rb-tablet rb-has-mobile" : "rb-tablet"}>
        <BuilderBlock html={tabletHtml} w={768} h={tabletH} overflow={overflow} />
      </div>
      {mobileHtml ? (
        <div className="rb-mobile">
          <BuilderBlock html={mobileHtml} w={375} h={mobileH ?? tabletH} overflow={overflow} />
        </div>
      ) : null}
    </>
  );
}
