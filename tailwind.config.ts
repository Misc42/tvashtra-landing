import type { Config } from "tailwindcss";

// Tailwind 4 is CSS-first; this file is kept for tooling that still expects
// a config. The real theme tokens live in app/globals.css under @theme inline.
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
  ],
};

export default config;
