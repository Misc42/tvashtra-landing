import Image from "next/image";
import { asset } from "@/lib/asset";

const bullets = [
  {
    title: "Most CAD tools fight you.",
    body: "Constraints, menus, decade-old toolbars. A circle takes six clicks. A fillet is a tutorial.",
  },
  {
    title: "Most LLM-CAD tools lie to you.",
    body: "They emit code, declare success, render nothing, miss the hole, the chamfer is on the wrong edge, you only notice when it ships.",
  },
  {
    title: "Tvashtra does neither.",
    body: "B-rep kernel runs the op. Renderer captures four views. Model sees its own work. If wrong, it retries before answering you.",
  },
];

export default function Problem() {
  return (
    <section id="problem" className="wrap border-b border-rule py-20">
      <p className="masthead mb-4">Why this exists</p>
      <h2 className="section-title max-w-3xl">
        Two failure modes. One fix.
      </h2>
      <div className="mt-12 grid gap-8 lg:grid-cols-3">
        {bullets.map((b) => (
          <article key={b.title} className="border-t border-rule pt-5">
            <h3 className="text-xl font-semibold text-ink">{b.title}</h3>
            <p className="mt-3 text-muted">{b.body}</p>
          </article>
        ))}
      </div>

      <div className="mt-16 grid gap-6 lg:grid-cols-2">
        <figure className="card overflow-hidden">
          <p className="border-b border-rule px-5 py-3 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-faint">
            Without verification
          </p>
          <div className="relative aspect-[4/3] w-full bg-paper">
            <Image
              src={asset("/screenshots/mode-wireframe.png")}
              alt="A wireframe view that reveals the hole the model claimed it drilled isn't actually there — only an outline that looks right from one angle."
              fill
              sizes="(min-width: 1024px) 540px, 100vw"
              className="object-contain"
            />
          </div>
          <figcaption className="px-5 py-4 text-sm text-muted">
            Model says &ldquo;done.&rdquo; The hole isn&rsquo;t there. You only
            find out when you slice for print.
          </figcaption>
        </figure>
        <figure className="card overflow-hidden">
          <p className="border-b border-rule px-5 py-3 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-saffron">
            With closed-loop feedback
          </p>
          <div className="relative aspect-[4/3] w-full bg-paper">
            <Image
              src={asset("/screenshots/mode-shaded.png")}
              alt="The same part rendered with the verified shaded mode — the hole is real, the fillets are real, the geometry matches what the model claims."
              fill
              sizes="(min-width: 1024px) 540px, 100vw"
              className="object-contain"
            />
          </div>
          <figcaption className="px-5 py-4 text-sm text-muted">
            After each tool batch, Tvashtra renders four views (iso, front,
            top, right) and feeds them back. The model reads its own geometry.
            Wrong &rarr; it retries. Right &rarr; it tells you.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
