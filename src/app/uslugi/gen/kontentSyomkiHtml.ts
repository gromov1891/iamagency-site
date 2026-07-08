/* Страница «услуги / Контент / Съёмки» — 1:1 из Figma IAM-WEB,
   фрейм «Услуги 4» #12437:343 (1440×2807, тёмный #1C1C1C, акцент #90BEE9).
   Тексты дословно из макета. Рендерится через BuilderBlock (масштаб от 1440). */

const GRAY = "#9A9895";
const BLUE = "#90BEE9";
const WHITE = "#FFFFFF";

/* Типографика из макета */
const h2 =
  "font-family:Coolvetica,sans-serif;font-weight:400;font-size:103.72px;line-height:86%;text-transform:uppercase;text-align:justify;color:#FFF;white-space:pre-line;margin:0;";
const para = `font-family:Inter,sans-serif;font-weight:400;font-size:30.16px;line-height:86%;letter-spacing:-0.05em;text-transform:lowercase;text-align:justify;color:${GRAY};white-space:pre-line;margin:0;`;
const list =
  "font-family:Inter,sans-serif;font-weight:400;font-size:34px;line-height:86%;letter-spacing:-0.05em;text-transform:lowercase;text-align:left;color:#FFF;white-space:pre-line;margin:0;";
const vhodit = `font-family:Coolvetica,sans-serif;font-weight:400;font-size:55.75px;line-height:100%;text-transform:uppercase;color:${BLUE};margin:0;`;
const crumb =
  "font-family:Inter,sans-serif;font-weight:500;font-size:23.42px;line-height:86%;letter-spacing:-0.05em;text-transform:uppercase;text-decoration:none;";
const btnText =
  "font-family:Inter,sans-serif;font-weight:400;font-size:38.88px;line-height:86%;letter-spacing:-0.05em;color:#1C1C1C;";
/* Плашки цены/тарифа — Coolvetica 55.75 справа */
const tarifNote = `font-family:Coolvetica,sans-serif;font-weight:400;font-size:55.75px;line-height:100%;text-transform:uppercase;text-align:right;white-space:pre-line;color:${GRAY};margin:0;`;

const g = (s: string) => `<span style="color:${GRAY}">${s}</span>`;
const w = (s: string) => `<span style="color:${WHITE}">${s}</span>`;

/* Кнопка-пилюля */
const btn = (
  x: number,
  y: number,
  wpx: number,
  bg: string,
  href: string,
  label: string,
) =>
  `<a href="${href}" style="position:absolute;left:${x}px;top:${y}px;width:${wpx}px;height:65px;border-radius:96px;background:${bg};display:flex;align-items:center;justify-content:center;text-decoration:none;"><span style="${btnText}white-space:nowrap;">${label}</span></a>`;

const line = (y: number) =>
  `<div style="position:absolute;left:65px;top:${y}px;width:1310px;height:0;border-top:2px solid ${GRAY}"></div>`;

export const kontentSyomkiHtml = `
<div style="position:relative;width:1440px;height:2807px;background:#1C1C1C;overflow:visible;">

  <!-- хлебные крошки -->
  <div style="position:absolute;left:65px;top:30px;display:flex;gap:10px;align-items:baseline;">
    <a href="/" style="${crumb}color:${GRAY}">Главная</a>
    <span style="${crumb}color:${GRAY}">→</span>
    <span style="${crumb}color:${WHITE}">услуги / Контент / Съёмки</span>
  </div>

  <!-- ================= 1. Съёмка мобильного контента ================= -->
  <h1 style="position:absolute;left:65px;top:169px;width:1310px;${h2}">Съёмка мобильного
контента</h1>

  <div style="position:absolute;left:65px;top:465px;width:1301px;${para}">Формат хорошо работает в ленте и сторис: без постановочной студийности, но качественно. Приезжаем к вам, снимаем по заранее подготовленному плану и забираем всю работу с материалом на себя — от съёмки до готовых роликов</div>

  <div style="position:absolute;left:65px;top:661px;${vhodit}">Что входит:</div>

  <div style="position:absolute;left:65px;top:750px;width:1310px;${list}">${g("&gt;")}  Продумываем концепцию и собираем референсы
${g("&gt;")}  Пишем ТЗ под съёмку
${g("&gt;")}  Снимаем фото и видео со своим оборудованием: ${g("свет, звук, штативы")}
${g("&gt;")}  Монтируем и обрабатываем весь материал</div>

  <div style="position:absolute;left:65px;top:1071px;width:400px;${para}">Можно заказать отдельно — стоимость зависит от локации и количества часов, чем больше часов, тем выгоднее</div>

  <div style="position:absolute;left:969px;top:1071px;width:406px;${tarifNote}">${g("входит в тариф")}
<a href="/tarify/triumf" style="color:${WHITE};text-decoration:none">«Триумф»</a></div>

  ${btn(489, 1241, 461, WHITE, "/#kontakty", "Рассчитать съёмку")}
  ${btn(968, 1241, 407, BLUE, "/tarify/triumf", "Смотреть тариф")}
  ${line(1422)}

  <!-- ================= 2. Съёмка под ключ ================= -->
  <h2 style="position:absolute;left:65px;top:1540px;width:1310px;${h2}white-space:nowrap;">съёмка под ключ</h2>

  <div style="position:absolute;left:65px;top:1747px;width:1301px;${para}">Профессиональная имиджевая съёмка с подобранной под запрос командой: реализуем кампании, лукбуки, презентация бренда или пространства. Когда нужно качественно показать продукт, новый проект  или атмосферу

Берём на себя весь продакшн — от идеи до готового материала. Придумываем концепцию, собираем команду и площадку под ваш запрос, вкус и бюджет, организуем съёмочный день и доводим материал до результата</div>

  <div style="position:absolute;left:65px;top:2047px;${vhodit}">Что входит:</div>

  <div style="position:absolute;left:65px;top:2136px;width:1310px;${list}">${g("&gt;")}  Разработка концепции и ТЗ
${g("&gt;")}  Подбор подрядчиков: ${g("фотографы, видеографы, модели, стилисты, визажисты")}
${g("&gt;")}  Организация и контроль съёмочного дня
${g("&gt;")}  Обработка и монтаж материала</div>

  <div style="position:absolute;left:65px;top:2457px;width:400px;${para}">Оплата подрядчиков, локаций и реквизита — отдельно</div>

  <div style="position:absolute;left:618px;top:2457px;width:757px;${tarifNote}">Стоимость рассчитывается ${w("индивидуально")}</div>

  ${btn(968, 2627, 407, BLUE, "/#kontakty", "Обсудить проект")}

</div>`;
