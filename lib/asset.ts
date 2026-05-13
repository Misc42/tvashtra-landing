/**
 * Prefix an absolute public-folder path with the deploy basePath.
 *
 * Next.js applies `basePath` to internal routing (`<Link>`) and to its own
 * static asset chunks (`/_next/static/...`), but NOT to plain `<img>` /
 * `<Image unoptimized>` srcs that point at files in `public/`. So we wrap
 * those manually. Returns the path unchanged when no basePath is set
 * (local dev, custom-domain deploy).
 *
 * Always pass a leading `/`-prefixed public-folder path:
 *   asset("/screenshots/hero.png") => "/tvashtra-landing/screenshots/hero.png"
 *   asset("/og.png")                => "/tvashtra-landing/og.png"
 */
export function asset(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  if (!path.startsWith("/")) return `${base}/${path}`;
  return `${base}${path}`;
}
