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
    <aside className={styles.conseil} aria-label={`Le conseil de ${ASSISTANTE.prenom}, ${ASSISTANTE.role}`}>
      {/* alt vide : le prénom et le titre sont écrits juste à côté, un lecteur d'écran les lirait deux fois. */}
      <Image src={ASSISTANTE.portrait} alt="" width={ASSISTANTE.largeur} height={ASSISTANTE.hauteur} className={styles.conseilPortrait} loading="lazy" />
      <div className={styles.conseilBulle}>
        <p className={styles.conseilQui}>
          <strong>{ASSISTANTE.prenom}</strong>
          <span>{ASSISTANTE.role}</span>
        </p>
        <p className={styles.conseilTexte}>{texte}</p>
      </div>
    </aside>
  );
}
