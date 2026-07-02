/* Страница «услуги / Ведение соцсетей» — 1:1 из Figma IAM-WEB,
   фрейм «Услуги 2» #12435:92 (1440×5425, тёмный #1C1C1C, акцент #90BEE9).
   Тексты дословно из макета. Рендерится через BuilderBlock (масштаб от 1440). */

const GRAY = "#9A9895";
const BLUE = "#90BEE9";
const WHITE = "#FFFFFF";

/* Типографика из макета */
const h2 =
  "font-family:Coolvetica,sans-serif;font-weight:400;font-size:103.72px;line-height:86%;text-transform:uppercase;text-align:justify;color:#FFF;margin:0;";
const para = `font-family:Inter,sans-serif;font-weight:400;font-size:30.16px;line-height:86%;letter-spacing:-0.05em;text-transform:lowercase;text-align:justify;color:${GRAY};white-space:pre-line;margin:0;`;
const list =
  "font-family:Inter,sans-serif;font-weight:400;font-size:34px;line-height:86%;letter-spacing:-0.05em;text-transform:lowercase;text-align:left;color:#FFF;white-space:pre-line;margin:0;";
const vhodit = `font-family:Coolvetica,sans-serif;font-weight:400;font-size:55.75px;line-height:100%;text-transform:uppercase;color:${BLUE};margin:0;`;
const crumb =
  "font-family:Inter,sans-serif;font-weight:500;font-size:23.42px;line-height:86%;letter-spacing:-0.05em;text-transform:uppercase;text-decoration:none;";
const btnText =
  "font-family:Inter,sans-serif;font-weight:400;font-size:38.88px;line-height:86%;letter-spacing:-0.05em;color:#1C1C1C;";
/* «Ведение входит / в тарифы» — Coolvetica 55.75 справа */
const tarifNote = `font-family:Coolvetica,sans-serif;font-weight:400;font-size:55.75px;line-height:100%;text-transform:uppercase;text-align:right;white-space:pre-line;color:${GRAY};margin:0;`;

const g = (s: string) => `<span style="color:${GRAY}">${s}</span>`;
const w = (s: string) => `<span style="color:${WHITE}">${s}</span>`;

/* Плашка «Ведение входит / в тарифы» (строка 2 белая, ссылка на блок тарифов) */
const vedenieVhodit = (x: number, y: number, wpx: number) =>
  `<div style="position:absolute;left:${x}px;top:${y}px;width:${wpx}px;${tarifNote}">Ведение входит
<a href="/#tarify" style="color:${WHITE};text-decoration:none">в тарифы</a></div>`;

/* Голубая кнопка «Смотреть тарифы» */
const btnTarify = (x: number, y: number, wpx: number) =>
  `<a href="/#tarify" style="position:absolute;left:${x}px;top:${y}px;width:${wpx}px;height:65px;border-radius:96px;background:${BLUE};display:flex;align-items:center;justify-content:center;text-decoration:none;"><span style="${btnText}">Смотреть тарифы</span></a>`;

const line = (y: number) =>
  `<div style="position:absolute;left:65px;top:${y}px;width:1310px;height:0;border-top:2px solid ${GRAY}"></div>`;

export const vedenieHtml = `
<div style="position:relative;width:1440px;height:5425px;background:#1C1C1C;overflow:hidden;">

  <!-- хлебные крошки -->
  <div style="position:absolute;left:65px;top:30px;display:flex;gap:10px;align-items:baseline;">
    <a href="/" style="${crumb}color:${GRAY}">Главная</a>
    <span style="${crumb}color:${GRAY}">→</span>
    <span style="${crumb}color:${WHITE}">услуги / Ведение соцсетей</span>
  </div>

  <!-- ================= 1. Instagram* ================= -->
  <h1 style="position:absolute;left:65px;top:169px;${h2}white-space:nowrap;">Instagram*</h1>
  <div style="position:absolute;left:1066px;top:172px;width:300px;font-family:Inter,sans-serif;font-weight:400;font-size:14.91px;line-height:86%;letter-spacing:-0.05em;text-align:justify;color:${WHITE};margin:0;">*Продукт компании Meta, которая признана экстремистской организацией и запрещена на территории РФ</div>

  <div style="position:absolute;left:65px;top:353px;width:1301px;${para}">${w("Главная витрина бренда: визуал, сторис, Reels и системный контент. Подходит тем, кому важны имидж, охваты и узнаваемость")}

он был и остаётся самой посещаемой площадкой для брендов и экспертов — поэтому подходит большинству ниш и проектов. Здесь работает всё сразу: визуал формирует имидж, Reels приносят новую аудиторию через алгоритмы, сторис держат тёплый контакт с подписчиками</div>

  <div style="position:absolute;left:65px;top:653px;${vhodit}">Что входит:</div>

  <div style="position:absolute;left:65px;top:742px;width:1310px;${list}">${g("&gt;")}  Стратегия и контент-план под площадку
${g("&gt;")}  Создание контента: посты, Reels, сторис
${g("&gt;")}  Оформление профиля и актуальных
${g("&gt;")}  Тексты, монтаж, дизайн креативов
${g("&gt;")}  Отчётность</div>

  ${vedenieVhodit(943, 1121, 428)}
  ${btnTarify(943, 1290, 428)}
  ${line(1483)}

  <!-- ================= 2. Telegram ================= -->
  <h2 style="position:absolute;left:65px;top:1639px;${h2}white-space:nowrap;">Telegram</h2>

  <div style="position:absolute;left:65px;top:1823px;width:1301px;${para}">${w("Камерная площадка для лояльной аудитории и прямого контакта без алгоритмов. Сюда часто переводят воронку из Instagram и реализуют спецпроекты. Подходит брендам и экспертам, которым важны удержание и тёплая связь с подписчиками")}

Telegram работает иначе: здесь нет ленты-алгоритма, контент видят почти все подписчики. Поэтому ставка на регулярность, экспертность и форматы, которые удерживают, — посты, рубрики, разборы, нативные подачи</div>

  <div style="position:absolute;left:65px;top:2123px;${vhodit}">Что входит:</div>

  <div style="position:absolute;left:65px;top:2212px;width:1310px;${list}">${g("&gt;")}  Контент-стратегия и контент-план под формат Telegram
${g("&gt;")}  Регулярные публикации и постоянные рубрики
${g("&gt;")}  Адаптация контента или создание уникального
${g("&gt;")}  Оформление канала
${g("&gt;")}  Работа с вовлечением

${g("&gt;")}  Отчётность</div>

  ${vedenieVhodit(947, 2649, 428)}
  ${btnTarify(947, 2818, 428)}
  ${line(3022)}

  <!-- ================= 3. ВКонтакте ================= -->
  <h2 style="position:absolute;left:65px;top:3153px;${h2}white-space:nowrap;">ВКонтакте</h2>

  <div style="position:absolute;left:65px;top:3337px;width:1301px;${para}">${w("Главная российская площадка с широким охватом и сильными инструментами продвижения. Подходит брендам, которые работают на массовую аудиторию")}

У ВКонтакте свой формат контента и свои механики вовлечения — встроенные инструменты продвижения, рассылки, сообщества. Всё это даёт широкий охват и прямой контакт с подписчиками внутри площадки</div>

  <div style="position:absolute;left:65px;top:3637px;${vhodit}">Что входит:</div>

  <div style="position:absolute;left:65px;top:3726px;width:1310px;${list}">${g("&gt;")}  Стратегия и контент-план под площадку
${g("&gt;")}  Оформление сообщества: баннеры, меню, виджеты, разделы
${g("&gt;")}  Контент под формат ВК
${g("&gt;")}  Регулярные публикации
${g("&gt;")}  Работа с комментариями и вовлечением

${g("&gt;")}  Механики площадки: опросы, рассылки

${g("&gt;")}  Отчётность</div>

  ${vedenieVhodit(947, 4221, 428)}
  ${btnTarify(947, 4390, 428)}
  ${line(4585)}

  <!-- ================= 4. Остальные площадки ================= -->
  <div style="position:absolute;left:84px;top:4719px;width:841px;${list}color:${GRAY};">Работаем со всеми площадками, которые существуют</div>

  <div style="position:absolute;left:84px;top:4805px;width:1068px;${vhodit}">${w("от")} YouTube и VK-Видео  ${w("до")} TikTok, RuTube и Дзена</div>

  <div style="position:absolute;left:84px;top:4974px;width:952px;${list}">Подберем набор под вашу нишу и аудиторию
и при необходимости настроим кросспостинг,
чтобы один контент работал сразу на нескольких площадках</div>

  <!-- нижние кнопки -->
  <a href="/#kontakty" style="position:absolute;left:268px;top:5191px;width:700px;height:86px;border-radius:96px;background:${WHITE};display:flex;align-items:center;justify-content:center;text-decoration:none;"><span style="${btnText}font-size:33px;white-space:nowrap;white-space:nowrap;">Узнать, какие площадки подходят вашему проекту</span></a>
  <a href="/#kontakty" style="position:absolute;left:1009px;top:5191px;width:366px;height:86px;border-radius:96px;background:${BLUE};display:flex;align-items:center;justify-content:center;text-decoration:none;"><span style="${btnText}font-size:29px;white-space:nowrap;white-space:nowrap;">Получить консультацию</span></a>

</div>`;
