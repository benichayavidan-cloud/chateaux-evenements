/**
 * « Nos soirées » et « Nos animations team building » sur l'accueil
 * (18/11/2026). Server Component. Mêmes mots que les onglets du menu ;
 * photos prises dans les châteaux de la collection ; texte propre à
 * l'accueil (pas une reprise des deux pages).
 */
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import styles from "@/components/home/accueil.module.css";

const BLOCS = [
  {
    titre: "Nos soirées",
    texte:
      "Dîner de gala, cocktail au jardin ou soirée à thème : notre équipe met en scène la soirée de votre séminaire dans le château que vous avez choisi. Vos participants regagnent ensuite leur chambre à pied.",
    exemples: ["Dîner de gala", "Soirée à thème", "Cocktail"],
    photo: "/images/seminaire-abbaye-vallee-de-chevreuse-diner-gala-grande-salle-voutes.webp",
    alt: "Dîner de gala dressé sous les voûtes de l'abbaye, l'un des 4 châteaux de la collection",
    href: "/seminaires-soirees-entreprise",
    lien: "Découvrir nos soirées",
  },
  {
    titre: "Nos animations team building",
    texte:
      "Rallye dans le parc, escape game dans les salons, olympiades : des animations organisées par notre équipe pour fédérer vos collaborateurs entre deux sessions de travail, sans quitter le domaine.",
    exemples: ["Rallye découverte", "Escape game", "Olympiades"],
    photo: "/images/seminaire-chateau-foret-chantilly-activites-team-building.webp",
    alt: "Le boulodrome sous les arbres du parc d'un château de la collection, prêt pour un tournoi d'équipes",
    href: "/team-building-chateau",
    lien: "Découvrir nos animations team building",
  },
];

export function SoireesEtAnimations() {
  return (
    <div className={styles.duo}>
      {BLOCS.map((b) => (
        <article key={b.href} className={styles.bloc}>
          <div className={styles.blocPhoto}>
            <Image src={b.photo} alt={b.alt} fill sizes="(min-width: 768px) 50vw, 100vw" style={{ objectFit: "cover" }} />
          </div>
          <div className={styles.blocTexte}>
            <h3 className={styles.blocTitre}>{b.titre}</h3>
            <p>{b.texte}</p>
            <ul className={styles.exemples}>
              {b.exemples.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
            <Link href={b.href} className={styles.lienFiche}>
              {b.lien} <ArrowRight className="w-4 h-4" aria-hidden />
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
