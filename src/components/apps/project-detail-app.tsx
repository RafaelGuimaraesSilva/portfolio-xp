"use client";

import { PROJECTS } from "@/lib/site";
import { ArchIcon } from "@/components/icons/arch-icons";
import { useWindowManager } from "@/components/desktop/window-manager";

export function ProjectDetailApp({
  projectId,
  windowId,
}: {
  projectId: string;
  windowId: string;
}) {
  const { open, close } = useWindowManager();
  const index = PROJECTS.findIndex((project) => project.id === projectId);
  const project = PROJECTS[index];

  if (!project) {
    return (
      <div className="arch-pad">
        <p>Projeto não encontrado.</p>
        <button type="button" className="arch-btn" onClick={() => close(windowId)}>
          Fechar
        </button>
      </div>
    );
  }

  const next = PROJECTS[(index + 1) % PROJECTS.length];

  return (
    <div className="arch-app arch-detail">
      <header className="arch-detail-head">
        <span
          className="arch-detail-mark"
          style={{ background: project.color }}
          aria-hidden="true"
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="arch-detail-titles">
          <h1>{project.name}</h1>
          <div className="arch-chips">
            {project.stack.map((tech) => (
              <span key={tech} className="arch-chip">
                {tech}
              </span>
            ))}
            {project.internal ? <span className="arch-chip is-internal">interno</span> : null}
            {project.featured ? <span className="arch-chip is-featured">destaque</span> : null}
          </div>
        </div>
      </header>

      <div className="arch-detail-body">
        <section className="arch-detail-section">
          <h2>
            <ArchIcon name="error" size={18} />
            Problema
          </h2>
          <p>{project.problem}</p>
        </section>

        <section className="arch-detail-section">
          <h2>
            <ArchIcon name="settings" size={18} />
            Decisão
          </h2>
          <p>{project.decision}</p>
        </section>

        <section className="arch-detail-section is-impact">
          <h2>
            <ArchIcon name="info" size={18} />
            Impacto
          </h2>
          <p>{project.impact}</p>
        </section>

        {project.internal ? (
          <p className="arch-note">
            Projeto interno — por isso não há link ou repositório público. Os
            detalhes acima são o que dá para compartilhar.
          </p>
        ) : null}
      </div>

      <footer className="arch-detail-footer">
        <button
          type="button"
          className="arch-btn"
          onClick={() => {
            close(windowId);
            open("project", next.id);
          }}
        >
          Próximo projeto ›
        </button>
        <button type="button" className="arch-btn" onClick={() => close(windowId)}>
          Fechar
        </button>
      </footer>
    </div>
  );
}
