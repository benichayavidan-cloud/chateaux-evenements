/**
 * Les 4 châteaux de la collection et ce que l'équipe y organise (18/11/2026).
 * Server Component, commun aux pages /team-building-chateau et
 * /seminaires-soirees-entreprise : une carte par château, avec les titres
 * d'une section de sa rubrique (« team-building » dans Activités,
 * « soirees-a-theme » dans Soirées) et un lien vers cette section.
 *
 * Les titres sont lus dans data/rubriques : un seul endroit à corriger.
 */
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import styles from "@/components/home/accueil.module.css";
import { RUBRIQUES_PAR_CHATEAU } from "@/data/rubriques";
import type { Chateau } from "@/types";

/** Nom court de chaque château (celui du tableau de l'accueil). */
const NOMS: Record<string, string> = {
  "manoir-anglo-normand-chantilly": "Manoir anglo-normand",
  "hotel-historique-seminaire-paris-92": "Domaine historique",
  "abbaye-millenaire-vallee-chevreuse": "Abbaye cistercienne",
  "palais-royal-foret-chantilly": "Château en forêt",
};

/** Capacité à afficher pour une soirée quand elle diffère de la capacité en réunion (jardin du domaine du 92 : sources officielles, 18/11/2026). */
const CAPACITE_SOIREE: Record<string, string> = {
  "hotel-historique-seminaire-paris-92": "jusqu'à 300 invités au jardin",
};

interface ChateauxEtAnimationsProps {
  chateaux: Chateau[];
  /** Rubrique du château où se trouve la section. */
  rubrique: "activites" | "soirees";
  /** Ancre de la section dans la page de la rubrique. */
  ancre: string;
  /** Texte du lien de chaque carte. */
  lien: string;
}

export function ChateauxEtAnimations({ chateaux, rubrique, ancre, lien }: ChateauxEtAnimationsProps) {
  const cartes = chateaux
    .map((c) => ({
      chateau: c,
      animations: RUBRIQUES_PAR_CHATEAU[c.slug]?.[rubrique]?.sections?.find((s) => s.ancre === ancre)?.blocs.map((b) => b.titre) ?? [],
    }))
    .filter((x) => NOMS[x.chateau.slug] && x.animations.length > 0);
  if (cartes.length === 0) return null;

  return (
    <div className={styles.quatuor}>
      {cartes.map(({ chateau, animations }) => (
        <article key={chateau.slug} className={styles.bloc}>
          <div className={styles.blocPhoto}>
            <Image
              src={chateau.images.card}
              alt={`${NOMS[chateau.slug]}, ${chateau.region} : l'un des 4 châteaux de la collection`}
              fill
              sizes="(min-width: 1100px) 25vw, (min-width: 640px) 50vw, 100vw"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className={styles.blocTexte}>
            <h3 className={styles.blocTitre}>{NOMS[chateau.slug]}</h3>
            <p className={styles.sousTitre}>
              {chateau.region} · {(rubrique === "soirees" && CAPACITE_SOIREE[chateau.slug]) || `jusqu'à ${chateau.capacite.max} participants`}
            </p>
            <ul className={styles.exemples}>
              {animations.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
            <Link href={`/chateaux/${chateau.slug}/${rubrique}#${ancre}`} className={styles.lienFiche}>
              {lien} <ArrowRight className="w-4 h-4" aria-hidden />
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
