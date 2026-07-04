import IMGMAP from "./_imageMap.json";
/* Раздел «Кейсы / Real Estate» — 1:1 из Figma IAM-WEB,
   фрейм «Real Estate » #12354:2962 (1440×2735, белый фон).
   Тексты дословно из макета. Фото недоступны (Figma API 429) —
   вместо каждой картинки серая заглушка #E5E3E0 с data-figma-node /
   data-image-ref; манифест для докачки: realEstateHtml.images.json.
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
/* style_bf5cb97c — крупный текст карточки Villo */
const body20 = `font-family:Inter,sans-serif;font-weight:400;font-size:19.97px;line-height:104%;color:${TXT};white-space:pre-line;margin:0;`;
/* style_95f77532 — подписи в карточке Villo */
const label16 = `font-family:Inter,sans-serif;font-weight:600;font-size:16.43px;line-height:104%;text-transform:uppercase;color:${TXT};opacity:0.4;margin:0;`;
/* style_764db58d — галочки нижних карточек */
const body156 = `font-family:Inter,sans-serif;font-weight:400;font-size:15.58px;line-height:104%;color:${TXT};white-space:pre-line;margin:0;`;
/* style_4071d0b9 — списки нижних карточек */
const body14 = `font-family:Inter,sans-serif;font-weight:400;font-size:14.38px;line-height:104%;color:${TXT};white-space:pre-line;margin:0;`;
/* style_c282b972 — подписи нижних карточек */
const label15 = `font-family:Inter,sans-serif;font-weight:600;font-size:15.03px;line-height:104%;text-transform:uppercase;color:${TXT};opacity:0.4;margin:0;`;
/* style_a8211835 / style_44f1c27f — мелкие «До:/после:» */
const tiny = `font-family:Inter,sans-serif;font-weight:600;font-size:8.43px;line-height:104%;text-transform:uppercase;color:${TXT};margin:0;`;
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

/* Аватар 127.84 с инста-градиентным кольцом (136) */
const avatar = (x: number, y: number, node: string, ref: string) => {
  const _f = (IMGMAP as Record<string, string>)[node + "|" + (ref || "")];
  const inner = _f
    ? `<img src="/blk/keisy/${_f}" alt="" loading="lazy" style="position:absolute;left:0.09px;top:0.09px;width:127.84px;height:127.84px;border-radius:50%;object-fit:cover;border:4.08px solid #FFFFFF;box-sizing:border-box;" />`
    : `<div style="position:absolute;left:0.09px;top:0.09px;width:127.84px;height:127.84px;border-radius:50%;background:${PH};border:4.08px solid #FFFFFF;box-sizing:border-box;" data-figma-node="${node}" data-image-ref="${ref}"></div>`;
  return `<div style="position:absolute;left:${x}px;top:${y}px;width:127.84px;height:127.84px;">
    <div style="position:absolute;left:-3.99px;top:-3.99px;width:136px;height:136px;border-radius:50%;background:${IG_GRAD};"></div>
    ${inner}
  </div>`;
};

export const realEstateH = 2735;

export const realEstateHtml = `
<div style="position:relative;width:1440px;height:2735px;background:#FFFFFF;overflow:hidden;">

  <!-- хлебные крошки -->
  <div style="position:absolute;left:65px;top:30px;display:flex;gap:13px;align-items:baseline;white-space:nowrap;font-family:Inter,sans-serif;font-weight:500;font-size:23.42px;line-height:1;letter-spacing:-0.05em;text-transform:uppercase;"><a href="/" style="color:#9A9895;text-decoration:none;">Главная</a><span style="color:#9A9895;">→</span><a href="/keisy" style="color:#9A9895;text-decoration:none;">Кейсы</a><span style="color:#9A9895;">→</span><span style="color:#1C1C1C;">Real Estate</span></div>

  <!-- чёрная пилюля «Кейс Villo» -->
  <div style="position:absolute;left:65px;top:128px;width:362px;height:68px;">
    <div style="position:absolute;left:0;top:0;width:362px;height:68px;background:${DARK};border-radius:84.17px;"></div>
    <div style="position:absolute;left:27.21px;top:13.6px;width:252px;${caseTitle}">Кейс Villo </div>
    <div style="position:absolute;left:299px;top:6px;width:55.27px;height:55.27px;border-radius:50%;background:#FFFFFF;box-shadow:inset 0px 0px 3.4px 3.4px rgba(137, 146, 228, 1);"></div>
    ${ph(308.35, 15.35, 36.56, 36.56, "", "12354:2971")}
  </div>

  <!-- ================= карточка кейса Villo (текст) ================= -->
  <div style="position:absolute;left:65px;top:238.05px;width:460px;height:602.07px;">
    <div style="position:absolute;left:3.07px;top:0;width:165.11px;${label16}">Задача клиента:</div>
    <div style="position:absolute;left:3.07px;top:24.57px;width:450.78px;${body20}">Cоздание фирменного стиля проекта, популяризация маркетплейса недвижимости в индонезии, ведение социальных сетей, создание вирусных роликов, работа с блогерами</div>

    <div style="position:absolute;left:3.07px;top:148.21px;width:165.11px;${label16}">Что сделали:</div>
    <div style="position:absolute;left:3.07px;top:178.16px;width:20px;${body20}">✅
✅
 ✅</div>
    <div style="position:absolute;left:36.09px;top:175.86px;width:417.76px;${body20}">разработали ${b("брендбук (упаковка)")}
разработали ${b("SMM-стратегию, лонч продукта")} (Google Ads, Meta, Яндекс Директ, Telegram Ads, VK)
ведение ${b("аккаунтов")} в инстаграм ${b("на трех языках:")} русском, английском и индонезийском</div>

    <div style="position:absolute;left:0;top:360.17px;width:460px;height:241.9px;">
      <div style="position:absolute;left:0;top:0;width:460px;height:241.9px;border:1.54px solid #000000;border-radius:15.36px;box-sizing:border-box;"></div>
      <div style="position:absolute;left:25.34px;top:16.19px;width:165.11px;${label16}">результат:</div>
      <div style="position:absolute;left:25.34px;top:38.58px;width:425.44px;${body20}">маркетплейс стал ${b("№1")} на Бали, месячное количество пользователей ${b("больше  250 000 человек")}, SEO оптимизация привела к доли органических переходов ${b("в 35% уже на 5 месяц проекта")}, концепция вирусных роликов с балийскими бабушками ${b("попала")} ${b("в тренды")} и привела с созданию серии видео с другими брендами по острову Бали.</div>
    </div>
  </div>

  <!-- ================= коллаж Villo ================= -->
  <div style="position:absolute;left:609px;top:237px;width:766.06px;height:604.85px;">
    <div style="position:absolute;left:38px;top:0;width:118.49px;height:127.51px;">
      <div style="position:absolute;left:5.41px;top:0;width:109.47px;height:109.47px;">
        <div style="position:absolute;left:-3.41px;top:-3.41px;width:116.45px;height:116.45px;border-radius:50%;background:${IG_GRAD};"></div>
        <img src="/blk/keisy/realestate-02-1a6031.png" alt="" loading="lazy" style="position:absolute;left:0.08px;top:0.08px;width:109.47px;height:109.47px;border-radius:50%;border:3.49px solid #FFFFFF;box-sizing:border-box;;object-fit:cover;" />
      </div>
      ${pill(0, 101.65, 118.49, 25.86, 13.13, "villo.indonesia")}
    </div>
    ${ph(12.63, 144.72, 179.51, 40.24, "", "12354:3197", "55febad870f76d681627285bbf08afcf578f05a1")}
    ${ph(210.51, 20.82, 189.42, 155.81, "6.01px", "12354:3207", "c5cb7cf168a77a90334a039237c19572ed2d829d")}
    ${ph(417, 21, 349.06, 159.89, "6.01px", "12354:3202", "70c4f2f8c989323e7f192793470af9b6d074d9cd")}
    ${ph(0, 192.24, 178.69, 90.49, "", "12354:3205", "f525e0c86585697ea0e6f0231bf8bc7381b4fa0b")}
    ${ph(196.68, 187.43, 189.14, 96.09, "", "12354:3206", "b3fa7d1913e96b1f92f671ffe6b09882b9c7568b")}
    ${ph(12.63, 292.08, 372.77, 90.25, "6.01px", "12354:3204", "975029aaaab215c84b90d8b7df4a61332930eaa8")}
    ${ph(402.37, 189.83, 109.53, 192.35, "6.01px", "12354:3200", "8987075fe65b5bed94094e9ec66a23bce6a276fc")}
    ${ph(530, 190, 108.25, 190.09, "6.01px", "12354:3199", "b13b8e86b9e79759183b8678a7981813e62849d7")}
    ${ph(657, 190, 108.72, 190.92, "6.01px", "12354:3198", "356c5552890a90ec3d90c06c1b0c424decabe213")}
    ${ph(478.16, 389.52, 287.5, 212.31, "", "12354:3201", "d5560d0c593cc2b4fca71dd061837ad26516c75b")}
    ${ph(4.21, 406.96, 469.7, 197.9, "", "12354:3203", "8616bd71458904ab931c49c4d8aa566290a7dd07")}
    ${ph(130.02, 0, 36.69, 36.69, "50%", "12354:3208", "f94aa13e14341b3c50825a26645563c6cad0b7a3")}
  </div>

  <!-- ================= ряд 2: ideoligist / kaufman / citron / ln.estate / iisinvest ================= -->
  <div style="position:absolute;left:65px;top:986.59px;width:1310px;height:684.85px;">

    <!-- большая карточка ideoligist.plus -->
    ${card(0, 0, 738.24, 684.85, 14.05)}
    <div style="position:absolute;left:28.1px;top:23.18px;width:134.16px;height:146.1px;">
      ${avatar(4.21, 0, "12354:3216", "37a1bde41c6d0e4169001eb411e66b12108daeef")}
      ${pill(0, 115.9, 134.16, 30.2, 15.33, "ideoligist.plus")}
    </div>
    ${ph(178.41, 66.03, 286.58, 116.6, "", "12354:3222", "37a1bde41c6d0e4169001eb411e66b12108daeef")}
    ${ph(20.37, 205.11, 203.74, 55.48, "", "12354:3221", "37a1bde41c6d0e4169001eb411e66b12108daeef")}
    <div style="position:absolute;left:22.48px;top:278.86px;width:52.68px;${tiny}">До:</div>
    ${ph(23.18, 298.53, 200.85, 200.93, "7.44px", "12354:3219", "bdf07695966f13e9c18051f9b10e380d8a07ce2d")}
    <div style="position:absolute;left:238.82px;top:213.53px;width:84.29px;${tiny}">после:</div>
    ${ph(238.82, 231.8, 200.8, 267.74, "7.44px", "12354:3220", "281cf4f9d0ed5ba5c7af28fd2377a96ee79e2da3")}
    <div style="position:absolute;left:23.18px;top:552.8px;width:270.43px;${label15}">Что было сделано:</div>
    <div style="position:absolute;left:23.18px;top:579.44px;width:16px;${body156}">✅
✅
✅</div>
    <div style="position:absolute;left:48.95px;top:580.25px;width:352px;${body14}">полный ${b("ребрендинг")} социальных сетей заказчика
разработка ${b("концептуальной стратегии")} ведения и продвижения проекта
упаковка аккаунта ${b("с участием графического дизайнера и использованием нейросетей")}</div>

    <!-- телефоны «до/после» в большой карточке -->
    ${ph(479.75, 18.97, 115.28, 204.95, "7.02px", "12354:3262", "e865cd306d995858ffaa977b881d50dc36de4c35")}
    ${ph(479.75, 231.8, 115.28, 204.95, "7.02px", "12354:3263", "c7350e699e421184dce59efc2508e3d38c24be33")}
    ${ph(602.67, 18.97, 115.28, 204.95, "7.02px", "12354:3258", "0babff52a1b003ef9360646d03c9b2b338253dfb")}
    ${ph(602.67, 231.8, 115.28, 204.95, "7.02px", "12354:3259", "cf4f007ffae70624f0286cf35ef40c4a2d663cce")}
    ${ph(476.24, 443.93, 116.03, 206.28, "7.02px", "12354:3260", "06c18d130982c37ae16d1f2fa64623d5fdac3cc7")}
    ${ph(602.67, 443.93, 116.03, 206.28, "7.02px", "12354:3261", "36362916efd879093b854271ec41c14fbebd6565")}

    <!-- узкая карточка kaufman_project -->
    ${card(747.37, 180.52, 182.63, 504.33, 14.05)}
    <div style="position:absolute;left:762.82px;top:11.24px;width:156.64px;height:148.91px;">
      ${avatar(14.75, 0, "12354:3231", "852c870af5bfd2b4af1aea4b1c20a5a2c50f2a8b")}
      ${pill(0, 118.71, 156.64, 30.2, 15.33, "kaufman_project")}
    </div>
    ${ph(759.31, 191.06, 160.17, 35.82, "", "12354:3234", "852c870af5bfd2b4af1aea4b1c20a5a2c50f2a8b")}
    <div style="position:absolute;left:762.82px;top:236.71px;width:45.75px;${tiny}">До:</div>
    ${ph(761.42, 247.95, 158.05, 156.63, "7.26px", "12354:3265", "e15c1c97a955fd7eb6a270f06e792d8500d515ba")}
    <div style="position:absolute;left:761.42px;top:444.63px;width:73.35px;${tiny}">после:</div>
    ${ph(761.42, 457.27, 158.65, 210.86, "7.26px", "12354:3264", "0b344971adfcd9fcad3701bc3c742f0b98f0e67e")}

    <!-- узкая карточка iisinvest -->
    <div style="position:absolute;left:938.42px;top:180.52px;width:182.63px;height:504.33px;">
      ${card(0, 0, 182.63, 504.33, 14.05)}
      ${ph(14.05, 10.54, 154.53, 34.56, "", "12354:3237", "85e33dc9238d8445716a468fc078ba66464658a5")}
      ${ph(12.02, 55.9, 161.42, 214.41, "7.26px", "12354:3239", "d2d88e741207ef3e615463ac50e67ec03ce25bdf")}
      ${ph(12.02, 279.26, 159.53, 212.02, "7.26px", "12354:3238", "0b8d6c4389d081f7621a6a522e5be4da493341f8")}
    </div>
    <div style="position:absolute;left:969.33px;top:11.24px;width:127.84px;height:148.91px;">
      ${avatar(0, 0, "12354:3253", "85e33dc9238d8445716a468fc078ba66464658a5")}
      ${pill(16.16, 118.71, 94.83, 30.2, 15.33, "iisinvest")}
    </div>

    <!-- узкая карточка ln.estate.moscow -->
    ${card(1127.37, 180.52, 182.63, 504.33, 14.05)}
    ${ph(1141.42, 191.76, 154.53, 34.56, "", "12354:3241", "ff14a9bf1fc80e8bd5bae2aa2b412789ef0dfd04")}
    <div style="position:absolute;left:1142.83px;top:11.24px;width:160.85px;height:148.91px;">
      ${avatar(16.86, 0, "12354:3246", "ff14a9bf1fc80e8bd5bae2aa2b412789ef0dfd04")}
      ${pill(0, 118.71, 160.85, 30.2, 15.33, "ln.estate.moscow")}
    </div>
    ${ph(1137.91, 236.01, 158.05, 156.63, "7.26px", "12354:3266", "2d5a3c22cd0dfd58faedfb0909af551a756a01d8")}
    ${ph(1137.91, 396.86, 77.35, 137.52, "7.02px", "12354:3272", "efcc98b7a8ab62a1a4503e80daa7441792a39008")}
    ${ph(1218.69, 396.86, 77.35, 137.52, "7.02px", "12354:3271", "146aeae6e8fd07a3f89e49f88c3d38f6eff8ec48")}
    ${ph(1137.91, 536.64, 77.35, 137.52, "7.02px", "12354:3270", "2c17860452d6ea55a7d6beaa1ff66ec52cb0a333")}
    ${ph(1218.69, 536.64, 77.35, 137.52, "7.02px", "12354:3269", "8d242b967de37863917947e46207d02d41e67fb2")}

    <!-- бейджи-кружки -->
    ${ph(132.76, 23.18, 42.85, 42.85, "50%", "12354:3273", "306e6abf7bc8ee3e102db2bd578f0ef6541f8bc6")}
    ${ph(167.88, 23.18, 42.85, 42.85, "50%", "12354:3274", "0ff828911a5b829a1ede65190d83c756c2489d28")}
  </div>

  <!-- ================= ряд 3: belousov / katerina / citron.ge / ikon.ge ================= -->
  <div style="position:absolute;left:65px;top:1821px;width:1310px;height:684.85px;">

    <!-- большая карточка belousov_interiors -->
    ${card(0, 0, 738.24, 684.85, 14.05)}
    <div style="position:absolute;left:12.64px;top:23.18px;width:166.47px;height:146.1px;">
      ${avatar(19.67, 0, "12354:3327", "8f2587b1e8d0833931bf3fc906f5cc149efae79d")}
      ${pill(0, 115.9, 166.47, 30.2, 15.33, "belousov_interiors", "https://www.instagram.com/belousov_interiors?igsh=OHNwM3R2ajh1b2Rs")}
    </div>
    ${ph(178.41, 44.96, 238.88, 97.19, "", "12354:3332", "8f2587b1e8d0833931bf3fc906f5cc149efae79d")}
    ${ph(12.64, 187.54, 175.39, 39.23, "", "12354:3331", "8f2587b1e8d0833931bf3fc906f5cc149efae79d")}
    ${ph(12.64, 235.31, 174.9, 233.2, "7.44px", "12354:3330", "86942185b2780d28a17acf336d4be4593ac7092f")}
    ${ph(196.68, 192.46, 534.54, 273.94, "7.02px", "12354:3336", "5fbd5906e1a73c845e228ed821ea413ef2faf095")}
    ${ph(427.77, 15.45, 294.24, 168.62, "", "12354:3338", "f40fe374e01ee695ca212c65602c3bc7ccae9efe")}
    ${ph(414.42, 474.83, 307.66, 176.31, "", "12354:3337", "f40fe374e01ee695ca212c65602c3bc7ccae9efe")}
    <div style="position:absolute;left:23.18px;top:490.28px;width:270.43px;${label15}">Что было сделано:</div>
    <div style="position:absolute;left:23.18px;top:516.92px;width:16px;${body156}">✅
✅
✅
✅</div>
    <div style="position:absolute;left:49.17px;top:517.68px;width:366.66px;${body14}">полный ${b("ребрендинг")} социальных сетей заказчика
разработка ${b("концептуальной стратегии")} ведения и продвижения проекта
запуск инструментов по ${b("привлечению входящего трафика:")} бот массовых действий, комментинг и рассылки
развитие ${b("профиля студии в Pinterest с 0 до 300к+ посещений в месяц")} с переходами на сайт и другие социальные сети клиента</div>
    ${ph(85.69, 165.07, 18.81, 17.56, "", "12354:3341")}

    <!-- колонка katerina_sdesign -->
    <div style="position:absolute;left:747.37px;top:11.24px;width:182.63px;height:673.61px;">
      ${card(0, 169.28, 182.63, 504.33, 14.05)}
      <div style="position:absolute;left:15.45px;top:0;width:156.64px;height:148.91px;">
        ${avatar(14.75, 0, "12354:3314", "68c81cc5e4763b8a7105182401fdf15bee5b3068")}
        ${pill(0, 118.71, 156.64, 30.2, 15.33, "katerina_sdesign")}
      </div>
      ${ph(18.26, 179.82, 143.99, 35.82, "", "12354:3317", "68c81cc5e4763b8a7105182401fdf15bee5b3068")}
      ${ph(11.24, 225.47, 163.75, 218.33, "7.02px 7.02px 0px 0px", "12354:3318", "a8872a7ac8eef6ae4789e2d1fd32984cd9b4038f")}
      ${ph(11.24, 443.92, 163.32, 69.68, "0px 0px 7.02px 7.02px", "12354:3319", "b95fea2eb86004c22b73fa36841f85ed4b464b64")}
      ${ph(11.94, 517.68, 80.69, 143.45, "7.24px", "12354:3320", "6177b4a75b2f63598734ebd6677c67c46bd5bb59")}
      ${ph(95.53, 518.38, 80.49, 143.1, "7.24px", "12354:3321", "8cb73d35c88313aed34755d184bedefa5b1d948d")}
    </div>

    <!-- колонка citron.ge -->
    <div style="position:absolute;left:938.42px;top:11.24px;width:182.63px;height:673.61px;">
      ${card(0, 169.28, 182.63, 504.33, 14.05)}
      ${ph(12.64, 181.22, 156.84, 35.08, "", "12354:3294", "1beba4396b436936c34c8bad2b4b50df5783862a")}
      ${ph(12.64, 225.47, 158.04, 209.32, "7.26px", "12354:3295", "23af8edb98dae36bc7a6ed2d4f11bc0d3d388a41")}
      <div style="position:absolute;left:30.91px;top:0;width:127.84px;height:127.84px;">
        ${avatar(0, 0, "12354:3299", "1beba4396b436936c34c8bad2b4b50df5783862a")}
        ${pill(47.06, 118.71, 94.83, 30.2, 15.33, "citron.ge")}
      </div>
      <div style="position:absolute;left:24.58px;top:441.12px;width:124.24px;height:219.86px;">
        ${ph(0, 0, 61.72, 109.73, "7.02px", "12354:3306", "8a3f7e261352d1e8602f17c7fe2d83ed5b12722f")}
        ${ph(62.51, 0, 61.37, 109.11, "7.02px", "12354:3303", "1ed650ab8df08c6684e60530ddde09ef86d4e9da")}
        ${ph(0, 110.12, 61.72, 109.73, "7.02px", "12354:3304", "93bf07039ce483e63177748235d7f2281ef9f904")}
        ${ph(62.51, 110.12, 61.72, 109.73, "7.02px", "12354:3305", "a2e47fccd2db1153ad00c7f01385510632d871d4")}
      </div>
      ${ph(131.35, 1.41, 42.85, 42.85, "50%", "12354:3307", "c2289bd5065a762c1c0028e858ac07b6e119b2da")}
    </div>

    <!-- колонка ikon_ge -->
    <div style="position:absolute;left:1127.37px;top:11.24px;width:182.63px;height:673.61px;">
      <div style="position:absolute;left:0;top:169.28px;width:182.63px;height:504.33px;">
        ${card(0, 0, 182.63, 504.33, 14.05)}
        ${ph(14.05, 10.54, 154.53, 34.56, "", "12354:3280", "a63919089af6a4ef85fb18c9608aaded794b1264")}
        ${ph(8.43, 55.49, 163.32, 69.68, "7.02px 7.02px 0px 0px", "12354:3282", "cdbe8f2667b15cf1473e6200dc5288150f184fb6")}
        ${ph(8.43, 125.03, 163.66, 217.05, "0px 0px 7.02px 7.02px", "12354:3281", "70c6bf52f7c7c5ecf13114cd1985cc96b0313ef6")}
      </div>
      <div style="position:absolute;left:30.91px;top:0;width:127.84px;height:148.91px;">
        ${avatar(0, 0, "12354:3287", "34635a5a3c3811a5c9d7f415a67a131b96129629")}
        ${ph(100.45, 1.41, 42.85, 42.85, "50%", "12354:3288", "c2289bd5065a762c1c0028e858ac07b6e119b2da")}
        ${pill(16.16, 118.71, 94.83, 30.2, 15.33, "ikon_ge")}
      </div>
    </div>
    ${ph(1133.69, 526.81, 169.98, 14.75, "7.02px", "12354:3291", "16e75fc9ff6f29aaeb195caa1fb1b20fa0e2afb9")}
    ${ph(1147.74, 548.58, 70.14, 124.5, "7.02px", "12354:3339", "56589e2f1c720d55c0a8c1c5340ba40cf8d431bb")}
    ${ph(1221.5, 548.58, 69.79, 123.88, "7.02px", "12354:3340", "56589e2f1c720d55c0a8c1c5340ba40cf8d431bb")}
  </div>

</div>`;
