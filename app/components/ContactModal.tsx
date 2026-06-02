'use client';

import { useEffect, useState } from 'react';

interface ContactModalProps {
  isOpen: boolean;
  initialProjectType?: string;
  onClose: () => void;
}

const SELECT_STYLE: React.CSSProperties = {
  width: '100%',
  padding: '12px 14px',
  background: 'var(--bg-2)',
  border: '1px solid var(--line)',
  borderRadius: '6px',
  color: 'var(--ink)',
  fontSize: '13px',
  outline: 'none',
  appearance: 'none',
  WebkitAppearance: 'none',
  backgroundImage:
    'url("data:image/svg+xml;utf8,<svg fill=\'%23888888\' height=\'20\' viewBox=\'0 0 24 24\' width=\'20\' xmlns=\'http://www.w3.org/2000/svg\'><path d=\'M7 10l5 5 5-5z\'/><path d=\'M0 0h24v24H0z\' fill=\'none\'/></svg>")',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 12px center',
};

const INPUT_STYLE: React.CSSProperties = {
  width: '100%',
  padding: '12px 14px',
  background: 'rgba(255,255,255,0.02)',
  border: '1px solid var(--line)',
  borderRadius: '6px',
  color: 'var(--ink)',
  fontSize: '13px',
  outline: 'none',
};

const LABEL_STYLE: React.CSSProperties = {
  fontFamily: 'JetBrains Mono, monospace',
  fontSize: '10px',
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  color: 'var(--muted)',
};

export default function ContactModal({ isOpen, initialProjectType = '', onClose }: ContactModalProps) {
  const [name, setName] = useState('');
  const [contactMethod, setContactMethod] = useState('');
  const [projectType, setProjectType] = useState(initialProjectType);
  const [budget, setBudget] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [isRedirecting, setIsRedirecting] = useState(false);

  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactMethod.trim());
  const isPhone = contactMethod.trim().length >= 7 && /^[+]?[0-9\s\-()]+$/.test(contactMethod.trim());
  const contactIsValid = isEmail || isPhone;

  useEffect(() => {
    if (!isOpen) return;
    setProjectType(initialProjectType);
    setError('');
    setSuccess(false);
  }, [initialProjectType, isOpen]);

  const handleClose = () => {
    setSuccess(false);
    setError('');
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!contactIsValid) {
      setError('Por favor, ingresa un correo electrónico o un número de WhatsApp válido.');
      return;
    }

    setSubmitting(true);

    const payload = {
      name,
      email: isEmail ? contactMethod.trim() : '',
      phone: isPhone ? contactMethod.trim() : '',
      projectType: projectType || 'No sé aún',
      message: message + (budget ? ` [Presupuesto: ${budget}]` : ''),
      budget,
    };

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (response.ok && result.ok) {
        setSuccess(true);
      } else {
        throw new Error(result.error || 'Ocurrió un error al enviar el formulario.');
      }
    } catch (err) {
      console.error('API submission failed, using WhatsApp backup redirection:', err);

      onClose();
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
    <>
      {isOpen && (
        <div className="react-modal-overlay" onClick={handleClose}>
          <div
            className="react-modal-container"
            onClick={(e) => e.stopPropagation()}
            style={{ width: 'min(540px, 95vw)', height: 'auto', maxHeight: '92vh', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}
          >
            {/* Header */}
            <div className="modalHeader" style={{ borderBottom: '1px solid var(--line)', background: 'var(--bg-2)', padding: '16px 20px' }}>
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink)' }}>
                Solicitar diagnóstico gratuito
              </span>
              <button onClick={handleClose} aria-label="Cerrar modal" className="modalClose" style={{ fontSize: '20px', lineHeight: 1 }}>
                &times;
              </button>
            </div>

            {!success ? (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '24px 28px', color: 'var(--ink)' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label htmlFor="react_name" style={LABEL_STYLE}>
                    Nombre completo <span style={{ color: 'var(--rose)' }}>*</span>
                  </label>
                  <input
                    type="text"
                    id="react_name"
                    required
                    placeholder="ej. Juan Pérez"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={INPUT_STYLE}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <label htmlFor="react_contact" style={LABEL_STYLE}>
                      Email o WhatsApp <span style={{ color: 'var(--rose)' }}>*</span>
                    </label>
                    {contactMethod.trim().length > 0 && (
                      isEmail ? (
                        <span style={{ fontSize: '9px', color: '#6dffb2', fontFamily: 'JetBrains Mono, monospace', textTransform: 'uppercase', display: 'inline-flex', alignItems: 'center', gap: '3px', fontWeight: 'bold', background: 'rgba(109, 255, 178, 0.08)', padding: '2px 6px', borderRadius: '4px' }}>
                          ✓ Email
                        </span>
                      ) : isPhone ? (
                        <span style={{ fontSize: '9px', color: '#6dffb2', fontFamily: 'JetBrains Mono, monospace', textTransform: 'uppercase', display: 'inline-flex', alignItems: 'center', gap: '3px', fontWeight: 'bold', background: 'rgba(109, 255, 178, 0.08)', padding: '2px 6px', borderRadius: '4px' }}>
                          ✓ WhatsApp
                        </span>
                      ) : (
                        <span style={{ fontSize: '9px', color: '#ff6b6b', fontFamily: 'JetBrains Mono, monospace', textTransform: 'uppercase', display: 'inline-flex', alignItems: 'center', gap: '3px', background: 'rgba(255, 107, 107, 0.08)', padding: '2px 6px', borderRadius: '4px' }}>
                          ⚠ Inválido
                        </span>
                      )
                    )}
                  </div>
                  <input
                    type="text"
                    id="react_contact"
                    required
                    placeholder="ej. juan@correo.com o +593984937364"
                    value={contactMethod}
                    onChange={(e) => setContactMethod(e.target.value)}
                    style={INPUT_STYLE}
                  />
                  <span style={{ fontSize: '10px', color: 'var(--muted)', marginTop: '2px' }}>
                    Ingresa uno de los dos. Si usas WhatsApp, incluye el código de país.
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label htmlFor="react_project" style={LABEL_STYLE}>
                    Tipo de proyecto <span style={{ color: 'var(--rose)' }}>*</span>
                  </label>
                  <div style={{ position: 'relative' }}>
                    <select
                      id="react_project"
                      required
                      value={projectType}
                      onChange={(e) => setProjectType(e.target.value)}
                      style={SELECT_STYLE}
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
                  <label htmlFor="react_budget" style={LABEL_STYLE}>
                    Presupuesto aproximado{' '}
                    <span style={{ color: 'var(--muted)', fontSize: '9px' }}>(Opcional)</span>
                  </label>
                  <div style={{ position: 'relative' }}>
                    <select
                      id="react_budget"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      style={SELECT_STYLE}
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
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <label htmlFor="react_message" style={LABEL_STYLE}>
                      Mensaje breve <span style={{ color: 'var(--rose)' }}>*</span>
                    </label>
                    <span style={{ fontSize: '9px', color: message.length > 2000 ? '#ff6b6b' : 'var(--muted)', fontFamily: 'JetBrains Mono, monospace' }}>
                      {message.length} / 2000
                    </span>
                  </div>
                  <textarea
                    id="react_message"
                    required
                    rows={2}
                    maxLength={2000}
                    placeholder="ej. Necesito estructurar la web de mi negocio y automatizar reservas."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    style={{ ...INPUT_STYLE, fontFamily: 'inherit', resize: 'vertical', minHeight: '60px' }}
                  />
                </div>

                {error && (
                  <div style={{ color: '#ff6b6b', fontSize: '12px', marginTop: '4px' }}>{error}</div>
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
                  onClick={handleClose}
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
              color: 'var(--ink)',
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
    </>
  );
}
