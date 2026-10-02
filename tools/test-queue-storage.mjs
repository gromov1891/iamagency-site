import { put, get, del, BlobPreconditionFailedError } from '@vercel/blob';
import { randomUUID } from 'node:crypto';
import assert from 'node:assert/strict';
const key = `diagnostics/telegram-queue-${randomUUID()}.json`;
let created;
try {
  created = await put(key, JSON.stringify({test:1, payload:'encrypted-placeholder-'.repeat(300)}), {access:'public', addRandomSuffix:false, cacheControlMaxAge:0});
  const read = await get(key, {access:'public', useCache:false});
  const strongTag = read.blob.etag.replace(/^W\//, '');
  assert.equal(strongTag, created.etag);
  const next = await put(key, '{"test":2}', {access:'public',addRandomSuffix:false,allowOverwrite:true,ifMatch:strongTag});
  assert.notEqual(next.etag, created.etag);
  await assert.rejects(() => put(key, '{"test":3}', {access:'public',addRandomSuffix:false,allowOverwrite:true,ifMatch:created.etag}), BlobPreconditionFailedError);
  console.log('PASS: live storage conditional writes reject stale worker');
} finally { if (created) await del(created.url); }
