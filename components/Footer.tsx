import Link from "next/link";

const links = [
  ["Privacy", "/privacy"],
  ["Terms", "/terms"],
  ["GitHub", "https://github.com/Misc42/tvashtra-landing"],
  ["X", "https://x.com/tanaymisra97"],
] as const;

export default function Footer() {
  return (
    <footer className="wrap mt-24 flex flex-col gap-5 border-t border-rule py-10 text-sm text-muted md:flex-row md:items-center md:justify-between">
      <nav className="flex flex-wrap gap-5 font-mono text-[0.72rem] uppercase tracking-[0.14em]">
        {links.map(([label, href]) => (
          <Link
            key={href}
            href={href}
            className="transition hover:text-saffron"
          >
            {label}
          </Link>
        ))}
      </nav>
      <p className="serif-italic text-lg text-ink">
        Made by{" "}
        <a
          href="https://x.com/tanaymisra97"
          target="_blank"
          rel="noreferrer"
          className="text-ink underline decoration-rule underline-offset-4 transition hover:text-saffron"
        >
          Tanay Misra
        </a>{" "}
        in Bharat &middot; <span className="font-mono not-italic text-faint">&copy; 2026</span>
      </p>
    </footer>
  );
}
