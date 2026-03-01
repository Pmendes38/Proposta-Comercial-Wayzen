/* ===================================================================
   COMPONENTS / SLIDE2.JSX - Como Trabalhamos (proposta original)
   =================================================================== */

import SlideShell from './SlideShell';

export default function Slide2() {
  return (
    <SlideShell
      badge="Como trabalhamos"
      title={<>Não é consultoria. É <span className="glow-text">presença dentro</span> da sua operação.</>}
      subtitle="A diferença entre a Wayzen e uma consultoria comum é simples: a gente não entrega relatório e vai embora."
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 18 }}>
        <div style={{ display: 'grid', gap: 14 }}>
          {/* Presença badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '14px 18px',
              background: 'rgba(0,200,100,.06)',
              border: '1px solid rgba(0,200,100,.15)',
              borderRadius: 12,
            }}
          >
            <div className="presence-dot" />
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-h)',
                  fontWeight: 700,
                  fontSize: 15,
                  color: '#00c864',
                  marginBottom: 3,
                }}
              >
                Operação dentro da empresa
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: 'var(--muted)',
                  lineHeight: 1.6,
                }}
              >
                O consultor Wayzen está no dia a dia: alinhando a equipe, ajustando script,
                cobrando metas, resolvendo gargalo. Não é um e-mail por semana.
              </div>
            </div>
          </div>
          {[
            {
              t: 'Diagnóstico real, não formulário',
              d: 'A gente entra e observa: como o lead chega, quem atende, quanto tempo demora, o que acontece depois. O problema fica claro em 2 dias, não em 2 semanas.',
            },
            {
              t: 'Rotina instalada, não sugerida',
              d: 'Ritual diário (15 min), ritual semanal (30 min), fechamento mensal. A rotina existe porque a gente está lá para cobrar e ajustar.',
            },
            {
              t: 'Correção em tempo real',
              d: 'Quando o script não converte, a gente muda amanhã. Quando a equipe não segue o funil, a gente conversa no dia. Não espera o próximo relatório.',
            },
            {
              t: 'Saída com processo documentado',
              d: 'Quando o ciclo terminar, a operação roda sem a gente. Playbook, scripts, metas e governança ficam com você.',
            },
          ].map((x, i) => (
            <div key={i} className="card" style={{ borderRadius: 12 }}>
              <div
                style={{
                  fontFamily: 'var(--font-h)',
                  fontWeight: 800,
                  fontSize: 14,
                  marginBottom: 5,
                }}
              >
                {x.t}
              </div>
              <div style={{ color: 'var(--muted)', fontSize: 12, lineHeight: 1.7 }}>
                {x.d}
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: 'grid', gap: 14, alignContent: 'start' }}>
          <div
            style={{
              padding: '20px',
              background: 'var(--surface)',
              border: '1px solid var(--divider)',
              borderRadius: 14,
            }}
          >
            <div
              style={{
                fontSize: 11,
                letterSpacing: '.1em',
                textTransform: 'uppercase',
                color: 'var(--muted)',
                marginBottom: 14,
                fontWeight: 600,
              }}
            >
              O que muda na prática
            </div>
            {[
              {
                antes: 'Atendimento depende da memória do dono',
                depois: 'SLA de resposta e funil registrado',
              },
              {
                antes: 'Follow-up acontece quando lembra',
                depois: 'Cadência obrigatória com cobrança',
              },
              {
                antes: 'Taxa de conversão oscila sem explicação',
                depois: 'Script testado e otimizado semanalmente',
              },
              {
                antes: 'Não sabe quantos leads perdeu esse mês',
                depois: 'Painel com indicadores e motivos de perda',
              },
            ].map((x, i) => (
              <div
                key={i}
                style={{
                  padding: '10px 0',
                  borderBottom: '1px solid var(--divider)',
                }}
              >
                <div
                  style={{
                    fontSize: 11,
                    color: '#dc003c',
                    marginBottom: 3,
                    lineHeight: 1.5,
                  }}
                >
                  Antes: {x.antes}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: '#00c864',
                    lineHeight: 1.5,
                  }}
                >
                  Depois: {x.depois}
                </div>
              </div>
            ))}
          </div>
          <div
            style={{
              padding: '16px',
              background: 'linear-gradient(135deg,rgba(148,0,211,.08),rgba(204,0,255,.04))',
              border: '1px solid var(--accent-border)',
              borderRadius: 12,
              fontSize: 13,
              lineHeight: 1.7,
              color: 'var(--text)',
            }}
          >
            <span style={{ color: 'var(--accent2)', fontWeight: 700 }}>Em 4 semanas</span>{' '}
            a operação tem processo, rotina e previsibilidade. Não é mágica: é método executado de
            dentro.
          </div>
        </div>
      </div>
    </SlideShell>
  );
}
