import Image from "next/image";
import { asset } from "@/lib/asset";

const frames = [
  {
    src: "/screenshots/mode-shaded.png",
    eyebrow: "Shaded",
    title: "Studio IBL with real fillets.",
    body: "PBR through wgpu with image-based lighting baked from a Poly Haven studio HDR. The fillets are real B-rep edges, not screen-space tricks.",
  },
  {
    src: "/screenshots/mode-shaded-edges.png",
    eyebrow: "Shaded + edges",
    title: "Engineering look, kept legible.",
    body: "MRT pass writes normal + depth alongside colour; the second pass runs Sobel for an outline overlay you can read across the whole part.",
  },
  {
    src: "/screenshots/mode-wireframe.png",
    eyebrow: "Wireframe",
    title: "Topology at a glance.",
    body: "Every edge, no shading. Useful when you need to confirm a chamfer landed exactly where you think it did — or when the boolean tessellation looks suspicious.",
  },
  {
    src: "/screenshots/mode-hidden-line.png",
    eyebrow: "Hidden-line removed",
    title: "Clean engineering drawing.",
    body: "Front-facing edges only — the look a draftsperson would put on paper. Useful for screenshots in a spec doc or a part-fab brief.",
  },
  {
    src: "/screenshots/mode-hidden-dashed.png",
    eyebrow: "Hidden-line dashed",
    title: "Occluded edges, dashed.",
    body: "The full drafting convention. Visible edges solid, hidden edges dashed. The B-rep edge graph drives this directly — no faking with shaders.",
  },
  {
    src: "/screenshots/mode-sketch.png",
    eyebrow: "Sketch",
    title: "Presentation-ready clay.",
    body: "Flat clay fill, bold contour. The mode you ship a render to a client in when the geometry is the story and the material isn't.",
  },
];

export default function Tour() {
  return (
    <section id="tour" className="wrap border-b border-rule py-20">
      <p className="masthead mb-4">Tour</p>
      <h2 className="section-title max-w-3xl">
        Six render modes, same geometry.
      </h2>

      <div className="mt-12 grid gap-8 md:grid-cols-2">
        {frames.map((f) => (
          <figure key={f.src} className="card overflow-hidden">
            <div className="relative aspect-square w-full bg-paper">
              <Image
                src={asset(f.src)}
                alt={f.title}
                fill
                sizes="(min-width: 768px) 540px, 100vw"
                className="object-contain"
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
