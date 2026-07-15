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
- App Platform application: `iamagency-prod` (ID `223197`).
- Application IP: `186.246.6.14`.
- Technical domain: `supportn8n-iamagency-site-c22c.twc1.net`.
- Deployed commit: `2b764114a688438ae51027332c016349bb83b3cb`.
- Runtime: Node.js 22, Next.js SSR, build `npm run build`, start `npm start`.
- CMS storage: public Timeweb S3 bucket `iamagency-cms-zt123528`.
- The technical domain, `/api/health`, main routes, `robots.txt` and `sitemap.xml` returned HTTP 200 before cutover.
- The custom domain is attached to `iamagency-prod`; public validation remains pending until the authoritative NS change has propagated and DDoS-Guard routes the hostname to Timeweb.

The Optimo shared-hosting plan is not used as the application runtime. Production runs in Timeweb Cloud App Platform with SSR enabled. CMS records and uploaded images use a public Timeweb S3 bucket.

## 1. Prepare Timeweb Cloud

1. Open `timeweb.cloud` under the same owner account.
2. In `API and Terraform`, create a scoped API token with read/write access to App Platform, S3, projects and domains.
3. Store it in the user-level `TIMEWEB_CLOUD_TOKEN` environment variable and restart Codex.
4. Run `npm run timeweb:preflight`. It only reads the account state and tariff list; it never creates or deletes resources and redacts credentials in its output.
5. Create a public S3 bucket, for example `iamagency-cms`, in region `ru-1`.
6. Create an App Platform application from the public repository `https://github.com/supportn8n/iamagency-site.git` and branch `main`.
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

- apex A `186.246.6.14`, bound to `iamagency-prod`;
- `www` CNAME to `iamagency.su`;
- the existing Google Search Console verification TXT;
- the existing Yandex Webmaster verification TXT;
- Timeweb MX, SPF and DMARC defaults.

At cutover, Tilda accepted all four Timeweb nameservers and reported that propagation can take up to 24 hours. The previous Tilda NS records had a 7200-second cache TTL, so recursive resolvers can continue returning the old site during the first hours without indicating a fault.

## 6. Post-migration checks

- HTTP and HTTPS redirect to one canonical `https://iamagency.su` URL.
- `www` redirects to the apex domain.
- Search Console and Webmaster ownership remain verified.
- Sitemap is resubmitted without creating a new property.
- Metrika uses the existing counter, so historical data remains continuous.
- Server logs have no repeated 4xx/5xx errors.
- Lighthouse is checked on desktop and mobile after caches warm up.

## Rollback

Do not delete the Tilda project, Vercel Blob data, the previous Timeweb app or old DNS information for at least 14 days. If a critical issue appears, restore `ns1.tildadns.com` and `ns2.tildadns.com` in the Tilda domain panel, confirm the old site opens after DNS propagation, and fix Timeweb on the technical domain before trying the switch again.
