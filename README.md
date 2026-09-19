# Kuki Curaçao — site

Every drop, on the cup. Next.js 15 (app router), deployed on Vercel as project `kuki-curacao` → https://kuki-curacao.vercel.app

## Run

```
npm install
npm run dev      # http://localhost:3000
npm run build    # must pass before deploying
```

## Add a drop (2 minutes)

1. Put the photo somewhere public (today: the CDN URLs in `data/images.ts`; later: `/public/img/` and drop the CDN).
2. Add an entry to the top of `drops` in `data/drops.ts`. Copy the caption verbatim into `caption`, ALL-CAPS title into `title`, the one plain line into `line`. Pick `accent` (page colour while this drop is on screen), `accentInk` (text colour that reads on it), and the sticker `label`.
3. `npm run build` → deploy. The hero, archive, drop page, share image (`/drops/<slug>/opengraph-image`) and archive card all come from that one entry.

Drops without an `image` stay out of the home hero but still get an archive card and a page.

## Set the next Coffee Party

`data/site.ts` → `nextParty.when` / `until` (ISO with `-04:00`, Curaçao time) and `confirmed: true`. That drives the home countdown, `/times`, and the `/times/party.ics` calendar file.

## Where things live

- `components/CupHero.tsx` — sticky photo hero; scroll progress crossfades the drops. Native scroll on touch, Lenis on desktop (`components/SmoothScroll.tsx`).
- `components/Tag.tsx` — the white sticker label used on every photo.
- `app/drops/[slug]/` — drop page + its share image.
- `app/times/` — The Kuki Times (countdown, back issues, calendar file).
- `app/lab/` — the café.
- `data/` — all content. No CMS on purpose.

## Still placeholder

- Coffee Party date (flagged on the page until `confirmed: true`).
- Photos are 1000px copies from Instagram on a temporary CDN. Replace with raw files from Kuki before launch.
- About copy is written from the feed; swap for Kuki's own words.

## Two deploy tracks

**Preview (always on).** A static export on GitHub Pages. Nothing queues behind
anything: the build happens here and only the finished files are pushed, so a
change is live in well under a minute. This is the link to open whenever you
want to see the current state.

```
PREVIEW_REPO=scottprins32-hub/kuki-curacao ./scripts/preview.sh
# → https://scottprins32-hub.github.io/kuki-curacao/
```

One-time setup, on GitHub:
1. Create a repo (e.g. `kuki-curacao`). It must be **public** unless you have
   GitHub Pro — Pages on a private repo is a paid feature. Nothing secret is in
   this repo (no keys; photos live on a CDN), but the source would be public.
2. Settings → Pages → Source: *Deploy from a branch*, branch `gh-pages`, folder `/`.
3. Add the repo to the Claude session's sources so pushes from a session are
   allowed (a session cannot create repos or push to unlisted ones).

**Release (only when showing someone).** The Vercel production deploy at
kuki-curacao.vercel.app. Real image optimization, a proper domain, no `/repo/`
path. Push it when Nick or anyone else is going to look — not on every change.

The same `next.config.ts` serves both: `PREVIEW=1` switches to `output: "export"`
with a basePath for Pages; without it you get the normal Vercel build.

### What the preview track gives up
- `next/image` optimization is off (`unoptimized: true`) — photos are served at
  full size, so the preview is heavier than production but looks identical.
- No server-side routes. Fine here (everything is static or `force-static`); a
  future project with real API routes needs a different preview host.
- URLs carry the `/kuki-curacao/` prefix unless a custom domain is attached.

### One safety rule for the preview repo
The preview repo is **public**, so a push to it is a publish. `scripts/preview.sh`
refuses to run outside the site directory and refuses to push unless the build
produced `out/index.html` — that guard exists because a mistyped `cd` once
git-inited the wrong folder and pushed 1.6 GB of personal files here. A
force-push does not remove anything from GitHub; unreferenced commits stay
fetchable by SHA. If something private ever lands in this repo: revoke whatever
credentials were in it, then delete the repository and recreate it (the source
lives in `~/code/site`, so it costs about two minutes).
