'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const services = [
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

const process = [
  ['Diagnóstico', 'Veo dónde estás parado.'],
  ['Estrategia', 'Definimos qué tiene más sentido.'],
  ['Diseño', 'Construyo la estructura visual.'],
  ['Implementación', 'Lo conecto todo.'],
  ['Entrega', 'Te explico cómo usarlo.'],
  ['Soporte', 'No desaparezco después de entregar.'],
];

const projects = [
  {
    title: 'Click Line Security',
    category: 'Seguridad',
    description: 'Sitio corporativo para una empresa de seguridad electrónica y monitoreo, diseñado para presentar servicios críticos con una imagen sólida y confiable.',
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
    description: 'Plataforma para mostrar soluciones digitales y RunFood App, un POS orientado a restaurantes y negocios de comida.',
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
    description: 'Landing page minimalista y optimizada para una creadora de contenido, enfocada en presentar su trabajo, métricas y colaboraciones de forma clara y profesional.',
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
    description: 'Sitio web para una marca enfocada en bienestar animal, con una presencia visual limpia, natural y cercana.',
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
    description: 'Presencia digital para un negocio gastronómico, diseñada para reforzar marca, confianza y recordación visual.',
    result: 'Sitio directo y visual para comunicar la identidad del restaurante y facilitar el contacto.',
    highlights: ['Identidad gastronómica', 'Marca memorable', 'Acceso rápido'],
    href: 'https://lamila.vercel.app/',
    accent: 'amber',
    type: 'lamila',
    logo: '/LaMila.png',
  },
];

const faqs = [
  ['¿Trabajas con negocios de Ambato?', 'Sí. Trabajo principalmente con negocios locales de Ambato, pero también puedo trabajar remoto con negocios de cualquier ciudad de Ecuador.'],
  ['¿Cuánto cuesta un proyecto?', 'Depende del tipo de proyecto, cantidad de secciones y funcionalidades. Por eso primero hago un diagnóstico.'],
  ['¿Cuánto tiempo tarda?', 'Una página simple puede tardar entre 1 y 2 semanas. Proyectos más completos pueden tardar entre 3 y 4 semanas.'],
  ['¿Puedo pedir solo un servicio?', 'Sí. Puedes contratar solo una página web, un diagnóstico, una automatización o un dashboard.'],
  ['¿Necesito tener textos e imágenes?', 'No necesariamente. Puedo ayudarte a organizar el contenido inicial.'],
  ['¿La web funciona en celulares?', 'Sí. Todas las páginas se diseñan para verse bien en computadora, tablet y celular.'],
];

function ServiceIcon({ type }: { type: string }) {
  if (type === 'search') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" style={{ fill: 'none', stroke: 'currentColor' }}>
        <circle cx="11" cy="11" r="6" />
        <path d="m16 16 5 5" />
        <path d="M8 11h6" />
      </svg>
    );
  }

  if (type === 'flow') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" style={{ fill: 'none', stroke: 'currentColor' }}>
        <rect x="3" y="4" width="6" height="6" rx="1" />
        <rect x="15" y="14" width="6" height="6" rx="1" />
        <path d="M9 7h3a4 4 0 0 1 4 4v3" />
        <path d="M13 12l3 3 3-3" />
      </svg>
    );
  }

  if (type === 'chart') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" style={{ fill: 'none', stroke: 'currentColor' }}>
        <path d="M4 20V5" />
        <path d="M4 20h16" />
        <rect x="7" y="11" width="3" height="6" rx="1" />
        <rect x="12" y="8" width="3" height="9" rx="1" />
        <rect x="17" y="5" width="3" height="12" rx="1" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" style={{ fill: 'none', stroke: 'currentColor' }}>
      <rect x="3" y="5" width="18" height="13" rx="2" />
      <path d="M3 9h18" />
      <path d="M8 21h8" />
      <path d="M12 18v3" />
    </svg>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className={`faqItem ${isOpen ? 'open' : ''}`}
      onClick={() => setIsOpen(!isOpen)}
    >
      <button className="faqQuestionButton" aria-expanded={isOpen}>
        <span>{question}</span>
        <svg 
          className="faqChevron" 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>
      <div className={`faqAnswerWrapper ${isOpen ? 'open' : ''}`}>
        <div className="faqAnswerContent">
          <p>{answer}</p>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  const [isRedirecting, setIsRedirecting] = useState(false);

  // Carousel scroller reference and active state for "Servicios"
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [activeService, setActiveService] = useState(0);

  const handleServiceScroll = () => {
    if (scrollerRef.current) {
      const scroller = scrollerRef.current;
      const scrollLeft = scroller.scrollLeft;
      const cardWidth = scroller.querySelector('.serviceCard')?.getBoundingClientRect().width || 340;
      const gap = 20;
      const idx = Math.round(scrollLeft / (cardWidth + gap));
      setActiveService(Math.min(services.length - 1, Math.max(0, idx)));
    }
  };

  // Carousel scroller reference for "Proyectos"
  const projectsScrollerRef = useRef<HTMLDivElement>(null);

  // Carousel scroller reference and active step state for "Proceso" mobile carousel
  const [activeStep, setActiveStep] = useState(0);
  const stepsScrollerRef = useRef<HTMLDivElement>(null);

  const handleStepsScroll = () => {
    if (stepsScrollerRef.current) {
      const scroller = stepsScrollerRef.current;
      const scrollLeft = scroller.scrollLeft;
      const cardWidth = scroller.querySelector('.step')?.getBoundingClientRect().width || 280;
      const gap = 20;
      const stepIndex = Math.round(scrollLeft / (cardWidth + gap));
      setActiveStep(Math.min(5, Math.max(0, stepIndex)));
    }
  };

  // Carousel scroller reference and active state for "Por qué JV Studio" (Diferenciadores) mobile carousel
  const [activeWhy, setActiveWhy] = useState(0);
  const whyScrollerRef = useRef<HTMLDivElement>(null);

  const handleWhyScroll = () => {
    if (whyScrollerRef.current) {
      const scroller = whyScrollerRef.current;
      const scrollLeft = scroller.scrollLeft;
      const cardWidth = scroller.querySelector('.differentiatorCard')?.getBoundingClientRect().width || 280;
      const gap = 16;
      const whyIndex = Math.round(scrollLeft / (cardWidth + gap));
      setActiveWhy(Math.min(2, Math.max(0, whyIndex)));
    }
  };

  // Carousel scroller active state and listener for "Proyectos"
  const [activeProject, setActiveProject] = useState(0);

  const handleProjectsScroll = () => {
    if (projectsScrollerRef.current) {
      const scroller = projectsScrollerRef.current;
      const scrollLeft = scroller.scrollLeft;
      const cardWidth = scroller.querySelector('.projectCard')?.getBoundingClientRect().width || 480;
      const gap = 30;
      const projectIndex = Math.round(scrollLeft / (cardWidth + gap));
      setActiveProject(Math.min(projects.length - 1, Math.max(0, projectIndex)));
    }
  };

  // Form state hooks
  const [name, setName] = useState('');
  const [contactMethod, setContactMethod] = useState('');
  const [projectType, setProjectType] = useState('');
  const [budget, setBudget] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // IntersectionObserver para Scrollspy en el Menu de Navegación
  useEffect(() => {
    const sections = document.querySelectorAll('section, header');
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -55% 0px', // Activa en la zona media-superior
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          if (id) {
            setActiveSection(id);
          }
        }
      });
    }, observerOptions);

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  // IntersectionObserver para animaciones de reveal al hacer scroll
  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    reveals.forEach((el) => revealObserver.observe(el));
    return () => revealObserver.disconnect();
  }, []);



  // Escuchador de Mouse para el Halo de Luz Interactivo (Cursor Glow)
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  const openTally = (projType = '') => {
    let optionToSelect = '';
    if (projType) {
      const lowerVal = projType.toLowerCase();
      if (lowerVal.includes('web') || lowerVal.includes('página')) optionToSelect = 'Página web';
      else if (lowerVal.includes('presencia')) optionToSelect = 'Presencia digital';
      else if (lowerVal.includes('automat')) optionToSelect = 'Automatización';
      else if (lowerVal.includes('dashboard') || lowerVal.includes('reporte')) optionToSelect = 'Dashboard';
      else optionToSelect = 'No sé aún';
    }

    setName('');
    setContactMethod('');
    setProjectType(optionToSelect || '');
    setBudget('');
    setMessage('');
    setError('');
    setSuccess(false);
    setSubmitting(false);

    setModalOpen(true);
  };

  const closeTally = () => {
    setModalOpen(false);
    setSuccess(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    const isEmail = contactMethod.includes('@');
    const payload = {
      name,
      email: isEmail ? contactMethod : '',
      phone: !isEmail ? contactMethod : '',
      projectType: projectType || 'No sé aún',
      message: message + (budget ? ` [Presupuesto: ${budget}]` : ''),
      budget
    };

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      if (response.ok && result.ok) {
        setSuccess(true);
      } else {
        throw new Error(result.error || 'Ocurrió un error al enviar el formulario.');
      }
    } catch (err) {
      console.error('API submission failed, using WhatsApp backup redirection:', err);
      
      // Transición premium: cerramos el modal actual y activamos la modal de redirección
      setModalOpen(false);
      setIsRedirecting(true);
      
      const waMsg = `Hola Juan, acabo de solicitar mi diagnóstico gratuito:\n\n*Nombre:* ${name}\n*Contacto:* ${contactMethod}\n*Proyecto:* ${projectType || 'No sé aún'}\n*Presupuesto:* ${budget || 'A consultar'}\n*Mensaje:* ${message}`;
      
      setTimeout(() => {
        setIsRedirecting(false);
        window.open(`https://wa.me/593984937364?text=${encodeURIComponent(waMsg)}`, '_blank');
      }, 1800);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main>
      <header className="nav">
        <a className="brand" href="#inicio" aria-label="Ir al inicio">
          <span className="brandMark">
            <Image src="/jv-studio-logo.png" alt="" width={180} height={52} priority />
          </span>
        </a>
        <nav>
          <a href="#inicio" className={activeSection === 'inicio' ? 'active' : ''}>Inicio</a>
          <a href="#servicios" className={activeSection === 'servicios' ? 'active' : ''}>Servicios</a>
          <a href="#proyectos" className={activeSection === 'proyectos' ? 'active' : ''}>Proyectos</a>
          <a href="#proceso" className={activeSection === 'proceso' ? 'active' : ''}>Proceso</a>
          <a href="#faq" className={activeSection === 'faq' ? 'active' : ''}>FAQ</a>
          <a 
            className="navCta" 
            href="#contacto"
            onClick={(e) => {
              e.preventDefault();
              openTally();
            }}
          >
            Solicitar diagnóstico
          </a>
        </nav>
      </header>

      <nav className="mobileQuickNav" aria-label="Navegación móvil">
        <a href="#servicios">Servicios</a>
        <a href="#proyectos">Proyectos</a>
        <a 
          href="#contacto"
          onClick={(e) => {
            e.preventDefault();
            openTally();
          }}
        >
          Contacto
        </a>
      </nav>

      <section className="hero heroSplit" id="inicio">
        <div className="heroCopy">
          <p className="eyebrow">JV Studio / Ambato, Ecuador</p>
          <h1>Tu negocio ya es bueno.</h1>
          <p className="lead">
            Hagamos que su presencia digital también lo sea.
          </p>
          <div className="heroActions">
            <a 
              className="button primary" 
              href="#contacto"
              onClick={(e) => {
                e.preventDefault();
                openTally();
              }}
            >
              Solicitar diagnóstico
            </a>
            <a className="simpleLink" href="#proyectos">Ver proyectos <span>→</span></a>
          </div>
        </div>

        {/* Hero browser mockup — dashboard original */}
        <div className="heroMockupWrap" aria-hidden="true">
          <div className="heroGlow" />
          <div className="browserMockup">
            {/* Browser chrome */}
            <div className="browserTop">
              <span className="dot-red" />
              <span className="dot-yellow" />
              <span className="dot-green" />
            </div>

            {/* Mock Nav */}
            <div className="mockNav">
              <span className="mockBrand">
                <Image src="/jv-studio-logo.png" alt="" width={120} height={35} />
              </span>
              <div className="mockNavLinks">
                <span>Servicios</span>
                <span>Portafolio</span>
                <span className="active">Panel</span>
              </div>
            </div>

            {/* Mock Hero Section */}
            <div className="mockHero">
              <div className="mockHeroCopy">
                <h3 className="mockTitle">Diseño web y automatización.</h3>
                <p className="mockDesc">Transformamos ideas en plataformas de alta conversión.</p>
                <div className="mockCtaButton">Comenzar</div>
              </div>
              <div className="mockPreviewCard">
                <div className="mockPreviewHeader">
                  <span>Rendimiento Mensual</span>
                  <span className="mockStat">+48.2%</span>
                </div>
                <div className="mockChartContainer">
                  <svg className="mockChartSvg" viewBox="0 0 100 40" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#d6ff72" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#d6ff72" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    <path d="M0,35 Q15,10 30,22 T60,5 T90,15 L100,8 L100,40 L0,40 Z" fill="url(#chartGlow)" />
                    <path d="M0,35 Q15,10 30,22 T60,5 T90,15 L100,8" fill="none" stroke="#d6ff72" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Mock Bottom Cards */}
            <div className="mockCards">
              <div className="miniCard">
                <span className="miniCardLabel">Visitas</span>
                <strong className="miniCardValue">12,482</strong>
                <span className="miniCardTrend">+18%</span>
              </div>
              <div className="miniCard">
                <span className="miniCardLabel">Leads</span>
                <strong className="miniCardValue">1,402</strong>
                <span className="miniCardTrend">+24%</span>
              </div>
              <div className="miniCard">
                <span className="miniCardLabel">Ventas</span>
                <strong className="miniCardValue">$8,420</strong>
                <span className="miniCardTrend">+32%</span>
              </div>
            </div>
          </div>
        </div>

      </section>

      <div className="marquee" aria-hidden="true">
        <div>
          <span>Web Design / Responsive Websites / Automation / Dashboards — Web Design / Responsive Websites / Automation / Dashboards — Web Design / Responsive Websites / Automation / Dashboards — Web Design / Responsive Websites / Automation / Dashboards — </span>
        </div>
      </div>

      <section className="section" id="diagnostico" aria-label="Problema vs Solución">
        <div className="contrastGrid">
          {/* Columna Izquierda: El Problema */}
          <div className="contrastCol problemCol">
            <span className="eyebrow statusEyebrow problem">x El Problema</span>
            <h2>Muchos negocios pierden clientes antes de que lleguen a escribirles.</h2>
            <ul className="contrastList">
              <li><span>x</span> No transmiten confianza online</li>
              <li><span>x</span> Atienden todo manualmente</li>
              <li><span>x</span> Tienen procesos desordenados</li>
              <li><span>x</span> No saben qué funciona</li>
              <li><span>x</span> Su negocio se ve menos profesional de lo que es</li>
            </ul>
          </div>
          {/* Columna Derecha: La Solución */}
          <div className="contrastCol solutionCol">
            <span className="eyebrow statusEyebrow solution">+ La Solución</span>
            <h2>Diseño digital claro para negocios reales.</h2>
            <ul className="contrastList">
              <li><span>+</span> Páginas web modernas</li>
              <li><span>+</span> Procesos automatizados</li>
              <li><span>+</span> Organización digital</li>
              <li><span>+</span> Dashboards y métricas</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section servicesSection" id="servicios">
        <div className="sectionHead servicesHead">
          <p className="eyebrow">Servicios</p>
          <div className="servicesHeadMain">
            <h2>Servicios diseñados para negocios que quieren crecer con orden.</h2>
          </div>
        </div>
        <div className="serviceGrid" ref={scrollerRef} onScroll={handleServiceScroll}>
          {services.map((service) => (
            <article className="serviceCard" key={service.tag} onMouseMove={handleMouseMove}>
              <div className="serviceTop">
                <span>{service.tag}</span>
                <div className="serviceIcon">
                  <ServiceIcon type={service.icon} />
                </div>
              </div>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
              <ul className="featureList">
                {service.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <button 
                className="button ghost serviceButton" 
                onClick={() => openTally(service.projectSelectType)}
              >
                {service.cta}
              </button>
            </article>
          ))}
        </div>
        {/* Dot indicators */}
        <div className="carouselIndicators servicesIndicators">
          {services.map((_, index) => (
            <span
              key={index}
              className={`indicatorDot ${activeService === index ? 'active' : ''}`}
              onClick={() => {
                if (scrollerRef.current) {
                  const cardWidth = scrollerRef.current.querySelector('.serviceCard')?.getBoundingClientRect().width || 340;
                  const gap = 20;
                  scrollerRef.current.scrollTo({ left: index * (cardWidth + gap), behavior: 'smooth' });
                }
              }}
              aria-label={`Ir al servicio ${index + 1}`}
            />
          ))}
        </div>
        <div className="sectionCta">
          <button 
            className="button ghost diagnosisButton" 
            onClick={() => openTally('Presencia Digital')}
          >
            <span>¿No sabes cuál necesitas? Empieza con un diagnóstico gratis</span>
            <span className="arrow">→</span>
          </button>
        </div>
      </section>

      <section className="section reveal" id="para-quien">
        <div className="sectionHead">
          <p className="eyebrow">Para quién es</p>
          <h2>Para negocios que quieren verse tan bien como trabajan.</h2>
        </div>
        <div className="targetGrid">
          {([
            {
              label: 'Restaurantes',
              result: 'Menú digital + pedidos por WhatsApp',
              icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
                  <path d="M7 2v20" />
                  <path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7" />
                </svg>
              ),
            },
            {
              label: 'Cafeterías',
              result: 'Más clientes desde Google Maps',
              icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M17 8h1a4 4 0 0 1 0 8h-1" />
                  <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
                  <line x1="6" y1="2" x2="6" y2="4" />
                  <line x1="10" y1="2" x2="10" y2="4" />
                  <line x1="14" y1="2" x2="14" y2="4" />
                </svg>
              ),
            },
            {
              label: 'Clínicas',
              result: 'Citas online sin llamadas',
              icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="3" y="2" width="18" height="20" rx="2" />
                  <path d="M9 12h6" />
                  <path d="M12 9v6" />
                  <path d="M8 6h.01" />
                  <path d="M16 6h.01" />
                </svg>
              ),
            },
            {
              label: 'Gimnasios',
              result: 'Clases y pagos organizados',
              icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M6 4v16" />
                  <path d="M18 4v16" />
                  <path d="M6 12h12" />
                  <path d="M3 6h3" />
                  <path d="M18 6h3" />
                  <path d="M3 18h3" />
                  <path d="M18 18h3" />
                </svg>
              ),
            },
            {
              label: 'Academias',
              result: 'Matrículas sin papeleos',
              icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                  <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5z" />
                  <path d="M9 10h6" />
                  <path d="M9 14h4" />
                </svg>
              ),
            },
            {
              label: 'Negocios locales',
              result: 'Presencia profesional online',
              icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              ),
            },
          ] as { label: string; result: string; icon: React.ReactNode }[]).map(({ icon, label, result }) => (
            <div key={label} className="targetCard">
              <span className="targetIcon">{icon}</span>
              <strong className="targetLabel">{label}</strong>
              <p className="targetResult">{result}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section reveal" id="por-que">
        <div className="sectionHead whyHead">
          <p className="eyebrow">Por qué JV Studio</p>
          <h2 className="whyTitle">No hago páginas genéricas.</h2>
        </div>
        <div className="differentiatorGrid" ref={whyScrollerRef} onScroll={handleWhyScroll}>
          <div className="differentiatorCard">
            <div className="diffIcon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <h3>Diseño desde cero</h3>
            <p>Nada de templates. Cada proyecto se construye según tu negocio, tu cliente y tu objetivo. El resultado se nota.</p>
          </div>
          <div className="differentiatorCard">
            <div className="diffIcon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <h3>Entrega en 1–3 semanas</h3>
            <p>Sin sprints eternos ni procesos complicados. Trabajamos rápido y enfocados para que veas resultados concretos pronto.</p>
          </div>
          <div className="differentiatorCard">
            <div className="diffIcon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M18 20a6 6 0 0 0-12 0" />
                <circle cx="12" cy="10" r="4" />
                <path d="M22 20a6 6 0 0 0-6-6 6 6 0 0 0-6 6" />
              </svg>
            </div>
            <h3>Soporte post-entrega</h3>
            <p>No desaparezco cuando termino. Te explico cómo usar lo que construí y estoy disponible para ajustes y dudas.</p>
          </div>
        </div>

        {/* Indicadores visuales para móviles y tablets */}
        <div className="carouselIndicators">
          {[0, 1, 2].map((index) => (
            <span 
              key={index} 
              className={`indicatorDot ${activeWhy === index ? 'active' : ''}`}
              onClick={() => {
                if (whyScrollerRef.current) {
                  const cardWidth = whyScrollerRef.current.querySelector('.differentiatorCard')?.getBoundingClientRect().width || 280;
                  const gap = 16;
                  whyScrollerRef.current.scrollTo({ left: index * (cardWidth + gap), behavior: 'smooth' });
                }
              }}
              aria-label={`Ir al diferenciador ${index + 1}`}
            />
          ))}
        </div>
      </section>


      <section className="section processSection reveal" id="proceso">
        <div className="sectionHead">
          <p className="eyebrow">Proceso</p>
          <h2>Cómo trabajo</h2>
        </div>
        <div className="steps" ref={stepsScrollerRef} onScroll={handleStepsScroll}>
          {process.map(([title, text], index) => (
            <article className="step" key={title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
        
        {/* Indicadores visuales para móviles y tablets */}
        <div className="carouselIndicators">
          {process.map((_, index) => (
            <span 
              key={index} 
              className={`indicatorDot ${activeStep === index ? 'active' : ''}`}
              onClick={() => {
                if (stepsScrollerRef.current) {
                  const cardWidth = stepsScrollerRef.current.querySelector('.step')?.getBoundingClientRect().width || 280;
                  const gap = 20;
                  stepsScrollerRef.current.scrollTo({ left: index * (cardWidth + gap), behavior: 'smooth' });
                }
              }}
              aria-label={`Ir al paso ${index + 1}`}
            />
          ))}
        </div>
      </section>

      <section className="section personSection">
        <div className="personCard">
          <div className="avatar" aria-hidden="true">
            <Image src="/Juan_EstebanVivero.jpg" alt="Juan Esteban Vivero" width={120} height={120} />
          </div>
          <div>
            <p className="eyebrow">Quién está detrás</p>
            <h2>Juan Esteban Vivero</h2>
            <p>Diseñador y desarrollador web basado en Ambato, Ecuador.</p>
            <p>Trabajo con negocios locales que quieren una presencia digital clara y profesional.</p>
          </div>
          <div className="trustBadge">
            <strong>Ambato, EC</strong>
            <span>trabajo local y remoto</span>
          </div>
        </div>
      </section>

      <section className="section projectsSection" id="proyectos">
        <div className="sectionHead projectsHead">
          <p className="eyebrow">Proyectos</p>
          <div className="projectsHeadMain">
            <div>
              <h2>Proyectos</h2>
              <p className="sectionIntro">
                Soluciones digitales a la medida, pensadas para que cada negocio comunique mejor, atienda mejor y venda con más claridad.
              </p>
            </div>
          </div>
        </div>
        <div className="projectCarousel" ref={projectsScrollerRef} onScroll={handleProjectsScroll}>
          {projects.map((project) => (
            <article className="projectCard" key={project.title}>
              <div 
                className={`projectThumb ${project.accent} ${project.type}`} 
                aria-label={`Visualización de ${project.title}`}
              >
                <div className={`projectLogoWrapper ${project.type === 'portfolio' ? 'portfolioFrame' : ''}`}>
                  {project.logoAlt ? (
                    <div className="logo-container">
                      <Image 
                        src={project.logo} 
                        alt="" 
                        className="rotating-logo logo-1"
                        width={360}
                        height={120}
                        priority={true}
                      />
                      <Image 
                        src={project.logoAlt} 
                        alt="" 
                        className="rotating-logo logo-2"
                        width={360}
                        height={120}
                        priority={true}
                      />
                    </div>
                  ) : project.logo ? (
                    <Image 
                      src={project.logo} 
                      alt="" 
                      className={project.type === 'portfolio' ? 'portfolioPreviewImage' : 'plateLogo'}
                      width={project.type === 'portfolio' ? 600 : 360}
                      height={project.type === 'portfolio' ? 340 : 120}
                      priority={true}
                    />
                  ) : (
                    <div className="textLogo" style={{ fontSize: '1.75rem', fontWeight: 700, color: '#fff', textAlign: 'center', lineHeight: 1.1 }}>
                      {project.title.split(' - ')[1] || project.title}
                    </div>
                  )}
                </div>
              </div>
              <span>{project.category}</span>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="projectResult">
                <strong>Impacto</strong>
                <span>{project.result}</span>
              </div>
              <div className="projectTags">
                {project.highlights.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
              <div className="projectAction">
                <a 
                  className={`projectButton ${project.accent}`} 
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visitar sitio web <span className="arrow">→</span>
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* Indicadores visuales para móviles, tablets y desktop */}
        <div className="carouselIndicators projectsIndicators">
          {projects.map((_, index) => (
            <span 
              key={index} 
              className={`indicatorDot ${activeProject === index ? 'active' : ''}`}
              onClick={() => {
                if (projectsScrollerRef.current) {
                  const cardWidth = projectsScrollerRef.current.querySelector('.projectCard')?.getBoundingClientRect().width || 480;
                  const gap = 30;
                  projectsScrollerRef.current.scrollTo({ left: index * (cardWidth + gap), behavior: 'smooth' });
                }
              }}
              aria-label={`Ir al proyecto ${index + 1}`}
            />
          ))}
        </div>
        <div className="centerAction">
          <button 
            className="button primary"
            onClick={() => openTally()}
          >
            Solicitar diagnóstico gratuito
          </button>
        </div>
      </section>

      <section className="section faq" id="faq">
        <div className="sectionHead">
          <p className="eyebrow">FAQ</p>
          <h2>Preguntas frecuentes</h2>
        </div>
        <div className="faqList">
          {faqs.map(([question, answer]) => (
            <FaqItem key={question} question={question} answer={answer} />
          ))}
        </div>
      </section>

      <section className="cta" id="contacto">
        <div className="cta-box">
          <h2>Tu negocio merece verse tan profesional como el servicio que das.</h2>
          <p className="ctaText">Construyamos una presencia digital clara, moderna y funcional para que más clientes confíen en tu negocio y cierres tratos ágilmente.</p>
          <div className="heroActions ctaActions">
            <button 
              className="button primary"
              onClick={() => openTally()}
            >
              Solicitar diagnóstico
            </button>
            <a 
              className="button ghost whatsappButton" 
              href="https://wa.me/593984937364?text=Hola%20Juan%2C%20quiero%20hablar%20sobre%20el%20diagn%C3%B3stico%20de%20mi%20negocio%20de%20JV%20Studio" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <svg className="whatsappIcon" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Hablar por WhatsApp
            </a>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-col">
          <span className="footerBrand">
            <Image src="/jv-studio-logo.png" alt="" width={180} height={52} />
          </span>
          <p>Diseño web, automatización y presencia digital para negocios modernos.</p>
        </div>
        <div className="footer-col">
          <span>Links</span>
          <a href="#servicios">Servicios</a>
          <a href="#proyectos">Proyectos</a>
          <a href="#proceso">Proceso</a>
          <a href="https://wa.me/593984937364" target="_blank" rel="noopener noreferrer">WhatsApp</a>
        </div>
        <div className="footer-col">
          <span>Servicios</span>
          <a href="#servicios">Páginas web</a>
          <a href="#servicios">Presencia digital</a>
          <a href="#servicios">Automatización</a>
          <a href="#servicios">Dashboards</a>
        </div>
        <div className="footer-col">
          <span>Redes</span>
          <a href="https://instagram.com/juanesvivero" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="https://github.com/juanesvivero" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://wa.me/593984937364" target="_blank" rel="noopener noreferrer">WhatsApp</a>
          <a href="mailto:juanestebanvivero@gmail.com">Email</a>
        </div>
      </footer>
      <div className="footer-bottom">
        <span>© 2026 JV Studio — Juan Esteban Vivero</span>
        <span>Ambato, Ecuador — Diseño digital claro para negocios reales.</span>
      </div>

      {modalOpen && (
        <div 
          className="react-modal-overlay" 
          onClick={closeTally}
        >
          <div 
            className="react-modal-container"
            onClick={(e) => e.stopPropagation()}
            style={{ width: 'min(540px, 95vw)', height: 'auto', maxHeight: '92vh', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}
          >
            {/* Header del modal */}
            <div className="modalHeader" style={{ borderBottom: '1px solid var(--line)', background: 'var(--bg-2)', padding: '16px 20px' }}>
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink)' }}>
                Solicitar diagnóstico gratuito
              </span>
              <button 
                onClick={closeTally}
                aria-label="Cerrar modal" 
                className="modalClose"
                style={{ fontSize: '20px', lineHeight: 1 }}
              >
                &times;
              </button>
            </div>
            
            {!success ? (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '24px 28px', color: 'var(--ink)' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label htmlFor="react_name" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--muted)' }}>
                    Nombre completo <span style={{ color: 'var(--rose)' }}>*</span>
                  </label>
                  <input 
                    type="text" 
                    id="react_name" 
                    required 
                    placeholder="ej. Juan Pérez" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{ width: '100%', padding: '12px 14px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--line)', borderRadius: '6px', color: 'var(--ink)', fontSize: '13px', outline: 'none' }}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label htmlFor="react_contact" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--muted)' }}>
                    Email o WhatsApp <span style={{ color: 'var(--rose)' }}>*</span>
                  </label>
                  <input 
                    type="text" 
                    id="react_contact" 
                    required 
                    placeholder="ej. juan@correo.com o +593984937364" 
                    value={contactMethod}
                    onChange={(e) => setContactMethod(e.target.value)}
                    style={{ width: '100%', padding: '12px 14px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--line)', borderRadius: '6px', color: 'var(--ink)', fontSize: '13px', outline: 'none' }}
                  />
                  <span style={{ fontSize: '10px', color: 'var(--muted)', marginTop: '2px' }}>
                    Ingresa uno de los dos. Si usas WhatsApp, incluye el código de país.
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label htmlFor="react_project" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--muted)' }}>
                    Tipo de proyecto <span style={{ color: 'var(--rose)' }}>*</span>
                  </label>
                  <div style={{ position: 'relative' }}>
                    <select 
                      id="react_project" 
                      required 
                      value={projectType}
                      onChange={(e) => setProjectType(e.target.value)}
                      style={{ width: '100%', padding: '12px 14px', background: 'var(--bg-2)', border: '1px solid var(--line)', borderRadius: '6px', color: 'var(--ink)', fontSize: '13px', outline: 'none', appearance: 'none', WebkitAppearance: 'none', backgroundImage: 'url("data:image/svg+xml;utf8,<svg fill=\'%23888888\' height=\'20\' viewBox=\'0 0 24 24\' width=\'20\' xmlns=\'http://www.w3.org/2000/svg\'><path d=\'M7 10l5 5 5-5z\'/><path d=\'M0 0h24v24H0z\' fill=\'none\'/></svg>")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center' }}
                    >
                      <option value="" disabled>Selecciona una opción</option>
                      <option value="Página web">Página web</option>
                      <option value="Presencia digital">Presencia digital</option>
                      <option value="Automatización">Automatización</option>
                      <option value="Dashboard">Dashboard</option>
                      <option value="No sé aún">No sé aún</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label htmlFor="react_budget" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--muted)' }}>
                    Presupuesto aproximado <span style={{ color: 'var(--muted)', fontSize: '9px' }}>(Opcional)</span>
                  </label>
                  <div style={{ position: 'relative' }}>
                    <select 
                      id="react_budget" 
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      style={{ width: '100%', padding: '12px 14px', background: 'var(--bg-2)', border: '1px solid var(--line)', borderRadius: '6px', color: 'var(--ink)', fontSize: '13px', outline: 'none', appearance: 'none', WebkitAppearance: 'none', backgroundImage: 'url("data:image/svg+xml;utf8,<svg fill=\'%23888888\' height=\'20\' viewBox=\'0 0 24 24\' width=\'20\' xmlns=\'http://www.w3.org/2000/svg\'><path d=\'M7 10l5 5 5-5z\'/><path d=\'M0 0h24v24H0z\' fill=\'none\'/></svg>")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center' }}
                    >
                      <option value="">Prefiero no decir / A consultar</option>
                      <option value="Menos de $500 USD">Menos de $500 USD</option>
                      <option value="$500 - $1,000 USD">$500 - $1,000 USD</option>
                      <option value="$1,000 - $2,500 USD">$1,000 - $2,500 USD</option>
                      <option value="Más de $2,500 USD">Más de $2,500 USD</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label htmlFor="react_message" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--muted)' }}>
                    Mensaje breve <span style={{ color: 'var(--rose)' }}>*</span>
                  </label>
                  <textarea 
                    id="react_message" 
                    required 
                    rows={2} 
                    placeholder="ej. Necesito estructurar la web de mi negocio y automatizar reservas." 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    style={{ width: '100%', padding: '12px 14px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--line)', borderRadius: '6px', color: 'var(--ink)', fontSize: '13px', outline: 'none', fontFamily: 'inherit', resize: 'vertical', minHeight: '60px' }}
                  />
                </div>

                {error && (
                  <div style={{ color: '#ff6b6b', fontSize: '12px', marginTop: '4px' }}>
                    {error}
                  </div>
                )}

                <button 
                  type="submit" 
                  disabled={submitting}
                  className="button primary" 
                  style={{ width: '100%', padding: '12px', fontSize: '13px', textAlign: 'center', borderRadius: '6px', cursor: 'pointer', border: 'none', fontWeight: 'bold', background: '#ffffff', color: '#000000', marginTop: '6px' }}
                >
                  {submitting ? 'Enviando...' : 'Solicitar diagnóstico gratuito'}
                </button>
              </form>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '40px 24px', color: 'var(--ink)' }}>
                <span style={{ fontSize: '40px', color: '#6dffb2', marginBottom: '12px' }}>✓</span>
                <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '10px' }}>¡Diagnóstico solicitado!</h3>
                <p style={{ color: 'var(--muted)', fontSize: '13px', lineHeight: 1.5, maxWidth: '360px', marginBottom: '20px' }}>
                  Gracias por tu interés. Me pondré en contacto contigo lo antes posible para analizar tu negocio y coordinar el diagnóstico gratuito.
                </p>
                <button 
                  onClick={closeTally} 
                  className="button outline" 
                  style={{ padding: '8px 20px', fontSize: '11px', fontFamily: 'JetBrains Mono, monospace', textTransform: 'uppercase', letterSpacing: '0.08em', cursor: 'pointer' }}
                >
                  Cerrar
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {isRedirecting && (
        <div className="react-modal-overlay" style={{ zIndex: 100 }}>
          <div 
            className="react-modal-container"
            style={{ 
              width: 'min(440px, 90vw)', 
              padding: '36px 28px', 
              textAlign: 'center', 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              gap: '18px',
              border: '1px solid rgba(214, 255, 114, 0.15)',
              background: 'rgba(7, 7, 7, 0.88)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              color: 'var(--ink)'
            }}
          >
            <div className="whatsapp-spinner">
              <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="#25D366" strokeWidth="3" className="spinner-rotate">
                <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.06)" />
                <path d="M12 2a10 10 0 0 1 10 10" />
              </svg>
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#fff', margin: 0, letterSpacing: '-0.01em' }}>
              Conectando con WhatsApp...
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.55, margin: 0 }}>
              No pudimos registrar tu solicitud en la base de datos temporal, pero no te preocupes. Te estamos redirigiendo directamente al chat de Juan por WhatsApp para enviarle tus datos y coordinar tu diagnóstico gratuito...
            </p>
          </div>
        </div>
      )}
    </main>
  );
}
