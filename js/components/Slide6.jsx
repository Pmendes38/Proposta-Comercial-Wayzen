/* ===================================================================
   COMPONENTS / SLIDE6.JSX - CASE DE SUCESSO FACEV
   =================================================================== */

import SlideShell from './SlideShell';

export default function Slide6() {
  const contextPoints = [
    'A FACEV já gerava demanda por Instagram, tráfego pago, site e WhatsApp.',
    'A equipe de atendimento era administrativa, sem formação comercial e sem playbook.',
    'Sem processo, o esforço de marketing virava desperdício de oportunidade e receita.',
  ];

  const solutionPillars = [
    'Prioridade de resposta e triagem para lead quente.',
    'Funil com etapas, critérios de avanço e controle diário.',
    'Script de qualificação e condução até matrícula.',
    'Cadência de follow-up para recuperar oportunidades.',
  ];

  const leaks = [
    'Resposta lenta: leads quentes aguardavam horas ou dias.',
    'Sem processo de conversão: atendimento reativo e sem roteiro.',
    'Sem follow-up: oportunidades eram perdidas após o primeiro contato.',
  ];

  const timeline = [
    { etapa: 'Semana 1', acao: 'Diagnóstico completo da jornada comercial e mapeamento dos vazamentos.' },
    { etapa: 'Semana 2', acao: 'Implantação do funil comercial com etapas claras e registro obrigatório.' },
    { etapa: 'Semana 3', acao: 'Playbook, scripts e treinamento da equipe para condução de matrícula.' },
    { etapa: 'Semana 4', acao: 'Rotina de gestão com indicadores, rituais e acompanhamento semanal.' },
  ];

  const metrics = [
    { label: 'Leads/mês', antes: '450', depois: '600', impacto: '+33%' },
    { label: 'Tempo de resposta', antes: 'Dias', depois: '90 min', impacto: 'queda drástica' },
    { label: 'Matrículas/mês', antes: '< 60', depois: '250', impacto: '+4x' },
  ];

  return (
    <SlideShell
      badge="Case de sucesso · FACEV"
      title={
        <>
          FACEV: de operação reativa para uma{' '}
          <span className="glow-text">máquina previsível de matrículas</span>.
        </>
      }
      subtitle="Em 4 semanas presenciais, a Wayzen estruturou o comercial da FACEV com funil, scripts, treinamento e gestão por indicadores."
    >
      <div
        className="card"
        style={{
          borderRadius: 16,
          marginBottom: 'clamp(12px, 2vw, 20px)',
          textAlign: 'left',
          background: 'linear-gradient(135deg,rgba(148,0,211,.10),transparent)',
          borderColor: 'var(--accent-border)',
        }}
      >
        <div
          style={{
            fontSize: 13,
            letterSpacing: '.1em',
            textTransform: 'uppercase',
            color: 'var(--muted)',
            fontWeight: 700,
            marginBottom: 8,
          }}
        >
          Cenário inicial da FACEV
        </div>
        <div style={{ fontFamily: 'var(--font-h)', fontWeight: 900, fontSize: 22, marginBottom: 8 }}>
          Faculdade Evangélica de Valparaíso (FACEV)
        </div>
        <div style={{ color: 'var(--muted)', fontSize: 15, lineHeight: 1.75 }}>
          A instituição tinha estrutura, marca e demanda, mas não tinha método comercial: atendimento
          reativo, sem funil, sem script, sem follow-up e sem controle de conversão.
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 'clamp(12px, 2vw, 20px)',
          marginBottom: 'clamp(12px, 2vw, 20px)',
        }}
      >
        <div className="card" style={{ borderRadius: 16, textAlign: 'left' }}>
          <div
            style={{
              fontSize: 13,
              letterSpacing: '.1em',
              textTransform: 'uppercase',
              color: 'var(--muted)',
              fontWeight: 700,
              marginBottom: 10,
            }}
          >
            Por que a operação travava
          </div>
          <div style={{ display: 'grid', gap: 8 }}>
            {contextPoints.map((item, i) => (
              <div
                key={i}
                style={{
                  padding: '10px 12px',
                  background: 'rgba(255,255,255,.03)',
                  border: '1px solid var(--divider)',
                  borderRadius: 10,
                  fontSize: 14,
                  color: 'var(--muted)',
                  lineHeight: 1.65,
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <div
          className="card"
          style={{
            borderRadius: 16,
            textAlign: 'left',
            borderColor: 'var(--accent-border)',
            background: 'linear-gradient(135deg,rgba(148,0,211,.08),transparent)',
          }}
        >
          <div
            style={{
              fontSize: 13,
              letterSpacing: '.1em',
              textTransform: 'uppercase',
              color: 'var(--muted)',
              fontWeight: 700,
              marginBottom: 10,
            }}
          >
            Como a Wayzen destravou
          </div>
          <div style={{ display: 'grid', gap: 8 }}>
            {solutionPillars.map((item, i) => (
              <div
                key={i}
                style={{
                  padding: '10px 12px',
                  background: 'rgba(148,0,211,.08)',
                  border: '1px solid var(--accent-border)',
                  borderRadius: 10,
                  fontSize: 14,
                  color: 'var(--text)',
                  lineHeight: 1.65,
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 'clamp(12px, 2vw, 20px)',
          marginBottom: 'clamp(12px, 2vw, 20px)',
        }}
      >
        <div className="card" style={{ borderRadius: 16, textAlign: 'left' }}>
          <div
            style={{
              fontSize: 13,
              letterSpacing: '.1em',
              textTransform: 'uppercase',
              color: 'var(--muted)',
              fontWeight: 700,
              marginBottom: 10,
            }}
          >
            Diagnóstico da operação FACEV
          </div>
          <div style={{ display: 'grid', gap: 8 }}>
            {leaks.map((item, i) => (
              <div
                key={i}
                style={{
                  padding: '10px 12px',
                  background: 'rgba(255,255,255,.03)',
                  border: '1px solid var(--divider)',
                  borderRadius: 10,
                  fontSize: 14,
                  color: 'var(--muted)',
                  lineHeight: 1.65,
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="card" style={{ borderRadius: 16, textAlign: 'left' }}>
          <div
            style={{
              fontSize: 13,
              letterSpacing: '.1em',
              textTransform: 'uppercase',
              color: 'var(--muted)',
              fontWeight: 700,
              marginBottom: 10,
            }}
          >
            Implantação Wayzen (4 semanas)
          </div>
          <div style={{ display: 'grid', gap: 8 }}>
            {timeline.map((item, i) => (
              <div
                key={i}
                style={{
                  padding: '10px 12px',
                  background: 'rgba(148,0,211,.08)',
                  border: '1px solid var(--accent-border)',
                  borderRadius: 10,
                  fontSize: 14,
                  color: 'var(--text)',
                  lineHeight: 1.65,
                }}
              >
                <span style={{ color: 'var(--accent2)', fontWeight: 700 }}>{item.etapa}:</span>{' '}
                {item.acao}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 'clamp(10px, 1.8vw, 16px)',
          marginBottom: 'clamp(12px, 2vw, 20px)',
        }}
      >
        {metrics.map((m, i) => (
          <div
            key={i}
            className="card"
            style={{ borderRadius: 16, position: 'relative', overflow: 'hidden', textAlign: 'left' }}
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
                  fontSize: 13,
                  letterSpacing: '.1em',
                  textTransform: 'uppercase',
                  color: 'var(--muted)',
                  fontWeight: 600,
                  marginBottom: 10,
                }}
              >
                {m.label}
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 4 }}>
                <span style={{ fontSize: 13, color: 'var(--muted)', textTransform: 'uppercase' }}>Antes</span>
                <span style={{ fontFamily: 'var(--font-h)', fontWeight: 800, fontSize: 20 }}>{m.antes}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 8 }}>
                <span style={{ fontSize: 13, color: 'var(--muted)', textTransform: 'uppercase' }}>Depois</span>
                <span
                  style={{
                    fontFamily: 'var(--font-h)',
                    fontWeight: 900,
                    fontSize: 26,
                    color: 'var(--accent2)',
                  }}
                >
                  {m.depois}
                </span>
              </div>
              <div
                style={{
                  display: 'inline-flex',
                  padding: '4px 9px',
                  borderRadius: 999,
                  border: '1px solid var(--accent-border)',
                  background: 'rgba(148,0,211,.12)',
                  color: 'var(--accent2)',
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: '.04em',
                  textTransform: 'uppercase',
                }}
              >
                {m.impacto}
              </div>
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
          fontSize: 14,
          color: 'var(--muted)',
          lineHeight: 1.75,
        }}
      >
        <span style={{ color: 'var(--text)', fontWeight: 700 }}>Conclusão do case FACEV:</span> a
        instituição não precisava de mais lead para crescer: precisava de processo comercial. Com
        estrutura, rotina e gestão, o crescimento saiu do improviso e virou previsibilidade.
      </div>
    </SlideShell>
  );
}
