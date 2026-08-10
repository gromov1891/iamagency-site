export const LEAD_ATTRIBUTION_KEYS = [
  "client_id",
  "utm_id",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "gclid",
  "gbraid",
  "wbraid",
  "yclid",
  "ymclid",
  "fbclid",
  "vk_click_id",
  "msclkid",
  "ttclid",
  "openstat",
  "campaign_id",
  "campaign_name",
  "campaign_type",
  "ad_id",
  "banner_id",
  "creative_id",
  "gbid",
  "phrase_id",
  "retargeting_id",
  "keyword",
  "matched_keyword",
  "match_type",
  "source",
  "source_type",
  "position",
  "position_type",
  "device_type",
  "region_id",
  "region_name",
] as const;

export type LeadAttributionKey = (typeof LEAD_ATTRIBUTION_KEYS)[number];

export type LeadAttributionTouch = Partial<Record<LeadAttributionKey, string>> & {
  landingPage: string;
  referrer: string;
  capturedAt: string;
};

export type LeadAttribution = {
  firstTouch: LeadAttributionTouch;
  lastTouch: LeadAttributionTouch;
};

const PAID_MEDIA = new Set([
  "cpc", "ppc", "paid", "paid_search", "paid-social", "paid_social",
  "display", "banner", "cpm", "cpv", "remarketing", "retargeting",
]);

const ORGANIC_SOCIAL_MEDIA = new Set([
  "social", "organic_social", "organic-social", "social_organic", "social-organic",
]);

function normalized(value?: string) {
  return (value || "").trim().toLowerCase();
}

function referrerHost(value: string) {
  if (!value) return "";
  try {
    return new URL(value).hostname.replace(/^www\./, "").toLowerCase();
  } catch {
    return value.toLowerCase();
  }
}

function sourceMatches(source: string, values: string[]) {
  return values.some((value) => source === value || source.includes(value));
}

function socialSourceName(source: string, host: string) {
  if (source === "ig" || source === "instagram" || host.includes("instagram.com")) return "Instagram";
  if (source === "fb" || source === "facebook" || host.includes("facebook.com")) return "Facebook";
  if (source === "tg" || source === "telegram" || host.includes("t.me")) return "Telegram";
  if (source === "vk" || source === "vkontakte" || host.includes("vk.com")) return "ВКонтакте";
  if (source === "tt" || source === "tiktok" || host.includes("tiktok.com")) return "TikTok";
  if (source === "yt" || source === "youtube" || host.includes("youtube.com")) return "YouTube";
  return "";
}

export function attributionClickId(touch?: LeadAttributionTouch | null) {
  if (!touch) return "";
  return touch.yclid || touch.ymclid || touch.gclid || touch.gbraid || touch.wbraid ||
    touch.vk_click_id || touch.fbclid || touch.msclkid || touch.ttclid || "";
}

export function describeAttribution(touch?: LeadAttributionTouch | null) {
  if (!touch) return { channel: "Прямой переход", source: "Источник не определён" };

  const utmSource = normalized(touch.utm_source);
  const placementSource = normalized(touch.source);
  const sourceSignal = `${utmSource} ${placementSource}`.trim();
  const medium = normalized(touch.utm_medium);
  const host = referrerHost(touch.referrer);
  const socialSource = socialSourceName(utmSource, host);
  const explicitOrganicSocial = ORGANIC_SOCIAL_MEDIA.has(medium) || normalized(touch.utm_content) === "link_in_bio";
  if (explicitOrganicSocial && socialSource) {
    return { channel: "Социальные сети", source: socialSource };
  }

  const hasDirectCampaignData = Boolean(touch.campaign_id || touch.ad_id || touch.banner_id || touch.phrase_id);
  const hasPaidClickId = Boolean(
    touch.yclid || touch.ymclid || touch.gclid || touch.gbraid || touch.wbraid ||
    touch.vk_click_id || touch.msclkid || touch.ttclid,
  );
  const paid = PAID_MEDIA.has(medium) || hasPaidClickId || Boolean(touch.openstat) || hasDirectCampaignData;

  if (touch.yclid || touch.ymclid || touch.openstat || (paid && sourceMatches(sourceSignal, ["yandex", "ya", "direct"]))) {
    return { channel: "Платная реклама", source: "Яндекс Директ" };
  }
  if ((touch.gclid || touch.gbraid || touch.wbraid) || (paid && sourceMatches(sourceSignal, ["google", "adwords"]))) {
    return { channel: "Платная реклама", source: "Google Ads" };
  }
  if (touch.vk_click_id || (paid && sourceMatches(sourceSignal, ["vk", "vkontakte", "mytarget"]))) {
    return { channel: "Платная реклама", source: "VK Ads" };
  }
  if (paid && (touch.fbclid || sourceMatches(sourceSignal, ["facebook", "instagram", "meta"]))) {
    return { channel: "Платная реклама", source: "Meta Ads" };
  }
  if (touch.msclkid || (paid && sourceMatches(sourceSignal, ["bing", "microsoft"]))) {
    return { channel: "Платная реклама", source: "Microsoft Ads" };
  }
  if (touch.ttclid || (paid && sourceMatches(sourceSignal, ["tiktok"]))) {
    return { channel: "Платная реклама", source: "TikTok Ads" };
  }
  if (paid) {
    return { channel: "Платная реклама", source: touch.utm_source || touch.source || "Источник из рекламной метки" };
  }

  if (host.includes("yandex.")) return { channel: "Органический поиск", source: "Яндекс" };
  if (host.includes("google.")) return { channel: "Органический поиск", source: "Google" };
  if (host.includes("bing.com")) return { channel: "Органический поиск", source: "Bing" };
  if (host.includes("mail.ru")) return { channel: "Органический поиск", source: "Поиск Mail.ru" };

  if (utmSource) {
    return { channel: socialSource ? "Социальные сети" : "Переход по метке", source: socialSource || touch.utm_source || "UTM" };
  }
  if (socialSource) return { channel: "Социальные сети", source: socialSource };
  if (host) return { channel: "Переход с сайта", source: host };
  return { channel: "Прямой переход", source: "Адрес введён напрямую или источник скрыт" };
}

export function compactAttributionReferrer(value: string) {
  return referrerHost(value);
}
