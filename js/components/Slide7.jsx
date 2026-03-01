/* ===================================================================
   COMPONENTS / SLIDE7.JSX - Diferenciais
   =================================================================== */

import SlideShell from './SlideShell';

export default function Slide7() {
  const diffs = [
      { titulo: 'Presença dentro da empresa', desc: 'Não mandamos relatório por e-mail. Estamos na operação, no dia a dia, resolvendo junto.', icon: '🏢' },
      { titulo: 'Cobertura de toda a jornada', desc: 'Do lead ao aluno retido: captação, conversão e LTV. Três especialistas, três fases.', icon: '🔗' },
      { titulo: '4 sprints com entregáveis reais', desc: 'Cada semana tem objetivo, entregável e métrica. Sem promessa vaga.', icon: '⚡' },
      { titulo: 'Registro e cultura de dados', desc: 'Sem registro não existe gestão. Instalamos a cultura de documentar e medir.', icon: '📊' },
      { titulo: 'Playbook transferível', desc: 'Ao final do ciclo você tem processo documentado e treinamento feito. Independência total.', icon: '📋' },
      { titulo: 'Especialista em educação', desc: 'O gestor de LTV tem foco exclusivo no nicho educacional: conhece a jornada do aluno.', icon: '🎓' },
    ];

    return (
      <SlideShell
        badge="Nossos diferenciais"
        title={<>O que faz a Wayzen ser <span className="glow-text">diferente na prática</span>.</>}
        subtitle="Negócio educacional precisa de execução com rotina e especialistas em cada fase da jornada."
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'clamp(12px, 2vw, 20px)' }}>
          {diffs.map((d, i) => (
            <div key={i} className="card" style={{ borderRadius: 16 }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 10 }}>
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 12,
                    background: 'rgba(148,0,211,.14)',
                    border: '1px solid var(--accent-border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <span style={{ fontSize: 16 }}>{d.icon}</span>
                </div>
                <div style={{ fontFamily: 'var(--font-h)', fontWeight: 900, fontSize: 14 }}>{d.titulo}</div>
              </div>
              <div style={{ color: 'var(--muted)', fontSize: 12, lineHeight: 1.7 }}>{d.desc}</div>
            </div>
          ))}
        </div>
      </SlideShell>
    );
}
