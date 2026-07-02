import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms",
  description: "Beta software, AGPL-3.0-or-later. No warranty. Use it as a tool, not as a load-bearing dependency.",
};

export default function TermsPage() {
  return (
    <main className="wrap py-16">
      <p className="masthead mb-4">Terms</p>
      <h1 className="section-title max-w-3xl">
        Beta software. No warranty.
      </h1>
      <div className="mt-10 max-w-2xl space-y-6 text-muted">
        <p>
          Tvashtra is licensed under{" "}
          <a
            className="text-saffron underline decoration-rule underline-offset-4 hover:text-ink"
            href="https://www.gnu.org/licenses/agpl-3.0.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            AGPL-3.0-or-later
          </a>
          . Source goes public at v1. The beta builds you receive are the same
          codebase under the same license &mdash; you can redistribute, modify,
          and run them per the AGPL terms.
        </p>
        <p>
          The software is provided &ldquo;as is&rdquo; without warranty of any
          kind. CAD output is your responsibility: verify dimensions, tolerances
          and assembly fits before you cut metal, print plastic, or
          manufacture anything that matters.
        </p>
        <p>
          The LLM may produce wrong geometry. The closed-loop verification
          mitigates this but does not eliminate it. Treat Tvashtra like a
          drafter who has done their first day at the job &mdash; useful,
          fast, capable of egregious mistakes.
        </p>
        <p>
          Disputes governed by the laws of India. Forum: Delhi NCT.
        </p>
        <p className="label text-faint">Last updated: 2026-05-14</p>
      </div>
    </main>
  );
}
