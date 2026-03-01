/* ===================================================================
   COMPONENTS / SLIDE1.JSX - Capa
   =================================================================== */

import SlideShell from './SlideShell';
import WzLogo from './WzLogo';

export default function Slide1({ cliente }) {
  return (
    <SlideShell background="gradient">
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          textAlign: 'center',
          gap: 28,
        }}
      >
        <WzLogo style={{ transform: 'scale(1.2)', marginBottom: 16 }} />

        <h1
          style={{
            fontSize: '3.2rem',
            fontFamily: 'var(--font-h)',
            fontWeight: 800,
            lineHeight: 1.3,
            color: 'white',
            maxWidth: 700,
          }}
        >
          Impulsione a receita da {cliente?.empresa || 'sua escola'}
        </h1>

        <p
          style={{
            fontSize: '1.1rem',
            color: 'rgba(255, 255, 255, .8)',
            maxWidth: 600,
            lineHeight: 1.7,
          }}
        >
          Diagnóstico completo +Plano de ação personalizado para acelerar aquisição e retenção
          de alunos
        </p>

        <div
          style={{
            marginTop: 32,
            padding: '14px 28px',
            background: 'rgba(255, 255, 255, .15)',
            backdrop: 'filter: blur(10px)',
            border: '1px solid rgba(255, 255, 255, .2)',
            borderRadius: 12,
            fontSize: 14,
            color: 'white',
            fontWeight: 600,
          }}
        >
          Apresentação personalizada · {new Date().toLocaleDateString('pt-BR')}
        </div>
      </div>
    </SlideShell>
  );
}
