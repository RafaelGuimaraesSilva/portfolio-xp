import Link from "next/link";
import { Download } from "@/components/icons";
import { NAV, SITE } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="brand" aria-label={`${SITE.name} — início`}>
          <span className="brand-mark" aria-hidden="true">
            {SITE.initials}
          </span>
          <span className="brand-name">{SITE.name}</span>
        </Link>

        <nav className="nav" aria-label="Navegação principal">
          {NAV.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <Link className="button button--ghost header-cv" href={SITE.resume}>
          <Download size={14} />
          CV
        </Link>
      </div>
    </header>
  );
}
