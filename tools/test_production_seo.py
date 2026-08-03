import re
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path

import requests
from lxml import etree, html
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry


ROOT = Path(__file__).resolve().parents[1]
ORIGIN = "https://iamagency.su"


def mapped_routes():
    source = (ROOT / "src/lib/i18n/routes.ts").read_text(encoding="utf-8")
    return re.findall(r'ru: "([^"]+)", en: "([^"]+)"', source)


def absolute(path: str) -> str:
    return ORIGIN if path == "/" else f"{ORIGIN}{path}"


def make_session():
    session = requests.Session()
    retries = Retry(
        total=3,
        connect=3,
        read=3,
        backoff_factor=0.5,
        status_forcelist=(429, 500, 502, 503, 504),
        allowed_methods=("GET", "HEAD"),
    )
    session.mount("https://", HTTPAdapter(max_retries=retries))
    session.headers["User-Agent"] = "I-AM-AGENCY-production-QA/1.0"
    return session


def check_page(path: str, locale: str, counterpart: str | None):
    response = make_session().get(absolute(path), timeout=60)
    assert response.status_code == 200, (path, response.status_code)
    document = html.fromstring(response.content)
    canonical = document.xpath('string(//link[@rel="canonical"]/@href)')
    title = document.xpath("string(//title)").strip()
    description = document.xpath('string(//meta[@name="description"]/@content)').strip()
    robots = document.xpath('string(//meta[@name="robots"]/@content)').lower()
    assert document.xpath('string(/html/@lang)') == locale, path
    assert canonical == absolute(path), (path, canonical)
    assert len(document.xpath("//h1")) == 1, path
    assert "noindex" not in robots, path
    if counterpart:
        pair = next((ru, en) for ru, en in mapped_routes() if path in (ru, en))
        expected = {"ru": absolute(pair[0]), "en": absolute(pair[1]), "x-default": absolute(pair[0])}
        for hreflang, href in expected.items():
            actual = document.xpath(f'string(//link[@rel="alternate" and @hreflang="{hreflang}"]/@href)')
            assert actual == href, (path, hreflang, actual, href)
        switch = document.xpath(f'//a[@href="{counterpart}" and @hreflang]')
        assert switch, (path, "language switch", counterpart)
    if locale == "en":
        assert len(title) >= 20, (path, title)
        assert len(description) >= 50, (path, description)
        visible = " ".join(document.xpath("//body//*[not(self::script or self::style or ancestor::script or ancestor::style)]/text()"))
        assert not re.search(r"[А-Яа-яЁё]", visible), (path, "Cyrillic text")
        assert not document.xpath("//img[not(@alt)]"), (path, "image without alt")
    return {"path": path, "locale": locale, "canonical": canonical, "title": title, "description": description}


routes = []
for ru_path, en_path in mapped_routes():
    routes.extend(((ru_path, "ru", en_path), (en_path, "en", ru_path)))
routes.extend((("/en/services", "en", None), ("/en/packages", "en", None)))

results = []
with ThreadPoolExecutor(max_workers=4) as executor:
    futures = [executor.submit(check_page, *route) for route in routes]
    for future in as_completed(futures):
        results.append(future.result())

english = [result for result in results if result["locale"] == "en"]
assert len(results) == 92
assert len({result["canonical"] for result in english}) == len(english)
assert len({result["title"] for result in english}) == len(english)
assert len({result["description"] for result in english}) == len(english)

session = make_session()
sitemap_response = session.get(f"{ORIGIN}/sitemap.xml", timeout=60)
assert sitemap_response.status_code == 200
sitemap = etree.fromstring(sitemap_response.content)
namespace = {"s": "http://www.sitemaps.org/schemas/sitemap/0.9", "xhtml": "http://www.w3.org/1999/xhtml"}
assert len(sitemap.xpath("//s:loc", namespaces=namespace)) == 92
assert sitemap.xpath('//xhtml:link[@hreflang="ru"]', namespaces=namespace)
assert sitemap.xpath('//xhtml:link[@hreflang="en"]', namespaces=namespace)
assert sitemap.xpath('//xhtml:link[@hreflang="x-default"]', namespaces=namespace)

robots = session.get(f"{ORIGIN}/robots.txt", timeout=30)
assert robots.status_code == 200 and f"Sitemap: {ORIGIN}/sitemap.xml" in robots.text
health = session.get(f"{ORIGIN}/api/health", timeout=30)
assert health.status_code == 200 and health.json().get("status") == "ok"
www = session.get("https://www.iamagency.su/en?qa=redirect", allow_redirects=False, timeout=30)
assert www.status_code in (301, 308), www.status_code
assert www.headers["location"] == f"{ORIGIN}/en?qa=redirect", www.headers.get("location")

print(f"Production QA passed: {len(results)} pages, sitemap, hreflang, redirects and health.")
