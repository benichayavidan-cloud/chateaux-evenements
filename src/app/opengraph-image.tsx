import { ImageResponse } from 'next/og'

// Route segment config
export const runtime = 'edge'

// Image metadata
export const alt = 'SelectChateaux.com - Événements d\'Entreprise d\'Exception'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

// Image generation
export default async function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: 'linear-gradient(135deg, #f5f5f5 0%, #ffffff 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            marginBottom: '40px',
          }}
        >
          <span
            style={{
              fontSize: 120,
              fontWeight: 600,
              color: '#1a1a1a',
            }}
          >
            Select
          </span>
          <span
            style={{
              fontSize: 120,
              fontWeight: 300,
              fontStyle: 'italic',
              color: '#a37e2c',
            }}
          >
            Chateaux
          </span>
        </div>
        <div
          style={{
            fontSize: 36,
            color: '#666',
            textAlign: 'center',
            maxWidth: '900px',
          }}
        >
          Événements d'Entreprise d'Exception
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
