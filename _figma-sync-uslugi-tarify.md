# Синхронизация страниц услуг и тарифов с Figma (file 7FkQtMfKX8eVLRVBJa11kY, IAM-WEB)

Дата: 2026-07-02. Источник макета - Figma MCP (узел 1:2 = канвас Desktop).

## Сделано

| Что | Figma node | Роут на сайте | Статус |
|-----|-----------|---------------|--------|
| Услуга «Брендбук и SMM-стратегия» | «Услуги 1» #12404:7025 (1440×7944) | /uslugi/brendbuk-i-smm-strategiya | ✅ 1:1, карточка 01 на главной ведёт сюда |
| Блок «Тарифы» на главной | #12050:403 | / (блок Тарифы) | ✅ ДВИЖЕНИЕ от 140 000₽ / ПРОРЫВ от 230 000₽ / ТРИУМФ от 450 000₽, новые описания, «от», карточки-ссылки |
| Тариф «Движение» | #12391:6403 (1440×5589) | /tarify/dvizhenie | ✅ 1:1 (панель dvizhenie-panel.svg, блоки 01-07) |
| Тариф «Прорыв» | #12404:6644 (1440×4133) | /tarify/proryv | ✅ 1:1 (панель proryv-panel.svg, блоки 01-06) |

## Сделано 2026-07-02 (вечер)

- Тариф «ТРИУМФ» → /tarify/triumf (панель triumf-panel.svg сгенерирована вручную - Figma 429). Карточка на главной кликабельна.
- Услуги 2-4 → /uslugi/vedenie-sotssetey, /uslugi/marketing-i-prodvizhenie, /uslugi/kontent-syomki. Карточки 01-04 блока УСЛУГИ кликабельны. Якорь /#tarify добавлен.

## Осталось

- «Обучение» (Школа SMM): дизайнер ПЕРЕСОЗДАЛ фрейм (старый id 12455:557 умер), а Figma REST API в лимите 429 до ~2026-07-07. Разблокировка: юзер включает Dev Mode MCP Server в десктопном Figma (Preferences) ИЛИ новый токен с платного аккаунта, ИЛИ ждать сброса лимита. Карточка 05 «Обучение» на главной не кликабельна.
- Кнопка «Скачать меню с ценами» на странице услуги ведёт на /#kontakty - нужен реальный файл прайса (PDF), когда появится.

## Метод (как повторять)

- Данные фрейма: Figma MCP `get_figma_data` (fileKey 7FkQtMfKX8eVLRVBJa11kY, nodeId фрейма). Дамп сохраняется в tool-results, дальше grep/sed по нему.
- Картинки: `download_figma_images` → public/blk/...
- Рендер для сверки: `curl https://api.figma.com/v1/images/7FkQtMfKX8eVLRVBJa11kY?ids=<id>&format=png&scale=0.5` с X-Figma-Token из Курс/.mcp.json.
- Паттерн страницы: gen/<name>Html.ts (холст 1440×H, абсолютные координаты) + реестр + [slug]/page.tsx с BuilderBlock. Образец: src/app/uslugi/ и src/app/tarify/.
- Типографика: Inter ls -0.05em lh 86%, lowercase/uppercase по textCase; Coolvetica без спейсинга; JUSTIFIED → text-align:justify.
- Проверка: next build → next start :3411 → gstack browse скриншоты → сравнить с Figma-рендером.
- Деплой: git push origin main (supportn8n/iamagency-site) → Vercel авто-деплой. ВАЖНО: push-protection режет секреты - токены в .md не коммитить.
