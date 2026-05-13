/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    // Static export: Next/Image cannot use the default loader on Pages.
    // Screenshots are pre-sized PNGs, no on-demand transforms needed.
    unoptimized: true,
  },
  trailingSlash: true,
  reactStrictMode: true,
};

export default nextConfig;
