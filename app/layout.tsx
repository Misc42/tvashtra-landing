import type { Metadata } from "next";
import { Anek_Devanagari, Geist_Mono, Schibsted_Grotesk } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { SITE_URL, siteUrl } from "@/lib/site";

const schibsted = Schibsted_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-schibsted",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-geist-mono",
  display: "swap",
});

const anekDevanagari = Anek_Devanagari({
  subsets: ["devanagari", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-anek",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Tvashtra — CAD you can talk to",
    template: "%s — Tvashtra",
  },
  description:
    "Desktop CAD where you talk to the model, it builds the part, it sees the result, and it fixes its own mistakes before declaring done. Real B-rep geometry, closed-loop verification, your API key.",
  openGraph: {
    title: "Tvashtra — CAD you can talk to",
    description:
      "Desktop CAD where the model builds, sees, and verifies its own work. Real OCCT B-rep, no SDFs, no toy meshes.",
    url: SITE_URL,
    siteName: "Tvashtra",
    // Absolute, not "/og.png". A leading-slash path resolved against a
    // metadataBase that carries a basePath drops the basePath, which is how
    // the card would end up pointing at the wrong origin again.
    images: [{ url: siteUrl("/og.png"), width: 1200, height: 630 }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tvashtra — CAD you can talk to",
    description:
      "Desktop CAD where the model builds, sees, and verifies its own work.",
    images: [siteUrl("/og.png")],
  },
  alternates: {
    canonical: SITE_URL,
  },
  // Favicons come from the App Router file conventions (app/icon.png,
  // app/favicon.ico, app/apple-icon.png) — Next generates the <link> tags with
  // the correct basePath. The old manual `icon: "/favicon.svg"` resolved to the
  // domain root (404 under the /tvashtra-landing/ basePath) and its glyph was
  // font-dependent text that browsers didn't render.
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-IN"
      className={`${schibsted.variable} ${geistMono.variable} ${anekDevanagari.variable}`}
    >
      <body>
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
