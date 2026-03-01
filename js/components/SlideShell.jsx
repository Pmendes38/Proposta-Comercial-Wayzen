/* ===================================================================
   COMPONENTS / SLIDESHELL.JSX - Wrapper para Slides de Apresentação
   =================================================================== */

import Orbs from './Orbs';

export default function SlideShell({ badge, title, subtitle, children }) {
  return (
    <div className="slide" style={{ overflow: 'auto' }}>
      <Orbs />
      <div
        className="slide-content"
        style={{
          justifyContent: 'flex-start',
          padding: '32px 80px 80px',
          maxWidth: 1100,
          margin: '0 auto',
          width: '100%',
        }}
      >
        <div className="au" style={{ marginBottom: 8 }}>
          {badge && <span className="badge ba">{badge}</span>}
        </div>
        <h2
          className="au1"
          style={{
            fontFamily: 'var(--font-h)',
            fontSize: 'clamp(1.8rem, 3vw, 2.6rem)',
            fontWeight: 800,
            marginBottom: 8,
            letterSpacing: '-.02em',
          }}
        >
          {title}
        </h2>
        {subtitle && (
          <p
            className="au2"
            style={{
              color: 'var(--muted)',
              fontSize: 14,
              marginBottom: 24,
              lineHeight: 1.7,
            }}
          >
            {subtitle}
          </p>
        )}
        <div className="au3">{children}</div>
      </div>
    </div>
  );
}
