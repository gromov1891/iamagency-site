import json
import re
import sys
from pathlib import Path

from playwright.sync_api import sync_playwright


SLUGS = [
    "beauty",
    "fashion",
    "sports-education",
    "personal-brands",
    "real-estate",
    "travel-hospitality",
    "automotive",
    "horeca",
    "ecommerce",
    "events",
]

OUTPUT = Path(__file__).parent / "qa-cases"
OUTPUT.mkdir(exist_ok=True)

results = []
include_copy = "--copy" in sys.argv
with sync_playwright() as playwright:
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1440, "height": 1000}, device_scale_factor=1)
    console_errors = []
    failed_responses = []
    page.on("console", lambda message: console_errors.append(message.text) if message.type == "error" else None)
    page.on("response", lambda response: failed_responses.append({"status": response.status, "url": response.url}) if response.status >= 400 else None)

    for path in ["/en/cases", *[f"/en/cases/{slug}" for slug in SLUGS]]:
        response = page.goto(f"http://127.0.0.1:3000{path}", wait_until="networkidle")
        body_text = page.locator("body").inner_text()
        desktop_canvas = page.locator('div[class*="desktopCanvas"]')
        canvas_text = desktop_canvas.inner_text() if desktop_canvas.count() else ""
        cyrillic = sorted(set(re.findall(r"[^\n]*[А-Яа-яЁё][^\n]*", body_text)))
        placeholder_runs = re.findall(r"I AM AGENCY(?:\s+I AM AGENCY)+", body_text, flags=re.I)
        item = {
            "path": path,
            "status": response.status if response else None,
            "title": page.title(),
            "cyrillic": cyrillic,
            "placeholder_runs": placeholder_runs,
        }
        if include_copy:
            item["canvas_text"] = canvas_text
        results.append(item)
        if path in ("/en/cases", "/en/cases/beauty", "/en/cases/real-estate"):
            filename = path.strip("/").replace("/", "-") or "home"
            page.screenshot(path=str(OUTPUT / f"{filename}.png"), full_page=True)

    browser.close()

report = {"pages": results, "console_errors": console_errors, "failed_responses": failed_responses}
print(json.dumps(report, ensure_ascii=False, indent=2))

if any(item["status"] != 200 or item["cyrillic"] or item["placeholder_runs"] for item in results):
    raise SystemExit(1)
