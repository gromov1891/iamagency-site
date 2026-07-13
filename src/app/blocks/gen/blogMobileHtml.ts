// Blog mobile version from Figma file 197KqVv6GjBDHHypLH55K9, frame #365:2603.
export const blogMobileH = 913;

const card = (x: number, y: number, img: string, text: string, textH = 63) => `
<div style="width:228px;height:143.7px;filter:drop-shadow(0 9.758px 16.728px rgba(0,0,0,.2));position:absolute;left:${x}px;top:${y}px">
  <div style="width:228px;height:143.7px;border-radius:8.784px;background:#FFF;box-shadow:0 2.169px 2.169px 0 rgba(28,28,28,.76);position:absolute;left:0;top:0"></div>
  <img style="width:111.06px;height:138.64px;border-radius:8.784px;position:absolute;left:114.26px;top:2.65px;object-fit:cover" src="${img}" alt="" />
  <div style="width:97.49px;color:#1C1C1C;font-family:Inter;font-size:10.59px;font-weight:400;line-height:86%;letter-spacing:-0.53px;background:linear-gradient(180deg,#1C1C1C 0%,#4F4F4F 50%,#E4E1E1 100%);background-clip:text;-webkit-background-clip:text;-webkit-text-fill-color:transparent;position:absolute;left:6.2px;top:49.26px;height:${textH}px"><span style="font-family:Inter, -apple-system, Roboto, Helvetica, sans-serif;font-weight:600;font-size:10.59px;color:#1C1C1C">${text}</span></div>
  <div style="width:35.4px;height:10.43px;border-radius:5.92px;background:linear-gradient(180deg,#8992E4 0%,#FFAD19 100%);position:absolute;left:68.29px;top:127.67px"></div>
  <div style="color:#FFF;font-family:Inter;font-size:5.85px;font-weight:400;line-height:86%;letter-spacing:-0.292px;text-transform:uppercase;position:absolute;left:71.12px;top:130.49px;width:22px;height:5px;white-space:nowrap"><span style="font-family:Inter, -apple-system, Roboto, Helvetica, sans-serif;font-weight:400;font-size:5.85px;color:#FFF">читать</span></div>
  <div style="color:#FFF;font-family:Inter;font-size:8.38px;font-weight:400;line-height:86%;letter-spacing:-0.419px;text-transform:uppercase;position:absolute;left:92.92px;top:128.28px;width:8.42px;height:7.21px;white-space:nowrap"><span style="font-family:Inter, -apple-system, Roboto, Helvetica, sans-serif;font-weight:400;font-size:8.38px;color:#FFF">↙</span></div>
  <div style="width:23.09px;height:9.05px;border-radius:5.142px;background:#CEE3A7;position:absolute;left:80.6px;top:8.21px"></div>
  <div style="color:#749835;font-family:Inter;font-size:5.142px;font-weight:400;line-height:86%;letter-spacing:-0.257px;text-transform:uppercase;position:absolute;left:83.32px;top:10.47px;width:18px;height:5px;white-space:nowrap"><span style="font-family:Inter, -apple-system, Roboto, Helvetica, sans-serif;font-weight:400;font-size:5.142px;color:#749835">новое</span></div>
  <div style="width:27.19px;height:27.19px;border-radius:50%;background:#1C1C1C;position:absolute;left:6.2px;top:8.21px"></div>
  <div style="color:#FFF;font-family:Inter;font-size:8.37px;font-weight:600;line-height:86%;letter-spacing:-0.35px;position:absolute;left:9.28px;top:17.44px;width:20.52px;height:9.46px;white-space:nowrap">iam</div>
</div>`;

const chip = (x: number, y: number, w: number, text: string, textW: number, accent: string) => `
<div style="width:${w}px;height:20.9px;position:absolute;left:${x}px;top:${y}px">
  <div style="width:${w}px;height:20.9px;border-radius:25.57px;background:#1C1C1C;position:absolute;left:0;top:0"></div>
  <div style="color:#FFF;font-family:Inter;font-size:14.4px;font-weight:400;line-height:86%;letter-spacing:-0.72px;text-transform:uppercase;position:absolute;left:7.49px;top:4.13px;width:${textW}px;height:12px;white-space:nowrap"><span style="font-family:Inter, -apple-system, Roboto, Helvetica, sans-serif;font-weight:400;font-size:14.4px;color:#FFF">${text}</span></div>
  <div style="width:16.8px;height:16.8px;border-radius:50%;background:#FFF;box-shadow:inset 0 0 0 1.35px ${accent};position:absolute;left:${w - 18.91}px;top:1.99px"></div>
  <div style="color:#1C1C1C;font-family:Inter;font-size:14.4px;font-weight:400;line-height:86%;letter-spacing:-0.72px;text-transform:uppercase;position:absolute;left:${w - 15.29}px;top:3.28px;width:10px;height:12px;white-space:nowrap"><span style="font-family:Inter, -apple-system, Roboto, Helvetica, sans-serif;font-weight:400;font-size:14.4px;color:#1C1C1C">+</span></div>
</div>`;

export const blogMobileHtml = `<div style="position:absolute;left:0;top:0;width:375px;height:913px;background:#FFF;overflow:visible">
<div layer-name="Блог" style="color:#1C1C1C;font-family:Coolvetica;font-size:27.091px;font-weight:400;line-height:86%;text-transform:uppercase;position:absolute;left:20px;top:49px;width:62px;height:23px;white-space:nowrap"><span style="font-family:Coolvetica, -apple-system, Roboto, Helvetica, sans-serif;font-weight:400;font-size:27.091px;color:#1C1C1C">Блог</span></div>
${card(127, 251, "/blk/blog/0b713db08b53.webp", "Что реально влияет на продажи в 2026<br/><br/>В 2026 продажи больше не зависят только от продукта. Сильный продукт...")}
${card(20, 94, "/blk/blog/96fe8ff810d3.webp", "Claude для бизнеса простым языком<br/><br/>ИИ перестаёт быть просто «чатом для вопросов». В 2026 году такие...")}
${card(20, 408, "/blk/blog/e7fa50c7bae4.webp", "Instagram больше не хочет, чтобы вы росли по старым правилам<br/><br/>За последние месяцы многие бизнесы начали...", 72)}
${card(127, 565, "/blk/blog/f41a088987f8.webp", "4 сервиса для создания визуала<br/><br/>Хороший визуал больше не требует сложного продакшена...")}
<img layer-name="30Файл 1" style="width:183px;height:183px;object-fit:contain;position:absolute;left:278px;top:425px" src="/blk/blog/0b27b0cd1873.webp" alt="" />
<img layer-name="Abstract 3D Shapes TG@Jam_Mockup51 1" style="width:199.54px;height:199.54px;object-fit:contain;position:absolute;left:-74px;top:190px" src="/blk/blog/7e8e72962934.webp" alt="" />
<div layer-name="Категории" style="color:#9A9895;text-align:justify;font-family:Inter;font-size:13px;font-weight:400;line-height:86%;letter-spacing:-0.65px;text-transform:uppercase;position:absolute;left:20px;top:731px;width:75px;height:12px;white-space:nowrap"><span style="font-family:Inter, -apple-system, Roboto, Helvetica, sans-serif;font-weight:400;font-size:13px;color:#9A9895">Категории</span></div>
${chip(20, 763.83, 65.68, "смм", 35, "#8992E4")}
${chip(20, 793.18, 113.94, "маркетинг", 83, "#FFAD19")}
${chip(186.83, 822.37, 113.94, "нейросети", 84, "#FFAD19")}
${chip(186.83, 763.83, 84.09, "визуал", 54, "#8992E4")}
${chip(186.83, 793.01, 168.17, "социальные сети", 141, "#FF6B3D")}
${chip(20, 822.54, 137.82, "продвижение", 107, "#90BEE9")}
</div>`;
