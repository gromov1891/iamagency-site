/* Страница «тариф / ТРИУМФ» — 1:1 из Figma IAM-WEB,
   фрейм «ТРИУМФ» #12404:6837 (1440×4053, тёмный #1C1C1C, акцент #F55D1C + #90BEE9).
   Тексты дословно из макета. Рендерится через BuilderBlock (масштаб от 1440). */

const GRAY = "#9A9895";
const ORANGE = "#F55D1C";
const BLUE = "#90BEE9";
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
const summary = `font-family:Inter,sans-serif;font-weight:400;font-size:30.16px;line-height:86%;letter-spacing:-0.05em;text-transform:lowercase;text-align:justify;white-space:pre-line;color:${BLUE};margin:0;`;
const btnText =
  "font-family:Inter,sans-serif;font-weight:400;font-size:38.88px;line-height:86%;letter-spacing:-0.05em;";

/* Градиент «чипа» (fill_babb73ce) */
const CHIP_GRAD =
  "linear-gradient(270deg, rgba(144, 190, 233, 1) 0%, rgba(245, 93, 28, 1) 87%)";

const g = (s: string) => `<span style="color:${GRAY}">${s}</span>`;

/* Номер блока 01–05: Coolvetica 103.72 серый */
const num = (x: number, y: number, wpx: number, t: string) =>
  `<div style="position:absolute;left:${x}px;top:${y}px;width:${wpx}px;text-align:right;font-family:Coolvetica,sans-serif;font-weight:400;font-size:103.72px;line-height:86%;text-transform:uppercase;color:${GRAY};">${t}</div>`;

/* Чип — скруглённая пилюля с градиентом и белым заголовком */
const chip = (x: number, y: number, wpx: number, title: string) =>
  `<div style="position:absolute;left:${x}px;top:${y}px;width:${wpx}px;height:61px;border-radius:30.5px;background:${CHIP_GRAD};">
    <span style="position:absolute;left:22px;top:11px;${chipTitle};white-space:nowrap;">${title}</span>
  </div>`;

export const triumfHtml = `
<div style="position:relative;width:1440px;height:4053px;background:#1C1C1C;overflow:visible;">

  <!-- хлебные крошки -->
  <div style="position:absolute;left:65px;top:30px;display:flex;gap:10px;align-items:baseline;">
    <a href="/" style="${crumb}color:${GRAY}">Главная</a>
    <span style="${crumb}color:${GRAY}">→</span>
    <span style="${crumb}color:${WHITE}">тариф / ТРИУМФ</span>
  </div>

  <!-- H1: название / цена -->
  <h1 style="position:absolute;left:65px;top:197px;${h1big}color:${WHITE};">ТРИУМФ</h1>
  <div style="position:absolute;left:664px;top:197px;${h1big}color:${ORANGE};">/</div>
  <div style="position:absolute;right:67px;top:197px;text-align:right;${h1big}color:${GRAY};white-space:nowrap;"><span style="font-size:40px">от</span> 450 000₽</div>

  <!-- Что входит в тариф -->
  <div style="position:absolute;left:65px;top:489px;${vhodit}">Что входит в тариф:</div>

  <div style="position:absolute;left:65px;top:578px;width:1142px;${list}">${g("&gt;")}  всё, что в тарифе <a href="/tarify/proryv" style="color:inherit;text-transform:uppercase;text-decoration:underline;">«Прорыв»</a>
${g("&gt;")}  Выездная съёмка фото и видео раз в месяц
${g("&gt;")}  Перформанс-маркетинг ${g("(контекстная реклама)")}
${g("&gt;")}  Инфлюенс-маркетинг
${g("&gt;")}  Расширенное сопровождение в приоритете</div>

  <!-- Кнопка Купить тариф -->
  <a href="/#kontakty" style="position:absolute;left:1045px;top:774px;width:328px;height:65px;border-radius:96px;background:linear-gradient(90deg, rgba(245, 93, 28, 1) 0%, rgba(144, 190, 233, 1) 100%);display:flex;align-items:center;justify-content:center;text-decoration:none;">
    <span style="${btnText}color:${WHITE};">Купить тариф</span>
  </a>

  <!-- Голубой итоговый абзац -->
  <div style="position:absolute;left:65px;top:1029px;width:1306px;${summary}">Это максимальный уровень: соцсети работают как полноценный канал, а к ним подключаются съёмки и реклама. Вы перестаёте зависеть только от органики — клиенты приходят и из контента, и из перформанс-маркетинга. Бренд выходит на новый визуальный уровень за счёт собственных съёмок, а не стоковых материалов

Этот тариф для тех, у кого есть бюджет на рост и кто хочет результата по всем фронтам. Здесь вы получаете не подрядчика, а команду, которая ведёт ваш бренд целиком — от стратегии до заявок

Если собрать все эти услуги по отдельности, выходит дороже. В пакете вы получаете их по фиксированной цене со скидкой на весь комплекс — потому что мы ведём всё одной командой и в единой системе</div>

  <!-- Декоративная панель -->
  <img src="/blk/tarify/triumf-panel.svg" alt="" style="position:absolute;left:-67px;top:1458px;width:1461px;height:359px;" />
  <div style="position:absolute;left:71px;top:1596px;width:1161px;${desc}color:${GRAY};">На этом тарифе вы получаете не набор услуг, а полноценную маркетинг-команду под ваш бренд: стратегов, контент-продакшн, перформанс и работу с лидерами мнений — в одной системе
и под одним управлением. Нанимать это по отдельности дороже и сложнее: каждого подрядчика нужно искать, брифовать и сводить между собой. Здесь всё уже работает как единый механизм</div>

  <!-- за что вы платите? -->
  <div style="position:absolute;left:243px;top:1895px;width:954px;${h1big}color:${GRAY};text-align:center;white-space:nowrap;">за что вы платите?</div>

  <!-- 01 Основа -->
  ${num(71, 2101, 79, "01")}
  ${chip(190, 2112, 191, "Основа")}
  <div style="position:absolute;left:190px;top:2195px;width:615px;${desc}color:${WHITE};">В основе — всё ведение из тарифа <span style="text-transform:uppercase">«ПРОРЫВ»</span>

${g("ведение, продвижение, охваты, работа  с аудиторией, вторая соцсеть, стратегические сессии")}

<a href="/tarify/proryv" style="color:inherit;text-decoration:underline;">Подробнее о ведении →</a></div>

  <!-- 02 Выездная съёмка 1/мес -->
  ${num(375, 2442, 98, "02")}
  ${chip(513, 2453, 516, "&nbsp;Выездная съёмка 1/мес")}
  <div style="position:absolute;left:513px;top:2536px;width:615px;${desc}color:${WHITE};">Продюсирование, фото и видео на вашей локации, монтаж

${g("В стоимость входит 2 часа съёмки; по запросу снимаем на профессиональную камеру")}
${g("или телефон — под задачу и формат. ")}Контент становится премиальным и узнаваемым ${g("—")}
${g("ваш, а не стоковый")}</div>

  <!-- 03 Перформанс-маркетинг -->
  ${num(635, 2805, 100, "03")}
  ${chip(775, 2816, 505, "Перформанс-маркетинг")}
  <div style="position:absolute;left:775px;top:2899px;width:615px;${desc}color:${WHITE};">Настройка и ведение контекстной рекламы
через наших партнёров по перформансу

${g("Заявки идут не только из органики, но и из платных каналов. Рекламный бюджет оплачивается отдельно")}</div>

  <!-- 04 Инфлюенс-маркетинг -->
  ${num(315, 3124, 100, "04")}
  ${chip(455, 3135, 458, "Инфлюенс-маркетинг")}
  <div style="position:absolute;left:455px;top:3218px;width:615px;${desc}color:${WHITE};">Работаем и с блогерами, и с UGC-креаторами — подбираем релевантных авторов под ваш бренд

${g("В стоимость входит организация 3 коллабораций")}
${g("в месяц: подбор, переговоры, ТЗ и контроль. Оплата работы блогеров и креаторов — отдельно")}

Рост охватов и доверия через живые интеграции</div>

  <!-- 05 Расширенное сопровождение в приоритете -->
  ${num(65, 3487, 101, "05")}
  ${chip(206, 3498, 894, "Расширенное сопровождение в приоритете")}
  <div style="position:absolute;left:206px;top:3581px;width:615px;${desc}color:${WHITE};">Всё ваше ведётся в первую очередь

${g("задачи в приоритете, ответы быстрее,")}
${g("а стратегические сессии — углублённые,")}
${g("с разбором всех каналов и плана роста")}</div>

  <!-- Разделитель + кнопка -->
  <div style="position:absolute;left:65px;top:3800px;width:1310px;height:0;border-top:2px solid ${GRAY};"></div>
  <a href="/#kontakty" style="position:absolute;left:65px;top:3878px;width:1310px;height:65px;border-radius:96px;background:${WHITE};display:flex;align-items:center;justify-content:center;text-decoration:none;">
    <span style="${btnText}color:#1C1C1C;">Получить консультацию</span>
  </a>

</div>`;
