// Мем-блок «наведи мышкой» (Figma 78:1000 default / 78:1013 hover).
// Две карточки. При наведении на карточку заголовок меняется (прическа→агентство)
// и появляется облачко (I AM AGENCY / МАРКЕТИНГ СВОИМИ СИЛАМИ). Чистый CSS-hover.
// Эмодзи и декор-фигура — картинки-оригиналы из Figma. Холст 1440×595.
export const memeH = 595;
export const memeHtml = `<div style="position:absolute;left:0;top:0;width:1440px;height:595px;background:#FFF;overflow:visible">
<style>
.meme-card{cursor:pointer}
.meme-h{opacity:0;pointer-events:none;transition:opacity .25s ease}
.meme-d{transition:opacity .25s ease}
.meme-card:hover .meme-h{opacity:1}
.meme-card:hover .meme-d{opacity:0}
</style>
<img src="/blk/meme/deco.webp?v=2" alt="" style="position:absolute;left:1188px;top:349px;width:409px;height:409px"/>
<div style="position:absolute;left:554px;top:53px;width:332px;text-align:center;color:rgb(106,106,106);font-family:Inter;font-size:25px;line-height:86%;letter-spacing:-0.05em">↓ наведи мышкой на блок ↓</div>
<div style="position:absolute;left:152px;top:111px;width:1137px;height:413px;background:#F0F0F0;border-radius:30px;box-shadow:0 3px 3px rgba(0,0,0,0.12) inset"></div>

<div class="meme-card" style="position:absolute;left:152px;top:111px;width:573px;height:413px">
  <div style="position:absolute;left:8px;top:89px;width:555px;height:311px;border-radius:27px;background:linear-gradient(180deg,#1C1C1C 0%,#F55D1C 100%)"></div>
  <img src="/blk/meme/temple.webp?v=2" alt="" style="position:absolute;left:75px;top:172px;width:177px;height:152px;object-fit:contain"/>
  <img src="/blk/meme/person.webp?v=2" alt="" style="position:absolute;left:322px;top:172px;width:246px;height:211px;object-fit:contain"/>
  <div class="meme-h" style="position:absolute;left:57px;top:131px;width:212px;height:86px;background:#FFF;border-radius:62px;box-shadow:0 4px 10px rgba(0,0,0,0.2);display:flex;align-items:center;justify-content:center;z-index:5"><span style="color:#1C1C1C;font-family:Inter;font-size:25px;letter-spacing:-0.05em">I AM AGENCY</span></div>
  <div class="meme-d" style="position:absolute;left:8px;top:19px;width:555px;text-align:center;color:#1C1C1C;font-family:Inter;font-weight:600;font-size:29px;line-height:86%;letter-spacing:-0.05em;text-transform:uppercase">Прическа, которая нравится девушкам</div>
  <div class="meme-h" style="position:absolute;left:8px;top:19px;width:555px;text-align:center;color:#1C1C1C;font-family:Inter;font-weight:600;font-size:29px;line-height:86%;letter-spacing:-0.05em;text-transform:uppercase">Агентство, которое приносит клиентов</div>
</div>

<div class="meme-card" style="position:absolute;left:725px;top:111px;width:564px;height:413px">
  <div style="position:absolute;left:0px;top:89px;width:555px;height:311px;border-radius:27px;background:linear-gradient(180deg,#F0F0F0 0%,#1C1C1C 100%)"></div>
  <img src="/blk/meme/house.webp?v=2" alt="" style="position:absolute;left:84px;top:172px;width:177px;height:152px;object-fit:contain"/>
  <img src="/blk/meme/person.webp?v=2" alt="" style="position:absolute;left:319px;top:172px;width:246px;height:211px;object-fit:contain"/>
  <div class="meme-h" style="position:absolute;left:70px;top:131px;width:212px;height:86px;background:#1C1C1C;border-radius:62px;box-shadow:0 4px 10px rgba(0,0,0,0.25);display:flex;align-items:center;justify-content:center;z-index:5"><span style="color:#FFF;font-family:Inter;font-size:13px;letter-spacing:-0.05em">МАРКЕТИНГ СВОИМИ СИЛАМИ</span></div>
  <div class="meme-d" style="position:absolute;left:5px;top:21px;width:555px;text-align:center;color:#1C1C1C;font-family:Inter;font-weight:600;font-size:29px;line-height:86%;letter-spacing:-0.05em;text-transform:uppercase">Прическа, которая не нравится девушкам</div>
  <div class="meme-h" style="position:absolute;left:5px;top:21px;width:555px;text-align:center;color:#1C1C1C;font-family:Inter;font-weight:600;font-size:29px;line-height:86%;letter-spacing:-0.05em;text-transform:uppercase">Агентство, которое сливает бюджет</div>
</div>
</div>`;
