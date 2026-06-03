"use client";

import { useEffect, useRef, useState } from "react";
import type { ModelViewerElement } from "./model-viewer.d";

// Orbitable 3D viewer for a single Showcase geometry card. Wraps the
// <model-viewer> web component, which is client-only — the static export must
// not try to render it on the server, so the element is registered inside a
// `useEffect` (browser-only) and the component is mounted dynamically with SSR
// disabled by the caller. Until then the card shows the same pre-rendered 4K
// still it always showed, so the page paints instantly and stays light.
//
// Performance, five viewers on one page: each starts with `reveal="manual"`
// and `loading="lazy"`. The GLB is not fetched and no WebGL context is created
// until the visitor actually clicks the card — at which point we dismiss the
// poster and let model-viewer pull the model in. So the cost of 3D is paid one
// part at a time, only for the parts a visitor chooses to spin.

type Props = {
  /** GLB url (already run through the basePath asset() helper). */
  src: string;
  /** The existing pre-rendered still, shown as the poster (basePath-prefixed). */
  poster: string;
  /** Accessible label / alt for the part. */
  alt: string;
  /** Renderer exposure — tuned per card so no two parts read the same. */
  exposure: number;
  /** Shadow weight under the part — also varied per card. */
  shadowIntensity: number;
  /** A short orbit hint, e.g. the part name, shown on the prompt chip. */
  hint?: string;
};

export default function PartViewer({
  src,
  poster,
  alt,
  exposure,
  shadowIntensity,
}: Props) {
  const ref = useRef<ModelViewerElement | null>(null);
  // `ready` flips once the custom element is defined in the browser; before
  // that we render only the poster image (works on the server too).
  const [ready, setReady] = useState(false);
  // `live` flips on first interaction — the moment we fetch the GLB and hand
  // the card over to the 3D renderer.
  const [live, setLive] = useState(false);

  useEffect(() => {
    let cancelled = false;
    import("@google/model-viewer").then(() => {
      if (!cancelled) setReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // First click/tap: reveal the model and drop the poster overlay. Guarded so
  // it only fires once and only after the element is actually registered.
  function activate() {
    if (live || !ready) return;
    setLive(true);
    // Let React commit `reveal="auto"` first, then dismiss the built-in poster
    // so the model fades in over the still rather than flashing the canvas.
    requestAnimationFrame(() => ref.current?.dismissPoster());
  }

  return (
    <div
      className="absolute inset-0"
      onPointerDown={activate}
      role="button"
      tabIndex={0}
      aria-label={`Spin ${alt} in 3D`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          activate();
        }
      }}
    >
      {ready ? (
        <model-viewer
          ref={ref}
          src={src}
          alt={alt}
          poster={poster}
          reveal={live ? "auto" : "manual"}
          loading="lazy"
          camera-controls
          touch-action="pan-y"
          auto-rotate={live ? "" : undefined}
          auto-rotate-delay="0"
          rotation-per-second="18deg"
          interaction-prompt="none"
          shadow-intensity={shadowIntensity}
          shadow-softness="0.8"
          exposure={exposure}
          environment-image="neutral"
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "transparent",
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ["--poster-color" as any]: "transparent",
          }}
        />
      ) : (
        // Pre-registration / SSR fallback: the plain still, object-contain to
        // match the static <Image> the other cards use.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={poster}
          alt={alt}
          className="h-full w-full object-contain"
        />
      )}

      {!live && (
        <span className="label pointer-events-none absolute bottom-3 left-3 rounded-sm border border-rule bg-paper/85 px-2 py-1 text-[0.6rem] text-muted backdrop-blur-sm">
          Drag to rotate · scroll to zoom
        </span>
      )}
    </div>
  );
}
