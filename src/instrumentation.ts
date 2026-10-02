export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { startTelegramWorker } = await import("./lib/telegram-queue");
    startTelegramWorker();
  }
}
