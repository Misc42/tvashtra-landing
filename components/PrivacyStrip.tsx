const columns = [
  {
    title: "Bring your own model",
    body: "Claude, Gemini, or OpenAI. Your key, your spend. Local Ollama is experimental.",
  },
  {
    title: "Nothing routes through us",
    body: "Prompts go from your machine to your provider. No proxy, no telemetry.",
  },
  {
    title: "AGPL at v1",
    body: "Source is private during beta, public at v1. The landing page already is.",
  },
];

export default function PrivacyStrip() {
  return (
    <section className="border-t border-rule">
      <div className="wrap grid gap-8 py-14 sm:grid-cols-3">
        {columns.map((col) => (
          <div key={col.title}>
            <p className="text-[15px] font-semibold">{col.title}</p>
            <p className="mt-1.5 text-sm leading-[1.5] text-muted">
              {col.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
