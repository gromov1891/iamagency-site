import { existsSync } from "node:fs";
import process from "node:process";
import { ListObjectsV2Command, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { list } from "@vercel/blob";

for (const envFile of [".env.local", ".env.timeweb.local"]) {
  if (existsSync(envFile) && typeof process.loadEnvFile === "function") process.loadEnvFile(envFile);
}

const apply = process.argv.includes("--apply");
const bucket = process.env.S3_BUCKET?.trim();
const accessKeyId = process.env.S3_ACCESS_KEY_ID?.trim();
const secretAccessKey = process.env.S3_SECRET_ACCESS_KEY?.trim();
const endpoint = process.env.S3_ENDPOINT?.trim() || "https://s3.twcstorage.ru";
const region = process.env.S3_REGION?.trim() || "ru-1";

if (!process.env.BLOB_READ_WRITE_TOKEN) throw new Error("Missing BLOB_READ_WRITE_TOKEN");
if (!bucket || !accessKeyId || !secretAccessKey) throw new Error("Missing Timeweb S3 credentials");

const s3 = new S3Client({
  endpoint,
  region,
  credentials: { accessKeyId, secretAccessKey },
  forcePathStyle: process.env.S3_FORCE_PATH_STYLE === "true",
});

async function listVercelCms() {
  const blobs = [];
  let cursor;
  do {
    const page = await list({ prefix: "cms/", limit: 1000, cursor });
    blobs.push(...page.blobs);
    cursor = page.hasMore ? page.cursor : undefined;
  } while (cursor);
  return blobs;
}

async function listS3Cms() {
  const keys = new Set();
  let continuationToken;
  do {
    const page = await s3.send(new ListObjectsV2Command({
      Bucket: bucket,
      Prefix: "cms/",
      ContinuationToken: continuationToken,
      MaxKeys: 1000,
    }));
    for (const item of page.Contents || []) if (item.Key) keys.add(item.Key);
    continuationToken = page.IsTruncated ? page.NextContinuationToken : undefined;
  } while (continuationToken);
  return keys;
}

const source = await listVercelCms();
const existing = await listS3Cms();
const pending = source.filter((blob) => !existing.has(blob.pathname));

console.log(`CMS objects in Vercel Blob: ${source.length}`);
console.log(`Already present in Timeweb S3: ${source.length - pending.length}`);
console.log(`Objects to migrate: ${pending.length}`);

if (!apply) {
  console.log("Dry run only. Run npm run migrate:cms:s3 -- --apply to copy the objects.");
  process.exit(0);
}

let copied = 0;
for (const blob of pending) {
  const response = await fetch(blob.url);
  if (!response.ok) throw new Error(`Unable to download ${blob.pathname}: HTTP ${response.status}`);
  const body = new Uint8Array(await response.arrayBuffer());
  const contentType = response.headers.get("content-type") || "application/octet-stream";
  await s3.send(new PutObjectCommand({
    Bucket: bucket,
    Key: blob.pathname,
    Body: body,
    ContentType: contentType,
    CacheControl: blob.pathname.startsWith("cms/media/")
      ? "public, max-age=31536000, immutable"
      : "no-store, max-age=0",
  }));
  copied += 1;
  console.log(`[${copied}/${pending.length}] ${blob.pathname}`);
}

console.log(`Migration complete. Copied ${copied} objects.`);
