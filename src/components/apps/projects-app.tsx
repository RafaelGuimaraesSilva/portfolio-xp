"use client";

import { PROJECTS } from "@/lib/site";
import { ArchIcon } from "@/components/icons/arch-icons";
import { useWindowManager } from "@/components/desktop/window-manager";
import { useSound } from "@/components/desktop/sound";

export function ProjectsApp() {
  const { open } = useWindowManager();
  const { play } = useSound();

  return (
    <div className="arch-app arch-projects">
      <div className="arch-toolbar">
        <ArchIcon name="folder" size={20} />
        <strong>~/projetos</strong>
        <span className="arch-pill">{PROJECTS.length} itens</span>
        <span className="arch-toolbar-hint">clique para abrir</span>
      </div>

      <div className="arch-projects-body">
        <div className="arch-projects-grid">
          {PROJECTS.map((project, index) => (
            <button
              key={project.id}
              type="button"
              className="arch-project-tile"
              onClick={() => {
                play("open");
                open("project", project.id);
              }}
            >
              <span
                className="arch-project-badge"
                style={{ background: project.color }}
                aria-hidden="true"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="arch-project-info">
                <span className="arch-project-name">{project.name}</span>
                <span className="arch-project-stack">{project.stack.join(" · ")}</span>
                <span className="arch-project-tags">
                  {project.featured ? <em className="is-featured">destaque</em> : null}
                  {project.internal ? <em>projeto interno</em> : null}
                </span>
              </span>
              <span className="arch-project-arrow" aria-hidden="true">
                ›
              </span>
            </button>
          ))}
        </div>

        <p className="arch-projects-note">
          Todos são projetos internos — os detalhes mostram o problema, a decisão
          técnica e o impacto real. Sem link público, sem métrica inventada.
        </p>
      </div>

      <div className="arch-statusbar">
        <span>{PROJECTS.length} objetos</span>
        <span>Clique em um projeto para ver os detalhes</span>
      </div>
    </div>
  );
}
