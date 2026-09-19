import type { Metadata } from "next";
import Image from "next/image";
import Tag from "@/components/Tag";
import { menu, site } from "@/data/site";
import { IMG } from "@/data/images";

export const metadata: Metadata = { title: "The Kuki Lab" };

export default function Lab() {
  return (
    <main className="wrap" style={{ paddingTop: 110, paddingBottom: 80, display: "grid", gap: 48 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 28, alignItems: "end" }}>
        <div>
          <div className="mono" style={{ color: "var(--matcha-deep)", marginBottom: 12 }}>The Kuki Lab · The Formula</div>
          <h1 style={{ fontSize: "clamp(36px,7vw,96px)" }}>Cookie, coffee, clothing</h1>
          <p style={{ maxWidth: "52ch", fontSize: 17, marginTop: 16 }}>
            {site.tagline} Open {site.hours}, at {site.address}.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div className="frame" style={{ height: "auto", width: "100%" }}>
            <Image src={IMG.lab} alt="Behind the bar at The Kuki Lab, pouring a drink" fill sizes="30vw" style={{ objectFit: "cover" }} priority />
            <Tag top="The Kuki Lab" big="The Formula" />
          </div>
          <div className="frame" style={{ height: "auto", width: "100%" }}>
            <Image src={IMG["matcha-lemonade"]} alt="Matcha cold foam lemonade held up in a black glove" fill sizes="30vw" style={{ objectFit: "cover" }} priority />
            <Tag top="New" big="Matcha lemonade" />
          </div>
        </div>
      </div>

      <div>
        <div className="section-head"><h2>On the menu</h2><span className="mono" style={{ color: "var(--ink-3)" }}>as posted</span></div>
        <div className="menu">
          {menu.map((m) => (
            <div className="menu-item" key={m.name}>
              <i style={{ background: m.drink }} />
              <div>
                <h3>{m.name}</h3>
                <p>{m.line}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <a className="btn" href={site.maps} target="_blank" rel="noreferrer">Directions</a>
        <a className="btn" href={site.instagram} target="_blank" rel="noreferrer">@{site.handle}</a>
      </div>
    </main>
  );
}
