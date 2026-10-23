export const SITE = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://rafaelguimaraes.dev.br",
  name: "Rafael Guimarães Silva",
  firstName: "Rafael",
  initials: "RG",
  role: "Desenvolvedor Fullstack & Automações",
  description:
    "Portfólio interativo de Rafael Guimarães Silva: desenvolvedor fullstack especializado em automações com n8n, integrações de API e Bun/TypeScript.",
  email: "rafaelguimaraesgv@hotmail.com",
  github: "https://github.com/RafaelGuimaraesSilva",
  linkedin: "https://www.linkedin.com/in/rafaelsilva2005/",
  whatsapp: `https://wa.me/5533991185004?text=${encodeURIComponent(
    "Oi Rafael! Vi seu portfólio e quero conversar sobre um projeto de automação ou desenvolvimento.",
  )}`,
  location: "Salvador, BA",
  availability: "Disponível para projetos",
  osName: "rafael@arch",
  osVersion: "Arch Linux · Hyprland",
  distro: "Arch Linux",
  kernel: "6.12.4-arch1-1",
  wm: "Hyprland",
  shell: "zsh",
  terminal: "kitty",
} as const;

export const ABOUT = [
  "Atuo na intersecção entre desenvolvimento e operação: investigo problemas com base em logs e comportamento de sistema, reproduzo erros em ambiente controlado e comunico diagnósticos estruturados.",
  "Desenvolvo automações com n8n que aumentaram o desempenho das entregas de um setor de estampas em mais de 30%, além de microserviços em Bun/TypeScript e integrações com sistemas externos (CRM, ERP).",
  "Acredito que bom software se mede pelo problema que resolve, não pela quantidade de buzzwords no README.",
] as const;

export const SPECIALTIES = [
  { label: "Fullstack", detail: "Bun · TypeScript · PHP" },
  { label: "Automação", detail: "n8n e integrações" },
  { label: "Integrações", detail: "Meios de pagamento · CRM · ERP" },
  { label: "Suporte N1–N3", detail: "diagnóstico por logs" },
] as const;

export type Project = {
  id: string;
  name: string;
  color: string;
  stack: string[];
  problem: string;
  decision: string;
  impact: string;
  internal: boolean;
  featured?: boolean;
};

export const PROJECTS: Project[] = [
  {
    id: "n8n-estampas",
    name: "Automação n8n para setor de estampas",
    color: "#EA4B71",
    stack: ["n8n", "Bun", "PostgreSQL"],
    problem:
      "O setor de estampas gerava cards de estampagem com logos de clientes manualmente — um processo repetitivo que consumia horas por semana e atrasava entregas.",
    decision:
      "Orquestrei o fluxo inteiro com n8n: workflows visuais que o próprio setor consegue ajustar, sem reescrever código a cada novo cliente.",
    impact:
      "+30% no desempenho das entregas e aumento significativo da produtividade operacional do setor.",
    internal: true,
    featured: true,
  },
  {
    id: "tef-linux",
    name: "Integração de pagamentos (TEF) em Linux",
    color: "#FCC624",
    stack: ["Linux", "Bash", "TEF"],
    problem:
      "A instalação do cliente TEF do provedor de meios de pagamento em Linux não era documentada e quebrava por dependências, permissões e incompatibilidades.",
    decision:
      "Mapeei o processo completo de instalação e configuração, documentando dependências, permissões e ajustes de compatibilidade por ambiente.",
    impact: "Viabilizou a migração de PDVs de Windows para Linux.",
    internal: true,
  },
  {
    id: "microservicos-bun",
    name: "Microserviços Bun/TypeScript",
    color: "#3178C6",
    stack: ["Bun", "TypeScript", "REST"],
    problem:
      "Clientes dependiam de processos manuais e de suporte para conseguir usar o sistema.",
    decision:
      "Serviços pequenos e fortemente tipados em Bun/TypeScript, com análise de payloads, autenticação e depuração de fluxos entre serviços.",
    impact:
      "Facilitou o uso do sistema pelos clientes e reduziu a dependência de intervenção manual.",
    internal: true,
  },
  {
    id: "glpi-php",
    name: "Extensões em PHP para GLPI",
    color: "#FF2D20",
    stack: ["PHP", "GLPI", "MySQL"],
    problem:
      "Operações internas e atendimento a clientes dependiam de tarefas manuais dentro do GLPI.",
    decision:
      "Extensões em PHP (Laravel/Zend) para automatizar operações, apoiadas por queries SQL de auditoria e validação de dados.",
    impact:
      "Suporte mais ágil e dados validados para diagnóstico de inconsistências.",
    internal: true,
  },
];

export type Experience = {
  period: string;
  role: string;
  company: string;
  description: string;
};

export const EXPERIENCE: Experience[] = [
  {
    period: "Jun 2025 — Atual",
    role: "Suporte QA/QC · Automações · Desenvolvedor Fullstack",
    company: "Empresa confidencial · Salvador, BA",
    description:
      "Suporte técnico do N1 ao N3 com diagnóstico baseado em logs e análise de requisições HTTP. Automação com n8n para um setor de estampas que aumentou o desempenho das entregas em mais de 30%, microserviços em Bun/TypeScript e integrações com sistemas externos (CRM, ERP).",
  },
  {
    period: "Jun 2024 — Jan 2025",
    role: "Estágio em Análise de Sistemas",
    company: "Colégio Batista Brasileiro",
    description:
      "Manutenção e consulta de bancos de dados relacionais, aplicação de JavaScript, TypeScript, HTML e CSS em projetos internos, e suporte a problemas técnicos reportados por usuários.",
  },
];

export type StackDep = { name: string; version: string; where: string };

export const STACK: StackDep[] = [
  { name: "typescript", version: "5.9.2-1", where: "microserviços e este site" },
  { name: "bun-bin", version: "1.3.14-1", where: "microserviços e scripts" },
  { name: "nextjs", version: "16.4.2-1", where: "este portfólio (UI)" },
  { name: "n8n", version: "1.72.1-1", where: "automações de processos internos" },
  { name: "php", version: "8.3.14-1", where: "GLPI e sistemas internos" },
  { name: "postgresql", version: "16.6-1", where: "dados de clientes" },
  { name: "mariadb", version: "11.6.2-1", where: "auditoria SQL" },
  { name: "docker", version: "27.4.1-1", where: "ambientes consistentes" },
  { name: "git", version: "2.47.1-1", where: "versionamento e CI/CD" },
  { name: "linux", version: "6.12.4.arch1-1", where: "PDVs e servidores" },
  { name: "hyprland", version: "0.45.2-1", where: "este desktop" },
];

export const RECYCLE_FILE = {
  name: "ideias-abandonadas.txt",
  content: [
    "PORTFÓLIO — BACKLOG DO RAFAEL",
    "----------------------------------------",
    "",
    "[x] Fazer um site normal, escuro, com blur e gradiente.",
    "    Status: abandonado. Todo mundo tem um.",
    "",
    "[x] Usar três bibliotecas de animação ao mesmo tempo.",
    "    Status: abandonado. O bundle pedia socorro.",
    "",
    "[x] Instalar Arch Linux no notebook da empresa.",
    "    Status: feito. Ninguém percebeu.",
    "",
    "[ ] Migrar tudo para NixOS.",
    "    Status: em análise há 8 meses.",
    "",
    "[ ] Colocar um chatbot que responde \"como posso ajudar?\" e nada mais.",
    "    Status: nunca.",
    "",
    "[x] Este portfólio em Arch Linux.",
    "    Status: entregue. Você está usando agora.",
    "",
    "— Rafael, 2026",
  ].join("\n"),
} as const;

export const HELP_ITEMS = [
  ["Super + Enter", "Abre o Terminal."],
  ["Super + Q", "Fecha a janela em foco."],
  ["Super + E", "Abre os projetos."],
  ["Super + D", "Abre o launcher (rofi)."],
  ["Esc", "Fecha a janela em foco."],
  ["Arrastar a barra de título", "Move a janela."],
  ["Duplo clique na barra", "Maximiza ou restaura a janela."],
  ["Botão direito no Campo Minado", "Marca a bandeirinha."],
  ["Ícone de volume na barra", "Liga e desliga os sons do sistema."],
] as const;
