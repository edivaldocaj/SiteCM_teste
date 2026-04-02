import type { Metadata } from 'next'
import { Playfair_Display, Source_Sans_3 } from 'next/font/google'
import '@/styles/globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppButton } from '@/components/ui/WhatsAppButton'
import { CookieConsent } from '@/components/ui/CookieConsent'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://cavalcantemelo.adv.br'),
  title: {
    default: 'Cavalcante & Melo | Sociedade de Advogados — Natal/RN',
    template: '%s | Cavalcante & Melo Advogados',
  },
  description:
    'Escritório de advocacia em Natal/RN especializado em Direito Digital, LGPD, Direito Civil, Consumidor, Imobiliário, Tributário, Licitações e Direito Penal. Atendimento humanizado e resultados.',
  keywords: [
    'advogado natal',
    'escritório advocacia natal rn',
    'advogado criminalista natal',
    'lgpd advogado',
    'direito digital natal',
    'advogado consumidor natal',
    'advogado imobiliário natal',
  ],
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: 'Cavalcante & Melo Sociedade de Advogados',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630 }],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: '/' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${playfair.variable} ${sourceSans.variable}`}>
      <head>
        {/* Schema.org - Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LegalService',
              name: 'Cavalcante & Melo Sociedade de Advogados',
              url: process.env.NEXT_PUBLIC_SITE_URL,
              logo: `${process.env.NEXT_PUBLIC_SITE_URL}/images/logo-cm.png`,
              description: 'Escritório de advocacia em Natal/RN.',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Rua Francisco Maia Sobrinho, 1950',
                addressLocality: 'Natal',
                addressRegion: 'RN',
                postalCode: '59062-250',
                addressCountry: 'BR',
              },
              geo: { '@type': 'GeoCoordinates', latitude: -5.8257, longitude: -35.2173 },
              areaServed: { '@type': 'State', name: 'Rio Grande do Norte' },
              priceRange: '$$',
            }),
          }}
        />
        {/* Google Analytics */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${process.env.NEXT_PUBLIC_GA_ID}');`,
              }}
            />
          </>
        )}
      </head>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
        <CookieConsent />
      </body>
    </html>
  )
}
