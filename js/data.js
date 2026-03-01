/* ===================================================================
   DATA.JS - Constantes e Dados de Toda a Aplicação
   =================================================================== */

export const PLANS = [
  {
    id: 'entrada',
    label: 'Entrada Fácil',
    sub: 'Para começar com baixa fricção.',
    taxa: 'R$ 600 – R$ 1.000/mês',
    taxaMin: 600,
    taxaMax: 1000,
    loa: 20,
    rec: 'Indicado para primeiro ciclo de validação (60 dias).',
  },
  {
    id: 'padrao',
    label: 'Modelo Padrão',
    sub: 'Equilíbrio entre execução e retorno.',
    taxa: 'R$ 1.000 – R$ 1.800/mês',
    taxaMin: 1000,
    taxaMax: 1800,
    loa: 15,
    rec: 'Maior alinhamento com retorno e menor fricção.',
    destaque: true,
  },
  {
    id: 'agressivo',
    label: 'Agressivo',
    sub: 'Para quem quer acelerar com força.',
    taxa: 'R$ 1.800 – R$ 2.500/mês',
    taxaMin: 1800,
    taxaMax: 2500,
    loa: 10,
    rec: 'Quando há urgência real e potencial alto.',
  },
];

export const SPRINTS = [
  {
    n: '01',
    titulo: 'Diagnóstico e Blueprint',
    texto:
      'Mapeamos toda a operação atual: funil, canais, scripts, SLA e KPIs. O playbook sai pronto no fim da semana.',
    entregaveis: [
      'Playbook comercial completo',
      'Scripts de abordagem e objeções',
      'Funil com etapas e campos obrigatórios',
      'KPIs e metas diárias/semanais',
      'Mapeamento de canais e SLA de resposta',
    ],
  },
  {
    n: '02',
    titulo: 'Execução Guiada',
    texto:
      'Operação ativa dentro da empresa com rotina e ajustes diários. Presença real, não relatório.',
    entregaveis: [
      'Operação com registro obrigatório no CRM',
      'Testes A/B de abordagem',
      'Correções diárias de linguagem e oferta',
      'SLA de resposta implantado e monitorado',
      'Relatório semanal com indicadores reais',
    ],
  },
  {
    n: '03',
    titulo: 'Estabilização',
    texto: 'O que funciona vira padrão. A conversão sobe e a equipe internaliza a rotina.',
    entregaveis: [
      'Script campeão consolidado e treinado',
      'Metas por etapa do funil com cobrança',
      'Organização para previsibilidade de receita',
      'Ajustes em proposta e pacotes de oferta',
      'Relatório semanal com aprendizados',
    ],
  },
  {
    n: '04',
    titulo: 'Consolidação',
    texto:
      'Playbook final, governança entregue. A operação roda com ou sem a Wayzen do lado.',
    entregaveis: [
      'Playbook final revisado e atualizado',
      'Treinamento prático com simulações reais',
      'Documento de governança e rituais',
      'Relatório comparativo antes/depois',
      'Plano de continuidade para os próximos 60 dias',
    ],
  },
];

export const TEAM = [
  {
    nome: 'Pedro Mendes',
    cargo: 'Estrategista e Fundador da Wayzen',
    bio: 'Pedro lidera a estratégia, define o playbook comercial e garante que a operação aconteça de dentro da empresa do cliente.',
    expanded:
      '8 anos de experiência com marketing e vendas para o ramo educacional. Especialista em estruturação de funil, scripts e cadência de atendimento. Conhece profundamente a jornada do aluno: da captação do lead à retenção de longo prazo. É ele quem conduz o diagnóstico inicial e define o modelo de operação para cada cliente.',
    icon: '🧠',
    fotoAlt: 'Pedro Mendes',
    foto: null,
  },
  {
    nome: 'Matheus',
    cargo: 'Especialista em Construção de Comerciais',
    bio: 'Constrói e opera o processo comercial dentro da empresa do cliente durante os 4 sprints de implementação.',
    expanded:
      'Especialista na construção de processos comerciais do zero. Atua diretamente dentro da empresa parceira: instala o funil, treina a equipe, define metas por etapa e garante que o playbook seja seguido no dia a dia. Ao final dos 4 sprints, a Wayzen contrata e aloca um profissional dedicado exclusivamente ao cliente, que passa a ser funcionário da Wayzen, eliminando custo de contratação, treinamento e encargos trabalhistas para a escola.',
    icon: '🎯',
    fotoAlt: 'Matheus',
    foto: null,
  },
  {
    nome: 'Danielle Moraes',
    cargo: 'Especialista em Marketing e Funis',
    bio: 'Responsável pela criação de demanda qualificada: tráfego, funis e posicionamento de oferta para gerar o lead certo para o comercial.',
    expanded:
      'Especialista em marketing de performance e construção de funis para o setor educacional. Atua na configuração de campanhas, segmentação de público, criação de páginas de captura e otimização do custo por lead. Focada em entregar leads com intenção real de matrícula, com o menor custo de aquisição possível.',
    icon: '📣',
    fotoAlt: 'Danielle Moraes',
    foto: null,
  },
];

export const CANAIS = [
  'WhatsApp',
  'Instagram',
  'Telefone',
  'Site',
  'Presencial',
  'E-mail',
  'Indicação',
  'Facebook',
];

export const DEFAULT_CLIENT = {
  empresa: '',
  segmento: '',
  cidade: '',
  decisor: '',
  cargo: '',
  whatsapp: '',
  email: '',
  produto: '',
  meta: '',
  data: '',
  obs: '',
};

export const DEFAULT_DIAG = {
  contatos: 80,
  canais: [],
  tempo: 120,
  semRetorno: 60,
  conversao: 15,
  ticket: 1500,
  ciclo: 7,
  cac: 0,
  propostas: 0,
  motivoPerda: '',
  baseAlunos: 0,
  mensalidade: 0,
  desistencia: 0,
  inadimplencia: 0,
  churn: 0,
  motivoCancel: '',
  retencaoAtiva: '',
  cobracaAtiva: '',
  tempoMedio: 0,
  recompra: 0,
  indicacao: 0,
  qtdProdutos: '',
  programaIndicacao: '',
  comunicacaoBase: '',
  fidelizacao: '',
  equipe: 0,
  crm: '',
  playbook: '',
  metas: '',
  tempoFechamento: 0,
  faturamento: 0,
  margem: 70,
  relatorio: '',
  nps: 0,
  coletaNps: '',
  reclamacao: '',
  onboarding: '',
  suporte: '',
  acompCliente: '',
  percResultado: '',
  obsGeral: '',
  planEscolhido: 'padrao',
};

export const DEFAULT_SIM = {
  convMelhora: 5,
  followMelhora: 40,
  margem: 70,
  cenario: 'moderado',
};

export const TAB_DIAG = [
  { id: 'aquisicao', label: '📥 Aquisição' },
  { id: 'base', label: '👥 Base Ativa' },
  { id: 'ltv', label: '♻️ LTV / Recompra' },
  { id: 'operacional', label: '⚙️ Operacional' },
  { id: 'experiencia', label: '⭐ Experiência' },
  { id: 'painel', label: '📊 Painel Geral' },
];

export const CASES = [
  {
    empresa: 'Instituição de Ensino',
    resultado: 'de 100 vendas/ano para 500 em 2 meses',
    desc: 'Assumimos o atendimento, reativamos a base e instalamos follow-up com playbook e metas diárias. O time passou a bater meta pela primeira vez.',
  },
  {
    empresa: 'Serviço local (alto ticket)',
    resultado: 'Mais fechamentos com o mesmo volume de leads',
    desc: 'Ajuste de script e qualificação de leads. Menos proposta perdida por demora e mais urgência real no processo de fechamento.',
  },
  {
    empresa: 'Negócio recorrente',
    resultado: 'Redução de vazamento e aumento de retenção',
    desc: 'Padronização de jornada de onboarding e rotina de reativação. Desistência caiu e o NPS subiu em 8 semanas de operação.',
  },
];

export const DIFERENCIAIS = [
  {
    titulo: 'Presença dentro da empresa',
    desc: 'Não mandamos relatório por e-mail. Estamos na operação, no dia a dia, resolvendo junto.',
    icon: '🏢',
  },
  {
    titulo: 'Cobertura de toda a jornada',
    desc: 'Do lead ao aluno retido: captação, conversão e LTV. Três especialistas, três fases.',
    icon: '🔗',
  },
  {
    titulo: '4 sprints com entregáveis reais',
    desc: 'Cada semana tem objetivo, entregável e métrica. Sem promessa vaga.',
    icon: '⚡',
  },
  {
    titulo: 'Registro e cultura de dados',
    desc: 'Sem registro não existe gestão. Instalamos a cultura de documentar e medir.',
    icon: '📊',
  },
  {
    titulo: 'Playbook transferível',
    desc: 'Ao final do ciclo você tem processo documentado e treinamento feito. Independência total.',
    icon: '📋',
  },
  {
    titulo: 'Especialista em educação',
    desc: 'O gestor de LTV tem foco exclusivo no nicho educacional: conhece a jornada do aluno.',
    icon: '🎓',
  },
];
