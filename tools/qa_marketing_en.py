from pathlib import Path
import os
import sys

from playwright.sync_api import sync_playwright

sys.stdout.reconfigure(encoding="utf-8")

BASE = os.environ.get("QA_BASE", "http://127.0.0.1:3100").rstrip("/")
SLUGS = [
    "paid-search", "seo-services", "paid-social", "telegram-advertising",
    "cpa-marketing", "marketing-analytics", "influencer-marketing",
    "online-reputation-management", "pr-services", "programmatic-advertising",
    "app-marketing", "youtube-marketing", "creative-campaigns",
    "marketing-technology", "experiential-marketing", "web-development",
]


def cyrillic_count(text: str) -> int:
    return sum("\u0400" <= char <= "\u04ff" for char in text)


with sync_playwright() as playwright:
    browser = playwright.chromium.launch(headless=True)
    failures = []

    for name, viewport in {
        "desktop": {"width": 1440, "height": 1000},
        "mobile": {"width": 390, "height": 844},
    }.items():
        page = browser.new_page(viewport=viewport)
        runtime_errors = []
        page.on("pageerror", lambda error: runtime_errors.append(str(error)))
        response = page.goto(f"{BASE}/en/marketing", wait_until="domcontentloaded", timeout=60_000)
        page.wait_for_timeout(1_000)
        text = page.locator("body").inner_text()
        links = page.locator('a[href^="/en/marketing/"]')
        hrefs = links.evaluate_all("els => els.map(el => el.getAttribute('href'))")
        missing = [f"/en/marketing/{slug}" for slug in SLUGS if f"/en/marketing/{slug}" not in hrefs]
        overflow = page.evaluate("document.documentElement.scrollWidth > document.documentElement.clientWidth + 2")
        page.screenshot(path=str(Path("tools") / f"qa-marketing-{name}.png"), full_page=True)

        if not response or response.status != 200:
            failures.append(f"{name}: hub returned {response.status if response else 'no response'}")
        if cyrillic_count(text):
            failures.append(f"{name}: hub contains Cyrillic")
        if missing:
            failures.append(f"{name}: missing links {missing}")
        if overflow:
            failures.append(f"{name}: horizontal page overflow")
        if runtime_errors:
            failures.append(f"{name}: runtime errors {runtime_errors}")

        print({
            "view": name,
            "status": response.status if response else 0,
            "marketing_links": len(set(hrefs)),
            "cyrillic": cyrillic_count(text),
            "horizontal_overflow": overflow,
            "runtime_errors": runtime_errors,
        })
        page.close()

    page = browser.new_page(viewport={"width": 1280, "height": 900})
    for slug in SLUGS:
        response = page.goto(f"{BASE}/en/marketing/{slug}", wait_until="domcontentloaded", timeout=60_000)
        page.wait_for_timeout(300)
        text = page.locator("body").inner_text()
        status = response.status if response else 0
        has_back_link = page.locator('a[href="/en/marketing"]').count() > 0
        has_contact = page.locator('a[href^="mailto:"]').count() > 0
        if status != 200 or cyrillic_count(text) or not has_back_link or not has_contact:
            failures.append(
                f"{slug}: status={status}, Cyrillic={cyrillic_count(text)}, "
                f"back={has_back_link}, contact={has_contact}"
            )
    page.close()
    browser.close()

if failures:
    print("FAIL")
    for failure in failures:
        print(f"- {failure}")
    raise SystemExit(1)

print(f"PASS: hub and all {len(SLUGS)} marketing pages")
