import { HeroSection } from "@/components/HeroSection";
import { LogoCarousel } from "@/components/LogoCarousel";
import { ChateauxSection } from "@/components/ChateauxSection";
import { EvenementsSection } from "@/components/EvenementsSection";
import { SocialProofSection } from "@/components/SocialProofSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <LogoCarousel />
      <ChateauxSection />
      <EvenementsSection />
      <SocialProofSection />
    </>
  );
}
