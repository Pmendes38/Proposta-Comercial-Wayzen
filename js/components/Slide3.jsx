/* ===================================================================
   COMPONENTS / SLIDE3.JSX - Jornada do Cliente
   =================================================================== */

import SlideShell from './SlideShell';
import Icon from './Icon';

export default function Slide3() {
  const stages = [
    {
      label: 'Consciência',
      icon: 'Eye',
      color: '#9400d3',
      examples: ['Busca orgânica', 'Redes sociais', 'Indicações'],
    },
    {
      label: 'Interesse',
      icon: 'Heart',
      color: '#cc00ff',
      examples: ['Newsletter', 'Webinar', 'Conteúdo'],
    },
    {
      label: 'Decisão',
      icon: 'CheckCircle',
      color: '#00c864',
      examples: ['Demonstração', 'Proposta', 'Negociação'],
    },
    {
      label: 'Fidelização',
      icon: 'Award',
      color: '#00a883',
      examples: ['Suporte', 'Comunidade', 'Upgrade'],
    },
  ];

  return (
    <SlideShell>
      <div style={{ maxWidth: 1000 }}>
        <h2
          style={{
            fontSize: '2.4rem',
            fontFamily: 'var(--font-h)',
            fontWeight: 800,
            marginBottom: 12,
            color: 'white',
          }}
        >
          A Jornada do Cliente
        </h2>
        <div
          style={{
            fontSize: '1rem',
            color: 'rgba(255, 255, 255, .7)',
            marginBottom: 48,
          }}
        >
          Onde otimizamos a aquisição e a retenção
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 20,
            marginBottom: 40,
          }}
        >
          {stages.map((stage, idx) => (
            <div key={stage.label}>
              {/* Cards */}
              <div
                style={{
                  padding: 24,
                  background: `rgba(${parseInt(stage.color.slice(1, 3), 16)}, ${parseInt(stage.color.slice(3, 5), 16)}, ${parseInt(stage.color.slice(5, 7), 16)}, .08)`,
                  border: `1px solid ${stage.color}40`,
                  borderRadius: 16,
                  marginBottom: 12,
                  textAlign: 'center',
                }}
              >
                <Icon name={stage.icon} size={32} color={stage.color} style={{ marginBottom: 12 }} />
                <h3
                  style={{
                    fontSize: '1.05rem',
                    fontFamily: 'var(--font-h)',
                    fontWeight: 700,
                    color: 'white',
                    marginBottom: 12,
                  }}
                >
                  {stage.label}
                </h3>
                <div style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, .6)', lineHeight: 1.6 }}>
                  {stage.examples.map((ex, i) => (
                    <div key={i}>{ex}</div>
                  ))}
                </div>
              </div>

              {/* Seta para o próximo stage */}
              {idx < stages.length - 1 && (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    padding: '12px 0',
                    color: 'rgba(255, 255, 255, .3)',
                  }}
                >
                  <Icon name="ArrowRight" size={20} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Resumo */}
        <div
          style={{
            padding: 24,
            background: 'linear-gradient(135deg, rgba(148, 0, 211, .15), rgba(204, 0, 255, .1))',
            border: '1px solid rgba(148, 0, 211, .3)',
            borderRadius: 16,
          }}
        >
          <h4
            style={{
              fontSize: '1rem',
              fontWeight: 700,
              color: 'white',
              marginBottom: 8,
            }}
          >
            Otimizações Por Estágio
          </h4>
          <p style={{ fontSize: '0.95rem', color: 'rgba(255, 255, 255, .7)', lineHeight: 1.6 }}>
            Diagnosticamos em cada etapa onde estão as perdas e ineficiências. Desde o primeiro
            toque (lead) até a retenção de longo prazo, temos ações comprovadas de otimização.
          </p>
        </div>
      </div>
    </SlideShell>
  );
}
