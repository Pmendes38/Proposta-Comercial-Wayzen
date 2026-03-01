/* ===================================================================
   COMPONENTS / FORMWIZARD.JSX - Wizard de 3 Fases
   =================================================================== */

import { useState, useMemo } from 'react';
import Sidebar from './Sidebar';
import PhaseIdent from './PhaseIdent';
import PhaseFoco from './PhaseFoco';
import PhaseDiag from './PhaseDiag';
import Icon from './Icon';

export default function FormWizard({ cliente, diag, plano, onSave, onPresentation }) {
  const [phase, setPhase] = useState('ident');
  const [client, setClient] = useState(cliente || {});
  const [diagnostic, setDiagnostic] = useState(diag || {});
  const [plan, setPlan] = useState(plano || 'padrao');

  const canNext = useMemo(() => {
    if (phase === 'ident') {
      return client.empresa && client.segmento && client.cidade && client.decisor;
    }
    if (phase === 'foco') {
      return diagnostic.produto && diagnostic.meta;
    }
    if (phase === 'diag') {
      return diagnostic.planEscolhido;
    }
    return false;
  }, [phase, client, diagnostic]);

  const handlePrev = () => {
    if (phase === 'foco') setPhase('ident');
    if (phase === 'diag') setPhase('foco');
  };

  const handleNext = () => {
    if (phase === 'ident') setPhase('foco');
    if (phase === 'foco') setPhase('diag');
  };

  const handleFinish = () => {
    if (onSave) {
      onSave({ client, diagnostic, plan: diagnostic.planEscolhido });
    }
    if (onPresentation) {
      onPresentation({ client, diagnostic, plan: diagnostic.planEscolhido });
    }
  };

  return (
    <div className="shell">
      <Sidebar
        client={client}
        diag={diagnostic}
        plan={plan}
        phase={phase}
        onPhase={setPhase}
      />
      <main className="main">
        <div className="scroll">
          {/* CONTEÚDO DA FASE */}
          {phase === 'ident' && (
            <PhaseIdent c={client} sc={setClient} />
          )}
          {phase === 'foco' && (
            <PhaseFoco c={diagnostic} sc={setDiagnostic} />
          )}
          {phase === 'diag' && (
            <PhaseDiag d={diagnostic} sd={setDiagnostic} />
          )}

          {/* RODAPÉ COM BOTÕES DE NAVEGAÇÃO */}
          <div
            style={{
              padding: '32px',
              borderTop: '1px solid var(--divider)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 16,
              background: 'var(--surface)',
              marginTop: 24,
            }}
          >
            <button
              onClick={handlePrev}
              disabled={phase === 'ident'}
              className="btn-nav"
              style={{
                opacity: phase === 'ident' ? 0.5 : 1,
                cursor: phase === 'ident' ? 'not-allowed' : 'pointer',
              }}
            >
              <Icon name="ChevronLeft" size={16} />
              Anterior
            </button>

            <div
              style={{
                fontSize: 12,
                color: 'var(--muted)',
                fontWeight: 600,
              }}
            >
              Etapa{' '}
              {phase === 'ident' ? '1' : phase === 'foco' ? '2' : '3'} de 3
            </div>

            {phase === 'diag' ? (
              <button
                onClick={handleFinish}
                disabled={!canNext}
                style={{
                  padding: '10px 24px',
                  background: 'var(--accent)',
                  color: 'white',
                  border: 'none',
                  borderRadius: 8,
                  fontFamily: 'var(--font-b)',
                  fontWeight: 600,
                  cursor: canNext ? 'pointer' : 'not-allowed',
                  opacity: canNext ? 1 : 0.5,
                  fontSize: 13,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  transition: 'all .2s',
                }}
              >
                Gerar Apresentação
                <Icon name="ChevronRight" size={16} />
              </button>
            ) : (
              <button
                onClick={handleNext}
                disabled={!canNext}
                style={{
                  padding: '10px 24px',
                  background: canNext ? 'var(--accent)' : 'var(--divider)',
                  color: 'white',
                  border: 'none',
                  borderRadius: 8,
                  fontFamily: 'var(--font-b)',
                  fontWeight: 600,
                  cursor: canNext ? 'pointer' : 'not-allowed',
                  opacity: canNext ? 1 : 0.5,
                  fontSize: 13,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  transition: 'all .2s',
                }}
              >
                Próxima Etapa
                <Icon name="ChevronRight" size={16} />
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
