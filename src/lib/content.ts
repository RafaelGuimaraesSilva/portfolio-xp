export const HERO = {
  eyebrow: "sistemas de pé · Salvador, BA · disponível para novas posições",
  title: ["Mantenho sistemas críticos de pé", "e tiro o trabalho manual do caminho."],
  role: "Supervisor de Operações Técnicas & Desenvolvedor Fullstack Pleno",
  lede: "Lidero suporte N1–N3 e construo as ferramentas internas que a operação usa todos os dias. Do CRM com RAG à homologação de TEF em Linux, o trabalho começa no problema real e termina com menos intervenção manual.",
  primaryCta: "Ver os cases",
  secondaryCta: "Currículo",
  note: "3 cases detalhados · arquitetura e decisões, sem vitrine",
} as const;

export const METRICS = [
  { value: "2+ anos", label: "entre operação e código" },
  { value: "N1–N3", label: "liderança de suporte técnico" },
  { value: "+30%", label: "nas entregas com automação n8n" },
  { value: "RAG", label: "em produção no CRM interno" },
] as const;

export type DiagramNode = {
  label: string;
  detail: string;
};

export type Project = {
  slug: string;
  name: string;
  shortName: string;
  year: string;
  role: string;
  stack: string[];
  summary: string;
  highlight: string;
  metric: {
    value: string;
    label: string;
  };
  problem: string;
  constraints: string[];
  decision: string;
  impact: string;
  learned: string;
  featured?: boolean;
  internal?: boolean;
  diagram?: {
    title: string;
    nodes: DiagramNode[];
    note: string;
  };
};

export const PROJECTS: Project[] = [
  {
    slug: "crm-rag",
    name: "CRM interno com RAG e LLM",
    shortName: "CRM com RAG",
    year: "2026",
    role: "Arquitetura e desenvolvimento fullstack",
    stack: ["Node.js", "TypeScript", "RAG", "LLM", "PHP/Laravel"],
    summary:
      "CRM que responde clientes com base no histórico da operação, não em respostas genéricas.",
    highlight: "Resposta com contexto rastreável",
    metric: {
      value: "RAG",
      label: "resposta com contexto rastreável, em produção no CRM interno",
    },
    problem:
      "O time de suporte respondia as mesmas dúvidas várias vezes por dia. O conhecimento estava espalhado entre chamados, documentos e a cabeça das pessoas, e cada atendimento começava do zero.",
    constraints: [
      "A resposta precisa ser rastreável: o time tem que saber de onde veio a informação.",
      "Dados de clientes não podem sair do ambiente interno.",
      "A ferramenta precisava entrar no CRM que já era usado, não virar mais uma aba.",
    ],
    decision:
      "Arquitetei o CRM fullstack com um pipeline de RAG: documentos e chamados são indexados, a busca recupera os trechos relevantes e o LLM monta a resposta com base neles. O atendente revisa antes de enviar. A camada de aplicação ficou em Node.js/TypeScript, com PHP/Laravel nas partes que já conversavam com o resto do sistema.",
    impact:
      "Respostas com contexto do histórico, menos ida e volta no atendimento e conhecimento que deixa de depender de uma pessoa só.",
    learned:
      "RAG não é sobre o modelo, é sobre a qualidade da recuperação. Se o trecho certo não entra, a resposta bonita é só alucinação com sotaque.",
    featured: true,
    internal: true,
    diagram: {
      title: "Pipeline de resposta",
      nodes: [
        { label: "Entrada", detail: "WhatsApp e CRM" },
        { label: "API route", detail: "validação e autenticação" },
        { label: "n8n", detail: "orquestração do fluxo" },
        { label: "Busca + LLM", detail: "trechos e resposta" },
        { label: "Atendente", detail: "revisa e envia" },
      ],
      note: "O atendente continua no controle. A IA acelera a resposta, não decide sozinha.",
    },
  },
  {
    slug: "n8n-estampas",
    name: "Automação de estampagem com n8n",
    shortName: "Automação n8n",
    year: "2025–2026",
    role: "Desenho do fluxo e implementação",
    stack: ["n8n", "Webhooks", "JavaScript", "PostgreSQL"],
    summary:
      "Workflows que tiraram do manual a geração de cards de estampagem e quotes.",
    highlight: "+30% nas entregas do setor",
    metric: {
      value: "+30%",
      label: "nas entregas do setor de estampas",
    },
    problem:
      "O setor de estampas montava cards com logos de clientes à mão. Era repetitivo, consumia horas por semana e atrasava a entrega.",
    constraints: [
      "Quem opera precisa ajustar o fluxo sem depender de dev.",
      "Cada cliente tem um layout diferente.",
      "O processo não pode parar no meio do expediente.",
    ],
    decision:
      "Levei o processo para o n8n com webhooks, validação e etapas visuais. O time consegue trocar dados e layouts sem reescrever código; o que é regra fica no fluxo, o que é específico fica em parâmetros.",
    impact: "+30% no desempenho das entregas e menos retrabalho no setor.",
    learned: "A melhor automação é a que a operação consegue manter sozinha.",
    featured: true,
    internal: true,
    diagram: {
      title: "Fluxo de estampagem",
      nodes: [
        { label: "Solicitação", detail: "formulário interno" },
        { label: "Webhook", detail: "entrada validada" },
        { label: "n8n", detail: "regras e etapas" },
        { label: "Dados", detail: "cliente e layout" },
        { label: "Entrega", detail: "card pronto" },
      ],
      note: "O fluxo é visual de propósito: a operação entende e ajusta sem abrir o código.",
    },
  },
  {
    slug: "auttar-linux",
    name: "TEF Auttar em Linux",
    shortName: "TEF em Linux",
    year: "2025",
    role: "Homologação e documentação",
    stack: ["Linux (Ubuntu)", "Bash", "Auttar CTFClient", "TEF"],
    summary:
      "Homologação do cliente TEF em Linux para migrar PDVs sem quebrar pagamento.",
    highlight: "Migração de PDVs sem parar pagamento",
    metric: {
      value: "0",
      label: "paradas de pagamento durante a migração dos PDVs",
    },
    problem:
      "O cliente TEF do provedor não tinha instalação documentada para Linux. Dependências, permissões e compatibilidade quebravam em cada máquina.",
    constraints: [
      "Pagamento não pode falhar.",
      "PDVs em produção, sem janela grande de manutenção.",
      "O processo precisa ser repetível em várias máquinas.",
    ],
    decision:
      "Mapeei dependências, permissões e pontos de compatibilidade; montei um roteiro de instalação e homologação e validei o fluxo de ponta a ponta com o pinpad e o provedor.",
    impact:
      "Viabilizou a migração dos PDVs de Windows para Linux com o TEF funcionando.",
    learned:
      "Documentar é parte da entrega. O que não tem roteiro quebra de novo no próximo cliente.",
    featured: true,
    internal: true,
    diagram: {
      title: "Caminho do pagamento",
      nodes: [
        { label: "PDV", detail: "Linux/Ubuntu" },
        { label: "CTFClient", detail: "Auttar" },
        { label: "Pinpad", detail: "cartão e senha" },
        { label: "Provedor", detail: "autorização" },
        { label: "Retorno", detail: "status ao PDV" },
      ],
      note: "Homologar é provar que o caminho inteiro funciona, não só instalar o pacote.",
    },
  },
  {
    slug: "microservicos",
    name: "Microsserviços de integração",
    shortName: "Integrações",
    year: "2025–2026",
    role: "Desenvolvimento back-end",
    stack: ["Node.js", "TypeScript", "Express", "REST", "PHP/Laravel"],
    summary:
      "Serviços pequenos para ligar CRM, ERP e PDVs sem depender de processo manual.",
    highlight: "Integrações sem intervenção manual",
    metric: {
      value: "0",
      label: "etapas manuais nas integrações CRM ↔ ERP ↔ PDV",
    },
    problem:
      "Clientes dependiam de intervenção manual e suporte para concluir operações entre sistemas.",
    constraints: [
      "Sistemas legados com contratos diferentes.",
      "Payloads inconsistentes entre as pontas.",
      "Autenticação diferente em cada integração.",
    ],
    decision:
      "Serviços pequenos e tipados em Node.js/TypeScript, com contratos claros, validação de payload e logs para diagnosticar o caminho inteiro.",
    impact: "Menos intervenção manual e mais autonomia para o cliente.",
    learned: "Integração boa é a que falha de forma explícita.",
    internal: true,
  },
  {
    slug: "glpi",
    name: "Extensões e arquitetura GLPI",
    shortName: "GLPI",
    year: "2024–2026",
    role: "Desenvolvimento e customização",
    stack: ["PHP", "GLPI", "MySQL", "SQL"],
    summary:
      "Customizações e regras de negócio no GLPI para a operação de suporte.",
    highlight: "Regras da operação dentro do GLPI",
    metric: {
      value: "GLPI",
      label: "regras da operação dentro do sistema, sem sair dele",
    },
    problem:
      "Fluxos de chamados e regras da operação não cabiam no GLPI de fábrica; o time preenchia e conferia coisas à mão.",
    constraints: [
      "Não podia quebrar o histórico existente.",
      "O time precisava continuar usando a mesma interface.",
    ],
    decision:
      "Extensões em PHP/MySQL, regras de negócio e consultas de auditoria para validar consistência sem sair do GLPI.",
    impact: "Atendimento mais rápido e dados confiáveis para diagnóstico.",
    learned: "Customizar sem documentar é criar dívida com nome bonito.",
    internal: true,
  },
];

export function getProject(slug: string) {
  return PROJECTS.find((project) => project.slug === slug);
}

export const HERO_PIPELINE = PROJECTS[0].diagram;

export const FEATURED = PROJECTS.filter((project) => project.featured);

export type Experience = {
  period: string;
  role: string;
  company: string;
  location: string;
  bullets: string[];
  current?: boolean;
};

export const EXPERIENCE: Experience[] = [
  {
    period: "Jul 2026 — atual",
    role: "Supervisor de Operações Técnicas de Tecnologia & Dev Fullstack",
    company: "VXCase",
    location: "Salvador, BA",
    current: true,
    bullets: [
      "Lidero a operação de TI e o suporte N1–N3, definindo fluxos, acompanhando SLAs e trabalhando redução de MTTR.",
      "Arquitetei e desenvolvi o CRM interno com RAG e LLM para automatizar respostas com base no histórico da operação.",
      "Desenvolvo customizações e regras de negócio no GLPI (PHP/MySQL) e microsserviços em Node.js/TypeScript e PHP/Laravel.",
      "Integro CRM, ERP e o ecossistema de PDVs, com foco em confiabilidade e diagnóstico.",
    ],
  },
  {
    period: "Jun 2025 — jul 2026",
    role: "Desenvolvedor Back-End & Analista de Suporte QA/QC",
    company: "VXCase",
    location: "Salvador, BA",
    bullets: [
      "Homologei o Auttar CTFClient em Linux (Ubuntu), ajustando dependências e permissões para viabilizar a migração dos PDVs.",
      "Criei workflows em n8n que aumentaram em +30% o desempenho das entregas do setor de estampas.",
      "Investiguei causas-raiz via logs, requisições HTTP e consultas SQL avançadas (MySQL/PostgreSQL).",
    ],
  },
  {
    period: "Jun 2024 — jan 2025",
    role: "Estagiário em Análise de Sistemas",
    company: "Colégio Batista Brasileiro",
    location: "Salvador, BA",
    bullets: [
      "Mantive bancos de dados relacionais e prestei suporte aos sistemas internos.",
      "Desenvolvi scripts e melhorias de interface com JavaScript, TypeScript, HTML5 e CSS3.",
    ],
  },
];

export type StackGroup = {
  area: string;
  tools: string[];
  where: string;
};

export const STACK: StackGroup[] = [
  {
    area: "Back-end & IA",
    tools: ["Node.js", "TypeScript", "Express", "PHP", "Laravel", "Zend", "Python"],
    where: "CRM, microsserviços e integrações",
  },
  {
    area: "Front-end",
    tools: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    where: "este site e interfaces operacionais",
  },
  {
    area: "Automação",
    tools: ["n8n", "Webhooks", "REST APIs", "OAuth 2.0 / API Key", "WebSocket", "Postman"],
    where: "processos internos e integrações",
  },
  {
    area: "Dados",
    tools: ["PostgreSQL", "MySQL", "SQL avançado"],
    where: "auditoria, diagnóstico e persistência",
  },
  {
    area: "Infra & operação",
    tools: ["Linux (Ubuntu)", "Docker", "Git/GitHub", "GitLab", "GLPI"],
    where: "PDVs, servidores e suporte N1–N3",
  },
  {
    area: "IA aplicada",
    tools: ["RAG", "Integração de LLMs", "Embeddings"],
    where: "CRM interno e respostas assistidas",
  },
];

export const PRINCIPLES = [
  {
    title: "Entendo a operação antes de escrever código.",
    body: "A maior parte dos problemas não está no framework. Está no processo que ninguém documentou e no atalho que virou regra.",
  },
  {
    title: "Automação só vale se quem usa consegue manter.",
    body: "Se a solução precisa de um dev para qualquer ajuste, ela não resolveu o problema, só mudou de lugar.",
  },
  {
    title: "Diagnóstico é metade do problema.",
    body: "Log, payload, query e comportamento do sistema. Chutar solução sem entender a causa costuma custar mais caro.",
  },
] as const;

export const ABOUT = [
  "Comecei no suporte e fui para o desenvolvimento pelo caminho mais útil: resolvendo o que atrapalhava a operação. Hoje trabalho nas duas pontas, liderando N1–N3 e construindo as ferramentas que o time usa todos os dias.",
  "Gosto de sistemas que funcionam sem drama: contrato claro, erro explícito e documentação que alguém consegue seguir. E de automação que devolve tempo para as pessoas fazerem algo que não é copiar e colar.",
] as const;

export const OFF_CLOCK = [
  "Arch Linux no desktop, Hyprland no dia a dia",
  "Interesse genuíno por sistemas que continuam de pé",
  "Terminal, logs e a teimosia de entender por dentro",
] as const;

export const EDUCATION = {
  course: "Tecnólogo em Análise e Desenvolvimento de Sistemas",
  school: "Universidade Jorge Amado (Unijorge)",
  period: "2025 — 2027",
  status: "em andamento",
} as const;

export const LANGUAGES = [
  { name: "Português", level: "nativo" },
  { name: "Inglês", level: "B2 — intermediário superior/técnico" },
  { name: "Espanhol", level: "A2 — básico" },
] as const;

export const CV_SUMMARY =
  "Profissional com atuação híbrida em liderança técnica de operações e desenvolvimento fullstack. Atualmente supervisor de operações técnicas e dev fullstack na VXCase, responsável pela gestão de TI/suporte N1–N3 e pela engenharia de soluções internas. Experiência em customização e arquitetura do GLPI (PHP), microsserviços (Node.js/TypeScript), automação de processos com n8n e desenvolvimento de CRM com RAG para respostas assistidas por IA. Foco em resolução de incidentes complexos, diagnóstico via SQL e integrações entre sistemas.";

export const CV_SKILLS = [
  {
    area: "Back-end & IA",
    tools:
      "PHP (Laravel, Zend, GLPI), Node.js, TypeScript, Express, Python, RAG, integração de LLMs, REST APIs, OAuth 2.0, API Key, WebSocket, webhooks",
  },
  {
    area: "Front-end",
    tools:
      "React, Next.js, JavaScript (ES6+), TypeScript, HTML5, CSS3, Tailwind CSS, interface responsiva",
  },
  {
    area: "Automação & dados",
    tools:
      "n8n, MySQL, PostgreSQL, queries avançadas, auditoria de dados, Postman, integrações Auttar/CRM/ERP",
  },
  {
    area: "Liderança & infra",
    tools:
      "Gestão de suporte N1–N3, liderança de operações de TI, Linux (Ubuntu), Docker, Git/GitHub, GitLab, Scrum, Kanban",
  },
] as const;
