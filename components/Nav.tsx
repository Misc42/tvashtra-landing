"use client";

import Link from "next/link";
import { useState } from "react";

const links = [
  ["How", "/#how"],
  ["Anatomy", "/#anatomy"],
  ["Tour", "/#tour"],
  ["Install", "/#install"],
  ["Browser", "/#browser"],
  ["FAQ", "/#faq"],
  ["GitHub", "https://github.com/Misc42/tvashtra-landing"],
] as const;

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="wrap flex items-center justify-between py-7 label text-faint">
      <Link
        href="/"
        className="group flex items-baseline gap-2 border-b border-transparent text-ink"
      >
        <span className="font-semibold tracking-[0.12em]">Tvashtra</span>
        <span className="deva text-base italic normal-case tracking-normal text-muted transition group-hover:text-saffron">
          त्वष्त्र
        </span>
      </Link>
      <nav className="hidden items-center gap-7 md:flex">
        {links.map(([label, href]) => (
          <Link
            key={href}
            href={href}
            className="border-b border-transparent transition hover:border-saffron hover:text-saffron"
          >
            {label}
          </Link>
        ))}
      </nav>
      <button
        type="button"
        className="rounded-sm border border-rule px-3 py-2 text-ink md:hidden"
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen((value) => !value)}
      >
        <span className="sr-only">Open navigation</span>
        Menu
      </button>
      <div
        id="mobile-nav"
        className={`absolute left-[var(--pad)] right-[var(--pad)] top-20 z-20 grid gap-4 rounded-md border border-rule bg-surface p-5 shadow-2xl transition md:hidden ${
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
          >
            {label}
          </Link>
        ))}
      </div>
    </header>
  );
}
