// Portfolio mobile version from Figma file 197KqVv6GjBDHHypLH55K9, frame #365:2946.
// Canvas 375x999. Chip markup preserves the empty black pill used by FloatChips for links and animation.
export const portfolioMobileH = 1235;

const chip = (
  x: number,
  y: number,
  w: number,
  text: string,
  textX: number,
  textY: number,
  circleX: number,
  circleY: number,
  accent: string
) => `
<div data-float-chip="true" style="position:absolute;left:${x}px;top:${y}px;width:${w}px;height:33.52px">
  <div style="width:${w}px;height:33.52px;border-radius:99px;background:#1C1C1C;position:absolute;left:0px;top:0px"></div>
  <div layer-name="${text}" style="color:#FFF;font-family:Inter;font-size:23.359px;font-style:normal;font-weight:400;line-height:86%;letter-spacing:-1.168px;text-transform:uppercase;position:absolute;left:${textX - x}px;top:${textY - y}px;height:21px;white-space:nowrap"><span style="font-family:Inter, -apple-system, Roboto, Helvetica, sans-serif;font-weight:400;font-size:23.359px;color:rgba(255,255,255,1)">${text}</span></div>
  <div style="width:27.23px;height:27.23px;border-radius:50%;background:#FFF;box-shadow:inset 0 0 4px ${accent};position:absolute;left:${circleX - x}px;top:${circleY - y}px"></div>
  <div style="color:#1C1C1C;font-family:Inter;font-size:23.359px;font-style:normal;font-weight:400;line-height:86%;letter-spacing:-1.168px;text-transform:uppercase;position:absolute;left:${circleX - x + 5.8}px;top:${circleY - y + 2.1}px;width:16px;height:21px;white-space:nowrap"><span style="font-family:Inter, -apple-system, Roboto, Helvetica, sans-serif;font-weight:400;font-size:23.359px;color:rgba(28,28,28,1)">+</span></div>
</div>`;

export const portfolioMobileHtml = `<div style="position:absolute;left:0;top:0;width:375px;height:1235px;background:#FFF;overflow:visible">
<div layer-name="доказательства эффективности нашей работы" style="width:326px;color:#272727;font-family:Coolvetica;font-size:24px;font-style:normal;font-weight:400;line-height:100%;text-transform:uppercase;position:absolute;left:20px;top:70px;height:72px"><span style="font-family:Coolvetica, -apple-system, Roboto, Helvetica, sans-serif;font-weight:400;font-size:24px;color:rgba(39,39,39,1)">доказательства эффективности нашей работы</span></div>
<div layer-name="кейсы в различных нишах" style="width:153px;color:#9A9895;text-align:justify;font-family:Inter;font-size:13px;font-style:normal;font-weight:400;line-height:86%;letter-spacing:-0.65px;text-transform:lowercase;position:absolute;left:20px;top:152px;height:11px;white-space:nowrap"><span style="font-family:Inter, -apple-system, Roboto, Helvetica, sans-serif;font-weight:400;font-size:13px;color:rgba(154,152,149,1)">кейсы в различных нишах</span></div>
<img layer-name="3D Abstract Shape (11) 1" style="width:533.56px;height:533.99px;max-width:none;object-fit:contain;position:absolute;left:-295px;top:697px" src="/blk/figma-mobile/mobile-portfolio-shape-large.avif" alt="" />
<img layer-name="Abstract 3D Shapes TG@Jam_Mockup96 1" style="width:142.72px;height:142.72px;object-fit:contain;position:absolute;left:211px;top:381px" src="/blk/figma-mobile/mobile-portfolio-shape-small.avif" alt="" />
${chip(207.44, 299.75, 147.9, "HoReCa", 220.01, 306.45, 324.76, 302.68, "#FFAD19")}
${chip(198.45, 216, 156.7, "Tourism", 211.86, 222.7, 324.57, 218.93, "#F55D1C")}
${chip(90.79, 257.87, 264.38, "Cars & equipment", 103.36, 264.58, 324.58, 260.81, "#90BEE9")}
${chip(20, 365.55, 140.78, "Beauty", 33.41, 372.26, 130.19, 368.49, "#FFAD19")}
${chip(20, 407.43, 148.32, "Fashion", 32.57, 414.13, 137.74, 410.36, "#8992E4")}
${chip(20, 449.3, 279.05, "Sport & Education", 32.57, 456.01, 268.46, 452.24, "#90BEE9")}
${chip(20, 803.25, 191.06, "Real Estate", 32.57, 809.95, 180.47, 806.18, "#8992E4")}
${chip(21, 761.37, 151.67, "Experts", 33.15, 768.08, 142.08, 764.31, "#F55D1C")}
${chip(189.49, 556.98, 165.92, "Product", 204.58, 563.69, 324.83, 559.92, "#8992E4")}
${chip(130.67, 653.7, 138.69, "Events", 142.82, 660.4, 238.77, 656.63, "#FFAD19")}
<a href="/#kontakty" style="display:flex;width:108.94px;height:19.72px;justify-content:center;align-items:center;border-radius:29.225px;background:linear-gradient(90deg, #FFAD19 0%, #8992E4 100%);position:absolute;left:246px;top:909px;text-decoration:none"><span style="font-family:Inter, -apple-system, Roboto, Helvetica, sans-serif;font-weight:400;font-size:11.83px;line-height:86%;letter-spacing:-0.592px;color:#FFF;white-space:nowrap">Оставить заявку</span></a>
</div>`;
