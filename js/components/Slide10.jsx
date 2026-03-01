/* ===================================================================
   COMPONENTS / SLIDE10.JSX - INVESTIMENTO
   =================================================================== */

import { useState } from 'react';
import SlideShell from './SlideShell';
import Ic from './Icon';
import { fmtBRL } from '../utils';
import { PLANS, SPRINTS, TEAM } from '../data';

export default function Slide10({ selectedPlan, onSelect, diag }) {
  const planId = diag.planEscolhido || selectedPlan || 'padrao';
  const p = PLANS.find((x) => x.id === planId) || PLANS[1];
  const baseAlunos = diag.baseAlunos || 100;
  const mensalidade = diag.mensalidade || diag.ticket || 800;
  const margemPct = diag.margem || 30;
  const [novosAlunos, setNovosAlunos] = useState(20);
  const recAtual = baseAlunos * mensalidade;
  const recAdicional = novosAlunos * mensalidade;
  const recTotal = recAtual + recAdicional;
  const lucroAtual = recAtual * (margemPct / 100);
  const lucroTotal = recTotal * (margemPct / 100);
  const lucroAdicional = lucroTotal - lucroAtual;
  const taxaMedia = (p.taxaMin + p.taxaMax) / 2;
  const loaWayzen = lucroAdicional > 0 ? lucroAdicional * (p.loa / 100) : 0;
  const custoTotalWayzen = taxaMedia + loaWayzen;
  const retornoLiquidoEscola = lucroAdicional - custoTotalWayzen;
  const propWayzen =
    lucroAdicional > 0 ? Math.min(100, (custoTotalWayzen / lucroAdicional) * 100) : 0;
  const propEscola = Math.max(0, 100 - propWayzen);
  const quando = {
    entrada: 'Melhor para validar o processo. Volume baixo ou comercial ainda nao estruturado.',
    padrao: 'Equilibrio ideal para a maioria dos casos. Execucao real com custo controlado.',
    agressivo: 'Para crescimento acelerado. Meta agressiva e disposicao para investir mais.',
  };

  return (
    <SlideShell
      badge="Investimento"
      title={
        <>
          Taxa de operacao + <span className="glow-text">participacao no resultado</span>.
        </>
      }
      subtitle="Uma taxa fixa para viabilizar a presenca da equipe e uma participacao no lucro adicional gerado. Se a escola nao crescer, a Wayzen nao cobra LOA."
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr .6fr', gap: 16, alignItems: 'start' }}>
        <div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3,1fr)',
              gap: 10,
              marginBottom: 16,
            }}
          >
            {PLANS.map((pl) => {
              const sel = pl.id === planId;
              return (
                <div
                  key={pl.id}
                  className={`plan ${sel ? 'sel' : ''}`}
                  onClick={() => onSelect(pl.id)}
                  style={{ borderRadius: 14, padding: '18px' }}
                >
                  {pl.destaque && (
                    <div
                      className="badge ba"
                      style={{ position: 'absolute', top: 12, right: 12, fontSize: 9 }}
                    >
                      Popular
                    </div>
                  )}
                  <div
                    style={{
                      fontFamily: 'var(--font-h)',
                      fontWeight: 900,
                      fontSize: 14,
                      marginBottom: 5,
                    }}
                  >
                    {pl.label}
                  </div>
                  <div
                    style={{
                      color: 'var(--muted)',
                      fontSize: 11,
                      marginBottom: 10,
                      lineHeight: 1.5,
                    }}
                  >
                    {quando[pl.id]}
                  </div>
                  <div
                    style={{
                      fontSize: 10,
                      color: 'var(--muted)',
                      fontWeight: 700,
                      letterSpacing: '.06em',
                      textTransform: 'uppercase',
                    }}
                  >
                    Taxa operacional
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-h)',
                      fontWeight: 900,
                      fontSize: 13,
                      marginBottom: 8,
                    }}
                  >
                    {pl.taxa}
                  </div>
                  <div
                    style={{
                      fontSize: 10,
                      color: 'var(--muted)',
                      fontWeight: 700,
                      letterSpacing: '.06em',
                      textTransform: 'uppercase',
                    }}
                  >
                    Participacao no LOA
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-h)',
                      fontWeight: 900,
                      fontSize: 14,
                      color: 'var(--accent2)',
                    }}
                  >
                    {pl.loa}%
                  </div>
                  {sel && diag.planEscolhido === pl.id && (
                    <div
                      style={{
                        marginTop: 8,
                        fontSize: 9,
                        color: '#00c864',
                        fontWeight: 700,
                        letterSpacing: '.06em',
                      }}
                    >
                      RECOMENDADO NO DIAGNOSTICO
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <div className="card" style={{ borderRadius: 16 }}>
            <div
              style={{
                fontFamily: 'var(--font-h)',
                fontWeight: 900,
                fontSize: 15,
                marginBottom: 4,
              }}
            >
              Quanto a escola ganha com a operacao rodando
            </div>
            <div
              style={{
                fontSize: 12,
                color: 'var(--muted)',
                lineHeight: 1.6,
                marginBottom: 18,
              }}
            >
              Simulacao baseada nos dados do diagnostico. Ajuste o numero de novos alunos por mes para
              visualizar o impacto no resultado da escola e o custo da Wayzen.
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3,1fr)',
                gap: 8,
                marginBottom: 20,
                padding: '14px',
                background: 'rgba(255,255,255,.02)',
                border: '1px solid var(--divider)',
                borderRadius: 10,
              }}
            >
              {[
                { l: 'Alunos ativos hoje', v: baseAlunos.toLocaleString('pt-BR') },
                { l: 'Mensalidade media', v: fmtBRL(mensalidade) },
                { l: 'Margem operacional', v: `${margemPct}%` },
              ].map((x) => (
                <div key={x.l} style={{ textAlign: 'center' }}>
                  <div
                    style={{
                      fontSize: 10,
                      color: 'var(--muted)',
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
                      fontSize: 15,
                    }}
                  >
                    {x.v}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginBottom: 22 }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: 8,
                  alignItems: 'center',
                }}
              >
                <span
                  style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 500 }}
                >
                  Novos alunos matriculados por mes com a Wayzen
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-h)',
                    fontWeight: 800,
                    fontSize: 22,
                    color: 'var(--accent2)',
                  }}
                >
                  {novosAlunos}
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={150}
                value={novosAlunos}
                onChange={(e) => setNovosAlunos(Number(e.target.value))}
              />
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: 10,
                  color: 'var(--muted)',
                  marginTop: 4,
                }}
              >
                <span>0 alunos novos</span>
                <span>150 alunos novos</span>
              </div>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 12,
                marginBottom: 14,
              }}
            >
              <div
                style={{
                  padding: '18px',
                  background: 'rgba(0,200,100,.04)',
                  border: '1px solid rgba(0,200,100,.15)',
                  borderRadius: 12,
                }}
              >
                <div
                  style={{
                    fontSize: 10,
                    color: '#00c864',
                    fontWeight: 700,
                    letterSpacing: '.08em',
                    textTransform: 'uppercase',
                    marginBottom: 14,
                  }}
                >
                  Receita da Escola
                </div>
                {[
                  { l: 'Receita atual (base existente)', v: fmtBRL(recAtual) },
                  { l: 'Receita adicional com novos alunos', v: fmtBRL(recAdicional), accent: true },
                  { l: 'Receita total projetada', v: fmtBRL(recTotal), big: true },
                  { l: 'Lucro adicional estimado', v: fmtBRL(lucroAdicional), green: true },
                ].map((x) => (
                  <div
                    key={x.l}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '7px 0',
                      borderBottom: '1px solid rgba(0,200,100,.08)',
                    }}
                  >
                    <span
                      style={{
                        fontSize: 11,
                        color: 'var(--muted)',
                        lineHeight: 1.4,
                        maxWidth: '55%',
                      }}
                    >
                      {x.l}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-h)',
                        fontWeight: x.big ? 900 : 700,
                        fontSize: x.big ? 16 : 12,
                        color: x.green
                          ? '#00c864'
                          : x.accent
                          ? 'var(--accent2)'
                          : 'var(--text)',
                      }}
                    >
                      {x.v}
                    </span>
                  </div>
                ))}
                {lucroAdicional > 0 && (
                  <div
                    style={{
                      marginTop: 12,
                      padding: '10px 12px',
                      background: 'rgba(0,200,100,.08)',
                      borderRadius: 8,
                    }}
                  >
                    <div
                      style={{ fontSize: 10, color: '#00c864', fontWeight: 700, marginBottom: 2 }}
                    >
                      Retorno liquido da escola
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-h)',
                        fontWeight: 900,
                        fontSize: 20,
                        color: '#00c864',
                      }}
                    >
                      {fmtBRL(Math.max(0, retornoLiquidoEscola))}
                    </div>
                    <div
                      style={{ fontSize: 10, color: 'var(--muted)', marginTop: 2 }}
                    >
                      por mes, apos descontar o custo Wayzen
                    </div>
                  </div>
                )}
              </div>
              <div
                style={{
                  padding: '18px',
                  background: 'var(--accent-soft)',
                  border: '1px solid var(--accent-border)',
                  borderRadius: 12,
                }}
              >
                <div
                  style={{
                    fontSize: 10,
                    color: 'var(--accent2)',
                    fontWeight: 700,
                    letterSpacing: '.08em',
                    textTransform: 'uppercase',
                    marginBottom: 14,
                  }}
                >
                  Wayzen ({p.label})
                </div>
                {[
                  { l: 'Taxa operacional (media)', v: fmtBRL(taxaMedia) },
                  { l: `Participacao no lucro adicional (${p.loa}%)`, v: fmtBRL(loaWayzen) },
                  { l: 'Custo total Wayzen', v: fmtBRL(custoTotalWayzen), big: true },
                ].map((x) => (
                  <div
                    key={x.l}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '7px 0',
                      borderBottom: '1px solid var(--divider)',
                    }}
                  >
                    <span
                      style={{
                        fontSize: 11,
                        color: 'var(--muted)',
                        lineHeight: 1.4,
                        maxWidth: '55%',
                      }}
                    >
                      {x.l}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-h)',
                        fontWeight: x.big ? 900 : 700,
                        fontSize: x.big ? 16 : 12,
                        color: 'var(--text)',
                      }}
                    >
                      {x.v}
                    </span>
                  </div>
                ))}
                <div
                  style={{
                    marginTop: 12,
                    padding: '10px 12px',
                    background: 'rgba(148,0,211,.12)',
                    borderRadius: 8,
                    fontSize: 11,
                    color: 'var(--muted)',
                    lineHeight: 1.6,
                  }}
                >
                  A participacao so existe se houver lucro adicional gerado. A porcentagem do LOA e fixa no plano e nunca aumenta alem do acordado.
                </div>
                {lucroAdicional > 0 && (
                  <div style={{ marginTop: 12 }}>
                    <div
                      style={{ fontSize: 10, color: 'var(--muted)', marginBottom: 6, fontWeight: 600 }}
                    >
                      Como o lucro adicional se divide
                    </div>
                    <div
                      style={{
                        height: 10,
                        borderRadius: 999,
                        overflow: 'hidden',
                        background: 'rgba(255,255,255,.06)',
                        display: 'flex',
                      }}
                    >
                      <div
                        style={{
                          width: `${propWayzen}%`,
                          background: 'linear-gradient(90deg,var(--accent),var(--accent2))',
                          transition: 'width .4s ease',
                        }}
                      />
                      <div
                        style={{ flex: 1, background: 'rgba(0,200,100,.35)', transition: 'flex .4s ease' }}
                      />
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginTop: 5,
                      }}
                    >
                      <span
                        style={{ fontSize: 10, color: 'var(--accent2)', fontWeight: 600 }}
                      >
                        Wayzen: {Math.round(propWayzen)}%
                      </span>
                      <span
                        style={{ fontSize: 10, color: '#00c864', fontWeight: 600 }}
                      >
                        Escola: {Math.round(propEscola)}%
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div
              style={{
                fontSize: 10,
                color: 'var(--muted)',
                lineHeight: 1.6,
                padding: '8px 12px',
                background: 'rgba(255,255,255,.02)',
                borderRadius: 8,
              }}
            >
              Simulacao estimada com base nos dados do diagnostico. Os valores reais dependem do faturamento e da margem apurada no fechamento mensal via DRE ou demonstrativo gerencial.
            </div>
          </div>
        </div>
        <div style={{ display: 'grid', gap: 12 }}>
          <div className="card" style={{ borderRadius: 14, borderColor: 'var(--accent-border)' }}>
            <div
              style={{ fontFamily: 'var(--font-h)', fontWeight: 900, fontSize: 14, marginBottom: 8 }}
            >
              Como apuramos o LOA
            </div>
            <div style={{ color: 'var(--muted)', fontSize: 12, lineHeight: 1.8 }}>
              Via DRE, balancete ou demonstrativo gerencial do financeiro ou contador. O contrato define o
              padrao minimo e o calendario de entrega.
            </div>
          </div>
          <div className="card" style={{ borderRadius: 14 }}>
            <div
              style={{ fontFamily: 'var(--font-h)', fontWeight: 900, fontSize: 14, marginBottom: 10 }}
            >
              Calendario
            </div>
            {[
              { l: 'Dia 01 a 03', v: 'Entrega do fechamento do mes anterior' },
              { l: 'Dia 04 a 05', v: 'Wayzen valida o LOA' },
              { l: 'Dia 10', v: 'Pagamento da taxa e participacao' },
            ].map((x, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: 10,
                  padding: '8px 0',
                  borderBottom: '1px solid var(--divider)',
                }}
              >
                <span style={{ fontSize: 11, color: 'var(--muted)', flexShrink: 0 }}>{x.l}</span>
                <span style={{ fontSize: 11, color: 'var(--text)', textAlign: 'right' }}>{x.v}</span>
              </div>
            ))}
          </div>
          <div className="card" style={{ borderRadius: 14 }}>
            <div
              style={{ fontFamily: 'var(--font-h)', fontWeight: 900, fontSize: 14, marginBottom: 8 }}
            >
              O que esta incluido
            </div>
            {[
              'Especialista alocado durante os 4 sprints',
              'Playbook e scripts desenvolvidos',
              'Operacao comercial instalada e rodando',
              'Treinamento e transferencia do metodo',
              'Contratacao do operador dedicado ao final',
            ].map((t, i) => (
              <div key={i} className="ci">
                <div className="ci-icon">
                  <Ic n="ck" s={11} c="var(--accent2)" />
                </div>
                <div style={{ fontSize: 11, color: 'var(--text)', lineHeight: 1.6 }}>{t}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SlideShell>
  );
}
