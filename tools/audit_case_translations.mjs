import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import ts from "typescript";

const root = process.cwd();
const directory = path.join(root, "src/app/keisy/gen");
const files = fs.readdirSync(directory).filter((name) => name.endsWith("Html.ts"));
const translations = JSON.parse(fs.readFileSync(path.join(root, "src/lib/i18n/auto-translations.json"), "utf8"));
const caseTranslationSource = fs.readFileSync(path.join(root, "src/lib/i18n/case-translations.ts"), "utf8");
const caseTranslationJavascript = ts.transpileModule(caseTranslationSource, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
}).outputText;
const caseTranslationModule = { exports: {} };
vm.runInNewContext(caseTranslationJavascript, { exports: caseTranslationModule.exports, module: caseTranslationModule });
const caseTranslations = caseTranslationModule.exports.CASE_TRANSLATIONS;
const found = new Map();

for (const file of files) {
  const source = fs.readFileSync(path.join(directory, file), "utf8").replace(/^import\s+IMGMAP[^;]+;\s*/m, "");
  const javascript = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
  const module = { exports: {} };
  const imageMap = JSON.parse(fs.readFileSync(path.join(directory, "_imageMap.json"), "utf8"));
  vm.runInNewContext(javascript, { exports: module.exports, module, IMGMAP: imageMap });
  let html = Object.entries(module.exports).find(([key]) => key.endsWith("Html"))?.[1];
  if (typeof html !== "string") throw new Error(`Unable to evaluate ${file}`);
  html = html.replace(/&#(\d+);/g, (entity, code) => {
    const value = Number(code);
    return value >= 1024 && value <= 1279 ? String.fromCharCode(value) : entity;
  });
  for (const match of html.matchAll(/>([^<>]*)</g)) {
    const text = match[1].replaceAll("&nbsp;", " ").replace(/\s+/g, " ").trim();
    if (!/[А-Яа-яЁё]/.test(text)) continue;
    const record = found.get(text) || { files: new Set(), count: 0 };
    record.files.add(file);
    record.count += 1;
    found.set(text, record);
  }
}

const missing = [...found.entries()].filter(([text]) => !caseTranslations[text] && !translations[text]);
console.log(JSON.stringify({ total: found.size, translated: found.size - missing.length, missing: missing.length }, null, 2));
for (const [text, record] of missing) {
  console.log(JSON.stringify({ text, files: [...record.files], count: record.count }));
}

if (process.argv.includes("--all")) {
  for (const [text, record] of found) {
    console.log(JSON.stringify({
      text,
      translation: caseTranslations[text] || translations[text] || null,
      files: [...record.files],
    }));
  }
}
