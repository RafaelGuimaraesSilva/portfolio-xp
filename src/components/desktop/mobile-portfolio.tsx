"use client";

import { useState } from "react";
import {
  ABOUT,
  EXPERIENCE,
  PROJECTS,
  SITE,
  SPECIALTIES,
  STACK,
} from "@/lib/site";
import { useClock } from "@/lib/hooks";
import { ArchFlag, ArchIcon } from "@/components/icons/arch-icons";
import { Wallpaper } from "./wallpaper";
import {
  GithubGlyph,
  LinkedinGlyph,
  WhatsappGlyph,
} from "@/components/apps/contact-app";

export function MobilePortfolio() {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [openProject, setOpenProject] = useState<string | null>(
    PROJECTS[0]?.id ?? null,
  );
  const now = useClock();

  const timeLabel = now
    ? now.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
    : "--:--";

  const go = (id: string) => {
    setSheetOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="arch-mobile">
      <Wallpaper />

      <header className="arch-mobile-top">
        <ArchFlag className="arch-mobile-flag" />
        <span>{SITE.osName}</span>
        <time className="arch-clock-mobile" dateTime={now ? now.toISOString() : undefined}>
          {timeLabel}
        </time>
      </header>

      <main className="arch-mobile-scroll" id="top">
        <section className="arch-mcard">
          <div className="arch-mcard-title">
            <ArchIcon name="computer" size={16} />
            <span>~/sobre</span>
          </div>
          <div className="arch-mcard-body">
            <div className="arch-mhero">
              <div className="arch-mhero-id">
                <span className="arch-mhero-avatar">{SITE.initials}</span>
                <div>
                  <h1>{SITE.name}</h1>
                  <p>{SITE.role}</p>
                </div>
              </div>
              <p className="arch-mobile-note">
                {SITE.availability} · {SITE.location}
              </p>
              <div className="arch-mhero-actions">
                <button type="button" onClick={() => go("projetos")}>
                  <ArchIcon name="projects" size={15} />
                  Ver projetos
                </button>
                <a
                  href={SITE.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ArchIcon name="mail" size={15} />
                  Falar comigo
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="arch-mcard" id="projetos">
          <div className="arch-mcard-title">
            <ArchIcon name="folder" size={16} />
            <span>~/projetos</span>
          </div>
          <div className="arch-mcard-body">
            {PROJECTS.map((project, index) => {
              const expanded = openProject === project.id;
              return (
                <article
                  key={project.id}
                  className={`arch-mproject${expanded ? " is-open" : ""}`}
                >
                  <button
                    type="button"
                    className="arch-mproject-head"
                    onClick={() => setOpenProject(expanded ? null : project.id)}
                    aria-expanded={expanded}
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
                      <span className="arch-project-stack">
                        {project.stack.join(" · ")}
                      </span>
                      <span className="arch-project-tags">
                        {project.featured ? (
                          <em className="is-featured">destaque</em>
                        ) : null}
                        {project.internal ? <em>projeto interno</em> : null}
                      </span>
                    </span>
                    <span className="arch-project-arrow" aria-hidden="true">
                      {expanded ? "⌄" : "›"}
                    </span>
                  </button>

                  {expanded ? (
                    <div className="arch-mproject-body">
                      <dl>
                        <dt>Problema</dt>
                        <dd>{project.problem}</dd>
                        <dt>Decisão técnica</dt>
                        <dd>{project.decision}</dd>
                        <dt>Impacto</dt>
                        <dd>{project.impact}</dd>
                      </dl>
                    </div>
                  ) : null}
                </article>
              );
            })}
            <p className="arch-mobile-note">
              Projetos internos: sem link público, mas com o contexto real de cada
              entrega.
            </p>
          </div>
        </section>

        <section className="arch-mcard" id="sobre">
          <div className="arch-mcard-title">
            <ArchIcon name="info" size={16} />
            <span>Sobre mim</span>
          </div>
          <div className="arch-mcard-body">
            {ABOUT.map((paragraph) => (
              <p key={paragraph.slice(0, 24)} className="arch-mobile-note">
                {paragraph}
              </p>
            ))}

            <dl className="arch-mproject-body" style={{ padding: 0 }}>
              {SPECIALTIES.map((specialty) => (
                <div key={specialty.label}>
                  <dt>{specialty.label}</dt>
                  <dd>{specialty.detail}</dd>
                </div>
              ))}
            </dl>

            {EXPERIENCE.map((item) => (
              <div key={item.period} className="arch-mobile-note">
                <strong>{item.role}</strong>
                <br />
                <span>
                  {item.period} · {item.company}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="arch-mcard" id="stack">
          <div className="arch-mcard-title">
            <ArchIcon name="stack" size={16} />
            <span>pacotes</span>
          </div>
          <div className="arch-mcard-body">
            <div className="arch-mstack">
              {STACK.map((dep) => (
                <span key={dep.name} title={dep.where}>
                  {dep.name} {dep.version}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="arch-mcard" id="contato">
          <div className="arch-mcard-title">
            <ArchIcon name="mail" size={16} />
            <span>Contato</span>
          </div>
          <div className="arch-mcard-body">
            <div className="arch-mcontact">
              <a
                className="is-whatsapp"
                href={SITE.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsappGlyph width={18} height={18} />
                WhatsApp — resposta rápida
              </a>
              <a href={`mailto:${SITE.email}`}>
                <ArchIcon name="mail" size={18} />
                {SITE.email}
              </a>
              <a href={SITE.github} target="_blank" rel="noopener noreferrer">
                <GithubGlyph width={18} height={18} />
                GitHub
              </a>
              <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer">
                <LinkedinGlyph width={18} height={18} />
                LinkedIn
              </a>
            </div>
            <p className="arch-mobile-note">
              Em telas maiores este portfólio vira um Arch Linux completo, com
              janelas flutuantes no Hyprland, Campo Minado e terminal.
            </p>
          </div>
        </section>
      </main>

      <nav className="arch-mobile-taskbar" aria-label="Barra de tarefas">
        <button
          type="button"
          className="arch-mobile-start"
          onClick={() => setSheetOpen((open) => !open)}
          aria-expanded={sheetOpen}
        >
          <ArchFlag className="arch-mobile-flag" />
          launcher
        </button>
        <div className="arch-mobile-tray">
          <span>{PROJECTS.length} projetos</span>
          <button
            type="button"
            aria-label="Voltar ao topo"
            onClick={() => go("top")}
          >
            ↑
          </button>
        </div>
      </nav>

      {sheetOpen ? (
        <div className="arch-mobile-sheet" role="menu" aria-label="Launcher">
          <div className="arch-mobile-sheet-grid">
            <button type="button" className="sheet-item" onClick={() => go("sobre")}>
              <ArchIcon name="computer" size={18} />
              Sobre mim
            </button>
            <button
              type="button"
              className="sheet-item"
              onClick={() => go("projetos")}
            >
              <ArchIcon name="projects" size={18} />
              Projetos
            </button>
            <button type="button" className="sheet-item" onClick={() => go("stack")}>
              <ArchIcon name="stack" size={18} />
              pacotes
            </button>
            <button
              type="button"
              className="sheet-item"
              onClick={() => go("contato")}
            >
              <ArchIcon name="mail" size={18} />
              Contato
            </button>
          </div>
          <div className="arch-mobile-sheet-foot">
            <span>{SITE.osName} · {SITE.osVersion}</span>
            <span>{SITE.location}</span>
          </div>
        </div>
      ) : null}
    </div>
  );
}
