import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#00784F",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", fontSize: 96, fontWeight: 800, color: "#FFFFFF", letterSpacing: "-0.04em" }}>
          <span>madeleg</span>
          <span style={{ color: "#D98324" }}>.</span>
        </div>
        <div style={{ marginTop: 24, fontSize: 32, color: "rgba(255,255,255,0.85)", fontWeight: 500 }}>
          Changez d&apos;assurance emprunteur, sans quitter votre banque
        </div>
      </div>
    ),
    { ...size }
  );
}
