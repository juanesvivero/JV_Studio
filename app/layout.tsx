import type { Metadata, Viewport } from 'next';
import './globals.css';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'JV Studio | Páginas web y sistemas digitales',
  description:
    'Diseño sitios web, automatizaciones y estructuras digitales claras para que tu negocio transmita confianza, atienda mejor y consiga más clientes.',
  icons: {
    icon: '/jv-studio-logo.png',
    apple: '/jv-studio-logo.png',
  },
  openGraph: {
    title: 'JV Studio | Páginas web y sistemas digitales',
    description:
      'Diseño sitios web, automatizaciones y estructuras digitales claras para que tu negocio transmita confianza, atienda mejor y consiga más clientes.',
    type: 'website',
    images: [
      {
        url: '/jv-studio-logo.png',
        width: 900,
        height: 260,
        alt: 'JV Studio',
      },
    ],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
