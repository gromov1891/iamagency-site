const serviceSection = ({
  title,
  description,
  items,
  term,
  price,
}: {
  title: string;
  description: string;
  items: string[];
  term: string;
  price: string;
}) => `
  <section class="bm-section">
    <h2>${title}</h2>
    <p class="bm-description">${description}</p>
    <h3>Что входит:</h3>
    <ul>${items.map((item) => `<li>${item}</li>`).join("")}</ul>
    <div class="bm-price"><span>${term}</span><strong><small>от</small> ${price}</strong></div>
    <div class="bm-actions">
      <a href="/#kontakty">Заказать стратегию</a>
      <a class="bm-menu" href="/#kontakty">Скачать меню с ценами</a>
    </div>
  </section>`;

export const brendbukMobileHtml = `
<div class="bm-root">
  <style>
    .bm-root{box-sizing:border-box;width:375px;padding:28px 18px 38px;background:#1C1C1C;color:#FFF;font-family:Inter,Arial,sans-serif}
    .bm-root *{box-sizing:border-box}
    .bm-crumb{margin:0 0 58px;color:#9A9895;font-size:9px;line-height:1.2;text-transform:uppercase}
    .bm-crumb a{color:inherit;text-decoration:none}
    .bm-section{position:relative;padding:0 0 52px;margin:0 0 50px;border-bottom:1px solid #555}
    .bm-section:last-child{margin-bottom:0;border-bottom:0}
    .bm-section h2{margin:0 0 30px;font-family:Coolvetica,Inter,Arial,sans-serif;font-size:32px;font-weight:400;line-height:.9;text-transform:uppercase}
    .bm-description{margin:0 0 34px;color:#9A9895;font-size:10px;font-weight:400;line-height:1.12;text-align:justify;white-space:pre-line}
    .bm-section h3{margin:0 0 20px;color:#90BEE9;font-family:Coolvetica,Inter,Arial,sans-serif;font-size:17px;font-weight:400;line-height:1;text-transform:uppercase}
    .bm-section ul{display:grid;gap:10px;margin:0 0 34px;padding:0;list-style:none}
    .bm-section li{font-size:11px;font-weight:400;line-height:1.08}
    .bm-section li::before{content:">";margin-right:9px;color:#9A9895}
    .bm-price{display:flex;flex-direction:column;align-items:flex-end;margin:0 0 18px;font-family:Coolvetica,Inter,Arial,sans-serif;text-transform:uppercase}
    .bm-price span{color:#9A9895;font-size:18px;line-height:1}
    .bm-price strong{font-size:18px;font-weight:400;line-height:1}
    .bm-price small{font-size:12px;text-transform:lowercase}
    .bm-actions{display:flex;justify-content:flex-end;gap:7px}
    .bm-actions a{display:flex;height:24px;padding:0 11px;align-items:center;justify-content:center;border-radius:999px;background:#FFF;color:#1C1C1C;font-size:10px;text-decoration:none}
    .bm-actions .bm-menu{background:#90BEE9}
  </style>
  <p class="bm-crumb"><a href="/">Главная</a> → услуги / Брендбук и SMM-стратегия</p>
  ${serviceSection({
    title: "SMM-стратегия развития",
    description:
      "Стратегия — это система, по которой бренд живёт в соцсетях месяцами. Мы изучаем нишу, аудиторию и конкурентов, находим отстройку и собираем понятный план работы.",
    items: [
      "Философия и миссия бренда",
      "Аудит, анализ ниши, конкурентов и целевой аудитории",
      "Позиционирование и механика отстройки",
      "Рубрикатор контента и банк идей",
      "Два варианта визуальной концепции",
      "Обложки и структура актуальных",
      "Готовые шаблоны в Canva / Figma",
      "Контент-план на 21 день",
      "ТЗ для тех, кто будет делать контент",
      "План продвижения: платные и бесплатные каналы",
      "Авторский надзор за первыми публикациями",
      "Три круга правок",
    ],
    term: "до 14 дней",
    price: "80 000 ₽",
  })}
  ${serviceSection({
    title: "Концептуальная стратегия бренда",
    description:
      "Глубоко анализируем бренд, продукт, рынок и конкурентов. Пересобираем смыслы, позиционирование и продуктовую матрицу, чтобы бренд продавал идеей, а не только ценой.",
    items: [
      "Бренд-платформа: ценности, философия, миссия",
      "Анализ востребованности продукта и ниши",
      "Глубокий анализ конкурентов: прямые, косвенные, внешние",
      "Анализ каналов продвижения конкурентов",
      "Портреты ЦА, боли и инсайты",
      "Проработка продуктовой матрицы",
      "Позиционирование и отстройка",
      "Мудборды и сбор референсов",
      "ТЗ для тех, кто будет делать контент",
      "План продвижения",
      "Банк идей и смыслов",
      "От 6 вариантов слоганов",
      "SMM-стратегия: рекомендации по контенту и механикам",
      "Защита стратегии",
    ],
    term: "3 недели",
    price: "130 000 ₽",
  })}
  ${serviceSection({
    title: "Фирменный стиль с нуля (айдентика)",
    description:
      "Создаём цельную визуальную систему бренда: от логотипа и палитры до паттернов, шаблонов и носителей.",
    items: [
      "Отрисовка логотипа",
      "Цветовая палитра",
      "Шрифтовая пара",
      "Разработка паттернов",
      "Шаблоны для соцсетей",
      "Дизайн носителей: 3 бумажных и 3 цифровых",
      "Три круга правок",
      "Защита проекта",
    ],
    term: "3 недели",
    price: "130 000 ₽",
  })}
  ${serviceSection({
    title: "Брендбук (полная упаковка)",
    description:
      "Максимальная упаковка бренда под ключ. По отдельности эти услуги стоят от 260 000 ₽, в брендбуке — от 150 000 ₽.",
    items: [
      "Концептуальная стратегия бренда",
      "Фирменный стиль с нуля",
      "Инструкция по использованию бренда (гайд по логотипу, цветам, шрифтам, смыслам)",
    ],
    term: "индивидуально",
    price: "150 000 ₽",
  })}
</div>`;
