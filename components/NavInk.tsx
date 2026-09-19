"use client";
import { useEffect } from "react";

/**
 * Sets the fixed nav's colour to whatever reads on the tinted section behind it,
 * and hands it back to the default once that section has scrolled past the nav.
 */
export default function NavInk({ color, target, tint }: { color: string; target: string; tint?: string }) {
  useEffect(() => {
    const root = document.documentElement;
    const el = document.querySelector(target);
    let raf = 0;
    const apply = () => {
      raf = 0;
      const under = el ? el.getBoundingClientRect().bottom > 60 : true;
      if (under) { root.style.setProperty("--nav-ink", color); if (tint) root.style.setProperty("--nav-scrim", tint + "d9"); }
      else { root.style.removeProperty("--nav-ink"); root.style.removeProperty("--nav-scrim"); }
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(apply); };
    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
      root.style.removeProperty("--nav-ink");
      root.style.removeProperty("--nav-scrim");
    };
  }, [color, target, tint]);
  return null;
}
