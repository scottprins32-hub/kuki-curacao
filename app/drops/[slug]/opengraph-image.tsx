import { ImageResponse } from "next/og";
import { ogFont } from "@/data/ogFont";
import { bySlug, drops } from "@/data/drops";

export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Kuki Curaçao drop";

export function generateStaticParams() {
  return drops.map((d) => ({ slug: d.slug }));
}

/** The share card: the drop's photo on the left, its label on the right — what lands in a WhatsApp preview. */
export default async function OG({ params }: { params: Promise<{ slug: string }> }) {
  const d = bySlug((await params).slug) ?? drops[0];
  const font = await ogFont();
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: d.accent, color: d.accentInk, fontFamily: "Bricolage, Arial, sans-serif" }}>
        <div style={{ width: 472, height: 630, display: "flex", position: "relative", background: "rgba(0,0,0,.15)" }}>
          {d.image && <img src={d.image} alt="" width={472} height={630} style={{ objectFit: "cover", width: 472, height: 630 }} />}
          <div style={{ position: "absolute", left: 28, bottom: 28, background: "#fff", color: "#111", padding: "14px 18px", transform: "rotate(-3deg)", display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 16, letterSpacing: 3 }}>{d.label.top}</span>
            <span style={{ fontSize: 40, fontWeight: 800, letterSpacing: -1, marginTop: 4 }}>{d.label.big}</span>
          </div>
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: 56 }}>
          <div style={{ fontSize: 22, letterSpacing: 4, opacity: 0.75 }}>KUKI CURAÇAO · DROP</div>
          <div style={{ fontSize: d.title.length > 18 ? 64 : 88, fontWeight: 800, lineHeight: 0.95, letterSpacing: -2, marginTop: 18 }}>{d.title}</div>
          <div style={{ fontSize: 28, marginTop: 22, opacity: 0.9 }}>{d.line}</div>
          <div style={{ fontSize: 20, letterSpacing: 3, marginTop: 40, opacity: 0.7 }}>MAMBO BEACH BOULEVARD · @KUKI.CURACAO</div>
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "Bricolage", data: font, weight: 800, style: "normal" }] }
  );
}
