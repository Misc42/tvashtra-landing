// Lightweight release-context strip — sits between Hero and Problem to
// signal what landed in the v0.7 wave without forcing visitors into
// the FAQ. Four pills, each anchored at a Showcase card below; clicking
// jumps the page to that card so the bullet "live stress" turns into a
// real rendered example in one scroll. No animation, no dismiss state —
// this is release context, not a notification.
import Link from "next/link";

const pills = [
  {
    label: "Interactive 3D viewport",
    href: "#showcase-stress",
    detail: "Live PBR canvas — orbit, 6 render modes, GPU",
  },
  {
    label: "Click-to-select + gizmo",
    href: "#showcase-tolerance",
    detail: "Pick in 3D, drag translate / rotate / scale",
  },
  {
    label: "Live stress in the viewport",
    href: "#showcase-stress",
    detail: "von-Mises heatmap, turbo colormap, MPa legend",
  },
  {
    label: "Reference planes & datums",
    href: "#showcase",
    detail: "Offset / angled planes, derived points & axes",
  },
];

// v0.9 wave — shipped in the tagged download (current install is v0.9.0).
// The full mechatronics arc reachable conversationally: mechanical + simulation
// + robotics + electronics, each from a prompt.
const shipped09 = [
  {
    label: "Simulation suite",
    detail: "Stress · fatigue life · modal (resonance) · buckling",
  },
  {
    label: "Electronics (KiCad)",
    detail: "Emit a real .kicad_pcb board outline from a prompt",
  },
  {
    label: "Assemblies → robots",
    detail: "Typed joints + BOM; URDF export, FK / Jacobian",
  },
  {
    label: "Editable parametrics",
    detail: "“Change all M5 holes to M6” — the model rebuilds",
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
          <p className="masthead mb-2">v0.7 &middot; shipped</p>
          <h2 className="card-title text-xl lg:text-2xl">
            The viewport is alive now.
          </h2>
          <p className="lead mt-1.5 text-sm lg:text-base">
            A real 3D canvas you orbit, pick, transform, and read stress on.
            Jump to each below.
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

      <div className="mt-8 flex flex-col gap-3 border-t border-rule pt-6 lg:flex-row lg:items-center lg:gap-8">
        <p className="masthead flex-shrink-0 text-saffron">
          v0.9 &middot; shipped
        </p>
        <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:flex lg:flex-wrap lg:gap-6">
          {shipped09.map((b) => (
            <li key={b.label} className="flex flex-col items-start gap-0.5">
              <span className="label text-[0.62rem] text-muted">
                {b.label}
              </span>
              <span className="text-[0.72rem] leading-tight text-faint">
                {b.detail}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
