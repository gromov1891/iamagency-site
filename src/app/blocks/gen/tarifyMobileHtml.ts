// Mobile tariffs: large staggered cards for a readable one-column flow.
export const tarifyMobileH = 1120;

type Card = {
  x: number;
  y: number;
  title: string;
  price: string;
  description: string;
  gradient: string;
  href: string;
  arrow: "left" | "right";
};

const cards: Card[] = [
  {
    x: 18,
    y: 54,
    title: "&#1044;&#1042;&#1048;&#1046;&#1045;&#1053;&#1048;&#1045;",
    price: "140 000&#8381;",
    description: "&#1044;&#1083;&#1103; &#1090;&#1077;&#1093;, &#1082;&#1090;&#1086; &#1093;&#1086;&#1095;&#1077;&#1090; &#1087;&#1088;&#1080;&#1089;&#1091;&#1090;&#1089;&#1090;&#1074;&#1086;&#1074;&#1072;&#1090;&#1100; &#1074; &#1084;&#1077;&#1076;&#1080;&#1072;&#1087;&#1086;&#1083;&#1077; &#1080; &#1080;&#1084;&#1077;&#1090;&#1100; &#1074;&#1080;&#1079;&#1091;&#1072;&#1083;, &#1076;&#1086;&#1089;&#1090;&#1086;&#1081;&#1085;&#1099;&#1081; &#1089;&#1074;&#1086;&#1077;&#1075;&#1086; &#1073;&#1088;&#1077;&#1085;&#1076;&#1072;.",
    gradient: "linear-gradient(180deg,#FFAD19 0%,#90BEE9 88%)",
    href: "/tarify/dvizhenie",
    arrow: "right",
  },
  {
    x: 97,
    y: 355,
    title: "&#1055;&#1056;&#1054;&#1056;&#1067;&#1042;",
    price: "230 000&#8381;",
    description: "&#1044;&#1083;&#1103; &#1090;&#1077;&#1093;, &#1082;&#1090;&#1086; &#1093;&#1086;&#1095;&#1077;&#1090; &#1085;&#1072;&#1088;&#1072;&#1097;&#1080;&#1074;&#1072;&#1090;&#1100; &#1086;&#1093;&#1074;&#1072;&#1090;&#1099;, &#1074;&#1086;&#1074;&#1083;&#1077;&#1082;&#1072;&#1090;&#1100; &#1072;&#1091;&#1076;&#1080;&#1090;&#1086;&#1088;&#1080;&#1102; &#1080; &#1087;&#1086;&#1083;&#1091;&#1095;&#1072;&#1090;&#1100; &#1083;&#1080;&#1076;&#1099;.",
    gradient: "linear-gradient(180deg,#8992E4 0%,#FFAD19 100%)",
    href: "/tarify/proryv",
    arrow: "left",
  },
  {
    x: 18,
    y: 656,
    title: "&#1058;&#1056;&#1048;&#1059;&#1052;&#1060;",
    price: "450 000&#8381;",
    description: "&#1044;&#1083;&#1103; &#1090;&#1077;&#1093;, &#1082;&#1090;&#1086; &#1093;&#1086;&#1095;&#1077;&#1090; &#1074;&#1099;&#1074;&#1077;&#1089;&#1090;&#1080; &#1082;&#1086;&#1085;&#1090;&#1077;&#1085;&#1090; &#1085;&#1072; &#1085;&#1086;&#1074;&#1099;&#1081; &#1091;&#1088;&#1086;&#1074;&#1077;&#1085;&#1100; &#1080; &#1087;&#1088;&#1080;&#1074;&#1083;&#1077;&#1082;&#1072;&#1090;&#1100; &#1082;&#1083;&#1080;&#1077;&#1085;&#1090;&#1086;&#1074; &#1085;&#1077; &#1090;&#1086;&#1083;&#1100;&#1082;&#1086; &#1095;&#1077;&#1088;&#1077;&#1079; &#1089;&#1086;&#1094;&#1089;&#1077;&#1090;&#1080;.",
    gradient: "linear-gradient(180deg,#F55D1C 0%,#90BEE9 100%)",
    href: "/tarify/triumf",
    arrow: "right",
  },
];

function card(item: Card) {
  const arrow = item.arrow === "right" ? "&#8600;" : "&#8601;";
  return `<a href="${item.href}" aria-label="${item.title}" style="position:absolute;left:${item.x}px;top:${item.y}px;width:260px;height:330px;display:block;border-radius:20px;background:rgba(255,255,255,.27);box-shadow:2px 3px 2px rgba(255,255,255,.48) inset;text-decoration:none;color:#FFF;overflow:hidden">
    <div style="position:absolute;left:6px;top:6px;width:248px;height:128px;border-radius:15px;background:${item.gradient}"></div>
    <div style="position:absolute;left:16px;top:20px;font-family:Inter,sans-serif;font-size:34px;line-height:1;text-transform:uppercase;white-space:nowrap">${item.title}</div>
    <div style="position:absolute;right:18px;top:68px;font-family:Inter,sans-serif;font-size:58px;line-height:1">${arrow}</div>
    <div style="position:absolute;left:20px;top:158px;color:#C5C5C5;font:12px/1 Inter,sans-serif">&#1086;&#1090;</div>
    <div style="position:absolute;left:20px;top:177px;font-family:Inter,sans-serif;font-size:34px;line-height:1;white-space:nowrap">${item.price}</div>
    <div style="position:absolute;left:20px;top:222px;width:220px;color:#E1E1E1;font-family:Inter,sans-serif;font-size:12px;line-height:1.08">${item.description}</div>
    <div style="position:absolute;left:6px;bottom:6px;width:248px;height:38px;display:flex;align-items:center;justify-content:center;border-radius:14px;background:rgba(0,0,0,.46);font-family:Inter,sans-serif;font-size:13px">&#1087;&#1086;&#1076;&#1088;&#1086;&#1073;&#1085;&#1077;&#1077;</div>
  </a>`;
}

export const tarifyMobileHtml = `<div style="position:absolute;left:0;top:0;width:375px;height:${tarifyMobileH}px;background:#1C1C1C;overflow:visible">
  <div style="position:absolute;left:18px;top:10px;color:#FFF;font-family:Coolvetica,Inter,sans-serif;font-size:30px;line-height:1;text-transform:uppercase">&#1058;&#1040;&#1056;&#1048;&#1060;&#1067;</div>
  ${cards.map(card).join("")}
  <div style="position:absolute;left:18px;top:1023px;color:#FFF;font-family:Inter,sans-serif;font-size:13px">&#1059;&#1079;&#1085;&#1072;&#1081;&#1090;&#1077;, &#1082;&#1072;&#1082;&#1086;&#1081; &#1090;&#1072;&#1088;&#1080;&#1092; &#1074;&#1072;&#1084; &#1087;&#1086;&#1076;&#1093;&#1086;&#1076;&#1080;&#1090;</div>
  <a href="/#kontakty" style="position:absolute;left:18px;top:1052px;width:339px;height:45px;display:flex;align-items:center;justify-content:center;border-radius:24px;background:#FFF;color:#1C1C1C;text-decoration:none;font-family:Inter,sans-serif;font-size:17px">&#1047;&#1072;&#1087;&#1080;&#1089;&#1072;&#1090;&#1100;&#1089;&#1103; &#1085;&#1072; &#1082;&#1086;&#1085;&#1089;&#1091;&#1083;&#1100;&#1090;&#1072;&#1094;&#1080;&#1102;</a>
</div>`;
