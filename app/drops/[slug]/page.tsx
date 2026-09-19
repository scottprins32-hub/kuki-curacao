import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Tag from "@/components/Tag";
import NavInk from "@/components/NavInk";
import { drops, bySlug, kindOf } from "@/data/drops";
import { site } from "@/data/site";

export function generateStaticParams() {
  return drops.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const d = bySlug((await params).slug);
  return { title: d?.title ?? "Drop", description: d?.line, openGraph: d?.image ? { images: [d.image] } : undefined };
}

export default async function DropPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const d = bySlug(slug);
  if (!d) notFound();
  const idx = drops.indexOf(d);
  const prev = drops[idx + 1];
  const next = drops[idx - 1];
  const date = new Date(d.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

  return (
    <main>
      <NavInk color={d.accentInk} target=".drop-tint" tint={d.accent} />
      <section className="drop-tint" style={{ background: d.accent, color: d.accentInk }}>
        <div className="wrap drop-hero">
          <div>
            <div className="mono" style={{ opacity: 0.7, marginBottom: 12 }}>Drop {String(drops.length - idx).padStart(2, "0")} · {date}</div>
            <h1>{d.title}</h1>
            <p className="line">{d.line}</p>
            <div style={{ display: "flex", gap: 10, marginTop: 22, flexWrap: "wrap" }}>
              <a className="btn" href={site.dm} target="_blank" rel="noreferrer">
                Message us about {d.label.big.toLowerCase()}
              </a>
              {d.igPost && (
                <a className="btn" href={`https://www.instagram.com/p/${d.igPost}/`} target="_blank" rel="noreferrer">The post</a>
              )}
            </div>
          </div>
          <div className="frame" style={{ aspectRatio: "3/4" }}>
            {d.image ? (
              <Image src={d.image} alt={d.imageAlt ?? d.title} fill sizes="(max-width: 760px) 90vw, 420px" priority style={{ objectFit: "cover" }} />
            ) : (
              <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", padding: 24, textAlign: "center", background: "rgba(0,0,0,.12)" }}>
                <div>
                  <div className="display" style={{ fontSize: 40 }}>{d.label.big}</div>
                  <div className="mono" style={{ marginTop: 10, opacity: 0.7 }}>photo to come</div>
                </div>
              </div>
            )}
            <Tag top={d.label.top} big={d.label.big} />
          </div>
        </div>
      </section>

      <section className="wrap drop-body">
        <div className="story">
          <p className={kindOf(d) === "cap" ? "serif" : ""} style={{ fontSize: kindOf(d) === "cap" ? 22 : 19, lineHeight: 1.35, maxWidth: "56ch" }}>{d.story}</p>
          <div>
            <div className="mono" style={{ color: "var(--ink-3)", marginBottom: 8 }}>As posted on @{site.handle}</div>
            <div className="caption">{d.caption}</div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 12, marginTop: 12 }} className="mono">
            {next ? <Link href={`/drops/${next.slug}`}>← {next.title}</Link> : <span />}
            {prev ? <Link href={`/drops/${prev.slug}`}>{prev.title} →</Link> : <span />}
          </div>
        </div>
        <dl className="kv" style={{ alignContent: "start" }}>
          <dt>Pieces</dt><dd>{d.pieces.join(", ")}</dd>
          <dt>Status</dt><dd>{d.status}</dd>
          <dt>Where</dt><dd>{site.address}</dd>
          <dt>Hours</dt><dd>{site.hours}</dd>
        </dl>
      </section>
    </main>
  );
}
