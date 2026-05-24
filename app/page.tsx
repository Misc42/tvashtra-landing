import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import HowItWorks from "@/components/HowItWorks";
import Anatomy from "@/components/Anatomy";
import WatchItBuild from "@/components/WatchItBuild";
import Showcase from "@/components/Showcase";
import Install from "@/components/Install";
import TryInBrowser from "@/components/TryInBrowser";
import Faq from "@/components/Faq";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Problem />
      <HowItWorks />
      <Anatomy />
      <WatchItBuild />
      <Showcase />
      <Install />
      <TryInBrowser />
      <Faq />
    </main>
  );
}
