/**
 * « Dans quel château organiser votre team building ? » — les 4 châteaux de
 * la collection et les animations que l'équipe y organise (18/11/2026).
 * Server Component, utilisé sur /team-building-chateau à la place des blocs
 * qui renvoyaient vers l'annuaire.
 *
 * Les animations sont lues dans la section « team-building » de la rubrique
 * Activités de chaque château (data/rubriques) : un seul endroit à corriger.
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

interface ChateauxPourTeamBuildingProps {
  chateaux: Chateau[];
}

export function ChateauxPourTeamBuilding({ chateaux }: ChateauxPourTeamBuildingProps) {
  const cartes = chateaux
    .map((c) => ({
      chateau: c,
      animations: RUBRIQUES_PAR_CHATEAU[c.slug]?.activites?.sections?.find((s) => s.ancre === "team-building")?.blocs.map((b) => b.titre) ?? [],
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
              {chateau.region} · jusqu&apos;à {chateau.capacite.max} participants
            </p>
            <ul className={styles.exemples}>
              {animations.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
            <Link href={`/chateaux/${chateau.slug}/activites#team-building`} className={styles.lienFiche}>
              Le team building dans ce château <ArrowRight className="w-4 h-4" aria-hidden />
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
