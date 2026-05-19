"use client";

import { useState } from "react";
import WaitlistForm from "@/components/WaitlistForm";

// Binaries publish to `tvashtra-landing` (public repo) because the
// main source repo `Misc42/tvashtra` is private — its `/releases`
// 404s for anonymous downloaders. Releases on the landing repo are
// purely artifact hosting; the v* tag for source provenance lives
// on the private repo.
//
// We pin to the explicit `/releases/download/<tag>/<asset>` URL
// instead of GitHub's `/releases/latest/download/<asset>` permalink
// because the latter skips prereleases — and v0.1.0 ships as an
// alpha (`--prerelease`). Bump VERSION + the v* tag in lockstep
// when cutting a new release.
const REPO = "https://github.com/Misc42/tvashtra-landing";
const VERSION = "0.1.0";
const TAG = `v${VERSION}`;
const ASSET_BASE = `${REPO}/releases/download/${TAG}`;
const LATEST = `${REPO}/releases`;

// Filename casing matches tauri-action's bundle output — capital
// `Tvashtra_` on the `.deb` / `.AppImage`, lowercase
// `Tvashtra-` on the `.rpm` (RPM packaging convention).
const downloads = {
  deb: `${ASSET_BASE}/Tvashtra_${VERSION}_amd64.deb`,
  appimage: `${ASSET_BASE}/Tvashtra_${VERSION}_amd64.AppImage`,
  rpm: `${ASSET_BASE}/Tvashtra-${VERSION}-1.x86_64.rpm`,
};

const linuxInstallSnippet = `# Debian / Ubuntu
sudo apt install ./Tvashtra_${VERSION}_amd64.deb

# Or portable:
chmod +x Tvashtra_${VERSION}_amd64.AppImage
./Tvashtra_${VERSION}_amd64.AppImage`;

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
