/* ===================================================================
   COMPONENTS / SLIDE8.JSX - Sprint 1 (Aquisição)
   =================================================================== */

import SlideShell from './SlideShell';
import Icon from './Icon';

export default function Slide8() {
  const tasks = [
    {
      week: 'Semana 1-2',
      title: 'Diagnóstico & Setup',
      items: ['Configuração do CRM', 'Integração de canais', 'Treinamento inicial'],
      done: false,
    },
    {
      week: 'Semana 3-4',
      title: 'Otimização de Lead',
      items: ['Scripts de atendimento', 'Funil de email', 'Automações WhatsApp'],
      done: false,
    },
    {
      week: 'Semana 5-6',
      title: 'Conversão',
      items: ['Propostas automáticas', 'Follow-up melhorado', 'Testes de preço'],
      done: false,
    },
    {
      week: 'Semana 7-8',
      title: 'Análise & Ajuste',
      items: ['Relatório de impacto', 'Otimizações', 'Planejamento Sprint 2'],
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
          Sprint 1: Aquisição
        </h2>
        <div
          style={{
            fontSize: '1rem',
            color: 'rgba(255, 255, 255, .7)',
            marginBottom: 40,
          }}
        >
          Primeira 8 semanas focadas em leads e conversão
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
                borderLeft: '4px solid var(--accent)',
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
                    color: 'var(--accent)',
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
                      background: 'rgba(148, 0, 211, .15)',
                      border: '1px solid rgba(148, 0, 211, .3)',
                      borderRadius: 6,
                      fontSize: '0.85rem',
                      color: 'rgba(255, 255, 255, .8)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                    }}
                  >
                    <Icon name="CheckCircle" size={14} color="var(--accent2)" />
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
            +25-40% na conversão de leads em 8 semanas
          </div>
        </div>
      </div>
    </SlideShell>
  );
}
