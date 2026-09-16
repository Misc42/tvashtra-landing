import Image from "next/image";
import { asset } from "@/lib/asset";

type Proof = {
  img: string;
  fit: "contain" | "cover";
  title: string;
  prompt: string;
};

// One proof card per capability — the screenshot on the left, the literal
// prompt on the right, nothing else. Every shipped capability gets a tile
// (breadth over a tight 3×3): each image is the kernel's own render or a real
// tool's own output (FEM, ngspice, DFM, GD&T…), never a mockup.
const proofs: Proof[] = [
  {
    img: "/screenshots/showcase/semantic-edit.png",
    fit: "contain",
    title: "One sentence edits the part",
    prompt: "Change every M5 hole on this bracket to M6.",
  },
  {
    // Standard-parts catalog (cad_find_part / cad_insert_part) — ISO/DIN
    // fasteners with dimensions transcribed from the standards, resolved
    // OFFLINE with no vendor account. Render authored in tvashtra via
    // scripts (M10 bolt + washer + nut), so the figures are reproducible.
    img: "/screenshots/showcase/standard-parts.png",
    fit: "contain",
    title: "Off-the-shelf hardware, built in",
    prompt: "Add an M10 bolt, washer and nut — ISO, real dimensions, no download.",
  },
  {
    // The prompt has to name the load the asset was actually solved at. The
    // previous copy said 100 N against an image solved at 3,000 N.
    img: "/screenshots/showcase/stress-solve.png",
    fit: "contain",
    title: "Stress, solved in-chat",
    prompt: "Clamp the mounting plate. 3,000 N pressing down on the arm. Steel. Where does it yield?",
  },
  {
    // Modal analysis: cad_modal runs a real CalculiX *FREQUENCY eigen solve on a
    // clamped steel cantilever — the natural-frequency spectrum, fundamental
    // highlighted. Same solver as stress/buckling/thermal/fatigue. Reproducible
    // via scripts/build-showcase-modal.sh (needs ccx + gmsh).
    img: "/screenshots/showcase/modal.png",
    fit: "contain",
    title: "It finds the resonances",
    prompt: "What are the natural frequencies of this bracket, clamped at the base?",
  },
  {
    // Thermal: cad_thermal runs a real CalculiX steady-state heat-transfer solve
    // — a copper spreader with one edge at 20 °C and 30 W dissipated in the body;
    // the peak and rise are measured off the field. build-showcase-thermal.sh.
    img: "/screenshots/showcase/thermal.png",
    fit: "contain",
    title: "It solves the heat path",
    prompt: "Chip dumps 30 W into this copper spreader, edge held at 20°C — how hot does it get?",
  },
  {
    // Buckling: cad_buckling runs a real CalculiX *BUCKLE eigen solve — a slender
    // steel column under axial load; the critical load factor and margin come off
    // the solve. build-showcase-buckling.sh.
    img: "/screenshots/showcase/buckling.png",
    fit: "contain",
    title: "It checks the buckling margin",
    prompt: "8 kN straight down this column — does it buckle, and what's the margin?",
  },
  {
    // Fatigue: cad_fatigue runs a real static + S-N stress-life solve — a steel
    // cantilever under a fully-reversed cyclic load; the life and safety factor
    // are measured, not authored. build-showcase-fatigue.sh.
    img: "/screenshots/showcase/fatigue.png",
    fit: "contain",
    title: "It counts the cycles to crack",
    prompt: "This bracket sees ±900 N, fully reversed — how many cycles before it cracks?",
  },
  {
    // Nonlinear: cad_nonlinear runs a real CalculiX *STATIC, NLGEOM + *PLASTIC
    // Newton-Raphson solve — a steel cantilever pushed past yield; the permanent
    // plastic strain is measured. build-showcase-nonlinear.sh.
    img: "/screenshots/showcase/nonlinear.png",
    fit: "contain",
    title: "It knows when it yields",
    prompt: "Load this bracket to 2.6 kN — does it yield, and how much does it deform for good?",
  },
  {
    // Transient dynamics: cad_dynamic runs a real CalculiX modal-superposition
    // transient — a steel cantilever under a sudden tip load; the peak response
    // and its timing come off the solve. build-showcase-dynamic.sh.
    img: "/screenshots/showcase/dynamic.png",
    fit: "contain",
    title: "It rides out the transient",
    prompt: "Hit this cantilever with a sudden 400 N — how far does the tip whip, and when?",
  },
  {
    // "ranked" was the old copy, written when the tile put a #1 badge on one
    // variant off a solver that was misreading its own results. The claim is
    // that the tool MEASURES the alternatives, not that it ranks them — the
    // tile reports whatever the numbers say, and on this set of sections that
    // is one variant winning both columns. The parts are authored in
    // tvashtra's scripts/build-showcase-variants.sh so the figures can be
    // rebuilt; the previous set could not be, which is why they changed.
    img: "/screenshots/showcase/explore-designs.png",
    fit: "contain",
    title: "It explores alternatives",
    prompt: "Same brief, same 100×40×40 envelope — give me genuinely different structures, and weigh them.",
  },
  {
    // Populated board: cad_board_populate reads a real .kicad_pcb, extrudes its
    // outline, and imports every footprint's own 3D model (STEP) from the KiCad
    // library, placed at its pose. tvashtra ships no models — it resolves each
    // (model …) reference the way KiCad does. Reproducible via
    // scripts/build-showcase-pcb.sh (fixture tracked, models fetched, pinned).
    img: "/screenshots/showcase/pcb-enclosure.png",
    fit: "contain",
    title: "The board becomes mechanical",
    prompt: "Take this KiCad board and drop in every component's real 3D model.",
  },
  {
    // Circuit simulation: cad_circuit_sim reads the board's netlist, builds a
    // SPICE deck and runs a real ngspice .ac sweep. The Bode plot and every
    // number (−3 dB corner, roll-off, phase, solve time) are measured off the
    // returned samples — reproducible via scripts/build-showcase-circuit.sh
    // (the circuit_bode example + ngspice), so the figures can be rebuilt.
    img: "/screenshots/showcase/circuit-sim.png",
    fit: "contain",
    title: "Frequency response, simulated",
    prompt: "Simulate this RC filter — where's the -3 dB corner?",
  },
  {
    img: "/screenshots/showcase/drawings-a4-bracket.png",
    fit: "contain",
    title: "Shop drawings out the back",
    prompt: "Make an A4 drawing — front, top, right, iso. Scale 1:1.",
  },
  {
    // GD&T: real feature control frames rendered by the cad-drawing emitter
    // (position / flatness / perpendicularity + datums). Reproducible via
    // scripts/build-showcase-gdt.sh in the main repo.
    img: "/screenshots/showcase/gdt.png",
    fit: "contain",
    title: "Tolerances the shop can hold",
    prompt: "Position the holes ⌀0.1 to A|B|C, flatness 0.05, perpendicular 0.1 to A.",
  },
  {
    // DFM: cad_dfm_check runs a real mouldability / undercut analysis — which
    // faces are trapped by neither mold half on a ±Z pull. The section shows the
    // trapped region in red with a BLOCKER verdict + the trapped area, straight
    // from the tool. Distinct capability, not just another render of the part.
    img: "/screenshots/showcase/dfm-undercut.png",
    fit: "contain",
    title: "It catches what won't mould",
    prompt: "Can this part be injection moulded, pulling ±Z?",
  },
  {
    // A REAL bolted flange coupling — two flanges (disc + hub + bore + bolt
    // holes), four ISO M8 hex bolts (cad_insert_part + cad_thread) and four hex
    // nuts, assembled with cad_assembly / cad_component and fanned along its axis
    // by cad_explode. Every part is real B-rep geometry, not a flat placeholder.
    // Reproducible via scripts/build-showcase-explode.sh (tracked ops recipe).
    img: "/screenshots/showcase/explode-poster.jpg",
    fit: "cover",
    title: "Assemblies that fan apart",
    prompt: "Build a bolted flange coupling, then fan it out for the manual.",
  },
  {
    // Mechatronics: cad_kinematics over a real joint chain — FK + the joint
    // torque a payload needs. Reproducible via build-showcase-kinematics.sh.
    img: "/screenshots/showcase/kinematics.png",
    fit: "contain",
    title: "It knows the mechanism",
    prompt: "Give it two revolute joints — what torque holds a 2 kg part at reach?",
  },
  {
    // Mass properties: cad_mass_properties integrates volume, mass, centre of
    // mass and the inertia tensor over the B-rep solid (the same numbers that
    // drive rigid-body dynamics + URDF export). build-showcase-massprops.sh.
    img: "/screenshots/showcase/massprops.png",
    fit: "contain",
    title: "It knows the part's inertia",
    prompt: "What's this bracket's mass, centre of gravity and inertia tensor?",
  },
];

export default function Proof() {
  return (
    <section id="proof" className="border-t border-rule">
      <div className="wrap py-20">
        <div className="mb-11 flex flex-wrap items-baseline justify-between gap-3">
          <h2 className="text-[38px] font-bold tracking-[-0.025em]">
            Real prompts, real geometry.
          </h2>
          <span className="text-sm text-faint">
            every image is the kernel&rsquo;s own render
          </span>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {proofs.map((p) => (
            <article
              key={p.img}
              className="card overflow-hidden bg-bg-alt"
            >
              <div className="relative aspect-[4/3] w-full bg-bg">
                <Image
                  src={asset(p.img)}
                  alt={p.title}
                  fill
                  sizes="(min-width: 1024px) 380px, 100vw"
                  className={p.fit === "contain" ? "object-contain" : "object-cover"}
                />
              </div>
              <div className="px-[22px] py-5">
                <h3 className="text-[17px] font-bold tracking-[-0.01em]">
                  {p.title}
                </h3>
                <p className="mt-2 font-mono text-[12.5px] leading-[1.6] text-muted">
                  &ldquo;{p.prompt}&rdquo;
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
