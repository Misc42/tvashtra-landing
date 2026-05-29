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
const VERSION = "0.6.0";
const TAG = `v${VERSION}`;
const ASSET_BASE = `${REPO}/releases/download/${TAG}`;
const LATEST = `${REPO}/releases`;

// One Linux install path, period. The `install.sh` curl-pipe-bash
// command handles every check: glibc, host libs, download, SHA-256
// verify, ~/.local/bin install, desktop entry, icon cache refresh.
// .deb / .rpm / .AppImage assets all live on the Releases page for
// CI tooling + power users, but the landing surface offers exactly
// one command. No manual download fallback by design.
const INSTALL_SCRIPT_URL =
  "https://misc42.github.io/tvashtra-landing/install.sh";

const oneLinerInstall = `curl -fsSL ${INSTALL_SCRIPT_URL} | bash`;

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
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <p className="masthead mb-4">Install</p>
        <a
          href={`${REPO}/releases/tag/${TAG}`}
          className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-saffron underline-offset-2 hover:underline"
          target="_blank"
          rel="noopener"
        >
          Latest: v{VERSION} — release notes ↗
        </a>
      </div>
      <h2 className="section-title max-w-3xl">
        Linux first.{" "}
        <span className="text-muted">macOS &amp; Windows in the pipeline.</span>
      </h2>
      <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_1fr]">
        <div className="card overflow-hidden">
          <div className="flex items-center justify-between border-b border-rule px-5 py-3">
            <p className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-saffron">
              Linux &middot; paste, hit Enter
            </p>
            <CopyButton text={oneLinerInstall} />
          </div>
          <pre className="command whitespace-pre-wrap px-5 py-6">
            <code>{oneLinerInstall}</code>
          </pre>
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-rule px-5 py-3 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-faint">
            <span>
              AppImage &middot; ~95 MB &middot; SHA-256 verified
            </span>
            <a
              href={INSTALL_SCRIPT_URL}
              className="text-saffron underline-offset-2 hover:underline"
              target="_blank"
              rel="noopener"
            >
              install.sh ↗
            </a>
          </div>
          <div className="border-t border-rule px-5 py-3 font-mono text-[0.66rem] uppercase tracking-[0.12em] text-faint">
            Power users:{" "}
            <a
              href={`${ASSET_BASE}/Tvashtra_${VERSION}_amd64.deb`}
              className="text-ink underline-offset-2 hover:text-saffron hover:underline"
            >
              .deb
            </a>{" "}
            &middot;{" "}
            <a
              href={`${ASSET_BASE}/Tvashtra-${VERSION}-1.x86_64.rpm`}
              className="text-ink underline-offset-2 hover:text-saffron hover:underline"
            >
              .rpm
            </a>{" "}
            (host OCCT 7.8 required)
          </div>
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
