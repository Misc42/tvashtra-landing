"use client";

import Link from "next/link";
import { useState } from "react";

const links = [
  ["The loop", "/#loop"],
  ["Proof", "/#proof"],
  ["Install", "/#install"],
  ["GitHub", "https://github.com/Misc42/tvashtra-landing"],
] as const;

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 border-b border-rule bg-bg/85 backdrop-blur-md">
      <div className="wrap flex h-[68px] items-center justify-between">
        <Link href="/" className="flex items-baseline gap-2.5 text-ink">
          <span className="text-[17px] font-bold tracking-[-0.02em]">
            Tvashtra
          </span>
          <span className="deva text-[15px] font-medium text-faint">
            त्वष्त्र
          </span>
        </Link>
        <nav className="hidden items-center gap-[30px] text-sm font-medium text-muted md:flex">
          {links.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="transition hover:text-ink"
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
            >
              {label}
            </Link>
          ))}
        </nav>
        <Link href="/#install" className="btn-nav hidden md:inline-flex">
          Join the beta
        </Link>
        <button
          type="button"
          className="rounded-lg border border-rule-2 px-3 py-2 text-ink md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">Open navigation</span>
          Menu
        </button>
      </div>
      <div
        id="mobile-nav"
        aria-hidden={!open}
        inert={!open || undefined}
        className={`absolute left-[var(--pad)] right-[var(--pad)] top-[68px] z-20 grid gap-4 rounded-xl border border-rule bg-bg-alt p-5 shadow-2xl transition md:hidden ${
          open
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-3 opacity-0"
        }`}
      >
        {links.map(([label, href]) => (
          <Link
            key={href}
            href={href}
            className="py-1 text-ink"
            onClick={() => setOpen(false)}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
          >
            {label}
          </Link>
        ))}
        <Link
          href="/#install"
          className="btn-nav justify-center"
          onClick={() => setOpen(false)}
        >
          Join the beta
        </Link>
      </div>
    </header>
  );
}
