import Image from "next/image";
import { asset } from "@/lib/asset";

// Side-by-side prompt → render gallery showing what Tvashtra v0.3.0 can
// actually build end-to-end. Each card carries the literal prompt text the
// user types, the rendered output, and the tool-call trail the model
// dispatches into the kernel.
type Showcase = {
  id: string;
  src: string;
  prompt: string;
  ops: string[];
  feature: string;
  title: string;
  body: string;
};

const showcases: Showcase[] = [
  {
    id: "motor-mount-bracket",
    src: "/screenshots/showcase/motor-mount-bracket.png",
    prompt:
      "Make a 100×80×8 mm aluminium plate. Cut a 40 mm bore through the centre for a NEMA 17 motor. Add four M5 clearance holes — one at each corner, 70 mm × 56 mm centres.",
    ops: [
      "box(100 × 80 × 8)",
      "hole(⌀40 through, centre)",
      "hole(⌀5.5 through) × 4 — corners",
    ],
    feature: "Motor mount · centre bore · 4-corner pattern",
    title: "A real engineering bracket.",
    body:
      "Six op calls. One parametric history. The bore and corner clearances are real boolean cuts against the plate — not screen-space tricks, not a textured mesh.",
  },
  {
    id: "bolt-pattern-plate",
    src: "/screenshots/showcase/bolt-pattern-plate.png",
    prompt:
      "Make a 150×100×10 mm aluminium plate. Drill six M6 clearance holes in a 3×2 grid with 40 mm spacing, then add a 4 mm fillet on the corner edges.",
    ops: [
      "box(150 × 100 × 10)",
      "hole(⌀6.4 through) × 6 — 3×2 grid",
      "fillet(r = 4) — corner edges",
    ],
    feature: "3×2 bolt-hole grid · corner fillet",
    title: "Mounting plates, one prompt.",
    body:
      "The whole reason you reach for a CAD tool: a panel with a real hole pattern that lines up against another part. Drill grid, fillet the corners, hand it to the machinist.",
  },
  {
    id: "circular-flange",
    src: "/screenshots/showcase/circular-flange.png",
    prompt:
      "Make a 100 mm diameter, 15 mm thick flange. Cut a 30 mm centre bore. Add 6 M6 clearance holes equally spaced around the 38 mm radius bolt circle.",
    ops: [
      "cylinder(r = 50, h = 15)",
      "hole(⌀30 through, centre)",
      "hole(⌀6.4 through) × 6 — circular pattern at r = 38",
    ],
    feature: "Cylindrical flange · 6-bolt circular pattern",
    title: "Bolt circles, computed not clicked.",
    body:
      "Pump flanges, mating plates, structural couplings. The model places six holes equally around the bolt circle in a single batch — none of them clicked, none of them dragged from a sketch.",
  },
  {
    id: "fastener-stack",
    src: "/screenshots/showcase/fastener-stack.png",
    prompt:
      "Insert an M5×20 socket head cap screw, an M5 washer, and an M5 hex nut along the +Z axis as an exploded view.",
    ops: [
      "insert_part(ISO 4762 M5×20 SHCS)",
      "insert_part(ISO 7089 M5 washer)",
      "insert_part(ISO 4032 M5 hex nut)",
    ],
    feature: "Standard parts catalog · ISO-spec fasteners",
    title: "Off-the-shelf parts, one call each.",
    body:
      "32 ISO-spec fastener rows (SHCS, hex nut, hex bolt, washer — M2 through M12) parameterised end-to-end. You don't model the bolt. You ask for it.",
  },
  {
    id: "cube-bore-fillet",
    src: "/screenshots/showcase/cube-fillet-bore.png",
    prompt:
      "Make a 60 mm cube with a 20 mm cylindrical bore through it and a 3 mm fillet on all top edges.",
    ops: [
      "box(60 × 60 × 60)",
      "hole(⌀20 through)",
      "fillet(r = 3) — 4 top edges",
    ],
    feature: "Boolean cut · multi-edge fillet",
    title: "Boolean, then fillet, in one breath.",
    body:
      "The model identifies which four edges are the top of the cube post-bore (using cad_find_face on the +Z normal), then fillets exactly those — no manual edge picking, no clicking around in a viewport.",
  },
];

export default function Showcase() {
  return (
    <section id="showcase" className="wrap border-b border-rule py-20">
      <p className="masthead mb-4">Features in action</p>
      <h2 className="section-title max-w-3xl">
        Five parts.{" "}
        <span className="text-saffron">Five prompts.</span>
        <br />
        <span className="text-muted">Zero clicks.</span>
      </h2>
      <p className="mt-5 max-w-2xl text-muted">
        Each card is the literal text the user typed, the exact tool calls the
        model dispatched into the OCCT kernel, and the rendered output the
        viewport sent back — the same image the model saw before it answered
        &ldquo;done.&rdquo;
      </p>

      <div className="mt-14 grid gap-10 lg:grid-cols-2">
        {showcases.map((s) => (
          <article key={s.id} className="card overflow-hidden">
            <div className="relative aspect-[4/3] w-full bg-paper">
              <Image
                src={asset(s.src)}
                alt={s.title}
                fill
                sizes="(min-width: 1024px) 540px, 100vw"
                className="object-contain"
              />
            </div>
            <div className="space-y-4 border-t border-rule px-6 py-5">
              <p className="masthead text-saffron">{s.feature}</p>
              <h3 className="text-lg font-semibold leading-tight text-ink">
                {s.title}
              </h3>
              <p className="text-sm text-muted">{s.body}</p>

              <div className="rounded-sm border border-rule bg-paper/60 px-4 py-3">
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-faint">
                  You typed
                </p>
                <p className="serif-italic mt-1 text-sm text-ink">
                  &ldquo;{s.prompt}&rdquo;
                </p>
              </div>

              <div>
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-faint">
                  The model dispatched
                </p>
                <ul className="mt-2 space-y-1 font-mono text-[0.74rem] leading-relaxed text-muted">
                  {s.ops.map((op, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-saffron">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span>{op}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
