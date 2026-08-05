import json
import os
import sys
from pathlib import Path
from playwright.sync_api import sync_playwright

sys.stdout.reconfigure(encoding="utf-8")

BASE = os.environ.get("IAM_QA_BASE", "http://127.0.0.1:3123").rstrip("/")
OUT = Path(__file__).resolve().parent / "qa-all-english.json"

PAIRS = [
    ("/", "/en"), ("/keisy", "/en/cases"),
    ("/case/beauty", "/en/cases/beauty"), ("/case/fashion", "/en/cases/fashion"),
    ("/case/sport", "/en/cases/sports-education"), ("/case/experts", "/en/cases/personal-brands"),
    ("/case/real-estate", "/en/cases/real-estate"), ("/case/tourism", "/en/cases/travel-hospitality"),
    ("/case/cars", "/en/cases/automotive"), ("/case/horeca", "/en/cases/horeca"),
    ("/case/product", "/en/cases/ecommerce"), ("/case/events", "/en/cases/events"),
    ("/marketing", "/en/marketing"),
    ("/marketing/kontekstnaya-reklama", "/en/marketing/paid-search"),
    ("/marketing/seo-prodvizhenie", "/en/marketing/seo-services"),
    ("/marketing/target-reklama", "/en/marketing/paid-social"),
    ("/marketing/reklama-v-telegram", "/en/marketing/telegram-advertising"),
    ("/marketing/cpa-marketing", "/en/marketing/cpa-marketing"),
    ("/marketing/skvoznaya-analitika", "/en/marketing/marketing-analytics"),
    ("/marketing/influence-marketing", "/en/marketing/influencer-marketing"),
    ("/marketing/orm-upravlenie-reputaciey", "/en/marketing/online-reputation-management"),
    ("/marketing/pr-prodvizhenie", "/en/marketing/pr-services"),
    ("/marketing/programmatic-reklama", "/en/marketing/programmatic-advertising"),
    ("/marketing/mobilnaya-reklama", "/en/marketing/app-marketing"),
    ("/marketing/prodvizhenie-youtube", "/en/marketing/youtube-marketing"),
    ("/marketing/specproekty", "/en/marketing/creative-campaigns"),
    ("/marketing/it-produkty", "/en/marketing/marketing-technology"),
    ("/marketing/offline-prodvizhenie", "/en/marketing/experiential-marketing"),
    ("/marketing/razrabotka-saytov", "/en/marketing/web-development"),
    ("/shkola-smm", "/en/smm-school"),
    ("/blog", "/en/blog"),
    ("/blog/claude-dlya-biznesa-prostym-yazykom", "/en/blog/claude-for-business-explained"),
    ("/blog/chto-vliyaet-na-prodazhi-v-2026", "/en/blog/what-drives-sales-in-2026"),
    ("/blog/instagram-po-starim-pravilam", "/en/blog/instagram-growth-rules-have-changed"),
    ("/blog/servisy-dlya-sozdaniya-vizuala", "/en/blog/tools-for-social-media-visuals"),
    ("/uslugi/brendbuk-i-smm-strategiya", "/en/services/brand-social-strategy"),
    ("/uslugi/vedenie-sotssetey", "/en/services/social-media-management"),
    ("/uslugi/marketing-i-prodvizhenie", "/en/services/social-media-marketing"),
    ("/uslugi/kontent-syomki", "/en/services/content-production"),
    ("/tarify/dvizhenie", "/en/packages/momentum"),
    ("/tarify/proryv", "/en/packages/breakthrough"),
    ("/tarify/triumf", "/en/packages/triumph"),
    ("/privacy-policy", "/en/privacy-policy"),
    ("/privacy-consent", "/en/personal-data-consent"),
    ("/sitemap", "/en/sitemap"),
]

route_filter = os.environ.get("IAM_QA_FILTER", "")
if route_filter:
    PAIRS = [pair for pair in PAIRS if route_filter in pair[1]]

VIEWPORTS = {"desktop": (1440, 900), "mobile": (390, 844)}
viewport_filter = os.environ.get("IAM_QA_VIEWPORT", "")
if viewport_filter:
    VIEWPORTS = {name: value for name, value in VIEWPORTS.items() if name == viewport_filter}


def inspect(page, path):
    errors = []
    page.on("pageerror", lambda error: errors.append(str(error)))
    response = page.goto(BASE + path, wait_until="networkidle", timeout=60000)
    data = page.evaluate(r"""
      () => {
        const visible = el => {
          const s = getComputedStyle(el), r = el.getBoundingClientRect();
          return s.display !== 'none' && s.visibility !== 'hidden' && r.width > 0 && r.height > 0;
        };
        const text = document.body.innerText || '';
        const cyrillic = [...new Set(text.split(/\n+/).map(x => x.trim()).filter(x => /[А-Яа-яЁё]/.test(x)))].slice(0, 20);
        const wrongLinks = [...document.querySelectorAll('a[href^="/"]')].filter(visible).map(a => ({
          href: a.getAttribute('href'), text: (a.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 80),
          hreflang: a.getAttribute('hreflang')
        })).filter(x => x.href && !x.href.startsWith('/en') && !x.href.startsWith('/#') && x.hreflang !== 'ru');
        const brokenImages = [...document.images].filter(img => visible(img) && (!img.complete || img.naturalWidth === 0)).map(img => img.currentSrc || img.src).slice(0, 20);
        const clippedText = [...document.querySelectorAll('span,p,h1,h2,h3,h4,a,button')].filter(el => {
          if (!visible(el) || !(el.textContent || '').trim()) return false;
          const p = el.parentElement;
          if (!p) return false;
          const ps = getComputedStyle(p), er = el.getBoundingClientRect(), pr = p.getBoundingClientRect();
          const clips = ['hidden','clip'].includes(ps.overflowX) || ['hidden','clip'].includes(ps.overflowY);
          return clips && (er.right > pr.right + 3 || er.bottom > pr.bottom + 3 || er.left < pr.left - 3 || er.top < pr.top - 3);
        }).slice(0, 20).map(el => ({text:(el.textContent || '').replace(/\s+/g,' ').trim().slice(0,100), tag:el.tagName}));
        const buttons = [...document.querySelectorAll('button,[role="button"],[role="link"]')].filter(visible).map(el => ({
          text:(el.getAttribute('aria-label') || el.textContent || '').replace(/\s+/g,' ').trim().slice(0,100),
          tag:el.tagName, disabled:el.matches(':disabled'), cursor:getComputedStyle(el).cursor
        }));
        return {
          title: document.title,
          lang: document.documentElement.lang,
          height: document.documentElement.scrollHeight,
          overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
          cyrillic, wrongLinks, brokenImages, clippedText, buttons,
          imageSources: [...new Set([...document.images].filter(visible).map(img => new URL(img.currentSrc || img.src, location.href).pathname))]
        };
      }
    """)
    data.update({"path": path, "status": response.status if response else 0, "errors": errors})
    return data


results = []
with sync_playwright() as playwright:
    browser = playwright.chromium.launch(headless=True)
    for viewport, (width, height) in VIEWPORTS.items():
        page = browser.new_page(viewport={"width": width, "height": height})
        for ru, en in PAIRS:
            ru_data = inspect(page, ru)
            en_data = inspect(page, en)
            ru_images, en_images = set(ru_data["imageSources"]), set(en_data["imageSources"])
            comparable = {
                "heightRatio": round(en_data["height"] / max(ru_data["height"], 1), 3),
                "sharedImages": len(ru_images & en_images),
                "ruImages": len(ru_images), "enImages": len(en_images),
            }
            row = {"viewport": viewport, "ru": ru_data, "en": en_data, "parity": comparable}
            results.append(row)
            issues = bool(en_data["cyrillic"] or en_data["overflow"] or en_data["errors"] or en_data["brokenImages"] or en_data["clippedText"] or not 200 <= en_data["status"] < 400 or comparable["heightRatio"] < .72 or comparable["heightRatio"] > 1.38)
            print(json.dumps({"viewport": viewport, "route": en, "issues": issues, "status": en_data["status"], "cyrillic": en_data["cyrillic"][:3], "overflow": en_data["overflow"], "clipped": en_data["clippedText"][:2], **comparable}, ensure_ascii=False))
        page.close()
    browser.close()

OUT.write_text(json.dumps(results, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"report={OUT}")
