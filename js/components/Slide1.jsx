/* ===================================================================
   COMPONENTS / SLIDE1.JSX - Capa (proposta original)
   =================================================================== */

import Orbs from './Orbs';
import WzLogo from './WzLogo';
import { PLANS, SPRINTS, TEAM } from '../data';

export default function Slide1({ cliente, diag }) {
  console.log('Slide1 received - cliente:', cliente);
  console.log('Slide1 received - diag:', diag);
  return (
    <div className="slide">
      <Orbs />
      <div
        className="slide-content"
        style={{ justifyContent: 'center', padding: '40px 80px' }}
      >
        <div className="au" style={{ marginBottom: 40 }}>
          <WzLogo size={34} />
        </div>
        <div className="au1" style={{ marginBottom: 10 }}>
          <span className="badge ba">Proposta Comercial</span>
        </div>
        <div className="au2" style={{ marginBottom: 8 }}>
          <h1
            style={{
              fontFamily: 'var(--font-h)',
              fontSize: 'clamp(2.6rem,5vw,4.8rem)',
              fontWeight: 800,
              lineHeight: 1.02,
              letterSpacing: '-.03em',
            }}
          >
            Da captação do lead<br />
            ao <span className="glow-text">crescimento</span><br />
            do aluno.
          </h1>
        </div>
        <div
          className="au3"
          style={{
            color: 'var(--muted)',
            fontSize: 16,
            lineHeight: 1.7,
            maxWidth: 560,
            marginBottom: 34,
          }}
        >
          A Wayzen entra dentro da sua operação e constrói: junto com você: o processo de
          aquisição, conversão e retenção de alunos. Presença real. Resultado mensurável.
        </div>
        <div
          className="au4"
          style={{
            padding: '22px 28px',
            background: 'linear-gradient(135deg,rgba(148,0,211,.12),rgba(204,0,255,.05))',
            border: '1px solid var(--accent-border)',
            borderRadius: 16,
            display: 'inline-block',
          }}
        >
          <div
            style={{
              fontSize: 12,
              color: 'var(--muted)',
              marginBottom: 6,
              letterSpacing: '.06em',
              textTransform: 'uppercase',
              fontWeight: 600,
            }}
          >
            Proposta preparada para
          </div>
          <div
            style={{
              fontFamily: 'var(--font-h)',
              fontWeight: 800,
              fontSize: 'clamp(1.4rem,2.5vw,2rem)',
              marginBottom: 4,
            }}
          >
            {cliente?.empresa || 'Sua empresa'}
          </div>
          <div style={{ fontSize: 13, color: 'var(--muted)' }}>
            {cliente?.decisor || 'Decisor'}
            {cliente?.cargo ? ` · ${cliente.cargo}` : ''}
            {cliente?.cidade ? ` · ${cliente.cidade}` : ''}
          </div>
          {diag?.produto && (
            <div
              style={{
                marginTop: 10,
                padding: '8px 10px',
                background: 'rgba(255,255,255,.03)',
                border: '1px solid var(--divider)',
                borderRadius: 10,
                fontSize: 12,
              }}
            >
              <span style={{ color: 'var(--accent2)', fontWeight: 700 }}>Foco:</span>{' '}
              {diag.produto}
              {diag?.meta ? ` · Meta: ${diag.meta}` : ''}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
