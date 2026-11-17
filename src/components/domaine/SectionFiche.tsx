/**
 * Une section de la fiche château (17/11/2026) : étiquette, titre H2 porteur
 * d'un mot-clé, introduction, cartes de texte, chiffres, diaporama et lien
 * vers la page détaillée. Server Component : remplace les trois blocs
 * recopiés (hébergement, réunion, restauration) de l'ancienne fiche.
 * Le contenu vient de lib/fiche-sections (une section = un seul sujet).
 */
import Link from "next/link";
import { Accessibility, ArrowRight, Bed, Building2, Bus, Car, MapPin, Plane, Sparkles, TrainFront, TramFront, TreePine, UtensilsCrossed, type LucideIcon } from "lucide-react";
import { Section, Container } from "@/components/layout-v2";
import { Text } from "@/components/ui-v2";
import { theme } from "@/design-system/tokens";
import { Diaporama, type PhotoDiaporama } from "@/components/domaine/Diaporama";
import { ParaCard, StickySlider } from "@/components/domaine/briques-fiche";
import styles from "@/components/domaine/domaine.module.css";
import type { SectionFiche as Contenu } from "@/lib/fiche-sections";
import type { SectionFicheId } from "@/data/fiche-sections";

const ICONES: Record<SectionFicheId, LucideIcon> = {
  lieu: Sparkles,
  hebergement: Bed,
  reunion: Building2,
  restauration: UtensilsCrossed,
  activites: TreePine,
  acces: MapPin,
};

/**
 * Icône du moyen de transport, d'après le titre d'un bloc de la section Accès
 * (« En voiture », « En train ou en RER », « En métro »…). Le premier mot
 * reconnu l'emporte ; un titre inconnu garde l'étoile par défaut.
 */
const TRANSPORTS: Array<[RegExp, LucideIcon]> = [
  [/voiture/i, Car],
  [/métro/i, TramFront],
  [/train|rer/i, TrainFront],
  [/avion|hélicoptère/i, Plane],
  [/transfert|navette/i, Bus],
  [/accessibilité/i, Accessibility],
];

function iconeTransport(titre: string) {
  const Icone = TRANSPORTS.find(([motif]) => motif.test(titre))?.[1];
  return Icone ? <Icone className="w-4 h-4" style={{ color: theme.colors.primary.bronze, flexShrink: 0 }} aria-hidden /> : undefined;
}

interface SectionFicheProps {
  section: Contenu;
  photos: PhotoDiaporama[];
  /** Rang dans la page : alterne le fond et le côté du diaporama. */
  rang: number;
}

const bronze = theme.colors.primary.bronze;

export function SectionFiche({ section, photos, rang }: SectionFicheProps) {
  const Icone = ICONES[section.id];
  const pair = rang % 2 === 0;
  const fond = pair ? "gray" : "white";

  const texte = (
    <div>
      <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "6px 14px", background: `${bronze}10`, borderRadius: theme.effects.borderRadius.full, border: `1px solid ${bronze}30`, marginBottom: "1rem" }}>
        <Icone className="w-4 h-4" style={{ color: bronze }} />
        <span style={{ fontSize: "0.75rem", fontWeight: 600, color: bronze, textTransform: "uppercase", letterSpacing: "0.05em" }}>{section.etiquette}</span>
      </div>
      <Text variant="h2" style={{ marginBottom: "1rem", textAlign: "left" }}>{section.titre}</Text>
      <p style={{ fontSize: "clamp(0.9375rem, 1.6vw, 1.0625rem)", lineHeight: 1.75, color: theme.colors.neutral.gray700, margin: "0 0 1.25rem" }}>{section.intro}</p>
      {section.blocs.map((b) => (
        <ParaCard key={b.titre} text={`${b.titre} : ${b.texte}`} sectionBg={fond} icone={section.id === "acces" ? iconeTransport(b.titre) : undefined} />
      ))}
      {/* Chiffres clés en cases égales (17/11/2026) : les pastilles, larges comme leur
          texte, se rangeaient en 1 + 2 + 1. Deux cases par ligne, trois quand il y a
          trois chiffres. */}
      {section.faits.length > 0 && (
        <dl className={`${styles.chiffresSection} ${section.faits.length === 3 ? styles.chiffresPar3 : ""}`}>
          {section.faits.map((f) => (
            <div key={f.label} className={styles.chiffre}>
              <dt>{f.label}</dt>
              <dd>{f.valeur}</dd>
            </div>
          ))}
        </dl>
      )}
      {section.liens.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem 1.5rem", marginTop: "1.25rem" }}>
          {section.liens.map((l) => (
            <Link key={l.href} href={l.href} style={{ display: "inline-flex", alignItems: "center", gap: "6px", minHeight: "44px", fontSize: "0.9375rem", fontWeight: 600, color: bronze, textDecoration: "none" }}>
              {l.label}
              <ArrowRight className="w-4 h-4" aria-hidden />
            </Link>
          ))}
        </div>
      )}
    </div>
  );

  // Dans le HTML, le texte passe toujours avant les photos (lecture mobile et
  // robots) ; sur grand écran, une section sur deux affiche les photos à gauche.
  const diaporama = photos.length > 0 && (
    <div className={pair ? styles.photosAGauche : undefined}>
      <StickySlider>
        <Diaporama photos={photos} />
      </StickySlider>
    </div>
  );

  return (
    <Section id={section.id} spacing="lg" background={fond} style={{ padding: "clamp(2.5rem, 5vw, 4rem) 0" }}>
      <Container size="xl">
        {diaporama ? (
          <div className="responsive-grid" style={{ display: "grid", gridTemplateColumns: pair ? "1.15fr 1fr" : "1fr 1.15fr", gap: "clamp(2rem, 4vw, 3rem)" }}>
            {texte}
            {diaporama}
          </div>
        ) : texte}
      </Container>
    </Section>
  );
}
