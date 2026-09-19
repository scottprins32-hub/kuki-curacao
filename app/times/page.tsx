import type { Metadata } from "next";
import Link from "next/link";
import Countdown from "@/components/Countdown";
import { drops } from "@/data/drops";
import { site } from "@/data/site";

export const metadata: Metadata = { title: "The Kuki Times" };

export default function Times() {
  const p = site.nextParty;
  const when = new Date(p.when);
  const dateLine = when.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "America/Curacao" });
  const backIssues = drops.filter((d) => d.event);
  return (
    <main className="wrap" style={{ paddingTop: 110, paddingBottom: 80, display: "grid", gap: 40 }}>
      <article className="times">
        <div className="masthead">
          <h2>The Kuki Times</h2>
          <span className="mono">Willemstad · {dateLine}</span>
        </div>
        <h1 className="headline">Coffee party in Curaçao?!</h1>
        <p className="deck">{p.line} {dateLine}, 11AM – 2PM, at Kuki, Mambo Beach Boulevard. New designs on the cup. Come celebrate with us.</p>
        <div className="rule" />
        <Countdown to={p.when} big />
        <div className="rule" />
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <a className="btn solid" href={site.dm} target="_blank" rel="noreferrer">Tell us you&apos;re coming</a>
          <a className="btn" href="/times/party.ics">Add to calendar</a>
          <a className="btn" href={site.maps} target="_blank" rel="noreferrer">Directions</a>
        </div>
        {!p.confirmed && <p className="note">Prototype: this date is a placeholder until the next party is announced.</p>}
      </article>

      <section>
        <div className="section-head"><h2>Back issues</h2></div>
        <div className="grid">
          {backIssues.map((d) => (
            <Link key={d.slug} href={`/drops/${d.slug}`} className="card">
              <div className="times" style={{ padding: 18, gap: 10 }}>
                <div className="mono" style={{ color: "#777" }}>{new Date(d.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</div>
                <h3 style={{ fontSize: 26 }}>{d.title}</h3>
                <p style={{ margin: 0, fontSize: 14 }}>{d.line}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
