import { ImageResponse } from "next/og";

export const alt = "make me cool: one story a day, something to say out loud";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#04363A",
          padding: 64,
          color: "#FAFCFB",
        }}
      >
        <div style={{ display: "flex", fontSize: 38, fontWeight: 700 }}>make me cool</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 96, fontWeight: 700, lineHeight: 1.02 }}>one story a day.</div>
          <div style={{ display: "flex", fontSize: 96, fontWeight: 700, lineHeight: 1.02, color: "#FFCC00" }}>something to say.</div>
          <div style={{ display: "flex", fontSize: 34, marginTop: 28, opacity: 0.88 }}>
            five minutes, four questions, one line you can say out loud.
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#FFCC00" }}>free · no sign-up · from the home of the abstract room</div>
      </div>
    ),
    { ...size },
  );
}
