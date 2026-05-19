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

// The AppImage is the only Linux binary path we promote — it bundles
// OCCT 7.8 + every Tauri runtime lib inside its squashfs payload, so
// it works out of the box on any glibc ≥ 2.31 distro. The .deb and
// .rpm variants on the same release page link against the host's
// OCCT 7.8, which Ubuntu 22.04 / 24.04 LTS do NOT ship (their repos
// stop at OCCT 7.5). Listing them as a casual download would just
// surface "library not found" crashes at first launch. They stay on
// the Releases page for advanced users who already have OCCT 7.8
// built from source; we don't link to them from here.
const downloads = {
  appimage: `${ASSET_BASE}/Tvashtra_${VERSION}_amd64.AppImage`,
};

const INSTALL_SCRIPT_URL =
  "https://misc42.github.io/tvashtra-landing/install.sh";

const oneLinerInstall = `curl -fsSL ${INSTALL_SCRIPT_URL} | bash`;

const manualInstallSnippet = `# Self-contained — no apt, no sudo, no OCCT setup
wget ${ASSET_BASE}/Tvashtra_${VERSION}_amd64.AppImage
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
        v{VERSION} alpha ships as a self-contained Linux AppImage today.
        macOS &amp; Windows builds follow when the cross-platform release
        run lands clean.
      </p>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_1fr]">
        <div className="card overflow-hidden">
          <div className="border-b border-rule px-6 py-4">
            <p className="masthead">Linux &middot; v{VERSION}</p>
            <p className="mt-2 text-sm text-muted">
              One command. Detects your distro, installs the self-contained
              AppImage to <code className="font-mono text-ink">~/.local/bin</code>,
              wires up the Activities entry, refreshes the icon cache. No
              sudo, no OCCT to install, no apt / dnf / pacman branching.
            </p>
          </div>

          <div className="border-b border-rule">
            <div className="flex items-center justify-between border-b border-rule px-5 py-3">
              <p className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-saffron">
                One-liner install
              </p>
              <CopyButton text={oneLinerInstall} />
            </div>
            <pre className="command whitespace-pre-wrap px-5 py-5">
              <code>{oneLinerInstall}</code>
            </pre>
          </div>

          <div className="border-b border-rule px-5 py-4">
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-faint">
              The script verifies host glibc ≥ 2.31, checks WebKit2GTK 4.1 +
              GTK 3 + libsoup 3 + JavaScriptCore are on the host, downloads
              the AppImage + its SHA-256 sidecar, validates the checksum,
              installs to <code className="font-mono text-ink">~/.local/bin</code>,
              registers a <code className="font-mono text-ink">~/.local/share/applications</code>
              {" "}desktop entry, refreshes the icon cache. Idempotent — running
              twice on the same machine is a no-op or upgrades to a newer
              version. Read it before running:{" "}
              <a
                href={INSTALL_SCRIPT_URL}
                className="text-saffron underline-offset-2 hover:underline"
                target="_blank"
                rel="noopener"
              >
                install.sh ↗
              </a>
              .
            </p>
          </div>

          <div className="border-b border-rule">
            <div className="flex items-center justify-between border-b border-rule px-5 py-3">
              <p className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-faint">
                Or: manual download
              </p>
              <CopyButton text={manualInstallSnippet} />
            </div>
            <pre className="command whitespace-pre-wrap px-5 py-5">
              <code>{manualInstallSnippet}</code>
            </pre>
          </div>

          <div className="grid gap-3 px-6 py-5">
            <a
              href={downloads.appimage}
              className="flex items-center justify-between rounded-sm border border-rule px-4 py-3 transition hover:border-saffron"
            >
              <div>
                <p className="font-semibold text-ink">
                  Tvashtra_{VERSION}_amd64.AppImage
                </p>
                <p className="text-sm text-muted">
                  Self-contained &mdash; OCCT, WebKit, every runtime lib
                  bundled. Any glibc 2.31+ distro.
                </p>
              </div>
              <span className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-saffron">
                Download &rarr;
              </span>
            </a>
          </div>

          <p className="border-t border-rule px-5 py-3 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-faint">
            Optional &mdash; Stress preview needs{" "}
            <code className="font-mono text-ink">calculix-ccx</code> +{" "}
            <code className="font-mono text-ink">gmsh</code> on the host
            (<code className="font-mono text-ink">sudo apt install calculix-ccx gmsh</code>
            ). Everything else is bundled.
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
