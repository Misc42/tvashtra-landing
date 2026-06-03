import Image from "next/image";
import { asset } from "@/lib/asset";

const bullets = [
  {
    title: "Mechatronics is a relay race.",
    body: "CAD in one tool, FEM in another, the PCB in a third, variants in a spreadsheet. Every hand-off loses context and burns a day.",
  },
  {
    title: "Conversational CAD usually lies.",
    body: "Models emit code, declare success, render nothing — miss the hole, chamfer the wrong edge. You only notice when it ships.",
  },
  {
    title: "Tvashtra closes the loop.",
    body: "One conversation builds, simulates, wires the electronics, and explores alternatives. After every batch the model sees its own render and retries before answering.",
  },
];

export default function Problem() {
  return (
    <section id="problem" className="wrap border-b border-rule py-24">
      <p className="section-eyebrow mb-5" data-index="01">
        Why this exists
      </p>
      <h2 className="section-title max-w-3xl">
        One conversation, the whole part.
      </h2>
      <div className="mt-14 grid gap-8 lg:grid-cols-3">
        {bullets.map((b) => (
          <article key={b.title} className="border-t border-rule pt-5">
            <h3 className="card-title">{b.title}</h3>
            <p className="mt-3 text-muted">{b.body}</p>
          </article>
        ))}
      </div>

      <figure className="card mt-16 overflow-hidden lg:grid lg:grid-cols-[1fr_0.9fr]">
        <div className="relative aspect-[4/3] w-full bg-paper lg:aspect-auto">
          <Image
            src={asset("/screenshots/mode-shaded-edges.png")}
            alt="The verified part rendered with shaded edges — the bore is real, the geometry matches exactly what the model claims it built."
            fill
            sizes="(min-width: 1024px) 600px, 100vw"
            className="object-contain"
          />
        </div>
        <figcaption className="flex flex-col justify-center gap-3 border-t border-rule px-6 py-6 lg:border-l lg:border-t-0">
          <p className="label text-saffron">Closed-loop verification</p>
          <p className="text-sm leading-relaxed text-muted">
            After each tool batch, Tvashtra renders four canonical views (iso,
            front, top, right) and feeds them straight back. The model reads
            its own geometry — the bore it claims to have drilled, the chamfer
            it claims to have cut. Wrong &rarr; it retries. Right &rarr; it
            tells you. The same loop guards every stage, from the first box to
            the stress solve.
          </p>
        </figcaption>
      </figure>
    </section>
  );
}
