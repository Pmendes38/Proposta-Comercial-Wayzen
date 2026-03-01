/* ===================================================================
   COMPONENTS / PHASEFOCO.JSX - Fase 2: Foco e Contexto
   =================================================================== */

import Field from './Field';

export default function PhaseFoco({ c, sc, showValidation }) {
  const u = (k, v) => sc((p) => ({ ...p, [k]: v }));
  
  const isFieldEmpty = (field) => !c[field] || c[field].trim() === '';
  const getFieldStyle = (field) => {
    if (!showValidation) return {};
    if (isFieldEmpty(field)) {
      return { borderColor: '#dc003c', boxShadow: '0 0 0 2px rgba(220, 0, 60, .15)' };
    }
    return {};
  };

  return (
    <div>
      <div className="form-section" style={{ paddingBottom: 0 }}>
        <div className="au">
          <span className="badge ba" style={{ marginBottom: 12 }}>
            Passo 2 de 3
          </span>
        </div>
        <h2 className="form-title au1">Qual é o foco?</h2>
        <p className="form-sub au2">O que mais importa vender ou converter agora.</p>
      </div>
      <div style={{ padding: '0 32px 32px' }}>
        <div className="fg2">
          <div>
            <div className="section-title">
              Foco do Ciclo
            </div>
            <Field label="Produto / Serviço Principal" hint="O que mais importa vender ou converter agora">
              <input
                className="fi"
                placeholder="Ex.: matrículas, plano anual, cirurgia"
                value={c.produto}
                onChange={(e) => u('produto', e.target.value)}
                style={getFieldStyle('produto')}
              />
            </Field>
            <Field label="Meta para o Semestre" hint="Objetivo concreto deste ciclo de operação">
              <input
                className="fi"
                placeholder="Ex.: dobrar matrículas, bater R$ 200k, 100 alunos novos"
                value={c.meta}
                onChange={(e) => u('meta', e.target.value)}
                style={getFieldStyle('meta')}
              />
            </Field>
          </div>
          <div>
            <div
              style={{
                fontSize: 11,
                letterSpacing: '.1em',
                textTransform: 'uppercase',
                color: 'var(--muted)',
                marginBottom: 14,
                fontWeight: 600,
              }}
            >
              Contexto
            </div>
            <Field label="Data da Reunião">
              <input
                className="fi"
                type="date"
                value={c.data}
                onChange={(e) => u('data', e.target.value)}
              />
            </Field>
            <Field label="Observações" hint="Sazonalidade, momento da empresa, contexto relevante">
              <textarea
                className="fi"
                placeholder="Qualquer contexto importante sobre o momento do negócio..."
                value={c.obs}
                onChange={(e) => u('obs', e.target.value)}
              />
            </Field>
          </div>
        </div>
      </div>
    </div>
  );
}
