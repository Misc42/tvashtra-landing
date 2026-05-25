import Image from "next/image";
import { asset } from "@/lib/asset";

// Side-by-side prompt → render gallery showing what Tvashtra can build
// end-to-end. Each card carries the literal prompt text the user types,
// the rendered output, and the tool-call trail the model dispatches into
// the kernel. New v0.4-dev cards (drawings, materials, mate, tolerances)
// sit at the top — they're the marquee work since v0.3.0 shipped. The
// v0.3.0 cards stay below as continued proof-points; nothing about them
// regressed.
type Showcase = {
  id: string;
  /** `id` doubles as the section anchor (e.g. `#showcase-drawings`) so
   * the WhatsNew strip above the fold can jump to a card directly. */
  src: string;
  prompt: string;
  ops: string[];
  feature: string;
  title: string;
  body: string;
  /** Optional badge above the title — used to flag "new in v0.4-dev"
   * cards so visitors can tell the marquee work apart from the older
   * proof-points beneath. */
  badge?: string;
};

const showcases: Showcase[] = [
  // --- v0.4-dev marquee work (new since v0.3.0) ---
  {
    id: "showcase-drawings",
    src: "/screenshots/showcase/drawings-a4-bracket.png",
    badge: "New · v0.4-dev",
    prompt:
      "Take the bracket and make an A4 engineering drawing — front, top, right, plus an iso in the fourth quadrant. Scale 1:1. Title: \"NEMA 17 mount\".",
    ops: [
      "cad_drawing(sheet=A4, layout=landscape, title=\"NEMA 17 mount\")",
      "cad_drawing_view(projection=front, position=(70, 60), scale=1.0)",
      "cad_drawing_view(projection=top,   position=(70, 130), scale=1.0)",
      "cad_drawing_view(projection=right, position=(200, 60), scale=1.0)",
      "cad_drawing_view(projection=iso,   position=(200, 130), scale=1.0)",
    ],
    feature: "2D engineering drawings · projected views · SVG out",
    title: "From 3D model to shop drawing.",
    body:
      "Visible edges drawn solid. Occluded edges drawn dashed — the projector classifies them automatically via depth-buffer occlusion. SVG / PDF / DXF out the back. The same drawing the machine shop expects, generated from the same prompt that built the part.",
  },
  {
    id: "showcase-materials",
    src: "/screenshots/showcase/materials-pbr-presets.png",
    badge: "New · v0.4-dev",
    prompt:
      "Make a 60×40×8 mm bracket in brushed aluminium. Then duplicate it three times: polished steel, brass, and anodized red.",
    ops: [
      "cad_box(60 × 40 × 8) × 4",
      "cad_set_material(brushed_aluminum)",
      "cad_set_material(polished_steel)",
      "cad_set_material(brass)",
      "cad_set_material(anodized_red)",
    ],
    feature: "PBR material presets · 7 stocks, one tool call each",
    title: "Real materials, not vertex tints.",
    body:
      "Seven physically-grounded presets — brushed aluminium, polished steel, brass, anodized red, plastic matte, glass, studio clay — resolve to PBR base colour, metallic, and roughness at MaterialUbo bind time. No texture maps to ship, no shader edits. Tag a shape, the renderer handles the rest.",
  },
  {
    id: "showcase-mate",
    src: "/screenshots/showcase/mate-flange-pair.png",
    badge: "New · v0.4-dev",
    prompt:
      "Stack the second flange concentric on the first along the bolt circle, faces flush. Keep the mate so they re-solve if I move either one.",
    ops: [
      "cad_insert_part(ISO 4032 M8 hex nut) × 2",
      "cad_mate(kind=concentric, source=flange_b, target=flange_a)",
      "cad_mate(kind=coincident, source=flange_b/top, target=flange_a/bottom)",
    ],
    feature: "Persistent assembly mate · 6 SOLIDWORKS-style kinds",
    title: "Constraints that outlive the call.",
    body:
      "Unlike a one-shot align, a mate is stored on the document. Concentric, coincident, parallel, perpendicular, distance, angle. Move a participating part later and the solver re-runs — the moved shape stays bound. Single-constraint resolution today; chained DOF analysis lands in v0.5.",
  },
  {
    id: "showcase-tolerance",
    src: "/screenshots/showcase/tolerance-selection-fit.png",
    badge: "New · v0.4-dev",
    prompt:
      "Click the bore face. Now apply an H7 hole-basis fit. Then chamfer the four top edges I just selected — 0.5 mm.",
    ops: [
      "cad_select(name=\"bore\", face_ids=[6])  — from viewport click",
      "cad_tolerance(entity_ref=@selected, kind=fit_h7)",
      "cad_select(name=\"top_edges\", edge_ids=[12, 13, 14, 15])",
      "cad_chamfer(edge_refs=@group:top_edges, distance=0.5)",
    ],
    feature: "Click-to-select · GD&T bands · named groups across turns",
    title: "Pick a face. Type intent. The model already knows the ID.",
    body:
      "Click the viewport, the SelectionChip lights up above the chat. \"@selected.faces[0]\" resolves to the face you picked. Register a named group, address it across turns. Tolerances ride alongside the geometry — linear, angular, ISO 286 H7/G6/N6 fit bands — persisted in the .tvr, surfaced in the Inspector.",
  },
  // --- v0.3.0 proof-points (still live, still correct) ---
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
        Nine parts.{" "}
        <span className="text-saffron">Nine prompts.</span>
        <br />
        <span className="text-muted">Zero clicks.</span>
      </h2>
      <p className="mt-5 max-w-2xl text-muted">
        Each card is the literal text the user typed, the exact tool calls the
        model dispatched into the OCCT kernel, and the rendered output the
        viewport sent back — the same image the model saw before it answered
        &ldquo;done.&rdquo; Top row is the v0.4-dev wave; the older v0.3.0
        proof-points follow.
      </p>

      <div className="mt-14 grid gap-10 lg:grid-cols-2">
        {showcases.map((s) => (
          <article
            key={s.id}
            id={s.id}
            className="card scroll-mt-24 overflow-hidden"
          >
            <div className="relative aspect-[4/3] w-full bg-paper">
              <Image
                src={asset(s.src)}
                alt={s.title}
                fill
                sizes="(min-width: 1024px) 540px, 100vw"
                className="object-contain"
              />
              {s.badge && (
                <span className="absolute right-3 top-3 rounded-sm border border-saffron/60 bg-paper/90 px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-saffron backdrop-blur-sm">
                  {s.badge}
                </span>
              )}
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
