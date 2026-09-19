import type { Metadata } from "next";
import { Bricolage_Grotesque, Public_Sans, JetBrains_Mono, DM_Serif_Display } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import { site } from "@/data/site";

const display = Bricolage_Grotesque({ subsets: ["latin"], weight: "variable", variable: "--font-display", axes: ["opsz", "wdth"] });
const body = Public_Sans({ subsets: ["latin"], weight: ["400", "600"], variable: "--font-body" });
const serif = DM_Serif_Display({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-serif" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "600"], variable: "--font-mono" });

export const viewport = { themeColor: "#f3f4ef", width: "device-width", initialScale: 1, viewportFit: "cover" as const };

export const metadata: Metadata = {
  metadataBase: new URL("https://kuki-curacao.vercel.app"),
  title: { default: "Kuki Curaçao", template: "%s — Kuki Curaçao" },
  description: "Cookie, Coffee, Clothing and more. Every Kuki drop, on the cup. Mambo Beach Boulevard, Willemstad.",
  openGraph: { title: "Kuki Curaçao", description: "Every drop, on the cup.", type: "website", siteName: "Kuki Curaçao" },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable} ${serif.variable}`}>
      <body>
        <SmoothScroll />
        <nav className="nav" aria-label="Main">
          <Link href="/" className="brand">Kuki</Link>
          <ul>
            <li><Link href="/drops">Drops</Link></li>
            <li><Link href="/times">Times</Link></li>
            <li><Link href="/lab">Lab</Link></li>
            <li><Link href="/about">About</Link></li>
          </ul>
        </nav>
        {children}
        <footer>
          <div className="wrap" style={{ display: "grid", gap: 14 }}>
            <div className="brand">Kuki Curaçao</div>
            <div>{site.tagline}</div>
            <div className="row">
              <span>{site.address}</span>
              <span>{site.hours}</span>
            </div>
            <div className="row mono">
              <a href={site.instagram} target="_blank" rel="noreferrer">Instagram @{site.handle}</a>
              <a href={site.tiktok} target="_blank" rel="noreferrer">TikTok</a>
              <a href={site.dm} target="_blank" rel="noreferrer">Message us</a>
              <a href={site.maps} target="_blank" rel="noreferrer">Map</a>
            </div>
            <div className="mono" style={{ color: "var(--ink-3)" }}>Prototype · photos from @kuki.curacao</div>
          </div>
        </footer>
      </body>
    </html>
  );
}
