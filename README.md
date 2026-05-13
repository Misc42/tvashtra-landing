# tvashtra-landing

Public landing page for [Tvashtra](https://github.com/Misc42/tvashtra) — an
LLM-driven desktop CAD application. The application repo stays private during
the beta; this site documents what Tvashtra is, links to the waitlist, and
will point to the public source repo when v1 ships.

Shares its visual hand with
[Sanketra](https://github.com/Misc42/sanketra) and
[Mukut](https://github.com/Misc42/mukut) — same paper-black, same type stack,
same restraint.

## Stack

- Next.js 15 (App Router) with `output: "export"` — static site
- React 19
- Tailwind 4 (CSS-first config in `app/globals.css`)
- TypeScript 5
- pnpm 10
- Fonts via `next/font`: IBM Plex Sans, IBM Plex Mono, Instrument Serif, Tiro Devanagari Hindi

No runtime backend. The waitlist form POSTs to a third-party endpoint of your
choice (Formspree / Tally / Plausible Forms / etc.).

## Develop

```bash
pnpm install
pnpm dev
```

Open <http://localhost:3000>.

## Build

```bash
pnpm typecheck    # tsc --noEmit
pnpm lint
pnpm build        # writes out/ — static HTML/CSS/JS
```

The build artefact is `out/`. Drop that anywhere that serves static files
(GitHub Pages, Cloudflare Pages, Vercel, S3 + CloudFront, your own nginx).

## Environment variables

Set at build time (the static build bakes them into the bundle, since this is
a static export):

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_WAITLIST_ENDPOINT` | yes (in prod) | URL the waitlist form POSTs `{ email }` to. Use Formspree, Tally, Plausible Forms, or your own handler. |

Example for a Formspree endpoint:

```bash
NEXT_PUBLIC_WAITLIST_ENDPOINT=https://formspree.io/f/xxxxxxxx pnpm build
```

If the variable is missing at build time, the form will throw on submit and
fall back to the "DM @tanaymisra97" error state — the page still ships.

## Deploy (GitHub Pages)

`.github/workflows/pages.yml` builds on push to `main` and deploys the `out/`
directory to GitHub Pages. To activate:

1. Push this repo to `Misc42/tvashtra-landing`.
2. In **Settings &rarr; Pages**, set source to **GitHub Actions**.
3. In **Settings &rarr; Secrets and variables &rarr; Actions &rarr; Variables**,
   add `NEXT_PUBLIC_WAITLIST_ENDPOINT` with your form URL.
4. (Optional) Add a `CNAME` file under `public/` if you want a custom domain.
   GitHub will pick it up.

## Layout

```
app/
  layout.tsx          font loading + html shell
  page.tsx            single-page landing — Hero, Problem, How, Tour, Install, Browser, FAQ
  privacy/page.tsx    privacy stub
  terms/page.tsx      terms stub
  globals.css         palette tokens + noise overlay + utilities

components/
  Hero.tsx, Problem.tsx, HowItWorks.tsx, Tour.tsx,
  Install.tsx, TryInBrowser.tsx, Faq.tsx,
  Nav.tsx, Footer.tsx, WaitlistForm.tsx

lib/
  waitlist.ts         POST to NEXT_PUBLIC_WAITLIST_ENDPOINT

public/
  screenshots/        renders captured from the Tvashtra CLI
  favicon.svg
  og.png              social card, 1200x630
```

## Licence

The landing page source is AGPL-3.0-or-later, matching the application. See
`LICENSE`.

Screenshots under `public/screenshots/` are renders of geometry produced by
Tvashtra — they describe the product and may be redistributed alongside this
repo. Treat third-party logos (if any are added later) as belonging to their
respective owners.

## Roadmap

- Add real demo video (`/demo.mp4`) once the chess-pawn screencap exists.
- Press kit page once there is press.
- Localised Hindi copy for the marketing surface (currently bilingual in spots, English-dominant).

Issues + DMs to [@tanaymisra97](https://x.com/tanaymisra97).
