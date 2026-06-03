import Link from "next/link";

// Mono nav — the same understated link rail as sanketra's footer. Only the
// routes that actually exist on this site (no Refunds/Changelog pages yet).
const links = [
  ["Privacy", "/privacy"],
  ["Terms", "/terms"],
  ["GitHub", "https://github.com/Misc42/tvashtra-landing"],
  ["X", "https://x.com/tanaymisra97"],
] as const;

export default function Footer() {
  return (
    <footer className="wrap mt-28 flex flex-col gap-6 border-t border-rule py-12 text-sm text-muted md:flex-row md:items-center md:justify-between">
      <p className="serif-italic text-lg text-ink">
        A{" "}
        <a
          href="https://misc42.github.io/misc42labs/"
          target="_blank"
          rel="noreferrer"
          className="underline decoration-rule underline-offset-4 transition hover:text-saffron"
        >
          Misc42 Labs
        </a>{" "}
        product &middot; made by{" "}
        <a
          href="https://x.com/tanaymisra97"
          target="_blank"
          rel="noreferrer"
          className="underline decoration-rule underline-offset-4 transition hover:text-saffron"
        >
          Tanay Misra
        </a>
      </p>
      <nav className="label flex flex-wrap gap-5">
        {links.map(([label, href]) => (
          <Link
            key={href}
            href={href}
            className="transition hover:text-saffron"
          >
            {label}
          </Link>
        ))}
        <span className="font-mono text-faint">&copy; 2026</span>
      </nav>
    </footer>
  );
}
