import Image from "next/image";
import { asset } from "@/lib/asset";
import PartViewer from "./PartViewer";

// PartViewer is a Client Component ('use client') that pulls in
// @google/model-viewer (a browser-only web component) and WebGL. It is
// SSR-safe on its own: the model-viewer import runs in a browser-only
// `useEffect`, and until that resolves the component renders the same still
// the other cards show. So it can be imported directly here — the static
// export prerenders the poster <img>, and the 3D registers on the client.
// (next/dynamic's `ssr: false` is disallowed inside a Server Component, which
// this section is, so the guard lives in PartViewer rather than at the import.)

// Side-by-side prompt → render gallery showing the breadth of what
// Tvashtra builds end-to-end. Each card carries the literal prompt text the
// user types, the rendered output, and the cad-* tool-call trail the model
// dispatches into the kernel. The differentiators lead — semantic bulk
// edits, the FEM suite (live stress, modal, thermal, nonlinear-plastic,
// transient dynamic), exploded assemblies, the ECAD↔MCAD bridge plus circuit
// SPICE, model-driven design exploration, and the parametric design-space
// sweep. The mechanical proof-points follow as continued evidence that the
// core modeling never regressed; presentation video export sits among them.
type Showcase = {
  id: string;
  /** `id` doubles as the section anchor (e.g. `#showcase-stress`) so the
   * WhatsNew strip above the fold can jump to a card directly. */
  src: string;
  /** When set, the card renders an autoplay-muted-loop clip instead of a
   * still — used for the orbiting FEM, the vibrating mode shape, and the
   * exploding assembly, where the motion is the proof. */
  video?: boolean;
  /** Poster frame for the clip — shown before the video decodes. */
  poster?: string;
  /** When set, the card is an orbitable 3D part instead of a still. The GLB
   * loads only after the visitor clicks the card (see PartViewer); until then
   * the same `src` still is shown as the poster. Each geometry card gets its
   * own `exposure` / `shadow` so no two parts read with the same finish —
   * they sit distinct alongside the multi-colour FEM cards. SIM cards (the
   * FEM clips) never carry a `model` — they stay <video>. */
  model?: { src: string; exposure: number; shadow: number };
  prompt: string;
  ops: string[];
  feature: string;
  title: string;
  body: string;
  /** Optional badge above the title — used to flag the differentiator
   * cards so visitors can tell the headline capabilities apart from the
   * supporting proof-points beneath. */
  badge?: string;
};

const showcases: Showcase[] = [
  // --- the differentiators (lead the section) ---
  {
    id: "showcase-semantic-edit",
    src: "/screenshots/showcase/semantic-edit.png",
    model: { src: "/models/semantic-edit.glb", exposure: 1.05, shadow: 0.55 },
    badge: "Differentiator",
    prompt: "Change every M5 hole on this bracket to M6.",
    ops: [
      "cad_find_face(query=\"cylindrical, ⌀5.5\")  — locate every M5 clearance bore",
      "cad_edit_bulk(match=@found, op=resize_hole, diameter=6.6)",
      "cad_render(views=[iso])  — model re-reads the edited part",
    ],
    feature: "Semantic bulk edit · one sentence rewrites the part",
    title: "One sentence edits the whole part.",
    body:
      "Not find-and-replace on text — a B-rep edit. The model resolves \"every M5 hole\" to the actual cylindrical faces in the solid, re-bores each to M6 clearance, and re-reads the result before it answers. Change the intent, the geometry follows. No feature tree to hunt through, no holes missed.",
  },
  {
    id: "showcase-stress",
    src: "/screenshots/showcase/stress-orbit.mp4",
    video: true,
    poster: "/screenshots/showcase/stress-orbit-poster.jpg",
    badge: "Differentiator",
    prompt:
      "Clamp the bottom face, push -100 N straight down on the top, steel. Show me where it yields.",
    ops: [
      "cad_select(name=\"base\", face_ids=[0])  — clamp face",
      "cad_select(name=\"top\",  face_ids=[5])  — load face",
      "cad_stress(clamp=@base, load=@top, force=(0, 0, -100), material=steel_1018)",
    ],
    feature: "Live von-Mises FEM · in-viewport heatmap · MPa legend",
    title: "Stress, solved in the conversation.",
    body:
      "A real finite-element solve, not a colour gradient. The von-Mises field is drawn straight onto the part — turbo colormap, peak σ called out (162 MPa here), MPa legend bottom-right. No export round-trip to a separate analysis tool: ask for the load case, read the heatmap, iterate.",
  },
  {
    id: "showcase-modal",
    src: "/screenshots/showcase/modal.mp4",
    video: true,
    poster: "/screenshots/showcase/modal-poster.jpg",
    badge: "Differentiator",
    prompt:
      "What's the first natural frequency of this plate, and animate the mode shape.",
    ops: [
      "cad_modal(material=aluminum_6061, modes=1)",
      "cad_modal(animate=true)  — sweep the deformation",
    ],
    feature: "Modal analysis · natural frequency · animated mode shape",
    title: "Find the resonance before it finds you.",
    body:
      "The eigenmode solve returns the natural frequencies and the deformation shape for each. The clip sweeps the first mode so you see exactly how the plate flexes when it rings. The vibration question every mechatronic part has to answer — answered in the same chat that built it.",
  },
  {
    id: "showcase-thermal",
    src: "/screenshots/showcase/thermal.mp4",
    video: true,
    poster: "/screenshots/showcase/thermal-poster.jpg",
    badge: "Differentiator",
    prompt:
      "The regulator dumps ~1.8 W and the MCU ~1 W into this board. Show me where it runs hot.",
    ops: [
      "cad_thermal(source=@regulator, power=1.8W, ambient=25 °C)",
      "cad_thermal(source=@mcu, power=1.0W)",
      "cad_render(field=temperature)  — °C heatmap painted on the board",
    ],
    feature: "Steady-state thermal FEM · temperature field · heatmap",
    title: "See the heat before the board does.",
    body:
      "A real steady-state heat-transfer solve — the same FEM engine behind the stress and modal cards. Power dissipated at the components conducts through the board and sheds off the cooler edges; the temperature field is drawn straight onto the part — hottest at the power components (red), coolest at the rim (blue). The thermal question answered in the conversation that laid out the board, not on the bench with a thermal camera.",
  },
  {
    id: "showcase-nonlinear",
    src: "/screenshots/showcase/nonlinear.png",
    badge: "Differentiator",
    prompt:
      "Push this bracket past its limit — 4 kN on the arm, steel. Does it spring back or take a permanent bend?",
    ops: [
      "cad_select(name=\"root\", face_ids=[0])  — fixed end",
      "cad_select(name=\"tip\",  face_ids=[7])  — load face",
      "cad_nonlinear(clamp=@root, load=@tip, force=4000, material=steel_1018, increments=12)",
    ],
    feature: "Nonlinear plastic FEM · *STATIC, NLGEOM · PEEQ field",
    title: "Past the elastic limit, honestly.",
    body:
      "Linear stress gives you the peak number; it can’t tell you whether the part comes back. This is a large-deformation elastic-plastic solve — the load is ramped over a multi-increment history, the material yields where it should, and the equivalent plastic strain (PEEQ) is painted where metal has taken a permanent set. You read the necking, not a colour past a redline that may or may not mean failure.",
  },
  {
    id: "showcase-dynamic",
    src: "/screenshots/showcase/dynamic.mp4",
    video: true,
    poster: "/screenshots/showcase/dynamic-poster.jpg",
    badge: "Differentiator",
    prompt:
      "It gets a 50 N tap for 5 ms, then nothing. Show me how it rings down over the next half second.",
    ops: [
      "cad_modal(material=aluminum_6061, modes=6)  — eigenmodes first",
      "cad_dynamic(load=@tip, profile=impulse(50, 5ms), duration=0.5s)",
      "cad_render(field=displacement, animate=true)  — sweep the time response",
    ],
    feature: "Transient dynamic FEM · *MODAL DYNAMIC · time-domain ring-down",
    title: "How it rings when you hit it.",
    body:
      "Modal tells you the frequencies; this tells you the actual motion in time. A *MODAL DYNAMIC solve projects a time-varying load onto the eigenmodes and integrates the response, so you watch the part oscillate and decay after the impulse — not a static mode shape, the real ring-down. The clip plays the displacement field across the half-second window.",
  },
  {
    id: "showcase-explode",
    src: "/screenshots/showcase/explode.mp4",
    video: true,
    poster: "/screenshots/showcase/explode-poster.jpg",
    badge: "Differentiator",
    prompt:
      "Mate these four parts into the housing, then give me an exploded view I can show the assembler.",
    ops: [
      "cad_mate(kind=concentric, source=lid, target=housing)",
      "cad_mate(kind=coincident, source=board, target=housing/floor)",
      "cad_explode(factor=1.0, axis=auto)  — fan the stack along the assembly axis",
    ],
    feature: "Assembly mates · exploded view · per-part materials",
    title: "Assemblies that come apart on command.",
    body:
      "Four distinct parts, four distinct materials, mated into one housing — then fanned out along the assembly axis so every interface is legible. The ghosted wireframe holds the assembled position. The same document drives both the build and the shop-floor exploded view.",
  },
  {
    id: "showcase-pcb",
    src: "/screenshots/showcase/pcb-enclosure.png",
    model: { src: "/models/pcb.glb", exposure: 1.0, shadow: 0.7 },
    badge: "Differentiator",
    prompt:
      "Take this KiCad board, give it a 1.6 mm solid with four M3 mounting holes, and fit it for an enclosure.",
    ops: [
      "cad_pcb_outline(width=80, height=60, path=\"board.kicad_pcb\")",
      "cad_board_solid(path=\"board.kicad_pcb\", thickness=1.6, holes=4×⌀3.2)",
      "cad_set_material(plastic_matte)",
    ],
    feature: "ECAD ↔ MCAD bridge · KiCad outline → OCCT solid",
    title: "The board becomes mechanical.",
    body:
      "Tvashtra reads the KiCad Edge.Cuts outline and lifts it into a real OCCT solid — board thickness, mounting holes drilled board-through for the standoffs. From there it mates into an enclosure cavity like any other part. Electronics and mechanics, one model, one conversation.",
  },
  {
    id: "showcase-circuit-sim",
    src: "/screenshots/showcase/circuit-sim.png",
    badge: "Differentiator",
    prompt:
      "Take the board’s netlist and simulate it — DC operating point, then sweep the input and give me the Bode plot.",
    ops: [
      "cad_circuit_sim(netlist=\"board.kicad_pcb\", analysis=op)  — DC operating point",
      "cad_circuit_sim(analysis=dc_sweep, source=Vin, range=[0, 5])",
      "cad_circuit_sim(analysis=ac, decade=10, start=1, stop=1e6)  — Bode",
    ],
    feature: "Electronic simulation · ngspice SPICE · op / DC / AC / transient",
    title: "And now the board simulates.",
    body:
      "The same board you lifted into a solid carries a netlist — Tvashtra hands it to ngspice and runs a real SPICE deck. DC operating point, DC sweep, AC frequency response (the Bode plot), and transient waveforms come back as actual curves, not estimates. The board becomes mechanical, then it tells you whether the circuit behaves before you order it.",
  },
  {
    id: "showcase-explore-designs",
    src: "/screenshots/showcase/explore-designs.png",
    badge: "Differentiator",
    prompt:
      "Same load-bearing brief — give me genuinely different structures, not the same plate at three thicknesses. Build them and rank them.",
    ops: [
      "cad_explore_designs(brief=@brief, drafts=3)  — rib-stiffened plate · box-section · truss",
      "cad_explore_designs(measure=[mass, stiffness, machinability])",
      "cad_explore_designs(rank=nsga2)  — sort the drafts onto the Pareto front",
    ],
    feature: "Model-driven design exploration · distinct topologies · NSGA-II ranked",
    title: "Different structures, not the same part resized.",
    body:
      "The parametric sweep walks one dimension of a fixed shape. This is the other axis: the model authors several topologically-distinct drafts for one brief — a rib-stiffened plate, a box-section, a truss — builds each, measures it, and ranks them on the NSGA-II front. Diverse candidates, scored and laid out side by side. It widens the search; it doesn’t claim to have found the global optimum.",
  },
  {
    id: "showcase-pareto",
    src: "/screenshots/showcase/pareto.png",
    model: { src: "/models/pareto.glb", exposure: 1.25, shadow: 0.45 },
    badge: "Differentiator",
    prompt:
      "Give me three variants of this bracket and rank them by mass against manufacturability.",
    ops: [
      "cad_pareto(param=wall_thickness, range=[3, 8], samples=3)",
      "cad_pareto(objectives=[mass, machinability])",
      "cad_render(views=[iso])  — lay the front rank side by side",
    ],
    feature: "Design-space sweep · Pareto front · ranked variants",
    title: "It explores the alternatives for you.",
    body:
      "Describe the trade-off and the model sweeps the parameter, computes mass and a manufacturability score for each variant, and lays the non-dominated set out for you to pick from. The part that no single prompt would have found — surfaced from one.",
  },
  // --- mechanical proof-points (still live, still correct) ---
  {
    id: "motor-mount-bracket",
    src: "/screenshots/showcase/motor-mount-bracket.png",
    model: { src: "/models/motor-mount.glb", exposure: 1.1, shadow: 0.6 },
    prompt:
      "Make a 100×80×8 mm aluminium plate. Cut a 40 mm bore through the centre for a NEMA 17 motor. Add four M5 clearance holes — one at each corner, 70 mm × 56 mm centres.",
    ops: [
      "cad_box(100 × 80 × 8)",
      "cad_hole(⌀40 through, centre)",
      "cad_hole(⌀5.5 through) × 4 — corners",
    ],
    feature: "Motor mount · centre bore · 4-corner pattern",
    title: "A real engineering bracket.",
    body:
      "Six op calls. One parametric history. The bore and corner clearances are real boolean cuts against the plate — not screen-space tricks, not a textured mesh.",
  },
  {
    id: "showcase-drawings",
    src: "/screenshots/showcase/drawings-a4-bracket.png",
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
    id: "showcase-video-export",
    src: "/screenshots/showcase/turntable.mp4",
    video: true,
    poster: "/screenshots/showcase/turntable-poster.jpg",
    prompt:
      "Spin the assembly on a turntable and fan it apart — export both as MP4 and a GIF I can drop in a deck.",
    ops: [
      "cad_render(motion=turntable, frames=120)",
      "cad_render(motion=explode, factor=1.0)",
      "cad_export(video=[mp4_h264, gif])  — shareable clips, straight from the CLI",
    ],
    feature: "Presentation export · turntable / exploded · MP4 (H.264) + GIF",
    title: "A clip for the deck, from the prompt.",
    body:
      "Any view the renderer can hold, it can record. Turntable orbit or exploded fan, written out as H.264 MP4 and GIF straight from the CLI — the same clip you would otherwise screen-capture by hand. The model that built the part also ships the thing you put in the review.",
  },
  {
    id: "showcase-mate",
    src: "/screenshots/showcase/mate-flange-pair.png",
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
      "Unlike a one-shot align, a mate is stored on the document. Concentric, coincident, parallel, perpendicular, distance, angle. Move a participating part later and the solver re-runs — the moved shape stays bound.",
  },
];

export default function Showcase() {
  return (
    <section id="showcase" className="wrap border-b border-rule py-24">
      <p className="section-eyebrow mb-5" data-index="05">
        Features in action
      </p>
      <h2 className="section-title max-w-3xl">
        Describe it.{" "}
        <span className="text-saffron">It builds, simulates, wires.</span>
        <br />
        <span className="text-muted">One conversation.</span>
      </h2>
      <p className="lead mt-6 max-w-2xl text-[clamp(1.15rem,2vw,1.4rem)]">
        Each card is the literal text the user typed, the exact cad-* tool
        calls the model dispatched into the OCCT kernel, and the rendered
        output the viewport sent back — the same image the model saw before
        it answered &ldquo;done.&rdquo; The differentiators lead; the
        mechanical proof-points follow as evidence.
      </p>

      <div className="mt-14 grid gap-10 lg:grid-cols-2">
        {showcases
          .map((s) => (
          <article
            key={s.id}
            id={s.id}
            className="card scroll-mt-24 overflow-hidden"
          >
            <div className="relative aspect-[4/3] w-full bg-paper">
              {s.model ? (
                <PartViewer
                  src={asset(s.model.src)}
                  poster={asset(s.src)}
                  alt={s.title}
                  exposure={s.model.exposure}
                  shadowIntensity={s.model.shadow}
                />
              ) : s.video ? (
                <video
                  src={asset(s.src)}
                  poster={s.poster ? asset(s.poster) : undefined}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  className="absolute inset-0 h-full w-full object-cover"
                  aria-label={s.title}
                >
                  {/* Caption track placeholder — no transcript content fabricated */}
                  <track kind="captions" srcLang="en" label="English captions" default />
                </video>
              ) : (
                <Image
                  src={asset(s.src)}
                  alt={s.title}
                  fill
                  sizes="(min-width: 1024px) 540px, 100vw"
                  className="object-contain"
                />
              )}
              {s.badge && (
                <span className="label absolute right-3 top-3 rounded-sm border border-saffron/60 bg-paper/90 px-2 py-0.5 text-[0.6rem] text-saffron backdrop-blur-sm">
                  {s.badge}
                </span>
              )}
            </div>
            <div className="space-y-4 border-t border-rule px-6 py-5">
              <p className="label text-saffron">{s.feature}</p>
              <h3 className="card-title">{s.title}</h3>
              <p className="text-sm text-muted">{s.body}</p>

              <div className="rounded-sm border border-rule bg-paper/60 px-4 py-3">
                <p className="label text-[0.6rem] text-faint">You typed</p>
                <p className="serif-italic mt-1.5 text-[0.95rem] leading-snug text-ink">
                  &ldquo;{s.prompt}&rdquo;
                </p>
              </div>

              <div>
                <p className="label text-[0.6rem] text-faint">
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
