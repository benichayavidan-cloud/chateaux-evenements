/**
 * Le conseil de l'assistante séminaire, en tête d'une section de la fiche
 * château (maquette approuvée par le PO le 17/11/2026) : portrait détouré dont
 * la tête dépasse d'un cercle doré, et une bulle de message.
 * Server Component. Identité et portrait : data/assistante.
 */
import Image from "next/image";
import { ASSISTANTE } from "@/data/assistante";
import styles from "@/components/domaine/domaine.module.css";

export function ConseilAssistante({ texte }: { texte: string }) {
  return (
    <figure className={styles.conseil}>
      <Image
        src={ASSISTANTE.portrait}
        alt={`${ASSISTANTE.prenom}, ${ASSISTANTE.role}`}
        width={ASSISTANTE.largeur}
        height={ASSISTANTE.hauteur}
        className={styles.conseilPortrait}
        loading="lazy"
      />
      <div className={styles.conseilBulle}>
        <figcaption className={styles.conseilQui}>
          <strong>{ASSISTANTE.prenom}</strong>
          <span>{ASSISTANTE.role}</span>
        </figcaption>
        <blockquote>{texte}</blockquote>
      </div>
    </figure>
  );
}
