import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "baseline",
          justifyContent: "center",
          backgroundColor: "#00784F",
          fontFamily: "sans-serif",
          fontSize: 22,
          fontWeight: 800,
          color: "#FFFFFF",
          letterSpacing: "-0.04em",
        }}
      >
        <span>m</span>
        <span style={{ color: "#D98324" }}>.</span>
      </div>
    ),
    { ...size }
  );
}
