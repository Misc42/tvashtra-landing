import WaitlistForm from "@/components/WaitlistForm";

export default function TryInBrowser() {
  return (
    <section id="browser" className="wrap border-b border-rule py-20">
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1fr] lg:items-start">
        <div>
          <p className="section-eyebrow mb-5" data-index="07">
            Try in browser &middot; coming soon
          </p>
          <h2 className="section-title">
            Tvashtra,
            <br />
            <span className="text-saffron">in your browser.</span>
          </h2>
          <p className="lead mt-6 text-xl">
            No install. Your API key. Your geometry.
          </p>
        </div>
        <div className="card flex flex-col gap-5 p-7">
          <p className="label text-saffron">Honest timeline</p>
          <h3 className="card-title">
            Kernel-to-WASM port is real engineering.
          </h3>
          <p className="text-muted">
            OCCT is ~2M lines of C++. A clean WASM build with tessellation,
            booleans, and STEP IO is 3&ndash;8 weeks of work depending on the
            path we take. We&rsquo;ll ship it when it works, not before. Bring
            your own Gemini / Claude / OpenAI key &mdash; nothing routes
            through us.
          </p>
          <ul className="space-y-2 label text-faint">
            <li>&middot; BYO API key (Anthropic / Gemini / OpenAI / Ollama)</li>
            <li>&middot; No backend, no account, no telemetry</li>
            <li>&middot; Export STL / STEP / OBJ directly from the tab</li>
          </ul>
          <WaitlistForm context="browser" className="mt-3" />
        </div>
      </div>
    </section>
  );
}
