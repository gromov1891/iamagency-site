import os
import sys
from urllib.parse import urljoin, urlparse

from playwright.sync_api import sync_playwright

sys.stdout.reconfigure(encoding="utf-8")
BASE = os.environ.get("IAM_QA_BASE", "http://127.0.0.1:3134").rstrip("/")

ROUTES = [
    "/en", "/en/cases", "/en/cases/beauty", "/en/cases/fashion", "/en/cases/sports-education",
    "/en/cases/personal-brands", "/en/cases/real-estate", "/en/cases/travel-hospitality",
    "/en/cases/automotive", "/en/cases/horeca", "/en/cases/ecommerce", "/en/cases/events",
    "/en/marketing", "/en/marketing/paid-search", "/en/marketing/seo-services",
    "/en/marketing/paid-social", "/en/marketing/telegram-advertising", "/en/marketing/cpa-marketing",
    "/en/marketing/marketing-analytics", "/en/marketing/influencer-marketing",
    "/en/marketing/online-reputation-management", "/en/marketing/pr-services",
    "/en/marketing/programmatic-advertising", "/en/marketing/app-marketing",
    "/en/marketing/youtube-marketing", "/en/marketing/creative-campaigns",
    "/en/marketing/marketing-technology", "/en/marketing/experiential-marketing",
    "/en/marketing/web-development", "/en/smm-school", "/en/blog",
    "/en/blog/claude-for-business-explained", "/en/blog/what-drives-sales-in-2026",
    "/en/blog/instagram-growth-rules-have-changed", "/en/blog/tools-for-social-media-visuals",
    "/en/services/brand-social-strategy", "/en/services/social-media-management",
    "/en/services/social-media-marketing", "/en/services/content-production",
    "/en/packages/momentum", "/en/packages/breakthrough", "/en/packages/triumph",
    "/en/privacy-policy", "/en/personal-data-consent", "/en/sitemap",
]

KEY_ROUTES = [
    "/en", "/en/cases", "/en/marketing", "/en/smm-school",
    "/en/services/brand-social-strategy", "/en/services/social-media-management",
    "/en/services/social-media-marketing", "/en/services/content-production",
    "/en/packages/momentum", "/en/packages/breakthrough", "/en/packages/triumph",
]

CTA_WORDS = ("project", "consultation", "apply", "course", "discount", "enquiry", "start", "contact")


def internal_path(href: str):
    absolute = urljoin(BASE + "/", href)
    parsed = urlparse(absolute)
    if parsed.netloc != urlparse(BASE).netloc:
        return None
    return parsed.path or "/"


failures = []
checked_links = set()
interaction_count = 0

with sync_playwright() as playwright:
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1440, "height": 900})

    for route in ROUTES:
        response = page.goto(BASE + route, wait_until="networkidle", timeout=60_000)
        if not response or response.status >= 400:
            failures.append(f"page {route}: {response.status if response else 'no response'}")
            continue
        hrefs = page.locator("a[href]").evaluate_all("els => [...new Set(els.map(e => e.getAttribute('href')).filter(Boolean))]")
        for href in hrefs:
            path = internal_path(href)
            if not path or path in checked_links or path.startswith("/api/"):
                continue
            checked_links.add(path)
            result = page.request.get(BASE + path, timeout=30_000, fail_on_status_code=False)
            if result.status >= 400:
                failures.append(f"link {route} -> {path}: {result.status}")

    for viewport, size in (("desktop", {"width": 1440, "height": 900}), ("mobile", {"width": 390, "height": 844})):
        page.set_viewport_size(size)
        for route in KEY_ROUTES:
            page.goto(BASE + route, wait_until="networkidle", timeout=60_000)
            buttons = page.get_by_role("button")
            specs = []
            for index in range(buttons.count()):
                button = buttons.nth(index)
                if not button.is_visible():
                    continue
                name = (button.get_attribute("aria-label") or button.inner_text() or "").strip().replace("\n", " ")
                expanded = button.get_attribute("aria-expanded")
                if expanded is not None or any(word in name.lower() for word in CTA_WORDS) or "menu" in name.lower():
                    specs.append((index, name, expanded))

            for index, name, expanded in specs[:24]:
                page.goto(BASE + route, wait_until="networkidle", timeout=60_000)
                button = page.get_by_role("button").nth(index)
                if not button.is_visible():
                    continue
                before_url = page.url
                before_expanded = button.get_attribute("aria-expanded")
                before_dialogs = page.locator('[role="dialog"]:visible').count()
                try:
                    button.click(timeout=8_000)
                    page.wait_for_timeout(250)
                    after_expanded = button.get_attribute("aria-expanded") if button.count() else None
                    after_dialogs = page.locator('[role="dialog"]:visible').count()
                    changed = page.url != before_url or after_expanded != before_expanded or after_dialogs > before_dialogs
                    if not changed and any(word in name.lower() for word in CTA_WORDS):
                        changed = page.locator("input:visible, textarea:visible, form:visible").count() > 0
                    if not changed:
                        failures.append(f"button {viewport} {route}: no observable action: {name[:80]}")
                    interaction_count += 1
                except Exception as error:
                    failures.append(f"button {viewport} {route}: {name[:80]}: {type(error).__name__}")

    browser.close()

print({"pages": len(ROUTES), "internal_links": len(checked_links), "interactions": interaction_count, "failures": failures})
if failures:
    raise SystemExit(1)
