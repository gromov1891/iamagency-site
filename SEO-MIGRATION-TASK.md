# SEO migration task: iamagency.su

Source snapshot: the 22 URLs from the legacy Tilda sitemap on 2026-07-13.

## Critical migration work

- [x] Publish a valid `/robots.txt` with the canonical XML sitemap and host.
- [x] Publish `/sitemap.xml` with every canonical, indexable page in the new site.
- [x] Add permanent redirects for all retired URLs from the old sitemap.
- [x] Preserve the separate personal-data consent document and redirect `/privacy` to it.
- [x] Add self-referencing canonical URLs to all page types.
- [x] Add Organization structured data at site level.
- [x] Ensure major visual pages expose one semantic H1 without changing the Figma layout.
- [x] Update the human-readable sitemap with every service, tariff, case and marketing page.
- [x] Verify build, redirect status, canonical tags, robots, sitemap and JSON-LD locally.
- [x] Deploy, verify production and push `origin/main`.

## Verification result

- Legacy sitemap: 22 URLs accounted for (19 permanent redirects, 3 unchanged canonical routes).
- New XML sitemap: 40 canonical URLs, 0 failed metadata/schema/H1 checks.
- Human-readable sitemap: 49 internal links, 0 broken links.
- Lighthouse SEO: 100/100.
- Homepage transport: Brotli enabled; the blocking preloader was removed and the LCP hero image is eager/high priority.

## Legacy redirect map

| Legacy path | New canonical destination |
|---|---|
| `/imagency` | `/` |
| `/schoolsmm` | `/shkola-smm` |
| `/blog` | `/#blog` |
| `/smm_bisnes` | `/uslugi/vedenie-sotssetey` |
| `/cases` | `/keisy` |
| `/services` | `/#uslugi` |
| `/smm-strategies` | `/uslugi/brendbuk-i-smm-strategiya` |
| `/channels-and-vk-sites` | `/uslugi/marketing-i-prodvizhenie` |
| `/cross-hosting` | `/uslugi/vedenie-sotssetey` |
| `/bot` | `/uslugi/marketing-i-prodvizhenie` |
| `/shooting`, `/mobileshooting` | `/uslugi/kontent-syomki` |
| `/vkontakte`, `/telegram`, `/instagram` | `/uslugi/vedenie-sotssetey` |
| `/website` | `/marketing/razrabotka-saytov` |
| `/target` | `/marketing/target-reklama` |
| `/privacy` | `/privacy-consent` |
| `/page65742163.html` | `/` |

Unchanged canonical paths: `/`, `/marketing`, `/privacy-policy`.
