// Shkola teaser tablet version from Figma frame 366:6645 (Tablet, 768x669).
export const shkolaTabletH = 669;

const row = (top: number, num: string, title: string, titleW: number) => `
<div style="width:749.41px;height:597.81px;position:absolute;left:19px;top:${top}px">
  <div style="width:700.05px;height:502.64px;border-radius:22.434px;border:1.068px solid #9A9895;box-shadow:0 2.137px 2.137px 0 rgba(0,0,0,.25) inset;position:absolute;left:15.01px;top:0"></div>
  <div style="width:749.41px;height:528.81px;border-radius:22.434px;background:#1C1C1C;position:absolute;left:0;top:69px"></div>
  <div layer-name="${num}" style="color:#9A9895;font-family:Inter;font-size:29.785px;font-weight:400;line-height:86%;letter-spacing:-1.489px;text-transform:uppercase;position:absolute;left:30px;top:19px;width:39px;height:28px;white-space:nowrap"><span style="font-family:Inter, -apple-system, Roboto, Helvetica, sans-serif;font-weight:400;font-size:30px;color:#9A9895">${num}</span></div>
  <div layer-name="${title}" style="color:#FFF;font-family:Inter;font-size:29.785px;font-weight:400;line-height:86%;letter-spacing:-1.489px;text-transform:uppercase;position:absolute;left:79.68px;top:19px;width:${titleW}px;height:28px;white-space:nowrap"><span style="font-family:Inter, -apple-system, Roboto, Helvetica, sans-serif;font-weight:400;font-size:30px;color:#FFF">${title}</span></div>
</div>`;

export const shkolaTabletHtml = `<div style="position:absolute;left:0;top:0;width:768px;height:669px;background:#1C1C1C;overflow:visible">
<img layer-name="55 3" style="width:1215.4px;height:756.36px;position:absolute;left:-423px;top:-459px;object-fit:contain" src="/blk/otzyvy/glass_tablet.png" alt="" />
<div layer-name="обучение профессии с нуля" style="color:#9A9895;font-family:Coolvetica;font-size:36px;font-weight:400;line-height:100%;text-transform:uppercase;position:absolute;left:242px;top:84px;width:486px;height:36px;white-space:nowrap"><span style="font-family:Coolvetica, -apple-system, Roboto, Helvetica, sans-serif;font-weight:400;font-size:36px;color:#9A9895">обучение профессии с нуля</span></div>
<div layer-name="школа SMM" style="color:#FFF;text-align:justify;font-family:Inter;font-size:20px;font-weight:400;line-height:86%;letter-spacing:-1px;text-transform:lowercase;position:absolute;left:624px;top:133px;width:105px;height:17px;white-space:nowrap"><span style="font-family:Inter, -apple-system, Roboto, Helvetica, sans-serif;font-weight:400;font-size:20px;color:#FFF">школа SMM</span></div>
${row(247, "01", "почему наш курс лучший на рынке", 596)}
${row(310, "02", "Истории учеников", 327)}
${row(375, "03", "Кому подойдет", 274)}
${row(441, "04", "Программа", 192)}
<a href="/shkola-smm" style="display:flex;width:313.01px;height:34.72px;justify-content:center;align-items:center;border-radius:51.288px;background:linear-gradient(90deg, #8992E4 0%, #F55D1C 100%);position:absolute;left:421px;top:561px;text-decoration:none">
  <span style="font-family:Inter, -apple-system, Roboto, Helvetica, sans-serif;font-weight:400;font-size:20.767px;line-height:86%;letter-spacing:-1.038px;color:#FFF;white-space:nowrap">Оставить заявку на обучение</span>
</a>
</div>`;
