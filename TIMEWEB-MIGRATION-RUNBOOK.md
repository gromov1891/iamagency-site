# I AM AGENCY: migration to Timeweb Cloud

## Confirmed current state

- Production domain: `iamagency.su`.
- Registrar: Tilda (`TILDA-SU`).
- DNS servers: `ns1.tildadns.com`, `ns2.tildadns.com`.
- Current Yandex Metrika counter: `99802137`.
- Google Search Console and Yandex Webmaster verification TXT records already exist.
- The application requires Next.js SSR, API routes, CMS storage and outbound SMTP/Telegram access.

The Optimo shared-hosting plan is not used as the application runtime. Production runs in Timeweb Cloud App Platform with SSR enabled. CMS records and uploaded images use a public Timeweb S3 bucket.

## 1. Prepare Timeweb Cloud

1. Open `timeweb.cloud` under the same owner account.
2. Create a public S3 bucket, for example `iamagency-cms`, in region `ru-1`.
3. Create S3 access keys with read/write access to this bucket.
4. Create an App Platform application from the GitHub repository and branch `main`.
5. Choose Next.js and enable SSR during creation. SSR cannot be enabled later for an existing static app.
6. Use Node.js 22, build command `npm run build`, start command `npm start` and port `3000`.
7. Set health check path to `/api/health`.
8. Import variables from `.env.timeweb.example`, replacing every placeholder.

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

## 4. Domain ownership action in Tilda

1. In Tilda open Domains, select `iamagency.su` and choose transfer to another registrar.
2. Request the AUTHINFO code.
3. Confirm the request using the code sent to the domain administrator email.
4. Save the AUTHINFO code; Tilda displays it only once.
5. Start the `.su` transfer in Timeweb Domains using this code.

The registrar transfer may run in parallel with hosting validation. Do not change production DNS before the technical Timeweb domain passes the checklist.

## 5. DNS cutover

Before switching, copy all existing records into Timeweb DNS, especially:

- Google Search Console verification TXT;
- Yandex Webmaster verification TXT;
- any future MX/SPF/DKIM records;
- apex and `www` records supplied by App Platform.

Set TTL to 300 at least one day before the cutover if Tilda DNS allows it. Connect both `iamagency.su` and `www.iamagency.su` in App Platform, wait for SSL, then switch nameservers or DNS records to Timeweb.

## 6. Post-migration checks

- HTTP and HTTPS redirect to one canonical `https://iamagency.su` URL.
- `www` redirects to the apex domain.
- Search Console and Webmaster ownership remain verified.
- Sitemap is resubmitted without creating a new property.
- Metrika uses the existing counter, so historical data remains continuous.
- Server logs have no repeated 4xx/5xx errors.
- Lighthouse is checked on desktop and mobile after caches warm up.

## Rollback

Do not delete the Tilda project, Vercel Blob data or old DNS records for at least 14 days. If a critical issue appears, restore the previous Tilda nameservers or A record, confirm the old site opens, and fix Timeweb on the technical domain before trying the switch again.
