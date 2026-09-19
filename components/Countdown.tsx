"use client";
import { useEffect, useState } from "react";

function parts(target: string) {
  const ms = Math.max(0, new Date(target).getTime() - Date.now());
  const s = Math.floor(ms / 1000);
  return { d: Math.floor(s / 86400), h: Math.floor((s % 86400) / 3600), m: Math.floor((s % 3600) / 60), s: s % 60, over: ms === 0 };
}

export default function Countdown({ to, big = false }: { to: string; big?: boolean }) {
  const [t, setT] = useState<ReturnType<typeof parts> | null>(null);
  useEffect(() => {
    setT(parts(to));
    const id = setInterval(() => setT(parts(to)), 1000);
    return () => clearInterval(id);
  }, [to]);
  if (!t) return <span className="mono" aria-live="off">— d — h — m</span>;
  if (t.over) return big ? <div className="display" style={{ fontSize: "clamp(32px,7vw,80px)" }}>It&apos;s on. Come by.</div> : <span className="mono">It&apos;s on. Come by.</span>;
  const pad = (n: number) => String(n).padStart(2, "0");
  if (big) {
    return (
      <div className="count-big" role="timer">
        <div><b>{t.d}</b><span>days</span></div>
        <div><b>{pad(t.h)}</b><span>hours</span></div>
        <div><b>{pad(t.m)}</b><span>min</span></div>
        <div><b>{pad(t.s)}</b><span>sec</span></div>
      </div>
    );
  }
  return (
    <span className="mono" role="timer" style={{ fontVariantNumeric: "tabular-nums" }}>
      {t.d}d {pad(t.h)}h {pad(t.m)}m {pad(t.s)}s
    </span>
  );
}
