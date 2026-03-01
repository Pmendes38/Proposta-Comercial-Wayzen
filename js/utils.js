/* ===================================================================
   UTILS.JS - Funções Utilitárias Comuns
   =================================================================== */

import { useCallback, useState } from 'react';

/**
 * Formata um valor numérico como BRL (Real Brasileiro)
 * @param {number} v - Valor a formatar
 * @returns {string} Valor formatado
 */
export const fmtBRL = (v) => 'R$ ' + Math.round(v || 0).toLocaleString('pt-BR');

/**
 * Hook customizado para localStorage com JSON
 * @param {string} key - Chave de armazenamento
 * @param {any} init - Valor inicial padrão
 * @returns {[any, function]} Estado e função para atualizar
 */
export function useLS(key, init) {
  const [v, sv] = useState(() => {
    try {
      const s = localStorage.getItem(key);
      return s ? JSON.parse(s) : init;
    } catch {
      return init;
    }
  });

  const set = useCallback(
    (val) => {
      sv(val);
      try {
        localStorage.setItem(key, JSON.stringify(val));
      } catch {}
    },
    [key]
  );

  return [v, set];
}

/**
 * Calcula gargalos do diagnóstico
 * @param {object} d - Dados do diagnóstico
 * @returns {array} Array de gargalos identificados
 */
export function calcularGargalos(d) {
  const g = [];

  if (d.tempo > 30)
    g.push({
      t: 'Demora na Resposta',
      c: 'danger',
      area: 'Aquisição',
      desc: 'Quando a resposta demora, a decisão vai para o concorrente.',
      acao: 'SLA obrigatório + rotina de priorização. Meta: <5 min no comercial.',
    });

  if (d.semRetorno > 40)
    g.push({
      t: 'Follow-up Inexistente',
      c: 'danger',
      area: 'Aquisição',
      desc: 'O contato não diz "não". Ele some. E o dinheiro vai junto.',
      acao: 'Cadência obrigatória com no mínimo 5 touchpoints antes de arquivar.',
    });

  if (d.conversao < 20)
    g.push({
      t: 'Conversão Baixa',
      c: 'warn',
      area: 'Aquisição',
      desc: 'Sem funil e scripts, a taxa tende a estagnar ou cair.',
      acao: 'Playbook completo, scripts de objeções e metas por etapa do funil.',
    });

  if (!d.canais.length || d.canais.length === 1)
    g.push({
      t: 'Canal Único de Demanda',
      c: 'warn',
      area: 'Aquisição',
      desc: 'Concentração de risco. Um canal parado interrompe toda a entrada.',
      acao: 'Mapeamento e diversificação em pelo menos 3 canais.',
    });

  if (d.cac > 0 && d.ticket > 0 && d.cac > d.ticket * 0.3)
    g.push({
      t: 'CAC Elevado',
      c: 'warn',
      area: 'Aquisição',
      desc: 'Custo de aquisição representa mais de 30% do ticket.',
      acao: 'Revisão de canais pagos e ativação de canais orgânicos.',
    });

  if ((d.desistencia || 0) > 15)
    g.push({
      t: 'Desistência Alta',
      c: 'danger',
      area: 'Base Ativa',
      desc: `Taxa de ${d.desistencia || 0}% indica problemas de entrega ou experiência.`,
      acao: 'Diagnóstico de causa raiz: onboarding, qualidade, suporte.',
    });

  if ((d.inadimplencia || 0) > 10)
    g.push({
      t: 'Inadimplência Crítica',
      c: 'danger',
      area: 'Base Ativa',
      desc: `${d.inadimplencia || 0}% compromete o fluxo de caixa.`,
      acao: 'Régua de cobrança automática e revisão de política de crédito.',
    });

  if ((d.churn || 0) > 5)
    g.push({
      t: 'Churn Mensal Alto',
      c: 'warn',
      area: 'Base Ativa',
      desc: `Churn de ${d.churn || 0}%: perde +${Math.round((d.churn || 0) * 12)}% da base em 1 ano.`,
      acao: 'Programa de retenção ativa, pesquisa de saída e sucesso do cliente.',
    });

  if ((d.recompra || 0) < 20)
    g.push({
      t: 'Recompra Baixa',
      c: 'warn',
      area: 'LTV',
      desc: 'Pouca receita recorrente da base. Aquisição é o único motor.',
      acao: 'Esteira de produtos, upsell ativo e relacionamento pós-venda.',
    });

  if ((d.indicacao || 0) < 15)
    g.push({
      t: 'Indicação Quase Zero',
      c: 'warn',
      area: 'LTV',
      desc: 'Clientes satisfeitos não estão sendo ativados como canal.',
      acao: 'Programa de indicação estruturado com incentivos claros.',
    });

  if ((d.nps || 0) < 30)
    g.push({
      t: 'NPS Crítico',
      c: 'danger',
      area: 'Experiência',
      desc: `NPS de ${d.nps || 0}: alto risco de saída, sem promotores ativos.`,
      acao: 'Diagnóstico de jornada e plano de recuperação de detratores.',
    });

  if ((d.nps || 0) >= 30 && (d.nps || 0) < 50)
    g.push({
      t: 'NPS em Zona de Melhoria',
      c: 'warn',
      area: 'Experiência',
      desc: `NPS de ${d.nps || 0}: espaço relevante para melhorar experiência.`,
      acao: 'Mapeamento de pontos de atrito e ações pontuais.',
    });

  if ((d.tempoFechamento || 0) > 14)
    g.push({
      t: 'Ciclo de Fechamento Longo',
      c: 'warn',
      area: 'Operacional',
      desc: `Ciclo de ${d.tempoFechamento || 0} dias: falta urgência ou cadência.`,
      acao: 'Scripts de fechamento e follow-up estruturado pós-proposta.',
    });

  if ((d.equipe || 0) === 0)
    g.push({
      t: 'Sem Time Comercial',
      c: 'warn',
      area: 'Operacional',
      desc: 'Crescimento limitado à capacidade do dono.',
      acao: 'Estruturação do primeiro vendedor com playbook e metas.',
    });

  if (g.length === 0)
    g.push({
      t: 'Base com Potencial Real',
      c: 'ok',
      area: 'Geral',
      desc: 'Números indicam base razoável. Foco em conversão e LTV.',
      acao: 'Estabilização e governança. Próximo: LTV e reativação de base.',
    });

  return g;
}

/**
 * Calcula métricas financeiras do diagnóstico
 * @param {object} d - Dados do diagnóstico
 * @returns {object} Objeto com métricas calculadas
 */
export function calcularMetricas(d) {
  const recAtual = d.contatos * 4.3 * (d.conversao / 100) * d.ticket;
  const perdaFollowup = d.contatos * 4.3 * (d.semRetorno / 100) * d.ticket * 0.12;
  const baseAtiva = d.baseAlunos || 0;
  const recBase = baseAtiva * (d.mensalidade || d.ticket || 0);
  const perdaDesist = baseAtiva * (d.desistencia || 0) / 100 * (d.mensalidade || d.ticket || 0);
  const perdaInadin = recBase * (d.inadimplencia || 0) / 100;
  const ltv = (d.mensalidade || d.ticket || 0) * Math.max(1, 12 - (d.churn || 0) / 100 * 12);

  return {
    recAtual,
    perdaFollowup,
    baseAtiva,
    recBase,
    perdaDesist,
    perdaInadin,
    ltv,
  };
}

/**
 * Calcula score geral da operação
 * @param {object} d - Dados do diagnóstico
 * @returns {object} Score e itens de avaliação
 */
export function calcularScore(d) {
  const scoreItems = [
    {
      nome: 'Velocidade de resposta',
      val: d.tempo <= 5 ? 100 : d.tempo <= 30 ? 70 : d.tempo <= 120 ? 40 : 10,
    },
    {
      nome: 'Follow-up',
      val: d.semRetorno <= 20 ? 100 : d.semRetorno <= 40 ? 60 : d.semRetorno <= 60 ? 30 : 10,
    },
    { nome: 'Conversão', val: d.conversao >= 40 ? 100 : d.conversao >= 25 ? 75 : d.conversao >= 15 ? 50 : 25 },
    {
      nome: 'Retenção',
      val:
        (d.desistencia || 0) <= 5
          ? 100
          : (d.desistencia || 0) <= 10
            ? 70
            : (d.desistencia || 0) <= 20
              ? 40
              : 15,
    },
    {
      nome: 'Inadimplência',
      val:
        (d.inadimplencia || 0) <= 3
          ? 100
          : (d.inadimplencia || 0) <= 7
            ? 70
            : (d.inadimplencia || 0) <= 15
              ? 40
              : 15,
    },
    { nome: 'NPS', val: (d.nps || 0) >= 70 ? 100 : (d.nps || 0) >= 50 ? 75 : (d.nps || 0) >= 30 ? 50 : 20 },
    {
      nome: 'Indicação',
      val: (d.indicacao || 0) >= 30 ? 100 : (d.indicacao || 0) >= 15 ? 70 : (d.indicacao || 0) >= 5 ? 40 : 10,
    },
    {
      nome: 'Recompra',
      val:
        (d.recompra || 0) >= 40 ? 100 : (d.recompra || 0) >= 25 ? 70 : (d.recompra || 0) >= 10 ? 40 : 10,
    },
  ];

  const scoreGeral = Math.round(scoreItems.reduce((a, x) => a + x.val, 0) / scoreItems.length);
  const scoreCor = scoreGeral >= 70 ? '#00c864' : scoreGeral >= 45 ? '#dc8c00' : '#dc003c';

  return { scoreItems, scoreGeral, scoreCor };
}
