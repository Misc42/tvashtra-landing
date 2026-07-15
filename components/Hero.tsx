import Image from "next/image";
import Link from "next/link";
import { asset } from "@/lib/asset";

export default function Hero() {
  return (
    <section className="wrap relative pt-[88px] text-center">
      <p className="mb-4 text-[13.5px] font-semibold text-copper-text">
        ◐ Private beta · v0.10 ·{" "}
        <a
          href="https://misc42.github.io/misc42labs/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-copper-text/40 underline-offset-2 hover:decoration-copper-text"
        >
          a Misc42 Labs product
        </a>
      </p>
      <h1 className="mx-auto max-w-[880px] text-[clamp(48px,5.6vw,76px)] font-bold leading-[1.02] tracking-[-0.03em]">
        CAD you can talk to.
        <br />
        <span className="text-faint">It checks its own work.</span>
      </h1>
      <p className="mx-auto mt-[22px] max-w-[560px] text-lg leading-[1.55] text-muted">
        Describe the part. Tvashtra builds it on a real B-rep kernel,
        simulates it, and re-reads its own renders before saying &ldquo;done.&rdquo;
        Your API key, your machine.
      </p>
      <div className="mt-[34px] flex flex-wrap justify-center gap-3">
        <Link href="#install" className="btn-primary">
          Join the beta
        </Link>
        <Link href="#proof" className="btn-secondary">
          See it build
        </Link>
      </div>
      <p className="mt-3.5 text-[13px] text-faint">
        Linux today · macOS &amp; Windows in CI · Claude / Gemini / OpenAI / Ollama
      </p>
      <div className="relative mx-auto mt-14 max-w-[1020px] overflow-hidden rounded-t-2xl border border-b-0 border-rule shadow-[0_-1px_0_rgba(232,179,57,0.2)_inset,0_40px_80px_-40px_rgba(0,0,0,0.8)]">
        <div className="relative aspect-[16/9.6] w-full bg-bg">
          <Image
            src={asset("/screenshots/forge-black-shell.png")}
            alt="The Tvashtra desktop shell — chat panel, render viewport, and the kernel's own output on screen"
            fill
            priority
            sizes="(min-width: 1020px) 1020px, 100vw"
            className="object-cover object-top"
          />
        </div>
      </div>
    </section>
  );
}
