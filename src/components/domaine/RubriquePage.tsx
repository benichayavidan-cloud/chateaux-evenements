/**
 * Gabarit unique des rubriques d'un domaine (salles, chambres, accès…).
 * Server Component, mobile d'abord. Le contenu vient des données du lieu ;
 * le gabarit n'écrit aucun texte propre à un château.
 */
import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { theme } from "@/design-system/tokens";
import styles from "@/components/domaine/domaine.module.css";
import DevisFormMini from "@/components/DevisFormMini";
import { RubriquesNav } from "@/components/domaine/RubriquesNav";
import { LIBELLES, rubrique as lireRubrique, urlRubrique } from "@/lib/rubriques";
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
  const [principale, ...autresPhotos] = r.photos;
  const autres = rubriques.filter((x) => x !== id);

  return (
    <article className={`${styles.domaine} mx-auto w-full max-w-[1200px] px-4 pb-16 pt-4 md:px-8 md:pt-6`}>
      {/* Fil d'Ariane visible (balisé en JSON-LD par la page) */}
      <nav aria-label="Fil d'Ariane" className="mb-3 text-xs md:text-sm" style={{ color: theme.colors.neutral.gray600 }}>
        <ol className="flex flex-wrap items-center gap-1">
          <li><Link href="/" className="hover:underline">Accueil</Link> <span aria-hidden>›</span></li>
          <li><Link href="/chateaux" className="hover:underline">Nos châteaux</Link> <span aria-hidden>›</span></li>
          <li><Link href={`/chateaux/${chateau.slug}`} className="hover:underline">{chateau.nom}</Link> <span aria-hidden>›</span></li>
          <li aria-current="page">{r.titre}</li>
        </ol>
      </nav>

      <p className="mb-2 inline-flex items-center gap-1.5 text-sm font-semibold" style={{ color: theme.colors.primary.bronze }}>
        <MapPin className="h-4 w-4" aria-hidden /> {chateau.region}
      </p>

      <h1
        className="mb-3 text-2xl font-semibold md:text-3xl lg:text-4xl"
        style={{ fontFamily: theme.typography.fonts.heading, color: theme.colors.neutral.gray900, lineHeight: 1.2 }}
      >
        {r.titre}
      </h1>
      <p className="mb-4 max-w-3xl text-base leading-relaxed md:text-lg" style={{ color: theme.colors.neutral.gray700 }}>
        {r.intro}
      </p>

      <RubriquesNav slug={chateau.slug} rubriques={rubriques} active={id} />

      {principale && (
        <figure className="mt-6">
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl md:aspect-[21/9]">
            <Image src={principale.src} alt={principale.legende} fill priority sizes="(min-width: 1200px) 1200px, 100vw" className="object-cover" />
          </div>
          <figcaption className="mt-2 text-sm" style={{ color: theme.colors.neutral.gray600 }}>{principale.legende}</figcaption>
        </figure>
      )}

      {r.faits.length > 0 && (
        <dl className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {r.faits.map((f) => (
            <div key={f.label} className="rounded-xl p-4" style={{ background: theme.colors.neutral.gray50, border: `1px solid ${theme.colors.neutral.gray200}` }}>
              <dt className="text-xs uppercase tracking-wide" style={{ color: theme.colors.neutral.gray600 }}>{f.label}</dt>
              <dd className="mt-1 text-xl font-semibold md:text-2xl" style={{ color: theme.colors.primary.bronzeDark }}>{f.valeur}</dd>
            </div>
          ))}
        </dl>
      )}

      {r.salles && r.salles.length > 0 && (
        <section className="mt-10" aria-labelledby="tableau-salles">
          <h2 id="tableau-salles" className="mb-4 text-xl font-semibold md:text-2xl" style={{ fontFamily: theme.typography.fonts.heading }}>
            Capacités salle par salle
          </h2>
          <TableauSalles salles={r.salles} />
          <p className="mt-2 text-xs" style={{ color: theme.colors.neutral.gray600 }}>
            « – » : disposition non proposée ou non communiquée. Faites défiler le tableau pour voir toutes les dispositions.
          </p>
        </section>
      )}

      <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:gap-12">
        {r.blocs.map((b) => (
          <section key={b.titre}>
            <h2 className="mb-2 text-lg font-semibold md:text-xl" style={{ fontFamily: theme.typography.fonts.heading, color: theme.colors.neutral.gray900 }}>
              {b.titre}
            </h2>
            <p className="leading-relaxed" style={{ color: theme.colors.neutral.gray700 }}>{b.texte}</p>
          </section>
        ))}
      </div>

      {autresPhotos.length > 0 && (
        <section className="mt-12" aria-label="Photos">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {autresPhotos.map((p) => (
              <figure key={p.src}>
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
                  <Image src={p.src} alt={p.legende} fill loading="lazy" sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw" className="object-cover" />
                </div>
                <figcaption className="mt-2 text-sm" style={{ color: theme.colors.neutral.gray600 }}>{p.legende}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      {autres.length > 0 && (
        <section className="mt-14" aria-labelledby="autres-rubriques">
          <h2 id="autres-rubriques" className="mb-4 text-xl font-semibold md:text-2xl" style={{ fontFamily: theme.typography.fonts.heading }}>
            Découvrir aussi le domaine
          </h2>
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {autres.map((x) => {
              const autre = lireRubrique(chateau.slug, x);
              return (
                <li key={x}>
                  <Link
                    href={urlRubrique(chateau.slug, x)}
                    className="block h-full rounded-xl p-4 transition-shadow hover:shadow-md"
                    style={{ border: `1px solid ${theme.colors.neutral.gray200}` }}
                  >
                    <span className="block font-semibold" style={{ color: theme.colors.primary.bronze }}>{autre?.titre ?? LIBELLES[x]} →</span>
                    {autre && <span className="mt-1 block text-sm" style={{ color: theme.colors.neutral.gray600 }}>{autre.resume}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      <section id="devis-express" className="mt-14 scroll-mt-24">
        <h2 className="mb-4 text-xl font-semibold md:text-2xl" style={{ fontFamily: theme.typography.fonts.heading }}>
          Demander une proposition
        </h2>
        <DevisFormMini chateauId={chateau.id} chateauNom={chateau.nom} sourceLabel={`${chateau.nom} — ${r.titre}`} />
      </section>
    </article>
  );
}
