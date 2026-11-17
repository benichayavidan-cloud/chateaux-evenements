/**
 * Gabarit unique des rubriques d'un domaine (salles, chambres, accès…).
 * Server Component, assemblé avec les briques de la fiche château
 * (EnTeteDomaine, BandeauConfiance, RubriquesNav, SectionFiche) depuis le
 * 17/11/2026 ; ici en plus : tableau des salles, autres rubriques,
 * formulaire. Seule la galerie est un îlot client (RubriqueVitrine).
 */
import Link from "next/link";
import { theme } from "@/design-system/tokens";
import styles from "@/components/domaine/domaine.module.css";
import DevisFormMini from "@/components/DevisFormMini";
import { LogoCarousel } from "@/components/LogoCarousel";
import { ReviewsSection } from "@/components/ReviewsSection";
import { RubriquesNav } from "@/components/domaine/RubriquesNav";
import { RubriqueVitrine } from "@/components/domaine/RubriqueVitrine";
import { EnTeteDomaine } from "@/components/domaine/EnTeteDomaine";
import { BandeauConfiance } from "@/components/domaine/BandeauConfiance";
import { SectionFiche } from "@/components/domaine/SectionFiche";
import { SallesParFormat } from "@/components/domaine/SallesParFormat";
import { sectionRubrique } from "@/lib/fiche-sections";
import { DecouvrirDomaine } from "@/components/domaine/DecouvrirDomaine";
import { Section, Container } from "@/components/layout-v2";
import { Text } from "@/components/ui-v2";
import { LIBELLES, TITRES, lieuDansTitre } from "@/lib/rubriques";
import type { Chateau } from "@/types";
import type { Rubrique, RubriqueId, SalleReunion } from "@/types/rubriques";

interface RubriquePageProps {
  chateau: Chateau;
  id: RubriqueId;
  r: Rubrique;
  rubriques: RubriqueId[];
}

const COLONNES: Array<{ cle: keyof SalleReunion; label: string }> = [
  { cle: "surfaceM2", label: "Surface" },
  { cle: "theatre", label: "Théâtre" },
  { cle: "classe", label: "Classe" },
  { cle: "enU", label: "En U" },
  { cle: "cabaret", label: "Cabaret" },
  { cle: "banquet", label: "Banquet" },
  { cle: "cocktail", label: "Cocktail" },
];

function cellule(s: SalleReunion, cle: keyof SalleReunion): string {
  const v = s[cle];
  if (v === null || v === undefined) return "–";
  return cle === "surfaceM2" ? `${v} m²` : String(v);
}

function TableauSalles({ salles }: { salles: SalleReunion[] }) {
  return (
    <div className="-mx-4 overflow-x-auto px-4 md:mx-0 md:px-0" tabIndex={0} role="region" aria-label="Tableau des capacités, défilable">
      <table className="w-full min-w-[640px] border-collapse text-left text-sm">
        <caption className="mb-3 text-left text-sm" style={{ color: theme.colors.neutral.gray600 }}>
          Capacité maximale par disposition, en nombre de personnes
        </caption>
        <thead>
          <tr style={{ borderBottom: `2px solid ${theme.colors.primary.bronze}` }}>
            <th scope="col" className="py-2 pr-4 font-semibold">Salle</th>
            {COLONNES.map((c) => (
              <th key={c.cle} scope="col" className="px-2 py-2 text-right font-semibold">{c.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {salles.map((s) => (
            <tr key={s.nom} style={{ borderBottom: `1px solid ${theme.colors.neutral.gray200}` }}>
              <th scope="row" className="py-3 pr-4 font-medium">
                {s.nom}
                {s.note && (
                  <span className="block text-xs font-normal" style={{ color: theme.colors.neutral.gray600 }}>{s.note}</span>
                )}
              </th>
              {COLONNES.map((c) => (
                <td key={c.cle} className="px-2 py-3 text-right tabular-nums">{cellule(s, c.cle)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function RubriquePage({ chateau, id, r, rubriques }: RubriquePageProps) {
  const autres = rubriques.filter((x) => x !== id);
  // Les sources des chiffres (qui peuvent nommer le lieu) restent côté serveur : sectionRubrique ne garde que libellé et valeur.
  const section = sectionRubrique(id, r);

  const filAriane = (
    <nav aria-label="Fil d'Ariane" className={`${styles.domaine} mb-3 text-xs md:text-sm`} style={{ color: theme.colors.neutral.gray600 }}>
      <ol className="flex flex-wrap items-center gap-1">
        <li><Link href="/" className="hover:underline">Accueil</Link> <span aria-hidden>›</span></li>
        <li><Link href="/chateaux" className="hover:underline">Nos châteaux</Link> <span aria-hidden>›</span></li>
        <li><Link href={`/chateaux/${chateau.slug}`} className="hover:underline">{chateau.nom}</Link> <span aria-hidden>›</span></li>
        <li aria-current="page">{LIBELLES[id]}</li>
      </ol>
    </nav>
  );

  return (
    <>
      <RubriqueVitrine
        chateau={{ nom: chateau.nom, images: chateau.images }}
        photosRubrique={section.photos}
        enTete={
          <>
            {filAriane}
            <EnTeteDomaine chateau={chateau} titre={TITRES[id]} lieu={lieuDansTitre(chateau.slug)} />
          </>
        }
      />

      <BandeauConfiance />

      {/* Menu des thèmes : onglets collés sous les badges, comme sur la fiche. */}
      <div style={{ background: "#FFFFFF", borderBottom: `1px solid ${theme.colors.neutral.gray200}` }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <RubriquesNav slug={chateau.slug} rubriques={rubriques} active={id} />
        </div>
      </div>

      {/* Section de texte : même brique que la fiche (étiquette, titre à mot-clé, conseil, cartes, chiffres). */}
      <SectionFiche section={section} photos={section.photos} rang={0} />

      {/* Quelle salle pour quel format : calculé depuis le tableau, placé juste avant lui. */}
      {r.salles && r.salles.length > 0 && <SallesParFormat salles={r.salles} lieu={lieuDansTitre(chateau.slug)} />}

      {r.salles && r.salles.length > 0 && (
        <Section spacing="lg" background="white" style={{ padding: "clamp(2.5rem, 5vw, 4rem) 0" }}>
          <Container size="xl">
            <div className={styles.domaine}>
              <Text variant="h2" style={{ marginBottom: "1.5rem", textAlign: "center" }}>Capacités salle par salle</Text>
              <TableauSalles salles={r.salles} />
              <p className="mt-2 text-xs" style={{ color: theme.colors.neutral.gray600 }}>
                « – » : disposition non proposée ou non communiquée. Faites défiler le tableau pour voir toutes les dispositions.
              </p>
            </div>
          </Container>
        </Section>
      )}

      <DecouvrirDomaine slug={chateau.slug} rubriques={autres} titre="Les autres espaces de votre séminaire" lieu={lieuDansTitre(chateau.slug)} />

      <Section spacing="lg" background="white" style={{ padding: "clamp(2.5rem, 5vw, 4rem) 0" }}>
        <Container size="xl">
          <div id="devis-express" className="scroll-mt-24">
            <DevisFormMini chateauId={chateau.id} chateauNom={chateau.nom} sourceLabel={`${chateau.nom} — ${LIBELLES[id]}`} />
          </div>
        </Container>
      </Section>

      {/* Confiance et avis Google, après le formulaire, comme sur la fiche château (demande PO du 17/11/2026). */}
      <LogoCarousel />
      <ReviewsSection />
    </>
  );
}
