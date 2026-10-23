"use client";

import {
  ABOUT,
  EXPERIENCE,
  SITE,
  SPECIALTIES,
} from "@/lib/site";
import { ArchIcon } from "@/components/icons/arch-icons";
import { useWindowManager } from "@/components/desktop/window-manager";

const SPARK = [28, 44, 36, 58, 66, 74, 92];

export function AboutApp() {
  const { open } = useWindowManager();

  return (
    <div className="arch-app arch-about">
      <div className="arch-addressbar">
        <span className="arch-addr-label">Path</span>
        <div className="arch-addr-field">
          <ArchIcon name="computer" size={16} />
          <span>~/sobre</span>
        </div>
        <button type="button" className="arch-addr-btn" disabled>
          Ir
        </button>
      </div>

      <div className="arch-about-body">
        <aside className="arch-sidebar">
          <h2 className="arch-sidebar-title">Atalhos</h2>
          <button type="button" className="arch-side-link" onClick={() => open("projects")}>
            <ArchIcon name="projects" size={16} />
            Projetos
          </button>
          <button type="button" className="arch-side-link" onClick={() => open("stack")}>
            <ArchIcon name="stack" size={16} />
            pacotes
          </button>
          <button type="button" className="arch-side-link" onClick={() => open("contact")}>
            <ArchIcon name="mail" size={16} />
            Contato
          </button>

          <div className="arch-sidebar-sep" />

          <button type="button" className="arch-side-link" onClick={() => open("winver")}>
            <ArchIcon name="info" size={16} />
            neofetch
          </button>
          <button type="button" className="arch-side-link" onClick={() => open("help")}>
            <ArchIcon name="help" size={16} />
            Ajuda
          </button>
        </aside>

        <div className="arch-about-main">
          <header className="arch-profile">
            <span className="arch-profile-avatar">{SITE.initials}</span>
            <div className="arch-profile-id">
              <h1>{SITE.name}</h1>
              <p className="arch-profile-role">{SITE.role}</p>
              <p className="arch-profile-status">
                <span className="arch-dot" />
                {SITE.availability} · {SITE.location}
              </p>
            </div>
          </header>

          <div className="arch-about-text">
            {ABOUT.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>

          <div className="arch-about-grid">
            <section className="arch-card">
              <span className="arch-card-label">Impacto</span>
              <div className="arch-impact">
                <div>
                  <strong className="arch-big">+30%</strong>
                  <p>no desempenho das entregas com automações n8n</p>
                </div>
                <div className="arch-spark" aria-hidden="true">
                  {SPARK.map((height, index) => (
                    <span key={index} style={{ height: `${height}%` }} />
                  ))}
                </div>
              </div>
            </section>

            <section className="arch-card">
              <span className="arch-card-label">Especialidades</span>
              <ul className="arch-spec-list">
                {SPECIALTIES.map((specialty) => (
                  <li key={specialty.label}>
                    <strong>{specialty.label}</strong>
                    <span>{specialty.detail}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <section className="arch-block">
            <h2 className="arch-section-title">Experiência</h2>
            <ol className="arch-timeline">
              {EXPERIENCE.map((item) => (
                <li key={item.period}>
                  <span className="arch-timeline-dot" />
                  <span className="arch-timeline-period">{item.period}</span>
                  <strong>{item.role}</strong>
                  <span className="arch-timeline-company">{item.company}</span>
                  <p>{item.description}</p>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </div>

      <div className="arch-statusbar">
        <span>~/sobre</span>
        <span>{SITE.availability}</span>
      </div>
    </div>
  );
}
