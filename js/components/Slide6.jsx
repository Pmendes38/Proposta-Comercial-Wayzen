/* ===================================================================
   COMPONENTS / SLIDE6.JSX - CASES / RESULTADOS REAIS
   =================================================================== */

import SlideShell from './SlideShell';
import Icon from './Icon';
import { PLANS, SPRINTS, TEAM } from '../data';

export default function Slide6() {
  const cases = [
    {
      empresa: 'Instituição de Ensino',
      resultado: 'de 100 vendas/ano para 500 em 2 meses',
      desc: 'Assumimos o atendimento, reativamos a base e instalamos follow-up com playbook e metas diárias. O time passou a bater meta pela primeira vez.',
    },
    {
      empresa: 'Serviço local (alto ticket)',
      resultado: 'Mais fechamentos com o mesmo volume de leads',
      desc: 'Ajuste de script e qualificação de leads. Menos proposta perdida por demora e mais urgência real no processo de fechamento.',
    },
    {
      empresa: 'Negócio recorrente',
      resultado: 'Redução de vazamento e aumento de retenção',
      desc: 'Padronização de jornada de onboarding e rotina de reativação. Desistência caiu e o NPS subiu em 8 semanas de operação.',
    },
  ];

  return (
    <SlideShell
      badge="Resultados reais"
      title={
        <>
          Resultado não vem de sorte. Vem de <span className="glow-text">processo dentro da
          operação</span>.
        </>
      }
      subtitle="A gente entra, instala a rotina e mede. O que funciona vira padrão."
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14, marginBottom: 14 }}>
        {cases.map((c, i) => (
          <div
            key={i}
            className="card"
            style={{ borderRadius: 16, position: 'relative', overflow: 'hidden' }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(450px 220px at 20% 0%,rgba(148,0,211,.10),transparent 60%)',
                pointerEvents: 'none',
              }}
            />
            <div style={{ position: 'relative' }}>
              <div
                style={{
                  fontSize: 11,
                  letterSpacing: '.1em',
                  textTransform: 'uppercase',
                  color: 'var(--muted)',
                  fontWeight: 600,
                  marginBottom: 8,
                }}
              >
                {c.empresa}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-h)',
                  fontWeight: 900,
                  fontSize: 17,
                  marginBottom: 10,
                  lineHeight: 1.3,
                }}
              >
                {c.resultado}
              </div>
              <div style={{ color: 'var(--muted)', fontSize: 12, lineHeight: 1.7 }}>{c.desc}</div>
            </div>
          </div>
        ))}
      </div>
      <div
        style={{
          padding: '12px 16px',
          background: 'rgba(255,255,255,.03)',
          border: '1px solid var(--divider)',
          borderRadius: 12,
          fontSize: 12,
          color: 'var(--muted)',
          lineHeight: 1.7,
        }}
      >
        Tudo o que foi feito ficou documentado: playbook, scripts e governança. O objetivo é
        sempre tornar o processo repetível: com ou sem a Wayzen presente.
      </div>
    </SlideShell>
  );
}
