import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import HowItWorks from "@/components/HowItWorks";
import Tour from "@/components/Tour";
import Install from "@/components/Install";
import TryInBrowser from "@/components/TryInBrowser";
import Faq from "@/components/Faq";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Problem />
      <HowItWorks />
      <Tour />
      <Install />
      <TryInBrowser />
      <Faq />
    </main>
  );
}
