import type { Metadata, Viewport } from "next";
import { SITE } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: `${SITE.name} — ${SITE.role}`,
  description: SITE.description,
  applicationName: SITE.osName,
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  publisher: SITE.name,
  keywords: [
    "Rafael Guimarães Silva",
    "desenvolvedor fullstack",
    "automação n8n",
    "Bun TypeScript",
    "integração de pagamentos TEF",
    "GLPI PHP",
    "Salvador Bahia",
    "portfólio",
  ],
  alternates: { canonical: "/" },
  category: "technology",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: SITE.osName,
    title: `${SITE.name} — ${SITE.role}`,
    description: SITE.description,
  },
  twitter: {
    card: "summary",
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
  themeColor: "#1793d1",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
