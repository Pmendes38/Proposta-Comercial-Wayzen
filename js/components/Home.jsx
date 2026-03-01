/* ===================================================================
   COMPONENTS / HOME.JSX - Página Inicial
   =================================================================== */

import WzLogo from './WzLogo';
import Icon from './Icon';

export default function Home({ onNewProposal, onLoadProposal, lastProposal }) {
  return (
    <div
      className="shell"
      style={{
        background: 'linear-gradient(135deg, rgba(148, 0, 211, .08), rgba(204, 0, 255, .04))',
      }}
    >
      <Orbs />
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px 40px',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <WzLogo style={{ marginBottom: 40, transform: 'scale(1.3)' }} />

        <h1
          style={{
            fontSize: '2.8rem',
            fontFamily: 'var(--font-h)',
            fontWeight: 800,
            marginBottom: 16,
            color: 'var(--text)',
            lineHeight: 1.2,
          }}
        >
          Impulsione a receita da sua escola
        </h1>

        <p
          style={{
            fontSize: 16,
            color: 'var(--muted)',
            maxWidth: 500,
            marginBottom: 48,
            lineHeight: 1.7,
          }}
        >
          Diagnóstico completo + plano de ação personalizado para acelerar a aquisição e
          retenção de alunos.
        </p>

        <div style={{ display: 'flex', gap: 16 }}>
          <button
            onClick={onNewProposal}
            style={{
              padding: '16px 40px',
              background: 'var(--accent)',
              color: 'white',
              border: 'none',
              borderRadius: 12,
              fontFamily: 'var(--font-b)',
              fontWeight: 700,
              fontSize: 14,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              transition: 'all .2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(148, 0, 211, .3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <Icon name="Plus" size={18} />
            Nova Proposta
          </button>

          {lastProposal && (
            <button
              onClick={onLoadProposal}
              style={{
                padding: '16px 40px',
                background: 'rgba(255, 255, 255, .1)',
                border: '1px solid rgba(255, 255, 255, .2)',
                color: 'white',
                borderRadius: 12,
                fontFamily: 'var(--font-b)',
                fontWeight: 700,
                fontSize: 14,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                transition: 'all .2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, .15)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, .1)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <Icon name="FolderOpen" size={18} />
              Última Proposta
            </button>
          )}
        </div>

        <div
          style={{
            marginTop: 60,
            padding: '24px',
            background: 'rgba(255, 255, 255, .05)',
            border: '1px solid rgba(255, 255, 255, .1)',
            borderRadius: 14,
            maxWidth: 500,
          }}
        >
          <div
            style={{
              fontSize: 11,
              color: 'var(--muted)',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '.08em',
              marginBottom: 12,
            }}
          >
            Como funciona
          </div>
          <ol
            style={{
              fontSize: 13,
              color: 'var(--muted)',
              textAlign: 'left',
              lineHeight: 2,
              paddingLeft: 20,
            }}
          >
            <li>Preencha os dados da escola (2 min)</li>
            <li>Responda o diagnóstico (5 min)</li>
            <li>Receba a proposta personalizada (instantâneo)</li>
            <li>Apresente e negocie o plano (live)</li>
          </ol>
        </div>

        <div
          style={{
            marginTop: 40,
            fontSize: 12,
            color: 'var(--muted)',
          }}
        >
          Levando precisão aos números da educação.
        </div>
      </div>
    </div>
  );
}

function Orbs() {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
        zIndex: 0,
      }}
    >
      <div
        style={{
          position: 'absolute',
          width: 400,
          height: 400,
          background: 'radial-gradient(circle, rgba(148, 0, 211, .2) 0%, transparent 70%)',
          borderRadius: '50%',
          top: -100,
          right: -100,
          animation: 'float 8s ease-in-out infinite',
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: 300,
          height: 300,
          background: 'radial-gradient(circle, rgba(204, 0, 255, .15) 0%, transparent 70%)',
          borderRadius: '50%',
          bottom: -80,
          left: -80,
          animation: 'float 10s ease-in-out infinite 1s',
        }}
      />
    </div>
  );
}
