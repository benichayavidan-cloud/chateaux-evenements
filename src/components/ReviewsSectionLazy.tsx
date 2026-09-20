"use client";

import dynamic from "next/dynamic";

// `ssr: false` retiré le 20/09/2026. Il gardait les avis HORS du HTML servi :
// invisibles pour les robots qui n'exécutent pas de JavaScript — c'est-à-dire
// ceux qui alimentent les réponses des IA — et incompatibles avec le balisage
// de la note, que Google n'accepte que si l'élément noté est rendu.
// Le chargement reste différé (le composant est lourd), mais son premier rendu
// part du serveur.
const ReviewsSection = dynamic(
  () => import("@/components/ReviewsSection").then(mod => ({ default: mod.ReviewsSection }))
);

export function ReviewsSectionLazy() {
  return <ReviewsSection />;
}
