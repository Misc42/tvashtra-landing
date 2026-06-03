import Image from "next/image";
import Link from "next/link";
import { asset } from "@/lib/asset";

export default function Hero() {
  return (
    <section className="wrap grid gap-14 border-b border-rule pb-24 pt-14 lg:grid-cols-[0.95fr_1fr] lg:items-center">
      <div className="flex flex-col items-start">
        <p className="masthead mb-7">
          Tvashtra &middot;{" "}
          <a
            href="https://misc42.github.io/misc42labs/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-saffron"
          >
            Misc42 Labs
          </a>
        </p>
        <div className="flex items-start gap-5">
          <p
            className="deva mt-1 text-[clamp(3.2rem,7vw,5.2rem)] leading-[0.85] text-saffron"
            lang="sa"
            aria-hidden
          >
            त्वष्त्र
          </p>
          <h1 className="display max-w-xl">
            Conversational
            <br />
            <span className="text-saffron">mechatronics CAD.</span>
          </h1>
        </div>
        <p className="lead mt-7 max-w-md text-[clamp(1.3rem,2.4vw,1.7rem)]">
          Describe it. Tvashtra builds the part, simulates it, wires the
          electronics, and explores the alternatives — from one conversation.
        </p>
        <p className="mt-8 max-w-xl text-base leading-relaxed text-muted">
          Desktop CAD on a real B-rep kernel (OCCT), not a toy mesh. You type
          intent; it runs solid-modeling ops, FEM stress and modal solves, the
          KiCad-to-enclosure bridge, and design-space sweeps. Four canonical
          views auto-render after every batch so the model checks its own work
          and retries when wrong. STL, STEP, OBJ out the back. Your API key,
          your machine.
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-4">
          <Link
            href="#install"
            className="label inline-flex items-center gap-2 rounded-sm border border-saffron bg-saffron px-5 py-3 text-[0.72rem] text-paper transition hover:bg-transparent hover:text-saffron"
          >
            Join the beta
            <span aria-hidden>&rarr;</span>
          </Link>
          <Link
            href="#tour"
            className="label inline-flex items-center gap-2 border-b border-rule pb-2 text-[0.72rem] text-ink transition hover:border-saffron hover:text-saffron"
          >
            See the tour
            <span aria-hidden>&darr;</span>
          </Link>
        </div>
      </div>
      <figure className="card overflow-hidden">
        <div className="relative aspect-[16/10] w-full bg-paper">
          <Image
            src={asset("/screenshots/forge-black-shell.png")}
            alt="The Tvashtra desktop shell — devanagari brand glyph, history rail on the left, six render modes above the viewport, and a chat composer on the right with sample prompts."
            fill
            priority
            sizes="(min-width: 1024px) 720px, 100vw"
            className="object-cover"
          />
        </div>
        <figcaption className="label flex items-center justify-between gap-4 border-t border-rule px-5 py-3 text-faint">
          <span>Desktop &middot; OCCT &middot; wgpu PBR</span>
          <span className="text-saffron">Forge Black</span>
        </figcaption>
      </figure>
    </section>
  );
}
