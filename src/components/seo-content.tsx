import {
  ABOUT,
  EXPERIENCE,
  PROJECTS,
  SITE,
  SPECIALTIES,
  STACK,
} from "@/lib/site";

export function SeoContent() {
  return (
    <div className="arch-seo" aria-hidden="true" inert>
      <header>
        <h1>
          {SITE.name} — {SITE.role}
        </h1>
        <p>{SITE.description}</p>
        <p>
          {SITE.location} · {SITE.availability}
        </p>
      </header>

      <section>
        <h2>Sobre Rafael Guimarães Silva</h2>
        {ABOUT.map((paragraph) => (
          <p key={paragraph.slice(0, 24)}>{paragraph}</p>
        ))}
        <ul>
          {SPECIALTIES.map((specialty) => (
            <li key={specialty.label}>
              <strong>{specialty.label}:</strong> {specialty.detail}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Projetos</h2>
        {PROJECTS.map((project) => (
          <article key={project.id}>
            <h3>{project.name}</h3>
            <p>
              <strong>Stack:</strong> {project.stack.join(", ")}
            </p>
            <p>
              <strong>Problema:</strong> {project.problem}
            </p>
            <p>
              <strong>Decisão técnica:</strong> {project.decision}
            </p>
            <p>
              <strong>Impacto:</strong> {project.impact}
            </p>
            {project.internal ? <p>Projeto interno, sem repositório público.</p> : null}
          </article>
        ))}
      </section>

      <section>
        <h2>Experiência</h2>
        <ul>
          {EXPERIENCE.map((item) => (
            <li key={item.period}>
              <strong>
                {item.role} — {item.company}
              </strong>{" "}
              ({item.period}). {item.description}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Stack técnica</h2>
        <ul>
          {STACK.map((dep) => (
            <li key={dep.name}>
              {dep.name} {dep.version} — {dep.where}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Contato</h2>
        <ul>
          <li>
            E-mail: <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          </li>
          <li>
            WhatsApp:{" "}
            <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer">
              +55 33 99118-5004
            </a>
          </li>
          <li>
            GitHub:{" "}
            <a href={SITE.github} target="_blank" rel="noopener noreferrer">
              github.com/RafaelGuimaraesSilva
            </a>
          </li>
          <li>
            LinkedIn:{" "}
            <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer">
              linkedin.com/in/rafaelsilva2005
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
}
