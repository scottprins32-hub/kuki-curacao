"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Tag from "./Tag";
import NavInk from "./NavInk";
import type { Drop } from "@/data/drops";
import { site } from "@/data/site";

gsap.registerPlugin(ScrollTrigger);

const fmt = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", { month: "short", year: "numeric" }).toUpperCase();

const ease = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

/**
 * Sticky hero: the frame stays put (CSS position: sticky — native, no pin-spacer, smooth on iOS)
 * while the wrapper scrolls. Photos crossfade continuously with scroll progress; the label and copy
 * switch at the halfway point of each transition. Only drops with a real photo take part.
 */
export default function CupHero({ drops: all }: { drops: Drop[] }) {
  const drops = all.filter((d) => d.image && !d.event).slice(0, 5);
  const root = useRef<HTMLDivElement>(null);
  const shots = useRef<(HTMLDivElement | null)[]>([]);
  const [i, setI] = useState(0);
  const d = drops[i];
  const n = drops.length;

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    ScrollTrigger.config({ ignoreMobileResize: true });
    let last = 0;
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        const p = self.progress * (n - 1); // 0 … n-1, continuous
        const idx = Math.min(n - 2, Math.floor(p));
        const frac = n > 1 ? ease(Math.min(1, Math.max(0, p - idx))) : 0;
        shots.current.forEach((s, k) => {
          if (!s) return;
          const o = k <= idx ? 1 : k === idx + 1 ? frac : 0;
          s.style.opacity = String(o);
        });
        const cur = Math.round(p);
        if (cur !== last) {
          last = cur;
          setI(cur);
        }
      },
    });
    return () => st.kill();
  }, [n]);

  return (
    <div
      ref={root}
      className="hero"
      style={{ height: `calc(100svh + ${(n - 1) * 60}svh)`, ["--tint" as string]: d.accent, ["--tint-ink" as string]: d.accentInk }}
    >
      <NavInk color={d.accentInk} target=".hero" tint={d.accent} />
      <div className="hero-pin">
        <div className="hero-stage">
          <div className="frame">
            {drops.map((x, k) => (
              <div
                key={x.slug}
                ref={(r) => { shots.current[k] = r; }}
                className="shot"
                style={{ opacity: k === 0 ? 1 : 0 }}
                aria-hidden={k !== i}
              >
                <Image src={x.image!} alt={x.imageAlt ?? x.title} fill sizes="(max-width: 640px) 90vw, 50vh" priority={k < 2} loading={k < 2 ? undefined : "lazy"} style={{ objectFit: "cover" }} />
              </div>
            ))}
            <Tag key={d.slug} top={d.label.top} big={d.label.big} peel />
          </div>
          <div className="scroll-hint">Scroll for the next drop</div>
          <svg className="cue" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
        </div>
        <div className="hero-copy">
          <div>
            <div className="dots" aria-hidden="true">
              {drops.map((x, k) => <i key={x.slug} className={k === i ? "on" : k < i ? "done" : ""} />)}
            </div>
            <div className="mono" style={{ opacity: 0.7, marginBottom: 10 }}>
              Drop {String(all.length - all.indexOf(d)).padStart(2, "0")} / {String(all.length).padStart(2, "0")} · {fmt(d.date)}
            </div>
            <h1>{d.title}</h1>
            <p className="line">{d.line}</p>
            <div className="meta mono">
              <span>{d.pieces.join(" · ")}</span>
              <span>{d.status}</span>
            </div>
          </div>
          <div className="hero-side">
            <Link className="btn" href={`/drops/${d.slug}`}>See the drop</Link>
            <a className="btn solid" href={site.dm} target="_blank" rel="noreferrer">Message us on Instagram</a>
          </div>
        </div>
      </div>
    </div>
  );
}
