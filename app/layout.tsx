import type { Metadata, Viewport } from 'next'
import '@fontsource/poppins/400.css'
import '@fontsource/poppins/500.css'
import '@fontsource/poppins/600.css'
import '@fontsource/poppins/700.css'
import '@fontsource/poppins/800.css'
import './globals.css'
import { LaunchSplash } from '../components/launch-splash'

export const metadata: Metadata = {
  title: 'F&G Açaí | Açaiteria & Cia — Carapicuíba',
  description: 'Monte seu açaí, escolha seus complementos e peça pelo WhatsApp em Carapicuíba.',
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'F&G Açaí',
  },
  icons: {
    icon: '/images/logo.webp',
    apple: '/images/logo.webp',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: '#190916',
  viewportFit: 'cover',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className="bg-background">
      <body>
        <LaunchSplash />
        {children}
      </body>
    </html>
  )
}
