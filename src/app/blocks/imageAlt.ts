const CASE_LABELS: Record<string, string> = {
  beauty: "бьюти-бизнеса",
  fashion: "брендов одежды и аксессуаров",
  sport: "спорта и образования",
  experts: "экспертов и личных брендов",
  realestate: "недвижимости",
  tourism: "туризма и путешествий",
  cars: "автомобильного бизнеса и техники",
  horeca: "ресторанов, кафе и HoReCa",
  product: "товарных брендов",
  events: "мероприятий и event-проектов",
};

const BLOG_ALTS: Record<string, string> = {
  "96fe8ff810d3.webp": "Обложка статьи «Claude для бизнеса простым языком» в блоге I AM AGENCY",
  "0b713db08b53.webp": "Обложка статьи «Что реально влияет на продажи в 2026» в блоге I AM AGENCY",
  "e7fa50c7bae4.webp": "Обложка статьи об изменениях Instagram и продвижении бизнеса в социальных сетях",
  "f41a088987f8.webp": "Обложка статьи «4 сервиса для создания визуала» в блоге I AM AGENCY",
};

const AVATAR_ALTS: Record<string, string> = {
  "avatar-maxim-tablet.png": "Максим, клиент SMM-агентства I AM AGENCY",
  "avatar-yulia-tablet.png": "Юлия, клиент SMM-агентства I AM AGENCY",
  "avatar-anton-tablet.png": "Антон, клиент SMM-агентства I AM AGENCY",
  "avatar-anastasia-tablet.png": "Анастасия, клиент SMM-агентства I AM AGENCY",
  "avatar-natalia-tablet.png": "Наталия, клиент SMM-агентства I AM AGENCY",
  "avatar-elena-georgiy-tablet.png": "Елена и Георгий, клиенты SMM-агентства I AM AGENCY",
};

const STATIC_ALTS: Record<string, string> = {
  "/partners/logos.png": "Клиенты I AM AGENCY: Сбер, ВТБ, MANUL, Villo, ESKQ Bar, ROOF и Dr. Reddy's",
  "/blk/tarify/dvizhenie-panel.svg": "Тариф «Движение» на ведение социальных сетей",
  "/blk/tarify/proryv-panel.svg": "Тариф «Прорыв» на ведение и продвижение социальных сетей",
  "/blk/tarify/triumf-panel.svg": "Тариф «Триумф»: маркетинговая команда под ключ",
  "/blk/kontakty/wm_agency.png": "Логотип SMM-агентства I AM AGENCY",
  "/blk/figma-mobile/mobile-contact-logo.svg": "Логотип SMM-агентства I AM AGENCY",
  "/blk/sozdanie/uppercuts-logo.png": "Логотип сайта Uppercuts Academy, разработанного I AM AGENCY",
  "/blk/sozdanie/private-travel-logo.svg": "Логотип сайта Private Travel Club, разработанного I AM AGENCY",
};

const escapeAttribute = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function resolveAlt(src: string, currentAlt: string): string | null {
  const cleanSrc = src.split("?")[0];
  const file = cleanSrc.split("/").pop() || "";

  const caseMatch = cleanSrc.match(/\/blk\/keisy\/(beauty|fashion|sport|experts|realestate|tourism|cars|horeca|product|events)(?:-|\.)/i);
  if (caseMatch && (/^кейс I AM AGENCY\s*-/i.test(currentAlt) || !currentAlt)) {
    const category = caseMatch[1].toLowerCase();
    const number = file.match(/-(\d{1,3})(?:-|\.)/)?.[1];
    const suffix = number ? `, пример ${Number(number)}` : "";
    return `SMM-кейс I AM AGENCY для ${CASE_LABELS[category]}: визуальная концепция и контент${suffix}`;
  }

  if (BLOG_ALTS[file]) return BLOG_ALTS[file];
  if (AVATAR_ALTS[file]) return AVATAR_ALTS[file];
  if (STATIC_ALTS[cleanSrc]) return STATIC_ALTS[cleanSrc];

  return null;
}

export function enrichImageAlts(html: string): string {
  return html.replace(/<img\b[^>]*>/gi, (tag) => {
    const src = tag.match(/\bsrc=["']([^"']*)["']/i)?.[1];
    if (!src) return tag;

    const altMatch = tag.match(/\balt=["']([^"']*)["']/i);
    const nextAlt = resolveAlt(src, altMatch?.[1] || "");
    if (nextAlt === null) return tag;

    const encoded = escapeAttribute(nextAlt);
    if (altMatch) return tag.replace(/\balt=["'][^"']*["']/i, `alt="${encoded}"`);
    if (/\s*\/>$/.test(tag)) return tag.replace(/\s*\/>$/, ` alt="${encoded}" />`);
    return tag.replace(/>$/, ` alt="${encoded}">`);
  });
}
