import { Suspense } from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import AnalyticsProvider from '@/components/AnalyticsProvider'
import MetaPixel from '@/components/MetaPixel'
import { organizationSchema, howToSchema } from '@/lib/structured-data'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'MindTalk — 90-Day Mental Health Recovery by Cadabams',
    template: '%s | MindTalk by Cadabams',
  },
  description:
    'A structured 90-day CBT recovery journey with a licensed psychologist. 12 sessions, daily exercises, breathwork and journaling. ₹7,799. Built by Cadabams — 30 years of clinical expertise.',
  metadataBase: new URL('https://cadabamsmindtalk.com'),
  keywords: [
    'online therapy India',
    'CBT therapy online',
    'mental health programme India',
    'anxiety treatment online India',
    'depression therapy online',
    'burnout recovery programme',
    'relationship counselling online',
    'Cadabams MindTalk',
    'psychologist online India',
    '90 day mental health programme',
  ],
  authors: [{ name: 'Cadabams Group', url: 'https://cadabams.com' }],
  creator: 'Cadabams Group',
  publisher: 'Cadabams Group',
  openGraph: {
    siteName: 'MindTalk by Cadabams',
    type: 'website',
    locale: 'en_IN',
    url: 'https://cadabamsmindtalk.com',
    title: 'MindTalk — 90-Day Mental Health Recovery by Cadabams',
    description:
      'A structured 90-day CBT recovery journey with a licensed psychologist. 12 sessions. ₹7,799. Built by Cadabams — 30 years of clinical expertise.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MindTalk — 90-Day Mental Health Recovery by Cadabams',
    description: '12 psychologist-led CBT sessions. Daily exercises. ₹7,799. Built by Cadabams.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'add-your-google-search-console-verification-token-here',
  },
  alternates: {
    canonical: 'https://cadabamsmindtalk.com',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID

  return (
    <html lang="en">
      <head>
        {GTM_ID && (
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`,
            }}
          />
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema()) }}
        />
      </head>
      <body className={`${inter.className} bg-white text-gray-900 antialiased`}>
        {GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}
        <Suspense fallback={null}>
          <AnalyticsProvider />
        </Suspense>
        <MetaPixel />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
