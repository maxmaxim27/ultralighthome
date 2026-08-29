import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

export const alt = `${SITE.name} — Immobili curati, ben gestiti`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #1A1815 0%, #2C2A26 100%)",
          color: "#F5F1EA",
          padding: "80px",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            fontSize: 30,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "#7E8A90",
          }}
        >
          {SITE.name}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, lineHeight: 1.05, fontWeight: 300 }}>
            Immobili curati,
          </div>
          <div style={{ fontSize: 84, lineHeight: 1.05, fontWeight: 300 }}>
            ben gestiti.
          </div>
        </div>
        <div style={{ fontSize: 30, color: "#C9C2B6" }}>
          Dolomiti · Verona · Costa Smeralda · Roma
        </div>
      </div>
    ),
    { ...size },
  );
}
