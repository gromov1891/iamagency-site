from pathlib import Path
from playwright.sync_api import sync_playwright


BASE_URL = "http://127.0.0.1:3107/en"
OUTPUT_DIR = Path(__file__).resolve().parent


def inspect_page(page, viewport, screenshot_name):
    errors = []
    page.on("console", lambda message: errors.append(f"console:{message.type}:{message.text}") if message.type == "error" else None)
    page.on("pageerror", lambda error: errors.append(f"pageerror:{error}"))
    response = page.goto(BASE_URL, wait_until="networkidle")
    page.screenshot(path=str(OUTPUT_DIR / screenshot_name), full_page=True)
    if viewport == "390x844":
        page.get_by_role("button", name="Open menu").click()
        page.locator("nav a[href='/']").wait_for(state="visible")

    language_switch = page.locator("nav a[href='/']") if viewport == "390x844" else page.get_by_role("link", name="RU")

    return {
        "viewport": viewport,
        "status": response.status if response else None,
        "title": page.title(),
        "robots": page.locator('meta[name="robots"]').get_attribute("content"),
        "canonical": page.locator('link[rel="canonical"]').get_attribute("href"),
        "html_lang": page.locator("html").get_attribute("lang"),
        "main_lang": page.locator("main").get_attribute("lang"),
        "h1_count": page.locator("h1").count(),
        "h1": page.locator("h1").inner_text(),
        "ru_switch_href": language_switch.first.get_attribute("href"),
        "horizontal_overflow": page.evaluate("document.documentElement.scrollWidth > document.documentElement.clientWidth"),
        "errors": errors,
    }


with sync_playwright() as playwright:
    browser = playwright.chromium.launch(headless=True)
    desktop = browser.new_page(viewport={"width": 1440, "height": 1000}, device_scale_factor=1)
    mobile = browser.new_page(viewport={"width": 390, "height": 844}, device_scale_factor=1)
    results = [
        inspect_page(desktop, "1440x1000", "en-preview-desktop.png"),
        inspect_page(mobile, "390x844", "en-preview-mobile.png"),
    ]
    russian = browser.new_page(viewport={"width": 1280, "height": 800})
    russian_response = russian.goto("http://127.0.0.1:3107/", wait_until="networkidle")
    russian_result = {
        "status": russian_response.status if russian_response else None,
        "html_lang": russian.locator("html").get_attribute("lang"),
    }
    browser.close()

for result in results:
    print(result)
print({"russian_home": russian_result})

assert all(result["status"] == 200 for result in results)
assert all(result["robots"] and "noindex" in result["robots"] for result in results)
assert all(result["canonical"] == "https://iamagency.su/en" for result in results)
assert all(result["html_lang"] == "en" for result in results)
assert all(result["main_lang"] == "en" for result in results)
assert all(result["h1_count"] == 1 for result in results)
assert all(result["ru_switch_href"] == "/" for result in results)
assert all(not result["horizontal_overflow"] for result in results)
assert all(not result["errors"] for result in results)
assert russian_result == {"status": 200, "html_lang": "ru"}
