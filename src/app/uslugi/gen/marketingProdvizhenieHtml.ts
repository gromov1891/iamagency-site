/* Страница «услуги / Маркетинг и продвижение» — 1:1 из Figma IAM-WEB,
   фрейм «Услуги 3» #12437:256 (1440×5528, тёмный #1C1C1C, акцент #90BEE9).
   Тексты дословно из макета. Рендерится через BuilderBlock (масштаб от 1440). */

const GRAY = "#9A9895";
const BLUE = "#90BEE9";
const WHITE = "#FFFFFF";

/* Типографика из макета */
const h2 =
  "font-family:Coolvetica,sans-serif;font-weight:400;font-size:103.72px;line-height:86%;text-transform:uppercase;text-align:justify;color:#FFF;white-space:pre-line;margin:0;";
const h2left =
  "font-family:Coolvetica,sans-serif;font-weight:400;font-size:103.72px;line-height:86%;text-transform:uppercase;text-align:left;color:#FFF;margin:0;";
const para = `font-family:Inter,sans-serif;font-weight:400;font-size:30.16px;line-height:86%;letter-spacing:-0.05em;text-transform:lowercase;text-align:justify;color:${GRAY};white-space:pre-line;margin:0;`;
const list =
  "font-family:Inter,sans-serif;font-weight:400;font-size:34px;line-height:86%;letter-spacing:-0.05em;text-transform:lowercase;text-align:left;color:#FFF;white-space:pre-line;margin:0;";
const vhodit = `font-family:Coolvetica,sans-serif;font-weight:400;font-size:55.75px;line-height:100%;text-transform:uppercase;color:${BLUE};margin:0;`;
const crumb =
  "font-family:Inter,sans-serif;font-weight:500;font-size:23.42px;line-height:86%;letter-spacing:-0.05em;text-transform:uppercase;text-decoration:none;";
const btnText =
  "font-family:Inter,sans-serif;font-weight:400;font-size:38.88px;line-height:86%;letter-spacing:-0.05em;color:#1C1C1C;";
/* Плашки «Входит в тариф …» — Coolvetica 55.75 справа */
const tarifNote = `font-family:Coolvetica,sans-serif;font-weight:400;font-size:55.75px;line-height:100%;text-transform:uppercase;text-align:right;white-space:pre-line;color:${GRAY};margin:0;`;

const g = (s: string) => `<span style="color:${GRAY}">${s}</span>`;
const w = (s: string) => `<span style="color:${WHITE}">${s}</span>`;

/* Голубая кнопка-пилюля */
const btn = (x: number, y: number, wpx: number, href: string, label: string) =>
  `<a href="${href}" style="position:absolute;left:${x}px;top:${y}px;width:${wpx}px;height:65px;border-radius:96px;background:${BLUE};display:flex;align-items:center;justify-content:center;text-decoration:none;"><span style="${btnText}white-space:nowrap;">${label}</span></a>`;

const line = (y: number) =>
  `<div style="position:absolute;left:65px;top:${y}px;width:1310px;height:0;border-top:2px solid ${GRAY}"></div>`;

export const marketingProdvizhenieHtml = `
<div style="position:relative;width:1440px;height:5528px;background:#1C1C1C;overflow:visible;">

  <!-- хлебные крошки -->
  <div style="position:absolute;left:65px;top:30px;display:flex;gap:10px;align-items:baseline;">
    <a href="/" style="${crumb}color:${GRAY}">Главная</a>
    <span style="${crumb}color:${GRAY}">→</span>
    <span style="${crumb}color:${WHITE}">услуги / Маркетинг и продвижение</span>
  </div>

  <!-- ================= 1. Продвижение для роста охватов ================= -->
  <h1 style="position:absolute;left:65px;top:169px;width:1310px;${h2}">Продвижение для роста
охватов и работа
с аудиторией</h1>

  <div style="position:absolute;left:65px;top:554px;width:1301px;${para}">Продвигаем ваш аккаунт среди людей, которым интересен ваш продукт, и параллельно ведём ручную работу — комментируем и общаемся от лица бренда, чтобы профиль выглядел живым и вызывал доверие. В среднем охваты растут на 30%, а просмотры сторис увеличиваются в 2–5 раз</div>

  <div style="position:absolute;left:65px;top:776px;${vhodit}">Что входит:</div>

  <div style="position:absolute;left:65px;top:865px;width:1310px;${list}">${g("&gt;")}  Создание базы доноров — ${g("аккаунтов, в подписчиках которых может быть ваша аудитория")}
${g("&gt;")}  Массовый просмотр сторис
${g("&gt;")}  Различные реакции, которые привлекают внимание к вашему аккаунту
${g("&gt;")}  Продвижение постов через алгоритмизацию для вывода в топ
${g("&gt;")}  Ручной комментинг и общение от лица бренда</div>

  <div style="position:absolute;left:820px;top:1273px;width:555px;${tarifNote}">Входит в тарифы
<a href="/tarify/proryv" style="color:${WHITE};text-decoration:none">«Прорыв»</a> и <a href="/tarify/triumf" style="color:${WHITE};text-decoration:none">«Триумф»</a></div>

  ${btn(947, 1442, 428, "/#tarify", "Смотреть тарифы")}
  ${line(1632)}

  <!-- ================= 2. Ручная рассылка по смежным нишам ================= -->
  <h2 style="position:absolute;left:65px;top:1757px;width:1301px;${h2}">Ручная рассылка
по смежным нишам</h2>

  <div style="position:absolute;left:65px;top:2053px;width:1301px;${para}">Находим партнёров и B2B-клиентов через прямые обращения в смежные ниши. Подходит тем, кому нужны коллаборации, опт или сотрудничество с другими бизнесами

ручную находим компании и блогеров из смежных ниш, у которых пересекается аудитория с вашей, и пишем им от вашего лица с предложением о сотрудничестве. Так появляются коллаборации, бартеры, партнёрства и оптовые заявки</div>

  <div style="position:absolute;left:65px;top:2327px;${vhodit}">Что входит:</div>

  <div style="position:absolute;left:65px;top:2416px;width:1310px;${list}">${g("&gt;")}  Подбор смежных ниш и подходящих компаний
${g("&gt;")}  Сбор базы контактов
${g("&gt;")}  Составление и рассылка предложения
${g("&gt;")}  Передача всех откликов вам</div>

  <div style="position:absolute;left:530px;top:2737px;width:836px;${tarifNote}">Стоимость рассчитывается под проект</div>

  ${btn(865, 2906, 501, "/#kontakty", "Получить консультацию")}
  ${line(3073)}

  <!-- ================= 3. Инфлюенс-маркетинг и UGC ================= -->
  <h2 style="position:absolute;left:65px;top:3191px;width:1301px;${h2left}">Инфлюенс-маркетинг и работа с UGC-креаторами</h2>

  <div style="position:absolute;left:65px;top:3487px;width:1301px;${para}">Подбираем блогеров и креаторов под ваш бренд и запускаем интеграции, которые работают на охваты и доверие. Подходит тем, кто хочет роста через лидеров мнений и живой контент

Работаем и с блогерами, и с UGC-креаторами — авторами, которые снимают нативный контент от лица реальных пользователей. Подбираем тех, кто близок вашей аудитории по ценностям, берём на себя переговоры и контроль, чтобы интеграции выглядели органично и приводили целевых людей, а не пустые охваты</div>

  <div style="position:absolute;left:65px;top:3787px;${vhodit}">Что входит:</div>

  <div style="position:absolute;left:65px;top:3876px;width:1310px;${list}">${g("&gt;")}  Подбор релевантных блогеров и креаторов
${g("&gt;")}  Переговоры и согласование условий
${g("&gt;")}  Техническое задание к рекламным интеграциям и роликам
${g("&gt;")}  Контроль выхода интеграций

${g("&gt;")}  Анализ эффективности коллабораций</div>

  <div style="position:absolute;left:526px;top:4255px;width:836px;${tarifNote}"> Входит в тариф <a href="/tarify/triumf" style="color:${WHITE};text-decoration:none">«Триумф»</a></div>

  <div style="position:absolute;left:65px;top:4326px;width:1301px;font-family:Inter,sans-serif;font-weight:400;font-size:30.16px;line-height:86%;letter-spacing:-0.05em;text-transform:lowercase;text-align:right;color:${WHITE};margin:0;">Оплата работы блогеров и креаторов — отдельно</div>

  ${btn(951, 4409, 411, "/tarify/triumf", "Смотреть тариф")}
  ${line(4584)}

  <!-- ================= 4. Performance-маркетинг ================= -->
  <h2 style="position:absolute;left:65px;top:4702px;width:1301px;${h2left}white-space:nowrap;">Performance-маркетинг</h2>

  <div style="position:absolute;left:65px;top:4909px;width:600px;${list}color:${GRAY};white-space:nowrap;">Платный трафик</div>

  <div style="position:absolute;left:65px;top:4995px;width:1068px;${vhodit}">контекстную и таргетированную рекламу</div>

  <div style="position:absolute;left:65px;top:5164px;width:952px;${list}">ведёт наш отдел перформанс-маркетинга. Настройка, запуск, аналитика и оптимизация кампаний под заявки и продажи</div>

  ${btn(933, 5340, 429, "/marketing", "Перейти в раздел")}

</div>`;
