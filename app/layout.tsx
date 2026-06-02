import type { Metadata, Viewport } from 'next';
import './globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://jvstudio.ec';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'JV Studio | Páginas web y sistemas digitales',
  description:
    'Diseño sitios web, automatizaciones y estructuras digitales claras para que tu negocio transmita confianza, atienda mejor y consiga más clientes.',
  alternates: {
    canonical: '/',
  },
  keywords: [
    'diseño web Ambato',
    'páginas web Ecuador',
    'automatización de negocios',
    'presencia digital',
    'JV Studio',
  ],
  authors: [{ name: 'Juan Esteban Vivero' }],
  creator: 'Juan Esteban Vivero',
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    title: 'JV Studio | Páginas web y sistemas digitales',
    description:
      'Diseño sitios web, automatizaciones y estructuras digitales claras para que tu negocio transmita confianza, atienda mejor y consiga más clientes.',
    type: 'website',
    locale: 'es_EC',
    url: '/',
    siteName: 'JV Studio',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'JV Studio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JV Studio | Páginas web y sistemas digitales',
    description:
      'Diseño sitios web, automatizaciones y estructuras digitales claras para negocios modernos.',
    images: ['/opengraph-image'],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'JV Studio',
  url: 'https://jvstudio.ec/',
  description: 'Diseño de sitios web, automatizaciones y estructuras digitales para negocios.',
  founder: { '@type': 'Person', name: 'Juan Esteban Vivero' },
  areaServed: 'Ecuador',
  sameAs: [
    'https://instagram.com/juanesvivero',
    'https://github.com/juanesvivero',
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
