/* ===================================================================
   MAIN.JSX - Aplicação React Modular Completa
   =================================================================== */

import React from 'react';
import ReactDOM from 'react-dom/client';

// Componentes principais
import Home from './components/Home';
import FormWizard from './components/FormWizard';
import Presentation from './components/Presentation';

// Data e utilities
import { DEFAULT_CLIENT, DEFAULT_DIAG } from './data';
import { useLS } from './utils';

// ─── COMPONENTE PRINCIPAL (APP) ────────────────────────────────────

export default function App() {
  // Estados de navegação e dados
  const [screen, setScreen] = useLS('wz_screen', 'home');
  const [client, setClient] = useLS('wz_client', DEFAULT_CLIENT);
  const [diagnostic, setDiagnostic] = useLS('wz_diag', DEFAULT_DIAG);
  const [plan, setPlan] = useLS('wz_plan', 'padrao');

  // Handlers
  const handleNewProposal = () => {
    setClient(DEFAULT_CLIENT);
    setDiagnostic(DEFAULT_DIAG);
    setPlan('padrao');
    setScreen('form');
  };

  const handleLoadProposal = () => {
    // Aqui carregaríamos a última proposta salva
    // Por enquanto, apenas muda de tela
    setScreen('form');
  };

  const handleSaveAndPresent = (data) => {
    setClient(data.client);
    setDiagnostic(data.diagnostic);
    setPlan(data.plan);
    setScreen('pres');
  };

  const handleRestartPresentation = () => {
    setScreen('form');
  };

  const handleExitPresentation = () => {
    setScreen('home');
  };

  return (
    <>
      {screen === 'home' && (
        <Home
          onNewProposal={handleNewProposal}
          onLoadProposal={handleLoadProposal}
          lastProposal={client?.empresa}
        />
      )}

      {screen === 'form' && (
        <FormWizard
          cliente={client}
          diag={diagnostic}
          plano={plan}
          onSave={handleSaveAndPresent}
          onPresentation={(data) => handleSaveAndPresent(data || { client, diagnostic, plan })}
        />
      )}

      {screen === 'pres' && (
        <Presentation
          cliente={client}
          diagnostico={diagnostic}
          plano={plan}
          onExit={handleExitPresentation}
          onRestart={handleRestartPresentation}
        />
      )}
    </>
  );
}

// ─── RENDERIZAÇÃO ─────────────────────────────────────────────────

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
