/* ===================================================================
   COMPONENTS / SLIDE5.JSX - O Que Instalamos
   =================================================================== */

import { useMemo } from 'react';
import SlideShell from './SlideShell';
import Icon from './Icon';
import { PLANS, SPRINTS, TEAM } from '../data';
import { calcularScore } from '../utils';

export default function Slide5({ diag }) {
  const resp = Number(diag?.tempo || 0);
  const noRet = Number(diag?.semRetorno || 0);
  const conv = Number(diag?.conversao || 0);
  const respK = resp <= 10 ? 'ok' : resp <= 60 ? 'warn' : 'bad';
  const fuK = noRet <= 25 ? 'ok' : noRet <= 45 ? 'warn' : 'bad';
  const convK = conv >= 30 ? 'ok' : conv >= 18 ? 'warn' : 'bad';
  const badgeCls = (k) => (k === 'ok' ? 'bok' : k === 'warn' ? 'bw' : 'br');
  const badgeTxt = (k) => (k === 'ok' ? 'Ok' : k === 'warn' ? 'Atenção' : 'Crítico');
  
  const { scoreItems, scoreGeral, scoreCor } = useMemo(() => calcularScore(diag || {}), [diag]);

  return (
    <SlideShell
      badge="O que instalamos"
      title={<>Fechamos os vazamentos e <span className="glow-text">instalamos rotina de conversão</span>.</>}
      subtitle="O problema normalmente não é falta de demanda. É falta de velocidade, follow-up e processo."
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: 'clamp(12px, 2vw, 20px)' }}>
        {/* SCORE GERAL */}
        <div
          className="card"
          style={{
            borderRadius: 16,
            background: `linear-gradient(135deg, ${scoreCor}15, transparent)`,
            borderColor: scoreCor,
            borderWidth: 2,
            gridColumn: 'span 2',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            padding: '32px',
          }}
        >
          <div style={{ fontSize: 14, color: 'var(--muted)', marginBottom: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.1em' }}>
            Score da Operação
          </div>
          <div style={{ fontSize: 64, fontWeight: 900, fontFamily: 'var(--font-h)', color: scoreCor, marginBottom: 16 }}>
            {scoreGeral}
          </div>
          <div
            style={{
              width: '100%',
              maxWidth: 200,
              height: 8,
              background: 'rgba(255,255,255,.1)',
              borderRadius: 4,
              overflow: 'hidden',
              marginBottom: 12,
            }}
          >
            <div
              style={{
                width: `${scoreGeral}%`,
                height: '100%',
                background: scoreCor,
                transition: 'width .3s',
              }}
            />
          </div>
          <div style={{ fontSize: 12, color: 'var(--muted)' }}>
            {scoreGeral >= 70 ? 'Operação saudável' : scoreGeral >= 45 ? 'Oportunidades de melhoria' : 'Alerta: intervenção necessária'}
          </div>
        </div>
        
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
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: 'clamp(8px, 1.5vw, 12px)' }}>
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

        {/* OBSERVAÇÕES DO CLIENTE */}
        {diag?.obs && (
          <div
            className="card"
            style={{
              borderRadius: 16,
              borderColor: 'var(--accent-border)',
              background: 'linear-gradient(135deg,rgba(148,0,211,.06),transparent)',
              marginTop: 'clamp(12px, 2vw, 20px)',
            }}
          >
            <div
              style={{
                fontSize: 11,
                letterSpacing: '.1em',
                textTransform: 'uppercase',
                color: 'var(--muted)',
                marginBottom: 8,
                fontWeight: 600,
              }}
            >
              Contexto da Escola
            </div>
            <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.8 }}>
              {diag.obs}
            </div>
          </div>
        )}
      </div>
    </SlideShell>
  );
}
