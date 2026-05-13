import type { Metadata } from "next";
import {
  IBM_Plex_Mono,
  IBM_Plex_Sans,
  Instrument_Serif,
  Tiro_Devanagari_Hindi,
} from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const plexSans = IBM_Plex_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-plex-sans",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-mono",
  display: "swap",
});

const tiroDeva = Tiro_Devanagari_Hindi({
  subsets: ["devanagari", "latin"],
  weight: "400",
  variable: "--font-tiro-deva",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tvashtra.app"),
  title: {
    default: "Tvashtra — LLM-driven CAD that doesn't lie",
    template: "%s — Tvashtra",
  },
  description:
    "Desktop CAD where you talk to the model, it builds the part, it sees the result, and it fixes its own mistakes before declaring done. Real B-rep geometry, closed-loop verification, your API key.",
  openGraph: {
    title: "Tvashtra — LLM-driven CAD that doesn't lie",
    description:
      "Desktop CAD where the model builds, sees, and verifies its own work. Real OCCT B-rep, no SDFs, no toy meshes.",
    url: "https://tvashtra.app",
    siteName: "Tvashtra",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tvashtra — LLM-driven CAD that doesn't lie",
    description:
      "Desktop CAD where the model builds, sees, and verifies its own work.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-IN"
      className={`${plexSans.variable} ${plexMono.variable} ${tiroDeva.variable} ${instrumentSerif.variable}`}
    >
      <body>
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
