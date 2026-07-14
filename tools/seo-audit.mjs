import fs from "node:fs";

const base = process.argv[2] || "http://localhost:3010";
const routes = [
  "/",
  "/marketing",
  "/keisy",
  "/case/beauty",
  "/uslugi/vedenie-sotssetey",
  "/tarify/dvizhenie",
  "/shkola-smm",
  "/blog",
];

for (const path of routes) {
  const response = await fetch(`${base}${path}`);
  const html = await response.text();
  const title = html.match(/<title>(.*?)<\/title>/)?.[1] || "";
  const canonical = html.match(/<link rel="canonical" href="([^"]+)/)?.[1] || "";
  const description = html.match(/<meta name="description" content="([^"]*)/)?.[1] || "";
  const scripts = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((match) => match[1]);
  const jsonLdValid = scripts.every((script) => {
    try {
      JSON.parse(script);
      return true;
    } catch {
      return false;
    }
  });
  const images = [...html.matchAll(/<img\b[^>]*>/g)].map((match) => match[0]);
  const missingAlt = images.filter((tag) => !/\balt=/.test(tag)).length;
  const mojibakeAlt = images.filter((tag) => /alt="[^"]*(?:Р±|Р°|СЊ|СЃ)/.test(tag)).length;

  console.log(JSON.stringify({
    status: response.status,
    path,
    titleLength: title.length,
    descriptionLength: description.length,
    h1: (html.match(/<h1(?:\s|>)/g) || []).length,
    canonical,
    jsonLd: scripts.length,
    jsonLdValid,
    images: images.length,
    missingAlt,
    mojibakeAlt,
  }));
}

const robots = await (await fetch(`${base}/robots.txt`)).text();
const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
console.log(JSON.stringify({
  robotsNextBlocked: robots.includes("/_next/"),
  robotsHasSitemap: robots.includes("https://iamagency.su/sitemap.xml"),
  sitemapUrls: (sitemap.match(/<url>/g) || []).length,
  buildId: fs.existsSync(".next/BUILD_ID") ? fs.readFileSync(".next/BUILD_ID", "utf8").trim() : null,
}));

for (const path of ["/services", "/schoolsmm", "/cases", "/smm-strategies", "/target", "/shooting", "/website", "/privacy"]) {
  const response = await fetch(`${base}${path}`, { redirect: "manual" });
  console.log(JSON.stringify({ redirect: path, status: response.status, location: response.headers.get("location") }));
}
