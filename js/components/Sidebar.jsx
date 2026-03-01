/* ===================================================================
   COMPONENTS / SIDEBAR.JSX - Barra Lateral de Navegação
   =================================================================== */

import WzLogo from './WzLogo';
import Icon from './Icon';
import { PLANS } from '../data';

export default function Sidebar({ client, diag, plan, phase, onPhase }) {
  const pl = PLANS.find((p) => p.id === plan);
  const sections = [
    { id: 'ident', label: 'Identificação', done: !!(client.empresa && client.decisor) },
    { id: 'foco', label: 'Foco e Contexto', done: !!(diag?.produto) },
    { id: 'diag', label: 'Diagnóstico', done: !!(diag.ticket) },
  ];

  return (
    <div className="sidebar no-print" style={{ padding: 0 }}>
      <div style={{ padding: '20px 18px', borderBottom: '1px solid var(--divider)' }}>
        <WzLogo size={22} />
      </div>

      {client.empresa && (
        <div style={{ padding: '16px 18px', borderBottom: '1px solid var(--divider)' }}>
          <div
            style={{
              fontSize: 10,
              letterSpacing: '.1em',
              textTransform: 'uppercase',
              color: 'var(--muted)',
              marginBottom: 6,
              fontWeight: 600,
            }}
          >
            Proposta para
          </div>
          <div style={{ fontFamily: 'var(--font-h)', fontWeight: 800, fontSize: 15, marginBottom: 2 }}>
            {client.empresa}
          </div>
          {client.decisor && (
            <div style={{ fontSize: 12, color: 'var(--muted)' }}>
              {client.decisor}
              {client.cargo ? ` · ${client.cargo}` : ''}
            </div>
          )}
          {client.produto && (
            <div
              style={{
                marginTop: 8,
                padding: '7px 10px',
                background: 'var(--accent-soft)',
                borderRadius: 6,
                fontSize: 11,
                lineHeight: 1.5,
              }}
            >
              <span style={{ color: 'var(--accent2)', fontWeight: 600 }}>Foco:</span> {client.produto}
            </div>
          )}
        </div>
      )}

      <div style={{ padding: '16px 18px', flex: 1 }}>
        <div
          style={{
            fontSize: 10,
            letterSpacing: '.1em',
            textTransform: 'uppercase',
            color: 'var(--muted)',
            marginBottom: 10,
            fontWeight: 600,
          }}
        >
          Formulário
        </div>
        {sections.map((s, i) => (
          <div
            key={s.id}
            className={`sn-item ${phase === s.id ? 'active' : ''}`}
            onClick={() => onPhase(s.id)}
          >
            <div
              className="sn-num"
              style={{
                background: s.done
                  ? 'rgba(0, 200, 100, .15)'
                  : phase === s.id
                    ? 'var(--accent-soft)'
                    : 'rgba(255, 255, 255, .05)',
                border: `1px solid ${
                  s.done ? '#00c864' : phase === s.id ? 'var(--accent-border)' : 'var(--divider)'
                }`,
                color: s.done ? '#00c864' : phase === s.id ? 'var(--accent2)' : 'var(--muted)',
              }}
            >
              {s.done && phase !== s.id ? <Icon n="ck" s={9} c="#00c864" /> : <span>{i + 1}</span>}
            </div>
            <span
              style={{
                fontSize: 12,
                fontWeight: 500,
                color: phase === s.id ? 'var(--text)' : 'var(--muted)',
              }}
            >
              {s.label}
            </span>
          </div>
        ))}
      </div>

      {plan && (
        <div style={{ padding: '12px 18px', borderTop: '1px solid var(--divider)' }}>
          <div
            style={{
              fontSize: 10,
              letterSpacing: '.1em',
              textTransform: 'uppercase',
              color: 'var(--muted)',
              marginBottom: 6,
              fontWeight: 600,
            }}
          >
            Plano
          </div>
          <div
            style={{
              fontFamily: 'var(--font-h)',
              fontWeight: 700,
              fontSize: 13,
              color: 'var(--accent2)',
            }}
          >
            {pl?.label}
          </div>
          <div style={{ fontSize: 12, color: 'var(--muted)' }}>
            {pl?.taxa} + {pl?.loa}% LOA
          </div>
        </div>
      )}
    </div>
  );
}
