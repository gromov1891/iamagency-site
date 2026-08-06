import json
import os
import re
import sys
from pathlib import Path

from playwright.sync_api import sync_playwright


sys.stdout.reconfigure(encoding="utf-8")
BASE = os.environ.get("IAM_QA_BASE", "http://127.0.0.1:3142").rstrip("/")
OUTPUT = Path(__file__).parent / "qa-contacts"
OUTPUT.mkdir(exist_ok=True)

CONTACT_HREFS = {
    "https://t.me/iam_smmagency",
    "https://wa.me/message/BPS3ETU5K3HZH1",
    "tel:+79535556760",
    "mailto:iamagency.su@gmail.com",
    "https://www.instagram.com/iamagency.smm",
    "https://vk.ru/imagencysmm",
    "https://dzen.ru/iamagency",
    "https://www.youtube.com/@iamagency",
    "https://pin.it/3toibIyDY",
    "https://max.ru/u/f9LHodD0cOKbELAJKi1eVN5Rai5cGNxNIP3VB781r1iMvNZdUyuic3sD9U8",
}


def check(condition, message, failures):
    if not condition:
        failures.append(message)


def inspect_page(page, route, locale, viewport_name, failures):
    runtime_errors = []
    page.on("console", lambda msg: runtime_errors.append(f"console:{msg.text}") if msg.type == "error" else None)
    page.on("pageerror", lambda error: runtime_errors.append(f"page:{error}"))
    response = page.goto(BASE + route, wait_until="networkidle")
    check(response and response.status == 200, f"{route}: HTTP {response.status if response else 'none'}", failures)
    check(page.locator("main h1").count() == 1, f"{route}: expected exactly one H1", failures)
    check(bool(page.title().strip()), f"{route}: empty title", failures)
    description = page.locator('meta[name="description"]').get_attribute("content") or ""
    check(len(description) >= 110, f"{route}: short meta description ({len(description)})", failures)

    canonical = page.locator('link[rel="canonical"]').get_attribute("href")
    check(canonical == f"https://iamagency.su{route}", f"{route}: wrong canonical {canonical}", failures)
    alternates = {
        node.get_attribute("hreflang"): node.get_attribute("href")
        for node in page.locator('link[rel="alternate"][hreflang]').all()
    }
    check(alternates.get("ru") == "https://iamagency.su/kontakty", f"{route}: missing RU hreflang", failures)
    check(alternates.get("en") == "https://iamagency.su/en/contacts", f"{route}: missing EN hreflang", failures)
    check(alternates.get("x-default") == "https://iamagency.su/kontakty", f"{route}: missing x-default", failures)

    schema_types = []
    for node in page.locator('script[type="application/ld+json"]').all():
        try:
            data = json.loads(node.text_content())
            if isinstance(data, dict):
                if isinstance(data.get("@graph"), list):
                    schema_types.extend(item.get("@type") for item in data["@graph"] if isinstance(item, dict))
                else:
                    schema_types.append(data.get("@type"))
        except json.JSONDecodeError:
            failures.append(f"{route}: invalid JSON-LD")
    for schema_type in ("ContactPage", "BreadcrumbList", "FAQPage"):
        check(schema_type in schema_types, f"{route}: missing {schema_type} schema", failures)

    hrefs = set(page.locator("main a").evaluate_all("els => els.map(el => el.getAttribute('href'))"))
    check(CONTACT_HREFS.issubset(hrefs), f"{route}: missing contact links {sorted(CONTACT_HREFS - hrefs)}", failures)
    main_text = page.locator("main").inner_text()
    if locale == "en":
        cyrillic = sorted(set(re.findall(r"[^\n]*[А-Яа-яЁё][^\n]*", main_text)))
        check(not cyrillic, f"{route}: Cyrillic remains: {cyrillic[:5]}", failures)

    overflow = page.evaluate("document.documentElement.scrollWidth - window.innerWidth")
    check(overflow <= 2, f"{route} {viewport_name}: horizontal overflow {overflow}px", failures)
    check(not runtime_errors, f"{route}: runtime errors {runtime_errors}", failures)
    page.screenshot(path=str(OUTPUT / f"{locale}-{viewport_name}-hero.png"), full_page=False)


with sync_playwright() as playwright:
    browser = playwright.chromium.launch(headless=True)
    failures = []

    for viewport_name, viewport in {
        "desktop": {"width": 1440, "height": 1000},
        "mobile": {"width": 390, "height": 844},
    }.items():
        for route, locale in (("/kontakty", "ru"), ("/en/contacts", "en")):
            page = browser.new_page(viewport=viewport, device_scale_factor=1)
            inspect_page(page, route, locale, viewport_name, failures)
            page.close()

    # Header routing from the generated RU/EN homepages.
    page = browser.new_page(viewport={"width": 1440, "height": 900})
    page.goto(BASE + "/", wait_until="networkidle")
    ru_home_contact = page.locator('[layer-name="Контакты"] a').first.get_attribute("href")
    check(ru_home_contact == "/kontakty", f"RU homepage contact points to {ru_home_contact}", failures)
    page.goto(BASE + "/en", wait_until="networkidle")
    en_home_contact = page.locator('[layer-name="Контакты"] a').first.get_attribute("href")
    check(en_home_contact == "/en/contacts", f"EN homepage contact points to {en_home_contact}", failures)

    # Sitemap must expose both canonical language versions.
    sitemap_response = page.request.get(BASE + "/sitemap.xml")
    sitemap_text = sitemap_response.text()
    check(sitemap_response.status == 200, "sitemap.xml is not available", failures)
    check("https://iamagency.su/kontakty" in sitemap_text, "RU contacts missing from sitemap", failures)
    check("https://iamagency.su/en/contacts" in sitemap_text, "EN contacts missing from sitemap", failures)

    # Play one complete round and verify promo + lead handoff.
    context = browser.new_context(viewport={"width": 390, "height": 844}, permissions=["clipboard-read", "clipboard-write"])
    game_page = context.new_page()
    game_errors = []
    game_page.on("console", lambda msg: game_errors.append(msg.text) if msg.type == "error" else None)
    game_page.on("pageerror", lambda error: game_errors.append(str(error)))
    game_page.goto(BASE + "/en/contacts", wait_until="networkidle")
    game_page.locator('[data-game-status="idle"] button', has_text="START").click()
    check(game_page.locator('[data-game-status="running"]').count() == 1, "game did not start", failures)
    game_page.locator("canvas").scroll_into_view_if_needed()
    game_page.screenshot(path=str(OUTPUT / "en-mobile-game-running.png"), full_page=False)
    game_page.evaluate("""
        window.__iamQaJumpTimer = window.setInterval(() => {
          document.querySelector('canvas')?.dispatchEvent(
            new KeyboardEvent('keydown', { key: ' ', bubbles: true })
          );
        }, 650);
    """)
    game_page.wait_for_timeout(28000)
    game_page.evaluate("window.clearInterval(window.__iamQaJumpTimer)")
    game_page.wait_for_timeout(5000)
    game_page.locator('[data-game-status="finished"]').wait_for(timeout=5000)
    promo = game_page.locator(".gameResult code, code").filter(has_text="IAM-LIKE-").first.text_content()
    check(bool(promo and re.fullmatch(r"IAM-LIKE-(5|7|10)", promo)), f"invalid promo code {promo}", failures)
    game_page.get_by_role("button", name="COPY", exact=True).click()
    clipboard = game_page.evaluate("navigator.clipboard.readText()")
    check(clipboard == promo, f"clipboard mismatch: {clipboard} != {promo}", failures)
    game_page.get_by_role("button", name="CLAIM DISCOUNT", exact=True).click()
    check(game_page.get_by_role("dialog").is_visible(), "claim discount did not open lead dialog", failures)
    game_page.screenshot(path=str(OUTPUT / "en-mobile-game-result.png"), full_page=False)
    check(not game_errors, f"game runtime errors {game_errors}", failures)
    context.close()
    browser.close()

print(json.dumps({"base": BASE, "failures": failures, "status": "passed" if not failures else "failed"}, ensure_ascii=False, indent=2))
if failures:
    raise SystemExit(1)
