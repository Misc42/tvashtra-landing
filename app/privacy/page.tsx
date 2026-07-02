import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "Tvashtra is a desktop application. It does not phone home. Your geometry, prompts, and API keys never reach our servers.",
};

export default function PrivacyPage() {
  return (
    <main className="narrow py-20">
      <p className="mb-3 text-[13.5px] font-semibold text-copper">
        Privacy · last updated 14 May 2026
      </p>
      <h1 className="text-[clamp(36px,4.2vw,52px)] font-bold leading-[1.06] tracking-[-0.03em]">
        Nothing routes through us.
      </h1>
      <div className="mt-9 grid gap-5 text-[16.5px] leading-[1.7] text-muted">
        <p>
          Tvashtra runs on your machine. Your prompts go directly from your
          machine to the LLM provider you configured (Anthropic, Google,
          OpenAI, or your local Ollama daemon). We do not proxy those
          requests. We do not retain copies.
        </p>
        <p>
          The desktop application includes no analytics, telemetry, error
          reporters, or feature-flag SDKs. The build chain compiles cleanly
          without any &ldquo;phone home&rdquo; endpoint.
        </p>
        <p>
          This landing page is static HTML on GitHub Pages. The waitlist form
          posts to a third-party form endpoint — that vendor holds your email
          address per their own policy. We keep addresses solely to email you
          when there&rsquo;s a release worth trying.
        </p>
      </div>
      <p className="mt-11 border-t border-rule pt-5 text-[13.5px] text-faint">
        A Misc42 Labs product · questions:{" "}
        <a href="mailto:hello@misc42.com" className="text-copper">
          hello@misc42.com
        </a>
      </p>
    </main>
  );
}
