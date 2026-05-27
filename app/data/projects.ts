export type ProjectAccent = 'rose' | 'gold' | 'blue' | 'green' | 'amber';

export interface Project {
  title: string;
  category: string;
  description: string;
  result: string;
  highlights: string[];
  href: string;
  accent: ProjectAccent;
  type: string;
  logo: string;
  logoAlt?: string;
}

export const projects: Project[] = [
  {
    title: 'Click Line Security',
    category: 'Seguridad',
    description:
      'Sitio corporativo para una empresa de seguridad electrónica y monitoreo, diseñado para presentar servicios críticos con una imagen sólida y confiable.',
    result: 'Arquitectura clara para CCTV, alarmas, GPS y seguridad residencial/comercial.',
    highlights: ['Confianza visual', 'Servicios claros', 'CTA directo'],
    href: 'https://clickline.mobi/security/index.html',
    accent: 'rose',
    type: 'security',
    logo: '/security_logo_transparent-mobile.webp',
  },
  {
    title: 'Click Line Solutions / RunFood App',
    category: 'Soluciones / POS',
    description:
      'Plataforma para mostrar soluciones digitales y RunFood App, un POS orientado a restaurantes y negocios de comida.',
    result: 'Presentación enfocada en ventas, inventario, pedidos, facturación y reportes.',
    highlights: ['Producto SaaS', 'Automatización', 'Reportes'],
    href: 'https://clickline.mobi/solutions/index.html',
    accent: 'gold',
    type: 'solutions',
    logo: '/solutions_logo_transparent.webp',
    logoAlt: '/RunFoodLogo.png',
  },
  {
    title: 'Portafolio Web — Amelia Padilla',
    category: 'Portafolio / Web',
    description:
      'Landing page minimalista y optimizada para una creadora de contenido, enfocada en presentar su trabajo, métricas y colaboraciones de forma clara y profesional.',
    result: 'Portafolio optimizado para rendimiento y conversión mobile-first.',
    highlights: ['Diseño Minimalista', 'Analíticas Integradas', 'Mobile First'],
    href: 'https://portafolio-ame-padilla.vercel.app/',
    accent: 'blue',
    type: 'portfolio',
    logo: '/Portafolio_Amelia_Padilla.png',
  },
  {
    title: 'NatuPet',
    category: 'Marca / Web',
    description:
      'Sitio web para una marca enfocada en bienestar animal, con una presencia visual limpia, natural y cercana.',
    result: 'Identidad digital clara para presentar la marca y conectar con clientes desde el primer vistazo.',
    highlights: ['Marca natural', 'Diseño limpio', 'Presencia web'],
    href: 'https://natu-pet.vercel.app/#/',
    accent: 'green',
    type: 'natupet',
    logo: '/NatuPet.png',
  },
  {
    title: 'La Mila',
    category: 'Restaurante / Web',
    description:
      'Presencia digital para un negocio gastronómico, diseñada para reforzar marca, confianza y recordación visual.',
    result: 'Sitio directo y visual para comunicar la identidad del restaurante y facilitar el contacto.',
    highlights: ['Identidad gastronómica', 'Marca memorable', 'Acceso rápido'],
    href: 'https://lamila.vercel.app/',
    accent: 'amber',
    type: 'lamila',
    logo: '/LaMila.png',
  },
];
