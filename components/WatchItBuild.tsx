import { asset } from "@/lib/asset";

// Looping autoplay-muted MP4 of a real part being built, op by op. Three
// stages of a motor-mount bracket — bare plate → centre bore → corner
// clearance holes — with crossfades between. The video is rendered offline
// via tvashtra-cli on the actual v0.3.0 kernel; what you see is exactly
// what the renderer sends back to the model.
export default function WatchItBuild() {
  return (
    <section
      id="watch-it-build"
      className="wrap border-b border-rule py-20 lg:py-24"
    >
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <div>
          <p className="masthead mb-4">Watch it build</p>
          <h2 className="section-title">
            Three ops.{" "}
            <span className="text-saffron">One bracket.</span>
            <br />
            <span className="text-muted">No mouse.</span>
          </h2>
          <p className="serif-italic mt-6 text-xl text-muted">
            The chat goes in. The geometry comes out.
          </p>
          <p className="mt-6 text-base leading-relaxed text-muted">
            Each frame in this clip is the actual OCCT shape after one tool
            call — the same image the model saw before it answered. No
            tessellation tricks, no recorded screen, no offline post.
          </p>
          <ol className="mt-8 space-y-3 font-mono text-[0.78rem] uppercase tracking-[0.14em]">
            <li className="flex gap-3">
              <span className="text-saffron">01</span>
              <span className="text-ink">
                box(100 × 80 × 8){" "}
                <span className="normal-case tracking-normal text-muted">
                  — the plate
                </span>
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-saffron">02</span>
              <span className="text-ink">
                hole(⌀40 through){" "}
                <span className="normal-case tracking-normal text-muted">
                  — NEMA 17 centre bore
                </span>
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-saffron">03</span>
              <span className="text-ink">
                hole(⌀5.5 through) × 4{" "}
                <span className="normal-case tracking-normal text-muted">
                  — M5 clearance, corners
                </span>
              </span>
            </li>
          </ol>
        </div>

        <figure className="card overflow-hidden">
          <div className="relative aspect-video w-full bg-paper">
            <video
              src={asset("/screenshots/showcase/motor-mount-build.mp4")}
              poster={asset(
                "/screenshots/showcase/motor-mount-build-poster.png"
              )}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              className="absolute inset-0 h-full w-full object-cover"
              aria-label="Looping clip — a motor-mount bracket being built three ops at a time"
            />
          </div>
          <figcaption className="flex items-center justify-between gap-4 border-t border-rule px-5 py-3 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-faint">
            <span>OCCT 7.8 &middot; HDR studio &middot; live kernel</span>
            <span className="text-saffron">~6s loop</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
