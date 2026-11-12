import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "@/components/icons";
import { Tag } from "@/components/ui/tag";
import { SectionHeading } from "@/components/ui/section-heading";
import { PROJECTS } from "@/lib/content";

export function Work() {
  return (
    <section className="section" id="trabalho" aria-labelledby="work-title">
      <div className="container">
        <SectionHeading
          kicker="Trabalho selecionado"
          id="work-title"
          title="Cinco sistemas que rodam na operação."
          aside={
            <>
              <p>
                Nenhum projeto de vitrine: todos nasceram de um problema real,
                com restrição de produção. Os três primeiros têm arquitetura e
                resultado detalhados.
              </p>
              <p>
                Todos são projetos internos. Dados de clientes foram omitidos; o
                recorte técnico é real.
              </p>
            </>
          }
        />

        <div className="work-list">
          {PROJECTS.map((project, index) => (
            <Link
              className="work-row"
              key={project.slug}
              href={`/projetos/${project.slug}`}
            >
              <span className="work-row__index" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>

              <span>
                <span className="work-row__title">{project.shortName}</span>
                <span className="work-row__summary">{project.summary}</span>
                <span className="work-row__highlight">
                  {project.highlight}
                </span>
              </span>

              <span className="work-row__meta">
                {project.stack.slice(0, 3).map((tool) => (
                  <Tag key={tool}>{tool}</Tag>
                ))}
              </span>

              <span className="work-row__arrow" aria-hidden="true">
                <ArrowUpRight size={18} />
              </span>
            </Link>
          ))}
        </div>

        <a className="work-more" href="#contato">
          Falar sobre um projeto
          <ArrowRight size={13} />
        </a>
      </div>
    </section>
  );
}
