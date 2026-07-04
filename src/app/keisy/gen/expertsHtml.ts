import IMGMAP from "./_imageMap.json";
/* Раздел «Кейсы / Experts» — 1:1 из Figma IAM-WEB,
   фрейм «Experts» #12354:2718 (1440×989, белый фон).
   Тексты дословно из макета. Фото недоступны (Figma API 429) —
   вместо каждой картинки серая заглушка #E5E3E0 с data-figma-node /
   data-image-ref; манифест для докачки: expertsHtml.images.json.
   Рендерится через BuilderBlock (масштаб от 1440). */

const GRAY = "#9A9895";
const DARK = "#1C1C1C";
const TXT = "#1F1F1F";
const PH = "#E5E3E0";
const IG_GRAD =
  "linear-gradient(180deg, rgba(255, 0, 197, 1) 0%, rgba(255, 0, 0, 1) 32%, rgba(255, 134, 0, 1) 67%, rgba(255, 202, 0, 1) 100%)";

/* Типографика из макета */
const crumb =
  "font-family:Inter,sans-serif;font-weight:500;font-size:23.42px;line-height:86%;letter-spacing:-0.05em;text-transform:uppercase;text-decoration:none;";
/* style_da66e122 — основной текст карточки */
const body = `font-family:Inter,sans-serif;font-weight:400;font-size:18.16px;line-height:104%;color:${TXT};white-space:pre-line;margin:0;`;
/* style_9f462e11 — серые подписи «Задача клиента:» и т.п. */
const label = `font-family:Inter,sans-serif;font-weight:600;font-size:14.94px;line-height:104%;text-transform:uppercase;color:${TXT};opacity:0.4;margin:0;`;
/* подпись-ник в пилюле */
const nick = (fs: number) =>
  `font-family:Inter,sans-serif;font-weight:500;font-size:${fs}px;line-height:86%;letter-spacing:-0.03em;color:#272727;white-space:nowrap;`;

const b = (s: string) => `<span style="font-weight:600">${s}</span>`;

/* Заглушка вместо картинки (фото скачать нельзя — лимит Figma API) */
const ph = (
  x: number,
  y: number,
  w: number,
  h: number,
  r: string,
  node: string,
  ref?: string,
) => {
  const _f = (IMGMAP as Record<string, string>)[node + "|" + (ref || "")];
  if (_f) return `<img src="/blk/keisy/${_f}" alt="" loading="lazy" style="position:absolute;left:${x}px;top:${y}px;width:${w}px;height:${h}px;${r ? `border-radius:${r};` : ""}object-fit:cover;" />`;
  return `<div style="position:absolute;left:${x}px;top:${y}px;width:${w}px;height:${h}px;background:${PH};${r ? `border-radius:${r};` : ""}" data-figma-node="${node}"${ref ? ` data-image-ref="${ref}"` : ""}></div>`;
};

/* Пилюля с ником аккаунта */
const pill = (
  x: number,
  y: number,
  w: number,
  h: number,
  fs: number,
  text: string,
) =>
  `<div style="position:absolute;left:${x}px;top:${y}px;width:${w}px;height:${h}px;border:0.76px solid #272727;border-radius:23px;background:#FFF;display:flex;align-items:center;justify-content:center;box-sizing:border-box;"><span style="${nick(fs)}">${text}</span></div>`;

export const expertsH = 989;

export const expertsHtml = `
<div style="position:relative;width:1440px;height:989px;background:#FFFFFF;overflow:hidden;">

  <!-- хлебные крошки -->
  <div style="position:absolute;left:65px;top:30px;display:flex;gap:13px;align-items:baseline;white-space:nowrap;font-family:Inter,sans-serif;font-weight:500;font-size:23.42px;line-height:1;letter-spacing:-0.05em;text-transform:uppercase;"><a href="/" style="color:#9A9895;text-decoration:none;">Главная</a><span style="color:#9A9895;">→</span><a href="/keisy" style="color:#9A9895;text-decoration:none;">Кейсы</a><span style="color:#9A9895;">→</span><span style="color:#1C1C1C;">Experts</span></div>

  <!-- ================= карточка кейса ================= -->
  <div style="position:absolute;left:65px;top:188px;width:1306px;height:683.78px;">

    <!-- белая карточка с обводкой -->
    <div style="position:absolute;left:0;top:0;width:734.07px;height:680.99px;background:#FFFFFF;border:1.4px solid #000000;border-radius:13.97px;box-sizing:border-box;"></div>

    <!-- аватар с инста-градиентным кольцом -->
    <div style="position:absolute;left:23.75px;top:30.03px;width:129.21px;height:145.28px;">
      <div style="position:absolute;left:2.1px;top:0;width:127.12px;height:127.12px;">
        <div style="position:absolute;left:-3.96px;top:-3.97px;width:135.23px;height:135.23px;border-radius:50%;background:${IG_GRAD};"></div>
        <img src="/blk/keisy/experts-01-69bd11.webp" alt="" loading="lazy" style="position:absolute;left:0.09px;top:0.09px;width:127.12px;height:127.12px;border-radius:50%;border:4.06px solid #FFFFFF;box-sizing:border-box;;object-fit:cover;" />
      </div>
      ${pill(0, 115.24, 129.21, 30.03, 15.25, "natalianaila")}
    </div>

    <!-- тексты карточки -->
    <div style="position:absolute;left:23.75px;top:216.52px;width:150.17px;${label}">Задача клиента:</div>
    <div style="position:absolute;left:23.75px;top:247.95px;width:368.78px;${body}">помощь в технической части ведения (монтаж рилс), написание сценариев для роликов, увеличение аудитории</div>

    <div style="position:absolute;left:23.75px;top:350.62px;width:150.17px;${label}">Что сделали:</div>
    <div style="position:absolute;left:23.75px;top:384.15px;width:19px;${body}">✅
✅
✅</div>
    <div style="position:absolute;left:53.78px;top:382.05px;width:381.35px;${body}">разработали ${b("SMM-стратегию")}
провели${b(" аудит ниши, конкурентов и ЦА")}
написали ${b("рубрикатор тем ")}для роликов, а также уникальные сценарии к ним</div>

    <div style="position:absolute;left:27.94px;top:522.44px;width:339.44px;height:136.89px;">
      <div style="position:absolute;left:0;top:0;width:293.35px;${label}">результат:</div>
      <div style="position:absolute;left:0;top:29.9px;width:18.16px;${body}">✅
✅
✅</div>
      <div style="position:absolute;left:30.03px;top:29.33px;width:309.41px;${body}">${b("×3 раза ")}просмотры рилс
${b("150k+ ")}просмотров за ролик
${b("+30%")} подписчиков за два месяца совместной работы</div>
    </div>

    <!-- скриншоты внутри карточки -->
    ${ph(178.1, 48.89, 284.97, 89.4, "", "12354:2904", "f29fa22051288bb61f6afa9ca8217c88d0332778")}
    ${ph(474.94, 23.05, 257.43, 57.34, "", "12354:2911", "f29fa22051288bb61f6afa9ca8217c88d0332778")}
    ${ph(476.34, 92.89, 241.66, 326.17, "7.4px", "12354:2906", "d872cd4b919666dbcaea9cbb76fbc6a2a324bbcf")}
    ${ph(477.04, 434.43, 240.96, 51.69, "6.98px", "12354:2907", "768e5d0497bd746faafd85b34d4c5eeb60f20afd")}
    ${ph(477.04, 494.5, 240.96, 51.69, "6.98px", "12354:2909", "768e5d0497bd746faafd85b34d4c5eeb60f20afd")}
    ${ph(477.04, 554.57, 240.96, 50.29, "6.98px", "12354:2908", "768e5d0497bd746faafd85b34d4c5eeb60f20afd")}
    ${ph(477.04, 613.24, 240.96, 48.89, "6.98px", "12354:2910", "768e5d0497bd746faafd85b34d4c5eeb60f20afd")}
    ${ph(473.55, 441.42, 115.37, 205.11, "6.98px", "12354:2905")}

    <!-- правая колонка: телефоны-скриншоты -->
    ${ph(744.54, 0, 274.39, 306.03, "6.98px", "12354:2913", "61ddf736ebdd41e60370c6cd78ddbf60a98c611c")}
    ${ph(744.54, 317.79, 274.39, 306.03, "6.98px", "12354:2914", "fda032595f2733534b5db38658faa434fc7cf9bb")}
    ${ph(744.54, 317.79, 274.39, 306.03, "6.98px", "12354:2916", "fda032595f2733534b5db38658faa434fc7cf9bb")}
    ${ph(744.54, 510.56, 274.49, 111.05, "6.98px", "12354:2918", "fda032595f2733534b5db38658faa434fc7cf9bb")}
    ${ph(1030.91, 0, 274.39, 306.03, "6.98px", "12354:2915", "fda032595f2733534b5db38658faa434fc7cf9bb")}
    ${ph(1030.91, 0, 274.39, 306.03, "6.98px", "12354:2917", "df5ff4f5001d6b7bc4a0fc456677fd7ebd02448d")}
    ${ph(1030.91, 192.77, 274.49, 111.05, "6.98px", "12354:2919", "df5ff4f5001d6b7bc4a0fc456677fd7ebd02448d")}
    ${ph(1031.61, 317.79, 274.39, 306.03, "6.98px", "12354:2922", "551397df9ea6e949b166513f2a4d22f5ca8302f1")}

    <!-- рамки поверх телефонов (обводка без заливки) -->
    <div style="position:absolute;left:744.54px;top:317.79px;width:274.39px;height:306.03px;border:1.4px solid #000000;border-radius:6.98px;box-sizing:border-box;"></div>
    <div style="position:absolute;left:1030.91px;top:0;width:274.39px;height:306.03px;border:1.4px solid #000000;border-radius:6.98px;box-sizing:border-box;"></div>

    <!-- белые плашки-подложки -->
    <div style="position:absolute;left:752.93px;top:500.09px;width:50.99px;height:20.25px;background:#FFFFFF;"></div>
    <div style="position:absolute;left:1039.29px;top:182.29px;width:50.99px;height:20.25px;background:#FFFFFF;"></div>
    <div style="position:absolute;left:1040.69px;top:177.41px;width:154.36px;height:26.54px;background:#FFFFFF;"></div>

    <!-- подпись под сеткой -->
    <div style="position:absolute;left:882.84px;top:642.57px;width:271.7px;font-family:Coolvetica,sans-serif;font-weight:400;font-size:22.45px;line-height:104%;text-align:center;color:#221F20;margin:0;">+25 проектов с экспертами из разных областей</div>

    <!-- мелкие иконки-ссылки на аккаунты -->
    ${ph(77.53, 170.42, 23.05, 21.51, "", "12354:2926")}
    <a href="https://www.instagram.com/sergei_yanchenko_?igsh=eG51djd6eHdlYnRs" target="_blank" rel="noopener" style="position:absolute;left:773.88px;top:64.26px;width:13.97px;height:13.04px;">${ph(0, 0, 13.97, 13.04, "2.91px", "12354:2932")}</a>
    <a href="https://www.instagram.com/kaufman_project?igsh=MWV6OXZicnJvaThjMQ==" target="_blank" rel="noopener" style="position:absolute;left:1065.13px;top:64.26px;width:13.97px;height:13.04px;">${ph(0, 0, 13.97, 13.04, "2.91px", "12354:2938")}</a>
    <a href="https://www.instagram.com/beisembaeva_makeup?igsh=MXFzZzMwbnIzOXN4bg==" target="_blank" rel="noopener" style="position:absolute;left:776.67px;top:383.45px;width:13.97px;height:13.04px;border:0.42px solid #000000;border-radius:2.91px;background:#FFFFFF;box-sizing:border-box;">${ph(2.99, 2.53, 7.76, 7.76, "", "12354:2947")}</a>
    <a href="https://www.instagram.com/yana.yankovich?igsh=MnMzOWZ5NjJpZmho" target="_blank" rel="noopener" style="position:absolute;left:1060.94px;top:387.64px;width:13.97px;height:13.04px;">${ph(0, 0, 13.97, 13.04, "2.91px", "12354:2954")}</a>

  </div>

</div>`;
