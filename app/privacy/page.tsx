import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "Tvashtra is a desktop application. It does not phone home. Your geometry, prompts, and API keys never reach our servers.",
};

export default function PrivacyPage() {
  return (
    <main className="wrap py-16">
      <p className="masthead mb-4">Privacy</p>
      <h1 className="section-title max-w-3xl">
        Short version: nothing routes through us.
      </h1>
      <div className="mt-10 max-w-2xl space-y-6 text-muted">
        <p>
          Tvashtra runs on your machine. Your prompts go directly from your
          machine to the LLM provider you configured (Anthropic, Google,
          OpenAI, or your local Ollama daemon). We do not proxy those
          requests. We do not retain copies.
        </p>
        <p>
          The desktop application does not include analytics, telemetry, error
          reporters, or feature-flag SDKs. The build chain compiles cleanly
          without any &ldquo;phone home&rdquo; endpoint.
        </p>
        <p>
          This landing page is static HTML hosted on GitHub Pages. The waitlist
          form posts to the third-party endpoint configured at build time
          (Formspree / Tally / similar) &mdash; that vendor will hold your
          email address per their own policy. We retain the addresses solely
          to email you when there is a new release worth trying.
        </p>
        <p>
          Questions: <a
            className="text-saffron underline decoration-rule underline-offset-4 hover:text-ink"
            href="mailto:tanaymisra97@gmail.com"
          >
            tanaymisra97@gmail.com
          </a>
          .
        </p>
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-faint">
          Last updated: 2026-05-14
        </p>
      </div>
    </main>
  );
}
