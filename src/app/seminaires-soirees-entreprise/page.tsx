/**
 * Page « Nos soirées » (onglet du menu). Composant serveur depuis le 18/11/2026 :
 * la partie interactive vit dans SoireesPageClient ; les 4 châteaux de la
 * collection et le formulaire de devis sont rendus ici, côté serveur.
 */
import SoireesPageClient from "./SoireesPageClient";
import DevisFormMini from "@/components/DevisFormMini";
import { ChateauxEtAnimations } from "@/components/home/ChateauxEtAnimations";
import { chateaux } from "@/data/chateaux";

export default function SoireesPage() {
  return (
    <SoireesPageClient
      avantFaq={
        <>
          <section style={{ background: "#fafafa", padding: "clamp(2.5rem, 5vw, 4rem) 0" }}>
            <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 clamp(1rem, 4vw, 2rem)" }}>
              <h2 style={{ margin: "0 0 0.75rem", textAlign: "center", fontFamily: "var(--font-cormorant), Georgia, serif", fontStyle: "italic", fontWeight: 500, fontSize: "clamp(1.75rem, 4vw, 2.75rem)", lineHeight: 1.15, color: "#171717" }}>
                Dans quel château organiser votre soirée ?
              </h2>
              <p style={{ maxWidth: "760px", margin: "0 auto 2.5rem", textAlign: "center", fontSize: "1.0625rem", lineHeight: 1.6, color: "#525252" }}>
                Nos soirées ont lieu dans les 4 châteaux de la collection. Voici les thèmes qui vont le mieux avec chacun ; vos participants regagnent ensuite leur chambre à pied.
              </p>
              <ChateauxEtAnimations chateaux={chateaux} rubrique="soirees" ancre="soirees-a-theme" lien="Voir ses soirées" />
            </div>
          </section>
          {/* Formulaire de devis sur place : la page n'en avait aucun (constat du 18/11/2026). */}
          <section style={{ background: "#FFFFFF" }}>
            <div style={{ maxWidth: "1024px", margin: "0 auto", padding: "0 clamp(1rem, 4vw, 2rem)" }}>
              <DevisFormMini chateauId="conseil" chateauNom="Châteaux d'Exception" />
            </div>
          </section>
        </>
      }
    />
  );
}
