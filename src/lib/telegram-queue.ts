import "server-only";
import { createCipheriv, createDecipheriv, createHash, randomBytes } from "node:crypto";
import { listStoredObjects, readQueueObject, writeQueueObject, getStorageBackend } from "./object-storage";
import { sendTelegramMessage } from "./telegram-delivery";

const PREFIX = "leads/telegram-queue/";
type Job = {
  id: string; status: "pending" | "sending" | "sent"; attempts: number;
  nextAttemptAt: number; updatedAt: string; payload?: string; sentAt?: string;
  lastError?: string;
};
function encryptionKey() {
  const secret = process.env.LEADS_VALIDATION_SECRET || process.env.CMS_SESSION_SECRET;
  if (!secret) throw new Error("Queue encryption secret missing");
  return createHash("sha256").update(secret).digest();
}
function encrypt(value: string) {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", encryptionKey(), iv);
  const data = Buffer.concat([cipher.update(value, "utf8"), cipher.final()]);
  return Buffer.concat([iv, cipher.getAuthTag(), data]).toString("base64");
}
function decrypt(value: string) {
  const data = Buffer.from(value, "base64");
  const cipher = createDecipheriv("aes-256-gcm", encryptionKey(), data.subarray(0, 12));
  cipher.setAuthTag(data.subarray(12, 28));
  return Buffer.concat([cipher.update(data.subarray(28)), cipher.final()]).toString("utf8");
}

export async function enqueueTelegram(id: string, chatId: string, text: string) {
  startTelegramWorker();
  const key = `${PREFIX}${id}.json`;
  const existing = await readQueueObject<Job>(key);
  if (existing) return;
  await writeQueueObject(key, {
    id, status: "pending", attempts: 0, nextAttemptAt: Date.now(), updatedAt: new Date().toISOString(),
    payload: encrypt(JSON.stringify({ chatId, text })),
  } satisfies Job);
}

export async function processTelegramQueue() {
  const token = process.env.LEADS_TELEGRAM_BOT_TOKEN?.trim();
  if (!token || getStorageBackend() === "none") return;
  const objects = await listStoredObjects(PREFIX);
  let processed = 0;
  for (const { key } of objects) {
    if (processed >= 20) break;
    const entry = await readQueueObject<Job>(key);
    if (!entry || entry.value.status === "sent" || entry.value.nextAttemptAt > Date.now()) continue;
    const claimed: Job = { ...entry.value, status: "sending", attempts: entry.value.attempts + 1,
      nextAttemptAt: Date.now() + 300_000, updatedAt: new Date().toISOString() };
    const lease = await writeQueueObject(key, claimed, entry.etag);
    if (!lease) continue;
    processed++;
    let delivered = false;
    try {
      const payload = JSON.parse(decrypt(claimed.payload!)) as { chatId: string; text: string };
      await sendTelegramMessage(token, payload.chatId, payload.text);
      delivered = true;
      const saved = await writeQueueObject(key, { ...claimed, status: "sent", payload: undefined,
        lastError: undefined, sentAt: new Date().toISOString(), updatedAt: new Date().toISOString() }, lease);
      if (!saved) throw new Error("Delivery receipt conflict");
      console.info(`Lead ${claimed.id} Telegram delivered (attempt ${claimed.attempts})`);
    } catch (error) {
      // Do not publish message contents, tokens or contact data in logs.
      const reason = delivered ? "receipt_write_failed" : "send_failed";
      console.error(`Lead ${claimed.id} Telegram ${reason} (attempt ${claimed.attempts})`);
      if (!delivered) {
        await writeQueueObject(key, { ...claimed, status: "pending", lastError: reason,
          nextAttemptAt: Date.now() + Math.min(3_600_000, 30_000 * 2 ** Math.min(claimed.attempts - 1, 7)),
          updatedAt: new Date().toISOString() }, lease);
      }
    }
  }
}

const workerState = globalThis as typeof globalThis & { iamTelegramWorker?: ReturnType<typeof setInterval>; iamTelegramBusy?: boolean };
export function startTelegramWorker() {
  if (workerState.iamTelegramWorker) return;
  const tick = async () => {
    if (workerState.iamTelegramBusy) return;
    workerState.iamTelegramBusy = true;
    try { await processTelegramQueue(); }
    catch { console.error("Telegram queue processing failed; will retry"); }
    finally { workerState.iamTelegramBusy = false; }
  };
  workerState.iamTelegramWorker = setInterval(tick, 30_000);
  workerState.iamTelegramWorker.unref();
  console.info("Telegram delivery queue worker started");
  void tick();
}
