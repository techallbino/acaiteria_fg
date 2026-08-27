import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'F&G Açaí | Açaiteria & Cia',
    short_name: 'F&G Açaí',
    description: 'Monte seu açaí e peça pelo WhatsApp.',
    start_url: '/',
    display: 'standalone',
    background_color: '#190916',
    theme_color: '#190916',
    orientation: 'portrait',
    icons: [
      {
        src: '/images/logo.webp',
        sizes: '512x512',
        type: 'image/webp',
        purpose: 'any',
      },
      {
        src: '/images/logo.webp',
        sizes: '512x512',
        type: 'image/webp',
        purpose: 'maskable',
      },
    ],
  }
}
