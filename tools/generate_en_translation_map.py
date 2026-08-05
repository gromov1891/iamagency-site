import json
import os
import re
import time
import urllib.parse
import urllib.request
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path

from playwright.sync_api import sync_playwright


ROOT = Path(__file__).resolve().parents[1]
BASE_URL = os.environ.get("IAM_QA_BASE", "http://127.0.0.1:3107").rstrip("/")
OUTPUT = ROOT / "src" / "lib" / "i18n" / "auto-translations.json"
CYRILLIC = re.compile(r"[А-Яа-яЁё]")


def routes():
    configured = os.environ.get("IAM_QA_ROUTES")
    if configured:
        return [path.strip() for path in configured.split(",") if path.strip()]
    source = (ROOT / "src" / "lib" / "i18n" / "routes.ts").read_text(encoding="utf-8")
    paths = re.findall(r'ru: "([^"]+)"', source)
    return list(dict.fromkeys(paths))


def normalize(value: str):
    return re.sub(r"\s+", " ", value.replace("\xa0", " ")).strip()


def collect_texts():
    found = set()
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 1440, "height": 1000})
        page.route(
            "**/*",
            lambda route: route.abort()
            if route.request.resource_type in {"image", "media", "font"}
            else route.continue_(),
        )
        for path in routes():
            page.goto(f"{BASE_URL}{path}", wait_until="domcontentloaded", timeout=20_000)
            values = page.evaluate(
                """() => {
                  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
                  const values = [];
                  while (walker.nextNode()) {
                    const parent = walker.currentNode.parentElement;
                    if (!parent || ['SCRIPT', 'STYLE', 'NOSCRIPT'].includes(parent.tagName)) continue;
                    values.push(walker.currentNode.nodeValue || '');
                  }
                  return values;
                }"""
            )
            for value in values:
                text = normalize(value)
                if text and CYRILLIC.search(text):
                    found.add(text)
        browser.close()
    return sorted(found, key=lambda value: (len(value), value.lower()))


def translate(text: str):
    query = urllib.parse.urlencode(
        {"client": "gtx", "sl": "ru", "tl": "en", "dt": "t", "q": text}
    )
    url = f"https://translate.googleapis.com/translate_a/single?{query}"
    for attempt in range(4):
        try:
            with urllib.request.urlopen(url, timeout=30) as response:
                payload = json.loads(response.read().decode("utf-8"))
            result = "".join(part[0] for part in payload[0] if part and part[0])
            return normalize(result)
        except Exception:
            if attempt == 3:
                raise
            time.sleep(1.5 * (attempt + 1))


def main():
    texts = collect_texts()
    existing = json.loads(OUTPUT.read_text(encoding="utf-8")) if OUTPUT.exists() else {}
    pending = [text for text in texts if text not in existing]
    print(f"Collected {len(texts)} strings; translating {len(pending)} new strings.", flush=True)
    with ThreadPoolExecutor(max_workers=5) as executor:
        futures = {executor.submit(translate, text): text for text in pending}
        for index, future in enumerate(as_completed(futures), start=1):
            source = futures[future]
            existing[source] = future.result()
            if index % 25 == 0:
                ordered = dict(sorted(existing.items(), key=lambda item: item[0].lower()))
                OUTPUT.write_text(json.dumps(ordered, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
                print(f"Translated {index}/{len(pending)}", flush=True)
    ordered = dict(sorted(existing.items(), key=lambda item: item[0].lower()))
    OUTPUT.write_text(json.dumps(ordered, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Wrote {len(ordered)} translations to {OUTPUT}", flush=True)


if __name__ == "__main__":
    main()
