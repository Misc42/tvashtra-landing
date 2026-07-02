"use client";

import { useState } from "react";
import WaitlistForm from "@/components/WaitlistForm";

// Binaries publish to `tvashtra-landing` (public repo) because the
// main source repo `Misc42/tvashtra` is private — its `/releases`
// 404s for anonymous downloaders. Releases on the landing repo are
// purely artifact hosting; the v* tag for source provenance lives
// on the private repo.
const REPO = "https://github.com/Misc42/tvashtra-landing";
const VERSION = "0.10.0";
const TAG = `v${VERSION}`;

// Displayed command drops the protocol for a shorter read; the actual
// clipboard payload keeps `https://` so a pasted command always resolves
// regardless of shell config. Intentional split, not a typo.
const DISPLAY_COMMAND =
  "curl -fsSL misc42.github.io/tvashtra-landing/install.sh | bash";
const CLIPBOARD_COMMAND =
  "curl -fsSL https://misc42.github.io/tvashtra-landing/install.sh | bash";

function CopyButton() {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(CLIPBOARD_COMMAND);
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
      className="rounded-md border border-rule-2 px-3 py-1.5 font-mono text-xs text-muted transition hover:border-copper hover:text-copper"
    >
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

export default function Install() {
  return (
    <section id="install" className="border-t border-rule bg-bg-alt">
      <div className="wrap grid items-center gap-14 py-20 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <h2 className="text-[38px] font-bold leading-[1.12] tracking-[-0.025em]">
            One line on Linux.
          </h2>
          <p className="mt-4 text-[16.5px] leading-[1.55] text-muted">
            AppImage, SHA-256 verified, ~95 MB. macOS and Windows builds land
            from CI — leave an email for one mail when they do. No newsletter
            apparatus.
          </p>
          <WaitlistForm className="mt-6" />
        </div>

        <div className="card overflow-hidden bg-bg-code">
          <div className="flex items-center justify-between border-b border-rule px-[18px] py-3">
            <span className="font-mono text-xs text-faint">terminal</span>
            <CopyButton />
          </div>
          <pre className="overflow-x-auto px-[18px] py-[22px] font-mono text-[13.5px] leading-[1.7] text-ink">
            <code>
              <span className="text-faint">$</span> {DISPLAY_COMMAND}
            </code>
          </pre>
          <div className="border-t border-rule px-[18px] py-3 font-mono text-[11.5px] text-faint">
            v{VERSION} · AppImage ·{" "}
            <a
              href={`${REPO}/releases/tag/${TAG}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted underline underline-offset-2 hover:text-copper"
            >
              .deb / .rpm on the releases page
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
