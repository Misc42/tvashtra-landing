// Type surface for the <model-viewer> custom element so TSX accepts it.
//
// @google/model-viewer registers a web component, not a React component, so
// the JSX namespace has no knowledge of the tag or its attributes. We declare
// the intrinsic element here with the subset of attributes the Showcase
// viewers actually set — kept narrow on purpose so a typo in an attribute name
// still surfaces at compile time rather than being swallowed by `any`.
import type { DetailedHTMLProps, HTMLAttributes } from "react";

/** The element instance the imperative API (dismissPoster) is called on. */
export interface ModelViewerElement extends HTMLElement {
  dismissPoster(): void;
}

type ModelViewerAttributes = DetailedHTMLProps<
  HTMLAttributes<ModelViewerElement>,
  ModelViewerElement
> & {
  src?: string;
  alt?: string;
  poster?: string;
  reveal?: "auto" | "manual" | "interaction";
  loading?: "auto" | "lazy" | "eager";
  "camera-controls"?: boolean | "";
  "touch-action"?: string;
  "auto-rotate"?: boolean | "";
  "auto-rotate-delay"?: number | string;
  "rotation-per-second"?: string;
  "interaction-prompt"?: "auto" | "none" | "when-focused";
  "shadow-intensity"?: number | string;
  "shadow-softness"?: number | string;
  exposure?: number | string;
  "environment-image"?: string;
  "camera-orbit"?: string;
  "field-of-view"?: string;
  "min-camera-orbit"?: string;
  "max-camera-orbit"?: string;
  "disable-zoom"?: boolean | "";
  "disable-pan"?: boolean | "";
};

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": ModelViewerAttributes;
    }
  }
}
