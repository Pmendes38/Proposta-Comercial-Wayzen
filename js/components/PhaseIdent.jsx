/* ===================================================================
   COMPONENTS / PHASEIDENT.JSX - Fase 1: Identificação do Cliente
   =================================================================== */

import Field from './Field';

export default function PhaseIdent({ c, sc }) {
  const u = (k, v) => sc((p) => ({ ...p, [k]: v }));

  return (
    <div>
      <div className="form-section" style={{ paddingBottom: 0 }}>
        <div className="au">
          <span className="badge ba" style={{ marginBottom: 12 }}>
            Passo 1 de 3
          </span>
        </div>
        <h2 className="form-title au1">Quem é o cliente?</h2>
        <p className="form-sub au2">Preencha enquanto conversa. A proposta monta em tempo real.</p>
      </div>
      <div style={{ padding: '0 32px 32px' }}>
        <div className="fg2">
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
              Empresa
            </div>
            <Field label="Nome da Empresa">
              <input
                className="fi"
                placeholder="Nome da empresa"
                value={c.empresa}
                onChange={(e) => u('empresa', e.target.value)}
              />
            </Field>
            <Field label="Segmento">
              <input
                className="fi"
                placeholder="Ex.: educação, saúde, varejo, serviços"
                value={c.segmento}
                onChange={(e) => u('segmento', e.target.value)}
              />
            </Field>
            <Field label="Cidade">
              <input
                className="fi"
                placeholder="Cidade / UF"
                value={c.cidade}
                onChange={(e) => u('cidade', e.target.value)}
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
              Decisor
            </div>
            <Field label="Nome do Decisor">
              <input
                className="fi"
                placeholder="Dono, diretor, gestor"
                value={c.decisor}
                onChange={(e) => u('decisor', e.target.value)}
              />
            </Field>
            <Field label="Cargo">
              <input
                className="fi"
                placeholder="Cargo ou função"
                value={c.cargo}
                onChange={(e) => u('cargo', e.target.value)}
              />
            </Field>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <Field label="WhatsApp">
                <input
                  className="fi"
                  placeholder="(00) 00000-0000"
                  value={c.whatsapp}
                  onChange={(e) => u('whatsapp', e.target.value)}
                />
              </Field>
              <Field label="E-mail">
                <input
                  className="fi"
                  placeholder="email@empresa.com"
                  value={c.email}
                  onChange={(e) => u('email', e.target.value)}
                />
              </Field>
            </div>
          </div>
        </div>
        {c.empresa && c.decisor && (
          <div
            className="au card"
            style={{
              background: 'linear-gradient(135deg, rgba(148, 0, 211, .08), rgba(204, 0, 255, .04))',
              borderColor: 'var(--accent-border)',
              marginTop: 8,
            }}
          >
            <div style={{ fontFamily: 'var(--font-h)', fontWeight: 700, fontSize: 18 }}>
              Proposta Wayzen para <span className="glow-text">{c.empresa}</span>
            </div>
            <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 4 }}>
              {c.decisor}
              {c.cargo ? ` · ${c.cargo}` : ''}
              {c.cidade ? ` · ${c.cidade}` : ''}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
