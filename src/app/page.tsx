import dynamic from "next/dynamic";
import type { Metadata } from "next";
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

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

// METADATA DYNAMIQUE ADAPTATIVE (basée sur les paramètres de recherche)
export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const params = await searchParams;

  // Extraction des paramètres de recherche
  const ville = params.ville as string | undefined;
  const dept = params.dept as string | undefined;
  const type = params.type as string | undefined;
  const capacite = params.capacite as string | undefined;
  const chambres = params.chambres as string | undefined;

  // Mapping des départements
  const deptNames: Record<string, string> = {
    "60": "Oise",
    "92": "Hauts-de-Seine",
    "78": "Yvelines",
    "oise": "Oise (60)",
    "hauts-de-seine": "Hauts-de-Seine (92)",
    "yvelines": "Yvelines (78)",
  };

  // Mapping des types de lieux
  const typeNames: Record<string, string> = {
    "chateau": "Château",
    "abbaye": "Abbaye",
    "domaine": "Domaine",
    "palais": "Palais",
  };

  // Construction du titre dynamique
  let titleParts: string[] = [];
  let descriptionContext = "";

  // Priorité : Type > Ville > Département
  if (type && typeNames[type.toLowerCase()]) {
    titleParts.push(typeNames[type.toLowerCase()]);
    descriptionContext = `${typeNames[type.toLowerCase()]} pour séminaire`;
  } else {
    titleParts.push("Châteaux");
    descriptionContext = "Domaines d'exception pour séminaire";
  }

  titleParts.push("Séminaire");

  if (ville) {
    const villeFormatted = ville.charAt(0).toUpperCase() + ville.slice(1).toLowerCase();
    titleParts.push(villeFormatted);
    descriptionContext += ` à ${villeFormatted}`;
  } else if (dept && deptNames[dept.toLowerCase()]) {
    titleParts.push(deptNames[dept.toLowerCase()]);
    descriptionContext += ` en ${deptNames[dept.toLowerCase()]}`;
  } else {
    titleParts.push("Île-de-France & Oise");
    descriptionContext += " en Île-de-France et Oise";
  }

  if (capacite) {
    titleParts.push(`${capacite} pers`);
    descriptionContext += ` pour ${capacite} personnes`;
  }

  if (chambres) {
    titleParts.push(`${chambres} chambres`);
    descriptionContext += ` avec ${chambres} chambres`;
  }

  const dynamicTitle = `${titleParts.join(" ")} | Select Châteaux`;
  const dynamicDescription = `${descriptionContext}. Accès confidentiel aux domaines les plus convoités pour vos événements d'entreprise. 4 Lieux d'Exception. Devis gratuit.`;

  return {
    title: dynamicTitle,
    description: dynamicDescription,
    robots: {
      index: true,   // EXCEPTION : Page d'accueil visible sur Google
      follow: true,
    },
  };
}

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
