/**
 * The origin this site is actually served from, for the absolute URLs that
 * metadata needs.
 *
 * Everything here used to be five separate literals reading
 * `https://tvashtra.app` — a domain that has never been registered and returns
 * NXDOMAIN. That is not a cosmetic staleness: the canonical link told search
 * engines the real page was a duplicate of a URL that does not resolve, the
 * sitemap listed only that dead origin (never a real page), robots.txt pointed
 * crawlers at a sitemap under it, and `og:image` resolved to
 * `https://tvashtra.app/og.png` — so every social share card came back with no
 * image, while `public/og.png` sat there serving 200 from the live origin the
 * whole time.
 *
 * Kept as ONE value because the version pin in this repo taught the same lesson
 * the hard way: three files carried it, a bump reached two, and the third went
 * out stale.
 *
 * Both halves are overridable, so a custom domain is a deploy-time env change
 * rather than another sweep through the tree:
 *   SITE_ORIGIN=https://tvashtra.app BASE_PATH= pnpm build
 *
 * next.config.mjs maps SITE_ORIGIN -> NEXT_PUBLIC_SITE_ORIGIN and BASE_PATH ->
 * NEXT_PUBLIC_BASE_PATH, the same way it already did for the basePath alone.
 * The defaults are the origin we actually own today.
 */
const origin = process.env.NEXT_PUBLIC_SITE_ORIGIN ?? "https://misc42.github.io";

// Mirrors next.config.ts's own default. `??` (not `||`) so an intentional
// empty basePath for a root-domain deploy is respected rather than replaced.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "/tvashtra-landing";

/** Absolute site root, no trailing slash. Throws at build time if malformed. */
export const SITE_URL: string = new URL(basePath || "/", origin).href.replace(/\/$/, "");

/** Absolute URL for a public-folder file. Pass a leading-slash path. */
export function siteUrl(path: string): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
