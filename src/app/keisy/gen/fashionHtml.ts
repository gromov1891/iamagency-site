import IMGMAP from "./_imageMap.json";
/* Страница «Кейсы», раздел Fashion — 1:1 из Figma IAM-WEB,
   фрейм «Fashion» #12354:1663 (1440×2735, белый фон #FFFFFF).
   Тексты дословно из макета. Фото недоступны (Figma API 429) —
   вместо каждой картинки серая заглушка #E5E3E0 с data-figma-node /
   data-image-ref (манифест: fashionHtml.images.json). */

const INK = "#1F1F1F";
const GRAY = "#9A9895";
const PH = "#E5E3E0";
const RING =
  "linear-gradient(180deg,#FF00C5 0%,#FF0000 32%,#FF8600 67%,#FFCA00 100%)";

/* Типографика из макета */
const crumb =
  "font-family:Inter,sans-serif;font-weight:500;font-size:23.42px;line-height:86%;letter-spacing:-0.05em;text-transform:uppercase;text-decoration:none;";
const body20 = `font-family:Inter,sans-serif;font-weight:400;font-size:20.75px;line-height:104%;color:${INK};white-space:pre-line;margin:0;`;
const label17 = `font-family:Inter,sans-serif;font-weight:600;font-size:17.07px;line-height:104%;text-transform:uppercase;color:${INK};opacity:0.4;margin:0;`;
const small8 = `font-family:Inter,sans-serif;font-weight:600;font-size:8.41px;line-height:104%;text-transform:uppercase;color:${INK};margin:0;`;
const list14 = `font-family:Inter,sans-serif;font-weight:400;font-size:14.34px;line-height:104%;color:${INK};white-space:pre-line;margin:0;`;
const label15 = `font-family:Inter,sans-serif;font-weight:600;font-size:14.99px;line-height:104%;text-transform:uppercase;color:${INK};opacity:0.4;margin:0;`;
/* правая колонка «и ещё … 30+» */
const big67 =
  "font-family:Coolvetica,sans-serif;font-weight:400;font-size:67.52px;line-height:86%;color:#221F20;margin:0;";
const cool22 =
  "font-family:Coolvetica,sans-serif;font-weight:400;font-size:22.56px;line-height:104%;text-align:center;color:#221F20;margin:0;";

/* ts7 в макете = Semi Bold */
const b = (s: string) => `<span style="font-weight:600">${s}</span>`;

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
  if (_f) return `<img src="/blk/keisy/${_f}" alt="кейс I AM AGENCY - fashion" loading="lazy" style="position:absolute;left:${x}px;top:${y}px;width:${w}px;height:${h}px;${r ? `border-radius:${r};` : ""}object-fit:cover;" />`;
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
    ? `<img src="/blk/keisy/${_f}" alt="кейс I AM AGENCY - fashion" loading="lazy" style="position:absolute;left:${x}px;top:${y}px;width:${d}px;height:${d}px;border-radius:50%;object-fit:cover;border:4px solid #FFF;box-sizing:border-box" />`
    : `<div style="position:absolute;left:${x}px;top:${y}px;width:${d}px;height:${d}px;border-radius:50%;background:${PH};border:4px solid #FFF;box-sizing:border-box" data-figma-node="${node}"></div>`;
  return ring_div + inner;
};

const instaFrom = (t: string) => { const u = String(t).trim().replace(/^@/, ""); return /^[\w.]+$/.test(u) ? "https://instagram.com/" + u : ""; };
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
  const _h = href || instaFrom(text);
  return _h ? `<a href="${_h}" target="_blank" rel="noopener" style="${st}">${text}</a>` : `<div style="${st}">${text}</div>`;
};

export const fashionHtml = `
<div style="position:relative;width:1440px;height:2735px;background:#FFFFFF;overflow:visible;">

  <!-- хлебные крошки -->
  <div style="position:absolute;left:65px;top:30px;display:flex;gap:13px;align-items:baseline;white-space:nowrap;font-family:Inter,sans-serif;font-weight:500;font-size:23.42px;line-height:1;letter-spacing:-0.05em;text-transform:uppercase;"><a href="/" style="color:#9A9895;text-decoration:none;">Главная</a><span style="color:#9A9895;">→</span><a href="/keisy" style="color:#9A9895;text-decoration:none;">Кейсы</a><span style="color:#9A9895;">→</span><span style="color:#1C1C1C;">Fashion</span></div>

  <!-- плашка «Кейс Prelesть» -->
  <div style="position:absolute;left:65px;top:128px;width:451px;height:68px;">
    <div style="position:absolute;left:0;top:0;width:451px;height:68px;background:#1C1C1C;border-radius:84.17px;"></div>
    <span style="position:absolute;left:27.21px;top:13.6px;font-family:Inter,sans-serif;font-weight:400;font-size:47.4px;line-height:86%;letter-spacing:-0.05em;text-transform:uppercase;color:#FFF;white-space:nowrap;">Кейс Prelesть </span>
    <div style="position:absolute;left:390px;top:6px;width:55.27px;height:55.27px;border-radius:50%;background:#FFF;box-shadow:inset 0 0 3.4px 3.4px rgba(137,146,228,1);"></div>
    <svg style="position:absolute;left:399.35px;top:15.35px;width:36.56px;height:36.56px" viewBox="0 0 24 24" fill="none" stroke="#1C1C1C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
  </div>

  <!-- карточка «Задача клиента / Что сделали / результат» -->
  <div style="position:absolute;left:65px;top:238px;width:478px;height:602.49px;">
    <p style="position:absolute;left:3.19px;top:0;width:171.57px;${label17}">Задача клиента:</p>
    <p style="position:absolute;left:3.19px;top:31.92px;width:474.81px;${body20}">Разработать представленность бренда в медиа поле, создать продающий контент, работать над увеличением узнаваемости</p>
    <p style="position:absolute;left:3.19px;top:121.3px;width:171.57px;${label17}">Что сделали:</p>
    <p style="position:absolute;left:3.19px;top:156.41px;width:21px;${body20}">✅
✅
✅
✅
✅</p>
    <p style="position:absolute;left:37.51px;top:154.01px;width:434.11px;${body20}">написали ${b("SMM-стратегию")}
разработали ${b("фирменный стиль и уникальный рубрикатор")}
упаковали ${b("аккаунт с нуля")}
провели ${b("несколько концептуальных съемок,")} создали ${b("вирусные рилс")}
работали с ${b("блогерами")}</p>
    <div style="position:absolute;left:0;top:363.74px;width:478px;height:238.75px;">
      <div style="position:absolute;left:0;top:0;width:478px;height:238.75px;border:1.6px solid #000;border-radius:15.96px;box-sizing:border-box;"></div>
      <p style="position:absolute;left:26.33px;top:17.12px;width:171.57px;${label17}">результат:</p>
      <p style="position:absolute;left:26.33px;top:42.66px;width:442.09px;${body20}">Благодаря тщательно продуманной SMM-стратегии и использованию эффективных рекламных инструментов, ${b("рост аккаунта превысил 200%.")}
Увеличение узнаваемости бренда напрямую повлияло на продажи, ${b("сделав Prelesть заметным игроком в нише аксессуаров для телефонов.")}</p>
    </div>
  </div>

  <!-- коллаж Prelesть -->
  <div style="position:absolute;left:614.15px;top:224px;width:760.9px;height:615.03px;">
    ${avatar(50.39, 0.08, 111.97, 3.57, "12354:1928", "96ac5f48cad77b830fc719ab3c5a74ababcbc59a")}
    ${pill(44.85, 103.98, 121.2, 26.46, 13.43, "prelest.brand")}
    ${ph(0.62, 144.74, 243.63, 54.14, "0", "12354:1933", "96ac5f48cad77b830fc719ab3c5a74ababcbc59a")}
    ${ph(651.54, 224.72, 108.93, 191.29, "6.15px", "12354:1934", "055705fa19fc23b6817ebd34a65d06e8cab8f219")}
    ${ph(652.15, 424.05, 108.75, 190.98, "6.15px", "12354:1935", "9ccd1af4a744e2ac74b4face675d561f9b13ef82")}
    ${ph(479.85, 331, 167.27, 283.13, "6.15px", "12354:1936", "a1c53f871199c072ce247b76e50b91a98678c54d")}
    ${ph(651.54, 25.99, 108.75, 190.98, "6.15px", "12354:1937", "45e1c0f6a4f7cf3249bebf0df5d3a38dd2461b43")}
    ${ph(479.88, 22.92, 167.25, 296.1, "6.15px", "12354:1938", "d9f56158a0604a8a04fe9e27d8cff7fd39ef0f8f")}
    ${ph(252.86, 224.1, 214.74, 389.41, "6.15px", "12354:1939", "5d30bdc046b63fa9937f8a3996aa032eeda23cb9")}
    ${ph(0, 221.64, 244.3, 391.82, "6.15px", "12354:1940", "8b4f7254ab3d494d30462c06823fa6a348ddc8a3")}
    ${ph(247.94, 32.15, 228.74, 156.36, "0", "12354:1941", "bc221c01555348a4e28eff30433607d319900bc2")}
  </div>

  <!-- карточка sierra_brand_ + elure.brand (2-й ряд) -->
  <div style="position:absolute;left:65px;top:990.42px;width:1310px;height:683.02px;">
    ${card(0, 0, 736.26, 683.02, 14.01)}
    ${avatar(32.31, 23.21, 127.5, 4, "12354:1949", "ce54eb4020d2b3c8c706d0fa9a874cde40257f96")}
    ${pill(32.22, 139.05, 125.4, 29.44, 15.29, "sierra_brand_", "https://www.instagram.com/sierra_brand_?igsh=OXhuaHFsaXRnYTNk")}
    ${ph(22.42, 260.9, 155.89, 207.85, "7.42px", "12354:1952", "036cbb31e37a82d4207fecc54441911cf4a5c607")}
    ${ph(190.18, 260.9, 155.89, 207.85, "7.42px", "12354:1953", "d42ef7af9e82062084411f319b3e4b920fd33a1a")}
    ${ph(20.32, 192.65, 151.32, 33.63, "0", "12354:1954", "ce54eb4020d2b3c8c706d0fa9a874cde40257f96")}
    ${ph(177.94, 39.93, 268.68, 103.81, "0", "12354:1955", "ce54eb4020d2b3c8c706d0fa9a874cde40257f96")}
    <p style="position:absolute;left:23.12px;top:615.67px;width:16px;font-family:Inter,sans-serif;font-weight:400;font-size:15.54px;line-height:104%;color:${INK};margin:0;">🔥</p>
    <p style="position:absolute;left:48.81px;top:518.45px;width:273px;${list14}">разработали и ведём ${b("SMM-стратегию")}
создаём ${b("идеи")}
пишем ${b("ТЗ для съёмок")}
запускаем ${b("вирусные Reels")}.</p>
    <p style="position:absolute;left:48.81px;top:615.07px;width:352px;${list14}">${b("+700% к ключевым метрикам, тысячи новых подписчиков и клиентов")} – благодаря двум годам точной, системной работы:</p>
    <p style="position:absolute;left:23.12px;top:491.08px;width:269.71px;${label15}">Что было сделано:</p>
    <p style="position:absolute;left:22.42px;top:243.79px;width:48.35px;${small8}">До:</p>
    <p style="position:absolute;left:190.18px;top:243.79px;width:77.52px;${small8}">после:</p>
    ${ph(586.35, 18.91, 130.37, 231.76, "7.01px", "12354:1962", "983966f2dc13fb732d6e398bd3742e175371b783")}
    ${ph(446.24, 442.74, 129.62, 230.44, "7.01px", "12354:1963", "0e6dd3fc066b71821443bea0cd503f9139dd08a5")}
    ${ph(381.09, 344.66, 324.7, 81.17, "7.01px", "12354:1964", "0d6228db6a731feda852801cffec62f2d33a6091")}
    ${ph(381.09, 269.01, 335.48, 74.12, "7.01px", "12354:1965", "837c72db486d07f2c4fa76616b1da73076954621")}
    ${ph(446.24, 18.91, 130.37, 231.76, "7.01px", "12354:1966", "bb521202bdd271aadd0441456d79bb219d642498")}
    ${ph(586.35, 442.74, 129.62, 230.44, "7.01px", "12354:1967", "5409df8fb8cfd50dc17a2e1bc9d7b2f7ebb46d27")}
    ${card(760.78, 180.04, 549.22, 502.98, 14.01)}
    <div style="position:absolute;left:1037.49px;top:500.88px;width:262px;height:170.23px;">
      <p style="position:absolute;left:8.41px;top:11.91px;width:269.71px;${label15}">Что было сделано:</p>
      <p style="position:absolute;left:8.41px;top:42.68px;width:16px;font-family:Inter,sans-serif;font-weight:400;font-size:15.54px;line-height:101%;color:${INK};white-space:pre-line;margin:0;">✅
✅
✅
✅</p>
      <p style="position:absolute;left:34.1px;top:42.08px;width:224px;${list14}">создали ${b("SMM-стратегию")} и позиционирование бренда в социальных сетях
разработали ${b("фирменный стиль")}
написали ${b("ТЗ к съемкам")}
${b("упаковали аккаунт")} бренда</p>
    </div>
    ${ph(1035.6, 192.65, 86.24, 107.79, "3.66px", "12354:1974", "5801571403a0ba2fa7c4f4e778ec0bb5990f12f8")}
    ${ph(1125.27, 192.65, 86.87, 108.58, "3.66px", "12354:1975", "c76dcaa30f6548b101ee85e2ff7fe61063bd2523")}
    ${ph(1216.34, 194.05, 86.24, 107.79, "3.66px", "12354:1976", "e52c90e1544b77f90d0d64e3d2e814387583329f")}
    ${ph(783.2, 262.7, 245.26, 407.6, "7.57px", "12354:1977", "5414d37d46012447a64c0a9029b613e187964514")}
    ${ph(783.2, 186.34, 245.85, 64.28, "0", "12354:1978", "8164e7b8a90908da1289e9a96b047331d0da21dd")}
    ${avatar(965.34, 11.21, 127.5, 4, "12354:1983", "8164e7b8a90908da1289e9a96b047331d0da21dd")}
    ${pill(964.64, 129.6, 128.2, 30.12, 15.29, "elure.brand")}
    ${ph(1217.04, 308.94, 84.74, 150.65, "3.63px", "12354:1986", "472dc04e2f5db66a097b60a5ebe9286ed1f194a6")}
    ${ph(1125.27, 306.83, 86.03, 152.95, "3.63px", "12354:1987", "8263f90a359256790aa9eecb42d5d1c992ec3db7")}
    ${ph(1034.9, 308.24, 84.94, 151, "3.63px", "12354:1988", "a41c93e762ab17349ddca9dabbe8f61de5a23ce9")}
    ${ph(84.06, 163.93, 23.12, 21.58, "0", "12354:1989")}
  </div>

  <!-- 3-й ряд: gdbd_brand / authorsport / younowa_brand + «и ещё 30+» -->
  <div style="position:absolute;left:65px;top:1797px;width:1310px;height:709.06px;">

    <!-- gdbd_brand -->
    <div style="position:absolute;left:0;top:35.8px;width:356.63px;height:673.25px;">
      ${avatar(114.43, 0, 127.77, 4, "12354:2002", "a35c41d0d094cb0c1fd63af4c22f9f53deeacd5e")}
      ${pill(113.73, 118.64, 128.47, 30.19, 15.32, "gdbd_brand", "https://www.instagram.com/gdbd_brand?igsh=MW9pd3M0ejNkcWZxOQ==")}
      <div style="position:absolute;left:0;top:169.19px;width:356.63px;height:504.06px;">
        ${card(0, 0, 356.63, 504.06, 14.04)}
        ${ph(182.53, 120.75, 158.66, 157.26, "7.26px", "12354:2007", "2bec172fde8aa66d49d2d0816394f86a7adac179")}
        ${ph(16.85, 122.86, 157.97, 156.54, "7.26px", "12354:2008", "99aa26ee2c1ee297031adc781326fc4f81b079ed")}
        <p style="position:absolute;left:18.25px;top:111.62px;width:45.73px;${small8}">До:</p>
        <p style="position:absolute;left:182.53px;top:108.11px;width:73.31px;${small8}">после:</p>
        ${ph(11.93, 17.55, 329.78, 73.75, "0", "12354:2011", "a35c41d0d094cb0c1fd63af4c22f9f53deeacd5e")}
        ${ph(12.64, 57.57, 157.96, 208.5, "7.02px", "12354:2012")}
        ${ph(16.15, 296.26, 104.63, 186, "0", "12354:2013", "52ae43f02fe7d332c3c3a86a69f104753f6f3c39")}
        ${ph(127.07, 296.26, 104.82, 186.35, "3.51px", "12354:2014", "76fce711d836773a4981a085a4204b9ca2bf93a5")}
        ${ph(237.99, 296.96, 104.27, 185.38, "0", "12354:2015", "e95a5833c9a10a60431a6eb0c4679c9715eb0ccd")}
      </div>
    </div>

    <!-- authorsport -->
    <div style="position:absolute;left:373.48px;top:35.8px;width:356.63px;height:673.25px;">
      ${avatar(115.13, 0, 127.77, 4, "12354:2037", "e89cae56d2b954211f2dfa563c0439fd95fa54e0")}
      ${pill(117.94, 118.64, 120.05, 30.19, 15.32, "authorsport")}
      <div style="position:absolute;left:0;top:169.19px;width:356.63px;height:504.06px;">
        ${card(0, 0, 356.63, 504.06, 14.04)}
        ${ph(232.37, 329.26, 91.24, 162.21, "3.63px", "12354:2042", "d02ad2a72893d743bc517f68e7dba44afdc0fef7")}
        ${ph(134.09, 329.26, 91.44, 162.56, "3.63px", "12354:2043", "9831261352bc35a4306c82fa48c2e1ecc966ddd1")}
        ${ph(35.8, 329.26, 91.24, 162.21, "3.63px", "12354:2044", "5965bbbe4e0a2a84090986892b7a5a9a3ed00804")}
        ${ph(21.06, 13.34, 317.89, 71.09, "0", "12354:2045", "5119838f0b09799674f66f9c9a5d31efdd4f2322")}
        ${ph(35.8, 98.29, 166.91, 220.68, "7.27px", "12354:2046", "8ddde8c1a39069ad2d2a7482abb677f9a86466cc")}
        ${ph(211.31, 98.29, 114.28, 203.16, "3.63px", "12354:2047", "41a9afef61eb1cabccd6ee374d3847bf4671e647")}
        ${ph(212.02, 303.98, 112.51, 14.9, "2.81px", "12354:2048", "37bc16534f074e011a4dacf8c94c570c256a5ab6")}
      </div>
    </div>

    <!-- younowa_brand -->
    <div style="position:absolute;left:746.97px;top:35.8px;width:356.63px;height:673.25px;">
      ${avatar(115.13, 0, 127.77, 4, "12354:2021", "1cbca68c3466f0597efb51b67d14fc5af106dfa6")}
      ${pill(106.71, 118.64, 142.51, 30.19, 15.32, "younowa_brand")}
      <div style="position:absolute;left:0;top:169.19px;width:356.63px;height:504.06px;">
        ${card(0, 0, 356.63, 504.06, 14.04)}
        ${ph(11.93, 10.53, 329.43, 73.67, "0", "12354:2026", "1cbca68c3466f0597efb51b67d14fc5af106dfa6")}
        ${ph(228.16, 107.41, 114.28, 203.16, "3.63px", "12354:2027", "9f1e0993897c3a3ea5fb49a3598f184ffc9a72af")}
        ${ph(242.2, 321.53, 96.07, 170.79, "3.63px", "12354:2028", "e16fd158f1d2348bd1c9d15fc1033d32955a7e46")}
        ${ph(129.88, 321.53, 97.36, 173.09, "3.63px", "12354:2029", "c1b7ad49cdf72e0c811813795cab69d0e2c843be")}
        ${ph(18.25, 321.53, 96.82, 172.12, "3.63px", "12354:2030", "44dc7018fb4e710db58f7f18aeb1ba1bc5c80a59")}
        ${ph(11.93, 107.41, 208.04, 206.16, "7.26px", "12354:2031", "7ebbb31ed961e12a8764d578e7594af7bf4da236")}
      </div>
    </div>

    <!-- правая колонка «и ещё … 30+» -->
    ${card(1127.47, 0, 182.53, 709.06, 14.04)}
    <p style="position:absolute;left:1150.23px;top:19.66px;width:136.31px;${cool22}">и ещё</p>
    ${avatar(1182.86, 66.69, 71.12, 2.27, "12354:2057", "e2253d9f4950df7178de42845dc243263406b4bc")}
    ${pill(1180.12, 132.73, 76.2, 16.8, 8.53, "7.88showroom", "https://www.instagram.com/7.88showroom?igsh=MTU1aTc4YWM3aXYyZg==")}
    ${avatar(1182.93, 167.08, 71.12, 2.27, "12354:2064", "393748383a13cf6f8aa5ff11bf5ee4e5b1b6381d")}
    ${pill(1189.7, 233.07, 56.86, 16.85, 8.53, "evigi", "https://www.instagram.com/evigi?igsh=NmcwOHI5eW5oczY4")}
    ${avatar(1182.93, 267.48, 71.12, 2.27, "12354:2071", "d53b7adfd85e50badc2203cd138198aaca84e93b")}
    ${pill(1188.92, 333.47, 58.97, 16.85, 8.53, "lea.lusso")}
    ${avatar(1183.26, 367.87, 71.12, 2.27, "12354:2078", "1013b313e5130235b5ca2ca77d3aa02b6553df73")}
    ${pill(1173.1, 433.91, 91.05, 16.8, 8.53, "hypnotichuman.ru")}
    ${avatar(1183.27, 468.26, 71.12, 2.27, "12354:2085", "76689ddbcaf04bce1f5ec7bcba5a14944a53e7d0")}
    ${pill(1171, 534.25, 95.48, 16.85, 8.53, "midnight.muse.spb")}
    <p style="position:absolute;left:1173.17px;top:573.56px;width:103.91px;${big67}">30+</p>
    <p style="position:absolute;left:1142.92px;top:640.45px;width:150.94px;${cool22}">проектов в нише Fashion</p>
    ${ph(1212.42, 146.73, 11.93, 11.14, "0", "12354:2088")}
    ${ph(1212.42, 247.12, 11.93, 11.14, "0", "12354:2100")}
    ${ph(166.38, 178.32, 23.17, 21.62, "0", "12354:2112")}
  </div>

</div>`;

export const fashionH = 2735;
