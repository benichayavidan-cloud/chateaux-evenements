/**
 * « Quel château pour quel séminaire ? » — les 4 châteaux de la collection
 * côte à côte (18/11/2026). Server Component.
 *
 * Les chiffres sont lus dans data/chateaux.ts (capacité, chambres, salles,
 * trajet) : un seul endroit à corriger. Seul « Idéal pour » est écrit ici,
 * à partir de faits déjà publiés sur les fiches.
 */
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import styles from "@/components/home/accueil.module.css";
import type { Chateau } from "@/types";

/** Nom court (celui du menu) et usage conseillé, par château. */
const PROFILS: Record<string, { nom: string; idealPour: string }> = {
  "manoir-anglo-normand-chantilly": { nom: "Manoir anglo-normand", idealPour: "Les conventions et les grands groupes" },
  "hotel-historique-seminaire-paris-92": { nom: "Domaine historique", idealPour: "Un séminaire à Paris, en métro" },
  "abbaye-millenaire-vallee-chevreuse": { nom: "Abbaye cistercienne", idealPour: "Un séminaire au vert, autour d'un lac" },
  "palais-royal-foret-chantilly": { nom: "Château en forêt", idealPour: "Des équipes venues par Roissy" },
};

interface ComparatifChateauxProps {
  chateaux: Chateau[];
}

export function ComparatifChateaux({ chateaux }: ComparatifChateauxProps) {
  const lignes = chateaux.filter((c) => PROFILS[c.slug]);
  if (lignes.length === 0) return null;

  return (
    <table className={styles.comparatif}>
      <caption>Comparatif des {lignes.length} châteaux de la collection pour un séminaire d&apos;entreprise</caption>
      <thead>
        <tr>
          <th scope="col">Château</th>
          <th scope="col">Participants</th>
          <th scope="col">Chambres</th>
          <th scope="col">Salles de réunion</th>
          <th scope="col">Accès</th>
          <th scope="col">Idéal pour</th>
          <th scope="col" aria-label="Fiche du château" />
        </tr>
      </thead>
      <tbody>
        {lignes.map((c) => (
          <tr key={c.slug}>
            <th scope="row">
              <Link href={`/chateaux/${c.slug}`} className={styles.nomChateau}>
                {PROFILS[c.slug].nom}
                <span className={styles.lieuChateau}>{c.region}</span>
              </Link>
            </th>
            <td data-libelle="Participants"><span className={styles.chiffre}>jusqu&apos;à {c.capacite.max}</span></td>
            <td data-libelle="Chambres"><span className={styles.chiffre}>{c.roomsTotal}</span></td>
            <td data-libelle="Salles de réunion"><span className={styles.chiffre}>{c.meetingRooms}</span></td>
            <td data-libelle="Accès">{c.trajet}</td>
            <td data-libelle="Idéal pour">{PROFILS[c.slug].idealPour}</td>
            <td data-libelle="">
              <Link href={`/chateaux/${c.slug}`} className={styles.lienFiche}>
                Voir ce château <ArrowRight className="w-4 h-4" aria-hidden />
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
