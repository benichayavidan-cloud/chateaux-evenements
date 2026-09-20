import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Demande de devis envoyée",
  description: "Votre demande de devis pour un séminaire en château a été envoyée avec succès. Notre équipe vous contactera sous 24h.",
  // Sans canonical propre, cette page héritait de celle du segment parent et
  // désignait /devis comme sa version officielle — tout en portant noindex.
  // Les deux instructions se contredisent, et Google peut reporter le noindex
  // sur la cible désignée : la page qui reçoit les demandes de devis.
  alternates: { canonical: "/devis/merci" },
  robots: {
    index: false, // page de conversion, sans intérêt en recherche
    follow: true, // mais ses liens internes restent suivis
  },
};
