import Image from "next/image";
import Link from "next/link";
import { asset } from "@/lib/asset";

export default function Hero() {
  return (
    <section className="wrap grid gap-14 border-b border-rule pb-20 pt-12 lg:grid-cols-[0.95fr_1fr] lg:items-center">
      <div className="flex flex-col items-start">
        <p className="masthead mb-5">Tvashtra &middot; Misc42 Labs</p>
        <h1 className="display max-w-xl">
          LLM-driven CAD,
          <br />
          <span className="text-saffron">that doesn&rsquo;t lie.</span>
        </h1>
        <p
          className="deva mt-5 text-[clamp(2.4rem,5vw,3.4rem)] leading-[1] text-saffron"
          lang="sa"
        >
          त्वष्टृ
        </p>
        <p className="lead mt-4 max-w-md text-[clamp(1.25rem,2.4vw,1.65rem)]">
          The model builds the part. Sees the part. Fixes its own mistakes
          before it dares to call it done.
        </p>
        <p className="mt-7 max-w-xl text-base leading-relaxed text-muted">
          Desktop CAD on a real B-rep kernel (OCCT), not a toy mesh. You type
          intent. It runs solid-modeling ops. Four canonical views auto-render
          after every batch so the model checks its own work and retries when
          wrong. STL, STEP, OBJ go out the back. Your API key, your machine.
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
