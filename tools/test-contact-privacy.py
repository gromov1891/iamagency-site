from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    for width in (375, 768, 1440):
        page = browser.new_page(viewport={"width": width, "height": 900})
        page.goto('http://localhost:3192/', wait_until='networkidle')
        privacy = page.locator('input[name="privacyAcknowledged"]:visible')
        privacy.wait_for()
        assert not privacy.is_checked()
        privacy.scroll_into_view_if_needed()
        label = privacy.locator('..')
        assert label.locator('a').get_attribute('href') == '/privacy-policy'
        submit = page.locator('[id="kf-submit"]:visible')
        assert label.bounding_box()['y'] + label.bounding_box()['height'] < submit.bounding_box()['y']
        page.locator('input[name="name"]:visible').fill('Test')
        page.locator('input[name="phone"]:visible').fill('+79990000000')
        page.locator('input[name="consent"]:visible').check()
        requests = []
        page.route('**/api/leads', lambda route: (requests.append(route.request.post_data), route.fulfill(json={"ok": True})))
        submit.click(force=True)
        assert not requests
        privacy.check()
        submit.click(force=True)
        page.wait_for_timeout(300)
        assert len(requests) == 1
        print(f'PASS {width}: spacing, links, both checkboxes required, submission')
        page.close()
    browser.close()
