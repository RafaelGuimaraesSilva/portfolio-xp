export const SITE = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://rafaelguimaraes.dev.br",
  name: "Rafael Guimarães Silva",
  firstName: "Rafael",
  initials: "RG",
  role: "Supervisor de Operações Técnicas & Desenvolvedor Fullstack",
  shortRole: "Operação, automação e desenvolvimento fullstack",
  description:
    "Portfólio de Rafael Guimarães Silva, supervisor de operações técnicas e desenvolvedor fullstack em Salvador. Automação com n8n, CRM com RAG, GLPI e integrações de PDV.",
  email: "rafaelguimaraesgv@hotmail.com",
  phone: "(33) 99118-5004",
  phoneHref: "tel:+5533991185004",
  github: "https://github.com/RafaelGuimaraesSilva",
  linkedin: "https://www.linkedin.com/in/rafaelsilva2005/",
  whatsapp: `https://wa.me/5533991185004?text=${encodeURIComponent(
    "Oi Rafael! Vi seu portfólio e quero conversar sobre uma posição.",
  )}`,
  location: "Salvador, BA",
  timezone: "UTC-3",
  availability: "Disponível para novas posições",
  resume: "/cv",
} as const;

export const NAV = [
  { href: "/#trabalho", label: "Trabalho" },
  { href: "/#experiencia", label: "Experiência" },
  { href: "/#stack", label: "Stack" },
  { href: "/#sobre", label: "Sobre" },
  { href: "/#contato", label: "Contato" },
] as const;
