# Tvashtra landing — future tasks

Live queue for the public landing site. Product/kernel work lives in the
`Misc42/tvashtra` repo's own `future_tasks.md`, not here.

## Active

- [ ] **Hardware number for local models — publish ONLY if P1–P3 pass.**
      `components/Install.tsx` currently states the REQUIREMENT (64k context,
      native tool calling, vision for the self-verify loop, may run on another
      machine on the network) and deliberately omits a VRAM figure, because
      nobody has yet completed a build on a machine sized for local inference.
      The derivation and the pre-registered predictions are in the kernel repo
      at `docs/design/local-model-requirements.md`; the publish rule is stated
      there. If the predictions fail, the honest line is the requirement without
      a number — do not soften a failed test into a hedged figure.
- [ ] **Three files pin the version; decide whether `public/VERSION` should be
      one of them.** `components/Install.tsx`, `public/install.sh` and
      `public/VERSION` each carry it independently. The v0.11.0 bump reached the
      first two and its commit message says "in both places that pin it" — there
      were three, and `public/VERSION` sat on `0.10.0`, served live at
      `misc42.github.io/tvashtra-landing/VERSION`, until it was corrected. No
      component, script or config in this repo reads that file, so it is a
      published endpoint with no in-repo consumer: either generate it from
      `Install.tsx` at build time, or drop it. Owner's call, because an external
      consumer would not be visible from here.

      The rule that made the bump safe stays: bump only AFTER a release has
      actually published — a bump ahead of publish leaves the site advertising
      assets that do not exist yet. Downloads resolve against
      `Misc42/tvashtra-landing` releases, since the source repo is private and
      its `/releases` 404s for anonymous downloaders.
- [ ] **No lint or type gate on this repo.** `.github/workflows/` holds only
      `pages.yml`, which builds and deploys. `tsc --noEmit` and `pnpm lint` both
      pass today and were run by hand; nothing enforces that. `prettier` is not
      a dependency here either, so the formatting check the kernel repo runs
      over `ui/` has no equivalent. A type error would surface as a failed
      deploy rather than a failed check.

- [ ] **Product screenshots / showcase assets.** Capture only from a shipped
      RELEASE, and only once UI-affecting work has landed — a mid-arc capture is
      invalidated by the next fix, and shots of unreleased UI advertise something
      nobody can download. Any landing image also gets an independent vision
      cross-check before it ships, not just a self-eyeball.

## Closed

- [x] **Wordmark spelling** (`f3ff5c4`) — `components/Nav.tsx` read `त्वष्त्र`
      while the app's own Viewport watermark and the readme use `त्वष्टृ`, so the
      site and the running application disagreed on the product's name.
- [x] **Local-model requirement copy** — `Install.tsx` now states what a local
      model must provide instead of implying any model works, and says it can run
      on a different machine on the network (`OllamaConfig.base_url` /
      `OLLAMA_HOST` make that real, which the first draft of the derivation had
      silently assumed away).
