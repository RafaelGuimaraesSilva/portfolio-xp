import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "@/components/icons";
import { PipelineRows } from "@/components/pipeline";
import { CaseStatValue } from "@/components/case-stat-value";
import { Tag } from "@/components/ui/tag";
import { PROJECTS, getProject } from "@/lib/content";
import { SITE } from "@/lib/site";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return { title: "Projeto não encontrado" };
  }

  return {
    title: project.name,
    description: project.summary,
    alternates: { canonical: `/projetos/${project.slug}` },
    openGraph: {
      title: `${project.name} — ${SITE.name}`,
      description: project.summary,
      url: `/projetos/${project.slug}`,
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  const index = PROJECTS.findIndex((item) => item.slug === project.slug);
  const next = PROJECTS[(index + 1) % PROJECTS.length];
  const resultIndex = project.diagram ? "05" : "04";
  const learnedIndex = project.diagram ? "06" : "05";

  return (
    <main id="conteudo">
      <article>
        <header className="case-hero">
          <div className="container">
            <Link className="case-back" href="/#trabalho">
              <ArrowLeft size={13} />
              Trabalho selecionado
            </Link>

            <h1 className="case-title">{project.name}</h1>
            <p className="case-summary">{project.summary}</p>

            <div className="case-stat reveal" role="note" aria-label="Resultado em destaque">
              <CaseStatValue value={project.metric.value} />
              <span className="case-stat__label">{project.metric.label}</span>
            </div>

            <div className="case-meta">
              <div className="case-meta__item">
                <span className="case-meta__label">Ano</span>
                <span className="case-meta__value">{project.year}</span>
              </div>
              <div className="case-meta__item">
                <span className="case-meta__label">Papel</span>
                <span className="case-meta__value">{project.role}</span>
              </div>
              <div className="case-meta__item">
                <span className="case-meta__label">Contexto</span>
                <span className="case-meta__value">
                  {project.internal ? "Projeto interno" : "Projeto público"}
                </span>
              </div>
              <div className="case-meta__item">
                <span className="case-meta__label">Stack</span>
                <span className="case-meta__value">
                  {project.stack.join(" · ")}
                </span>
              </div>
            </div>
          </div>
        </header>

        <div className="container case-body">
          <div className="case-content">
            <section className="case-section reveal">
              <h2>
                <span className="case-section__index" aria-hidden="true">
                  01
                </span>
                O problema
              </h2>
              <p>{project.problem}</p>
            </section>

            <section className="case-section reveal">
              <h2>
                <span className="case-section__index" aria-hidden="true">
                  02
                </span>
                Restrições
              </h2>
              <ul className="case-list">
                {project.constraints.map((constraint) => (
                  <li key={constraint}>{constraint}</li>
                ))}
              </ul>
            </section>

            <section className="case-section reveal">
              <h2>
                <span className="case-section__index" aria-hidden="true">
                  03
                </span>
                A decisão
              </h2>
              <p>{project.decision}</p>
            </section>

            {project.diagram ? (
              <section className="case-section reveal">
                <h2>
                  <span className="case-section__index" aria-hidden="true">
                    04
                  </span>
                  Como funciona
                </h2>
                <div className="case-diagram">
                  <div className="case-diagram__head">
                    <span>{project.diagram.title}</span>
                    <span>arquitetura</span>
                  </div>
                  <PipelineRows nodes={project.diagram.nodes} />
                  <p className="case-diagram__note">{project.diagram.note}</p>
                </div>
              </section>
            ) : null}

            <section className="case-section reveal">
              <h2>
                <span className="case-section__index" aria-hidden="true">
                  {resultIndex}
                </span>
                Resultado
              </h2>
              <p className="case-impact">{project.impact}</p>
            </section>

            <section className="case-section reveal">
              <h2>
                <span className="case-section__index" aria-hidden="true">
                  {learnedIndex}
                </span>
                O que eu aprendi
              </h2>
              <p>{project.learned}</p>
            </section>
          </div>

          <aside className="case-aside reveal">
            <h2>Ficha técnica</h2>
            <p>
              {project.internal
                ? "Projeto interno da VXCase. Detalhes de clientes e dados foram omitidos; o recorte técnico é real."
                : "Projeto com código e demo públicos."}
            </p>

            <div className="case-stack">
              {project.stack.map((tool) => (
                <Tag key={tool}>{tool}</Tag>
              ))}
            </div>

            <a
              className="case-aside__cta"
              href={`mailto:${SITE.email}?subject=${encodeURIComponent(
                `Case: ${project.name}`,
              )}`}
            >
              Conversar sobre este case
              <ArrowUpRight size={12} />
            </a>
          </aside>
        </div>

        <div className="container">
          <Link className="case-next" href={`/projetos/${next.slug}`}>
            <div>
              <p className="case-next__label">Próximo case</p>
              <p className="case-next__title">{next.name}</p>
            </div>
            <ArrowUpRight size={22} />
          </Link>
        </div>
      </article>
    </main>
  );
}
