/* Страница «тариф / Движение» — 1:1 из Figma IAM-WEB,
   фрейм «Движение» #12391:6403 (1440×5589, тёмный #1C1C1C).
   Тексты дословно из макета. Рендерится через BuilderBlock (масштаб от 1440). */

const GRAY = "#9A9895";
const BLUE = "#90BEE9";
const WHITE = "#FFFFFF";
const YELLOW = "#FFAD19";

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
const summary = `font-family:Inter,sans-serif;font-weight:400;font-size:30.16px;line-height:86%;letter-spacing:-0.05em;text-transform:lowercase;text-align:justify;white-space:pre-line;color:${YELLOW};margin:0;`;
const btnText =
  "font-family:Inter,sans-serif;font-weight:400;font-size:38.88px;line-height:86%;letter-spacing:-0.05em;";

/* Градиент «чипа» (fill_d09dc807) */
const CHIP_GRAD =
  "linear-gradient(270deg, rgba(255, 173, 25, 1) 0%, rgba(144, 190, 233, 1) 87%)";

const g = (s: string) => `<span style="color:${GRAY}">${s}</span>`;
const w = (s: string) => `<span style="color:${WHITE}">${s}</span>`;

/* Номер блока 01–07: Coolvetica 103.72 серый, выравнивание вправо */
const num = (x: number, y: number, wpx: number, t: string) =>
  `<div style="position:absolute;left:${x}px;top:${y}px;width:${wpx}px;text-align:right;font-family:Coolvetica,sans-serif;font-weight:400;font-size:103.72px;line-height:86%;text-transform:uppercase;color:${GRAY};">${t}</div>`;

/* Чип — скруглённая пилюля с градиентом и белым заголовком */
const chip = (x: number, y: number, wpx: number, title: string) =>
  `<div style="position:absolute;left:${x}px;top:${y}px;width:${wpx}px;height:61px;border-radius:30.5px;background:${CHIP_GRAD};">
    <span style="position:absolute;left:22px;top:11px;${chipTitle}">${title}</span>
  </div>`;

/* Заголовок ячейки SVG-панели */
const pTitle = (x: number, y: number, t: string) =>
  `<div style="position:absolute;left:${x}px;top:${y}px;${chipTitle}">${t}</div>`;

/* Описание в ячейке панели (базовый серый, ts25 — белые куски) */
const pDesc = (x: number, y: number, t: string) =>
  `<div style="position:absolute;left:${x}px;top:${y}px;width:571px;${desc}color:${GRAY};">${t}</div>`;

export const dvizhenieHtml = `
<div style="position:relative;width:1440px;height:5589px;background:#1C1C1C;overflow:visible;">

  <!-- хлебные крошки -->
  <div style="position:absolute;left:65px;top:30px;display:flex;gap:10px;align-items:baseline;">
    <a href="/" style="${crumb}color:${GRAY}">Главная</a>
    <span style="${crumb}color:${GRAY}">→</span>
    <span style="${crumb}color:${WHITE}">тариф / Движение</span>
  </div>

  <!-- H1: название / цена -->
  <h1 style="position:absolute;left:65px;top:197px;${h1big}color:${WHITE};">Движение</h1>
  <div style="position:absolute;left:760px;top:197px;${h1big}color:${BLUE};">/</div>
  <div style="position:absolute;left:65px;top:197px;width:1308px;text-align:right;${h1big}color:${GRAY};"><span style="font-size:40px">от</span> 140 000₽</div>

  <!-- Что входит в тариф -->
  <div style="position:absolute;left:65px;top:431px;${vhodit}">Что входит в тариф:</div>

  <div style="position:absolute;left:65px;top:520px;width:1142px;${list}">${g("&gt;")}  Стратегия развития
${g("&gt;")}  Фирменный стиль и оформление аккаунта
${g("&gt;")}  Ведение одной площадки: до 15 постов/reels + сторис
${g("&gt;")}  ТЗ к съёмкам
${g("&gt;")}  Ежемесячный отчёт

${g("&gt;")}  Персональный менеджер на связи</div>

  <!-- кнопка «Купить тариф» (градиент) -->
  <a href="/#kontakty" style="position:absolute;left:1045px;top:774px;width:328px;height:65px;border-radius:96px;display:flex;align-items:center;justify-content:center;text-decoration:none;background:linear-gradient(90deg, rgba(144, 190, 233, 1) 0%, rgba(255, 173, 25, 1) 100%);"><span style="${btnText}color:${WHITE};">Купить тариф</span></a>

  <!-- SVG-панель с сеткой описаний -->
  <img src="/blk/tarify/dvizhenie-panel.svg" alt="" style="position:absolute;left:-63px;top:996px;width:1461px;height:832px;" />

  ${pTitle(75, 1088, "Стратегия")}
  ${pDesc(75, 1147, `анализируем${w(" нишу, ЦА и конкурентов,")} разрабатываем ${w("уникальный рубрикатор,")}
${w("две")} альтернативные ${w("визуальные концепции")}, ${w("банк идей")} для контента и дорожную карту продвижения`)}

  ${pTitle(75, 1334, "Оформление аккаунта")}
  ${pDesc(75, 1393, `исходя из выбранной концепции: ${w("создаём аватар, шапку профиля и обложки для highlights")}`)}

  ${pTitle(75, 1515, "Ведение одной площадки")}
  ${pDesc(75, 1574, `${w("создаём до 15 единиц контента в месяц ")}
${w("(посты/reels) и 2 сторис-серии в неделю ")}
${w("(по 3–5 сторис). ")}Для каждой публикации пишем текст или сценарий, верстаем креативы, монтируем видео, готовим описание, работаем с альт-тегами и хештегами, выкладываем`)}

  ${pTitle(730, 1088, "ТЗ к съёмкам")}
  ${pDesc(730, 1147, `${w("если вы снимаете сами, готовим подробное техническое задание — ")}продумываем концепцию, идеи и референсы (без организации съёмки: модели, локации и продакшн остаются на вашей стороне)`)}

  ${pTitle(730, 1334, "Ежемесячный отчёт")}
  ${pDesc(730, 1393, `Резюмируем и подбиваем все показатели
за месяц, проводим сравнительный анализ
и работу над улучшением`)}

  ${pTitle(730, 1515, "Персональный менеджер")}
  ${pDesc(730, 1575, `${w("На связи с вами на протяжении всей работы — ")}вы всегда в курсе, на каком этапе проект,
и быстро получаете ответы на вопросы`)}

  <!-- жёлтый итоговый абзац -->
  <div style="position:absolute;left:65px;top:1952px;width:1306px;${summary}">Это фундамент присутствия в соцсетях. Мы выстраиваем систему: кто вы, что говорите аудитории и как выглядите. Бренд перестаёт вести соцсети «как получится» и начинает выглядеть так же сильно, как ваш продукт — единый стиль, продуманный контент, регулярность


Тариф решает имиджевую задачу. Это база, без которой бессмысленно вкладываться в рекламу: сначала у вас должна быть выстроена витрина</div>

  <!-- за что вы платите? -->
  <h2 style="position:absolute;left:244px;top:2405px;width:954px;${h1big}color:${GRAY};text-align:left;white-space:nowrap;">за что вы платите?</h2>

  <!-- ============ 01 Стратегия развития ============ -->
  <div style="position:absolute;left:66px;top:2616px;width:776px;height:623px;">
    ${num(0, 0, 79, "01")}
    ${chip(119, 12, 420, "Стратегия развития")}
    <div style="position:absolute;left:119px;top:95px;width:657px;${desc}color:${GRAY};">${w("Изучаем нишу, аудиторию и конкурентов, выстраиваем позиционирование и рубрикатор")}

${w("Рубрикатор")} ${w("— это система тем для постов, сторис  и reels, построенная по принципу колеса баланса: ")}контент закрывает разные задачи (экспертность, продажи, вовлечение, личное) и работает в разных форматах, а не крутится вокруг одного

${w("Собираем банк идей — ")}готовый запас тем и форматов, что можно снять, чтобы вы никогда не застревали  на вопросе «о чём постить»

${w("Составляем дорожную карту продвижения —")} показываем, какие инструменты роста вам подойдут  и в какой последовательности их подключать

${w("Само продвижение —")} платные охваты и работа на рост аудитории — мы подключаем на тарифе ${w("«Прорыв»")}

Тестируем форматы и находим те, что лучше всего конвертируют зрителей в подписчиков и клиентов.  Вы получаете не хаотичный постинг, а систему,  которая работает на узнаваемость</div>
  </div>

  <!-- ============ 02 Фирменный стиль ============ -->
  <div style="position:absolute;left:623px;top:3306px;width:753px;height:204px;">
    ${num(0, 0, 98, "02")}
    ${chip(138, 11, 386, "Фирменный стиль")}
    <div style="position:absolute;left:138px;top:94px;width:615px;${desc}color:${WHITE};">Шрифты, цвета, обложки, оформление профиля

${g("Аккаунт считывается с первого взгляда — клиент видит сильный бренд, а не любительскую страницу,  и доверяет ещё до первого сообщения")}</div>
  </div>

  <!-- ============ 03 Контент под ключ ============ -->
  <div style="position:absolute;left:191px;top:3599px;width:755px;height:314px;">
    ${num(0, 0, 100, "03")}
    ${chip(140, 11, 398, "Контент под ключ")}
    <div style="position:absolute;left:140px;top:94px;width:615px;${desc}color:${WHITE};">До 15 постов и reels в месяц

Работаем с вашими материалами: монтируем, верстаем, оформляем. ${g("Если контента не хватает — закрываем дизайном, нейросетями и стоками, чтобы аккаунт жил регулярно и в едином стиле")}

Вам не нужно ничего делать руками — ${g("получаете полностью готовый контент, а своё время оставляете на бизнес")}</div>
  </div>

  <!-- ============ 04 Серии сторис 2/нед ============ -->
  <div style="position:absolute;left:639px;top:4002px;width:755px;height:182px;">
    ${num(0, 0, 100, "04")}
    ${chip(140, 11, 418, "серии сторис 2/нед")}
    <div style="position:absolute;left:140px;top:94px;width:615px;${desc}color:${WHITE};">${g("Поддерживаем живой контакт с аудиторией")}

Бренд постоянно в поле зрения —
${g("о вас не забывают в перерывах между постами")}</div>
  </div>

  <!-- ============ 05 ТЗ к съёмкам ============ -->
  <div style="position:absolute;left:65px;top:4273px;width:756px;height:226px;">
    ${num(0, 0, 101, "05")}
    ${chip(141, 11, 309, "ТЗ к съёмкам")}
    <div style="position:absolute;left:141px;top:94px;width:615px;${desc}color:${GRAY};">${w("Если вы готовы снять материал сами, даём подробное техническое задание: ")}продумываем концепцию, идеи и референсы

Вы точно знаете, что и как снимать, и не тратите съёмочный день впустую</div>
  </div>

  <!-- ============ 06 Ежемесячный отчёт ============ -->
  <div style="position:absolute;left:672px;top:4588px;width:756px;height:226px;">
    ${num(0, 0, 101, "06")}
    ${chip(141, 11, 431, "Ежемесячный отчёт")}
    <div style="position:absolute;left:141px;top:94px;width:615px;${desc}color:${WHITE};">${g("В конце месяца не сухая табличка с лайками,  а живой разбор: ")}что сработало, что нет, как изменились показатели и что меняем дальше

${g("Вы видите не просто цифры, а смысл за ними — ")}
и понимаете, куда движется бренд</div>
  </div>

  <!-- ============ 07 Персональный менеджер ============ -->
  <div style="position:absolute;left:206px;top:4903px;width:751px;height:270px;">
    ${num(0, 0, 96, "07")}
    ${chip(136, 11, 532, "Персональный менеджер")}
    <div style="position:absolute;left:136px;top:94px;width:615px;${desc}color:${GRAY};">${w("С вами работает закреплённый человек, который знает ваш бренд и помнит контекст ")}

Не нужно каждый раз объяснять всё заново или ждать в общей очереди — пишете напрямую и быстро получаете ответ

${w("Внимание и включённость на каждом этапе")}</div>
  </div>

  <!-- разделительная линия -->
  <div style="position:absolute;left:66px;top:5330px;width:1310px;height:0;border-top:2px solid ${GRAY};"></div>

  <!-- белая кнопка на всю ширину -->
  <a href="/#kontakty" style="position:absolute;left:66px;top:5408px;width:1310px;height:65px;border-radius:96px;display:flex;align-items:center;justify-content:center;text-decoration:none;background:${WHITE};"><span style="${btnText}color:#1C1C1C;">Получить консультацию</span></a>

</div>`;
