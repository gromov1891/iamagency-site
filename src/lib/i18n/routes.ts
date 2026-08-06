export type Locale = "ru" | "en";
export type TranslationStatus = "planned" | "preview" | "published";

export type TranslationRoute = {
  id: string;
  ru: string;
  en: string;
  status: TranslationStatus;
};

const TRANSLATION_ROUTE_PLAN: TranslationRoute[] = [
  { id: "home", ru: "/", en: "/en", status: "preview" },
  { id: "contacts", ru: "/kontakty", en: "/en/contacts", status: "published" },
  { id: "cases", ru: "/keisy", en: "/en/cases", status: "planned" },
  { id: "case-beauty", ru: "/case/beauty", en: "/en/cases/beauty", status: "planned" },
  { id: "case-fashion", ru: "/case/fashion", en: "/en/cases/fashion", status: "planned" },
  { id: "case-sport", ru: "/case/sport", en: "/en/cases/sports-education", status: "planned" },
  { id: "case-experts", ru: "/case/experts", en: "/en/cases/personal-brands", status: "planned" },
  { id: "case-real-estate", ru: "/case/real-estate", en: "/en/cases/real-estate", status: "planned" },
  { id: "case-tourism", ru: "/case/tourism", en: "/en/cases/travel-hospitality", status: "planned" },
  { id: "case-cars", ru: "/case/cars", en: "/en/cases/automotive", status: "planned" },
  { id: "case-horeca", ru: "/case/horeca", en: "/en/cases/horeca", status: "planned" },
  { id: "case-product", ru: "/case/product", en: "/en/cases/ecommerce", status: "planned" },
  { id: "case-events", ru: "/case/events", en: "/en/cases/events", status: "planned" },
  { id: "marketing", ru: "/marketing", en: "/en/marketing", status: "planned" },
  { id: "paid-search", ru: "/marketing/kontekstnaya-reklama", en: "/en/marketing/paid-search", status: "planned" },
  { id: "seo", ru: "/marketing/seo-prodvizhenie", en: "/en/marketing/seo-services", status: "planned" },
  { id: "paid-social", ru: "/marketing/target-reklama", en: "/en/marketing/paid-social", status: "planned" },
  { id: "telegram-ads", ru: "/marketing/reklama-v-telegram", en: "/en/marketing/telegram-advertising", status: "planned" },
  { id: "cpa", ru: "/marketing/cpa-marketing", en: "/en/marketing/cpa-marketing", status: "planned" },
  { id: "analytics", ru: "/marketing/skvoznaya-analitika", en: "/en/marketing/marketing-analytics", status: "planned" },
  { id: "influencer", ru: "/marketing/influence-marketing", en: "/en/marketing/influencer-marketing", status: "planned" },
  { id: "reputation", ru: "/marketing/orm-upravlenie-reputaciey", en: "/en/marketing/online-reputation-management", status: "planned" },
  { id: "pr", ru: "/marketing/pr-prodvizhenie", en: "/en/marketing/pr-services", status: "planned" },
  { id: "programmatic", ru: "/marketing/programmatic-reklama", en: "/en/marketing/programmatic-advertising", status: "planned" },
  { id: "app-marketing", ru: "/marketing/mobilnaya-reklama", en: "/en/marketing/app-marketing", status: "planned" },
  { id: "youtube", ru: "/marketing/prodvizhenie-youtube", en: "/en/marketing/youtube-marketing", status: "planned" },
  { id: "creative-campaigns", ru: "/marketing/specproekty", en: "/en/marketing/creative-campaigns", status: "planned" },
  { id: "martech", ru: "/marketing/it-produkty", en: "/en/marketing/marketing-technology", status: "planned" },
  { id: "experiential", ru: "/marketing/offline-prodvizhenie", en: "/en/marketing/experiential-marketing", status: "planned" },
  { id: "web-development", ru: "/marketing/razrabotka-saytov", en: "/en/marketing/web-development", status: "planned" },
  { id: "smm-school", ru: "/shkola-smm", en: "/en/smm-school", status: "planned" },
  { id: "blog", ru: "/blog", en: "/en/blog", status: "planned" },
  { id: "blog-claude", ru: "/blog/claude-dlya-biznesa-prostym-yazykom", en: "/en/blog/claude-for-business-explained", status: "planned" },
  { id: "blog-sales-2026", ru: "/blog/chto-vliyaet-na-prodazhi-v-2026", en: "/en/blog/what-drives-sales-in-2026", status: "planned" },
  { id: "blog-instagram", ru: "/blog/instagram-po-starim-pravilam", en: "/en/blog/instagram-growth-rules-have-changed", status: "planned" },
  { id: "blog-visual-tools", ru: "/blog/servisy-dlya-sozdaniya-vizuala", en: "/en/blog/tools-for-social-media-visuals", status: "planned" },
  { id: "service-strategy", ru: "/uslugi/brendbuk-i-smm-strategiya", en: "/en/services/brand-social-strategy", status: "planned" },
  { id: "service-management", ru: "/uslugi/vedenie-sotssetey", en: "/en/services/social-media-management", status: "planned" },
  { id: "service-marketing", ru: "/uslugi/marketing-i-prodvizhenie", en: "/en/services/social-media-marketing", status: "planned" },
  { id: "service-production", ru: "/uslugi/kontent-syomki", en: "/en/services/content-production", status: "planned" },
  { id: "package-momentum", ru: "/tarify/dvizhenie", en: "/en/packages/momentum", status: "planned" },
  { id: "package-breakthrough", ru: "/tarify/proryv", en: "/en/packages/breakthrough", status: "planned" },
  { id: "package-triumph", ru: "/tarify/triumf", en: "/en/packages/triumph", status: "planned" },
  { id: "privacy", ru: "/privacy-policy", en: "/en/privacy-policy", status: "planned" },
  { id: "consent", ru: "/privacy-consent", en: "/en/personal-data-consent", status: "planned" },
  { id: "sitemap", ru: "/sitemap", en: "/en/sitemap", status: "planned" },
];

// Every mapped page has passed the bilingual release gate. Keeping the original
// rollout status in the plan makes future partial launches explicit, while the
// public registry exposes the current production state.
export const TRANSLATION_ROUTES: TranslationRoute[] = TRANSLATION_ROUTE_PLAN.map((route) => ({
  ...route,
  status: "published",
}));

const normalizePath = (path: string) => {
  if (!path || path === "/") return "/";
  return path.replace(/\/+$/, "") || "/";
};

export function getLocaleFromPath(path: string): Locale {
  return normalizePath(path).startsWith("/en") ? "en" : "ru";
}

export function findTranslationRoute(path: string) {
  const normalized = normalizePath(path);
  return TRANSLATION_ROUTES.find((route) => route.ru === normalized || route.en === normalized);
}

export function getTranslatedPath(path: string, locale: Locale) {
  const route = findTranslationRoute(path);
  return route?.[locale];
}

export function getSeoAlternates(path: string) {
  const normalized = normalizePath(path);
  const route = findTranslationRoute(normalized);
  return {
    canonical: normalized,
    languages:
      route?.status === "published"
        ? { ru: route.ru, en: route.en, "x-default": route.ru }
        : undefined,
  };
}
