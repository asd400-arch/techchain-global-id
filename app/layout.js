import './globals.css';
import FloatingQuoteButton from '../components/FloatingQuoteButton';

export const metadata = {
  title: 'Tech Chain Global | Technology Service Excellence',
  description: 'End-to-end technical services for Data Centers, Semiconductors, Consumer Electronics, and Healthcare across Asia-Pacific. 9 countries, 30+ locations since 2016.',
  keywords: 'tech chain global, data center operations, semiconductor automation, technical services, warehouse operations, IT asset management, Singapore, Asia Pacific, APAC',
  authors: [{ name: 'Tech Chain Global' }],
  creator: 'Tech Chain Global',
  publisher: 'Tech Chain Global',
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: { url: '/apple-touch-icon.png', sizes: '180x180' },
  },
  verification: {
    google: 'SpytYJj2p8LaygQPwn-NnSxkfZn-ddVvN2tOnij7MRU',
    other: { 'msvalidate.01': '27C8B2133CA2A466F1D3F5D7BD5C58E1' },
  },
  alternates: {
    canonical: 'https://www.techchainglobal.com',
    languages: {
      'en': 'https://www.techchainglobal.com',
      'id': 'https://www.techchainglobal.com/id',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.techchainglobal.com',
    siteName: 'Tech Chain Global',
    title: 'Tech Chain Global | Technology Service Excellence',
    description: 'End-to-end technical services across 9 APAC countries.',
    images: [{ url: 'https://www.techchainglobal.com/og-image.jpg', width: 1200, height: 630, alt: 'Tech Chain Global' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tech Chain Global | Technology Service Excellence',
    description: 'End-to-end technical services across 9 APAC countries.',
    images: ['https://www.techchainglobal.com/og-image.jpg'],
  },
  other: {
    'geo.region': 'SG',
    'geo.placename': 'Singapore',
    'geo.position': '1.3006;103.8393',
    'ICBM': '1.3006, 103.8393',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://www.techchainglobal.com/#organization',
      name: 'Tech Chain Global',
      url: 'https://www.techchainglobal.com',
      logo: 'https://www.techchainglobal.com/logo-512-dark.png',
      description: 'Technology services company providing comprehensive support across semiconductors, data centers, telecommunications, and healthcare in Asia-Pacific.',
      foundingDate: '2016',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '176 Orchard Road, The Centrepoint, #05-05A',
        addressLocality: 'Singapore',
        postalCode: '238843',
        addressCountry: 'SG',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+65-6990-7950',
        contactType: 'customer service',
        email: 'info@techchainglobal.com',
        availableLanguage: ['English', 'Indonesian', 'Korean', 'Japanese', 'Chinese'],
      },
      areaServed: [
        { '@type': 'Country', name: 'Singapore' },
        { '@type': 'Country', name: 'Indonesia' },
        { '@type': 'Country', name: 'South Korea' },
        { '@type': 'Country', name: 'Japan' },
        { '@type': 'Country', name: 'China' },
        { '@type': 'Country', name: 'Taiwan' },
        { '@type': 'Country', name: 'Malaysia' },
        { '@type': 'Country', name: 'Vietnam' },
        { '@type': 'Country', name: 'India' },
      ],
      sameAs: [],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://www.techchainglobal.com/#website',
      url: 'https://www.techchainglobal.com',
      name: 'Tech Chain Global',
      publisher: { '@id': 'https://www.techchainglobal.com/#organization' },
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" style={{ overflowX: 'hidden', width: '100%' }}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning style={{ margin: 0, padding: 0, overflowX: 'hidden', width: '100%', maxWidth: '100vw', position: 'relative' }}>
        {children}
        <FloatingQuoteButton />
      </body>
    </html>
  );
}
