// Патчит хелпер avatar(...) в модулях кейсов: вместо серого кружка вставляет
// круглое фото профиля (когда картинка есть в _imageMap.json), сохраняя кольцо.
const fs = require("fs"), path = require("path");
const GEN = path.resolve(__dirname, "..", "src/app/keisy/gen");

const avatarRe =
  /const avatar = \(([\s\S]*?)\) =>\s*`<div style="position:absolute;left:\$\{x - ring\}px;[\s\S]*?data-figma-node="\$\{node\}"\$\{ref \? ` data-image-ref="\$\{ref\}"` : ""\}><\/div>`;/;

const newAvatar =
  "const avatar = ($1) => {\n" +
  "  const ring_div = `<div style=\"position:absolute;left:${x - ring}px;top:${y - ring}px;width:${d + 2 * ring}px;height:${d + 2 * ring}px;border-radius:50%;background:${RING}\"></div>`;\n" +
  "  const _f = (IMGMAP as Record<string, string>)[node + \"|\" + (ref || \"\")];\n" +
  "  const inner = _f\n" +
  "    ? `<img src=\"/blk/keisy/${_f}\" alt=\"\" loading=\"lazy\" style=\"position:absolute;left:${x}px;top:${y}px;width:${d}px;height:${d}px;border-radius:50%;object-fit:cover;border:4px solid #FFF;box-sizing:border-box\" />`\n" +
  "    : `<div style=\"position:absolute;left:${x}px;top:${y}px;width:${d}px;height:${d}px;border-radius:50%;background:${PH};border:4px solid #FFF;box-sizing:border-box\" data-figma-node=\"${node}\"></div>`;\n" +
  "  return ring_div + inner;\n" +
  "};";

let patched = 0;
for (const f of fs.readdirSync(GEN).filter((x) => x.endsWith("Html.ts"))) {
  const p = path.join(GEN, f);
  let s = fs.readFileSync(p, "utf8");
  if (!avatarRe.test(s)) continue;
  const args = s.match(avatarRe)[1];
  if (!s.includes("_imageMap.json")) s = 'import IMGMAP from "./_imageMap.json";\n' + s;
  s = s.replace(avatarRe, newAvatar.replace("$1", args));
  fs.writeFileSync(p, s);
  patched++;
  console.log("avatar patched:", f);
}
console.log("ИТОГО:", patched);
