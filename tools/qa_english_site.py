from pathlib import Path
import os
import sys
from playwright.sync_api import sync_playwright

sys.stdout.reconfigure(encoding="utf-8")

BASE = os.environ.get("IAM_QA_BASE", "http://127.0.0.1:3107").rstrip("/")
ROUTES = [
    "/en", "/en/cases", "/en/cases/beauty", "/en/marketing",
    "/en/marketing/paid-search", "/en/smm-school", "/en/blog",
    "/en/services/brand-social-strategy", "/en/packages/breakthrough",
]
VIEWPORTS = {"desktop": {"width": 1440, "height": 900}, "mobile": {"width": 390, "height": 844}}

with sync_playwright() as playwright:
    browser = playwright.chromium.launch(headless=True)
    for viewport_name, viewport in VIEWPORTS.items():
        page = browser.new_page(viewport=viewport)
        errors = []
        page.on("console", lambda message: errors.append(f"console:{message.type}:{message.text}") if message.type == "error" else None)
        page.on("pageerror", lambda error: errors.append(f"page:{error}"))
        for route in ROUTES:
            errors.clear()
            response = page.goto(BASE + route, wait_until="networkidle")
            status = response.status if response else 0
            visible_text = page.locator("body").inner_text()
            cyrillic = sum(1 for char in visible_text if "\u0400" <= char <= "\u04ff")
            wrong_links = page.locator('a[href^="/"]:not([href^="/en"]):not([href^="/#"]):not([hreflang])').evaluate_all(
                "els => [...new Map(els.map(el => [el.getAttribute('href'), el.outerHTML.slice(0,300)])).values()]"
            )
            overflow = page.locator("body *").evaluate_all("""
                els => els.filter(el => {
                  const s = getComputedStyle(el);
                  const r = el.getBoundingClientRect();
                  return r.width > 20 && r.height > 10 && s.display !== 'none' && s.visibility !== 'hidden'
                    && el.scrollWidth > el.clientWidth + 4 && !['visible','clip'].includes(s.overflowX);
                }).slice(0, 20).map(el => ({text:(el.innerText||'').trim().slice(0,80), sw:el.scrollWidth, cw:el.clientWidth}))
            """)
            print({"view": viewport_name, "route": route, "status": status, "cyrillic": cyrillic, "wrong_links": wrong_links, "overflow": overflow[:5], "runtime_errors": list(errors)})
        if viewport_name == "desktop":
            page.goto(BASE + "/en", wait_until="networkidle")
            for text in ["MOMENTUM", "BREAKTHROUGH", "TRIUMPH", "7 YEARS", "Book a free consultation"]:
                matches = page.get_by_text(text, exact=True)
                visible = [matches.nth(index) for index in range(matches.count()) if matches.nth(index).is_visible()]
                if visible:
                    locator = visible[-1]
                    box = locator.bounding_box()
                    metrics = locator.evaluate("el => ({text:el.textContent.trim(), tag:el.tagName, cls:el.className, inline:el.style.fontSize, font:getComputedStyle(el).fontSize, html:el.outerHTML.slice(0,500), parent:el.parentElement?.outerHTML.slice(0,700), sw:el.scrollWidth, cw:el.clientWidth, rect:el.getBoundingClientRect().toJSON()})")
                    print({"fit": metrics})
                    if box:
                        locator.screenshot(path=str(Path("tools") / f"qa-{text.lower().replace(' ', '-')}.png"))
            cta = page.get_by_role("link", name="Start a project").first
            if cta.count():
                cta.click(timeout=5000)
                page.wait_for_timeout(300)
                print({"cta": "Start a project", "url": page.url, "scroll_y": page.evaluate("scrollY")})
            exact_fits = page.locator("span, div").evaluate_all("""
              els => els.filter(el => ['7 years','We will explain what your business actually needs — and what it does not','From analysis to measurable results:'].includes((el.textContent||'').replace(/\\s+/g,' ').trim()) && el.children.length === 0)
                .map(el => ({text:(el.textContent||'').replace(/\\s+/g,' ').trim(), font:getComputedStyle(el).fontSize, inline:el.style.fontSize, rect:el.getBoundingClientRect().toJSON(), parent:el.parentElement?.getBoundingClientRect().toJSON()}))
            """)
            print({"special_fits": exact_fits})
        page.close()
    browser.close()
