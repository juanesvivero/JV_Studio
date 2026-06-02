import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'JV Studio - Páginas web y sistemas digitales';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          background: '#070707',
          color: '#f1eee9',
          fontFamily: 'Inter, Arial, sans-serif',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(circle at 78% 12%, rgba(214,255,114,0.24), transparent 310px), radial-gradient(circle at 8% 86%, rgba(143,216,255,0.18), transparent 270px)',
          }}
        />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <div
              style={{
                width: 56,
                height: 56,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(214,255,114,0.5)',
                borderRadius: 12,
                color: '#d6ff72',
                fontSize: 26,
                fontWeight: 800,
              }}
            >
              JV
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <div style={{ fontSize: 28, fontWeight: 800 }}>JV Studio</div>
              <div style={{ fontSize: 18, color: '#a7a29b' }}>Ambato, Ecuador</div>
            </div>
          </div>
          <div style={{ color: '#d6ff72', fontSize: 22, fontWeight: 700 }}>Diseño digital claro</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 26, maxWidth: 900, zIndex: 1 }}>
          <div style={{ color: '#d6ff72', fontSize: 24, fontWeight: 800, letterSpacing: 3 }}>
            WEB / AUTOMATIZACION / DASHBOARDS
          </div>
          <div style={{ fontSize: 78, lineHeight: 1.02, fontWeight: 800, letterSpacing: -2 }}>
            Páginas web y sistemas digitales para negocios modernos.
          </div>
          <div style={{ maxWidth: 760, color: '#c9c4bd', fontSize: 30, lineHeight: 1.3 }}>
            Presencia digital clara para transmitir confianza, atender mejor y conseguir más clientes.
          </div>
        </div>
        <div style={{ display: 'flex', gap: 14, color: '#f1eee9', fontSize: 22, zIndex: 1 }}>
          <div style={{ padding: '14px 18px', border: '1px solid rgba(241,238,233,0.16)', borderRadius: 10 }}>
            Diseño web
          </div>
          <div style={{ padding: '14px 18px', border: '1px solid rgba(241,238,233,0.16)', borderRadius: 10 }}>
            Automatización
          </div>
          <div style={{ padding: '14px 18px', border: '1px solid rgba(241,238,233,0.16)', borderRadius: 10 }}>
            Métricas
          </div>
        </div>
      </div>
    ),
    size
  );
}
