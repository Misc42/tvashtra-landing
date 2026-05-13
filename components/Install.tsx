"use client";

import { useState } from "react";
import WaitlistForm from "@/components/WaitlistForm";

const installScript = `# Linux (Debian / Ubuntu)
sudo apt install \\
  libocct-foundation-dev libocct-modeling-algorithms-dev \\
  libocct-modeling-data-dev libocct-data-exchange-dev \\
  libocct-ocaf-dev libocct-visualization-dev \\
  calculix-ccx gmsh

git clone https://github.com/Misc42/tvashtra  # private during beta
cd tvashtra
pnpm install
cargo tauri build`;

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      // clipboard blocked; user can select manually
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="rounded-sm border border-rule px-3 py-2 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-ink transition hover:border-saffron hover:text-saffron"
    >
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

export default function Install() {
  return (
    <section id="install" className="wrap border-b border-rule py-20">
      <p className="masthead mb-4">Run it locally</p>
      <h2 className="section-title max-w-3xl">
        Source goes public at v1.{" "}
        <span className="text-muted">Beta access opens now.</span>
      </h2>
      <p className="serif-italic mt-6 max-w-2xl text-xl text-muted">
        Tvashtra is in closed beta. The build chain is documented &mdash; if
        you can compile OCCT, you can run today. Repo opens at launch.
      </p>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_1fr]">
        <div className="card overflow-hidden">
          <div className="flex items-center justify-between border-b border-rule px-5 py-3">
            <p className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-faint">
              build from source
            </p>
            <CopyButton text={installScript} />
          </div>
          <pre className="command px-5 py-5 whitespace-pre-wrap">
            <code>{installScript}</code>
          </pre>
          <p className="border-t border-rule px-5 py-3 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-faint">
            macOS: brew install opencascade calculix gmsh &nbsp;&middot;&nbsp; Windows: vcpkg or msys2 (docs TBD)
          </p>
        </div>

        <div className="card flex flex-col gap-5 p-7">
          <p className="masthead">Want access today?</p>
          <h3 className="text-xl font-semibold text-ink">
            Skip the build. Join the beta.
          </h3>
          <p className="text-muted">
            Drop an email. When the next signed build is ready you get the
            link. No spam, no &ldquo;feature digest,&rdquo; no newsletter
            apparatus. One mail per release.
          </p>
          <WaitlistForm context="install" className="mt-auto" />
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-faint">
            Source repo at Misc42/tvashtra goes public when v1 ships.
          </p>
        </div>
      </div>
    </section>
  );
}
