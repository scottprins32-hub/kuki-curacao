import Link from "next/link";
import Image from "next/image";
import type { Drop } from "@/data/drops";

export default function DropCard({ d }: { d: Drop }) {
  return (
    <Link href={`/drops/${d.slug}`} className={`card ${d.status === "sold out" ? "out" : ""}`}>
      <div className="ph" style={{ background: d.accent }}>
        {d.image ? (
          <Image src={d.image} alt={d.imageAlt ?? d.title} fill sizes="(max-width: 600px) 50vw, 25vw" style={{ objectFit: "cover" }} />
        ) : (
          <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", color: d.accentInk, padding: 20, textAlign: "center" }}>
            <span className="display" style={{ fontSize: 28 }}>{d.label.big}</span>
          </div>
        )}
        <span className="mini">{d.label.top}</span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
        <h3>{d.title}</h3>
        <span className={`status ${d.status === "in store" ? "in" : d.status === "coming" ? "coming" : ""}`}>{d.status}</span>
      </div>
      <p className="line">{d.line}</p>
    </Link>
  );
}
