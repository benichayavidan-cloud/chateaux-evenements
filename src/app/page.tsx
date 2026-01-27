import dynamic from "next/dynamic";
import { HeroSection } from "@/components/HeroSection";
import { LogoCarousel } from "@/components/LogoCarousel";
import { ChateauxSection } from "@/components/ChateauxSection";

// Code splitting : charger les composants non critiques seulement quand nécessaire
const EvenementsSection = dynamic(() => import("@/components/EvenementsSection").then(mod => ({ default: mod.EvenementsSection })), {
  loading: () => <div style={{ minHeight: '400px' }} />,
  ssr: true
});

const SocialProofSection = dynamic(() => import("@/components/SocialProofSection").then(mod => ({ default: mod.SocialProofSection })), {
  loading: () => <div style={{ minHeight: '300px' }} />,
  ssr: true
});

const ReviewsSection = dynamic(() => import("@/components/ReviewsSection").then(mod => ({ default: mod.ReviewsSection })), {
  loading: () => <div style={{ minHeight: '500px' }} />,
  ssr: true
});

export default function Home() {
  return (
    <>
      <HeroSection />
      <LogoCarousel />
      <ChateauxSection />
      <EvenementsSection />
      <SocialProofSection />
      <ReviewsSection />
    </>
  );
}
