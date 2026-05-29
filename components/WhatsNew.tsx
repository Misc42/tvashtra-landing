// Lightweight release-context strip — sits between Hero and Problem to
// signal what landed in the v0.4-dev wave without forcing visitors into
// the FAQ. Four pills, each anchored at a Showcase card below; clicking
// jumps the page to that card so the bullet "drawings" turns into a real
// rendered example in one scroll. No animation, no dismiss state — this
// is release context, not a notification.
import Link from "next/link";

const pills = [
  {
    label: "Engineering drawings",
    href: "#showcase-drawings",
    detail: "A4 sheet, 4 projected views, SVG out",
  },
  {
    label: "PBR materials",
    href: "#showcase-materials",
    detail: "Brushed aluminium, brass, anodized — 7 presets",
  },
  {
    label: "Assembly mates",
    href: "#showcase-mate",
    detail: "Concentric, coincident — persistent, re-solve",
  },
  {
    label: "GD&T tolerances",
    href: "#showcase-tolerance",
    detail: "Linear, angular, ISO 286 fit bands",
  },
];

export default function WhatsNew() {
  return (
    <section
      id="whats-new"
      aria-label="What's new in this release"
      className="wrap border-b border-rule py-10 lg:py-12"
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
        <div className="flex-shrink-0">
          <p className="masthead mb-2">v0.4 &middot; in flight</p>
          <h2 className="card-title text-xl lg:text-2xl">
            Six new ops landed since the last release.
          </h2>
          <p className="lead mt-1.5 text-sm lg:text-base">
            Drawings, materials, assembly, tolerances. Jump to each below.
          </p>
        </div>
        <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:flex lg:flex-wrap lg:justify-end lg:gap-3">
          {pills.map((p) => (
            <li key={p.href}>
              <Link
                href={p.href}
                className="group flex flex-col items-start gap-0.5 rounded-sm border border-rule bg-paper/40 px-3.5 py-2.5 transition hover:border-saffron hover:bg-saffron/[0.06] focus-visible:border-saffron focus-visible:outline-none lg:max-w-[14rem]"
              >
                <span className="label text-[0.62rem] text-saffron">
                  {p.label}
                </span>
                <span className="text-[0.72rem] leading-tight text-muted transition group-hover:text-ink">
                  {p.detail}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
