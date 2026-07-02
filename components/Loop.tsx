type Step = {
  label: string;
  title: string;
  body: string;
};

const steps: Step[] = [
  {
    label: "01 · TALK",
    title: "Type the intent",
    body: '"Fillet the top four edges by 2 mm." A chat panel, not four hundred menus.',
  },
  {
    label: "02 · BUILD",
    title: "Real B-rep, not a mesh",
    body: "OCCT kernel underneath — the same lineage as professional CAD. FEM, KiCad bridge, SPICE included.",
  },
  {
    label: "03 · SEE",
    title: "It reads its renders",
    body: "Four views after every operation, fed back to the model. Wrong → it retries before answering you.",
  },
  {
    label: "04 · KEEP",
    title: "Your file, your formats",
    body: "STEP, STL, OBJ — plus shop drawings and turntable MP4s. Opens in Fusion, SolidWorks, Prusa.",
  },
];

export default function Loop() {
  return (
    <section id="loop" className="border-t border-rule bg-bg-alt">
      <div className="wrap py-20">
        <h2 className="mb-11 max-w-[640px] text-[38px] font-bold leading-tight tracking-[-0.025em]">
          Talk → build → see → keep.
          <br />
          <span className="text-faint">The loop is the product.</span>
        </h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <article
              key={step.label}
              className="card bg-bg p-[26px]"
            >
              <p className="mb-2.5 font-mono text-xs text-copper-text">
                {step.label}
              </p>
              <h3 className="text-[19px] font-bold tracking-[-0.01em]">
                {step.title}
              </h3>
              <p className="mt-2.5 text-[14.5px] leading-[1.55] text-muted">
                {step.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
