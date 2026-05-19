"use client";

import { useState } from "react";
import WaitlistForm from "@/components/WaitlistForm";

// Canonical GitHub Releases /latest URLs. The actual filename pattern
// is what tauri-action emits with the configuration in this repo's
// `.github/workflows/release.yml`. `/releases/latest/download/<file>`
// is a permalink that redirects to the latest release's asset, so
// it stays stable across version bumps — no edits here when we cut
// v0.1.1, v0.2.0 etc.
const REPO = "https://github.com/Misc42/tvashtra";
const LATEST = `${REPO}/releases/latest`;
const downloads = {
  deb: `${LATEST}/download/tvashtra_0.1.0_amd64.deb`,
  appimage: `${LATEST}/download/tvashtra_0.1.0_amd64.AppImage`,
  rpm: `${LATEST}/download/tvashtra-0.1.0-1.x86_64.rpm`,
};

const linuxInstallSnippet = `# Debian / Ubuntu
sudo apt install ./tvashtra_0.1.0_amd64.deb

# Or portable:
chmod +x tvashtra_0.1.0_amd64.AppImage
./tvashtra_0.1.0_amd64.AppImage`;

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
      <p className="masthead mb-4">Install</p>
      <h2 className="section-title max-w-3xl">
        Linux first.{" "}
        <span className="text-muted">macOS &amp; Windows in the pipeline.</span>
      </h2>
      <p className="serif-italic mt-6 max-w-2xl text-xl text-muted">
        v0.1.0 alpha ships as a Linux desktop bundle today. macOS &amp;
        Windows builds follow when the cross-platform release run lands
        clean.
      </p>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_1fr]">
        <div className="card overflow-hidden">
          <div className="border-b border-rule px-6 py-4">
            <p className="masthead">Linux &middot; v0.1.0</p>
            <p className="mt-2 text-sm text-muted">
              Three flavours of the same binary. Pick whatever your distro
              prefers.
            </p>
          </div>

          <div className="grid gap-3 px-6 py-5">
            <a
              href={downloads.deb}
              className="flex items-center justify-between rounded-sm border border-rule px-4 py-3 transition hover:border-saffron"
            >
              <div>
                <p className="font-semibold text-ink">.deb</p>
                <p className="text-sm text-muted">
                  Ubuntu, Debian, Pop!_OS, Mint
                </p>
              </div>
              <span className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-saffron">
                Download &rarr;
              </span>
            </a>
            <a
              href={downloads.rpm}
              className="flex items-center justify-between rounded-sm border border-rule px-4 py-3 transition hover:border-saffron"
            >
              <div>
                <p className="font-semibold text-ink">.rpm</p>
                <p className="text-sm text-muted">
                  Fedora, RHEL, openSUSE
                </p>
              </div>
              <span className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-saffron">
                Download &rarr;
              </span>
            </a>
            <a
              href={downloads.appimage}
              className="flex items-center justify-between rounded-sm border border-rule px-4 py-3 transition hover:border-saffron"
            >
              <div>
                <p className="font-semibold text-ink">.AppImage</p>
                <p className="text-sm text-muted">
                  Portable &mdash; runs on any glibc 2.31+ distro
                </p>
              </div>
              <span className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-saffron">
                Download &rarr;
              </span>
            </a>
          </div>

          <div className="border-t border-rule">
            <div className="flex items-center justify-between border-b border-rule px-5 py-3">
              <p className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-faint">
                One-liner install
              </p>
              <CopyButton text={linuxInstallSnippet} />
            </div>
            <pre className="command whitespace-pre-wrap px-5 py-5">
              <code>{linuxInstallSnippet}</code>
            </pre>
          </div>

          <p className="border-t border-rule px-5 py-3 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-faint">
            Requires OCCT 7.8+ on the host. Ubuntu 24.04+ ships it;
            22.04 / 24.04 LTS users run{" "}
            <code className="font-mono text-ink">bash scripts/install-occt.sh</code>{" "}
            from the source repo.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          <div className="card flex flex-col gap-3 p-6">
            <p className="masthead">macOS</p>
            <p className="text-muted">
              Universal2 .dmg (Intel + Apple Silicon) building in CI.
              Unsigned on first release &mdash; right-click &rarr; Open to
              bypass Gatekeeper.
            </p>
            <a
              href={LATEST}
              className="mt-2 inline-flex items-center gap-2 self-start font-mono text-[0.7rem] uppercase tracking-[0.14em] text-saffron hover:underline"
            >
              Track on releases &rarr;
            </a>
          </div>
          <div className="card flex flex-col gap-3 p-6">
            <p className="masthead">Windows</p>
            <p className="text-muted">
              x64 .msi installer building in CI. Unsigned on first
              release &mdash; SmartScreen warning expected; click &ldquo;More
              info&rdquo; &rarr; &ldquo;Run anyway.&rdquo;
            </p>
            <a
              href={LATEST}
              className="mt-2 inline-flex items-center gap-2 self-start font-mono text-[0.7rem] uppercase tracking-[0.14em] text-saffron hover:underline"
            >
              Track on releases &rarr;
            </a>
          </div>
          <div className="card flex flex-col gap-4 p-6">
            <p className="masthead">Want a heads-up?</p>
            <p className="text-muted">
              One mail when the macOS / Windows builds land. No newsletter
              apparatus.
            </p>
            <WaitlistForm context="install" className="mt-auto" />
          </div>
        </div>
      </div>
    </section>
  );
}
