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
- [ ] **`VERSION` in `components/Install.tsx` tracks the release, not `main`.**
      It reads `0.10.0` and the download links resolve against
      `Misc42/tvashtra-landing` releases (the source repo is private, so its
      `/releases` 404s for anonymous downloaders). Bump this only AFTER a release
      has actually published — a bump ahead of publish leaves the site
      advertising assets that do not exist yet.
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
