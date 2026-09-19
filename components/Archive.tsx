"use client";
import { useState } from "react";
import DropCard from "./DropCard";
import { kindOf, type Drop } from "@/data/drops";

const KINDS: { key: "all" | "tee" | "cap" | "set" | "event"; label: string }[] = [
  { key: "all", label: "Everything" },
  { key: "tee", label: "Tees" },
  { key: "cap", label: "Caps" },
  { key: "set", label: "Co-ords & shorts" },
  { key: "event", label: "Coffee Parties" },
];

export default function Archive({ drops }: { drops: Drop[] }) {
  const [kind, setKind] = useState<(typeof KINDS)[number]["key"]>("all");
  const [inStock, setInStock] = useState(false);
  const shown = drops.filter((d) => (kind === "all" || kindOf(d) === kind) && (!inStock || d.status === "in store"));
  const years = [...new Set(shown.map((d) => d.date.slice(0, 4)))];
  return (
    <>
      <div className="chips" role="group" aria-label="Filter drops">
        {KINDS.map((k) => (
          <button key={k.key} className="chip" aria-pressed={kind === k.key} onClick={() => setKind(k.key)}>{k.label}</button>
        ))}
        <button className="chip" aria-pressed={inStock} onClick={() => setInStock((v) => !v)} style={{ marginLeft: "auto" }}>In store now</button>
      </div>
      {shown.length === 0 && <p className="mono" style={{ color: "var(--ink-3)" }}>Nothing here right now. Try another filter.</p>}
      {years.map((y) => (
        <section key={y} style={{ marginBottom: 48 }}>
          <div className="section-head" style={{ marginBottom: 18 }}>
            <h2 style={{ fontSize: "clamp(22px,3vw,32px)" }}>{y}</h2>
            <span className="mono" style={{ color: "var(--ink-3)" }}>{shown.filter((d) => d.date.startsWith(y)).length}</span>
          </div>
          <div className="grid">
            {shown.filter((d) => d.date.startsWith(y)).map((d) => <DropCard key={d.slug} d={d} />)}
          </div>
        </section>
      ))}
    </>
  );
}
