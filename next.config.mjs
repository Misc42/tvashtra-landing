/** @type {import('next').NextConfig} */

// GitHub Pages serves project sites at /<repo-name>/, not at the domain
// root. Without basePath, every absolute href ("/screenshots/...") resolves
// to misc42.github.io root and 404s. The override below is the canonical
// fix for "Next static export deployed to a GitHub Pages project site".
// Override locally with `BASE_PATH=""` if you flip to a custom domain.
const basePath = process.env.BASE_PATH ?? "/tvashtra-landing";

// The origin the site is actually served from. Pairs with basePath to build the
// absolute URLs metadata needs (canonical, og:url, og:image, sitemap, robots) —
// see lib/site.ts. Defaults to the origin we own; a custom domain is
// `SITE_ORIGIN=https://example.com BASE_PATH= pnpm build`.
const siteOrigin = process.env.SITE_ORIGIN ?? "https://misc42.github.io";

const nextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath,
  images: {
    // Static export: Next/Image cannot use the default loader on Pages.
    // Screenshots are pre-sized PNGs, no on-demand transforms needed.
    unoptimized: true,
  },
  trailingSlash: true,
  reactStrictMode: true,
  env: {
    // Expose to client code so it can prefix absolute screenshot paths.
    NEXT_PUBLIC_BASE_PATH: basePath,
    NEXT_PUBLIC_SITE_ORIGIN: siteOrigin,
  },
};

export default nextConfig;
