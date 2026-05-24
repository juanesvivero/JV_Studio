import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'JV Studio | Páginas web y sistemas digitales',
  description:
    'Diseño sitios web, automatizaciones y estructuras digitales claras para que tu negocio transmita confianza, atienda mejor y consiga más clientes.',
  openGraph: {
    title: 'JV Studio | Páginas web y sistemas digitales',
    description:
      'Diseño sitios web, automatizaciones y estructuras digitales claras para que tu negocio transmita confianza, atienda mejor y consiga más clientes.',
    type: 'website',
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
