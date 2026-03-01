/* ===================================================================
   COMPONENTS / SLIDE2.JSX - Como Funciona
   =================================================================== */

import SlideShell from './SlideShell';
import Icon from './Icon';

export default function Slide2() {
  const steps = [
    {
      num: 1,
      title: 'Diagnóstico',
      desc: 'Análise profunda de aquisição, base, LTV, operação e experiência.',
      icon: 'BarChart3',
    },
    {
      num: 2,
      title: 'Relatório',
      desc: 'Identificação dos gargalos reais e oportunidades não exploradas.',
      icon: 'FileText',
    },
    {
      num: 3,
      title: 'Estratégia',
      desc: 'Plano de ação estruturado em sprints com foco em crescimento.',
      icon: 'Target',
    },
    {
      num: 4,
      title: 'Execução',
      desc: 'Implementação acompanhada do projeto com métricas e ajustes.',
      icon: 'Zap',
    },
  ];

  return (
    <SlideShell>
      <div style={{ maxWidth: 900 }}>
        <h2
          style={{
            fontSize: '2.4rem',
            fontFamily: 'var(--font-h)',
            fontWeight: 800,
            marginBottom: 12,
            color: 'white',
          }}
        >
          Como funciona
        </h2>
        <div
          style={{
            fontSize: '1rem',
            color: 'rgba(255, 255, 255, .7)',
            marginBottom: 40,
          }}
        >
          Processo comprovado em centenas de escolas
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          {steps.map((step) => (
            <div
              key={step.num}
              style={{
                padding: 24,
                background: 'rgba(255, 255, 255, .05)',
                border: '1px solid rgba(255, 255, 255, .1)',
                borderRadius: 16,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Número do passo */}
              <div
                style={{
                  position: 'absolute',
                  top: 12,
                  right: 12,
                  width: 50,
                  height: 50,
                  background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
                  borderRadius: 12,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-h)',
                  fontWeight: 800,
                  fontSize: '1.8rem',
                  color: 'white',
                  opacity: 0.8,
                }}
              >
                {step.num}
              </div>

              {/* Conteúdo */}
              <div style={{ paddingRight: 70 }}>
                <div style={{ marginBottom: 12, display: 'flex', alignItems: 'center', gap: 12 }}>
                  <Icon name={step.icon} size={24} color="var(--accent)" />
                  <h3
                    style={{
                      fontSize: '1.1rem',
                      fontFamily: 'var(--font-h)',
                      fontWeight: 700,
                      color: 'white',
                    }}
                  >
                    {step.title}
                  </h3>
                </div>
                <p style={{ fontSize: '0.95rem', color: 'rgba(255, 255, 255, .7)', lineHeight: 1.6 }}>
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SlideShell>
  );
}
