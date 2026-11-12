import { SITE } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <p className="footer-colophon">
          © 2026 {SITE.name} · {SITE.location} · {SITE.timezone}
          <br />
          Next.js, Bricolage Grotesque e IBM Plex Mono. Código no{" "}
          <a href={SITE.github} target="_blank" rel="noreferrer noopener">
            GitHub
          </a>
          .
        </p>

        <div className="footer-links">
          <a href="#top">Topo</a>
          <a href={`mailto:${SITE.email}`}>E-mail</a>
          <a href={SITE.linkedin} target="_blank" rel="noreferrer noopener">
            LinkedIn
          </a>
          <a href={SITE.resume}>CV</a>
        </div>
      </div>
    </footer>
  );
}
