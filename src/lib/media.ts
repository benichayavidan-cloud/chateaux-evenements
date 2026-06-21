// src/lib/media.ts — SOURCE UNIQUE des URLs média (anti-dispersion).
//
// Trois tiers :
//  - brand & assets statiques  → /public            (logo local, favicons : conventions Next)
//  - photos de contenu         → /public/images     (éditorial, blog, services)  → media()
//  - galeries châteaux & vidéo → Supabase Storage    (source de vérité)           → storage() / chateauImage()
//
// Changer de backend (local → Supabase → CDN media.selectchateaux.com) = une seule ligne ici.

const SUPABASE_STORAGE =
  "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images";

/** Asset servi depuis le bucket Supabase (galeries châteaux, vidéo, logo). */
export const storage = (path: string): string =>
  `${SUPABASE_STORAGE}/${path.replace(/^\/+/, "")}`;

/** Image de contenu servie depuis /public/images (éditorial, blog, services). */
export const media = (path: string): string => `/images/${path.replace(/^\/+/, "")}`;

/** Logo Select Châteaux (header) — servi depuis Supabase. */
export const LOGO_URL = storage("logo.png");

/** Mapping dossier « métier » → dossier bucket Supabase (galeries châteaux). */
const CHATEAU_FOLDER: Record<string, string> = {
  "Abbaye des Veaux de cernay": "chevreuse",
  "Chateau de Montvillargene": "montvillargene",
  "Domaine Reine Margot": "hauts-de-seine",
  "Chateau Mont Royal": "mont-royal",
};

/**
 * URL d'une photo de galerie château.
 * Toujours Supabase (source de vérité) — corrige l'ancien fallback dev cassé
 * (route /api/images/preview et dossier IMAGES_BASE inexistants).
 */
export const chateauImage = (folder: string, filename: string): string =>
  storage(`${CHATEAU_FOLDER[folder] ?? folder}/${encodeURIComponent(filename)}`);
