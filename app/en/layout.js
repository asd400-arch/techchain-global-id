import { PUBLIC_SITE_URL } from '../../lib/siteUrl';

export const metadata = {
  title: 'Tech Chain Global Indonesia | English',
  description:
    'Technology services and TCG Express B2B tech delivery in Indonesia. English overview — same Indonesia app and regional operations.',
  alternates: {
    canonical: `${PUBLIC_SITE_URL}/en`,
    languages: {
      en: `${PUBLIC_SITE_URL}/en`,
      id: PUBLIC_SITE_URL,
    },
  },
  openGraph: {
    title: 'Tech Chain Global Indonesia | English',
    description: 'Technology services and B2B delivery in Indonesia.',
    url: `${PUBLIC_SITE_URL}/en`,
    siteName: 'Tech Chain Global',
    locale: 'en_US',
    images: [{ url: `${PUBLIC_SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: 'Tech Chain Global' }],
  },
};

export default function EnLayout({ children }) {
  return children;
}
