/* Страница «Школа SMM», фрейм «Обучение» #12455:557 из Figma IAM WEB.
   Тёмный фон #1C1C1C (EL-ec1c41b6 → fill_61920ecd). Тексты дословно из макета.
   Единственная картинка — векторный разделитель-иллюстрация #12457:647
   (IMAGE-SVG 1478×420 без imageRef) → серая заглушка #2A2A2A
   (манифест: shkola.images.json). Хлебная крошка добавляется страницей. */

const DARK = "#1C1C1C"; // fill_61920ecd
const WHITE = "#FFFFFF"; // fill_658ab2fa
const GREEN = "#CEE3A7"; // fill_34b877c7
const GRAY = "#9A9895"; // fill_c7c0583d
const PLATE = "rgba(76,76,76,0.2)"; // fill_62bbc886
const PH = "#2A2A2A";

/* Coolvetica — без трекинга; Inter — letter-spacing -0.05em */
const h1 = `font-family:Coolvetica,sans-serif;font-weight:400;font-size:103.72px;line-height:86%;text-transform:uppercase;text-align:justify;margin:0;white-space:pre-line;`; // style_1ce34f04
const h1center = `font-family:Coolvetica,sans-serif;font-weight:400;font-size:103.72px;line-height:86%;text-transform:uppercase;text-align:center;margin:0;`; // style_8e16e327
const sub = `font-family:Coolvetica,sans-serif;font-weight:400;font-size:55.75px;line-height:100%;text-transform:uppercase;text-align:justify;margin:0;white-space:pre-line;`; // style_1890671b
const cardTitleL = `font-family:Coolvetica,sans-serif;font-weight:400;font-size:55.75px;line-height:100%;text-transform:uppercase;text-align:left;margin:0;white-space:pre-line;`; // style_6785b5c6
const intro = `font-family:Inter,sans-serif;font-weight:400;font-size:36px;line-height:86%;letter-spacing:-0.05em;text-align:justify;margin:0;white-space:pre-line;`; // style_97e997a9
const cardBody = `font-family:Inter,sans-serif;font-weight:400;font-size:32px;line-height:86%;letter-spacing:-0.05em;text-align:justify;margin:0;white-space:pre-line;`; // style_662de581
const tagTxt = `font-family:Inter,sans-serif;font-weight:400;font-size:55.75px;line-height:86%;letter-spacing:-0.05em;text-transform:uppercase;color:${DARK};margin:0;white-space:nowrap;`; // style_fee7eec0
const tagPlus = `font-family:Inter,sans-serif;font-weight:300;font-size:55.75px;line-height:86%;letter-spacing:-0.05em;color:${DARK};margin:0;`; // style_43039d63

/* ts25 → белый span поверх серого интро; ts12 (Heavy) → «%» жирным */
const wht = (s: string) => `<span style="color:${WHITE}">${s}</span>`;
const heavy = (s: string) => `<span style="font-weight:900">${s}</span>`;

/* карточка секции «Как мы учим?»: плашка + заголовок + текст */
const card = (
  x: number, y: number, cw: number, ch: number,
  tTop: number, tW: number, tStyle: string, title: string,
  bTop: number, bW: number, body: string,
) => `
  <div style="position:absolute;left:${x}px;top:${y}px;width:${cw}px;height:${ch}px;background:${PLATE};border-radius:42px;"></div>
  <p style="position:absolute;left:${x + 32}px;top:${y + tTop}px;width:${tW}px;color:${GREEN};${tStyle}">${title}</p>
  <p style="position:absolute;left:${x + 32}px;top:${y + bTop}px;width:${bW}px;color:${WHITE};${cardBody}">${body}</p>`;

/* тег-плашка «Кому подходит?»: белый pill + текст + зелёный кружок с «+» */
const tag = (
  x: number, y: number, pw: number, text: string, tW: number,
  ellX: number, plusX: number,
) => `
  <div style="position:absolute;left:${x}px;top:${y}px;width:${pw}px;height:80px;background:${WHITE};border-radius:40px;"></div>
  <p style="position:absolute;left:${x + 32}px;top:${y + 16}px;width:${tW}px;height:48px;${tagTxt}">${text}</p>
  <div style="position:absolute;left:${x + ellX}px;top:${y + 7}px;width:65px;height:65px;border-radius:50%;background:${GREEN};box-shadow:inset 0 0 10px 8px rgba(28,28,28,1);"></div>
  <p style="position:absolute;left:${x + plusX}px;top:${y + 12}px;width:37px;height:48px;${tagPlus}">+</p>`;

export const shkolaHtml = `
<div style="position:relative;width:1440px;height:4860px;background:${DARK};overflow:visible;">

  <!-- H1 -->
  <p style="position:absolute;left:65px;top:142px;width:685px;color:${WHITE};${h1}">Школа SMM от агентства I AM</p>

  <!-- подзаголовок -->
  <p style="position:absolute;left:657px;top:508px;width:718px;color:${GREEN};${sub}">Учим профессии с нуля — по той же системе, по которой работаем сами</p>

  <!-- интро -->
  <p style="position:absolute;left:65px;top:886px;width:1210px;color:${GRAY};${intro}">Обучаем SMM уже ${wht("7 лет")}. Через школу прошли больше ${wht("350 человек")} — сегодня они ведут крупные бренды, работают на удалёнке из любой точки мира, а многие являются ${wht("действующими менеджерами I AM")}</p>

  <!-- секция «Как мы учим?» -->
  <p style="position:absolute;left:378px;top:1173px;width:685px;color:${WHITE};${h1}">Как мы учим?</p>

  ${card(60, 1392, 643, 350, 33, 355, sub, `90${heavy("%")} практики`, 131, 579,
    "Обучаем SMM уже 7 лет. Через школу прошли больше 350 человек — сегодня они ведут крупные бренды, работают на удалёнке из любой точки мира, а многие являются действующими менеджерами I AM")}

  ${card(736, 1691, 643, 369, 33, 579, cardTitleL, "Обучение \nна действующих проектах", 241, 579,
    "Учитесь на настоящих проектах I AM, а мы даём все шаблоны, которые пригодятся в работе")}

  ${card(60, 2030, 643, 257, 33, 542, sub, "Готовое портфолио", 131, 579,
    "Помимо сертификата, к концу обучения у вас есть оформленные кейсы, которые можно показать клиенту")}

  ${card(736, 2291, 643, 284, 33, 588, cardTitleL, "Помощь с первыми клиентами", 185, 579,
    "Рассказываем, где и как искать заказы и выстраивать отношения с клиентами")}

  ${card(60, 2575, 643, 257, 33, 588, cardTitleL, "Работа в агентстве", 131, 579,
    "Лучших учеников приглашаем на стажировку в агентство I AM с перспективой работать в команде")}

  <!-- декоративный разделитель-иллюстрация (векторный SVG, недоступен) -->
  <div style="position:absolute;left:-87px;top:3058px;width:1478px;height:420px;background:${PH};" data-figma-node="12457:647"></div>

  <!-- секция «Формат» -->
  <p style="position:absolute;left:65px;top:3126px;width:199px;color:${GRAY};${sub}">Формат</p>
  <p style="position:absolute;left:65px;top:3211px;width:1210px;color:${WHITE};${intro}">Сейчас обучение проходит индивидуально — персонально, один на один с куратором. Куратор ведёт вас весь путь, проверяет каждое домашнее задание и подстраивается под ваш темп

Длительность — полтора месяца
Доступ к материалам остаётся бессрочно</p>

  <!-- секция «Кому подходит?» -->
  <p style="position:absolute;left:68px;top:3613px;width:966px;color:${GREEN};${h1}">Кому подходит?</p>

  ${tag(65, 3847, 838, "Тем, кто хочет свободы", 710, 762, 776)}
  ${tag(917, 4013, 457, "Студентам", 324, 379, 393)}
  ${tag(135, 4117, 634, "Мамам в декрете", 502, 557, 571)}
  ${tag(346, 4342, 904, "Тем, кто хочет изменений", 777, 828, 842)}

  <!-- секция «Чему вы научитесь» -->
  <p style="position:absolute;left:204px;top:4648px;width:1032px;color:${GRAY};${h1center}">Чему вы научитесь</p>

</div>`;

export const shkolaH = 4860;
