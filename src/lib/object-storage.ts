import "server-only";

import {
  GetObjectCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { get, list, put } from "@vercel/blob";

export type StorageBackend = "timeweb-s3" | "vercel-blob" | "none";

export type StoredObject = {
  key: string;
};

const s3Bucket = process.env.S3_BUCKET?.trim();
const s3AccessKey = process.env.S3_ACCESS_KEY_ID?.trim();
const s3SecretKey = process.env.S3_SECRET_ACCESS_KEY?.trim();
const s3Endpoint = process.env.S3_ENDPOINT?.trim() || "https://s3.twcstorage.ru";
const s3Region = process.env.S3_REGION?.trim() || "ru-1";

let s3Client: S3Client | undefined;

export function getStorageBackend(): StorageBackend {
  if (s3Bucket && s3AccessKey && s3SecretKey) return "timeweb-s3";
  if (process.env.BLOB_READ_WRITE_TOKEN?.trim()) return "vercel-blob";
  return "none";
}

function requireS3() {
  if (!s3Bucket || !s3AccessKey || !s3SecretKey) {
    throw new Error("Timeweb S3 is not configured");
  }

  s3Client ??= new S3Client({
    endpoint: s3Endpoint,
    region: s3Region,
    credentials: {
      accessKeyId: s3AccessKey,
      secretAccessKey: s3SecretKey,
    },
    forcePathStyle: process.env.S3_FORCE_PATH_STYLE === "true",
  });

  return { client: s3Client, bucket: s3Bucket };
}

function publicObjectUrl(key: string) {
  const baseUrl = process.env.S3_PUBLIC_URL?.trim() || `https://${s3Bucket}.s3.twcstorage.ru`;
  const encodedKey = key.split("/").map(encodeURIComponent).join("/");
  return `${baseUrl.replace(/\/$/, "")}/${encodedKey}`;
}

export async function listStoredObjects(prefix: string): Promise<StoredObject[]> {
  const backend = getStorageBackend();

  if (backend === "timeweb-s3") {
    const { client, bucket } = requireS3();
    const objects: StoredObject[] = [];
    let continuationToken: string | undefined;

    do {
      const page = await client.send(new ListObjectsV2Command({
        Bucket: bucket,
        Prefix: prefix,
        ContinuationToken: continuationToken,
        MaxKeys: 1000,
      }));
      for (const object of page.Contents || []) {
        if (object.Key) objects.push({ key: object.Key });
      }
      continuationToken = page.IsTruncated ? page.NextContinuationToken : undefined;
    } while (continuationToken);

    return objects;
  }

  if (backend === "vercel-blob") {
    const objects: StoredObject[] = [];
    let cursor: string | undefined;
    do {
      const page = await list({ prefix, limit: 1000, cursor });
      objects.push(...page.blobs.map((blob) => ({ key: blob.pathname })));
      cursor = page.hasMore ? page.cursor : undefined;
    } while (cursor);
    return objects;
  }

  return [];
}

export async function getJsonObject<T>(key: string): Promise<T | null> {
  const backend = getStorageBackend();

  if (backend === "timeweb-s3") {
    const { client, bucket } = requireS3();
    const result = await client.send(new GetObjectCommand({ Bucket: bucket, Key: key }));
    if (!result.Body) return null;
    return JSON.parse(await result.Body.transformToString("utf-8")) as T;
  }

  if (backend === "vercel-blob") {
    const result = await get(key, { access: "public", useCache: false });
    if (!result || result.statusCode !== 200) return null;
    return await new Response(result.stream).json() as T;
  }

  return null;
}

export async function putJsonObject(key: string, value: unknown) {
  const body = JSON.stringify(value);
  const backend = getStorageBackend();

  if (backend === "timeweb-s3") {
    const { client, bucket } = requireS3();
    await client.send(new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: Buffer.from(body),
      ContentType: "application/json; charset=utf-8",
      CacheControl: "no-store, max-age=0",
    }));
    return;
  }

  if (backend === "vercel-blob") {
    await put(key, body, {
      access: "public",
      contentType: "application/json; charset=utf-8",
      cacheControlMaxAge: 0,
    });
    return;
  }

  throw new Error("Object storage is not configured");
}

export async function putPublicFile(key: string, body: Uint8Array, contentType: string) {
  const backend = getStorageBackend();

  if (backend === "timeweb-s3") {
    const { client, bucket } = requireS3();
    await client.send(new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: Buffer.from(body),
      ContentType: contentType,
      CacheControl: "public, max-age=31536000, immutable",
    }));
    return { url: publicObjectUrl(key), pathname: key };
  }

  if (backend === "vercel-blob") {
    const blob = await put(key, Buffer.from(body), {
      access: "public",
      contentType,
      cacheControlMaxAge: 31_536_000,
    });
    return { url: blob.url, pathname: blob.pathname };
  }

  throw new Error("Object storage is not configured");
}
