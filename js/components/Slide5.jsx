/* ===================================================================
   COMPONENTS / SLIDE5.JSX - O Que Instalamos
   =================================================================== */

import SlideShell from './SlideShell';
import Icon from './Icon';

export default function Slide5() {
  const solutions = [
    {
      icon: 'MessageSquare',
      title: 'CRM Inteligente',
      desc: 'Rastreamento automático de leads, pipeline e histórico completo',
    },
    {
      icon: 'Mail',
      title: 'Automação de Email',
      desc: 'Sequências de follow-up automáticas e newsletters segmentadas',
    },
    {
      icon: 'Phone',
      title: 'Integração WhatsApp',
      desc: 'Atendimento unificado e automação de mensagens',
    },
    {
      icon: 'BarChart3',
      title: 'Dashboard de Métricas',
      desc: 'Relatórios em tempo real de todos os indicadores-chave',
    },
    {
      icon: 'Users',
      title: 'Treinamento da Equipe',
      desc: 'Capacitação em vendas, atendimento e uso de ferramentas',
    },
    {
      icon: 'CheckCircle',
      title: 'Processos Documentados',
      desc: 'Scripts, playbooks e checklists para padronização',
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
          O Que Instalamos
        </h2>
        <div
          style={{
            fontSize: '1rem',
            color: 'rgba(255, 255, 255, .7)',
            marginBottom: 40,
          }}
        >
          Tecnologia + processos + gente capacitada
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 20,
          }}
        >
          {solutions.map((sol) => (
            <div
              key={sol.title}
              style={{
                padding: 24,
                background: 'rgba(255, 255, 255, .05)',
                border: '1px solid rgba(255, 255, 255, .1)',
                borderRadius: 16,
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
                  borderRadius: 12,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 16,
                }}
              >
                <Icon name={sol.icon} size={24} color="white" />
              </div>
              <h3
                style={{
                  fontSize: '1rem',
                  fontFamily: 'var(--font-h)',
                  fontWeight: 700,
                  color: 'white',
                  marginBottom: 8,
                }}
              >
                {sol.title}
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, .7)', lineHeight: 1.6 }}>
                {sol.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div
          style={{
            marginTop: 40,
            padding: '24px',
            background: 'linear-gradient(135deg, rgba(148, 0, 211, .15), rgba(204, 0, 255, .1))',
            border: '1px solid rgba(148, 0, 211, .3)',
            borderRadius: 16,
            textAlign: 'center',
          }}
        >
          <h4
            style={{
              fontSize: '1rem',
              fontFamily: 'var(--font-h)',
              fontWeight: 700,
              color: 'white',
              marginBottom: 8,
            }}
          >
            Tudo integrado em uma única plataforma
          </h4>
          <p style={{ fontSize: '0.95rem', color: 'rgba(255, 255, 255, .7)' }}>
            Sem complexidade, sem sobrecarga de ferramentas. Um sistema completo, pronto para
            usar.
          </p>
        </div>
      </div>
    </SlideShell>
  );
}
