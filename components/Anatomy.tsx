import Image from "next/image";
import { asset } from "@/lib/asset";

// Each callout sits over the hero shell screenshot with a percentage
// position so it tracks the image at any width. The `pos` tuple is
// `[xPct, yPct]` relative to the image's intrinsic 1920x1080 frame.
// `align` decides which side of the dot the label tab sits on.
const regions: {
  num: number;
  pos: [number, number];
  align: "left" | "right";
  title: string;
  body: string;
}[] = [
  {
    num: 1,
    pos: [3, 3],
    align: "right",
    title: "Brand mark",
    body: "Devanagari त्वष्त्र glyph in copper plus the Tvashtra wordmark. Doubles as a window-drag region.",
  },
  {
    num: 2,
    pos: [38, 3],
    align: "right",
    title: "File actions",
    body: "New, Open, Save, Export &middot; Undo / Redo. Export covers STL, STEP, OBJ, IGES, BREP, 3MF, GLB. Ctrl-keyed shortcuts share the exact same handlers.",
  },
  {
    num: 3,
    pos: [62, 3],
    align: "left",
    title: "Op counter",
    body: "Live count of operations in the current document. Reads from the kernel history, not the UI tree.",
  },
  {
    num: 4,
    pos: [87, 3],
    align: "left",
    title: "Workspace toggles",
    body: "Stress, Inspector, Settings. Toggles fold panels in and out of the viewport overlay.",
  },
  {
    num: 5,
    pos: [3, 12],
    align: "right",
    title: "History rail",
    body: "Parametric op tree. Click a node to pin the Inspector; branch from any ancestor to fork the design.",
  },
  {
    num: 6,
    pos: [25, 9],
    align: "right",
    title: "Camera presets",
    body: "Top &middot; Front &middot; Right &middot; Iso. Snaps the camera to a canonical view with smooth easing.",
  },
  {
    num: 7,
    pos: [50, 9],
    align: "right",
    title: "Render modes",
    body: "Six modes: shaded, shaded+edges, wireframe, hidden-line-removed, hidden-line-dashed, sketch.",
  },
  {
    num: 8,
    pos: [50, 50],
    align: "right",
    title: "Viewport",
    body: "wgpu PBR canvas with HDR image-based lighting from a Poly Haven studio environment.",
  },
  {
    num: 9,
    pos: [80, 18],
    align: "left",
    title: "Chat composer",
    body: "Type intent in natural language; the model picks ops from the catalog and runs them against the kernel. Click a face in the viewport first and a Selection chip rides above the textarea so <code>@selected</code> resolves visibly before you submit.",
  },
  {
    num: 10,
    pos: [80, 93],
    align: "left",
    title: "Provider picker",
    body: "Claude, GPT, Gemini, or local llama.cpp. Your API key, your machine — nothing routed through us.",
  },
  {
    num: 11,
    pos: [3, 96],
    align: "right",
    title: "Camera readout",
    body: "Live yaw / pitch / distance. Useful for replaying camera positions across screenshots and shares.",
  },
];

export default function Anatomy() {
  return (
    <section id="anatomy" className="wrap border-b border-rule py-20">
      <p className="section-eyebrow mb-5" data-index="03">
        Anatomy
      </p>
      <h2 className="section-title max-w-3xl">
        Eleven regions, each doing one thing well.
      </h2>
      <p className="mt-4 max-w-2xl text-muted">
        The shell is the product. Every pixel of chrome was put there
        intentionally; nothing is decorative. Hover a number to read what it
        owns.
      </p>

      <figure className="relative mt-12 overflow-hidden rounded-sm border border-rule bg-paper">
        <div className="relative aspect-[16/10] w-full">
          <Image
            src={asset("/screenshots/forge-black-shell.png")}
            alt="Labelled diagram of the Tvashtra desktop shell with eleven numbered regions."
            fill
            sizes="(min-width: 1280px) 1100px, 100vw"
            className="object-cover"
          />
          {regions.map((r) => (
            <div
              key={r.num}
              className="anatomy-callout group absolute z-10"
              style={{ left: `${r.pos[0]}%`, top: `${r.pos[1]}%` }}
            >
              <button
                type="button"
                aria-label={`Region ${r.num}: ${r.title}`}
                aria-expanded={false}
                aria-controls={`anatomy-tooltip-${r.num}`}
                className="flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-saffron bg-paper/95 font-mono text-[10px] font-semibold text-saffron shadow-[0_0_0_3px_rgba(0,0,0,0.55)] transition group-hover:scale-110 group-focus-within:scale-110"
              >
                {r.num}
              </button>
              <div
                id={`anatomy-tooltip-${r.num}`}
                role="tooltip"
                className={`pointer-events-none absolute top-1/2 hidden -translate-y-1/2 whitespace-normal rounded-sm border border-rule bg-paper px-3 py-2 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.6)] group-hover:block group-focus-within:block ${
                  r.align === "right" ? "left-5" : "right-5"
                }`}
                style={{ width: 240 }}
              >
                <p className="label text-[0.6rem] text-saffron">
                  {r.num.toString().padStart(2, "0")} &middot; {r.title}
                </p>
                <p
                  className="mt-1 text-[0.78rem] leading-snug text-muted"
                  dangerouslySetInnerHTML={{ __html: r.body }}
                />
              </div>
            </div>
          ))}
        </div>
      </figure>

      <ol className="mt-10 grid gap-x-10 gap-y-4 text-sm md:grid-cols-2 lg:grid-cols-3">
        {regions.map((r) => (
          <li key={r.num} className="flex gap-3">
            <span className="label text-[0.6rem] text-saffron">
              {r.num.toString().padStart(2, "0")}
            </span>
            <div>
              <p className="font-semibold tracking-[-0.01em] text-ink">{r.title}</p>
              <p
                className="mt-1 text-muted"
                dangerouslySetInnerHTML={{ __html: r.body }}
              />
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
