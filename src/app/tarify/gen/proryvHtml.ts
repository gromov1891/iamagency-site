/* Страница «тариф / ПРОРЫВ» — 1:1 из Figma IAM-WEB,
   фрейм «ПРОРЫВ» #12404:6644 (1440×4133, тёмный #1C1C1C, акцент #8992E4).
   Тексты дословно из макета. Рендерится через BuilderBlock (масштаб от 1440). */

const GRAY = "#9A9895";
const PURPLE = "#8992E4";
const WHITE = "#FFFFFF";

/* Типографика из макета */
const crumb =
  "font-family:Inter,sans-serif;font-weight:500;font-size:23.42px;line-height:86%;letter-spacing:-0.05em;text-transform:uppercase;text-decoration:none;";
const h1big =
  "font-family:Coolvetica,sans-serif;font-weight:400;font-size:103.72px;line-height:86%;text-transform:uppercase;margin:0;";
const vhodit = `font-family:Coolvetica,sans-serif;font-weight:400;font-size:55.75px;line-height:100%;text-transform:uppercase;color:${GRAY};margin:0;`;
const list =
  "font-family:Inter,sans-serif;font-weight:400;font-size:34px;line-height:86%;letter-spacing:-0.05em;text-transform:lowercase;text-align:left;color:#FFF;white-space:pre-line;margin:0;";
const chipTitle =
  "font-family:Coolvetica,sans-serif;font-weight:400;font-size:40px;line-height:100%;text-transform:uppercase;color:#FFF;margin:0;";
const desc =
  "font-family:Inter,sans-serif;font-weight:400;font-size:26px;line-height:86%;letter-spacing:-0.05em;text-transform:lowercase;white-space:pre-line;margin:0;";
const summary = `font-family:Inter,sans-serif;font-weight:400;font-size:30.16px;line-height:86%;letter-spacing:-0.05em;text-transform:lowercase;text-align:justify;white-space:pre-line;color:${PURPLE};margin:0;`;
const btnText =
  "font-family:Inter,sans-serif;font-weight:400;font-size:38.88px;line-height:86%;letter-spacing:-0.05em;";

/* Градиент «чипа» (fill_30d48ce4) */
const CHIP_GRAD =
  "linear-gradient(270deg, rgba(255, 173, 25, 1) 0%, rgba(137, 146, 228, 1) 87%)";

const g = (s: string) => `<span style="color:${GRAY}">${s}</span>`;

/* Номер блока 01–06: Coolvetica 103.72 серый, выравнивание вправо */
const num = (x: number, y: number, wpx: number, t: string) =>
  `<div style="position:absolute;left:${x}px;top:${y}px;width:${wpx}px;text-align:right;font-family:Coolvetica,sans-serif;font-weight:400;font-size:103.72px;line-height:86%;text-transform:uppercase;color:${GRAY};">${t}</div>`;

/* Чип — скруглённая пилюля с градиентом и белым заголовком */
const chip = (x: number, y: number, wpx: number, title: string) =>
  `<div style="position:absolute;left:${x}px;top:${y}px;width:${wpx}px;height:61px;border-radius:30.5px;background:${CHIP_GRAD};">
    <span style="position:absolute;left:22px;top:11px;${chipTitle}">${title}</span>
  </div>`;

export const proryvHtml = `
<div style="position:relative;width:1440px;height:4133px;background:#1C1C1C;overflow:visible;">

  <!-- хлебные крошки -->
  <div style="position:absolute;left:65px;top:30px;display:flex;gap:10px;align-items:baseline;">
    <a href="/" style="${crumb}color:${GRAY}">Главная</a>
    <span style="${crumb}color:${GRAY}">→</span>
    <span style="${crumb}color:${WHITE}">тариф / ПРОРЫВ</span>
  </div>

  <!-- H1: название / цена -->
  <h1 style="position:absolute;left:65px;top:197px;${h1big}color:${WHITE};">ПРОРЫВ</h1>
  <div style="position:absolute;left:664px;top:197px;${h1big}color:${PURPLE};">/</div>
  <div style="position:absolute;right:67px;top:197px;text-align:right;${h1big}color:${GRAY};white-space:nowrap;"><span style="font-size:40px">от</span> 230 000₽</div>

  <!-- Что входит в тариф -->
  <div style="position:absolute;left:65px;top:431px;${vhodit}">Что входит в тариф:</div>

  <div style="position:absolute;left:65px;top:520px;width:1142px;${list}">${g("&gt;")}  всё, что в тарифе <a href="/tarify/dvizhenie" style="color:inherit;text-transform:uppercase;text-decoration:underline;">«Движение»</a>
${g("&gt;")}  telegram-канал
${g("&gt;")}  продвижение для роста охватов
${g("&gt;")}  Работа с аудиторией и сообщениями
${g("&gt;")}  Чат-бот с приветственным сообщением

${g("&gt;")}  Стратегическая сессия раз в месяц</div>

  <!-- кнопка «Купить тариф» (градиент) -->
  <a href="/#kontakty" style="position:absolute;left:1045px;top:774px;width:328px;height:65px;border-radius:96px;display:flex;align-items:center;justify-content:center;text-decoration:none;background:linear-gradient(90deg, rgba(137, 146, 228, 1) 0%, rgba(255, 173, 25, 1) 100%);"><span style="${btnText}color:${WHITE};">Купить тариф</span></a>

  <!-- фиолетовый итоговый абзац -->
  <div style="position:absolute;left:65px;top:1003px;width:1306px;${summary}">Это точка, где бренд перестаёт просто присутствовать и начинает расти. К ведению добавляются рычаги, которые работают на охваты и живую аудиторию: вторая площадка удерживает тех, кто вас уже нашёл, а продвижение и ручная работа приводят новых — целевых людей, а не ботов. Аудитория оживает, начинает реагировать и обращаться

Это наш самый выбираемый тариф. Он закрывает сразу две задачи — узнаваемость и первые обращения, — поэтому даёт лучшее соотношение вложений и результата

Результат, на который работаем, — рост охватов и приток целевых подписчиков</div>

  <!-- SVG-панель -->
  <img src="/blk/tarify/proryv-panel.svg" alt="" style="position:absolute;left:-71px;top:1367px;width:1461px;height:582px;" />

  <!-- за что вы платите? -->
  <h2 style="position:absolute;left:243px;top:1453px;width:954px;${h1big}color:${GRAY};text-align:center;white-space:nowrap;">за что вы платите?</h2>

  <!-- ============ 01 Основа ============ -->
  <div style="position:absolute;left:84px;top:1821px;width:734px;height:226px;">
    ${num(0, 0, 79, "01")}
    ${chip(119, 11, 191, "Основа")}
    <div style="position:absolute;left:119px;top:94px;width:615px;${desc}color:${WHITE};">В основе — всё ведение из тарифа <span style="text-transform:uppercase">«Движение»</span>

${g("стратегия, фирменный стиль, контент под ключ, сторис и отчётность ")}

<a href="/tarify/dvizhenie" style="color:inherit;text-decoration:underline;">Подробнее о ведении →</a></div>
  </div>

  <!-- ============ 02 Альтернативная соцсеть ============ -->
  <div style="position:absolute;left:643px;top:2142px;width:732px;height:226px;">
    ${num(0, 0, 98, "02")}
    ${chip(138, 11, 526, "Альтернативная соцсеть")}
    <div style="position:absolute;left:138px;top:94px;width:594px;${desc}color:${WHITE};">Подключаем ещё одну социальную сеть —
там, где есть ваша аудитория

${g("Адаптируем контент под формат площадки. ")}
${g("Вы не теряете тех, кто привык читать вас в другом месте, и расширяете присутствие в медиаполе")}</div>
  </div>

  <!-- ============ 03 Продвижение и рост охватов ============ -->
  <div style="position:absolute;left:319px;top:2463px;width:746px;height:270px;">
    ${num(0, 0, 100, "03")}
    ${chip(140, 11, 606, "Продвижение и рост охватов")}
    <div style="position:absolute;left:140px;top:94px;width:594px;${desc}color:${WHITE};">Выводим ваш контент к новой целевой аудитории и поднимаем его в рекомендации

${g("Результат, который это стабильно даёт: охваты растут примерно на 30%, просмотры сторис — ")}
${g("в 2–5 раз, плюс приток новых целевых подписчиков. ")}Приходят живые люди${g(", которым интересен ваш продукт, а не боты")}</div>
  </div>

  <!-- ============ 04 Ручная работа с аудиторией ============ -->
  <div style="position:absolute;left:65px;top:2828px;width:734px;height:292px;">
    ${num(0, 0, 100, "04")}
    ${chip(140, 11, 594, "Ручная работа с аудиторией")}
    <div style="position:absolute;left:140px;top:94px;width:594px;${desc}color:${WHITE};">Живые комментарии от лица бренда, общение, вовлечение

${g("Ведём директ: отвечаем на сообщения, подсказываем, где найти товар или оформить заказ, направляем на сайт. Заявки на покупку передаём вам или вашему отделу продаж — общение мы поддерживаем, продажи остаются за вами")}</div>
  </div>

  <!-- ============ 05 Автоприветствие ============ -->
  <div style="position:absolute;left:662px;top:3226px;width:735px;height:226px;">
    ${num(0, 0, 101, "05")}
    ${chip(141, 11, 390, "Автоприветствие")}
    <div style="position:absolute;left:141px;top:94px;width:594px;${desc}color:${WHITE};">Каждый, кто на вас подписался, сразу получает тёплое сообщение — приветствие, акцию
или подарок

${g("Первый контакт случается мгновенно, и человек ")}
${g("с порога ")}чувствует внимание бренда</div>
  </div>

  <!-- ============ 06 Стратегическая сессия 1/мес ============ -->
  <div style="position:absolute;left:314px;top:3547px;width:743px;height:204px;">
    ${num(0, 0, 101, "06")}
    ${chip(141, 11, 602, "Стратегическая сессия 1/мес")}
    <div style="position:absolute;left:141px;top:94px;width:594px;${desc}color:${WHITE};">Раз в месяц встречаемся и разбираем проект вместе, с участием основателей агентства

${g("Сверяем цели, корректируем стратегию, планируем следующий шаг")}</div>
  </div>

  <!-- разделительная линия -->
  <div style="position:absolute;left:58px;top:3868px;width:1310px;height:0;border-top:2px solid ${GRAY};"></div>

  <!-- белая кнопка на всю ширину -->
  <a href="/#kontakty" style="position:absolute;left:58px;top:3946px;width:1310px;height:65px;border-radius:96px;display:flex;align-items:center;justify-content:center;text-decoration:none;background:${WHITE};"><span style="${btnText}color:#1C1C1C;">Получить консультацию</span></a>

</div>`;
