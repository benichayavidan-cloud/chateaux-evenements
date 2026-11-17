/**
 * Accueil du domaine : une petite carte par rubrique (vignette, titre,
 * résumé sur 2 lignes, « Découvrir → »), au gabarit des sections de la fiche
 * (badge, titre H2, fond gris). Server Component rendu entre la vue
 * d'ensemble et l'hébergement ; rien si le château n'a pas de rubriques.
 *
 * 16/11 : la première version (cartes pleine largeur, photos géantes) a été
 * refusée par le PO — la grille est désormais écrite dans domaine.module.css.
 */
import Image from "next/image";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { Medaillon } from "@/components/domaine/Medaillon";
import { Section, Container } from "@/components/layout-v2";
import { Text } from "@/components/ui-v2";
import { theme } from "@/design-system/tokens";
import styles from "@/components/domaine/domaine.module.css";
import { TITRES, rubrique as lireRubrique, urlRubrique } from "@/lib/rubriques";
import type { RubriqueId } from "@/types/rubriques";

interface DecouvrirDomaineProps {
  slug: string;
  rubriques: RubriqueId[];
  /** Titre de la section (défaut : « Découvrir le domaine »). */
  titre?: string;
}

export function DecouvrirDomaine({ slug, rubriques, titre = "Découvrir le domaine" }: DecouvrirDomaineProps) {
  if (rubriques.length === 0) return null;

  return (
    <Section spacing="lg" background="white" style={{ padding: "clamp(2.5rem, 5vw, 4rem) 0" }}>
      <Container size="xl">
        {/* Étiquette et titre centrés : section pleine largeur (demande PO du 17/11/2026). */}
        <div style={{ textAlign: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "5px 14px 5px 5px", background: `${theme.colors.primary.bronze}10`, borderRadius: theme.effects.borderRadius.full, border: `1px solid ${theme.colors.primary.bronze}30`, marginBottom: "1rem" }}>
            <Medaillon icone={Sparkles} taille="petit" />
            <span style={{ fontSize: "0.75rem", fontWeight: 600, color: theme.colors.primary.bronze, textTransform: "uppercase", letterSpacing: "0.05em" }}>Le domaine en détail</span>
          </div>
        </div>
        <Text variant="h2" style={{ marginBottom: "1.5rem", textAlign: "center" }}>{titre}</Text>
        <ul className={styles.grilleRubriques}>
          {rubriques.map((id) => {
            const r = lireRubrique(slug, id);
            if (!r) return null;
            const photo = r.photos[0];
            return (
              <li key={id}>
                <Link href={urlRubrique(slug, id)} className={styles.carteRubrique}>
                  {photo && (
                    <div className={styles.vignette}>
                      <Image src={photo.src} alt={photo.legende} fill loading="lazy" sizes="(min-width: 1024px) 280px, (min-width: 768px) 33vw, 50vw" className="object-cover" />
                    </div>
                  )}
                  <div className={styles.carteCorps}>
                    <span style={{ fontFamily: theme.typography.fonts.heading, fontSize: "clamp(0.9375rem, 1.6vw, 1.0625rem)", fontWeight: 600, color: theme.colors.neutral.gray900, lineHeight: 1.25 }}>
                      {TITRES[id]}
                    </span>
                    <span className={styles.resumeCourt} style={{ fontSize: "0.8125rem", lineHeight: 1.5, color: theme.colors.neutral.gray600 }}>
                      {r.resume}
                    </span>
                    <span style={{ marginTop: "auto", fontSize: "0.8125rem", fontWeight: 600, color: theme.colors.primary.bronze }}>Découvrir →</span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
