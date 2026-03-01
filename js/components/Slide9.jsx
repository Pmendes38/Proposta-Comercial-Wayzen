/* ===================================================================
   COMPONENTS / SLIDE9.JSX - SUA EMPRESA AO FINAL
   =================================================================== */

import SlideShell from './SlideShell';

export default function Slide9() {
  const blocks = [
    { t: 'Funil rodando', d: 'Etapas claras, registro obrigatório, motivos de perda e previsão de receita por etapa.' },
    { t: 'Playbook pronto', d: 'Scripts, objeções, checklist de atendimento e padrão de proposta documentados.' },
    { t: 'Rotina instalada', d: 'Rituais diários e semanais. A operação não depende de "boa vontade".' },
    { t: 'KPIs e painel', d: 'Resposta, follow-up, propostas, conversão, receita. Tudo visível.' },
    { t: 'Time treinado', d: 'Simulações práticas e acompanhamento até a equipe internalizar o processo.' },
    { t: 'Plano de 60 dias', d: 'Próximo ciclo definido com base em números e maturidade da operação.' },
  ];
  return (
    <SlideShell
      badge="Sua empresa ao final"
      title={<>Uma operação que <span className="glow-text">funciona sem improviso</span>.</>}
      subtitle="O dono para de apagar incêndio e passa a gerir por processo. A empresa ganha previsibilidade real."
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'clamp(12px, 2vw, 20px)', marginBottom: 'clamp(12px, 2vw, 20px)' }}>
        {blocks.map((b, i) => (
          <div key={i} className="card" style={{ borderRadius: 16 }}>
            <div style={{ fontFamily: 'var(--font-h)', fontWeight: 900, fontSize: 15, marginBottom: 6 }}>
              {b.t}
            </div>
            <div style={{ color: 'var(--muted)', fontSize: 12, lineHeight: 1.7 }}>{b.d}</div>
          </div>
        ))}
      </div>
      <div
        style={{
          padding: '14px 18px',
          background: 'var(--surface)',
          border: '1px solid var(--divider)',
          borderRadius: 12,
          fontSize: 12,
          color: 'var(--muted)',
          lineHeight: 1.8,
        }}
      >
        <span style={{ color: 'var(--text)', fontWeight: 700 }}>Rotas de continuidade:</span> operação continua com Wayzen
        (com especialista em campo), manutenção híbrida com visitas programadas, ou transferência completa do método para seu time com treinamento.
      </div>
    </SlideShell>
  );
}
