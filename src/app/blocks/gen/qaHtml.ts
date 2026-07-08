// Q&A — собран по Figma (78:1259 / раскрытые строки 78:1349-1373).
// Аккордеон на чистом CSS: наведение на строку → раскрывается, показывает ответ.
// Фигуры (слиток золота, airship) — HQ-экспорт из Figma. Холст 1440×1024.
export const qaH = 1024;

const QA = [
  { q: "Сколько стоит контекстная реклама?", a: "От 30 000 ₽/месяц за управление кампанией + рекламный бюджет на клики. Бюджет на клики зависит от ниши: в B2C обычно от 50 000 ₽, в B2B — от 80 000 ₽. Делаем расчёт под ваш бизнес после короткого брифа" },
  { q: "Что такое performance маркетинг?", a: "Performance-маркетинг — это маркетинг с измеримым результатом, где каждый рубль работает на конкретную метрику (продажа, заявка, скачивание). Включает контекст, таргет, SEO, CPA и аналитику. В отличие от media-маркетинга, где задача — охват и узнаваемость" },
  { q: "Чем отличается контекстная реклама от таргетированной?", a: "Контекстная реклама — в поиске Яндекс/Google, ловит «горячий» спрос: человек уже ищет ваш продукт. Таргетированная реклама — в соцсетях (VK, Telegram, Meta), формирует спрос: показываем тем, кто похож на ЦА, но ещё не ищет" },
  { q: "Сколько стоит SEO-продвижение и когда будет результат?", a: "SEO-продвижение от 60 000 ₽/месяц. Первые результаты — через 3 месяца, стабильный рост — через 6 месяцев. SEO — это марафон, но самый дешёвый источник заявок в долгую: запросы по «seo продвижение» выросли на +23% за последний год" },
  { q: "Как выбрать маркетинговое агентство?", a: "Три критерия: 1) кейсы в вашей нише — попросите показать цифры, не картинки. 2) Прозрачные отчеты — раз в неделю должна приходить аналитика с метриками. 3) Команда — у вас должен быть личный менеджер, который понимает бизнес, а не только подрядчик с табличкой" },
];

const rows = QA.map((it, i) => {
  const top = 344 + i * 90;
  const n = "0" + (i + 1);
  return `<div class="qa-row" style="position:absolute;left:65px;top:${top}px">
    <div style="position:absolute;left:28px;top:25px;color:#C5C5C5;font-family:Inter;font-weight:400;font-size:39px;line-height:86%;letter-spacing:-0.05em">${n}</div>
    <div style="position:absolute;left:130px;top:27px;width:1080px;color:#1C1C1C;font-family:Coolvetica;font-weight:400;font-size:36px;line-height:86%;text-transform:uppercase">${it.q}</div>
    <div class="qa-arrow" style="position:absolute;left:1234px;top:6px;color:#9A9895;font-family:Inter;font-weight:300;font-size:64px;line-height:86%">↙</div>
    <div class="qa-ans" style="position:absolute;left:28px;top:86px;width:1255px;color:#1C1C1C;font-family:Inter;font-weight:400;font-size:21px;line-height:1.35;letter-spacing:-0.04em">${it.a}</div>
  </div>`;
}).join("");

export const qaHtml = `<div style="position:absolute;left:0;top:0;width:1440px;height:1024px;background:#FFF;overflow:visible">
<style>
.qa-row{width:1311px;height:80px;background:#fff;border:1px solid #EAEAEA;border-radius:42px;overflow:hidden;cursor:pointer;transition:height .32s cubic-bezier(.4,.7,.3,1),box-shadow .32s ease}
.qa-row:hover{height:210px;z-index:30;box-shadow:0 16px 38px rgba(0,0,0,.14)}
.qa-ans{opacity:0;transition:opacity .25s ease .06s}
.qa-row:hover .qa-ans{opacity:1}
.qa-row:hover .qa-arrow{transform:rotate(-90deg)}
.qa-arrow{transition:transform .3s ease;transform-origin:center}
</style>
<img src="/blk/qa/airship.webp?v=2" alt="" style="position:absolute;left:-350px;top:531px;width:1331px;height:1331px"/>
<img src="/blk/qa/gold.webp?v=2" alt="" style="position:absolute;left:1245px;top:124px;width:265px;height:265px;transform:rotate(-16deg)"/>
<div style="position:absolute;left:65px;top:56px;width:880px;color:#1C1C1C;font-family:Coolvetica;font-weight:400;font-size:104px;line-height:86%;text-transform:uppercase">Частые вопросы<br/>про маркетинг</div>
<div style="position:absolute;left:1028px;top:69px;width:347px;color:#9A9895;font-family:Inter;font-weight:500;font-size:25px;line-height:86%;letter-spacing:-0.05em">Если не нашли свой вопрос — напишите нам, ответим лично</div>
${rows}
<div style="position:absolute;left:1116px;top:903px;width:259px;height:52px;border-radius:77px;background:linear-gradient(90deg,#F55D1C 0%,#1C1C1C 74%);outline:2px #F55D1C solid;outline-offset:-2px;display:flex;align-items:center;justify-content:center"><div style="color:#fff;font-family:Inter;font-weight:400;font-size:31px;line-height:86%;letter-spacing:-0.05em">Консультация</div></div>
</div>`;
