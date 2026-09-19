import Link from "next/link";
import { site } from "@/data/site";

export default function NotFound() {
  return (
    <main className="wrap" style={{ paddingTop: 140, paddingBottom: 120, display: "grid", gap: 20 }}>
      <div className="mono" style={{ color: "var(--ink-3)" }}>404</div>
      <h1 style={{ fontSize: "clamp(36px,8vw,96px)" }}>Sold out, or never dropped</h1>
      <p style={{ maxWidth: "48ch", fontSize: 17, margin: 0 }}>That page isn&apos;t on the cup. The archive has everything that was.</p>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <Link className="btn solid" href="/drops">Every drop</Link>
        <a className="btn" href={site.instagram} target="_blank" rel="noreferrer">@{site.handle}</a>
      </div>
    </main>
  );
}
