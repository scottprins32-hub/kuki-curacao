import type { Metadata } from "next";
import Image from "next/image";
import { site } from "@/data/site";
import { IMG } from "@/data/images";

export const metadata: Metadata = { title: "Raised on Curaçao" };

export default function About() {
  return (
    <main className="wrap about" style={{ paddingTop: 110, paddingBottom: 80, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 40, alignItems: "start" }}>
      <div>
        <h1>Kuki, raised on Curaçao</h1>
        <p>
          Kuki started almost four years ago as t-shirts and stickers, dropped a few designs at a time on Instagram. Today it is a store and a café on Mambo Beach Boulevard — the Kuki Lab — where the coffee, the stroopwafels and the clothes are one thing.
        </p>
        <p>
          Every design starts with the island: the blenchi hummingbird, the Antillean guilder lion, lamunchi, blou i oro. Every drop is a Coffee Party: Saturday, music, new labels on the cup.
        </p>
        <p style={{ fontSize: 15, color: "var(--ink-2)" }}>
          {site.address} · {site.hours}
        </p>
        <p className="mono" style={{ fontSize: 11, color: "var(--ink-3)" }}>
          Prototype copy written from the Instagram feed — to be replaced with Kuki&apos;s own words.
        </p>
      </div>
      <div style={{ aspectRatio: "3/4", overflow: "hidden", background: "var(--line)", maxWidth: 420, justifySelf: "end", width: "100%" }}>
        <Image src={IMG.raised} alt="Kuki, raised on Curaçao — tee and shorts on a yellow porch" width={750} height={1000} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
    </main>
  );
}
