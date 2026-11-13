import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { PROJECTS } from "@/lib/content";
import { SITE } from "@/lib/site";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
  axes: ["opsz", "wdth"],
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.role}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  publisher: SITE.name,
  keywords: [
    "Rafael Guimarães Silva",
    "desenvolvedor fullstack",
    "supervisor de operações técnicas",
    "automação n8n",
    "CRM com RAG",
    "GLPI PHP",
    "integração TEF Linux",
    "Salvador Bahia",
    "portfólio",
  ],
  alternates: {
    canonical: "/",
    types: {
      "text/plain": "/llms.txt",
    },
  },
  category: "technology",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.role}`,
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.role}`,
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0a0a0b",
  colorScheme: "dark",
};

const personSchema = {
  "@type": "Person",
  name: SITE.name,
  url: SITE.url,
  email: `mailto:${SITE.email}`,
  jobTitle: SITE.role,
  description: SITE.description,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Salvador",
    addressRegion: "BA",
    addressCountry: "BR",
  },
  sameAs: [SITE.github, SITE.linkedin],
  knowsAbout: [
    "Desenvolvimento fullstack",
    "Automação com n8n",
    "RAG e LLM",
    "GLPI",
    "Integrações de PDV",
    "Linux",
  ],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Universidade Jorge Amado (Unijorge)",
  },
};

const websiteSchema = {
  "@type": "WebSite",
  name: SITE.name,
  url: SITE.url,
  inLanguage: "pt-BR",
  author: { "@type": "Person", name: SITE.name },
};

const caseListSchema = {
  "@type": "ItemList",
  name: "Cases",
  itemListElement: PROJECTS.map((project, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: project.name,
    url: `${SITE.url}/projetos/${project.slug}`,
  })),
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [personSchema, websiteSchema, caseListSchema],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${bricolage.variable} ${plexMono.variable}`}
    >
      <body>
        <a className="skip-link" href="#conteudo">
          Pular para o conteúdo
        </a>
        <div className="scroll-progress" aria-hidden="true" />
        <div className="scroll-dot" aria-hidden="true" />
        <SiteHeader />
        {children}
        <SiteFooter />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
