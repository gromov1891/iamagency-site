# Lead attribution for I AM AGENCY

The website stores the first touch and the latest meaningful non-direct touch in the browser and sends both with every lead. Telegram, email, the admin dashboard and CSV use the same attribution model.

## Yandex Direct URL parameters

Add the following shared URL parameters at campaign level in Yandex Direct:

```text
utm_source=yandex&utm_medium=cpc&utm_campaign={campaign_name_lat}&utm_id={campaign_id}&utm_content={ad_id}&utm_term={keyword}&campaign_id={campaign_id}&campaign_name={campaign_name}&campaign_type={campaign_type}&ad_id={ad_id}&creative_id={creative_id}&gbid={gbid}&phrase_id={phrase_id}&matched_keyword={matched_keyword}&match_type={match_type}&source={source}&source_type={source_type}&position={position}&position_type={position_type}&device_type={device_type}&region_id={region_id}&region_name={region_name}
```

Yandex adds `yclid` automatically when click tagging is enabled. The site captures it independently from UTM parameters.

After changing campaign parameters, test a generated ad link. The landing URL must contain real values instead of placeholders such as `{campaign_id}`. A lead from that visit should show the following Telegram attribution block:

```text
📊 Атрибуция
Канал: Платная реклама
Источник: Яндекс Директ
UTM: yandex / cpc
Кампания: <name> · ID <id>
Объявление: ID <id>
Ключ: <keyword>
Площадка: <domain or none> · <search or context>
Позиция: <type> · <number>
Устройство / регион: <device> · <region>
Click ID: <yclid>
```

An ordinary visit from Yandex search without paid tags is reported as `Органический поиск · Яндекс`, not as an ambiguous organic/direct visit.

## Supported parameters

- UTM: `utm_id`, `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`.
- Click IDs: `yclid`, `ymclid`, `gclid`, `gbraid`, `wbraid`, `vk_click_id`, `fbclid`, `msclkid`, `ttclid`.
- Yandex Direct: campaign, ad, creative, group, phrase, keyword, placement, position, device and region parameters from the template above.
- Yandex Metrika client ID from the `_ym_uid` cookie when available.

Do not place names, phone numbers, email addresses or other personal data in UTM values.
