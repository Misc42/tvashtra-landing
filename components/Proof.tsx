import Image from "next/image";
import { asset } from "@/lib/asset";

type Proof = {
  img: string;
  fit: "contain" | "cover";
  title: string;
  prompt: string;
};

// The six proof cards from the design — screenshot on the left,
// literal prompt on the right, nothing else. The differentiator-heavy
// Showcase grid (stress/modal/thermal/etc.) lives in git history; this
// section trades breadth for the "commercial product, not documentation"
// brief — one line of proof per capability, not a whitepaper.
const proofs: Proof[] = [
  {
    img: "/screenshots/showcase/semantic-edit.png",
    fit: "contain",
    title: "One sentence edits the part",
    prompt: "Change every M5 hole on this bracket to M6.",
  },
  {
    img: "/screenshots/showcase/stress-orbit-poster.jpg",
    fit: "cover",
    title: "Stress, solved in-chat",
    prompt: "Clamp the bottom, 100 N down on top, steel. Where does it yield?",
  },
  {
    img: "/screenshots/showcase/explore-designs.png",
    fit: "contain",
    title: "It explores alternatives",
    prompt: "Same brief — give me genuinely different structures, ranked.",
  },
  {
    img: "/screenshots/showcase/pcb-enclosure.png",
    fit: "contain",
    title: "The board becomes mechanical",
    prompt: "Take this KiCad board and fit it for an enclosure.",
  },
  {
    img: "/screenshots/showcase/drawings-a4-bracket.png",
    fit: "contain",
    title: "Shop drawings out the back",
    prompt: "Make an A4 drawing — front, top, right, iso. Scale 1:1.",
  },
  {
    img: "/screenshots/showcase/explode-poster.jpg",
    fit: "cover",
    title: "Assemblies that fan apart",
    prompt: "Build the cylinder, then fan it out for the manual.",
  },
];

export default function Proof() {
  return (
    <section id="proof" className="border-t border-rule">
      <div className="wrap py-20">
        <div className="mb-11 flex flex-wrap items-baseline justify-between gap-3">
          <h2 className="text-[38px] font-bold tracking-[-0.025em]">
            Real prompts, real geometry.
          </h2>
          <span className="text-sm text-faint">
            every image is the kernel&rsquo;s own render
          </span>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {proofs.map((p) => (
            <article
              key={p.img}
              className="card overflow-hidden bg-bg-alt"
            >
              <div className="relative aspect-[4/3] w-full bg-bg-code">
                <Image
                  src={asset(p.img)}
                  alt={p.title}
                  fill
                  sizes="(min-width: 1024px) 380px, 100vw"
                  className={p.fit === "contain" ? "object-contain" : "object-cover"}
                />
              </div>
              <div className="px-[22px] py-5">
                <h3 className="text-[17px] font-bold tracking-[-0.01em]">
                  {p.title}
                </h3>
                <p className="mt-2 font-mono text-[12.5px] leading-[1.6] text-muted">
                  &ldquo;{p.prompt}&rdquo;
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
