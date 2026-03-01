/* ===================================================================
   COMPONENTS / SLIDE7.JSX - Diferenciais
   =================================================================== */

import SlideShell from './SlideShell';
import Icon from './Icon';

export default function Slide7() {
  const diferenciais = [
    {
      title: 'Foco em Educação',
      desc: 'Somos educadores. Conhecemos os desafios únicos das escolas.',
      icon: 'BookOpen',
    },
    {
      title: 'Diagnóstico Honesto',
      desc: 'Não vendemos soluções. Vendemos o que a sua escola realmente precisa.',
      icon: 'Eye',
    },
    {
      title: 'Resultados Mensuráveis',
      desc: 'Todo mês você acompanha o progresso direto no dashboard.',
      icon: 'BarChart3',
    },
    {
      title: 'Implementação Total',
      desc: 'Não deixamos projetos a meio caminho. Acompanhamos até o resultado.',
      icon: 'CheckCircle',
    },
    {
      title: 'Parceria, Não Venda',
      desc: 'Você só ganha quando a escola ganha. Seus objetivos são nossos.',
      icon: 'Handshake',
    },
    {
      title: 'Flexibilidade',
      desc: 'Adaptamos o plano conforme aprendemos sobre o seu negócio.',
      icon: 'Zap',
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
          Por Que Somos Diferentes
        </h2>
        <div
          style={{
            fontSize: '1rem',
            color: 'rgba(255, 255, 255, .7)',
            marginBottom: 48,
          }}
        >
          O que nos distingue das outras consultoras de crescimento
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 20,
          }}
        >
          {diferenciais.map((d) => (
            <div
              key={d.title}
              style={{
                padding: 24,
                background: 'rgba(255, 255, 255, .05)',
                border: '1px solid rgba(255, 255, 255, .1)',
                borderRadius: 16,
                display: 'flex',
                gap: 16,
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
                  flexShrink: 0,
                }}
              >
                <Icon name={d.icon} size={24} color="white" />
              </div>
              <div>
                <h3
                  style={{
                    fontSize: '1rem',
                    fontFamily: 'var(--font-h)',
                    fontWeight: 700,
                    color: 'white',
                    marginBottom: 6,
                  }}
                >
                  {d.title}
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, .7)', lineHeight: 1.5 }}>
                  {d.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SlideShell>
  );
}
