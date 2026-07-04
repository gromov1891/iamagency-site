import IMGMAP from "./_imageMap.json";
/* Страница «Кейсы», раздел BEAUTY — 1:1 из Figma IAM-WEB,
   фрейм «BEAUTY» #12339:1313 (1440×2735, белый фон #FFFFFF).
   Тексты дословно из макета. Фото недоступны (Figma API 429) —
   вместо каждой картинки серая заглушка #E5E3E0 с data-figma-node /
   data-image-ref (манифест: beautyHtml.images.json). */

const INK = "#1F1F1F";
const GRAY = "#9A9895";
const PH = "#E5E3E0";
const RING =
  "linear-gradient(180deg,#FF00C5 0%,#FF0000 32%,#FF8600 67%,#FFCA00 100%)";

/* Типографика из макета */
const crumb =
  "font-family:Inter,sans-serif;font-weight:500;font-size:23.42px;line-height:86%;letter-spacing:-0.05em;text-transform:uppercase;text-decoration:none;";
const body20 = `font-family:Inter,sans-serif;font-weight:400;font-size:20.76px;line-height:104%;color:${INK};white-space:pre-line;margin:0;`;
const label17 = `font-family:Inter,sans-serif;font-weight:600;font-size:17.08px;line-height:104%;text-transform:uppercase;color:${INK};opacity:0.4;margin:0;`;
const small8 = `font-family:Inter,sans-serif;font-weight:600;font-size:8.43px;line-height:104%;text-transform:uppercase;color:${INK};margin:0;`;
const list15 = `font-family:Inter,sans-serif;font-weight:400;font-size:15.58px;line-height:104%;color:${INK};white-space:pre-line;margin:0;`;
const list14 = `font-family:Inter,sans-serif;font-weight:400;font-size:14.38px;line-height:104%;color:${INK};white-space:pre-line;margin:0;`;
const label15 = `font-family:Inter,sans-serif;font-weight:600;font-size:15.03px;line-height:104%;text-transform:uppercase;color:${INK};opacity:0.4;margin:0;`;

/* ts7 в макете = Semi Bold */
const b = (s: string) => `<span style="font-weight:600">${s}</span>`;

/* Заглушка вместо картинки (фон белый → #E5E3E0) */
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

/* Белая карточка с чёрной обводкой (RECTANGLE "image" без фото-заливки) */
const card = (x: number, y: number, w: number, h: number, r: number) =>
  `<div style="position:absolute;left:${x}px;top:${y}px;width:${w}px;height:${h}px;background:#FFF;border:1.4px solid #000;border-radius:${r}px;box-sizing:border-box"></div>`;

/* Аватар инстаграм-профиля: градиентное кольцо + заглушка-круг */
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

/* Плашка-ник профиля */
const pill = (
  x: number,
  y: number,
  w: number,
  h: number,
  fs: number,
  text: string,
  href?: string,
) => {
  const st = `position:absolute;left:${x}px;top:${y}px;width:${w}px;height:${h}px;display:flex;align-items:center;justify-content:center;background:#FFF;border:0.77px solid #272727;border-radius:${h / 2}px;box-sizing:border-box;font-family:Inter,sans-serif;font-weight:500;font-size:${fs}px;line-height:86%;letter-spacing:-0.03em;color:#272727;text-decoration:none;`;
  return href
    ? `<a href="${href}" target="_blank" rel="noopener" style="${st}">${text}</a>`
    : `<div style="${st}">${text}</div>`;
};

export const beautyHtml = `
<div style="position:relative;width:1440px;height:2735px;background:#FFFFFF;overflow:hidden;">

  <!-- хлебные крошки -->
  <div style="position:absolute;left:65px;top:30px;display:flex;gap:13px;align-items:baseline;white-space:nowrap;font-family:Inter,sans-serif;font-weight:500;font-size:23.42px;line-height:1;letter-spacing:-0.05em;text-transform:uppercase;"><a href="/" style="color:#9A9895;text-decoration:none;">Главная</a><span style="color:#9A9895;">→</span><a href="/keisy" style="color:#9A9895;text-decoration:none;">Кейсы</a><span style="color:#9A9895;">→</span><span style="color:#1C1C1C;">BEAUTY</span></div>

  <!-- плашка «Кейс Jadu» -->
  <div style="position:absolute;left:65px;top:128px;width:352px;height:68.02px;">
    <div style="position:absolute;left:0;top:0;width:352px;height:68.02px;background:#1C1C1C;border-radius:84.17px;"></div>
    <span style="position:absolute;left:27.21px;top:13.6px;font-family:Inter,sans-serif;font-weight:400;font-size:47.4px;line-height:86%;letter-spacing:-0.05em;text-transform:uppercase;color:#FFF;white-space:nowrap;">Кейс Jadu </span>
    <div style="position:absolute;left:289.93px;top:5.95px;width:55.27px;height:55.27px;border-radius:50%;background:#FFF;box-shadow:inset 0 0 3.4px 3.4px rgba(255,173,25,1);"></div>
    ${ph(299.29, 15.3, 36.56, 36.56, "0", "12339:1334")}
  </div>

  <!-- карточка «Задача клиента / Что сделали / результат» -->
  <div style="position:absolute;left:65px;top:236px;width:478.34px;height:604.3px;">
    <p style="position:absolute;left:0;top:0;width:171.69px;${label17}">Задача клиента:</p>
    <p style="position:absolute;left:0;top:38.33px;width:475.14px;${body20}">За две недели подготовить социальные сети к масштабному запуску бренда в Нью-Йорке</p>
    <p style="position:absolute;left:0;top:123.77px;width:171.69px;${label17}">Что сделали:</p>
    <p style="position:absolute;left:0;top:162.11px;width:21px;${body20}">✅
✅
✅
✅
✅</p>
    <p style="position:absolute;left:34.34px;top:159.71px;width:434.42px;${body20}">оперативно разработали ${b("SMM-стратегию на английском")}
создали ${b("варианты визуальной концепции")}
разработали ${b("tov и позиционирование")}
упаковали ${b("профиль")}
работали с ${b("блогерами, ugc-маркетингом и таргетированной рекламной")}</p>
    <div style="position:absolute;left:0;top:415.85px;width:478.34px;height:188.46px;">
      <div style="position:absolute;left:0;top:0;width:478.34px;height:188.46px;border:1.6px solid #000;border-radius:15.97px;box-sizing:border-box;"></div>
      <p style="position:absolute;left:26.35px;top:17.57px;width:171.69px;${label17}">результат:</p>
      <p style="position:absolute;left:26.35px;top:53.51px;width:418.44px;${body20}">цифры в аккаунте говорят сами за себя:</p>
      <p style="position:absolute;left:26.35px;top:87.04px;width:21px;${body20}">✅
✅
✅</p>
      <p style="position:absolute;left:60.69px;top:86.24px;width:389px;${body20}">${b("35+ тыс")} подписчиков
рилс, которые посмотрели ${b("миллионы")}
${b("100k+")} довольных клиентов</p>
    </div>
  </div>

  <!-- коллаж Jadu -->
  <div style="position:absolute;left:614px;top:226px;width:761.12px;height:614.22px;">
    ${avatar(6.85, 0.08, 111.98, 3.57, "12339:1342", "f22df17d9ca1c73481adea3ae029f77fbc016a20")}
    ${pill(0, 103.99, 123.67, 26.46, 13.43, "jadubeautynyc")}
    ${ph(185.82, 137.21, 163.93, 125.94, "0", "12339:1345", "1671e3e467dd75ff5db39e0a194f227f8d410657")}
    ${ph(0, 202.43, 181.25, 295.16, "6.15px", "12339:1346", "6103f0e0332a2b6defe0c1d6205d6838140f7ac9")}
    ${ph(3.08, 505.16, 87.25, 109.06, "6.15px", "12339:1347", "4fad22a654a9a8354b75bbbb9330e24c84ff6591")}
    ${ph(94.14, 505.16, 87.25, 109.06, "6.15px", "12339:1348", "61044fc376c16dae86754f9d6c364ff8ee962ce0")}
    ${ph(185.82, 323.03, 163.69, 291, "6.15px", "12339:1349", "191995a2c87cc24cf79297da65208279224cddab")}
    ${ph(0.62, 149.52, 180.44, 40.1, "0", "12339:1350", "9254641fe0e38996a40d078a92d525b6c7c77299")}
    ${ph(356.87, 222.74, 108.94, 191.31, "6.15px", "12339:1351", "837f885da9140b579c02558c1cf30a4a4002227b")}
    ${ph(357.49, 422.09, 108.76, 191, "6.15px", "12339:1352", "837f885da9140b579c02558c1cf30a4a4002227b")}
    ${ph(475.01, 24, 110.08, 193.31, "0", "12339:1353", "81366478bcfeff0074ef1c5a9b72e00570472ce4")}
    ${ph(185.82, 272.58, 164.18, 44.78, "6.15px", "12339:1354", "81366478bcfeff0074ef1c5a9b72e00570472ce4")}
    ${ph(595.02, 321.19, 166.1, 291.7, "6.15px", "12339:1355", "81366478bcfeff0074ef1c5a9b72e00570472ce4")}
    ${ph(356.87, 24, 108.76, 191, "6.15px", "12339:1356", "81366478bcfeff0074ef1c5a9b72e00570472ce4")}
    ${ph(470.7, 442.97, 115.06, 162.84, "0", "12339:1358", "de0778615e7fc5c0b47cde47603e12d828d650ba")}
    ${ph(470.7, 585.08, 115.06, 20.73, "0", "12339:1359", "de0778615e7fc5c0b47cde47603e12d828d650ba")}
    ${ph(470.7, 244.89, 114.87, 161.7, "0", "12339:1361", "956978c6ca63a3c31d6c008575231a58d0e8ef97")}
    ${ph(470.7, 380.98, 114.87, 26.13, "0", "12339:1362", "956978c6ca63a3c31d6c008575231a58d0e8ef97")}
    ${ph(594.99, 19.69, 166.13, 295.34, "6.15px", "12339:1363", "02aa4b5c20a0b76f2108dd848d2ebffb32755443")}
    ${ph(95.37, 0, 37.53, 37.53, "50%", "12339:1364", "fc3a1fe0979fc81f2d23be067e1e4a5b6be57425")}
    ${ph(132.9, 30.2, 216.59, 68.19, "0", "12339:1365", "e59017da2435f2cc15d398ad2ce7f8e8ab61ac12")}
  </div>

  <!-- карточка spadream_ru (2-й ряд) -->
  <div style="position:absolute;left:65px;top:988px;width:1310px;height:684.85px;">
    ${card(0, 0, 738.24, 684.85, 14.05)}
    ${avatar(32.4, 23.27, 127.84, 4, "12339:1469", "b55ee6ddbbf9063e8df23e0e2da9431622608edf")}
    ${pill(32.31, 139.42, 125.73, 29.52, 15.33, "spadream_ru", "https://www.instagram.com/spadream_ru?igsh=MXUyNnQ1bDJ3cTBrYw==")}
    ${ph(23.18, 240.22, 147.51, 196.68, "7.02px", "12339:1472", "9f79a6cbc74adf3b0c20be706b88e4f80a643212")}
    ${ph(23.18, 447.44, 147.51, 64.62, "3.51px", "12339:1473", "948e7f2f6ed470e98a510a9d5e5bb3d34394f0a0")}
    ${ph(186.14, 341.37, 91.97, 166.57, "3.51px", "12339:1475", "ad57866697885b966f3ad2e250704d164c41ee47")}
    ${ph(377.25, 343.12, 91.26, 164.66, "3.51px", "12339:1476", "ae4ceb2a8a70ebfd9a6b2222b9a9f3530099d9b5")}
    ${ph(282.57, 341.37, 91.44, 166.09, "3.51px", "12339:1477", "c6013d6bfd60dc94db337bf876e2f9ba6e2003b5")}
    ${ph(20.37, 193.87, 151.72, 33.72, "0", "12339:1478", "9254641fe0e38996a40d078a92d525b6c7c77299")}
    ${ph(184.03, 35.12, 301.56, 116.51, "0", "12339:1479", "9254641fe0e38996a40d078a92d525b6c7c77299")}
    ${ph(377.9, 171.39, 90.82, 161.18, "0", "12339:1480", "15d8bdfb567f51d112f145a8926907806ee91153")}
    ${ph(186.14, 172.79, 88.75, 160.4, "0", "12339:1481", "60b67848e11132d8e23758ebacc7433f4d5457ab")}
    ${ph(282.37, 173.5, 88.03, 159.74, "0", "12339:1482", "70e1f5cef080557db0407c012fae2c30eeee9f0c")}
    <p style="position:absolute;left:23.18px;top:534.54px;width:270.43px;${label15}">Что было сделано:</p>
    <p style="position:absolute;left:23.18px;top:563.99px;width:16px;${list15}">✅
✅
✅
✅
✅</p>
    <p style="position:absolute;left:48.95px;top:563.39px;width:378px;${list14}">разработка ${b("фирменного стиля")} аккаунта
организация и проведение ${b("фото и видеосъемок")}
настройка ${b("таргетированной и контекстной рекламы")}
сотрудничество с ${b("блогерами")}
оформление и ведение ${b("ТГ-канала и сообщества")}</p>
    ${ph(607.59, 512.06, 115.28, 148.8, "3.51px", "12339:1486", "f16ee88f1f49b699db1dc5817a0fa00e2d11e107")}
    ${ph(482.56, 353.31, 118.64, 148.3, "3.51px", "12339:1487", "a3545a7c01ab36a652ecfbfe11d8f9041a4b1913")}
    ${ph(482.56, 512.06, 118.92, 148.65, "3.51px", "12339:1488", "32fc20bf260a3d98b10f3dbd348fa7a45da016c1")}
    ${ph(476.24, 35.12, 246.62, 308.27, "3.51px", "12339:1489", "7dc3d88f025f43f28cf2e1c753af5767808b71ee")}
    ${ph(608.99, 353.31, 113.78, 146.12, "3.51px", "12339:1490", "e6997263f59936afd2a6177d505d055887781aa4")}
    ${card(747.37, 180.52, 182.63, 504.33, 14.05)}
    ${avatar(777.66, 11.33, 127.84, 4, "12339:1496", "669f3b21583eff9de7769f121400c4331d197fdb")}
    ${pill(776.87, 129.95, 128.54, 30.2, 15.33, "albaapexclinic", "https://www.instagram.com/albaapexclinic?igsh=MTV1bHA1OWVuYzVudQ==")}
    ${ph(759.31, 192.46, 160.17, 35.82, "0", "12339:1499", "669f3b21583eff9de7769f121400c4331d197fdb")}
    ${ph(760.01, 238.12, 158.09, 251.4, "7.02px", "12339:1500", "fb0b99898f165dd55e4debac80ee5f2a0d62d0f3")}
    ${ph(760.01, 497.31, 158.04, 76.56, "7.02px", "12339:1501", "925b3e0b445c420e20b5ac0512e23c0b3b7b3a00")}
    ${ph(814.1, 582.3, 49.83, 88.58, "7.02px", "12339:1502", "58e011b7d54e1f10a44666574336a2764b34e905")}
    ${ph(868.18, 582.3, 49.83, 88.58, "7.02px", "12339:1503", "41175144099adca24a4b0921ed27c8d20a54fd34")}
    ${ph(760.01, 582.3, 49.83, 88.58, "7.02px", "12339:1504", "9bda0f99890f25751e7915e463695c6ffdca46df")}
    ${card(938.42, 180.52, 182.63, 504.33, 14.05)}
    ${ph(952.47, 193.24, 154.53, 34.56, "0", "12339:1507", "253da7e60e8af24c1ec86474f0c2f17bed0f4890")}
    ${ph(953.87, 469.55, 152.48, 202.66, "7.26px", "12339:1508", "5eca6f9b4baa6c9dabb19cedd2c9893d59c811e7")}
    ${ph(953.87, 244.14, 154.69, 205.47, "7.26px", "12339:1509", "1eee218574b1972052a028a29648bc1e379a948c")}
    <p style="position:absolute;left:953.87px;top:233.2px;width:45.75px;${small8}">До:</p>
    <p style="position:absolute;left:953.87px;top:457.24px;width:73.35px;${small8}">после:</p>
    ${card(1127.37, 180.52, 182.63, 504.33, 14.05)}
    ${ph(1148.09, 193.87, 145.4, 38.3, "0", "12339:1513", "d17ff1690a60b89142bbe78b0822ef10abbd0a38")}
    ${ph(1134.28, 271.83, 82.96, 110.18, "3.51px", "12339:1514", "0b9e071398738af5d3bb513f522903747adc8757")}
    ${ph(1221.38, 271.83, 82.96, 110.18, "3.51px", "12339:1515", "c9d6226cc570a51c4aefe8c8eead7633a2e2594f")}
    <p style="position:absolute;left:1133.57px;top:259.19px;width:24.58px;${small8}">До:</p>
    <p style="position:absolute;left:1222.08px;top:259.19px;width:63.22px;${small8}">после:</p>
    ${ph(1220.44, 412.32, 84.06, 84.06, "7.02px", "12339:1521", "f16d703b4cdaece9396435cb10ddcd09486ca2b9")}
    ${ph(1133.27, 586.66, 84.06, 84.06, "7.02px", "12339:1522", "82fa3a4f49a367c41d9b9f46a0e38c7b7bfc25cc")}
    ${ph(1220.44, 586.66, 84.06, 84.06, "7.02px", "12339:1523", "7612facec6c83e4f688d940e767f3dce4f42651e")}
    ${ph(1133.27, 499.49, 84.06, 84.06, "7.02px", "12339:1524", "34793d75b46317faa5f29fa8aea9bd0ca9dc421f")}
    ${ph(1220.44, 499.49, 84.06, 84.06, "7.02px", "12339:1525", "9831128398a80bfdf354daa7072781e51adec4f5")}
    ${ph(1133.27, 412.32, 84.06, 84.06, "7.02px", "12339:1526", "c115866a142e35e2137d61209172974224937c27")}
    ${avatar(1159.78, 11.33, 127.84, 4, "12339:1531", "d17ff1690a60b89142bbe78b0822ef10abbd0a38")}
    ${pill(1142.83, 129.95, 160.85, 30.2, 15.33, "project.beautybox", "https://www.instagram.com/project.beautybox?igsh=MTN3ajl1NXplYmgzYQ==")}
    ${avatar(969.42, 11.33, 127.84, 4, "12339:1538", "253da7e60e8af24c1ec86474f0c2f17bed0f4890")}
    ${pill(968.63, 129.95, 128.54, 30.2, 15.33, "japancosm.ru", "https://www.instagram.com/japancosm.ru?igsh=MWQ4bXM5OThpcjU4dw==")}
    ${ph(829.55, 154.53, 23.18, 21.63, "0", "12339:1541")}
    ${ph(83.59, 162.96, 23.18, 21.63, "0", "12339:1547")}
    ${ph(1021.31, 154.53, 23.18, 21.63, "0", "12339:1553")}
    ${ph(1211.66, 154.53, 23.18, 21.63, "0", "12339:1559")}
  </div>

  <!-- карточка mix_lab (3-й ряд) -->
  <div style="position:absolute;left:65px;top:1821px;width:1310px;height:684.85px;">
    ${card(0, 0, 734.02, 684.85, 14.05)}
    ${avatar(32.4, 23.27, 127.84, 4, "12339:1372", "b55ee6ddbbf9063e8df23e0e2da9431622608edf")}
    ${avatar(33.1, 23.27, 127.84, 4, "12339:1377", "740dd624b947ad16f2a13f5f6a024b61f3f1de8c")}
    ${pill(48.46, 139.08, 94.83, 30.2, 15.33, "mix_lab", "https://www.instagram.com/mix_lab?igsh=NGx6MWQzY3d5Z3c2")}
    ${ph(23.18, 224.77, 159.06, 249.96, "7.02px", "12339:1380", "45437e1b5547380278bd09fcaa40d0bbb7e284e4")}
    ${ph(18.96, 184.73, 163.77, 35.8, "0", "12339:1381", "2cffec2741e6e41a141a66ade55ac5336f9c8333")}
    ${ph(184.03, 35.12, 301.56, 116.51, "0", "12339:1382", "2cffec2741e6e41a141a66ade55ac5336f9c8333")}
    ${card(747.37, 180.52, 182.63, 504.33, 14.05)}
    ${ph(762.82, 470.95, 152.48, 202.66, "7.26px", "12339:1384", "7d3aa25457f828d992e0062e7214e6c999b0bfc6")}
    ${ph(762.82, 245.55, 154.69, 205.47, "7.26px", "12339:1385", "2bb29bada25486f1590863bfad9ea0839dcef91c")}
    <p style="position:absolute;left:762.82px;top:234.61px;width:45.75px;${small8}">До:</p>
    <p style="position:absolute;left:762.82px;top:458.65px;width:73.35px;${small8}">после:</p>
    ${ph(759.31, 188.95, 160.17, 35.82, "0", "12339:1388", "4b5f7f0269b5df1e9efb2628bfb28631b9ff4143")}
    ${avatar(777.66, 11.33, 127.84, 4, "12339:1393", "9b7d381b5398e4221935b37138bd33276cf976ba")}
    ${pill(796.54, 129.95, 89.21, 30.2, 15.33, "cellutox", "https://www.instagram.com/cellutox?igsh=dGNvdzRkNjh6ZWV0")}
    ${card(938.42, 180.52, 182.63, 504.33, 14.05)}
    ${ph(952.47, 470.95, 152.48, 202.66, "7.26px", "12339:1397", "e1bcc7a53f3c484da8858ad33e52a2508e0a778e")}
    ${ph(952.47, 245.55, 154.69, 205.47, "7.26px", "12339:1398", "d62ebc405ae627ed644cd442c44146cbd697aff2")}
    <p style="position:absolute;left:952.47px;top:234.61px;width:45.75px;${small8}">До:</p>
    <p style="position:absolute;left:952.47px;top:458.65px;width:73.35px;${small8}">после:</p>
    ${ph(950.36, 189.65, 158.45, 34.64, "0", "12339:1401", "a01aec9ce1e5c7327b6fa235662f06f53fd52b45")}
    ${card(1127.37, 180.52, 182.63, 504.33, 14.05)}
    ${ph(1161.09, 245.85, 112.16, 139.36, "4.01px", "12339:1403", "cff74f5626f46aea0bb0f3b8c16510878e193b56")}
    ${ph(1161.09, 408.1, 112.44, 99.7, "4.01px", "12339:1404", "9cc11d1508659b5dd5145e2b2e04f7000f669ecb")}
    <p style="position:absolute;left:1161.09px;top:234.61px;width:33.01px;${small8}">До:</p>
    <p style="position:absolute;left:1161.09px;top:392.65px;width:85.69px;${small8}">после:</p>
    ${ph(1161.09, 515.57, 115.98, 155.12, "4px", "12339:1407", "f8933c99967e0ac2ebfd974ac681f7b857171a62")}
    ${avatar(1157.66, 11.33, 127.84, 4, "12339:1412", "9cc11d1508659b5dd5145e2b2e04f7000f669ecb")}
    ${pill(1156.87, 129.25, 128.54, 31.38, 15.33, "meditattion_", "https://www.instagram.com/meditattion_?igsh=ajJsZDZzODhtdWVq")}
    ${avatar(968.71, 11.33, 127.84, 4, "12339:1419", "e9674734db329f014cdf60b49eab5224941d1201")}
    ${pill(967.92, 129.25, 128.54, 31.38, 15.33, "sl.aestheticc", "https://www.instagram.com/sl.aestheticc?igsh=cXQxbjFnajRrdmxs")}
    ${ph(1138.61, 189.65, 162.36, 35.49, "0", "12339:1422", "9cc11d1508659b5dd5145e2b2e04f7000f669ecb")}
    ${ph(23.18, 479.75, 158.11, 55.71, "7.02px", "12339:1423", "886f4f91b6075e27af1d6222de692433d79ec45f")}
    ${ph(200.19, 169.28, 140.48, 175.6, "7.02px", "12339:1424", "b3a95fa9dcb2c7bcee8590908c82faf048965293")}
    ${ph(348.4, 170.69, 139.27, 173.96, "7.02px", "12339:1425", "c417731a1e35dc59ce977ffc197c8289435f1edc")}
    ${ph(200.19, 363.85, 139.22, 174.02, "7.02px", "12339:1426", "7c21efaa5b5b94645e4cb875d5653e2bd578e674")}
    ${ph(512.76, 285.18, 183.89, 229.86, "7.02px", "12339:1427", "1ccb4f91f4c4eaaa79526e2a1c94b29b049c9f6a")}
    ${ph(507.14, 28.1, 189.79, 237.24, "7.02px", "12339:1428", "14f4707a2ffb85ecf43007acac135f221f4b9562")}
    ${ph(340.67, 357.53, 147.02, 183.77, "0", "12339:1429", "bd5a8ed44474f1a8758d16f8009354f86b9a5e40")}
    <p style="position:absolute;left:23.18px;top:562.63px;width:270.43px;${label15}">Что было сделано:</p>
    <p style="position:absolute;left:23.18px;top:592.08px;width:16px;${list15}">✅
✅
✅</p>
    <p style="position:absolute;left:389.14px;top:592.08px;width:16px;${list15}">✅
✅
✅</p>
    <p style="position:absolute;left:49.17px;top:591.43px;width:244.44px;${list14}">${b("три года")} продуктивной работы
провели ${b("ребрендинг аккаунта")}
написание ${b("технического задания к съемкам")}</p>
    <p style="position:absolute;left:415.13px;top:591.43px;width:297.82px;${list14}">разработка ${b("маркетинговой стратегии")}
работа с ${b("блогерами")}
создание ${b("контента в нейросетях")}</p>
    ${ph(829.55, 154.53, 23.18, 21.63, "0", "12339:1435")}
    ${ph(85.69, 165.07, 18.81, 17.56, "0", "12339:1441")}
    ${ph(1021.31, 154.53, 23.18, 21.63, "0", "12339:1447")}
    ${ph(1211.66, 154.53, 23.18, 21.63, "0", "12339:1453")}
  </div>

</div>`;

export const beautyH = 2735;
