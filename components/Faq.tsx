const items = [
  {
    q: "Why not Fusion / SolidWorks / OpenSCAD?",
    a: "Those tools want you to drive every click. Tvashtra is LLM-native — the chat transcript becomes parametric history, and you can fork your part from any prompt. The kernel underneath is the same calibre (OCCT) as the open-source CAD lineage.",
  },
  {
    q: "Does it use my GPU?",
    a: "Yes — wgpu drives the viewport (RTX 4070, Apple Silicon, AMD, Intel Arc). The LLM runs on the provider's hardware (Anthropic / Google / OpenAI). If you want everything local, wire Ollama as the provider and run on your own card.",
  },
  {
    q: "Do I need an API key?",
    a: "Yes. Anthropic, Gemini, or OpenAI — or a local Ollama daemon. Your key, your spend, your privacy. Tvashtra never sees your traffic.",
  },
  {
    q: "Does my data leak?",
    a: "If you use a cloud LLM, that provider sees your prompts (Tvashtra doesn't proxy them — they go from your machine to the model). Local Ollama keeps everything on-box. No telemetry from Tvashtra either way.",
  },
  {
    q: "What ops are supported today?",
    a: "Primitives (box, cylinder, sphere, cone, torus), booleans (union, cut, intersect), sketch + extrude + revolve, fillet, chamfer, shell, pattern (linear + circular), transforms (translate, rotate, scale, mirror). Loft + sweep land in Phase 2.",
  },
  {
    q: "Open source?",
    a: "AGPL-3.0-or-later. Source is private during beta, public at v1. The landing page (this repo) is already public.",
  },
];

export default function Faq() {
  return (
    <section id="faq" className="wrap border-b border-rule py-20">
      <p className="masthead mb-4">FAQ</p>
      <h2 className="section-title max-w-3xl">Honest answers.</h2>
      <dl className="mt-12 grid gap-x-12 gap-y-10 lg:grid-cols-2">
        {items.map((item) => (
          <div key={item.q} className="border-t border-rule pt-5">
            <dt className="card-title">{item.q}</dt>
            <dd className="mt-3 text-muted">{item.a}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
