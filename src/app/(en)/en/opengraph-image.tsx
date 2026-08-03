import { ImageResponse } from "next/og";

export const alt = "I AM AGENCY — full-service social media agency";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function EnglishOpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "58px 66px", background: "#151515", color: "#fff", fontFamily: "Arial, sans-serif" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 260, height: 58, borderRadius: 30, background: "linear-gradient(90deg,#90BEE9,#8992E4)", fontSize: 28 }}>I AM AGENCY</div>
        <div style={{ display: "flex", fontSize: 22, letterSpacing: 3 }}>EN / GLOBAL</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", fontSize: 93, fontWeight: 700, lineHeight: .9, letterSpacing: -5 }}><span>FULL-SERVICE</span><span>SOCIAL MEDIA</span><span>AGENCY</span></div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "#bbb" }}><span>STRATEGY · CONTENT · GROWTH</span><span>iamagency.su/en</span></div>
    </div>,
    size,
  );
}
