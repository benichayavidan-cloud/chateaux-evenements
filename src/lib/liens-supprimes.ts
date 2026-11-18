/**
 * Retire les liens qui mènent à un article supprimé, en gardant leur texte.
 * Sans cela, un article gardé enverrait son lecteur (et Google) vers une 404.
 * Fonction pure : la liste des articles supprimés est passée par l'appelant.
 */
const LIEN_BLOG = /<a\b[^>]*href=(["'])(?:https?:\/\/(?:www\.)?selectchateaux\.com)?\/blog\/([a-z0-9-]+)\/?(?:[?#][^"']*)?\1[^>]*>([\s\S]*?)<\/a>/g;

export function retirerLiensSupprimes(html: string, estSupprime: (slug: string) => boolean): string {
  return html.replace(LIEN_BLOG, (lien: string, _q: string, slug: string, texte: string) => (estSupprime(slug) ? texte : lien));
}
