#!/usr/bin/env bash
# Build the static preview and push it to the gh-pages branch.
# No CI build on the other side: what lands in gh-pages is already built,
# so "push" to "live" is ~30 seconds.
set -euo pipefail

REPO="${PREVIEW_REPO:?set PREVIEW_REPO, e.g. scottprins32-hub/kuki-curacao}"
BASE="/${REPO#*/}"

# Guard: never run (and never git-init) anywhere but the site directory.
# A mistyped cd once turned ~/Downloads into a git repo and pushed 1.6 GB
# of personal files to a public repo. Two cheap checks stop that forever.
[ -f next.config.ts ] && [ -d app ] || {
  echo "refusing: $(pwd) is not the site directory (no next.config.ts + app/)" >&2
  exit 1
}

rm -rf out
PREVIEW=1 PREVIEW_BASE="$BASE" npx next build
[ -f out/index.html ] || { echo "refusing: build produced no out/index.html" >&2; exit 1; }
touch out/.nojekyll   # without this, GitHub Pages hides _next/

cd out
[ -f index.html ] || { echo "refusing: wrong directory" >&2; exit 1; }
git init -q
git checkout -qb gh-pages
git add -A
git -c user.email=noreply@anthropic.com -c user.name="Kuki preview" \
    commit -qm "preview $(date -u +%Y-%m-%dT%H:%MZ)"
git push -qf "https://x-access-token:${GH_TOKEN}@github.com/${REPO}.git" gh-pages
cd ..
echo "pushed → https://${REPO%%/*}.github.io${BASE}/"
