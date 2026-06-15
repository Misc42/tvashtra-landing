const steps = [
  {
    eyebrow: "01 · Talk",
    title: "Type the intent.",
    body: "A chat panel, not a ribbon. “Make a chess pawn 40mm tall via sketch and revolve.” “Fillet the top four edges by 2mm.” “Export as STEP.”",
  },
  {
    eyebrow: "02 · Build",
    title: "Real B-rep, not a toy.",
    body: "OCCT under the hood. Primitives, booleans, sketch + extrude + revolve, fillet, chamfer, shell, pattern, transforms — then simulate it: stress, modal, thermal, nonlinear-plastic, transient dynamic, and ngspice on the board.",
  },
  {
    eyebrow: "03 · See",
    title: "Four views, every batch.",
    body: "After each tool call, the renderer captures iso + front + top + right. The model receives those images and verifies its own work before answering you.",
  },
  {
    eyebrow: "04 · Keep",
    title: "Your part. Your formats.",
    body: "Local file. Open in Fusion / SolidWorks / Prusa / Blender, or export a turntable / exploded clip as MP4 + GIF for the deck. The transcript is your parametric history — fork from any prompt to branch the design.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="wrap border-b border-rule py-20">
      <div className="grid gap-10 lg:grid-cols-[0.7fr_1fr]">
        <div>
          <p className="section-eyebrow mb-5" data-index="02">
            How it works
          </p>
          <h2 className="section-title">Four loops, not four hundred menus.</h2>
          <p className="lead mt-6 text-xl">
            Talk &rarr; build &rarr; see &rarr; keep. The closed loop is the
            whole product.
          </p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          {steps.map((s) => (
            <article
              key={s.eyebrow}
              className="card flex flex-col gap-3 p-7 transition hover:border-saffron"
            >
              <p className="label text-saffron">{s.eyebrow}</p>
              <h3 className="card-title">{s.title}</h3>
              <p className="text-muted">{s.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
