# I AM AGENCY: migration to Timeweb Cloud

## Confirmed current state

- Production domain: `iamagency.su`.
- Registrar: Tilda (`TILDA-SU`), registration valid through 18 September 2026.
- Nameserver cutover requested on 15 July 2026 from Tilda DNS to Timeweb DNS:
  `ns1.timeweb.ru`, `ns2.timeweb.ru`, `ns3.timeweb.org`, `ns4.timeweb.org`.
- Current Yandex Metrika counter: `99802137`.
- Google Search Console and Yandex Webmaster verification TXT records already exist.
- The application requires Next.js SSR, API routes, CMS storage and outbound SMTP/Telegram access.

## Deployed production resources

- Timeweb project: `2631745`.
- Production App Platform application: `iamagency-prod-final` (ID `223353`).
- Application IP: `186.246.13.203`.
- Technical domain: `gromov1891-iamagency-site-3752.twc1.net`.
- Repository: `https://github.com/gromov1891/iamagency-site`, branch `main`.
- Deployed commit: `259ed7d` (`redirect www to canonical domain`).
- Runtime: Node.js 22, Next.js SSR, build `npm run build`, start `npm start`.
- CMS storage: public Timeweb S3 bucket `iamagency-cms-zt123528`.
- The custom domain `iamagency.su` is attached to `iamagency-prod-final` and has a valid automatically managed SSL certificate.
- The technical domain and public domain passed checks for `/api/health`, the main routes, `/admin`, `robots.txt` and `sitemap.xml`.
- A production-origin lead was accepted by `/api/leads` and delivered through the HTTPS relay to email and the marketing Telegram chat.
- The former application `iamagency-prod` (ID `223197`, IP `186.246.6.14`) is retained temporarily for rollback only.

The Optimo shared-hosting plan is not used as the application runtime. Production runs in Timeweb Cloud App Platform with SSR enabled. CMS records and uploaded images use a public Timeweb S3 bucket.

## 1. Prepare Timeweb Cloud

1. Open `timeweb.cloud` under the same owner account.
2. In `API and Terraform`, create a scoped API token with read/write access to App Platform, S3, projects and domains.
3. Store it in the user-level `TIMEWEB_CLOUD_TOKEN` environment variable and restart Codex.
4. Run `npm run timeweb:preflight`. It only reads the account state and tariff list; it never creates or deletes resources and redacts credentials in its output.
5. Create a public S3 bucket, for example `iamagency-cms`, in region `ru-1`.
6. Create an App Platform application from the public repository `https://github.com/gromov1891/iamagency-site.git` and branch `main`.
7. Choose Next.js and enable SSR during creation. SSR cannot be enabled later for an existing static app.
8. Use Node.js 22, build command `npm run build`, start command `npm start` and port `3000`.
9. Set health check path to `/api/health`.
10. Import variables from `.env.timeweb.example`, replacing every placeholder.

The official Timeweb Cloud MCP is configured separately in Codex and reads the same `TIMEWEB_CLOUD_TOKEN`. Resource creation is performed only after the preflight exposes the exact monthly App Platform and S3 prices.

## 2. Move CMS content

Keep `BLOB_READ_WRITE_TOKEN` only on the migration machine. Put target S3 values in `.env.timeweb.local`, then run:

```powershell
npm run migrate:cms:s3
npm run migrate:cms:s3 -- --apply
```

The first command is a dry run. The second copies missing `cms/records/*` and `cms/media/*` objects without deleting the Vercel source.

## 3. Validate the technical Timeweb domain

- `GET /api/health` returns `status: ok` and `storage: timeweb-s3`.
- Home, marketing, school, cases, tariffs, services and blog pages return HTTP 200.
- `/admin` login works, an article image uploads, a draft saves and a published article opens.
- A test lead arrives in the marketing Telegram chat and by email.
- `/robots.txt` and `/sitemap.xml` open.
- Legacy Tilda URLs redirect only once to a valid destination.
- Yandex Metrika counter `99802137` receives a test visit and `lead_sent` goal.

## 4. Domain ownership

The registrar remains Tilda for now. A registrar transfer is not required to host the application in Timeweb. Domain delegation is changed in the Tilda registrar panel, while the DNS zone and application run in Timeweb Cloud.

## 5. DNS cutover

Before switching, copy all existing records into Timeweb DNS, especially:

- Google Search Console verification TXT;
- Yandex Webmaster verification TXT;
- any future MX/SPF/DKIM records;
- apex and `www` records supplied by App Platform.

The Timeweb zone prepared before the switch contains:

- apex A `186.246.13.203`, bound to `iamagency-prod-final`;
- `www` A `186.246.13.203`, bound to `iamagency-prod-final`;
- the existing Google Search Console verification TXT;
- the existing Yandex Webmaster verification TXT;
- Timeweb MX, SPF and DMARC defaults.

At cutover, Tilda accepted all four Timeweb nameservers. All four Timeweb authoritative servers return `186.246.13.203` for the apex domain. The previous Tilda NS records had a 7200-second cache TTL, so recursive resolvers could temporarily return the old site during the first hours without indicating a fault.

Cutover completed on 15 July 2026. The Tilda registrar account remains the place where the domain registration is renewed; Timeweb is now the DNS and application host.

## 6. Post-migration checks

- HTTP and HTTPS redirect to one canonical `https://iamagency.su` URL.
- `www` redirects to the apex domain.
- Search Console and Webmaster ownership remain verified.
- Sitemap is resubmitted without creating a new property.
- Metrika uses the existing counter, so historical data remains continuous.
- Server logs have no repeated 4xx/5xx errors.
- Lighthouse is checked on desktop and mobile after caches warm up.

### Completed on 15 July 2026

- The apex domain and `www` resolve publicly to `186.246.13.203`.
- Separate Let's Encrypt certificates are active for `iamagency.su` and `www.iamagency.su`.
- `www` returns permanent `308` redirects to the same path and query string on `https://iamagency.su`.
- Home, marketing, school, cases, blog, admin, robots, sitemap and health endpoints return HTTP 200.
- The sitemap contains 45 canonical URLs.
- The existing Yandex Metrika counter is present in production HTML.
- Google Search Console and Yandex Webmaster TXT verification records resolve publicly.
- A public-origin lead submission was accepted and delivered to email and the marketing Telegram chat.
- Temporary API tokens created for the migration were revoked after validation.

## Rollback

Do not delete the Tilda project, Vercel Blob data, former Timeweb application `223197` or old DNS information before 29 July 2026. If a critical issue appears, the fastest Timeweb rollback is to bind the apex A record back to application `223197` at `186.246.6.14`. A full DNS rollback is to restore `ns1.tildadns.com` and `ns2.tildadns.com` in the Tilda domain panel, then confirm the old site after propagation.
