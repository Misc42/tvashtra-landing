/** @type {import('next').NextConfig} */

// GitHub Pages serves project sites at /<repo-name>/, not at the domain
// root. Without basePath, every absolute href ("/screenshots/...") resolves
// to misc42.github.io root and 404s. The override below is the canonical
// fix for "Next static export deployed to a GitHub Pages project site".
// Override locally with `BASE_PATH=""` if you flip to a custom domain.
const basePath = process.env.BASE_PATH ?? "/tvashtra-landing";

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
  },
};

export default nextConfig;
