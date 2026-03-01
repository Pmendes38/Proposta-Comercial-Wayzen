/* ===================================================================
   COMPONENTS / SLIDE9.JSX - Sprint 2 (Retenção)
   =================================================================== */

import SlideShell from './SlideShell';
import Icon from './Icon';

export default function Slide9() {
  const tasks = [
    {
      week: 'Semana 9-10',
      title: 'Redução de Churn',
      items: ['Processo de retenção', 'Comunicação preventiva', 'Programa de fidelização'],
      done: false,
    },
    {
      week: 'Semana 11-12',
      title: 'Aumento de LTV',
      items: ['Upsell & cross-sell', 'Programa de indicação', 'Análise de valor'],
      done: false,
    },
    {
      week: 'Semana 13-14',
      title: 'Experiência',
      items: ['NPS & feedback', 'Onboarding melhorado', 'Suporte estruturado'],
      done: false,
    },
    {
      week: 'Semana 15-16',
      title: 'Otimização Operacional',
      items: ['Processos escaláveis', 'Time treinado', 'Métricas em tempo real'],
      done: false,
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
          Sprint 2: Retenção & Crescimento
        </h2>
        <div
          style={{
            fontSize: '1rem',
            color: 'rgba(255, 255, 255, .7)',
            marginBottom: 40,
          }}
        >
          Próximas 8 semanas focadas em reduzir cancelamentos e aumentar valor por cliente
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: 16,
          }}
        >
          {tasks.map((task) => (
            <div
              key={task.week}
              style={{
                padding: 20,
                background: 'rgba(255, 255, 255, .05)',
                border: '1px solid rgba(255, 255, 255, .1)',
                borderRadius: 12,
                borderLeft: '4px solid var(--accent2)',
                display: 'grid',
                gridTemplateColumns: '140px 1fr',
                gap: 24,
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    color: 'var(--accent2)',
                    textTransform: 'uppercase',
                    letterSpacing: '.08em',
                    marginBottom: 6,
                  }}
                >
                  {task.week}
                </div>
                <h3
                  style={{
                    fontSize: '1.05rem',
                    fontFamily: 'var(--font-h)',
                    fontWeight: 700,
                    color: 'white',
                  }}
                >
                  {task.title}
                </h3>
              </div>
              <div
                style={{
                  display: 'flex',
                  gap: 12,
                  flexWrap: 'wrap',
                  alignContent: 'center',
                }}
              >
                {task.items.map((item) => (
                  <div
                    key={item}
                    style={{
                      padding: '6px 14px',
                      background: 'rgba(204, 0, 255, .15)',
                      border: '1px solid rgba(204, 0, 255, .3)',
                      borderRadius: 6,
                      fontSize: '0.85rem',
                      color: 'rgba(255, 255, 255, .8)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                    }}
                  >
                    <Icon name="Heart" size={14} color="var(--accent2)" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Resultado esperado */}
        <div
          style={{
            marginTop: 32,
            padding: '20px 24px',
            background: 'linear-gradient(135deg, rgba(0, 200, 100, .1), rgba(0, 168, 131, .08))',
            border: '1px solid rgba(0, 200, 100, .3)',
            borderRadius: 12,
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontSize: '0.9rem',
              fontWeight: 700,
              color: '#00c864',
              textTransform: 'uppercase',
              letterSpacing: '.08em',
              marginBottom: 8,
            }}
          >
            Resultado Esperado
          </div>
          <div
            style={{
              fontSize: '1.1rem',
              fontFamily: 'var(--font-h)',
              fontWeight: 700,
              color: 'white',
            }}
          >
            -40% no churn + +30% no LTV em 16 semanas
          </div>
        </div>
      </div>
    </SlideShell>
  );
}
