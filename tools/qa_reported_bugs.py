import os
import sys
from urllib.parse import urlparse

from playwright.sync_api import sync_playwright

sys.stdout.reconfigure(encoding="utf-8")
BASE = os.environ.get("IAM_QA_BASE", "http://127.0.0.1:3139").rstrip("/")


def visible(locator):
    return [locator.nth(index) for index in range(locator.count()) if locator.nth(index).is_visible()]


failures = []
results = {}

with sync_playwright() as playwright:
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1820, "height": 1000})

    page.goto(BASE + "/en/marketing", wait_until="networkidle")
    faq_row = page.locator(".qa-row").nth(2)
    faq_question = faq_row.locator(":scope > div").nth(1)
    faq_geometry = faq_question.evaluate(
        """element => {
          const question = element.getBoundingClientRect();
          const row = element.parentElement.getBoundingClientRect();
          return {questionTop: question.top, questionBottom: question.bottom,
                  rowTop: row.top, rowBottom: row.bottom,
                  fontSize: getComputedStyle(element).fontSize,
                  scrollWidth: element.scrollWidth, clientWidth: element.clientWidth};
        }"""
    )
    results["faq"] = faq_geometry
    if faq_geometry["questionTop"] < faq_geometry["rowTop"] or faq_geometry["questionBottom"] > faq_geometry["rowBottom"]:
        failures.append(f"marketing FAQ question escapes row: {faq_geometry}")
    if faq_geometry["scrollWidth"] > faq_geometry["clientWidth"] + 1:
        failures.append(f"marketing FAQ question overflows horizontally: {faq_geometry}")
    faq_row.screenshot(path="tools/qa-reported-marketing-faq.png")

    for label in ("Consultation", "Get a discount"):
        candidates = visible(page.get_by_text(label, exact=True))
        if not candidates:
            failures.append(f"marketing CTA not visible: {label}")
            continue
        target = candidates[-1]
        target.click(timeout=8_000)
        page.wait_for_timeout(150)
        if page.locator('[role="dialog"]:visible').count() != 1:
            failures.append(f"marketing CTA did not open form: {label}")
        else:
            page.keyboard.press("Escape")
            page.wait_for_timeout(100)

    page.goto(BASE + "/en/cases/beauty", wait_until="networkidle")
    gray_placeholders = page.locator('[data-figma-node="12339:1541"], [data-figma-node="12339:1547"], [data-figma-node="12339:1553"], [data-figma-node="12339:1559"], [data-figma-node="12339:1435"], [data-figma-node="12339:1441"], [data-figma-node="12339:1447"], [data-figma-node="12339:1453"]').count()
    connectors = page.locator('svg path[d="M12 1v16M6.5 12.5 12 18l5.5-5.5"]').count()
    results["beauty"] = {"gray_placeholders": gray_placeholders, "connectors": connectors}
    if gray_placeholders:
        failures.append(f"beauty still has {gray_placeholders} gray connector placeholders")
    if connectors < 8 or connectors % 8:
        failures.append(f"beauty connector count is {connectors}, expected responsive copies of 8")

    for viewport, size in (("desktop", {"width": 1820, "height": 1000}), ("mobile", {"width": 390, "height": 844})):
        page.set_viewport_size(size)
        for route in ("/en/marketing", "/en/smm-school", "/en/cases", "/en/cases/beauty", "/en/marketing/paid-search"):
            page.goto(BASE + route, wait_until="networkidle")
            anchors = visible(page.locator("a").filter(has_text="HOME"))
            anchors = [anchor for anchor in anchors if (anchor.inner_text() or "").strip().upper() == "HOME"]
            drawn = visible(page.locator('[data-english-home-link="true"]'))
            home_links = anchors + drawn
            if not home_links:
                failures.append(f"HOME is not an interactive link: {viewport} {route}")
                continue
            home_links[0].click(timeout=8_000)
            try:
                page.wait_for_url(lambda url: urlparse(url).path.rstrip("/") == "/en", timeout=8_000)
            except Exception:
                page.wait_for_timeout(1_000)
            if urlparse(page.url).path.rstrip("/") != "/en":
                failures.append(f"HOME leads to {page.url}: {viewport} {route}")

    browser.close()

print({"results": results, "failures": failures})
if failures:
    raise SystemExit(1)
