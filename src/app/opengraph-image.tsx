import { ImageResponse } from "next/og";

export const alt = "I AM AGENCY - SMM-агентство полного цикла";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "58px 66px",
          background: "#ffffff",
          color: "#1c1c1c",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 260,
              height: 58,
              borderRadius: 30,
              background: "#90bee9",
              color: "#ffffff",
              fontSize: 28,
            }}
          >
            I AM AGENCY
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <div style={{ width: 72, height: 72, background: "#ffad19" }} />
            <div style={{ width: 72, height: 72, background: "#8992e4" }} />
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 100, fontWeight: 700, lineHeight: 0.92, textTransform: "uppercase" }}>
            SMM-агентство
          </div>
          <div style={{ fontSize: 100, fontWeight: 700, lineHeight: 0.92, textTransform: "uppercase" }}>
            полного цикла
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 25 }}>
          <span>Стратегия · контент · продвижение</span>
          <span>iamagency.su</span>
        </div>
      </div>
    ),
    size,
  );
}
