import { Metadata } from 'next';
import { FESTIVAL_NAME } from './constants';

export const siteConfig = {
  name: FESTIVAL_NAME,
  description: 'Le festival entre amis.',
  url: 'https://www.lesclosurades.fr',
  ogImage: '/2025.webp',
  links: {
    twitter: 'https://twitter.com/closurades',
    instagram: 'https://instagram.com/lesclosurades',
    facebook: 'https://facebook.com/closurades',
  },
};

export function generateMetadata(): Metadata {
  return {
    title: {
      default: siteConfig.name,
      template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description,
    keywords: [
      'festival', 
      'musique', 
      'closurades', 
      'poitiers', 
      'concerts', 
      'festivals france',
      'festival été 2025',
      'festival musique poitiers'
    ],
    authors: [{ name: 'Les Closurades Festival' }],
    creator: 'Les Closurades Festival',
    openGraph: {
      type: 'website',
      locale: 'fr_FR',
      url: siteConfig.url,
      title: siteConfig.name,
      description: siteConfig.description,
      siteName: siteConfig.name,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: siteConfig.name,
      description: siteConfig.description,
      images: [siteConfig.ogImage],
      creator: '@closurades',
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
    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon-16x16.png',
      apple: '/apple-touch-icon.png',
    },
    manifest: '/site.webmanifest',
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: '/',
      languages: {
        'fr-FR': '/',
      },
    },
  };
}