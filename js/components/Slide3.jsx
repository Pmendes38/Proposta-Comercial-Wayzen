/* ===================================================================
   COMPONENTS / SLIDE3.JSX - Jornada do Cliente
   =================================================================== */
import { useState } from 'react';
import SlideShell from './SlideShell';
import Icon from './Icon';
import { PLANS, SPRINTS, TEAM } from '../data';

export default function Slide3({ cliente, diag }) {
  const [active, setActive] = useState(1);
  const stages = [
    {
      id: 0,
      label: 'Captação',
      icon: '📣',
      color: '#00b4ff',
      border: 'rgba(0,180,255,.3)',
      bg: 'rgba(0,180,255,.06)',
      title: 'Criação de Demanda Qualificada',
      sub: 'Especialista em marketing',
      desc: 'Tráfego pago, conteúdo estratégico e posicionamento de oferta. O objetivo é gerar o lead certo: aquele que tem intenção real: com o menor custo possível.',
      items: [
        'Campanhas de tráfego pago (Meta, Google)',
        'Segmentação e qualificação de público',
        'Otimização de custo por lead',
        'Landing pages e captura de contatos',
        'Relatório de fonte de leads e CAC',
      ],
    },
    {
      id: 1,
      label: 'Conversão',
      icon: '🎯',
      color: 'var(--accent2)',
      border: 'var(--accent-border)',
      bg: 'var(--accent-soft)',
      title: 'Do Lead ao Aluno Matriculado',
      sub: 'Operação comercial em campo',
      desc: 'Funil, script, SLA de resposta, follow-up e gestão de funil. A gente entra na operação e faz o lead virar aluno com processo, não com improviso.',
      items: [
        'Script de abordagem e matriz de objeções',
        'SLA de 1ª resposta (<5 min no horário comercial)',
        'Cadência de follow-up com no mínimo 5 touchpoints',
        'Funil com etapas e registro obrigatório',
        'Metas de conversão e painel semanal',
      ],
    },
    {
      id: 2,
      label: 'Crescimento de LTV',
      icon: '📈',
      color: '#00c864',
      border: 'rgba(0,200,100,.3)',
      bg: 'rgba(0,200,100,.06)',
      title: 'Retenção e Aumento de Receita por Aluno',
      sub: 'Gestor especialista em educação',
      desc: 'Com o aluno matriculado, o trabalho de crescimento começa. A Wayzen atua ativamente na retenção da base, na redução de churn e na ativação de indicação estruturada para transformar cada aluno num promotor da escola.',
      items: [
        'Onboarding estruturado com régua de boas-vindas',
        'Pesquisa de NPS periódica e recuperação de detratores',
        'Programa de indicação ativo com incentivos definidos',
        'Upsell de planos e produtos complementares',
        'Régua de reativação de alunos inativos',
      ],
    },
  ];
  const s = stages[active];

  return (
    <SlideShell
      badge="Nossa jornada"
      title={<>Atuamos em <span className="glow-text">toda a jornada</span> do aluno.</>}
      subtitle={`Da captação do primeiro lead ao aumento do LTV: cada fase tem um especialista dedicado.${diag?.produto?` Foco atual: ${diag.produto}.`:''}`}
    >
      {/* Stage tabs */}
      <div
        style={{
          display: 'flex',
          gap: 0,
          marginBottom: 20,
          borderRadius: 12,
          overflow: 'hidden',
          border: '1px solid var(--divider)',
          background: 'var(--surface2)',
        }}
      >
        {stages.map((st) => (
          <button
            key={st.id}
            onClick={() => setActive(st.id)}
            style={{
              flex: 1,
              padding: '14px 8px',
              background: active === st.id ? st.bg : 'transparent',
              border: 'none',
              borderRight: st.id < 2 ? '1px solid var(--divider)' : 'none',
              cursor: 'pointer',
              transition: 'all .2s',
              position: 'relative',
            }}
          >
            {active === st.id && (
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 2,
                  background: `linear-gradient(90deg,${st.color},transparent)`,
                }}
              />
            )}
            <div style={{ fontSize: 18, marginBottom: 4 }}>{st.icon}</div>
            <div
              style={{
                fontFamily: 'var(--font-h)',
                fontWeight: 700,
                fontSize: 12,
                color: active === st.id ? st.color : 'var(--muted)',
              }}
            >
              {st.label}
            </div>
          </button>
        ))}
      </div>
      {/* Active stage detail */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, animation: 'fadeIn .3s ease both' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: s.bg,
                border: `1px solid ${s.border}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 22,
              }}
            >
              {s.icon}
            </div>
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-h)',
                  fontWeight: 800,
                  fontSize: 18,
                  color: s.color,
                }}
              >
                {s.title}
              </div>
              <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>{s.sub}</div>
            </div>
          </div>
          <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.8, marginBottom: 16 }}>
            {s.desc}
          </p>
        </div>
        <div>
          <div
            style={{
              fontSize: 11,
              letterSpacing: '.1em',
              textTransform: 'uppercase',
              color: 'var(--muted)',
              marginBottom: 12,
              fontWeight: 600,
            }}
          >
            O que entra nessa fase
          </div>
          <div style={{ display: 'grid', gap: 8 }}>
            {s.items.map((item, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 10,
                  padding: '10px 12px',
                  background: 'rgba(255,255,255,.03)',
                  border: '1px solid var(--divider)',
                  borderRadius: 8,
                }}
              >
                <div
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: 50,
                    background: s.color,
                    marginTop: 5,
                    flexShrink: 0,
                  }}
                />
                <div style={{ fontSize: 12, color: 'var(--text)', lineHeight: 1.5 }}>{item}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SlideShell>
  );
}
