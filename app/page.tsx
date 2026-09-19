import Link from "next/link";
import CupHero from "@/components/CupHero";
import Countdown from "@/components/Countdown";
import DropCard from "@/components/DropCard";
import { drops } from "@/data/drops";
import { site } from "@/data/site";

export default function Home() {
  const when = new Date(site.nextParty.when);
  return (
    <main>
      <CupHero drops={drops} />

      <section className="section" id="next">
        <div className="wrap" style={{ display: "grid", gap: 24 }}>
          <div className="section-head">
            <h2>Next Coffee Party</h2>
            <Link href="/times" className="mono">The Kuki Times →</Link>
          </div>
          <Countdown to={site.nextParty.when} big />
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 24px", alignItems: "baseline" }}>
            <span className="display" style={{ fontSize: 20 }}>
              {when.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", timeZone: "America/Curacao" })}
            </span>
            <span className="mono" style={{ color: "var(--ink-2)" }}>11:00 – 14:00 · at Kuki · Mambo Beach Boulevard</span>
            {!site.nextParty.confirmed && <span className="status">date to be confirmed</span>}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <h2>The archive</h2>
            <Link href="/drops" className="mono">All drops →</Link>
          </div>
          <div className="grid">
            {drops.slice(0, 4).map((d) => <DropCard key={d.slug} d={d} />)}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 28, alignItems: "end" }}>
          <div>
            <div className="mono" style={{ color: "var(--matcha-deep)", marginBottom: 12 }}>The Kuki Lab</div>
            <h2 style={{ fontSize: "clamp(28px,4.5vw,48px)" }}>Cookie, coffee, clothing and more</h2>
          </div>
          <div style={{ display: "grid", gap: 8, fontSize: 15, color: "var(--ink-2)" }}>
            <div>{site.address}</div>
            <div>{site.hours}</div>
            <div style={{ marginTop: 8, display: "flex", gap: 10, flexWrap: "wrap" }}>
              <Link href="/lab" className="btn">The menu</Link>
              <a href={site.maps} className="btn" target="_blank" rel="noreferrer">Directions</a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
