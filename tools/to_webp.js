// Конвертирует все PNG кейсов (public/blk/keisy) и спираль в WebP (легче в разы),
// удаляет исходные PNG, перегенерирует _imageMap.json на .webp и заменяет
// ссылки .png -> .webp во всех модулях кейсов и в portfolioHtml.
const fs = require("fs"), path = require("path");
const sharp = require("sharp");

const ROOT = path.resolve(__dirname, "..");
const KEISY = path.join(ROOT, "public/blk/keisy");
const PORT = path.join(ROOT, "public/blk/portfolio");
const GEN = path.join(ROOT, "src/app/keisy/gen");

async function convertDir(dir, onlyBase) {
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".png") && (!onlyBase || onlyBase.includes(f)));
  let n = 0;
  for (const f of files) {
    const src = path.join(dir, f);
    const out = src.slice(0, -4) + ".webp";
    if (!fs.existsSync(out)) {
      try {
        await sharp(src).webp({ quality: 82 }).toFile(out);
      } catch (e) { console.log("! fail", f, e.message); continue; }
    }
    fs.unlinkSync(src);
    n++;
  }
  return n;
}

(async () => {
  const a = await convertDir(KEISY);
  console.log("keisy: сконвертировано и удалён png у", a);
  const b = await convertDir(PORT, ["spiral-full.png"]);
  console.log("portfolio spiral:", b);

  // перегенерировать карту на .webp (по фактически существующим webp)
  const have = new Set(fs.readdirSync(KEISY).filter((f) => f.endsWith(".webp")));
  const map = {};
  for (const mf of fs.readdirSync(GEN).filter((f) => f.endsWith(".images.json"))) {
    for (const e of JSON.parse(fs.readFileSync(path.join(GEN, mf), "utf8"))) {
      if (!e.imageRef) continue;
      const base = e.fileName.endsWith(".png") ? e.fileName.slice(0, -4) : e.fileName;
      const fn = base + (e.suffix ? "-" + e.suffix : "") + ".webp";
      if (have.has(fn)) map[e.nodeId + "|" + e.imageRef] = fn;
    }
  }
  fs.writeFileSync(path.join(GEN, "_imageMap.json"), JSON.stringify(map));
  console.log("в карте (webp):", Object.keys(map).length);

  // заменить .png -> .webp в ссылках модулей и портфолио
  let touched = 0;
  const files = [
    ...fs.readdirSync(GEN).filter((f) => f.endsWith("Html.ts")).map((f) => path.join(GEN, f)),
    path.join(ROOT, "src/app/blocks/gen/portfolioHtml.ts"),
  ];
  for (const p of files) {
    let s = fs.readFileSync(p, "utf8");
    const s2 = s.replace(/(\/blk\/keisy\/[^"'\s]+?)\.png/g, "$1.webp")
                .replace(/(\/blk\/portfolio\/spiral-full)\.png/g, "$1.webp");
    if (s2 !== s) { fs.writeFileSync(p, s2); touched++; }
  }
  console.log("файлов с обновлёнными ссылками:", touched);
})();
