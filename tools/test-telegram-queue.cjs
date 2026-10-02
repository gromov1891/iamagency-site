const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');
const rows = new Map();
let revision = 0, sent = 0, fail = true;
const storage = {
  getStorageBackend: () => 'vercel-blob',
  listStoredObjects: async () => [...rows.keys()].map(key => ({key})),
  readQueueObject: async key => rows.has(key) ? structuredClone(rows.get(key)) : null,
  writeQueueObject: async (key, value, etag) => {
    const current = rows.get(key);
    if (current ? current.etag !== etag : etag) return null;
    const next = String(++revision);
    rows.set(key, {value: structuredClone(value), etag: next});
    return next;
  },
};
function load() {
  const mod = {exports:{}};
  const compiled = ts.transpileModule(fs.readFileSync('src/lib/telegram-queue.ts','utf8'), {
    compilerOptions: {module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020},
  }).outputText;
  vm.runInNewContext(compiled, {
    exports:mod.exports, module:mod, Buffer, Date, setInterval, setTimeout,
    process:{env:{LEADS_TELEGRAM_BOT_TOKEN:'test', LEADS_VALIDATION_SECRET:'test-secret'}},
    console:{info(){},error(){}},
    require(name) {
      if (name === 'server-only') return {};
      if (name === './object-storage') return storage;
      if (name === './telegram-delivery') return {sendTelegramMessage:async () => {sent++; if(fail) throw Error('timeout');}};
      return require(name);
    },
  });
  return mod.exports;
}
(async () => {
  const a = load(), b = load();
  await a.enqueueTelegram('ABC12345','private-chat','confidential contact');
  const key = [...rows.keys()][0];
  assert.equal(JSON.stringify(rows.get(key)).includes('confidential'), false);
  await a.processTelegramQueue();
  assert.equal(rows.get(key).value.status,'pending');
  assert.equal(rows.get(key).value.attempts,1);
  await a.processTelegramQueue();
  assert.equal(sent,1, 'backoff must prevent early retry');
  rows.get(key).value.nextAttemptAt = 0;
  fail = false;
  await Promise.all([a.processTelegramQueue(), b.processTelegramQueue()]);
  assert.equal(sent,2, 'only one worker may claim the retry');
  assert.equal(rows.get(key).value.status,'sent');
  assert.equal(rows.get(key).value.payload,undefined);
  await a.enqueueTelegram('ABC12345','private-chat','confidential contact');
  await load().processTelegramQueue();
  assert.equal(sent,2, 'sent receipt survives restart and duplicate enqueue');
  await a.enqueueTelegram('ABC12346','private-chat','next');
  const second = [...rows.keys()][1];
  rows.get(second).value.status = 'sending';
  rows.get(second).value.nextAttemptAt = 0;
  await load().processTelegramQueue();
  assert.equal(rows.get(second).value.status,'sent', 'expired lease recovered after crash');
  console.log('PASS: encrypted payload, retry, backoff, concurrent claim, deduplication, restart recovery');
})().catch(e => {console.error(e);process.exitCode=1;});
