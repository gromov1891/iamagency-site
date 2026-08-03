import re
from playwright.sync_api import sync_playwright

with sync_playwright() as playwright:
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1280, "height": 900})
    page.route("**/api/leads", lambda route: route.fulfill(status=200, content_type="application/json", body='{"ok":true}'))
    page.goto("http://127.0.0.1:3107/en/services/social-media-management", wait_until="networkidle")
    page.get_by_role("link", name=re.compile("Discuss your project", re.I)).click()
    page.get_by_label("Name").fill("Codex QA")
    page.get_by_label("Email").fill("test-noreply@example.com")
    page.get_by_label("How can we help?").fill("Integration test for the English enquiry flow.")
    page.get_by_label(re.compile("processing of my personal data", re.I)).check()
    page.get_by_role("button", name="Send enquiry").click()
    page.get_by_text("Thank you!").wait_for()
    browser.close()

print("English enquiry form flow passed.")
