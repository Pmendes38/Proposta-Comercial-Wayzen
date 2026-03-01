/* ===================================================================
   COMPONENTS / SLIDE6.JSX - Casos de Sucesso
   =================================================================== */

import SlideShell from './SlideShell';
import Icon from './Icon';

export default function Slide6() {
  const cases = [
    {
      name: 'Escola ABC',
      time: 'Em 6 meses',
      metric: '+145% no ticket',
      detail: 'Levada de R$ 450 para R$ 1.100 por aluno',
      color: '#00c864',
    },
    {
      name: 'Curso XYZ',
      time: 'Em 4 meses',
      metric: '3x mais leads',
      detail: 'De 20 para 60 contatos qualificados por semana',
      color: '#00a883',
    },
    {
      name: 'Escola 123',
      time: 'Em 3 meses',
      metric: '-62% de churn',
      detail: 'Redução de cancelamentos de 8% para 3% ao mês',
      color: '#9400d3',
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
          Casos de Sucesso
        </h2>
        <div
          style={{
            fontSize: '1rem',
            color: 'rgba(255, 255, 255, .7)',
            marginBottom: 40,
          }}
        >
          Resultados reais em escolas como a sua
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 20,
            marginBottom: 40,
          }}
        >
          {cases.map((c) => (
            <div
              key={c.name}
              style={{
                padding: 28,
                background: 'rgba(255, 255, 255, .05)',
                border: '1px solid rgba(255, 255, 255, .1)',
                borderRadius: 16,
                borderLeft: `4px solid ${c.color}`,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Background accent */}
              <div
                style={{
                  position: 'absolute',
                  top: -80,
                  right: -80,
                  width: 160,
                  height: 160,
                  borderRadius: '50%',
                  background: `radial-gradient(circle, ${c.color}20, transparent)`,
                  zIndex: 0,
                }}
              />

              <div style={{ position: 'relative', zIndex: 1 }}>
                <div
                  style={{
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    color: c.color,
                    textTransform: 'uppercase',
                    letterSpacing: '.08em',
                    marginBottom: 4,
                  }}
                >
                  {c.time}
                </div>
                <h3
                  style={{
                    fontSize: '1rem',
                    fontFamily: 'var(--font-h)',
                    fontWeight: 700,
                    color: 'white',
                    marginBottom: 12,
                  }}
                >
                  {c.name}
                </h3>

                <div
                  style={{
                    padding: '12px 0',
                    borderTop: '1px solid rgba(255, 255, 255, .1)',
                    borderBottom: '1px solid rgba(255, 255, 255, .1)',
                    marginBottom: 12,
                  }}
                >
                  <div
                    style={{
                      fontSize: '1.6rem',
                      fontFamily: 'var(--font-h)',
                      fontWeight: 800,
                      color: c.color,
                      marginBottom: 4,
                    }}
                  >
                    {c.metric}
                  </div>
                </div>

                <p style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, .7)', lineHeight: 1.5 }}>
                  {c.detail}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Resumo */}
        <div
          style={{
            padding: '24px',
            background: 'rgba(255, 255, 255, .05)',
            border: '1px solid rgba(255, 255, 255, .1)',
            borderRadius: 16,
            display: 'flex',
            alignItems: 'center',
            gap: 16,
          }}
        >
          <Icon name="TrendingUp" size={32} color="var(--accent)" />
          <div>
            <div
              style={{
                fontSize: '1rem',
                fontFamily: 'var(--font-h)',
                fontWeight: 700,
                color: 'white',
                marginBottom: 4,
              }}
            >
              Impacto Médio
            </div>
            <div style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, .7)' }}>
              +R$ 180 mil em receita incremental nos primeiros 12 meses
            </div>
          </div>
        </div>
      </div>
    </SlideShell>
  );
}
