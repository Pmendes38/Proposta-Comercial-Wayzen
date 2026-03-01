/* ===================================================================
  COMPONENTS / SLIDE8.JSX - PROCESSO EM 4 SPRINTS
  =================================================================== */
/* ===================================================================
   COMPONENTS / SLIDE8.JSX - Sprint 1 (Aquisição)
   =================================================================== */

import { useState } from 'react';
import SlideShell from './SlideShell';
import Ic from './Icon';
import { PLANS, SPRINTS, TEAM } from '../data';

export default function Slide8() {
  const [act, setAct] = useState(0);
  return (
    <SlideShell
      badge="Processo em 4 sprints"
      title={<>Quatro semanas para <span className="glow-text">instalar o processo</span>.</>}
      subtitle="Cada sprint tem entregáveis claros. A operação sai documentada, com rotinas e equipe treinada."
    >
      <div className="tl" style={{ marginBottom: 18 }}>
        {SPRINTS.map((s, i) => (
          <div key={s.n} className="tl-item" onClick={() => setAct(i)} style={{ cursor: 'pointer' }}>
            <div className={`tl-dot ${act === i ? 'act' : ''}`}>{s.n}</div>
            <div
              style={{
                marginTop: 10,
                fontSize: 11,
                color: act === i ? 'var(--text)' : 'var(--muted)',
                fontWeight: 700,
                textAlign: 'center',
                maxWidth: 150,
              }}
            >
              {s.titulo}
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <div className="card" style={{ borderRadius: 16 }}>
          <div style={{ fontFamily: 'var(--font-h)', fontWeight: 900, fontSize: 18, marginBottom: 8 }}>
            {SPRINTS[act].titulo}
          </div>
          <div style={{ color: 'var(--muted)', fontSize: 12, lineHeight: 1.7 }}>
            {SPRINTS[act].texto}
          </div>
          <div className="divider" style={{ margin: '14px 0' }} />
          <div
            style={{
              fontSize: 11,
              letterSpacing: '.1em',
              textTransform: 'uppercase',
              color: 'var(--muted)',
              marginBottom: 10,
              fontWeight: 700,
            }}
          >
            Entregáveis
          </div>
          {SPRINTS[act].entregaveis.map((t, i) => (
            <div key={i} className="ci">
              <div className="ci-icon">
                <Ic n="ck" s={11} c="var(--accent2)" />
              </div>
              <div style={{ fontSize: 12, color: 'var(--text)', lineHeight: 1.6 }}>{t}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'grid', gap: 12 }}>
          {[
            {
              t: 'Ritual diário (15 min)',
              d: 'Metas do dia, revisão rápida do funil e priorização dos follow-ups mais quentes.',
            },
            {
              t: 'Ritual semanal (30–45 min)',
              d: 'Números da semana, gargalos identificados, testes e plano da próxima semana.',
            },
            {
              t: 'Ritual mensal (60 min)',
              d: 'Fechamento do mês, LOA, decisões estratégicas e metas do próximo ciclo.',
            },
          ].map((x, i) => (
            <div key={i} className="card" style={{ borderRadius: 14 }}>
              <div style={{ fontFamily: 'var(--font-h)', fontWeight: 900, fontSize: 14, marginBottom: 4 }}>
                {x.t}
              </div>
              <div style={{ color: 'var(--muted)', fontSize: 12, lineHeight: 1.7 }}>{x.d}</div>
            </div>
          ))}
          <div
            className="card"
            style={{
              borderRadius: 14,
              borderColor: 'var(--accent-border)',
              background: 'linear-gradient(135deg,rgba(148,0,211,.06),transparent)',
            }}
          >
            <div style={{ fontFamily: 'var(--font-h)', fontWeight: 900, fontSize: 14, marginBottom: 4 }}>
              Governança e transferência
            </div>
            <div style={{ color: 'var(--muted)', fontSize: 12, lineHeight: 1.7 }}>
              No fim do ciclo, tudo vira playbook: scripts, funil, metas e regras. Você decide se continua com Wayzen ou internaliza com treinamento.
            </div>
          </div>
        </div>
      </div>
    </SlideShell>
  );

}
