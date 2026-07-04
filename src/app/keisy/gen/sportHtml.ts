import IMGMAP from "./_imageMap.json";
/* Страница «Кейсы», раздел Sport & Education — 1:1 из Figma IAM-WEB,
   фрейм «Sport & Education» #12354:2457 (1440×1813, белый фон #FFFFFF).
   Тексты дословно из макета. Фото недоступны (Figma API 429) —
   вместо каждой картинки серая заглушка #E5E3E0 с data-figma-node /
   data-image-ref (манифест: sportHtml.images.json). */

const INK = "#1F1F1F";
const GRAY = "#9A9895";
const PH = "#E5E3E0";
const RING =
  "linear-gradient(180deg,#FF00C5 0%,#FF0000 32%,#FF8600 67%,#FFCA00 100%)";

/* Типографика из макета */
const crumb =
  "font-family:Inter,sans-serif;font-weight:500;font-size:23.42px;line-height:86%;letter-spacing:-0.05em;text-transform:uppercase;text-decoration:none;";
const body20 = `font-family:Inter,sans-serif;font-weight:400;font-size:20.62px;line-height:104%;color:${INK};white-space:pre-line;margin:0;`;
const label17 = `font-family:Inter,sans-serif;font-weight:600;font-size:16.96px;line-height:104%;text-transform:uppercase;color:${INK};opacity:0.4;margin:0;`;
const small7 = `font-family:Inter,sans-serif;font-weight:600;font-size:7.43px;line-height:104%;text-transform:uppercase;color:${INK};margin:0;`;
const small8 = `font-family:Inter,sans-serif;font-weight:600;font-size:8.42px;line-height:104%;text-transform:uppercase;color:${INK};margin:0;`;
const big67 =
  "font-family:Coolvetica,sans-serif;font-weight:400;font-size:67.52px;line-height:86%;color:#221F20;margin:0;";
const cool22 =
  "font-family:Coolvetica,sans-serif;font-weight:400;font-size:22.56px;line-height:104%;text-align:center;color:#221F20;margin:0;";

/* ts7 в макете = Semi Bold; ts18 = мелкий кегль 14.27px */
const b = (s: string) => `<span style="font-weight:600">${s}</span>`;
const s18 = (s: string) => `<span style="font-size:14.27px">${s}</span>`;

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

const card = (x: number, y: number, w: number, h: number, r: number) =>
  `<div style="position:absolute;left:${x}px;top:${y}px;width:${w}px;height:${h}px;background:#FFF;border:1.4px solid #000;border-radius:${r}px;box-sizing:border-box"></div>`;

const avatar = (
  x: number,
  y: number,
  d: number,
  ring: number,
  node: string,
  ref?: string,
) => {
  const ring_div = `<div style="position:absolute;left:${x - ring}px;top:${y - ring}px;width:${d + 2 * ring}px;height:${d + 2 * ring}px;border-radius:50%;background:${RING}"></div>`;
  const _f = (IMGMAP as Record<string, string>)[node + "|" + (ref || "")];
  const inner = _f
    ? `<img src="/blk/keisy/${_f}" alt="" loading="lazy" style="position:absolute;left:${x}px;top:${y}px;width:${d}px;height:${d}px;border-radius:50%;object-fit:cover;border:4px solid #FFF;box-sizing:border-box" />`
    : `<div style="position:absolute;left:${x}px;top:${y}px;width:${d}px;height:${d}px;border-radius:50%;background:${PH};border:4px solid #FFF;box-sizing:border-box" data-figma-node="${node}"></div>`;
  return ring_div + inner;
};

const pill = (
  x: number,
  y: number,
  w: number,
  h: number,
  fs: number,
  text: string,
  href?: string,
) => {
  const st = `position:absolute;left:${x}px;top:${y}px;width:${w}px;height:${h}px;display:flex;align-items:center;justify-content:center;background:#FFF;border:0.77px solid #272727;border-radius:${h / 2}px;box-sizing:border-box;font-family:Inter,sans-serif;font-weight:500;font-size:${fs}px;line-height:86%;letter-spacing:-0.03em;color:#272727;text-decoration:none;white-space:nowrap;`;
  return href
    ? `<a href="${href}" target="_blank" rel="noopener" style="${st}">${text}</a>`
    : `<div style="${st}">${text}</div>`;
};

export const sportHtml = `
<div style="position:relative;width:1440px;height:1813px;background:#FFFFFF;overflow:hidden;">

  <!-- хлебные крошки -->
  <div style="position:absolute;left:65px;top:30px;display:flex;gap:13px;align-items:baseline;white-space:nowrap;font-family:Inter,sans-serif;font-weight:500;font-size:23.42px;line-height:1;letter-spacing:-0.05em;text-transform:uppercase;"><a href="/" style="color:#9A9895;text-decoration:none;">Главная</a><span style="color:#9A9895;">→</span><a href="/keisy" style="color:#9A9895;text-decoration:none;">Кейсы</a><span style="color:#9A9895;">→</span><span style="color:#1C1C1C;">Sport &amp; Education</span></div>

  <!-- плашка «Кейс К1» -->
  <div style="position:absolute;left:65px;top:128px;width:281px;height:68px;">
    <div style="position:absolute;left:0;top:0;width:281px;height:68px;background:#1C1C1C;border-radius:84.17px;"></div>
    <span style="position:absolute;left:27.21px;top:13.6px;font-family:Inter,sans-serif;font-weight:400;font-size:47.4px;line-height:86%;letter-spacing:-0.05em;text-transform:uppercase;color:#FFF;white-space:nowrap;">Кейс К1 </span>
    <div style="position:absolute;left:219px;top:6px;width:55.27px;height:55.27px;border-radius:50%;background:#FFF;box-shadow:inset 0 0 3.4px 3.4px rgba(144,190,233,1);"></div>
    ${ph(228.35, 15.35, 36.56, 36.56, "0", "12354:2596")}
  </div>

  <!-- карточка «Задача клиента / Что сделали / результат» -->
  <div style="position:absolute;left:68px;top:238px;width:475px;height:603.47px;">
    <p style="position:absolute;left:3.17px;top:0;width:170.49px;${label17}">Задача клиента:</p>
    <p style="position:absolute;left:3.17px;top:38.06px;width:418.7px;${body20}">Вывести проект на новую площадку, обновить фирменный стиль, повысить посещаемость групп</p>
    <p style="position:absolute;left:3.17px;top:149.08px;width:170.49px;${label17}">Что сделали:</p>
    <p style="position:absolute;left:3.17px;top:187.15px;width:21px;${body20}">✅
✅</p>
    <p style="position:absolute;left:37.27px;top:184.77px;width:394.12px;${body20}">разработали ${b("визуальную концепцию")}
прописали ${b("план продвижения")} для двух социальных сетей</p>
    <div style="position:absolute;left:0;top:305.3px;width:475px;height:298.16px;">
      <div style="position:absolute;left:0;top:0;width:475px;height:298.16px;border:1.59px solid #000;border-radius:15.86px;box-sizing:border-box;"></div>
      <p style="position:absolute;left:23.79px;top:27.76px;width:333.06px;${label17}">результат:</p>
      <p style="position:absolute;left:23.79px;top:61.85px;width:20.62px;${body20}">✅
✅
✅</p>
      <p style="position:absolute;left:57.89px;top:61.06px;width:403.63px;${body20}">${b("2000+")} органической и живой аудитории с нуля
${b("×2")} аудитории в ВКонтакте
${b("100%")} заполняемости групп на все виды направлений
${s18("путем кросс-постинга и EGC-контента (совместных публикаций с тренерами школы) и создания вирусных рилс, посевов и настройки таргетированной рекламы, работа с Яндекс картами и обновления банеров для контекстной рекламы")}</p>
    </div>
  </div>

  <!-- коллаж К1 -->
  <div style="position:absolute;left:609px;top:216px;width:765px;height:620.57px;">
    ${avatar(6.27, 0.08, 112.67, 3.6, "12354:2616", "0d45c25a0817867c07217ae5d5cf92ca02de885b")}
    ${pill(4.33, 104.62, 114.53, 26.62, 13.51, "k1.pushkin")}
    ${ph(0, 148.57, 187.42, 41.65, "0", "12354:2619", "0d45c25a0817867c07217ae5d5cf92ca02de885b")}
    ${ph(438.29, 8.05, 81.72, 21.05, "0", "12354:2620", "83578a41f63d65180c9c486b7eb2ea4f738e6585")}
    ${ph(386.29, 37.14, 197.73, 353.65, "6.19px", "12354:2621", "5febf7e457143c09019f76005dca73d4a761c013")}
    ${ph(4.33, 223.48, 179.6, 239.47, "6.56px", "12354:2622", "5e65a11b7edfc97b1e0ff42076c4b701547025e1")}
    ${ph(198.1, 223.48, 179.6, 239.47, "6.56px", "12354:2623", "c77922bd1915eee0119eaeeaa646d52a388fcdc0")}
    <p style="position:absolute;left:4.33px;top:208.62px;width:55.72px;${small7}">До:</p>
    <p style="position:absolute;left:198.1px;top:208.62px;width:89.14px;${small7}">после:</p>
    ${ph(6.19, 471.72, 247.8, 145.99, "6.19px", "12354:2626", "20ddbd5a4c36e428f7ff9b31d1e3eaaa3ba229b6")}
    ${ph(156, 6.19, 225.35, 133.09, "0", "12354:2627", "01fc79b18cc4a08cdabc212240d98fca2c07717a")}
    ${ph(198.1, 154.76, 184.4, 43.35, "0", "12354:2628", "7e012a61477ebba1a5fc0bddb40fc889781f5802")}
    ${ph(390.01, 397.43, 193.79, 146.08, "6.19px", "12354:2629", "b5618262731d4d0f92099a3ba8bb6260a130c0b4")}
    ${ph(386.29, 572.63, 196.97, 37.24, "0", "12354:2630", "599e7521c46a22f3b89ee9a46798a7b92063e1bf")}
    ${ph(294.67, 470.48, 82.92, 149.87, "6.19px", "12354:2631", "41175df785c451747f05adbd10ed014a00906da8")}
    ${ph(256.91, 471.72, 35.29, 148.57, "6.19px", "12354:2632", "2d9fca92111e7fa1c9576ddf0f0ac9747237919a")}
    ${ph(594.91, 8.05, 170.09, 302.38, "6.19px", "12354:2633", "4c60326838f8d3904a487493dcbee13d41666af5")}
    ${ph(594.91, 318.2, 170.09, 302.38, "6.19px", "12354:2634", "7de6df9bfa2fbd62845b70a91ab992b779c219be")}
  </div>

  <!-- 2-й ряд: mil_grad + «и ещё 10+» -->
  <div style="position:absolute;left:65px;top:989px;width:1310px;height:684.49px;">
    ${card(0, 0, 1029.89, 684.49, 14.04)}
    ${ph(475.98, 443.69, 115.97, 206.16, "7.02px", "12354:2637")}
    ${ph(761.01, 457.03, 158.56, 210.74, "7.26px", "12354:2638")}
    ${avatar(32.38, 19.75, 127.77, 4, "12354:2643", "a73e94c8513367dde52fe4bea3c03174488efa69")}
    ${pill(37.2, 138.3, 115.84, 30.19, 15.32, "mil_grad", "https://www.instagram.com/mil_grad?igsh=MThka3ZrbmplNnZlYw==")}
    ${ph(25.27, 193.06, 201.03, 51.19, "0", "12354:2646", "7c6993839c223e1c53dc0c00676dab8e04ace7dc")}
    ${ph(768.03, 40.01, 81.6, 21.02, "0", "12354:2647", "83578a41f63d65180c9c486b7eb2ea4f738e6585")}
    ${ph(814.36, 84.95, 183.82, 328.76, "7.02px", "12354:2648", "5b176040863f87e3326b248b28dbbaacdfe77bd5")}
    ${ph(625.51, 84.95, 183.27, 327.78, "7.02px", "12354:2649", "21439a049a3cb804abc9ed50202fa0ba8f254c7e")}
    ${ph(25.27, 285.73, 279.5, 372.66, "7.44px", "12354:2650", "9aaa8e4b2319450257eb8e56cb8b9d7c62526c86")}
    ${ph(327.15, 285.73, 279.5, 372.66, "7.44px", "12354:2651", "2c412c246c4f0a2fa92cc47c5aaf99cd67bdee8b")}
    <p style="position:absolute;left:625.51px;top:68.1px;width:60.38px;${small8}">До:</p>
    <p style="position:absolute;left:326.45px;top:261.86px;width:139px;${small8}">после:</p>
    <p style="position:absolute;left:25.98px;top:261.86px;width:138.3px;${small8}">до:</p>
    <p style="position:absolute;left:817.17px;top:68.1px;width:97.58px;${small8}">после:</p>
    ${ph(212.72, 33, 232.68, 137.42, "0", "12354:2656", "f1dc15023b11ea3050bfaba161b0b62b7e50887f")}
    ${ph(249.92, 179.02, 198.23, 51.88, "0", "12354:2657", "2f0e501dadefacf0f8ec8640a8f6e235bd39e5a7")}
    ${ph(466.85, 24.57, 131.29, 237.28, "7.02px", "12354:2658", "2faba69556f4d117e99db4a86ea15be4f7fba60d")}
    ${ph(625.51, 435.96, 123, 222.29, "7.02px", "12354:2659", "e52ae0fa88ae14f9e0296b46799495808181920f")}
    ${ph(876.14, 435.96, 123, 222.29, "7.02px", "12354:2660", "b4bb1c75ba1abf60f5ba4f2f8fbf5cb670e68065")}
    ${ph(750.48, 435.96, 123, 222.29, "7.02px", "12354:2661", "0646c20a5aee2c069a5ab0b3d760ee5df1a40057")}

    <!-- правая колонка «и ещё … 10+» -->
    ${card(1048.84, 0, 261.16, 684.49, 14.04)}
    <p style="position:absolute;left:1115.13px;top:21.76px;width:136.31px;${cool22}">и ещё</p>
    ${avatar(1133.87, 98.28, 99.11, 3.16, "12354:2670", "2075eca0684318c7028708caae0460f354c1535d")}
    ${pill(1118.22, 190.24, 129.14, 23.48, 11.89, "venomcyberzone", "https://www.instagram.com/venomcyberzone?igsh=amphN3Nkc28zYzVy")}
    ${avatar(1134.08, 238.3, 99.11, 3.16, "12354:2696", "7bcecb643e5630c22e86d429fb30ab2757488ff9")}
    ${pill(1126.77, 330.26, 113.49, 23.48, 11.89, "be.pro_academy")}
    ${avatar(1133.88, 378.31, 99.11, 3.16, "12354:2677", "24455033e88241a2c5ae50496ddfd47b47ebd84e")}
    ${pill(1113.33, 470.28, 139.9, 23.48, 11.89, "close_english_school", "https://www.instagram.com/close_english_school?igsh=YXljYnFwdmQ5OGk=")}
    <p style="position:absolute;left:1138.07px;top:548.99px;width:103.91px;${big67}"><span style="letter-spacing:0.04em">1</span>0+</p>
    <p style="position:absolute;left:1107.81px;top:615.88px;width:150.94px;${cool22}">проектов в нише S&amp;E</p>
    ${ph(1175.91, 490.02, 16, 14.94, "0", "12354:2680")}
    ${ph(84.24, 163.57, 23.17, 21.62, "0", "12354:2699")}
    ${ph(1175.91, 210.61, 16, 14.94, "0", "12354:2705")}
  </div>

</div>`;

export const sportH = 1813;
