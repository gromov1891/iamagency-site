import os
import re
from pathlib import Path
from urllib.parse import urlparse

from playwright.sync_api import TimeoutError as PlaywrightTimeoutError
from playwright.sync_api import sync_playwright


ROOT = Path(__file__).resolve().parents[1]
BASE_URL = os.environ.get("SITE_BASE_URL", "http://127.0.0.1:3107").rstrip("/")
PRODUCTION = "https://iamagency.su"


def mapped_routes():
    source = (ROOT / "src/lib/i18n/routes.ts").read_text(encoding="utf-8")
    return re.findall(r'ru: "([^"]+)", en: "([^"]+)"', source)


def check_page(page, path: str, locale: str, counterpart: str | None = None):
    errors = []
    page.route(
        "**/*",
        lambda route: route.abort()
        if route.request.resource_type in {"image", "media", "font"}
        else route.continue_(),
    )
    page.on("console", lambda message: errors.append(f"console:{message.type}:{message.text}") if message.type == "error" else None)
    page.on("pageerror", lambda error: errors.append(f"pageerror:{error}"))
    response = None
    for attempt in range(2):
        try:
            response = page.goto(f"{BASE_URL}{path}", wait_until="domcontentloaded", timeout=60_000)
            break
        except PlaywrightTimeoutError:
            if attempt == 1:
                raise
    canonical = page.locator('link[rel="canonical"]').get_attribute("href")
    result = {
        "path": path,
        "status": response.status if response else None,
        "lang": page.locator("html").get_attribute("lang"),
        "canonical": canonical,
        "title": page.title(),
        "description": page.locator('meta[name="description"]').get_attribute("content") or "",
        "h1": page.locator("h1").count(),
        "robots": page.locator('meta[name="robots"]').get_attribute("content") or "",
        "overflow": page.evaluate("document.documentElement.scrollWidth > document.documentElement.clientWidth"),
        "errors": errors,
    }
    assert result["status"] == 200, result
    assert result["lang"] == locale, result
    expected_canonical = PRODUCTION if path == "/" else f"{PRODUCTION}{path}"
    assert result["canonical"] == expected_canonical, result
    assert result["h1"] == 1, result
    assert not result["overflow"], result
    assert "noindex" not in result["robots"], result
    if counterpart:
        expected_alternates = {
            "ru": next(ru for ru, en in mapped_routes() if path in (ru, en)),
            "en": next(en for ru, en in mapped_routes() if path in (ru, en)),
        }
        for hreflang, alternate_path in expected_alternates.items():
            href = page.locator(f'link[rel="alternate"][hreflang="{hreflang}"]').get_attribute("href")
            expected_href = PRODUCTION if alternate_path == "/" else f"{PRODUCTION}{alternate_path}"
            assert href == expected_href, (result, hreflang, href)
        x_default = page.locator('link[rel="alternate"][hreflang="x-default"]').get_attribute("href")
        expected_default = PRODUCTION if expected_alternates["ru"] == "/" else f'{PRODUCTION}{expected_alternates["ru"]}'
        assert x_default == expected_default, (result, "x-default", x_default)
        switch = page.locator(f'a[href="{counterpart}"][hreflang]')
        assert switch.count() >= 1, (result, "missing language switch", counterpart)
        assert switch.evaluate_all("elements => elements.some(element => element.offsetWidth || element.offsetHeight)"), (
            result,
            "language switch is not visible",
            counterpart,
        )
    if locale == "en":
        assert len(result["title"]) >= 20, result
        assert len(result["description"]) >= 50, result
        visible_text = page.locator("body").inner_text()
        assert not re.search(r"[А-Яа-яЁё]", visible_text), (result, "Cyrillic text found")
        assert page.locator("img:not([alt])").count() == 0, result
    if locale == "en":
        assert not result["errors"], result
    else:
        unexpected_errors = [error for error in result["errors"] if "React error #418" not in error]
        assert not unexpected_errors, result
    return result


with sync_playwright() as playwright:
    browser = playwright.chromium.launch(headless=True)
    results = []
    for ru_path, en_path in mapped_routes():
        for path, locale, counterpart in [(ru_path, "ru", en_path), (en_path, "en", ru_path)]:
            crawl = browser.new_page(viewport={"width": 1280, "height": 900})
            results.append(check_page(crawl, path, locale, counterpart))
            crawl.close()

    for extra_path in ["/en/services", "/en/packages"]:
        crawl = browser.new_page(viewport={"width": 1280, "height": 900})
        results.append(check_page(crawl, extra_path, "en"))
        crawl.close()

    english_results = [result for result in results if result["lang"] == "en"]
    assert len({result["canonical"] for result in english_results}) == len(english_results)
    assert len({result["title"] for result in english_results}) == len(english_results)
    assert len({result["description"] for result in english_results}) == len(english_results)

    request_context = playwright.request.new_context()
    sitemap_response = request_context.get(f"{BASE_URL}/sitemap.xml")
    sitemap_text = sitemap_response.text()
    assert sitemap_response.status == 200
    assert sitemap_text.count("<loc>") == 92, sitemap_text.count("<loc>")
    assert f"<loc>{PRODUCTION}/en</loc>" in sitemap_text
    assert 'hreflang="en"' in sitemap_text and 'hreflang="ru"' in sitemap_text
    request_context.dispose()

    screenshot_routes = [
        ("/en/services", "en-services-desktop.png", {"width": 1440, "height": 1000}),
        ("/en/services/social-media-management", "en-service-mobile.png", {"width": 390, "height": 844}),
        ("/en/cases", "en-cases-desktop.png", {"width": 1440, "height": 1000}),
        ("/en/blog", "en-blog-mobile.png", {"width": 390, "height": 844}),
        ("/", "ru-home-language-desktop.png", {"width": 1900, "height": 500}),
    ]
    for path, filename, viewport in screenshot_routes:
        visual = browser.new_page(viewport=viewport)
        visual.goto(f"{BASE_URL}{path}", wait_until="networkidle")
        visual.screenshot(path=str(ROOT / "tools" / filename), full_page=True)
        visual.close()

    form = browser.new_page(viewport={"width": 1280, "height": 900})
    form.route("**/api/leads", lambda route: route.fulfill(status=200, content_type="application/json", body='{"ok":true}'))
    form.goto(f"{BASE_URL}/en/services/social-media-management", wait_until="networkidle")
    form.get_by_role("link", name=re.compile("Discuss your project", re.I)).click()
    form.get_by_label("Name").fill("Codex QA")
    form.get_by_label("Email").fill("test-noreply@example.com")
    form.get_by_label("How can we help?").fill("Integration test for the English enquiry flow.")
    form.get_by_label(re.compile("processing of my personal data", re.I)).check()
    form.get_by_role("button", name="Send enquiry").click()
    form.get_by_text("Thank you!").wait_for()
    browser.close()

print(f"Checked {len(results)} localized page responses and the English form flow.")
print("Screenshots:", ", ".join(filename for _, filename, _ in screenshot_routes))
