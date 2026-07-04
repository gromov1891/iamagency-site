import IMGMAP from "./_imageMap.json";
/* Раздел «Кейсы / Tourism» — 1:1 из Figma IAM-WEB,
   фрейм «Tourism» #12354:3349 (1440×1813, белый фон).
   Тексты дословно из макета. Фото недоступны (Figma API 429) —
   вместо каждой картинки серая заглушка #E5E3E0 с data-figma-node /
   data-image-ref; манифест для докачки: tourismHtml.images.json.
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
/* style_0b051c25 — заголовок в чёрной пилюле */
const caseTitle =
  "font-family:Inter,sans-serif;font-weight:400;font-size:47.4px;line-height:86%;letter-spacing:-0.05em;text-transform:uppercase;color:#FFFFFF;margin:0;white-space:nowrap;";
/* style_c3a3a8aa — крупный текст карточки Whale Tours */
const body20 = `font-family:Inter,sans-serif;font-weight:400;font-size:19.84px;line-height:104%;color:${TXT};white-space:pre-line;margin:0;`;
/* style_68e0fafd — подписи карточки Whale Tours */
const label16 = `font-family:Inter,sans-serif;font-weight:600;font-size:16.32px;line-height:104%;text-transform:uppercase;color:${TXT};opacity:0.4;margin:0;`;
/* style_01aa65b7 — галочки нижней карточки */
const body15 = `font-family:Inter,sans-serif;font-weight:400;font-size:15.22px;line-height:104%;color:${TXT};white-space:pre-line;margin:0;`;
/* style_ce2a64a4 — списки нижней карточки */
const body14 = `font-family:Inter,sans-serif;font-weight:400;font-size:14.05px;line-height:104%;color:${TXT};white-space:pre-line;margin:0;`;
/* style_62fff22c — подписи нижней карточки */
const label147 = `font-family:Inter,sans-serif;font-weight:600;font-size:14.68px;line-height:104%;text-transform:uppercase;color:${TXT};opacity:0.4;margin:0;`;
/* style_48de5948 / style_65b20def / style_573d711a — мелкие «До:/после:» */
const tiny75 = `font-family:Inter,sans-serif;font-weight:600;font-size:7.46px;line-height:104%;text-transform:uppercase;color:${TXT};margin:0;`;
const tiny84 = `font-family:Inter,sans-serif;font-weight:600;font-size:8.42px;line-height:104%;text-transform:uppercase;color:${TXT};margin:0;`;
const nick = (fs: number) =>
  `font-family:Inter,sans-serif;font-weight:500;font-size:${fs}px;line-height:86%;letter-spacing:-0.03em;color:#272727;white-space:nowrap;`;

const b = (s: string) => `<span style="font-weight:600">${s}</span>`;

/* Заглушка вместо картинки */
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

/* Белая карточка с чёрной обводкой */
const card = (x: number, y: number, w: number, h: number, r: number) =>
  `<div style="position:absolute;left:${x}px;top:${y}px;width:${w}px;height:${h}px;background:#FFFFFF;border:1.4px solid #000000;border-radius:${r}px;box-sizing:border-box;"></div>`;

/* Пилюля с ником */
const pill = (
  x: number,
  y: number,
  w: number,
  h: number,
  fs: number,
  text: string,
  href?: string,
) =>
  href
    ? `<a href="${href}" target="_blank" rel="noopener" style="position:absolute;left:${x}px;top:${y}px;width:${w}px;height:${h}px;border:0.77px solid #272727;border-radius:23px;background:#FFF;display:flex;align-items:center;justify-content:center;box-sizing:border-box;text-decoration:none;"><span style="${nick(fs)}">${text}</span></a>`
    : `<div style="position:absolute;left:${x}px;top:${y}px;width:${w}px;height:${h}px;border:0.77px solid #272727;border-radius:23px;background:#FFF;display:flex;align-items:center;justify-content:center;box-sizing:border-box;"><span style="${nick(fs)}">${text}</span></div>`;

export const tourismH = 1813;

export const tourismHtml = `
<div style="position:relative;width:1440px;height:1813px;background:#FFFFFF;overflow:hidden;">

  <!-- хлебные крошки -->
  <div style="position:absolute;left:65px;top:30px;display:flex;gap:13px;align-items:baseline;white-space:nowrap;font-family:Inter,sans-serif;font-weight:500;font-size:23.42px;line-height:1;letter-spacing:-0.05em;text-transform:uppercase;"><a href="/" style="color:#9A9895;text-decoration:none;">Главная</a><span style="color:#9A9895;">→</span><a href="/keisy" style="color:#9A9895;text-decoration:none;">Кейсы</a><span style="color:#9A9895;">→</span><span style="color:#1C1C1C;">Tourism</span></div>

  <!-- чёрная пилюля «Кейс Whale Tours» -->
  <div style="position:absolute;left:65px;top:128px;width:555px;height:68px;">
    <div style="position:absolute;left:0;top:0;width:555px;height:68px;background:${DARK};border-radius:84.17px;"></div>
    <div style="position:absolute;left:27.21px;top:13.6px;width:446px;${caseTitle}">Кейс Whale Tours </div>
    <div style="position:absolute;left:493px;top:6px;width:55.27px;height:55.27px;border-radius:50%;background:#FFFFFF;box-shadow:inset 0px 0px 3.4px 3.4px rgba(245, 93, 28, 1);"></div>
    ${ph(502.35, 15.35, 36.56, 36.56, "", "12354:3358")}
  </div>

  <!-- ================= карточка кейса Whale Tours (текст) ================= -->
  <div style="position:absolute;left:68px;top:317.56px;width:518px;height:523.34px;">
    <div style="position:absolute;left:3.05px;top:0;width:164.02px;${label16}">Задача клиента:</div>
    <div style="position:absolute;left:3.05px;top:34.33px;width:466.89px;${body20}">Обновление визуала социальных сетей, повышение активности текущих подписчиков, увеличение узнаваемости и запросов</div>

    <div style="position:absolute;left:3.05px;top:140.37px;width:164.02px;${label16}">Что сделали:</div>
    <div style="position:absolute;left:3.05px;top:180.04px;width:20px;${body20}">✅
✅
✅</div>
    <div style="position:absolute;left:35.86px;top:177.75px;width:379.92px;${body20}">разработали ${b("фирменный стиль")}
разработали ${b("уникальный рубрикатор ")}для постов, сторис и рилс
настроили ${b("таргетированную рекламу ")}на зарубежную аудиторию</div>

    <div style="position:absolute;left:0;top:332.62px;width:518px;height:190.72px;">
      <div style="position:absolute;left:0;top:0;width:518px;height:190.72px;border:1.53px solid #000000;border-radius:15.26px;box-sizing:border-box;"></div>
      <div style="position:absolute;left:25.18px;top:19.62px;width:337.96px;${label16}">результат за два месяца работы:</div>
      <div style="position:absolute;left:23.65px;top:52.61px;width:19.84px;${body20}">✅
✅
✅</div>
      <div style="position:absolute;left:56.45px;top:52.06px;width:341.77px;${body20}">${b("1500+")} качественных подписчиков
${b("Sold Out")} на ближайшие туры
${b("+40%")} заявок
<span style="font-size:13.73px">за счет создания вирусных роликов и каруселей, а также запуска рекламных кампаний</span></div>
    </div>
  </div>

  <!-- ================= коллаж Whale Tours ================= -->
  <div style="position:absolute;left:638px;top:205px;width:737.16px;height:631.92px;">
    <div style="position:absolute;left:4.98px;top:0;width:113.2px;height:131.86px;">
      <div style="position:absolute;left:0;top:0;width:113.2px;height:113.2px;">
        <div style="position:absolute;left:-3.53px;top:-3.53px;width:120.42px;height:120.42px;border-radius:50%;background:${IG_GRAD};"></div>
        <img src="/blk/keisy/tourism-02-542cbe.webp" alt="" loading="lazy" style="position:absolute;left:0.08px;top:0.08px;width:113.2px;height:113.2px;border-radius:50%;border:3.61px solid #FFFFFF;box-sizing:border-box;;object-fit:cover;" />
      </div>
      ${pill(0.62, 105.11, 110.09, 26.74, 13.58, "whale.tours")}
    </div>
    ${ph(137.46, 26.12, 284.13, 80.26, "", "12354:3500", "1a1ded26388962ee3d1dab46c4d45045fe192a70")}
    ${ph(0, 139.94, 238.84, 66.55, "", "12354:3499", "1a1ded26388962ee3d1dab46c4d45045fe192a70")}
    ${ph(553.55, 4.98, 89.43, 51.7, "", "12354:3526", "0619235d317d3ad25baa1e92809235fbfa7138a4")}
    ${ph(468.96, 80.23, 78.45, 96.93, "6.22px", "12354:3528", "564526a0a1ce2a902a7e25c948665d411c540c8b")}
    ${ph(558.53, 80.23, 78.45, 96.93, "6.22px", "12354:3529", "fd31c435f045ad0cbf6beeb4ac92e374bdfdac0b")}
    ${ph(648.09, 80.23, 78.45, 96.93, "6.22px", "12354:3530", "37a62e824932978748d9288400c4cc3fd9f10a68")}
    ${ph(259.36, 156.74, 178.41, 33.49, "", "12354:3507", "a16d242c5386a7a505e59b3eac8662b55da020c9")}
    ${ph(259.36, 197.16, 179.03, 9.27, "", "12354:3508", "a16d242c5386a7a505e59b3eac8662b55da020c9")}
    ${ph(463.99, 187.83, 268.74, 36.77, "", "12354:3527", "2d8d46406ab02848c485cc7a721188b32cd5d9a9")}
    <div style="position:absolute;left:14.31px;top:220.8px;width:55.98px;${tiny75}">До:</div>
    <div style="position:absolute;left:208.98px;top:220.8px;width:89.56px;${tiny75}">после:</div>
    ${ph(14.31, 240.7, 180.45, 240.6, "6.59px", "12354:3501", "08d7f5bf19f36ce9e4523e92e4869bca1a1b322c")}
    ${ph(208.98, 240.7, 180.45, 240.6, "6.59px", "12354:3502", "220e3f3614d72a5a8b9e2e6c29be6b1410499231")}
    ${ph(400.55, 241.95, 102.59, 185.41, "6.22px", "12354:3510", "3e97bc1d476969bdb1c48d359e3849c2df8e0f27")}
    ${ph(514.37, 241.95, 102.59, 185.41, "6.22px", "12354:3509", "2b06a8415a084c771ab98c0295ea339b8a1f71b5")}
    ${ph(628.19, 241.95, 102.59, 185.41, "6.22px", "12354:3511", "f90a9023861a386c66d7318bee223c692c90adfb")}
    ${ph(400.55, 442.84, 131.24, 165.44, "6.22px", "12354:3523", "39bc5b5a34c9366be72f48a80b09a051e68aaaf3")}
    ${ph(539.25, 442.84, 63.57, 79.46, "6.22px", "12354:3521", "eb77fb41c8b6306b4edb781d5a0c69fef9017294")}
    ${ph(606.42, 442.84, 63.57, 79.46, "6.22px", "12354:3517", "8042ccdb75391397b48e79e34136cb43d48599d5")}
    ${ph(673.59, 442.84, 63.57, 79.46, "6.22px", "12354:3519", "30f7c91e4c832676630e5ee6941f2169d874cdf0")}
    ${ph(539.25, 526.19, 63.57, 79.46, "6.22px", "12354:3522", "b774b63ca94c3a2b088ec7867db20aae440da98c")}
    ${ph(606.42, 526.19, 63.57, 79.46, "6.22px", "12354:3518", "abe385033c8ca87e529d098d2ebb53c4f803b8be")}
    ${ph(673.59, 526.19, 63.57, 79.46, "6.22px", "12354:3520", "ee8bd4e73d097a77f7c9e85d705f886afe7a3b5c")}
    ${ph(218.31, 495.09, 116.93, 44.78, "", "12354:3512", "2d8d46406ab02848c485cc7a721188b32cd5d9a9")}
    ${ph(154.87, 531.78, 236.74, 72.22, "", "12354:3506", "2d8d46406ab02848c485cc7a721188b32cd5d9a9")}
    ${ph(155.49, 553.55, 236.74, 72.22, "", "12354:3505", "2d8d46406ab02848c485cc7a721188b32cd5d9a9")}
    ${ph(14.31, 493.84, 129.72, 40.32, "6.22px", "12354:3515", "6f55eefbabd6a303abd680cfe2e2debe8f160209")}
    ${ph(14.31, 537.38, 129.28, 41.7, "6.22px", "12354:3514", "1b8fb84d61e1a38af99f9420d8cbdbfe1b78f375")}
    ${ph(14.31, 583.41, 129.28, 41.7, "6.22px", "12354:3513", "287c43533764f8a06254fb2ee1745cdb7a4b6099")}
    ${ph(396.19, 612.64, 115.59, 18.99, "6.22px", "12354:3524", "39bc5b5a34c9366be72f48a80b09a051e68aaaf3")}
    ${ph(516.86, 612.64, 18.04, 19.28, "6.22px", "12354:3525", "39bc5b5a34c9366be72f48a80b09a051e68aaaf3")}
    ${ph(538, 612.02, 193.74, 18.3, "", "12354:3516", "05baaac83fefca1203e7a2105e95a5f1a4df9fce")}
  </div>

  <!-- ================= ряд 2: tvs_visa / citgroupe / vizavshengen ================= -->
  <div style="position:absolute;left:65px;top:989.26px;width:1310px;height:684.19px;">

    <!-- большая карточка tvs_visa -->
    ${card(0, 0, 737.52, 684.19, 14.03)}
    <div style="position:absolute;left:32.98px;top:23.16px;width:127.71px;height:145.96px;">
      <div style="position:absolute;left:0;top:0;width:127.71px;height:127.71px;">
        <div style="position:absolute;left:-3.98px;top:-3.98px;width:135.87px;height:135.87px;border-radius:50%;background:${IG_GRAD};"></div>
        <img src="/blk/keisy/tourism-33-7d4316.webp" alt="" loading="lazy" style="position:absolute;left:0.09px;top:0.09px;width:127.71px;height:127.71px;border-radius:50%;border:4.08px solid #FFFFFF;box-sizing:border-box;;object-fit:cover;" />
      </div>
      ${pill(9.82, 115.78, 105.96, 30.17, 15.32, "tvs_visa", "https://www.instagram.com/tvs_visa?igsh=MTZ6dzJjdjJvdG1kaA==")}
    </div>
    ${ph(17.54, 184.55, 215.5, 56.82, "", "12354:3543", "476cfe91605c87c91c7baec337993eba304f08da")}
    ${ph(233.68, 181.75, 156.57, 56.81, "", "12354:3544", "ca35d221176530258ba623a8d42575dd9d0ff228")}
    <div style="position:absolute;left:24.56px;top:251.22px;width:58.95px;${tiny84}">до:</div>
    <div style="position:absolute;left:215.43px;top:251.22px;width:59.65px;${tiny84}">после:</div>
    ${ph(23.16, 263.85, 174.88, 219.45, "7.44px", "12354:3541", "619ce67b3671808a730906842bf5ec11cb2b13fa")}
    ${ph(215.43, 263.85, 174.88, 219.45, "7.44px", "12354:3542", "c839c717d3ee884dcb58dba31255345752ef7b09")}
    <div style="position:absolute;left:23.16px;top:501.03px;width:256.03px;${label147}">Что было сделано:</div>
    <div style="position:absolute;left:369.11px;top:501.03px;width:256.03px;${label147}">результаты:</div>
    <div style="position:absolute;left:23.16px;top:528.4px;width:15.44px;${body15}">✅
✅
✅
✅
✅</div>
    <div style="position:absolute;left:47.72px;top:527px;width:301.04px;${body14}">разработали ${b("SMM-стратегию")}
создали ${b("варианты визуальной концепции, tov и позиционирование")}
упаковали${b(" профиль")}
для продвижения использовали ${b("блогеров")}
создали ${b("телеграм канал")} для повышения коммуникации с пользователями в альтернативных социальных сетях</div>
    <div style="position:absolute;left:369.11px;top:528.4px;width:15.44px;${body15}">✅
✅
 ✅</div>
    <div style="position:absolute;left:393.67px;top:527px;width:145.96px;${body14}">${b("1000+")} новых подписчиков
${b("500k+")} просмотров на рилс
${b("50+")} довольных клиентов на туры и визы за 2 месяца</div>

    <!-- телефоны в большой карточке -->
    ${ph(443.49, 18.95, 130.59, 232.16, "7.02px", "12354:3553", "b1b795e33ae70b429b8efa6cb94a4e21ffc48912")}
    ${ph(586.64, 18.95, 130.59, 232.16, "7.02px", "12354:3551", "dc885c665282ddc29a49b5e21746aaf3bcf4b042")}
    ${ph(443.49, 263.85, 86.1, 107.63, "4.21px", "12354:3554", "c47bf873e004828f5a8d14d3639d61942e3ff5ac")}
    ${ph(443.49, 376.13, 86.1, 107.63, "4.21px", "12354:3555", "6bac04b961f1e7f7143e005caf8e5b12ff7a7255")}
    ${ph(539.63, 270.87, 177.54, 89.82, "7.02px", "12354:3558", "24f9cdd320719cace430d397309ba3583f37db8c")}
    ${ph(543.84, 352.27, 169.12, 16.14, "7.02px", "12354:3560", "f72d9357f0adb28d118d325cbf0fa27d8f72259c")}
    ${ph(543.84, 374.02, 169.12, 16.14, "7.02px", "12354:3559", "f72d9357f0adb28d118d325cbf0fa27d8f72259c")}
    ${ph(543.84, 387.35, 169.12, 127.01, "7.02px", "12354:3557", "3343ce103bebbdca5003c36d3959092dce80c53e")}
    ${ph(475.77, 443.49, 115.92, 206.07, "7.02px", "12354:3552")}
    ${ph(543.84, 530.51, 169.03, 145.33, "7.02px", "12354:3556", "c3548c0d6d498801349426a0b737b3c0c7d891d4")}
    ${ph(770.4, 578.99, 58.52, 104.03, "3.51px", "12354:3561", "55c153ec6ec17659be3084176b44f91b0fbf83d9")}

    <!-- колонка citgroupe -->
    <div style="position:absolute;left:747.34px;top:11.23px;width:276.42px;height:672.96px;">
      ${card(0, 169.12, 276.42, 503.84, 14.03)}
      <div style="position:absolute;left:45.72px;top:0;width:193.49px;height:148.77px;">
        <div style="position:absolute;left:0;top:0;width:193.49px;height:127.71px;">
          <div style="position:absolute;left:29px;top:-3.98px;width:135.87px;height:135.87px;border-radius:50%;background:${IG_GRAD};"></div>
          <img src="/blk/keisy/tourism-49-46cd20.webp" alt="" loading="lazy" style="position:absolute;left:33.07px;top:0.1px;width:127.71px;height:127.71px;border-radius:50%;border:4.08px solid #FFFFFF;box-sizing:border-box;;object-fit:cover;" />
          ${ph(128.31, -6.31, 45.61, 45.61, "50%", "12354:3570", "92019180f321ba0111956ed4708ba9013ea4ae43")}
        </div>
        ${pill(32.18, 118.59, 128.42, 30.17, 15.32, "citgroupe", "https://www.instagram.com/citgroupe?igsh=cjZjcXl3Nm41aDAx")}
      </div>
      <div style="position:absolute;left:17.54px;top:196.48px;width:45.71px;${tiny84}">До:</div>
      ${ph(81.4, 196.48, 178.08, 222.64, "7.02px", "12354:3573", "cb669e56f5c6da79e1b57f0499c3e2b51bc74325")}
      <div style="position:absolute;left:16.14px;top:432.26px;width:73.28px;${tiny84}">после:</div>
      ${ph(81.4, 432.26, 178.08, 222.64, "7.02px", "12354:3574", "14a78795d0e97a8964de1002478e86a19ff30377")}
      ${ph(43.78, 411.68, 195.08, 259.28, "7.26px", "12354:3564")}
    </div>

    <!-- колонка vizavshengen -->
    <div style="position:absolute;left:1033.58px;top:11.23px;width:276.42px;height:672.96px;">
      <div style="position:absolute;left:0;top:169.12px;width:276.42px;height:503.84px;">
        ${card(0, 0, 276.42, 503.84, 14.03)}
        ${ph(24.62, 1.4, 227.51, 51.93, "", "12354:3580", "2f93bc79e67456e34c34a9a94694833f3599f160")}
      </div>
      <div style="position:absolute;left:46.78px;top:0;width:193.49px;height:148.77px;">
        <div style="position:absolute;left:0;top:0;width:193.49px;height:127.71px;">
          <div style="position:absolute;left:29px;top:-3.98px;width:135.87px;height:135.87px;border-radius:50%;background:${IG_GRAD};"></div>
          <img src="/blk/keisy/tourism-55-6e61ad.webp" alt="" loading="lazy" style="position:absolute;left:33.07px;top:0.1px;width:127.71px;height:127.71px;border-radius:50%;border:4.08px solid #FFFFFF;box-sizing:border-box;;object-fit:cover;" />
        </div>
        ${pill(14.88, 118.59, 162.66, 30.17, 15.32, "vizavshengen", "https://www.instagram.com/vizavshengen?igsh=MWkxc2FibWlrbDBtNQ==")}
      </div>
    </div>
    ${ph(183.85, 54.03, 245.22, 72.89, "", "12354:3590", "68f8cdbeaaceaecbf5d8ca9c4899a69ee17b9e29")}
    ${ph(1065.22, 246.3, 214.73, 211.22, "7.02px", "12354:3591", "cee48166dcd7b511c5af868e1b85ce66c517baa5")}
    <div style="position:absolute;left:1047.68px;top:471.56px;width:251.92px;height:193.68px;">
      ${ph(0, 0, 108.86, 193.52, "7.02px", "12354:3593", "887bb424330eb2442dffb970f386f73797dedff9")}
      ${ph(112.98, 0, 53.11, 94.42, "4.21px", "12354:3594", "a5f83613a9721f3ec93e847ee6619a36e27ee9d7")}
      ${ph(112.98, 99.26, 53.11, 94.42, "4.21px", "12354:3595", "51e8d9ae0444fc54c67be3784898133c4ead4e4c")}
      ${ph(169.12, 145.96, 82.8, 47.72, "4.21px", "12354:3596", "8e4dabde9d4b3ba7e6180a992cf56db13cac836a")}
    </div>
    ${ph(1216.1, 470.86, 89.82, 138.24, "", "12354:3615", "b125e6bec7fd9d4e0cb6af6e1722810b5210a98e")}
    ${ph(84.21, 163.5, 23.16, 21.61, "", "12354:3597")}
    ${ph(877.86, 155.08, 23.16, 21.61, "", "12354:3603")}
    ${ph(1165.57, 155.08, 23.16, 21.61, "", "12354:3609")}
  </div>

</div>`;
