/** Load Bricolage Grotesque 800 as TTF for next/og (Satori needs raw font data). Cached per build. */
let cached: Promise<ArrayBuffer> | undefined;

export function ogFont(): Promise<ArrayBuffer> {
  if (!cached) {
    cached = (async (): Promise<ArrayBuffer> => {
      const css = await fetch("https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@800&display=swap", {
        headers: { "User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:12.0) Gecko/20100101 Firefox/12.0" },
      }).then((r) => r.text());
      const url = css.match(/src: url\(([^)]+)\) format\('(?:truetype|opentype|woff)'\)/)?.[1];
      if (!url) throw new Error("font url not found");
      return fetch(url).then((r) => r.arrayBuffer());
    })();
  }
  return cached;
}
