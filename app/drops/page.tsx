import type { Metadata } from "next";
import Archive from "@/components/Archive";
import { drops } from "@/data/drops";

export const metadata: Metadata = { title: "Drops" };

export default function Drops() {
  return (
    <main className="wrap" style={{ paddingTop: 110, paddingBottom: 80 }}>
      <div className="section-head" style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: "clamp(36px,7vw,96px)" }}>Every drop</h1>
        <span className="mono" style={{ color: "var(--ink-3)" }}>{drops.length} since Feb 2024</span>
      </div>
      <Archive drops={drops} />
    </main>
  );
}
