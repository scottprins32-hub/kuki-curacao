import { ImageResponse } from "next/og";
import { ogFont } from "@/data/ogFont";
import { drops } from "@/data/drops";

export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Kuki Curaçao";

export default async function OG() {
  const font = await ogFont();
  const shots = drops.filter((d) => d.image).slice(0, 4);
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#f3f4ef", color: "#121311", fontFamily: "Bricolage, Arial, sans-serif" }}>
        <div style={{ display: "flex", width: 640, height: 630 }}>
          {shots.map((d) => (
            <img key={d.slug} src={d.image} alt="" width={160} height={630} style={{ width: 160, height: 630, objectFit: "cover" }} />
          ))}
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: 52 }}>
          <div style={{ fontSize: 20, letterSpacing: 4, color: "#3d6a1d" }}>COOKIE · COFFEE · CLOTHING</div>
          <div style={{ fontSize: 96, fontWeight: 800, lineHeight: 0.92, letterSpacing: -3, marginTop: 16 }}>KUKI CURAÇAO</div>
          <div style={{ fontSize: 26, marginTop: 20, color: "#4b4e47" }}>Every drop, on the cup. Mambo Beach Boulevard, Willemstad.</div>
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "Bricolage", data: font, weight: 800, style: "normal" }] }
  );
}
