export interface Service {
  tag: string;
  title: string;
  text: string;
  features: string[];
  cta: string;
  projectSelectType: string;
  icon: 'browser' | 'search' | 'flow' | 'chart';
}

export const services: Service[] = [
  {
    tag: '01',
    title: 'Páginas Web',
    text: 'Landing pages, páginas corporativas, menús digitales y portfolios.',
    features: [
      'Diseño responsive',
      'Integración con WhatsApp',
      'Formularios',
      'SEO básico',
      'Estructura clara de contenido',
    ],
    cta: 'Estructurar mi web',
    projectSelectType: 'Páginas Web',
    icon: 'browser',
  },
  {
    tag: '02',
    title: 'Presencia Digital',
    text: 'Google Maps, WhatsApp Business, Instagram y estructura digital.',
    features: [
      'Google Maps',
      'Instagram',
      'WhatsApp Business',
      'Links',
      'Formularios',
      'Revisión de contenido',
    ],
    cta: 'Iniciar diagnóstico',
    projectSelectType: 'Presencia Digital',
    icon: 'search',
  },
  {
    tag: '03',
    title: 'Automatización',
    text: 'Formularios, bases de datos y flujos automáticos.',
    features: [
      'Formularios automáticos',
      'Bases de datos',
      'Seguimiento de clientes',
      'Registro de leads',
      'Flujos de atención',
    ],
    cta: 'Automatizar mi negocio',
    projectSelectType: 'Automatización',
    icon: 'flow',
  },
  {
    tag: '04',
    title: 'Dashboards',
    text: 'Reportes visuales y métricas para tomar mejores decisiones.',
    features: [
      'Métricas de ventas',
      'Reportes visuales',
      'Seguimiento de clientes',
      'Indicadores clave',
      'Control de resultados',
    ],
    cta: 'Ver cómo funciona',
    projectSelectType: 'Dashboards',
    icon: 'chart',
  },
];
