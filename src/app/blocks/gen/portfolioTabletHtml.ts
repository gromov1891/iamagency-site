// Portfolio — tablet version from Figma file 197KqVv6GjBDHHypLH55K9, frame #354:2454.
// Canvas 768x941. The niche chips keep the same inner structure FloatChips uses for links and float animation.
export const portfolioTabletH = 941;

const chip = (x: number, y: number, w: number, text: string, textW: number, accent: string) => `
<div style="position:absolute;left:${x}px;top:${y}px;width:${w}px;height:46.315px">
  <div style="width:${w}px;height:46.315px;border-radius:99px;background:#1C1C1C;position:absolute;left:0px;top:0px"></div>
  <div layer-name="${text}" style="color:#FFF;font-family:Inter;font-size:32.276px;font-style:normal;font-weight:400;line-height:86%;letter-spacing:-1.614px;text-transform:uppercase;position:absolute;left:${text === "Beauty" ? 18.526 : text === "Product" ? 20.842 : text === "Events" || text === "Experts" ? 16.789 : text === "Cars & equipment" ? 17.368 : 17.368}px;top:9.263px;width:${textW}px;height:28px;white-space:nowrap"><span style="font-family:Inter, -apple-system, Roboto, Helvetica, sans-serif;font-weight:400;font-size:32px;color:rgba(255,255,255,1)">${text}</span></div>
  <div style="width:37.631px;height:37.631px;border-radius:50%;background:#FFF;box-shadow:inset 0 0 4px ${accent};position:absolute;left:${w - 42.263}px;top:4.053px"></div>
  <div style="color:#1C1C1C;font-family:Inter;font-size:32.276px;font-style:normal;font-weight:400;line-height:86%;letter-spacing:-1.614px;text-transform:uppercase;position:absolute;left:${w - 34.158}px;top:6.948px;width:22px;height:28px;white-space:nowrap"><span style="font-family:Inter, -apple-system, Roboto, Helvetica, sans-serif;font-weight:400;font-size:32px;color:rgba(28,28,28,1)">+</span></div>
</div>`;

export const portfolioTabletHtml = `<div style="position:absolute;left:0;top:0;width:768px;height:941px;background:#FFF;overflow:visible">
<div layer-name="доказательства эффективности нашей работы" style="width:602px;color:#272727;font-family:Coolvetica;font-size:36px;font-style:normal;font-weight:400;line-height:100%;text-transform:uppercase;position:absolute;left:40px;top:57px;height:72px"><span style="font-family:Coolvetica, -apple-system, Roboto, Helvetica, sans-serif;font-weight:400;font-size:36px;color:rgba(39,39,39,1)">доказательства эффективности нашей работы</span></div>
<div layer-name="кейсы в различных нишах" style="width:235px;color:#9A9895;text-align:justify;font-family:Inter;font-size:20px;font-style:normal;font-weight:400;line-height:86%;letter-spacing:-1px;text-transform:lowercase;position:absolute;left:40px;top:147px;height:17px;white-space:nowrap"><span style="font-family:Inter, -apple-system, Roboto, Helvetica, sans-serif;font-weight:400;font-size:20px;color:rgba(154,152,149,1)">кейсы в различных нишах</span></div>
<img layer-name="Abstract 3D Shapes TG@Jam_Mockup96 1" style="width:208.522px;height:208.522px;object-fit:contain;position:absolute;left:444px;top:364px" src="/blk/portfolio/a255084892e1.webp" alt="" />
<img layer-name="3D Abstract Shape (11) 1" style="width:438px;height:438.355px;object-fit:contain;position:absolute;left:-47px;top:733px" src="/blk/portfolio/spiral-full.webp" alt="" />
${chip(40, 300, 194.525, "Beauty", 119, "#FFAD19")}
${chip(521.243, 378.075, 204.367, "HoReCa", 126, "#FFAD19")}
${chip(40, 837.379, 263.998, "Real Estate", 198, "#8992E4")}
${chip(510.405, 222, 216.525, "Tourism", 138, "#F55D1C")}
${chip(499, 589, 229.262, "Product", 148, "#8992E4")}
${chip(295, 687, 191.63, "Events", 118, "#FFAD19")}
${chip(40, 759.341, 209.578, "Experts", 133, "#F55D1C")}
${chip(363, 300.038, 365.313, "Cars & equipment", 291, "#90BEE9")}
${chip(40, 378.038, 204.946, "Fashion", 131, "#8992E4")}
${chip(40, 456.075, 385.576, "Sport & Education", 308, "#90BEE9")}
<a href="/#kontakty" style="display:flex;width:191.226px;height:34.611px;justify-content:center;align-items:center;border-radius:51.288px;background:linear-gradient(90deg, #FFAD19 0%, #8992E4 100%);position:absolute;left:537px;top:849px;text-decoration:none"><span style="font-family:Inter, -apple-system, Roboto, Helvetica, sans-serif;font-weight:400;font-size:21px;line-height:86%;letter-spacing:-1.038px;color:#FFF;white-space:nowrap">Оставить заявку</span></a>
</div>`;
