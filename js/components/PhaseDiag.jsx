/* ===================================================================
   COMPONENTS / PHASEDIAG.JSX - Fase 3: Diagnóstico Completo
   =================================================================== */

import { useState, useMemo } from 'react';
import Field from './Field';
import Slider from './Slider';
import { PLANS, CANAIS, TAB_DIAG } from '../data';
import { fmtBRL, calcularGargalos, calcularMetricas, calcularScore, calcularTaxaOperacional, calcularPontuacaoTaxa } from '../utils';

const TAXA_HELP_ITEMS = [
  {
    id: 'faturamento',
    pergunta: 'Faturamento medio mensal',
    detalhe: 'Operacoes maiores exigem mais acompanhamento e elevam a pontuacao.',
  },
  {
    id: 'equipe',
    pergunta: 'Pessoas no comercial/atendimento',
    detalhe: 'Quanto mais pessoas envolvidas, maior a complexidade de gestao e treinamento.',
  },
  {
    id: 'tipoProcesso',
    pergunta: 'Tipo de processo comercial',
    detalhe: 'Processos consultivos e longos pedem mais suporte da Wayzen.',
  },
  {
    id: 'ticket',
    pergunta: 'Ticket medio (aba Aquisicao)',
    detalhe: 'Tickets mais altos elevam o nivel de exigencia do processo de vendas.',
  },
  {
    id: 'crm',
    pergunta: 'CRM ou controle de leads',
    detalhe: 'Quanto menos estruturado for o controle atual, maior o esforco de implantacao.',
  },
  {
    id: 'followUp',
    pergunta: 'Rotina de follow up',
    detalhe: 'Ausencia de cadencia aumenta o trabalho de construcao operacional.',
  },
  {
    id: 'modalidade',
    pergunta: 'Modalidade Wayzen',
    detalhe: 'Operacao hibrida/presencial tende a exigir mais horas e deslocamento.',
  },
  {
    id: 'urgencia',
    pergunta: 'Urgencia por resultado',
    detalhe: 'Quanto maior a pressao por resultado rapido, maior a dedicacao necessaria.',
  },
];

export default function PhaseDiag({ d, sd }) {
  const u = (k, v) => sd((p) => ({ ...p, [k]: v }));
  const toggle = (c) =>
    u(
      'canais',
      d.canais.includes(c) ? d.canais.filter((x) => x !== c) : [...d.canais, c]
    );
  const [tab, setTab] = useState('aquisicao');
  const [previewAlunos, setPreviewAlunos] = useState(0);
  const [showTaxaHelp, setShowTaxaHelp] = useState(false);

  const gargalos = useMemo(() => calcularGargalos(d), [d]);
  const metricas = useMemo(() => calcularMetricas(d), [d]);
  const { scoreItems, scoreGeral, scoreCor } = useMemo(() => calcularScore(d), [d]);

  const baseAtiva = d.baseAlunos || 0;
  const recBase = baseAtiva * (d.mensalidade || d.ticket || 0);

  // taxa operacional calculada automaticamente
  const taxaOper = useMemo(() => {
    const plano = PLANS.find((p) => p.id === d.planEscolhido);
    return calcularTaxaOperacional(d, plano);
  }, [d]);

  const pontuacaoTaxa = useMemo(() => calcularPontuacaoTaxa(d), [d]);
  const crmSelecionado = useMemo(() => {
    const raw = String(d.crm || '');
    if (raw === 'Sim, CRM dedicado') return 'estruturado';
    if (raw === 'Sim, planilha organizada') return 'basico';
    if (raw === 'Informalmente, no WhatsApp') return 'planilha';
    if (raw === 'Não temos controle') return 'nenhum';
    return raw;
  }, [d.crm]);
  const respostasTaxa = useMemo(() => {
    const respondidas = [
      Number(d.faturamento) > 0,
      Number(d.equipe) > 0,
      Number(d.ticket) > 0,
      Boolean(d.tipoProcesso),
      Boolean(d.crm),
      Boolean(d.followUp),
      Boolean(d.modalidade),
      Boolean(d.urgencia),
    ];
    return respondidas.filter(Boolean).length;
  }, [d]);

  const ST = ({ children }) => (
    <div
      style={{
        fontSize: 11,
        letterSpacing: '.1em',
        textTransform: 'uppercase',
        color: 'var(--muted)',
        marginBottom: 14,
        fontWeight: 600,
        paddingBottom: 8,
        borderBottom: '1px solid var(--divider)',
      }}
    >
      {children}
    </div>
  );

  return (
    <div>
      <div className="form-section" style={{ paddingBottom: 0 }}>
        <div className="au">
          <span className="badge ba" style={{ marginBottom: 12 }}>
            Passo 3 de 3 · Diagnóstico Completo
          </span>
        </div>
        <h2 className="form-title au1">Onde está vazando: e onde está o dinheiro parado.</h2>
        <p className="form-sub au2">
          Diagnóstico de ponta a ponta: aquisição, base ativa, LTV, operação e experiência.
        </p>
      </div>

      {/* TABS */}
      <div
        style={{
          padding: '0 32px',
          borderBottom: '1px solid var(--divider)',
          display: 'flex',
          gap: 0,
          overflowX: 'auto',
        }}
      >
        {TAB_DIAG.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            style={{
              padding: '10px 18px',
              background: 'none',
              border: 'none',
              borderBottom: `2px solid ${tab === t.id ? 'var(--accent)' : 'transparent'}`,
              color: tab === t.id ? 'var(--text)' : 'var(--muted)',
              fontFamily: 'var(--font-b)',
              fontSize: 12,
              fontWeight: tab === t.id ? 600 : 400,
              cursor: 'pointer',
              transition: 'all .15s',
              whiteSpace: 'nowrap',
              marginBottom: -1,
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* CONTEÚDO ABAS */}
      <div style={{ padding: '24px 32px 40px' }}>
        {tab === 'aquisicao' && (
          <div className="ai">
            <div className="fg2">
              <div>
                <ST>Entrada de Demanda</ST>
                <Slider
                  label="Contatos por semana"
                  min={5}
                  max={500}
                  value={d.contatos}
                  onChange={(v) => u('contatos', v)}
                  hint="Somando todos os canais."
                />
                <div className="fg">
                  <label className="fl">Canais Ativos</label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {CANAIS.map((c) => (
                      <span
                        key={c}
                        className={`tag ${d.canais.includes(c) ? 'on' : ''}`}
                        onClick={() => toggle(c)}
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
                <ST>Velocidade e Atendimento</ST>
                <Slider
                  label="Tempo médio de 1ª resposta (min)"
                  min={1}
                  max={480}
                  value={d.tempo}
                  onChange={(v) => u('tempo', v)}
                  unit="min"
                  hint="1º atendimento ao lead novo."
                />
                <Slider
                  label="Contatos sem retorno (%)"
                  min={0}
                  max={100}
                  value={d.semRetorno}
                  onChange={(v) => u('semRetorno', v)}
                  hint="Leads que somem após o 1º atendimento."
                />
                <Field label="CAC: Custo por Cliente Adquirido (R$)">
                  <input
                    className="fi"
                    type="number"
                    placeholder="Ex.: 450"
                    value={d.cac || ''}
                    onChange={(e) => u('cac', Number(e.target.value))}
                  />
                </Field>
              </div>

              <div>
                <ST>Conversão e Financeiro</ST>
                <Slider
                  label="Taxa de conversão (%)"
                  min={1}
                  max={80}
                  value={d.conversao}
                  onChange={(v) => u('conversao', v)}
                  unit="%"
                  hint="Use estimativa honesta se não mede."
                />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <Field
                    label="Ticket Médio (R$)"
                    hint="Pergunta 4/8 da taxa operacional: tickets mais altos aumentam a complexidade."
                  >
                    <input
                      className="fi"
                      type="number"
                      placeholder="1500"
                      value={d.ticket || ''}
                      onChange={(e) => u('ticket', Number(e.target.value))}
                    />
                  </Field>
                  <Field label="Ciclo de Decisão (dias)">
                    <input
                      className="fi"
                      type="number"
                      placeholder="7"
                      value={d.ciclo || ''}
                      onChange={(e) => u('ciclo', Number(e.target.value))}
                    />
                  </Field>
                </div>
                <Field label="Propostas enviadas por semana">
                  <input
                    className="fi"
                    type="number"
                    placeholder="Ex.: 12"
                    value={d.propostas || ''}
                    onChange={(e) => u('propostas', Number(e.target.value))}
                  />
                </Field>
                <Field label="Principal motivo de perda de leads">
                  <select
                    className="fi"
                    value={d.motivoPerda || ''}
                    onChange={(e) => u('motivoPerda', e.target.value)}
                  >
                    <option value="">Selecione</option>
                    <option>Preço / valor percebido</option>
                    <option>Demora no atendimento</option>
                    <option>Falta de follow-up</option>
                    <option>Concorrente mais rápido</option>
                    <option>Falta de urgência do lead</option>
                    <option>Processo consultivo longo demais</option>
                    <option>Produto/oferta não adequada</option>
                    <option>Não sei / não rastreamos</option>
                  </select>
                </Field>

                <div
                  style={{
                    background: 'var(--surface)',
                    border: '1px solid var(--divider)',
                    borderRadius: 10,
                    padding: '14px',
                  }}
                >
                  <div
                    style={{
                      fontSize: 10,
                      color: 'var(--muted)',
                      fontWeight: 600,
                      letterSpacing: '.08em',
                      textTransform: 'uppercase',
                      marginBottom: 10,
                    }}
                  >
                    Resumo de Aquisição
                  </div>
                  {[
                    { l: 'Contatos/mês', v: Math.round(d.contatos * 4.3) },
                    {
                      l: 'Fechamentos/mês',
                      v: Math.round(d.contatos * 4.3 * (d.conversao / 100)),
                    },
                    { l: 'Receita mensal estimada', v: fmtBRL(metricas.recAtual) },
                    {
                      l: 'Perda por follow-up',
                      v: fmtBRL(metricas.perdaFollowup),
                      danger: true,
                    },
                  ].map((x) => (
                    <div
                      key={x.l}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: '5px 0',
                        borderBottom: '1px solid var(--divider)',
                      }}
                    >
                      <span style={{ fontSize: 12, color: 'var(--muted)' }}>{x.l}</span>
                      <span
                        style={{
                          fontFamily: 'var(--font-h)',
                          fontWeight: 700,
                          fontSize: 13,
                          color: x.danger ? '#dc003c' : 'var(--text)',
                        }}
                      >
                        {x.v}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === 'base' && (
          <div className="ai">
            <div className="fg2">
              <div>
                <ST>Tamanho e Saúde da Base</ST>
                <Field label="Total de alunos / clientes ativos">
                  <input
                    className="fi"
                    type="number"
                    placeholder="Ex.: 320"
                    value={d.baseAlunos || ''}
                    onChange={(e) => u('baseAlunos', Number(e.target.value))}
                  />
                </Field>
                <Field label="Mensalidade / Receita por cliente (R$)">
                  <input
                    className="fi"
                    type="number"
                    placeholder="Ex.: 890"
                    value={d.mensalidade || ''}
                    onChange={(e) => u('mensalidade', Number(e.target.value))}
                  />
                </Field>
                <Slider
                  label="Taxa de desistência mensal (%)"
                  min={0}
                  max={50}
                  value={d.desistencia || 0}
                  onChange={(v) => u('desistencia', v)}
                  unit="%"
                  hint="Percentual que cancela ou abandona por mês."
                />
                <Slider
                  label="Taxa de inadimplência (%)"
                  min={0}
                  max={60}
                  value={d.inadimplencia || 0}
                  onChange={(v) => u('inadimplencia', v)}
                  unit="%"
                  hint="Não pagaram no último mês."
                />
                <Slider
                  label="Churn mensal (%)"
                  min={0}
                  max={30}
                  value={d.churn || 0}
                  onChange={(v) => u('churn', v)}
                  unit="%"
                  hint="Cancelamentos definitivos por mês."
                />
              </div>

              <div>
                <ST>Retenção e Saída</ST>
                <Field label="Principal motivo de cancelamento">
                  <select
                    className="fi"
                    value={d.motivoCancel || ''}
                    onChange={(e) => u('motivoCancel', e.target.value)}
                  >
                    <option value="">Selecione</option>
                    <option>Preço / reajuste</option>
                    <option>Não viu resultado</option>
                    <option>Falta de tempo / prioridade mudou</option>
                    <option>Mudança financeira pessoal</option>
                    <option>Concorrente com oferta melhor</option>
                    <option>Atendimento ou suporte ruim</option>
                    <option>Mudança de cidade ou circunstância</option>
                    <option>Não coletamos feedback de saída</option>
                  </select>
                </Field>
                <Field label="Processo de retenção ativo?">
                  <select
                    className="fi"
                    value={d.retencaoAtiva || ''}
                    onChange={(e) => u('retencaoAtiva', e.target.value)}
                  >
                    <option value="">Selecione</option>
                    <option>Sim, processo estruturado</option>
                    <option>Sim, mas informal</option>
                    <option>Às vezes, sem padronização</option>
                    <option>Não, deixamos o cliente sair sem acionar</option>
                  </select>
                </Field>
                <Field label="Processo de cobrança de inadimplentes?">
                  <select
                    className="fi"
                    value={d.cobracaAtiva || ''}
                    onChange={(e) => u('cobracaAtiva', e.target.value)}
                  >
                    <option value="">Selecione</option>
                    <option>Sim, régua automática</option>
                    <option>Sim, mas manual e inconsistente</option>
                    <option>Contato só depois de muito tempo</option>
                    <option>Não temos processo de cobrança</option>
                  </select>
                </Field>

                <div
                  style={{
                    background: 'var(--surface)',
                    border: '1px solid var(--divider)',
                    borderRadius: 10,
                    padding: '14px',
                  }}
                >
                  <div
                    style={{
                      fontSize: 10,
                      color: 'var(--muted)',
                      fontWeight: 600,
                      letterSpacing: '.08em',
                      textTransform: 'uppercase',
                      marginBottom: 10,
                    }}
                  >
                    Impacto Financeiro
                  </div>
                  {[
                    { l: 'Receita recorrente/mês', v: fmtBRL(recBase) },
                    { l: 'Perda por desistência/mês', v: fmtBRL(metricas.perdaDesist), danger: true },
                    { l: 'Perda por inadimplência/mês', v: fmtBRL(metricas.perdaInadin), danger: true },
                    {
                      l: 'Alunos cancelando/mês',
                      v: Math.round((baseAtiva * (d.churn || 0)) / 100),
                    },
                  ].map((x) => (
                    <div
                      key={x.l}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: '5px 0',
                        borderBottom: '1px solid var(--divider)',
                      }}
                    >
                      <span style={{ fontSize: 12, color: 'var(--muted)' }}>{x.l}</span>
                      <span
                        style={{
                          fontFamily: 'var(--font-h)',
                          fontWeight: 700,
                          fontSize: 13,
                          color: x.danger ? '#dc003c' : 'var(--text)',
                        }}
                      >
                        {x.v}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === 'ltv' && (
          <div className="ai">
            <div className="fg2">
              <div>
                <ST>Ciclo de Vida</ST>
                <Field label="Tempo médio de permanência (meses)">
                  <input
                    className="fi"
                    type="number"
                    placeholder="Ex.: 14"
                    value={d.tempoMedio || ''}
                    onChange={(e) => u('tempoMedio', Number(e.target.value))}
                  />
                </Field>
                <Slider
                  label="Taxa de recompra / upgrade (%)"
                  min={0}
                  max={100}
                  value={d.recompra || 0}
                  onChange={(v) => u('recompra', v)}
                  unit="%"
                  hint="Compram 2º produto ou fazem upgrade."
                />
                <Slider
                  label="Taxa de indicação (%)"
                  min={0}
                  max={60}
                  value={d.indicacao || 0}
                  onChange={(v) => u('indicacao', v)}
                  unit="%"
                  hint="Novos clientes que vêm por indicação."
                />
                <Field label="Quantidade de produtos / planos">
                  <select
                    className="fi"
                    value={d.qtdProdutos || ''}
                    onChange={(e) => u('qtdProdutos', e.target.value)}
                  >
                    <option value="">Selecione</option>
                    <option>Apenas 1 produto/plano</option>
                    <option>2 a 3 produtos/planos</option>
                    <option>4 a 6 produtos/planos</option>
                    <option>Mais de 6 produtos/planos</option>
                  </select>
                </Field>
              </div>

              <div>
                <ST>Relacionamento e Pós-venda</ST>
                <Field label="Programa de indicação ativo?">
                  <select
                    className="fi"
                    value={d.programaIndicacao || ''}
                    onChange={(e) => u('programaIndicacao', e.target.value)}
                  >
                    <option value="">Selecione</option>
                    <option>Sim, com incentivos e comunicação</option>
                    <option>Sim, informal</option>
                    <option>Não, mas queremos estruturar</option>
                    <option>Não temos</option>
                  </select>
                </Field>
                <Field label="Comunicação regular com a base?">
                  <select
                    className="fi"
                    value={d.comunicacaoBase || ''}
                    onChange={(e) => u('comunicacaoBase', e.target.value)}
                  >
                    <option value="">Selecione</option>
                    <option>Sim, frequente e planejada</option>
                    <option>Às vezes, sem frequência</option>
                    <option>Só quando há algo urgente</option>
                    <option>Não temos comunicação regular</option>
                  </select>
                </Field>
                <Field label="Oferta de renovação ou fidelização?">
                  <select
                    className="fi"
                    value={d.fidelizacao || ''}
                    onChange={(e) => u('fidelizacao', e.target.value)}
                  >
                    <option value="">Selecione</option>
                    <option>Sim, plano anual ou fidelidade</option>
                    <option>Sim, mas só quando o cliente pede</option>
                    <option>Não temos</option>
                  </select>
                </Field>

                <div
                  style={{
                    background: 'var(--surface)',
                    border: '1px solid var(--divider)',
                    borderRadius: 10,
                    padding: '14px',
                  }}
                >
                  <div
                    style={{
                      fontSize: 10,
                      color: 'var(--muted)',
                      fontWeight: 600,
                      letterSpacing: '.08em',
                      textTransform: 'uppercase',
                      marginBottom: 10,
                    }}
                  >
                    LTV Estimado
                  </div>
                  {[
                    { l: 'LTV por cliente', v: fmtBRL(metricas.ltv), accent: true },
                    {
                      l: 'Receita de indicações/mês',
                      v: fmtBRL((metricas.recAtual * (d.indicacao || 0)) / 100),
                    },
                    {
                      l: 'Receita de recompra/mês',
                      v: fmtBRL((recBase * (d.recompra || 0)) / 100),
                    },
                    { l: 'Tempo médio de base', v: `${d.tempoMedio || '-'} meses` },
                  ].map((x) => (
                    <div
                      key={x.l}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: '5px 0',
                        borderBottom: '1px solid var(--divider)',
                      }}
                    >
                      <span style={{ fontSize: 12, color: 'var(--muted)' }}>{x.l}</span>
                      <span
                        style={{
                          fontFamily: 'var(--font-h)',
                          fontWeight: 700,
                          fontSize: 13,
                          color: x.accent ? 'var(--accent2)' : 'var(--text)',
                        }}
                      >
                        {x.v}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === 'operacional' && (
          <div className="ai">
            <div
              style={{
                marginBottom: 16,
                padding: '12px 14px',
                borderRadius: 10,
                border: '1px solid var(--accent-border)',
                background: 'rgba(148, 0, 211, .08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 12,
                flexWrap: 'wrap',
              }}
            >
              <div style={{ fontSize: 11, color: 'var(--muted)', lineHeight: 1.5 }}>
                Pontuacao da taxa operacional:{' '}
                <strong style={{ color: 'var(--text)' }}>{respostasTaxa}/8</strong> perguntas respondidas.
              </div>
              <button
                type="button"
                onClick={() => setShowTaxaHelp(true)}
                style={{
                  padding: '8px 12px',
                  borderRadius: 8,
                  border: '1px solid var(--accent-border)',
                  background: 'rgba(255, 255, 255, .04)',
                  color: 'var(--text)',
                  fontSize: 11,
                  fontWeight: 600,
                }}
              >
                Como responder as 8 perguntas
              </button>
            </div>
            <div className="fg2">
              <div>
                <ST>Time e Estrutura</ST>
                <Field
                  label="Pessoas no comercial / atendimento"
                  hint="Pergunta 2/8: times maiores aumentam o esforco de gestao."
                >
                  <input
                    className="fi"
                    type="number"
                    placeholder="Ex.: 3"
                    value={d.equipe || ''}
                    onChange={(e) => u('equipe', Number(e.target.value))}
                  />
                </Field>
                <Field
                  label="CRM ou controle de leads?"
                  hint="Pergunta 5/8: menos estrutura atual aumenta a pontuacao."
                >
                  <select
                    className="fi"
                    value={crmSelecionado || ''}
                    onChange={(e) => u('crm', e.target.value)}
                  >
                    <option value="">Selecione</option>
                    <option value="estruturado">Sim, CRM dedicado</option>
                    <option value="basico">Sim, planilha organizada</option>
                    <option value="planilha">Informalmente, no WhatsApp</option>
                    <option value="nenhum">Não temos controle</option>
                  </select>
                </Field>
                <Field label="Script / playbook documentado?">
                  <select
                    className="fi"
                    value={d.playbook || ''}
                    onChange={(e) => u('playbook', e.target.value)}
                  >
                    <option value="">Selecione</option>
                    <option>Sim, documentado e treinado</option>
                    <option>Sim, mas cada um faz do seu jeito</option>
                    <option>Informal, na cabeça do vendedor</option>
                    <option>Não temos</option>
                  </select>
                </Field>
                <Field label="Meta de vendas definida?">
                  <select
                    className="fi"
                    value={d.metas || ''}
                    onChange={(e) => u('metas', e.target.value)}
                  >
                    <option value="">Selecione</option>
                    <option>Sim, individual e coletiva com acompanhamento</option>
                    <option>Sim, mas sem acompanhamento</option>
                    <option>Meta geral sem detalhamento</option>
                    <option>Não trabalhamos com metas</option>
                  </select>
                </Field>
              </div>

              <div>
                <ST>Processo e Ciclo de Vendas</ST>
                <Field label="Tempo médio de fechamento (dias)">
                  <input
                    className="fi"
                    type="number"
                    placeholder="Ex.: 10"
                    value={d.tempoFechamento || ''}
                    onChange={(e) => u('tempoFechamento', Number(e.target.value))}
                  />
                </Field>
                <Field
                  label="Faturamento médio mensal (R$)"
                  hint="Pergunta 1/8: operacoes maiores exigem mais estrutura."
                >
                  <input
                    className="fi"
                    type="number"
                    placeholder="Ex.: 85000"
                    value={d.faturamento || ''}
                    onChange={(e) => u('faturamento', Number(e.target.value))}
                  />
                </Field>
                <Field label="Custo operacional estimado (%)" hint="% das despesas sobre o faturamento.">
                  <input
                    className="fi"
                    type="number"
                    placeholder="Ex.: 75"
                    value={d.margem || ''}
                    onChange={(e) => u('margem', Number(e.target.value))}
                  />
                </Field>
                <Field label="Acompanhamento de resultados?">
                  <select
                    className="fi"
                    value={d.relatorio || ''}
                    onChange={(e) => u('relatorio', e.target.value)}
                  >
                    <option value="">Selecione</option>
                    <option>Sim, relatório mensal formal</option>
                    <option>Sim, informal e esporádico</option>
                    <option>Só olhamos o saldo bancário</option>
                    <option>Não temos acompanhamento</option>
                  </select>
                </Field>
                <Field
                  label="Tipo de processo comercial"
                  hint="Pergunta 3/8: processo consultivo e longo aumenta a pontuacao."
                >
                  <select
                    className="fi"
                    value={d.tipoProcesso || ''}
                    onChange={(e) => u('tipoProcesso', e.target.value)}
                  >
                    <option value="">Selecione</option>
                    <option value="simples">Simples e direto</option>
                    <option value="consultivo-leve">Consultivo leve</option>
                    <option value="consultivo-medio">Consultivo médio</option>
                    <option value="longo">Longo e complexo</option>
                  </select>
                </Field>
                <Field
                  label="Rotina de follow up"
                  hint="Pergunta 6/8: ausencia de rotina aumenta o trabalho de implantacao."
                >
                  <select
                    className="fi"
                    value={d.followUp || ''}
                    onChange={(e) => u('followUp', e.target.value)}
                  >
                    <option value="">Selecione</option>
                    <option value="padrao">Sim com padrão</option>
                    <option value="parcial">Parcial</option>
                    <option value="fraco">Muito fraco</option>
                    <option value="nenhum">Não existe</option>
                  </select>
                </Field>
                <Field
                  label="Modalidade Wayzen"
                  hint="Pergunta 7/8: hibrido/presencial tende a exigir mais dedicacao."
                >
                  <select
                    className="fi"
                    value={d.modalidade || ''}
                    onChange={(e) => u('modalidade', e.target.value)}
                  >
                    <option value="">Selecione</option>
                    <option value="remoto">Remoto</option>
                    <option value="hibrido">Híbrido</option>
                    <option value="presencial">Presencial</option>
                  </select>
                </Field>
                <Field
                  label="Urgência"
                  hint="Pergunta 8/8: maior pressao por resultado aumenta a intensidade da operacao."
                >
                  <select
                    className="fi"
                    value={d.urgencia || ''}
                    onChange={(e) => u('urgencia', e.target.value)}
                  >
                    <option value="">Selecione</option>
                    <option value="baixa">Sem urgência</option>
                    <option value="moderada">Moderada</option>
                    <option value="alta">Alta pressão</option>
                  </select>
                </Field>
                <div style={{ marginTop: 12, fontSize: 11, color: 'var(--text)' }}>
                  Taxa operacional sugerida: <strong>{fmtBRL(taxaOper)}</strong> (pontuação {pontuacaoTaxa})
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === 'experiencia' && (
          <div className="ai">
            <div className="fg2">
              <div>
                <ST>NPS e Satisfação</ST>
                <Slider
                  label="NPS estimado"
                  min={-100}
                  max={100}
                  value={d.nps || 0}
                  onChange={(v) => u('nps', v)}
                  hint="-100 a 100. Estime pela percepção se não mede."
                />
                <Field label="Coleta NPS formalmente?">
                  <select
                    className="fi"
                    value={d.coletaNps || ''}
                    onChange={(e) => u('coletaNps', e.target.value)}
                  >
                    <option value="">Selecione</option>
                    <option>Sim, NPS periódico com análise</option>
                    <option>Sim, pesquisa informal</option>
                    <option>Só quando recebe reclamação</option>
                    <option>Não coleta feedback</option>
                  </select>
                </Field>
                <Field label="Principal reclamação recorrente">
                  <input
                    className="fi"
                    placeholder="Ex.: demora, falta de comunicação, resultado abaixo"
                    value={d.reclamacao || ''}
                    onChange={(e) => u('reclamacao', e.target.value)}
                  />
                </Field>
              </div>

              <div>
                <ST>Onboarding e Jornada</ST>
                <Field label="Processo de onboarding estruturado?">
                  <select
                    className="fi"
                    value={d.onboarding || ''}
                    onChange={(e) => u('onboarding', e.target.value)}
                  >
                    <option value="">Selecione</option>
                    <option>Sim, processo formal com checkpoints</option>
                    <option>Sim, mas informal</option>
                    <option>Apenas entrega do serviço</option>
                    <option>Não temos onboarding</option>
                  </select>
                </Field>
                <Field label="Suporte ou atendimento pós-venda?">
                  <select
                    className="fi"
                    value={d.suporte || ''}
                    onChange={(e) => u('suporte', e.target.value)}
                  >
                    <option value="">Selecione</option>
                    <option>Sim, canal dedicado com SLA</option>
                    <option>Sim, WhatsApp pessoal</option>
                    <option>Informal, sem canal definido</option>
                    <option>Não temos suporte estruturado</option>
                  </select>
                </Field>
                <Field label="Acompanhamento de resultado do cliente?">
                  <select
                    className="fi"
                    value={d.acompCliente || ''}
                    onChange={(e) => u('acompCliente', e.target.value)}
                  >
                    <option value="">Selecione</option>
                    <option>Sim, check-ins periódicos</option>
                    <option>Às vezes, sem frequência</option>
                    <option>Só quando o cliente reclama</option>
                    <option>Não temos acompanhamento</option>
                  </select>
                </Field>
              </div>
            </div>
          </div>
        )}

        {tab === 'painel' && (
          <div className="ai">
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'auto 1fr',
                gap: 24,
                alignItems: 'center',
                marginBottom: 28,
                padding: '20px 24px',
                background: 'var(--surface)',
                border: '1px solid var(--divider)',
                borderRadius: 14,
              }}
            >
              <div style={{ textAlign: 'center', minWidth: 120 }}>
                <div style={{ fontFamily: 'var(--font-h)', fontWeight: 800, fontSize: '3.5rem', lineHeight: 1, color: scoreCor }}>
                  {scoreGeral}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: 'var(--muted)',
                    marginTop: 4,
                    fontWeight: 600,
                  }}
                >
                  {scoreGeral >= 70 ? 'Boa Base' : 'Atenção Necessária'}
                </div>
                <div
                  style={{
                    width: 80,
                    height: 4,
                    background: 'var(--divider)',
                    borderRadius: 2,
                    margin: '8px auto 0',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      width: scoreGeral + '%',
                      background: scoreCor,
                      borderRadius: 2,
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                {scoreItems.map((s) => (
                  <div key={s.nome} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                        <span style={{ fontSize: 11, color: 'var(--muted)' }}>{s.nome}</span>
                        <span
                          style={{
                            fontSize: 11,
                            fontWeight: 700,
                            color: s.val >= 70 ? '#00c864' : s.val >= 45 ? '#dc8c00' : '#dc003c',
                          }}
                        >
                          {s.val}
                        </span>
                      </div>
                      <div
                        style={{
                          height: 3,
                          background: 'var(--divider)',
                          borderRadius: 2,
                          overflow: 'hidden',
                        }}
                      >
                        <div
                          style={{
                            height: '100%',
                            width: s.val + '%',
                            background: s.val >= 70 ? '#00c864' : s.val >= 45 ? '#dc8c00' : '#dc003c',
                            borderRadius: 2,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 12, marginBottom: 24 }}>
              {[
                { l: 'Receita Mensal', v: fmtBRL(metricas.recAtual + metricas.recBase), ok: true },
                { l: 'Perda por Follow-up', v: fmtBRL(metricas.perdaFollowup), danger: true },
                { l: 'Perda por Desistência', v: fmtBRL(metricas.perdaDesist), danger: true },
                { l: 'Perda por Inadimplência', v: fmtBRL(metricas.perdaInadin), danger: true },
              ].map((x) => (
                <div
                  key={x.l}
                  style={{
                    padding: '14px',
                    background: x.danger ? 'rgba(220, 0, 60, .05)' : 'var(--surface)',
                    border: `1px solid ${x.danger ? 'rgba(220, 0, 60, .2)' : 'var(--divider)'}`,
                    borderRadius: 10,
                  }}
                >
                  <div
                    style={{
                      fontSize: 10,
                      color: x.danger ? '#dc003c' : 'var(--muted)',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '.06em',
                      marginBottom: 4,
                    }}
                  >
                    {x.l}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-h)',
                      fontWeight: 800,
                      fontSize: '1.2rem',
                      color: x.danger ? '#dc003c' : 'var(--text)',
                    }}
                  >
                    {x.v}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginBottom: 16 }}>
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
                Gargalos Identificados ({gargalos.length})
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {gargalos.map((g, i) => (
                  <div key={i} className={`diag-card ${g.c}`}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: 4,
                      }}
                    >
                      <div style={{ fontFamily: 'var(--font-h)', fontWeight: 700, fontSize: 13 }}>
                        {g.t}
                      </div>
                      <span
                        style={{
                          fontSize: 9,
                          padding: '2px 8px',
                          borderRadius: 100,
                          fontWeight: 600,
                          background:
                            g.c === 'danger'
                              ? 'rgba(220, 0, 60, .12)'
                              : g.c === 'warn'
                                ? 'rgba(220, 140, 0, .12)'
                                : 'rgba(0, 200, 100, .12)',
                          color: g.c === 'danger' ? '#dc003c' : g.c === 'warn' ? '#dc8c00' : '#00c864',
                        }}
                      >
                        {g.area}
                      </span>
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 6, lineHeight: 1.5 }}>
                      {g.desc}
                    </div>
                    <div style={{ fontSize: 11, borderTop: '1px solid var(--divider)', paddingTop: 6 }}>
                      <span style={{ color: 'var(--accent2)', fontWeight: 600 }}>Ação Wayzen: </span>
                      <span style={{ color: 'var(--muted)' }}>{g.acao}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Field label="Observações finais do diagnóstico">
              <textarea
                className="fi"
                style={{ minHeight: 80 }}
                placeholder="Notas do consultor, contexto adicional..."
                value={d.obsGeral || ''}
                onChange={(e) => u('obsGeral', e.target.value)}
              />
            </Field>

            {/* SELEÇÃO DO PLANO */}
            <div
              style={{
                marginTop: 8,
                padding: '20px',
                background: 'linear-gradient(135deg, rgba(148, 0, 211, .08), rgba(204, 0, 255, .04))',
                border: '1px solid var(--accent-border)',
                borderRadius: 14,
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  letterSpacing: '.1em',
                  textTransform: 'uppercase',
                  color: 'var(--accent2)',
                  marginBottom: 6,
                  fontWeight: 700,
                }}
              >
                Plano recomendado para este caso
              </div>
              <p style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.7, marginBottom: 16 }}>
                Com base no diagnóstico, escolha o plano que melhor se encaixa no momento e no
                potencial da escola. Ele será destacado na apresentação.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
                {PLANS.map((pl) => {
                  const sel = (d.planEscolhido || 'padrao') === pl.id;
                  const quando = {
                    entrada:
                      'A escola está começando a estruturar o processo comercial ou tem volume baixo de leads.',
                    padrao:
                      'A escola já tem alguma demanda entrando, mas perde na conversão ou no follow-up.',
                    agressivo:
                      'A escola tem volume, meta agressiva e quer crescimento acelerado.',
                  };
                  return (
                    <div
                      key={pl.id}
                      onClick={() => u('planEscolhido', pl.id)}
                      style={{
                        padding: '14px',
                        borderRadius: 12,
                        border: `2px solid ${sel ? 'var(--accent)' : 'var(--divider)'}`,
                        background: sel ? 'rgba(148, 0, 211, .1)' : 'rgba(255, 255, 255, .02)',
                        cursor: 'pointer',
                        transition: 'all .2s',
                        position: 'relative',
                      }}
                    >
                      {sel && (
                        <div
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            height: 2,
                            background: 'linear-gradient(90deg, var(--accent), var(--accent2))',
                            borderRadius: '12px 12px 0 0',
                          }}
                        />
                      )}
                      <div
                        style={{
                          fontFamily: 'var(--font-h)',
                          fontWeight: 800,
                          fontSize: 13,
                          marginBottom: 4,
                          color: sel ? 'var(--text)' : 'var(--muted)',
                        }}
                      >
                        {pl.label}
                      </div>
                      <div
                        style={{
                          fontSize: 11,
                          color: sel ? 'var(--accent2)' : 'var(--muted)',
                          fontWeight: 600,
                          marginBottom: 8,
                        }}
                      >
                        {pl.taxa} + {pl.loa}% LOA
                      </div>
                      <div style={{ fontSize: 11, color: 'var(--muted)', lineHeight: 1.5 }}>
                        {quando[pl.id]}
                      </div>
                      {sel && (
                        <div
                          style={{
                            marginTop: 8,
                            fontSize: 10,
                            color: 'var(--accent2)',
                            fontWeight: 700,
                            letterSpacing: '.06em',
                          }}
                        >
                          SELECIONADO
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* visualização financeira por plano */}
              <div
                style={{
                  marginTop: 24,
                  padding: 16,
                  background: 'var(--surface)',
                  border: '1px solid var(--divider)',
                  borderRadius: 12,
                }}
              >
                <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 8 }}>
                  Ganho estimado da Wayzen por matrícula (cada plano)
                </div>
                <div style={{ marginBottom: 12 }}>
                  <label style={{ fontSize: 11, color: 'var(--muted)' }}>
                    Novos alunos por mês:{' '}
                    <input
                      type="number"
                      value={previewAlunos}
                      onChange={(e) => setPreviewAlunos(Number(e.target.value))}
                      style={{ width: 60, padding: '2px 4px', fontSize: 11 }}
                    />
                  </label>
                </div>
                <div style={{ fontSize: 10, color: 'var(--muted)', marginBottom: 8 }}>
                  Taxa operacional calculada automaticamente com base nas 8 respostas (pontuação atual: {pontuacaoTaxa}).
                </div>
                <div style={{ fontSize: 9, color: 'var(--muted)', marginBottom: 8 }}>
                  barras: superior (var(--accent)) = % do LOA para Wayzen; inferior (var(--accent2)) = % restante ao cliente
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
                  {PLANS.map((pl) => {
                    const custoOperacionalPct = d.margem || 30;
                    const profitPct = 1 - custoOperacionalPct / 100;
                    const mensalidade = d.mensalidade || d.ticket || 800;
                    const recAdicional = previewAlunos * mensalidade;
                    const lucroAdicional = recAdicional * profitPct;
                    // taxa operacional sugerida automaticamente a partir das 8 respostas
                    const taxaOperacional = calcularTaxaOperacional(d, pl);
                    const loaWayzen = lucroAdicional > 0 ? lucroAdicional * (pl.loa / 100) : 0;
                    const custoTotal = taxaOperacional + loaWayzen;
                    const retorno = Math.max(0, lucroAdicional - custoTotal);
                    const percWayzen = lucroAdicional
                      ? Math.min(100, (custoTotal / lucroAdicional) * 100)
                      : 0;
                    const percCliente = lucroAdicional ? Math.max(0, 100 - percWayzen) : 0;
                    return (
                      <div key={pl.id}>
                        <div style={{ fontSize: 11, fontWeight: 600 }}>{pl.label}</div>
                        <div
                          style={{
                            height: 8,
                            background: 'var(--divider)',
                            borderRadius: 4,
                            overflow: 'hidden',
                            margin: '4px 0',
                          }}
                        >
                          <div
                            style={{
                              width: `${percWayzen}%`,
                              height: '100%',
                              background: 'var(--accent)',
                              transition: 'width .3s',
                            }}
                          />
                        </div>
                        {/* detalhamento financeiro */}
                        <div
                          style={{
                            fontSize: 11,
                            color: 'var(--muted)',
                            marginTop: 6,
                            lineHeight: 1.4,
                          }}
                        >
                          <div>Faturamento adicional: <strong>{fmtBRL(recAdicional)}</strong></div>
                          <div>LOA (lucro após custos): <strong>{fmtBRL(lucroAdicional)}</strong></div>
                          <div>Taxa operacional sugerida (pontuação {pontuacaoTaxa}): <strong>{fmtBRL(taxaOperacional)}</strong></div>
                          <div>Receita Wayzen ({pl.loa}% do LOA + taxa operacional sugerida): <strong>{fmtBRL(custoTotal)}</strong></div>
                        </div>
                        <div
                          style={{
                            height: 8,
                            background: 'var(--divider)',
                            borderRadius: 4,
                            overflow: 'hidden',
                            margin: '4px 0',
                          }}
                        >
                          <div
                            style={{
                              width: `${percCliente}%`,
                              height: '100%',
                              background: 'var(--accent2)',
                              transition: 'width .3s',
                            }}
                          />
                        </div>
                        <div style={{ fontSize: 10, color: 'var(--muted)' }}>
                          {retorno > 0 ? `Retorno ao cliente: ${fmtBRL(retorno)} (${Math.round(percCliente)}%)` : '-'}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>
        )}
      </div>

      {showTaxaHelp && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, .72)',
            zIndex: 1200,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
            backdropFilter: 'blur(3px)',
          }}
          onClick={() => setShowTaxaHelp(false)}
        >
          <div
            style={{
              width: 'min(820px, 100%)',
              maxHeight: '85vh',
              overflowY: 'auto',
              background: 'var(--surface2)',
              border: '1px solid var(--accent-border)',
              borderRadius: 14,
              padding: 20,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ fontFamily: 'var(--font-h)', fontWeight: 800, fontSize: 18, marginBottom: 8 }}>
              Guia das 8 perguntas da taxa operacional
            </div>
            <p style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.6, marginBottom: 16 }}>
              Quanto maior a complexidade da operacao atual, maior tende a ser a pontuacao total
              (intervalo de 8 a 30 pontos). Use este guia para responder com consistencia.
            </p>
            <div style={{ display: 'grid', gap: 10, marginBottom: 14 }}>
              {TAXA_HELP_ITEMS.map((item, idx) => (
                <div
                  key={item.id}
                  style={{
                    border: '1px solid var(--divider)',
                    borderRadius: 10,
                    padding: '10px 12px',
                    background: 'rgba(255, 255, 255, .02)',
                  }}
                >
                  <div style={{ fontSize: 11, color: 'var(--accent2)', fontWeight: 700, marginBottom: 4 }}>
                    Pergunta {idx + 1}
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>{item.pergunta}</div>
                  <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.5 }}>{item.detalhe}</div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button
                type="button"
                onClick={() => setShowTaxaHelp(false)}
                style={{
                  padding: '9px 14px',
                  borderRadius: 8,
                  border: '1px solid var(--divider)',
                  background: 'rgba(255, 255, 255, .04)',
                  color: 'var(--text)',
                  fontSize: 12,
                  fontWeight: 600,
                }}
              >
                Fechar guia
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
