# I AM AGENCY: план RU/EN-версии и multilingual SEO

Дата исследования: 3 августа 2026 года.

## 1. Рекомендуемое решение

- Сохранить все существующие русские URL без изменений.
- Разместить английскую версию в подкаталоге `/en/` на том же домене.
- Использовать отдельный URL для каждой языковой версии, серверный HTML и ручную локализацию контента.
- Связывать только реально опубликованные пары через `hreflang="ru"` и `hreflang="en"`.
- Делать self-canonical: RU canonical указывает на RU URL, EN canonical — на EN URL. Нельзя canonical EN → RU.
- Не перенаправлять посетителя автоматически по IP или `Accept-Language`.
- Язык можно предложить ненавязчивым баннером, но окончательный выбор всегда делает пользователь.

Почему `/en/`, а не `en.iamagency.su`:

- общий доменный авторитет и ссылки;
- одна инфраструктура Next.js, CMS, аналитики и деплоя;
- проще поддерживать взаимные `hreflang` и сквозную перелинковку;
- Yandex рассматривает поддомен как отдельный сайт, что добавляет лишнее администрирование;
- существующие RU URL не затрагиваются.

Домен `.su` Google относит к generic ccTLD, поэтому сам по себе он не ограничивает английскую версию одним регионом.

## 2. Текущее состояние

В production sitemap находится 45 индексируемых RU URL:

- 1 главная;
- 1 хаб кейсов + 10 нишевых кейсов;
- 1 хаб маркетинга + 16 направлений;
- 1 школа SMM;
- 1 блог + 4 статьи;
- 4 страницы услуг;
- 3 тарифа;
- 3 служебные страницы.

Что уже хорошо:

- у всех 45 страниц есть title, description и self-canonical;
- дублей title и description не найдено;
- все страницы отдают `<html lang="ru">`;
- sitemap формируется из реестров кейсов, услуг, тарифов, маркетинга и CMS;
- есть Organization/WebSite, FAQ, Breadcrumb и другие JSON-LD-разметки.

Что нужно исправить до/вместе с EN-запуском:

- 6 RU title длиннее 60 символов;
- 3 RU description длиннее 160 символов;
- 3 RU description короче 120 символов;
- корневой canonical в `app/layout.tsx` нельзя наследовать на EN-страницы;
- сейчас нет `hreflang`, `alternateLocale` и языковых пар в sitemap;
- `WebSite.inLanguage`, Organization description, breadcrumbs и JSON-LD только русские;
- текущий `lastModified` почти для всех URL задан одной статической датой;
- CMS не хранит locale, переводную пару и отдельный EN slug;
- тексты многих страниц находятся внутри Figma→HTML-строк и требуют серверных EN-модулей.

## 3. Предлагаемая URL-структура

### Основные разделы

| Сущность | RU URL | EN URL |
|---|---|---|
| Главная | `/` | `/en` |
| Кейсы | `/keisy` | `/en/cases` |
| Маркетинг | `/marketing` | `/en/marketing` |
| Школа | `/shkola-smm` | `/en/smm-school` |
| Блог | `/blog` | `/en/blog` |
| Карта сайта | `/sitemap` | `/en/sitemap` |
| Политика | `/privacy-policy` | `/en/privacy-policy` |
| Согласие | `/privacy-consent` | `/en/personal-data-consent` |

### Услуги

| RU URL | EN URL | Основной EN intent |
|---|---|---|
| `/uslugi/brendbuk-i-smm-strategiya` | `/en/services/brand-social-strategy` | social media strategy agency |
| `/uslugi/vedenie-sotssetey` | `/en/services/social-media-management` | social media management agency |
| `/uslugi/marketing-i-prodvizhenie` | `/en/services/social-media-marketing` | social media marketing services |
| `/uslugi/kontent-syomki` | `/en/services/content-production` | social media content production |

### Тарифы

| RU URL | EN URL | Рабочее EN-название |
|---|---|---|
| `/tarify/dvizhenie` | `/en/packages/momentum` | Momentum |
| `/tarify/proryv` | `/en/packages/breakthrough` | Breakthrough |
| `/tarify/triumf` | `/en/packages/triumph` | Triumph |

Цены, валюту, налоги и условия для EN-аудитории нужно определить до индексации. Простая замена ₽ на $ без коммерческого решения недопустима.

### Кейсы

| RU URL | EN URL |
|---|---|
| `/case/beauty` | `/en/cases/beauty` |
| `/case/fashion` | `/en/cases/fashion` |
| `/case/sport` | `/en/cases/sports-education` |
| `/case/experts` | `/en/cases/personal-brands` |
| `/case/real-estate` | `/en/cases/real-estate` |
| `/case/tourism` | `/en/cases/travel-hospitality` |
| `/case/cars` | `/en/cases/automotive` |
| `/case/horeca` | `/en/cases/horeca` |
| `/case/product` | `/en/cases/ecommerce` |
| `/case/events` | `/en/cases/events` |

### Маркетинговые направления

| RU URL | EN URL | Основной EN intent |
|---|---|---|
| `/marketing/kontekstnaya-reklama` | `/en/marketing/paid-search` | paid search agency / PPC management |
| `/marketing/seo-prodvizhenie` | `/en/marketing/seo-services` | SEO agency / SEO services |
| `/marketing/target-reklama` | `/en/marketing/paid-social` | paid social agency |
| `/marketing/reklama-v-telegram` | `/en/marketing/telegram-advertising` | Telegram advertising agency |
| `/marketing/cpa-marketing` | `/en/marketing/cpa-marketing` | CPA / performance marketing |
| `/marketing/skvoznaya-analitika` | `/en/marketing/marketing-analytics` | marketing analytics services |
| `/marketing/influence-marketing` | `/en/marketing/influencer-marketing` | influencer marketing agency |
| `/marketing/orm-upravlenie-reputaciey` | `/en/marketing/online-reputation-management` | online reputation management |
| `/marketing/pr-prodvizhenie` | `/en/marketing/pr-services` | PR agency / media relations |
| `/marketing/programmatic-reklama` | `/en/marketing/programmatic-advertising` | programmatic advertising agency |
| `/marketing/mobilnaya-reklama` | `/en/marketing/app-marketing` | mobile app marketing agency |
| `/marketing/prodvizhenie-youtube` | `/en/marketing/youtube-marketing` | YouTube marketing agency |
| `/marketing/specproekty` | `/en/marketing/creative-campaigns` | creative campaigns / brand activations |
| `/marketing/it-produkty` | `/en/marketing/marketing-technology` | MarTech development / marketing automation |
| `/marketing/offline-prodvizhenie` | `/en/marketing/experiential-marketing` | experiential marketing agency |
| `/marketing/razrabotka-saytov` | `/en/marketing/web-development` | web design and development agency |

### Блог

Переводить и индексировать статью только после полной локализации основного текста, title, description, slug, alt-текстов, ссылок и JSON-LD.

| RU URL | EN URL |
|---|---|
| `/blog/claude-dlya-biznesa-prostym-yazykom` | `/en/blog/claude-for-business-explained` |
| `/blog/chto-vliyaet-na-prodazhi-v-2026` | `/en/blog/what-drives-sales-in-2026` |
| `/blog/instagram-po-starim-pravilam` | `/en/blog/instagram-growth-rules-have-changed` |
| `/blog/servisy-dlya-sozdaniya-vizuala` | `/en/blog/tools-for-social-media-visuals` |

## 4. Единый SEO-реестр

До создания страниц нужен единый типизированный реестр, например `src/lib/i18n/route-registry.ts`.

Для каждой сущности он должен хранить:

- стабильный внутренний `translationId`;
- RU и EN path/slug;
- locale и статус публикации;
- SEO title и meta description на обоих языках;
- H1;
- Open Graph title/description/image/alt;
- breadcrumb labels;
- `lastModified` отдельно для каждого языка;
- связь с контентным источником и JSON-LD;
- доступность страницы в переключателе языка.

Этот реестр должен быть единственным источником для:

1. `generateMetadata()`;
2. canonical и `hreflang`;
3. XML sitemap;
4. языкового переключателя;
5. HTML-карты сайта;
6. breadcrumbs и внутренней перелинковки;
7. автоматического SEO-теста.

Так исключается ситуация, когда ссылка есть в sitemap, но отсутствует в `hreflang`, или переключатель ведёт на несуществующий slug.

## 5. Правила metadata для всех 90 страниц

Для каждой RU/EN страницы готовится отдельная запись, а не машинный перевод одного поля.

Минимальные поля:

- уникальный title; ориентир 50–60 символов, но проверять также визуальную ширину;
- description с intent, выгодой и доказательством; ориентир 140–160 символов;
- один H1, не полностью дублирующий title;
- self-canonical;
- взаимные `ru`/`en` alternates;
- локализованные Open Graph и Twitter metadata;
- локализованные alt-тексты;
- `og:locale="ru_RU"` / `og:locale="en_US"` либо `en_GB` после выбора рынка;
- `inLanguage` в WebPage/Article/Service/FAQ/Breadcrumb JSON-LD.

Пример пары для главной:

- RU title: `SMM-агентство полного цикла | I AM AGENCY`
- RU description: текущую можно сохранить после финальной проверки фактов.
- EN title: `Full-Service Social Media Agency | I AM AGENCY`
- EN description: `Strategy, content, social media management, paid campaigns and influencer marketing from one team. Explore I AM AGENCY services and case studies.`

Пример пары для ведения соцсетей:

- RU intent: `ведение соцсетей под ключ`;
- EN intent: `social media management agency`;
- EN title: `Social Media Management Agency | I AM AGENCY`;
- EN description: `End-to-end social media management: strategy, content calendars, platform-native posts, community management and reporting for growing brands.`

Конкурентный обзор показывает, что международный рынок использует прежде всего термины `social media agency`, `social media management`, `paid social`, `content creation`, `influencer marketing`, `UGC` и `community management`. Аббревиатура `SMM agency` должна быть вторичной, а не главным EN-ключом.

## 6. Hreflang и canonical

На каждой опубликованной паре в `<head>`:

```html
<link rel="canonical" href="https://iamagency.su/en/services/social-media-management" />
<link rel="alternate" hreflang="ru" href="https://iamagency.su/uslugi/vedenie-sotssetey" />
<link rel="alternate" hreflang="en" href="https://iamagency.su/en/services/social-media-management" />
```

Правила:

- RU и EN страницы перечисляют себя и друг друга;
- ссылки взаимные;
- URL абсолютные;
- непереведённая страница не получает фиктивный EN `hreflang`;
- `x-default` необязателен при ручном переключении. Для главной можно направить его на `/`, если она остаётся страницей по умолчанию;
- язык страницы должен совпадать с видимым основным контентом и `<html lang>`.

Для Yandex обязательно использовать HTML `hreflang`: Yandex больше не использует sitemap для определения языковых версий.

## 7. XML sitemap

При полном запуске получится около 90 URL, поэтому один `sitemap.xml` достаточен.

Для каждой опубликованной пары:

```ts
{
  url: "https://iamagency.su/en/services/social-media-management",
  lastModified: enUpdatedAt,
  alternates: {
    languages: {
      ru: "https://iamagency.su/uslugi/vedenie-sotssetey",
      en: "https://iamagency.su/en/services/social-media-management",
    },
  },
}
```

Требования:

- в sitemap попадают только `200`, canonical, indexable и опубликованные URL;
- обе страницы языковой пары имеют одинаковый набор alternates;
- `lastModified` берётся из реального изменения конкретной локали;
- черновики, admin, API и отсутствующие переводы исключаются;
- sitemap повторно отправляется в Google Search Console и Yandex Webmaster;
- для удобного анализа можно добавить отдельное URL-prefix property `https://iamagency.su/en/` в Search Console.

## 8. Переключатель языка

### Desktop

Рекомендуемое место — отмеченная на макете зона справа от `КОНТАКТЫ`.

Формат: компактная сегментированная пилюля `RU | EN`, а не флаг. Флаг означает страну, а не язык.

Спецификация для текущего 1440 canvas:

- ориентир `x: 1348–1355`, `y: 22`;
- ширина 70–76 px, высота 36–40 px;
- при необходимости `КОНТАКТЫ` сдвинуть на 15–25 px влево;
- активный язык — градиент бренда и белый текст;
- неактивный — белый фон, тёмный текст, видимый focus state;
- `aria-label="Switch language to English"` / `Переключить язык на русский`;
- ссылка ведёт на точную переводную пару текущей страницы, не всегда на главную.

В проекте существуют два визуальных состояния меню: встроенное меню первого hero-экрана и sticky `Header`. Переключатель требуется добавить в оба состояния. Предпочтительно вынести меню из сгенерированного HTML в общий React-компонент; если это слишком рискованно для 1:1-вёрстки, добавить одинаковый server-rendered switcher в desktop/tablet/mobile hero и sticky header.

### Mobile

- в открытом меню сразу после логотипа или перед пунктом `УСЛУГИ`;
- отдельная строка `Language  RU | EN`;
- минимальная touch-area 44×44 px;
- закрывать меню после перехода;
- сохранять выбранный язык в cookie только для подсказок, не для изменения URL-контента.

### Поведение при неполной локализации

- не вести пользователя молча на EN-главную;
- либо временно скрывать/отключать EN для страницы без пары, либо показывать явно подписанный переход на EN-раздел;
- не добавлять такую пару в `hreflang` и sitemap alternates.

## 9. Архитектура Next.js

Главная сложность — корректный `<html lang>` при сохранении RU в корне.

Рекомендуемый вариант:

- разделить маршруты через route groups с двумя root layouts;
- RU layout рендерит `<html lang="ru">`;
- EN layout рендерит `<html lang="en">`;
- общий визуальный shell вынести в `SiteLayout`;
- локаль, навигацию, CTA, футер и structured data передавать явно;
- не вычислять язык клиентским JavaScript после загрузки.

Figma→HTML:

- EN-текст должен присутствовать в initial server HTML;
- нельзя использовать браузерный автоперевод или DOM replacement после hydration;
- для статических canvas-блоков создать EN-модули или build-time генерацию из локализованных данных;
- после перевода обязательно пересобрать переносы, размеры и высоты для desktop 1440, tablet 768 и mobile 375.

## 10. CMS и блог

Добавить в `CmsArticle`:

- `locale: "ru" | "en"`;
- `translationId`;
- отдельный `slug`;
- `metaTitle` и `metaDescription`;
- локализованные image alt/caption;
- `sourceLocale` и статус перевода;
- отдельные `updatedAt`, `publishedAt`;
- связь RU↔EN в админке.

В админке:

- фильтр языка;
- кнопка `Создать EN-версию`;
- индикатор `нет перевода / черновик / опубликовано`;
- preview canonical/hreflang;
- запрет публикации при пустых metadata, H1, slug или alt;
- проверка уникальности slug внутри locale.

## 11. Контентная локализация

EN-версия не должна быть дословным переводом RU.

Нужно локализовать:

- поисковый intent и терминологию (`ведение соцсетей` → `social media management`);
- платформы: для глобального рынка важнее Instagram, TikTok, LinkedIn, YouTube, Meta Ads;
- кейсы и доказательства, понятные международной аудитории;
- валюту, договор, оплату и часовой пояс;
- CTA (`Book a discovery call`, `Discuss your project`, `Get a proposal`);
- формы, success/error states, email и Telegram-сообщения;
- социальные ссылки и каналы связи;
- юридические документы и согласие на международную обработку данных.

Отдельный launch gate: определить целевой EN-рынок — global English, UK, UAE, EU или US. До этого использовать общий код `en`; региональный `en-US`/`en-GB` и локальную валюту вводить только при реальной региональной версии.

Школу SMM нельзя позиционировать как англоязычный продукт, если обучение и поддержка доступны только на русском. В таком случае EN-страницу либо не публиковать, либо честно обозначить язык курса.

## 12. Внутренняя перелинковка

- EN-навигация ссылается только на EN-URL, RU — только на RU;
- каждая услуга связывается с 2–4 релевантными кейсами и CTA;
- кейс ссылается на соответствующую услугу;
- статьи ссылаются на EN service/marketing pages;
- breadcrumbs полностью локализованы;
- Related content не смешивает языки;
- footer содержит полный EN-раздел и языковой переключатель;
- не должно быть orphan pages ни в одной локали.

## 13. Structured data и social previews

- Organization остаётся одной сущностью с тем же `@id`;
- добавить `availableLanguage: ["Russian", "English"]` после запуска;
- для каждой локали создавать WebSite/WebPage/Article/Service с корректным `inLanguage`;
- FAQ и Breadcrumb JSON-LD переводить вместе с видимым контентом;
- Article `headline`, `description`, `dateModified`, author и image должны соответствовать локали;
- подготовить EN Open Graph copy и alt, при необходимости отдельные EN OG-картинки;
- проверить Rich Results Test и Schema Markup Validator.

## 14. Аналитика и инструменты вебмастеров

- оставить один контейнер аналитики, но передавать `page_language`;
- сегментировать conversion funnel по `ru/en`;
- создать отдельные отчёты по `/en/`;
- добавить URL-prefix property `/en/` в Search Console для удобства, сохранив domain property;
- проверить EN URL через URL Inspection;
- отправить обновлённый sitemap в Google и Yandex;
- следить за `Duplicate without user-selected canonical`, hreflang errors, 404 и soft 404;
- отслеживать заявки, доход и конверсию отдельно по языку.

## 15. Этапы внедрения

### Этап 0. Коммерческие решения

1. Выбрать целевой EN-рынок.
2. Определить услуги, доступные международно.
3. Утвердить валюту, оплату, договор и каналы связи.
4. Решить, переводится ли школа SMM.

### Этап 1. SEO-реестр и фундамент

1. Создать route/translation registry.
2. Разделить RU/EN layouts и `<html lang>`.
3. Сделать locale-aware metadata/JSON-LD helpers.
4. Добавить переключатель и точное сопоставление URL.
5. Переделать sitemap и HTML-карту сайта.

### Этап 2. Приоритетный MVP

Перевести и запустить:

1. `/en`;
2. `/en/services/social-media-management`;
3. `/en/services/content-production`;
4. `/en/services/social-media-marketing`;
5. `/en/cases` и 3–5 самых сильных кейсов;
6. `/en/privacy-policy` и формы.

Это создаёт законченный EN-конверсионный путь без публикации тонких страниц.

### Этап 3. Полное покрытие

1. Остальные услуги и кейсы.
2. Маркетинговые направления после отдельной EN-семантики.
3. Тарифы после утверждения международных условий.
4. Блог — только качественные переводы или оригинальные EN-материалы.
5. Школа — только после решения по языку продукта.

### Этап 4. QA перед индексацией

Автоматические проверки для каждой пары:

- HTTP 200;
- правильный `html lang`;
- уникальный title/description/H1;
- self-canonical;
- взаимный hreflang;
- присутствие обеих версий в sitemap;
- отсутствие mixed-language navigation;
- валидный JSON-LD;
- все внутренние ссылки 200;
- desktop/tablet/mobile visual regression;
- Lighthouse и Core Web Vitals;
- форма заявки и аналитические события.

### Этап 5. Публикация и наблюдение

1. Сначала выкладывать EN-страницы `noindex` на staging/preview.
2. После QA включать index по законченным кластерам.
3. Обновить sitemap и отправить поисковикам.
4. Через 7, 14 и 30 дней проверить индексирование и hreflang.
5. Через 6–8 недель пересмотреть EN titles/descriptions по реальным запросам и CTR.

## 16. Критерии готовности

EN-запуск считается готовым, когда:

- у каждой опубликованной страницы есть полноценный EN-контент;
- все RU/EN пары находятся в одном реестре;
- metadata подготовлены отдельно на обоих языках;
- canonical и hreflang проходят автоматическую проверку;
- sitemap содержит только опубликованные canonical URL;
- переключатель ведёт на эквивалентную страницу;
- нет автоматических языковых редиректов;
- формы, юридические тексты и аналитика локализованы;
- EN-страницы доступны максимум за 3 клика от `/en`.
