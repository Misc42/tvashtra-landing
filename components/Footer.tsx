import Link from "next/link";

const links = [
  ["Misc42 Labs", "https://misc42.github.io/misc42labs/"],
  ["Privacy", "/privacy"],
  ["Terms", "/terms"],
  ["X", "https://x.com/misc42"],
] as const;

export default function Footer() {
  return (
    <footer className="border-t border-rule">
      <div className="wrap flex flex-wrap items-center justify-between gap-3 py-6 text-[13.5px] text-faint">
        <nav className="flex flex-wrap gap-5">
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
        <span>
          © 2026{" "}
          <Link
            href="https://misc42.github.io/misc42labs/"
            className="transition hover:text-ink"
            target="_blank"
            rel="noopener noreferrer"
          >
            Misc42 Labs
          </Link>
        </span>
      </div>
    </footer>
  );
}
