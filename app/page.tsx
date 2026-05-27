'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

import { services } from './data/services';
import { projects } from './data/projects';
import { processSteps } from './data/process';
import { faqs } from './data/faqs';
import ServiceIcon from './components/ServiceIcon';
import FaqItem from './components/FaqItem';
import ContactModal from './components/ContactModal';

// Target audience items for the "Para quién es" section
const TARGET_ITEMS = [
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
] as const;

// ─── Helpers ────────────────────────────────────────────────────────────────

function resolveProjectType(raw: string): string {
  if (!raw) return '';
  const v = raw.toLowerCase();
  if (v.includes('web') || v.includes('página')) return 'Página web';
  if (v.includes('presencia')) return 'Presencia digital';
  if (v.includes('automat')) return 'Automatización';
  if (v.includes('dashboard') || v.includes('reporte')) return 'Dashboard';
  return 'No sé aún';
}

function useScrollIndex(
  ref: React.RefObject<HTMLElement | null>,
  selector: string,
  gap: number,
  max: number
) {
  const [index, setIndex] = useState(0);
  const handleScroll = () => {
    const el = ref.current;
    if (!el) return;
    const cardWidth = el.querySelector(selector)?.getBoundingClientRect().width ?? gap * 10;
    setIndex(Math.min(max, Math.max(0, Math.round(el.scrollLeft / (cardWidth + gap)))));
  };
  return { index, handleScroll };
}

function scrollTo(ref: React.RefObject<HTMLElement | null>, selector: string, gap: number, targetIndex: number) {
  const el = ref.current;
  if (!el) return;
  const cardWidth = el.querySelector(selector)?.getBoundingClientRect().width ?? 280;
  el.scrollTo({ left: targetIndex * (cardWidth + gap), behavior: 'smooth' });
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function Home() {
  const [activeSection, setActiveSection] = useState('inicio');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalProjectType, setModalProjectType] = useState('');

  // Carousel refs
  const scrollerRef = useRef<HTMLDivElement>(null);
  const stepsScrollerRef = useRef<HTMLDivElement>(null);
  const whyScrollerRef = useRef<HTMLDivElement>(null);
  const projectsScrollerRef = useRef<HTMLDivElement>(null);

  // Carousel active indices
  const { index: activeService, handleScroll: handleServiceScroll } = useScrollIndex(scrollerRef, '.serviceCard', 20, services.length - 1);
  const { index: activeStep, handleScroll: handleStepsScroll } = useScrollIndex(stepsScrollerRef, '.step', 20, processSteps.length - 1);
  const { index: activeWhy, handleScroll: handleWhyScroll } = useScrollIndex(whyScrollerRef, '.differentiatorCard', 16, 2);
  const { index: activeProject, handleScroll: handleProjectsScroll } = useScrollIndex(projectsScrollerRef, '.projectCard', 30, projects.length - 1);

  // Interactive mouse glow on cards
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  // Open contact modal, optionally pre-selecting a project type
  const openTally = (projType = '') => {
    setModalProjectType(resolveProjectType(projType));
    setModalOpen(true);
  };

  // Scrollspy: highlight active nav link
  useEffect(() => {
    const sections = document.querySelectorAll('section, header');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            if (id) setActiveSection(id);
          }
        });
      },
      { root: null, rootMargin: '-30% 0px -55% 0px', threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Scroll-driven reveal animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <main>
      {/* ── Navigation ──────────────────────────────────────────────────────── */}
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
            onClick={(e) => { e.preventDefault(); openTally(); }}
          >
            Solicitar diagnóstico
          </a>
        </nav>
      </header>

      <nav className="mobileQuickNav" aria-label="Navegación móvil">
        <a href="#servicios">Servicios</a>
        <a href="#proyectos">Proyectos</a>
        <a href="#contacto" onClick={(e) => { e.preventDefault(); openTally(); }}>Contacto</a>
      </nav>

      {/* ── Hero ────────────────────────────────────────────────────────────── */}
      <section className="hero heroSplit" id="inicio">
        <div className="heroCopy">
          <p className="eyebrow">JV Studio / Ambato, Ecuador</p>
          <h1>Tu negocio ya es bueno.</h1>
          <p className="lead">Hagamos que su presencia digital también lo sea.</p>
          <div className="heroActions">
            <a
              className="button primary"
              href="#contacto"
              onClick={(e) => { e.preventDefault(); openTally(); }}
            >
              Solicitar diagnóstico
            </a>
            <a className="simpleLink" href="#proyectos">Ver proyectos <span>→</span></a>
          </div>
        </div>

        {/* Browser mockup */}
        <div className="heroMockupWrap" aria-hidden="true">
          <div className="heroGlow" />
          <div className="browserMockup">
            <div className="browserTop">
              <span className="dot-red" />
              <span className="dot-yellow" />
              <span className="dot-green" />
            </div>
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

      {/* ── Marquee ─────────────────────────────────────────────────────────── */}
      <div className="marquee" aria-hidden="true">
        <div>
          <span>Web Design / Responsive Websites / Automation / Dashboards — Web Design / Responsive Websites / Automation / Dashboards — Web Design / Responsive Websites / Automation / Dashboards — Web Design / Responsive Websites / Automation / Dashboards — </span>
        </div>
      </div>

      {/* ── Problem / Solution ──────────────────────────────────────────────── */}
      <section className="section" id="diagnostico" aria-label="Problema vs Solución">
        <div className="contrastGrid">
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

      {/* ── Services ────────────────────────────────────────────────────────── */}
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
        <div className="carouselIndicators servicesIndicators">
          {services.map((_, i) => (
            <span
              key={i}
              className={`indicatorDot ${activeService === i ? 'active' : ''}`}
              onClick={() => scrollTo(scrollerRef, '.serviceCard', 20, i)}
              aria-label={`Ir al servicio ${i + 1}`}
            />
          ))}
        </div>
        <div className="sectionCta">
          <button className="button ghost diagnosisButton" onClick={() => openTally('Presencia Digital')}>
            <span>¿No sabes cuál necesitas? Empieza con un diagnóstico gratis</span>
            <span className="arrow">→</span>
          </button>
        </div>
      </section>

      {/* ── Para quién es ───────────────────────────────────────────────────── */}
      <section className="section reveal" id="para-quien">
        <div className="sectionHead">
          <p className="eyebrow">Para quién es</p>
          <h2>Para negocios que quieren verse tan bien como trabajan.</h2>
        </div>
        <div className="targetGrid">
          {TARGET_ITEMS.map(({ icon, label, result }) => (
            <div key={label} className="targetCard">
              <span className="targetIcon">{icon}</span>
              <strong className="targetLabel">{label}</strong>
              <p className="targetResult">{result}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Por qué JV Studio ───────────────────────────────────────────────── */}
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
        <div className="carouselIndicators">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={`indicatorDot ${activeWhy === i ? 'active' : ''}`}
              onClick={() => scrollTo(whyScrollerRef, '.differentiatorCard', 16, i)}
              aria-label={`Ir al diferenciador ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* ── Process ─────────────────────────────────────────────────────────── */}
      <section className="section processSection reveal" id="proceso">
        <div className="sectionHead">
          <p className="eyebrow">Proceso</p>
          <h2>Cómo trabajo</h2>
        </div>
        <div className="steps" ref={stepsScrollerRef} onScroll={handleStepsScroll}>
          {processSteps.map(([title, text], i) => (
            <article className="step" key={title}>
              <span>{String(i + 1).padStart(2, '0')}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
        <div className="carouselIndicators">
          {processSteps.map((_, i) => (
            <span
              key={i}
              className={`indicatorDot ${activeStep === i ? 'active' : ''}`}
              onClick={() => scrollTo(stepsScrollerRef, '.step', 20, i)}
              aria-label={`Ir al paso ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* ── About ───────────────────────────────────────────────────────────── */}
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

      {/* ── Projects ────────────────────────────────────────────────────────── */}
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
              <div className={`projectThumb ${project.accent} ${project.type}`} aria-label={`Visualización de ${project.title}`}>
                <div className={`projectLogoWrapper ${['portfolio', 'natupet'].includes(project.type) ? 'portfolioFrame' : ''}`}>
                  {project.logoAlt ? (
                    <div className="logo-container">
                      <Image src={project.logo} alt="" className="rotating-logo logo-1" width={360} height={120} priority />
                      <Image src={project.logoAlt} alt="" className="rotating-logo logo-2" width={360} height={120} priority />
                    </div>
                  ) : project.logo ? (
                    <Image
                      src={project.logo}
                      alt=""
                      className={['portfolio', 'natupet'].includes(project.type) ? `portfolioPreviewImage ${project.type}Image` : 'plateLogo'}
                      width={['portfolio', 'natupet'].includes(project.type) ? 600 : 360}
                      height={['portfolio', 'natupet'].includes(project.type) ? 340 : 120}
                      priority
                    />
                  ) : (
                    <div className="textLogo" style={{ fontSize: '1.75rem', fontWeight: 700, color: '#fff', textAlign: 'center', lineHeight: 1.1 }}>
                      {project.title.split(' - ')[1] || project.title}
                    </div>
                  )}
                </div>
              </div>
              <div className="projectContent">
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
                  <a className={`projectButton ${project.accent}`} href={project.href} target="_blank" rel="noopener noreferrer">
                    Visitar sitio web <span className="arrow">→</span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="carouselIndicators projectsIndicators">
          {projects.map((_, i) => (
            <span
              key={i}
              className={`indicatorDot ${activeProject === i ? 'active' : ''}`}
              onClick={() => scrollTo(projectsScrollerRef, '.projectCard', 30, i)}
              aria-label={`Ir al proyecto ${i + 1}`}
            />
          ))}
        </div>
        <div className="centerAction">
          <button className="button primary" onClick={() => openTally()}>
            Solicitar diagnóstico gratuito
          </button>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────────────────── */}
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

      {/* ── CTA ─────────────────────────────────────────────────────────────── */}
      <section className="cta" id="contacto">
        <div className="cta-box">
          <h2>Tu negocio merece verse tan profesional como el servicio que das.</h2>
          <p className="ctaText">
            Construyamos una presencia digital clara, moderna y funcional para que más clientes confíen en tu negocio y cierres tratos ágilmente.
          </p>
          <div className="heroActions ctaActions">
            <button className="button primary" onClick={() => openTally()}>
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

      {/* ── Footer ──────────────────────────────────────────────────────────── */}
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

      {/* ── Contact Modal ───────────────────────────────────────────────────── */}
      <ContactModal
        isOpen={modalOpen}
        initialProjectType={modalProjectType}
        onClose={() => setModalOpen(false)}
      />
    </main>
  );
}
