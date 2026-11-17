/**
 * « Quelle salle pour quel format » (17/11/2026) : une carte par type
 * d'événement, avec les salles du domaine qui conviennent. Les chiffres sont
 * calculés depuis le tableau des capacités (lib/salles-par-format) : rien
 * n'est écrit à la main, donc rien ne peut contredire le tableau placé juste
 * en dessous. Server Component.
 */
import { Briefcase, LayoutGrid, Presentation, UtensilsCrossed, type LucideIcon } from "lucide-react";
import { Section, Container } from "@/components/layout-v2";
import { Text } from "@/components/ui-v2";
import { Medaillon } from "@/components/domaine/Medaillon";
import styles from "@/components/domaine/domaine.module.css";
import { sallesParFormat, type FormatId } from "@/lib/salles-par-format";
import type { SalleReunion } from "@/types/rubriques";

const ICONES: Record<FormatId, LucideIcon> = {
  pleniere: Presentation,
  ateliers: LayoutGrid,
  comite: Briefcase,
  gala: UtensilsCrossed,
};

interface SallesParFormatProps {
  salles: SalleReunion[];
  /** « au Grand Château Anglo-Normand » : rend le titre propre à chaque domaine. */
  lieu?: string;
}

export function SallesParFormat({ salles, lieu }: SallesParFormatProps) {
  const formats = sallesParFormat(salles);
  if (formats.length === 0) return null;

  return (
    <Section spacing="lg" background="white" style={{ padding: "clamp(2.5rem, 5vw, 4rem) 0" }}>
      <Container size="xl">
        <Text variant="h2" style={{ marginBottom: "0.5rem", textAlign: "left" }}>
          Quelle salle de séminaire choisir{lieu ? ` ${lieu}` : ""} ?
        </Text>
        <p className={styles.formatsChapo}>Selon le format de votre événement, les salles qui conviennent le mieux.</p>
        <ul className={styles.formats}>
          {formats.map((f) => (
            <li key={f.id} className={styles.format}>
              <div className={styles.formatTete}>
                <Medaillon icone={ICONES[f.id]} />
                <div>
                  <h3 className={styles.formatTitre}>{f.titre}</h3>
                  <p className={styles.formatResume}>{f.resume}</p>
                </div>
              </div>
              <ul className={styles.formatSalles}>
                {f.salles.map((l) => (
                  <li key={l.nom}>
                    <span className={styles.formatNom}>
                      {l.nom}
                      {l.mention && <em> ({l.mention})</em>}
                    </span>
                    <strong>{l.capacite}</strong>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
