/* ===================================================================
   COMPONENTS / SLIDE5.JSX - O Que Instalamos
   =================================================================== */

import { useMemo } from 'react';
import SlideShell from './SlideShell';
import Icon from './Icon';
import { PLANS, SPRINTS, TEAM } from '../data';

export default function Slide5({ diag }) {
  const resp = Number(diag.tempo || 0);
  const noRet = Number(diag.semRetorno || 0);
  const conv = Number(diag.conversao || 0);
  const respK = resp <= 10 ? 'ok' : resp <= 60 ? 'warn' : 'bad';
  const fuK = noRet <= 25 ? 'ok' : noRet <= 45 ? 'warn' : 'bad';
  const convK = conv >= 30 ? 'ok' : conv >= 18 ? 'warn' : 'bad';
  const badgeCls = (k) => (k === 'ok' ? 'bok' : k === 'warn' ? 'bw' : 'br');
  const badgeTxt = (k) => (k === 'ok' ? 'Ok' : k === 'warn' ? 'Atenção' : 'Crítico');

  return (
    <SlideShell
      badge="O que instalamos"
      title={<>Fechamos os vazamentos e <span className="glow-text">instalamos rotina de conversão</span>.</>}
      subtitle="O problema normalmente não é falta de demanda. É falta de velocidade, follow-up e processo."
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <div className="card" style={{ borderRadius: 16, marginBottom: 14 }}>
            <div
              style={{
                fontSize: 11,
                letterSpacing: '.1em',
                textTransform: 'uppercase',
                color: 'var(--muted)',
                marginBottom: 12,
                fontWeight: 600,
              }}
            >
              Diagnóstico da operação atual
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10 }}>
              {[
                { l: '1ª resposta', v: `${resp} min`, k: respK },
                { l: 'Sem follow-up', v: `${noRet}%`, k: fuK },
                { l: 'Conversão', v: `${conv}%`, k: convK },
              ].map((x, i) => (
                <div
                  key={i}
                  style={{
                    padding: '12px',
                    background: 'rgba(255,255,255,.03)',
                    border: '1px solid var(--divider)',
                    borderRadius: 10,
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: 6,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 10,
                        color: 'var(--muted)',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                      }}
                    >
                      {x.l}
                    </span>
                    <span className={`badge ${badgeCls(x.k)}`}>{badgeTxt(x.k)}</span>
                  </div>
                  <div style={{ fontFamily: 'var(--font-h)', fontWeight: 900, fontSize: 18 }}>
                    {x.v}
                  </div>
                </div>
              ))}
            </div>
            <div
              style={{
                marginTop: 12,
                fontSize: 12,
                color: 'var(--muted)',
                lineHeight: 1.7,
              }}
            >
              Com base nesses sinais, a Wayzen instala: SLA, cadência de follow-up, scripts,
              funil e governança semanal: dentro da sua operação.
            </div>
          </div>
          <div
            className="card"
            style={{
              borderRadius: 16,
              borderColor: 'var(--accent-border)',
              background: 'linear-gradient(135deg,rgba(148,0,211,.06),transparent)',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-h)',
                fontWeight: 800,
                fontSize: 15,
                marginBottom: 10,
              }}
            >
              A presença no dia a dia faz diferença
            </div>
            {[
              'Ajuste de script acontece amanhã, não em 15 dias',
              'Gargalo identificado e resolvido na semana',
              'Equipe cobrada e treinada de dentro, não por e-mail',
              'Relatório é consequência: a operação é o foco',
            ].map((t, i) => (
              <div key={i} className="ci">
                <div className="ci-icon">
                  <Icon n="ck" s={11} c="var(--accent2)" />
                </div>
                <div style={{ fontSize: 12, color: 'var(--text)', lineHeight: 1.6 }}>{t}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: 'grid', gap: 12 }}>
          {[
            {
              t: 'SLA e priorização',
              d: 'Resposta rápida ao lead quente. O concorrente não tem tempo para roubar a oportunidade.',
            },
            {
              t: 'Follow-up obrigatório',
              d: 'Cadência de 5 touchpoints antes de arquivar. Recupera oportunidade que hoje some por falta de rotina.',
            },
            {
              t: 'Script e objeções',
              d: 'Linguagem padronizada, testada e otimizada semanalmente com base no que está fechando.',
            },
            {
              t: 'Registro e KPIs',
              d: 'O que não está registrado não existe. O funil mostra onde estão perdendo e quanto.',
            },
          ].map((x, i) => (
            <div key={i} className="card" style={{ borderRadius: 14 }}>
              <div
                style={{
                  fontFamily: 'var(--font-h)',
                  fontWeight: 900,
                  fontSize: 14,
                  marginBottom: 4,
                }}
              >
                {x.t}
              </div>
              <div style={{ color: 'var(--muted)', fontSize: 12, lineHeight: 1.7 }}>{x.d}</div>
            </div>
          ))}
        </div>
      </div>
    </SlideShell>
  );
}
