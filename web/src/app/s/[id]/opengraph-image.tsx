import { ImageResponse } from "next/og";
import { stories } from "@/data/stories";

export const alt = "a story from make me cool";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return stories.map((s) => ({ id: s.id }));
}

export default async function Image({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const s = stories.find((x) => x.id === id) ?? stories[0];
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
          <div style={{ display: "flex", fontSize: 30, color: "#FFCC00", marginBottom: 18 }}>{s.fields.join("  +  ")}</div>
          <div style={{ display: "flex", fontSize: 82, fontWeight: 700, lineHeight: 1.05 }}>{s.title}</div>
          <div style={{ display: "flex", fontSize: 34, marginTop: 26, opacity: 0.88 }}>{s.hook}</div>
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#FFCC00" }}>5 minutes · free · from the home of the abstract room</div>
      </div>
    ),
    { ...size },
  );
}
