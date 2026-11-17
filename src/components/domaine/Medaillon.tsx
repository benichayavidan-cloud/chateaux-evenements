/**
 * Médaillon doré en relief (style approuvé par le PO le 17/11/2026) : une
 * petite pièce bombée, icône blanche. Sert aux badges, aux étiquettes de
 * section, aux blocs Accès et aux chiffres clés de la fiche château.
 * Décoratif : le texte voisin porte le sens.
 */
import type { LucideIcon } from "lucide-react";
import styles from "@/components/domaine/domaine.module.css";

interface MedaillonProps {
  icone: LucideIcon;
  /** `petit` (26 px) dans une pastille de texte, `moyen` (34 px) seul devant un titre ou un chiffre. */
  taille?: "petit" | "moyen";
}

export function Medaillon({ icone: Icone, taille = "moyen" }: MedaillonProps) {
  return (
    <span aria-hidden className={`${styles.medaillon} ${taille === "petit" ? styles.medaillonPetit : ""}`}>
      <Icone />
    </span>
  );
}
