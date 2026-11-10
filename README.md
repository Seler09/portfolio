# bartoszkalinka · personal site

Single-page portfolio of **Bartosz Kalinka**, Senior .NET Developer (Wrocław).
React 19 + TypeScript + Vite, no UI libraries, ~85 KB of JS gzipped.

## Features
- Interactive particle-network background (canvas) with a pointer glow
- Hero with a C# snippet typed out live, followed by a `dotnet run` terminal
- Bilingual: English by default, Polish via the EN/PL switch or `?lang=pl`
- Command palette: `Ctrl/⌘ + K` or `/`
- Scroll reveals, count-up stats, timeline that fills while scrolling, spotlight cards
- Respects `prefers-reduced-motion`; responsive down to 320 px

## Run locally
```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # type-check + production build to dist/
npm run lint
```

## Edit content
All text lives in [`src/content.ts`](src/content.ts) (both languages).
Photos live in `public/img/`.

## Deploy (GitHub Pages, free)
Pushing to `main` runs [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml):
lint → build → publish `dist/` to GitHub Pages.
One-time setup: **Settings → Pages → Source: GitHub Actions**.

## Custom domain
1. Buy the domain (e.g. Cloudflare Registrar, sold at cost).
2. DNS records for the apex domain (DNS only, no proxy):
   - `A` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `AAAA` → `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`
   - `CNAME www` → `<github-user>.github.io`
3. Add `public/CNAME` containing the domain and set `VITE_SITE_URL` in `.env` to `https://<domain>`, push, then in **Settings → Pages** set the custom domain and tick **Enforce HTTPS**.

## Link preview
`public/og.png` (1200×630) is rendered from [`og-template.html`](og-template.html): open it in Chrome at 1200×630 and screenshot it to regenerate.
Check the result with LinkedIn Post Inspector: https://www.linkedin.com/post-inspector/
