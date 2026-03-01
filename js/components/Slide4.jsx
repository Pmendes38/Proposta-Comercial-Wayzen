/* ===================================================================
   COMPONENTS / SLIDE4.JSX - Time
   =================================================================== */

import SlideShell from './SlideShell';
import Icon from './Icon';

export default function Slide4() {
  const team = [
    {
      name: 'Especialista em Aquisição',
      desc: 'Otimiza leads, conversão e velocidade de vendas',
      icon: 'Users',
    },
    {
      name: 'Analista de Dados',
      desc: 'Mede, testa e prova impacto de cada ação',
      icon: 'BarChart3',
    },
    {
      name: 'Consultor de Retenção',
      desc: 'Reduz cancelamentos e aumenta LTV',
      icon: 'Heart',
    },
    {
      name: 'Coordenador de Projeto',
      desc: 'Acompanha, calenda e garante entrega',
      icon: 'CheckCircle',
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
          Time Especializado
        </h2>
        <div
          style={{
            fontSize: '1rem',
            color: 'rgba(255, 255, 255, .7)',
            marginBottom: 40,
          }}
        >
          Profissionais dedicados que conhecem educação
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          {team.map((member) => (
            <div
              key={member.name}
              style={{
                padding: 24,
                background: 'rgba(255, 255, 255, .05)',
                border: '1px solid rgba(255, 255, 255, .1)',
                borderRadius: 16,
                display: 'flex',
                gap: 16,
                alignItems: 'flex-start',
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
                  borderRadius: 12,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Icon name={member.icon} size={28} color="white" />
              </div>
              <div>
                <h3
                  style={{
                    fontSize: '1rem',
                    fontFamily: 'var(--font-h)',
                    fontWeight: 700,
                    color: 'white',
                    marginBottom: 4,
                  }}
                >
                  {member.name}
                </h3>
                <p style={{ fontSize: '0.95rem', color: 'rgba(255, 255, 255, .7)', lineHeight: 1.5 }}>
                  {member.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Badge de credibilidade */}
        <div
          style={{
            marginTop: 40,
            padding: '16px 24px',
            background: 'rgba(0, 200, 100, .1)',
            border: '1px solid rgba(0, 200, 100, .3)',
            borderRadius: 12,
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <Icon name="Award" size={20} color="#00c864" />
          <div>
            <div
              style={{
                fontSize: '0.85rem',
                fontWeight: 700,
                color: '#00c864',
                textTransform: 'uppercase',
                letterSpacing: '.06em',
                marginBottom: 2,
              }}
            >
              Experiência Comprovada
            </div>
            <div style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, .7)' }}>
              +50 escolas entregues, +R$ 10M em receita incremental gerada
            </div>
          </div>
        </div>
      </div>
    </SlideShell>
  );
}
