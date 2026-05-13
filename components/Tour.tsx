import Image from "next/image";
import { asset } from "@/lib/asset";

const frames = [
  {
    src: "/screenshots/filleted_part.png",
    eyebrow: "Viewport",
    title: "A real part, not a render demo.",
    body: "OCCT-built geometry. The fillets are real edges, not screen-space tricks. PBR + image-based lighting via wgpu so the model sees what you see.",
  },
  {
    src: "/screenshots/test_extrude.png",
    eyebrow: "History",
    title: "Op tree, the way a CAD person reads it.",
    body: "Every primitive, sketch, boolean, fillet. Branch from any node — the transcript is the parametric tree.",
  },
  {
    src: "/screenshots/visfb.png",
    eyebrow: "Self-check",
    title: "Verification round, shown in the chat.",
    body: "Four-view snapshot bundle appears inline. The model reads, scores, retries. The card shows what it saw and what it decided.",
  },
  {
    src: "/screenshots/sphere.png",
    eyebrow: "Materials",
    title: "Seven materials, one tonemap.",
    body: "Studio IBL, ACES output. Switch material to inspect a feature, not to win Instagram. (The Instagram win is incidental.)",
  },
];

export default function Tour() {
  return (
    <section id="tour" className="wrap border-b border-rule py-20">
      <p className="masthead mb-4">Tour</p>
      <h2 className="section-title max-w-3xl">
        Walk the loop in four frames.
      </h2>

      <div className="mt-12 grid gap-8 md:grid-cols-2">
        {frames.map((f) => (
          <figure key={f.src} className="card overflow-hidden">
            <div className="relative aspect-[16/10] w-full bg-paper">
              <Image
                src={asset(f.src)}
                alt={f.title}
                fill
                sizes="(min-width: 768px) 540px, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="space-y-2 px-6 py-5">
              <p className="masthead text-saffron">{f.eyebrow}</p>
              <h3 className="text-lg font-semibold text-ink">{f.title}</h3>
              <p className="text-sm text-muted">{f.body}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
