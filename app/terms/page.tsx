import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms",
  description: "Beta software, AGPL-3.0-or-later. No warranty. Use it as a tool, not as a load-bearing dependency.",
};

export default function TermsPage() {
  return (
    <main className="narrow py-20">
      <p className="mb-3 text-[13.5px] font-semibold text-copper-text">
        Terms · last updated 14 May 2026
      </p>
      <h1 className="text-[clamp(36px,4.2vw,52px)] font-bold leading-[1.06] tracking-[-0.03em]">
        Beta software. No warranty.
      </h1>
      <div className="mt-9 grid gap-5 text-[16.5px] leading-[1.7] text-muted">
        <p>
          Tvashtra is licensed under{" "}
          <a
            href="https://www.gnu.org/licenses/agpl-3.0.html"
            target="_blank"
            rel="noopener noreferrer"
            className="text-copper-text underline underline-offset-[3px]"
          >
            AGPL-3.0-or-later
          </a>
          . Source goes public at v1. The beta builds you receive are the
          same codebase under the same license — you can redistribute,
          modify, and run them per the AGPL terms.
        </p>
        <p>
          The software is provided &ldquo;as is&rdquo; without warranty of
          any kind. CAD output is your responsibility: verify dimensions,
          tolerances and assembly fits before you cut metal, print plastic,
          or manufacture anything that matters.
        </p>
        <p>
          The LLM may produce wrong geometry. The closed-loop verification
          mitigates this but does not eliminate it. Treat Tvashtra like a
          drafter on their first day at the job — useful, fast, capable of
          egregious mistakes.
        </p>
        <p>Disputes governed by the laws of India. Forum: Delhi NCT.</p>
      </div>
      <p className="mt-11 border-t border-rule pt-5 text-[13.5px] text-faint">
        A Misc42 Labs product · questions:{" "}
        <a href="mailto:hello@misc42.com" className="text-copper-text">
          hello@misc42.com
        </a>
      </p>
    </main>
  );
}
