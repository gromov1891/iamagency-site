import { request as httpsRequest } from "node:https";
const DEFAULT_TELEGRAM_API_HOSTS = [
  "149.154.167.220",
  "api.telegram.org",
];

function postTelegramRequest(hostname: string, token: string, body: string) {
  return new Promise<void>((resolve, reject) => {
    const request = httpsRequest({
      hostname,
      port: 443,
      servername: "api.telegram.org",
      path: `/bot${token}/sendMessage`,
      method: "POST",
      headers: {
        Host: "api.telegram.org",
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(body),
      },
      timeout: 5_000,
    }, (response) => {
      let responseBody = "";
      response.setEncoding("utf8");
      response.on("data", (chunk: string) => {
        if (responseBody.length < 8_192) responseBody += chunk;
      });
      response.on("end", () => {
        let telegramOk = false;
        try {
          telegramOk = (JSON.parse(responseBody) as { ok?: boolean }).ok === true;
        } catch {
          // A malformed response must not be treated as a delivered notification.
        }
        if (response.statusCode && response.statusCode >= 200 && response.statusCode < 300 && telegramOk) {
          resolve();
          return;
        }
        reject(new Error(`Telegram ${response.statusCode || "unknown"}`));
      });
    });

    const deadline = setTimeout(() => request.destroy(new Error("Telegram request deadline")), 15_000);
    request.on("close", () => clearTimeout(deadline));
    request.on("timeout", () => request.destroy(new Error(`Telegram timeout via ${hostname}`)));
    request.on("error", reject);
    request.end(body);
  });
}

export async function sendTelegramMessage(token: string, chatId: string, text: string) {
  const configuredHosts = (process.env.LEADS_TELEGRAM_API_HOSTS || "")
    .split(",")
    .map((host) => host.trim())
    .filter(Boolean);
  const hosts = [...new Set([...configuredHosts, ...DEFAULT_TELEGRAM_API_HOSTS])].slice(0, 3);
  const body = JSON.stringify({
    chat_id: chatId,
    text,
    parse_mode: "HTML",
    disable_web_page_preview: true,
  });
  let lastError: unknown;

  for (const host of hosts) {
    try {
      await postTelegramRequest(host, token, body);
      return;
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError instanceof Error ? lastError : new Error("Telegram delivery failed");
}
