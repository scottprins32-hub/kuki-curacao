import type { NextConfig } from "next";

/**
 * Two build modes:
 *   PREVIEW=1  → static export for GitHub Pages (the always-on preview track).
 *                basePath is needed because Pages serves a project repo at
 *                /<repo>/ unless a custom domain is attached.
 *   default    → the Vercel build (image optimization, the release track).
 */
const preview = process.env.PREVIEW === "1";
const repo = process.env.PREVIEW_BASE ?? "/kuki-curacao";

// Pin the tracing root to this folder. Without it, a stray package-lock.json
// higher up (e.g. in the home directory) makes Next guess the wrong workspace.
const outputFileTracingRoot = __dirname;

const nextConfig: NextConfig = preview
  ? {
      outputFileTracingRoot,
      output: "export",
      basePath: repo,
      assetPrefix: repo,
      trailingSlash: true, // so /drops/ resolves to drops/index.html on Pages
      images: { unoptimized: true },
    }
  : {
      outputFileTracingRoot,
      images: {
        formats: ["image/avif", "image/webp"],
        remotePatterns: [{ protocol: "https", hostname: "d2ol7oe51mr4n9.cloudfront.net" }],
      },
    };

export default nextConfig;
