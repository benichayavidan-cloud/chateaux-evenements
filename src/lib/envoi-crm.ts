// Envoi d'une demande de devis au CRM, qui en fait un dossier « Nouvelle demande ».
// Un échec ne bloque jamais le prospect (sa demande est déjà en base), mais il
// doit se voir : l'admin est prévenu pour créer la fiche à la main.

const DELAI_MS = 10_000;
const LONGUEUR_REPONSE_MAX = 300;

export type ResultatCrm = { ok: true } | { ok: false; motif: string };

async function appelerCrm(url: string, secret: string, corps: unknown, envoyer: typeof fetch): Promise<ResultatCrm> {
  try {
    const reponse = await envoyer(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-lead-secret': secret },
      body: JSON.stringify(corps),
      signal: AbortSignal.timeout(DELAI_MS),
      // Une redirection enverrait le secret vers une autre adresse : elle compte comme un échec.
      redirect: 'manual',
    });
    if (reponse.ok) return { ok: true };
    const detail = await reponse.text().catch(() => '');
    return { ok: false, motif: `Le CRM a répondu ${reponse.status} : ${detail.slice(0, LONGUEUR_REPONSE_MAX)}` };
  } catch (erreur) {
    if (erreur instanceof Error && erreur.name === 'TimeoutError') {
      return { ok: false, motif: `Pas de réponse du CRM après ${DELAI_MS / 1000} s : la fiche a peut-être été créée quand même.` };
    }
    const message = erreur instanceof Error ? erreur.message : 'erreur inconnue';
    return { ok: false, motif: `CRM injoignable : ${message}` };
  }
}

export async function envoyerDemandeAuCrm(
  url: string | undefined,
  secret: string | undefined,
  corps: unknown,
  alerter: (motif: string) => Promise<boolean>,
  envoyer: typeof fetch = fetch,
): Promise<ResultatCrm> {
  const resultat: ResultatCrm = url && secret
    ? await appelerCrm(url, secret, corps, envoyer)
    : { ok: false, motif: 'CRM_LEADS_URL ou CRM_LEADS_SECRET absent de la configuration du site' };

  if (!resultat.ok) {
    console.error('Demande non transmise au CRM :', resultat.motif);
    // sendEmail ne lève pas d'exception : il répond false. Les deux cas sont à tracer.
    const partie = await alerter(resultat.motif).catch((erreur: unknown) => {
      console.error('Alerte CRM en erreur :', erreur instanceof Error ? erreur.message : erreur);
      return false;
    });
    if (!partie) console.error('Alerte CRM NON envoyée, demande sans fiche ni alerte. Motif :', resultat.motif);
  }
  return resultat;
}
