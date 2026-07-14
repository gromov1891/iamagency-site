// Blog tablet version from Figma frame 366:6737 (768x941).
export const blogTabletH = 941;

const card = (x: number, y: number, img: string, text: string, textH = 91) => `
<div style="width:326.85px;height:206px;filter:drop-shadow(0 14px 24px rgba(0,0,0,.2));position:absolute;left:${x}px;top:${y}px">
  <div style="width:326.85px;height:206px;border-radius:12.597px;background:#FFF;box-shadow:0 3.111px 3.111px 0 rgba(28,28,28,.76);position:absolute;left:0;top:0"></div>
  <img style="width:159.21px;height:198.75px;border-radius:12.597px;position:absolute;left:163.79px;top:3.8px;object-fit:cover" src="${img}" alt="" />
  <div style="width:139.75px;color:#1C1C1C;font-family:Inter;font-size:15.189px;font-weight:400;line-height:86%;letter-spacing:-0.759px;background:linear-gradient(180deg,#1C1C1C 0%,#4F4F4F 50%,#E4E1E1 100%);background-clip:text;-webkit-background-clip:text;-webkit-text-fill-color:transparent;position:absolute;left:8.89px;top:70.61px;height:${textH}px"><span style="font-family:Inter, -apple-system, Roboto, Helvetica, sans-serif;font-weight:600;font-size:15.189px;color:#1C1C1C">${text}</span></div>
  <div style="width:50.75px;height:14.95px;border-radius:8.49px;background:linear-gradient(180deg,#8992E4 0%,#FFAD19 100%);position:absolute;left:97.89px;top:183.02px"></div>
  <div style="color:#FFF;font-family:Inter;font-size:8.391px;font-weight:400;line-height:86%;letter-spacing:-0.42px;text-transform:uppercase;position:absolute;left:101.94px;top:187.07px;width:31px;height:7px;white-space:nowrap"><span style="font-family:Inter, -apple-system, Roboto, Helvetica, sans-serif;font-weight:400;font-size:8.391px;color:#FFF">читать</span></div>
  <div style="color:#FFF;font-family:Inter;font-size:12.024px;font-weight:400;line-height:86%;letter-spacing:-0.601px;text-transform:uppercase;position:absolute;left:133.2px;top:183.89px;width:12.07px;height:10.34px;white-space:nowrap"><span style="font-family:Inter, -apple-system, Roboto, Helvetica, sans-serif;font-weight:400;font-size:12px;color:#FFF">↙</span></div>
  <div style="width:33.1px;height:12.98px;border-radius:7.374px;background:#CEE3A7;position:absolute;left:115.54px;top:11.77px"></div>
  <div style="color:#749835;font-family:Inter;font-size:7.374px;font-weight:400;line-height:86%;letter-spacing:-0.369px;text-transform:uppercase;position:absolute;left:119.44px;top:15.01px;width:25px;height:6px;white-space:nowrap"><span style="font-family:Inter, -apple-system, Roboto, Helvetica, sans-serif;font-weight:400;font-size:7.374px;color:#749835">новое</span></div>
  <div style="width:38.98px;height:38.98px;border-radius:50%;background:#1C1C1C;position:absolute;left:8.89px;top:11.77px"></div>
  <div style="color:#FFF;font-family:Inter;font-size:12px;font-weight:600;line-height:86%;letter-spacing:-0.5px;position:absolute;left:13.3px;top:25px;width:29.42px;height:13.57px;white-space:nowrap">iam</div>
</div>`;

const chip = (x: number, y: number, w: number, text: string, textW: number, accent: string) => `
<div style="width:${w}px;height:31.19px;position:absolute;left:${x}px;top:${y}px">
  <div style="width:${w}px;height:31.19px;border-radius:38.18px;background:#1C1C1C;position:absolute;left:0;top:0"></div>
  <div style="color:#FFF;font-family:Inter;font-size:21.501px;font-weight:400;line-height:86%;letter-spacing:-1.075px;text-transform:uppercase;position:absolute;left:11.18px;top:6.17px;width:${textW}px;height:18px;white-space:nowrap"><span style="font-family:Inter, -apple-system, Roboto, Helvetica, sans-serif;font-weight:400;font-size:21.5px;color:#FFF">${text}</span></div>
  <div style="width:25.07px;height:25.07px;border-radius:50%;background:#FFF;box-shadow:inset 0 0 0 2px ${accent};position:absolute;left:${w - 28.22}px;top:2.97px"></div>
  <div style="color:#1C1C1C;font-family:Inter;font-size:21.501px;font-weight:400;line-height:86%;letter-spacing:-1.075px;text-transform:uppercase;position:absolute;left:${w - 22.82}px;top:4.9px;width:15px;height:18px;white-space:nowrap"><span style="font-family:Inter, -apple-system, Roboto, Helvetica, sans-serif;font-weight:400;font-size:21.5px;color:#1C1C1C">+</span></div>
</div>`;

export const blogTabletHtml = `<div style="position:absolute;left:0;top:0;width:768px;height:941px;background:#FFF;overflow:visible">
<div layer-name="Блог" style="color:#1C1C1C;font-family:Coolvetica;font-size:55.402px;font-weight:400;line-height:86%;text-transform:uppercase;position:absolute;left:40px;top:90px;width:128px;height:48px;white-space:nowrap"><span style="font-family:Coolvetica, -apple-system, Roboto, Helvetica, sans-serif;font-weight:400;font-size:55px;color:#1C1C1C">Блог</span></div>
<img layer-name="30Файл  1" style="width:377.49px;height:377.49px;position:absolute;left:540px;top:550px;object-fit:contain" src="/blk/blog/orange_flower.webp" alt="" />
${card(40, 440.4, "/blk/blog/0b713db08b53.webp", "Что реально влияет на продажи в 2026<br/>В 2026 продажи больше не зависят только от продукта. Сильный продукт...")}
${card(40, 194, "/blk/blog/96fe8ff810d3.webp", "Claude для бизнеса простым языком<br/>ИИ перестаёт быть просто «чатом для вопросов». В 2026 году такие...")}
${card(401.15, 194, "/blk/blog/e7fa50c7bae4.webp", "Instagram больше не хочет, чтобы вы росли по старым правилам<br/>За последние месяцы многие бизнесы начали...", 104)}
${card(401.15, 436.73, "/blk/blog/f41a088987f8.webp", "4 сервиса для создания визуала<br/>Хороший визуал больше не требует сложного продакшена...")}
<div layer-name="Категории" style="color:#9A9895;text-align:justify;font-family:Inter;font-size:20px;font-weight:400;line-height:86%;letter-spacing:-1px;text-transform:uppercase;position:absolute;left:40px;top:702px;width:111px;height:17px;white-space:nowrap"><span style="font-family:Inter, -apple-system, Roboto, Helvetica, sans-serif;font-weight:400;font-size:20px;color:#9A9895">Категории</span></div>
${chip(40, 751, 98.02, "смм", 52, "#8992E4")}
${chip(40, 794.81, 170.06, "маркетинг", 124, "#FFAD19")}
${chip(289, 838.37, 170.06, "нейросети", 125, "#FFAD19")}
${chip(289, 751, 125.5, "визуал", 81, "#8992E4")}
${chip(289, 794.56, 251, "социальные сети", 210, "#FF6B3D")}
${chip(40, 838.63, 205.7, "продвижение", 160, "#90BEE9")}
</div>`;
