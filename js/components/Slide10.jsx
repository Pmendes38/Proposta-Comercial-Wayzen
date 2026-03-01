/* ===================================================================
   COMPONENTS / SLIDE10.JSX - Fechamento: empresa + plano + investimento
   =================================================================== */

import SlideShell from './SlideShell';
import Icon from './Icon';
import { fmtBRL } from '../utils';
import { PLANS } from '../data';

export default function Slide10({ cliente, diagnostico, plano }) {
  const planData = PLANS.find((p) => p.id === (diagnostico?.planEscolhido || plano));
  const taxaImplantacao = diagnostico?.faturamento || 50000;
  const investimentoMensal = taxaImplantacao * (Number(planData?.taxa.replace('%', '')) / 100);

  return (
    <SlideShell>
      <div
        style={{
          maxWidth: 900,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: 32,
        }}
      >
        {/* Intro */}
        <div>
          <h2
            style={{
              fontSize: '2.4rem',
              fontFamily: 'var(--font-h)',
              fontWeight: 800,
              marginBottom: 16,
              color: 'white',
            }}
          >
            {cliente?.empresa || 'Sua Empresa'}
          </h2>
          <p
            style={{
              fontSize: '1rem',
              color: 'rgba(255, 255, 255, .7)',
            }}
          >
            Próximos passos e investment
          </p>
        </div>

        {/* Grid: Empresa + Plano + Investimento */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, width: '100%' }}>
          {/* Empresa */}
          <div
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
                background: 'linear-gradient(135deg, #9400d3, #cc00ff)',
                borderRadius: 12,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 12px',
              }}
            >
              <Icon name="Building2" size={24} color="white" />
            </div>
            <div
              style={{
                fontSize: '0.8rem',
                fontWeight: 700,
                color: 'var(--muted)',
                textTransform: 'uppercase',
                letterSpacing: '.08em',
                marginBottom: 8,
              }}
            >
              Empresa
            </div>
            <div style={{ fontSize: '1rem', fontFamily: 'var(--font-h)', fontWeight: 700, color: 'white' }}>
              {cliente?.empresa || '-'}
            </div>
            {cliente?.segmento && (
              <div style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, .6)', marginTop: 6 }}>
                {cliente.segmento}
              </div>
            )}
          </div>

          {/* Plano */}
          <div
            style={{
              padding: 24,
              background: 'rgba(255, 255, 255, .05)',
              border: '1px solid rgba(255, 255, 255, .1)',
              borderRadius: 16,
              borderTop: '3px solid var(--accent)',
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
                margin: '0 auto 12px',
              }}
            >
              <Icon name="Zap" size={24} color="white" />
            </div>
            <div
              style={{
                fontSize: '0.8rem',
                fontWeight: 700,
                color: 'var(--accent)',
                textTransform: 'uppercase',
                letterSpacing: '.08em',
                marginBottom: 8,
              }}
            >
              Plano Recomendado
            </div>
            <div
              style={{
                fontSize: '1.2rem',
                fontFamily: 'var(--font-h)',
                fontWeight: 800,
                color: 'white',
                marginBottom: 6,
              }}
            >
              {planData?.label || 'Padrão'}
            </div>
            <div style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, .6)' }}>
              {planData?.taxa} + {planData?.loa}% LOA
            </div>
          </div>

          {/* Investimento */}
          <div
            style={{
              padding: 24,
              background: 'rgba(0, 200, 100, .08)',
              border: '1px solid rgba(0, 200, 100, .2)',
              borderRadius: 16,
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                background: 'linear-gradient(135deg, #00c864, #00a883)',
                borderRadius: 12,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 12px',
              }}
            >
              <Icon name="DollarSign" size={24} color="white" />
            </div>
            <div
              style={{
                fontSize: '0.8rem',
                fontWeight: 700,
                color: '#00c864',
                textTransform: 'uppercase',
                letterSpacing: '.08em',
                marginBottom: 8,
              }}
            >
              Investimento Mensal
            </div>
            <div
              style={{
                fontSize: '1.2rem',
                fontFamily: 'var(--font-h)',
                fontWeight: 800,
                color: '#00c864',
              }}
            >
              {fmtBRL(investimentoMensal)}
            </div>
          </div>
        </div>

        {/* Próximos Passos */}
        <div
          style={{
            width: '100%',
            padding: 24,
            background: 'rgba(255, 255, 255, .05)',
            border: '1px solid rgba(255, 255, 255, .1)',
            borderRadius: 16,
          }}
        >
          <h3
            style={{
              fontSize: '1.1rem',
              fontFamily: 'var(--font-h)',
              fontWeight: 700,
              color: 'white',
              marginBottom: 16,
            }}
          >
            Próximos Passos
          </h3>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 12,
            }}
          >
            {[
              '1. Validação do diagnóstico com time',
              '2. Assinatura do contrato de trabalho',
              '3. Kickoff com equipe operacional',
              '4. Início imediato da Sprint 1',
            ].map((step) => (
              <div
                key={step}
                style={{
                  padding: '12px',
                  background: 'rgba(148, 0, 211, .1)',
                  borderRadius: 8,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  fontSize: '0.9rem',
                  color: 'rgba(255, 255, 255, .8)',
                }}
              >
                <Icon name="CheckCircle" size={16} color="var(--accent)" />
                {step}
              </div>
            ))}
          </div>
        </div>

        {/* CTA Final */}
        <div
          style={{
            padding: '24px',
            background: 'linear-gradient(135deg, rgba(0, 200, 100, .15), rgba(0, 168, 131, .1))',
            border: '1px solid rgba(0, 200, 100, .3)',
            borderRadius: 16,
            textAlign: 'center',
          }}
        >
          <h3
            style={{
              fontSize: '1.2rem',
              fontFamily: 'var(--font-h)',
              fontWeight: 700,
              color: '#00c864',
              marginBottom: 8,
            }}
          >
            Está pronto para crescer?
          </h3>
          <p style={{ fontSize: '0.95rem', color: 'rgba(255, 255, 255, .7)' }}>
            Agendar conversa com time, tirar dúvidas ou ajustar proposta.
          </p>
        </div>

        {/* Rodapé */}
        <div
          style={{
            fontSize: '0.85rem',
            color: 'rgba(255, 255, 255, .5)',
          }}
        >
          Wayzen · Impulsionando receitas em educação
        </div>
      </div>
    </SlideShell>
  );
}
