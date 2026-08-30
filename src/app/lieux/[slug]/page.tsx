/**
 * FICHE LIEU — Server Component.
 *
 * Rendu 100 % serveur, sans JavaScript requis : ces pages visent autant Google
 * que les moteurs de réponse IA, qui n'exécutent pas le JS. Toutes les données
 * viennent du CRM (src/data/venues.ts, généré) — aucune prose inventée.
 */

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { venues, getVenueBySlug, getVenuesByDepartment } from "@/data/venues";
import { StructuredData } from "@/components/StructuredData";
import { metaDescription } from "@/lib/seo";
import { VenueView } from "./VenueView";

export const dynamicParams = false;

export function generateStaticParams() {
  return venues.map(v => ({ slug: v.slug }));
}

type Props = { params: Promise<{ slug: string }> };

/** Landing départementale correspondante — cible du lien montant. */
const DEPARTMENT_LANDING: Record<string, string | undefined> = {
  "78": "/seminaire-chateau-yvelines-78",
  "60": "/seminaire-chateau-oise-60",
  "92": "/seminaire-chateau-hauts-de-seine-92",
  "91": "/seminaire-chateau-essonne-91",
  "77": "/seminaire-chateau-seine-et-marne-77",
  "95": "/seminaire-chateau-val-d-oise-95",
};

/** Le bloc « --- Transports --- » du CRM n'a rien à faire dans une description schema.org. */
function descriptionPropre(raw: string, max = 600) {
  const corps = raw.split(/---\s*Transports\s*---/i)[0].trim().replace(/\s+/g, " ");
  return corps.length <= max ? corps : corps.slice(0, corps.lastIndexOf(" ", max - 1)) + "…";
}

function titleFor(v: NonNullable<ReturnType<typeof getVenueBySlug>>) {
  const where = v.ville ? `${v.ville} (${v.departementCode})` : `${v.departementCode}`;
  return `${v.nom} — Séminaire à ${where}, ${v.capacite} pers.`;
}

/**
 * Bloc « réponse directe » : 40 à 60 mots, en tête de page, construits sur des
 * faits chiffrés. C'est la portion que les modèles de langage extraient et citent.
 */
function reponseDirecte(v: NonNullable<ReturnType<typeof getVenueBySlug>>) {
  const parts = [
    `${v.nom} accueille les séminaires d'entreprise jusqu'à ${v.capacite} personnes`,
    v.ville ? `à ${v.ville}` : null,
    v.departement ? `(${v.departement}, ${v.departementCode})` : null,
  ].filter(Boolean).join(" ");
  const equip = [
    v.chambres ? `${v.chambres} chambres` : null,
    v.sallesReunion ? `${v.sallesReunion} salles de réunion` : null,
    v.parking ? `${v.parking} places de parking` : null,
  ].filter(Boolean);
  return `${parts}. ${equip.length ? `Le lieu dispose de ${equip.join(", ")}. ` : ""}Devis sous 48 h via Select Châteaux.`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const v = getVenueBySlug(slug);
  if (!v) return { title: "Lieu introuvable" };

  const url = `https://www.selectchateaux.com/lieux/${v.slug}`;
  return {
    title: titleFor(v),
    description: metaDescription(reponseDirecte(v)),
    metadataBase: new URL("https://www.selectchateaux.com"),
    alternates: { canonical: url },
    robots: { index: true, follow: true },
    openGraph: {
      type: "website",
      title: titleFor(v),
      description: reponseDirecte(v),
      url,
      siteName: "Select Châteaux",
      locale: "fr_FR",
      images: v.photos[0] ? [{ url: v.photos[0].url, width: 1200, height: 630, alt: v.nom }] : [],
    },
  };
}

export default async function LieuPage({ params }: Props) {
  const { slug } = await params;
  const v = getVenueBySlug(slug);
  if (!v) notFound();

  const voisins = getVenuesByDepartment(v.departementCode).filter(x => x.slug !== v.slug).slice(0, 6);
  const url = `https://www.selectchateaux.com/lieux/${v.slug}`;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "EventVenue",
        "@id": `${url}#venue`,
        name: v.nom,
        description: descriptionPropre(v.description),
        url,
        maximumAttendeeCapacity: v.capacite,
        ...(v.photos.length ? { image: v.photos.slice(0, 6).map(p => p.url) } : {}),
        address: {
          "@type": "PostalAddress",
          ...(v.adresse ? { streetAddress: v.adresse } : {}),
          ...(v.ville ? { addressLocality: v.ville } : {}),
          ...(v.codePostal ? { postalCode: v.codePostal } : {}),
          ...(v.region ? { addressRegion: v.region } : {}),
          addressCountry: "FR",
        },
        ...(v.latitude != null && v.longitude != null
          ? { geo: { "@type": "GeoCoordinates", latitude: v.latitude, longitude: v.longitude } }
          : {}),
        ...(v.equipements.length
          ? { amenityFeature: v.equipements.map(a => ({ "@type": "LocationFeatureSpecification", name: a, value: true })) }
          : {}),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: "https://www.selectchateaux.com/" },
          { "@type": "ListItem", position: 2, name: "Lieux de séminaire", item: "https://www.selectchateaux.com/lieux" },
          { "@type": "ListItem", position: 3, name: v.nom, item: url },
        ],
      },
    ],
  };

  return (
    <>
      <StructuredData data={schema} />
      <VenueView
        venue={v}
        voisins={voisins}
        landing={DEPARTMENT_LANDING[v.departementCode]}
        reponse={reponseDirecte(v)}
      />
    </>
  );
}
