import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Select Châteaux - Séminaires d\'Exception',
    short_name: 'Select Châteaux',
    description: 'Châteaux d\'exception pour séminaires d\'entreprise en Île-de-France. Devis gratuit en 24h.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#a37e2c',
    icons: [
      {
        src: '/brand/favicon-48.png',
        sizes: '48x48',
        type: 'image/png',
      },
      {
        src: '/brand/icon.png',
        sizes: '192x192',
        type: 'image/png',
      },
    ],
  }
}
