/* ===================================================================
   COMPONENTS / SLIDESHELL.JSX - Wrapper para Slides de Apresentação
   =================================================================== */

import Orbs from './Orbs';
import { useRef, useEffect } from 'react';

export default function SlideShell({ badge, title, subtitle, children }) {
  const contentRef = useRef(null);
  useEffect(() => {
    // quando o slide é montado, garanta que o scroll começa no topo
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, []);

  return (
    <div className="slide">
      <Orbs />
      <div
        ref={contentRef}
        className="slide-content"
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          padding: 'clamp(20px, 5vw, 80px)',
          maxWidth: 1200,
          margin: '0 auto',
          width: '100%',
          minHeight: '100%',
        }}
      >
        <div style={{ textAlign: 'center', width: '100%' }}>
          <div className="au" style={{ marginBottom: 12 }}>
            {badge && <span className="badge ba">{badge}</span>}
          </div>
          <h2
            className="au1"
            style={{
              fontFamily: 'var(--font-h)',
              fontSize: 'clamp(1.6rem, 4vw, 2.8rem)',
              fontWeight: 800,
              marginBottom: 12,
              letterSpacing: '-.02em',
              lineHeight: 1.1,
            }}
          >
            {title}
          </h2>
          {subtitle && (
            <p
              className="au2"
              style={{
                color: 'var(--muted)',
                fontSize: 'clamp(13px, 2vw, 16px)',
                marginBottom: 'clamp(20px, 4vw, 32px)',
                lineHeight: 1.7,
                maxWidth: 900,
                margin: '0 auto clamp(20px, 4vw, 32px)',
              }}
            >
              {subtitle}
            </p>
          )}
          <div className="au3" style={{ width: '100%' }}>{children}</div>
        </div>
      </div>
    </div>
  );
}
