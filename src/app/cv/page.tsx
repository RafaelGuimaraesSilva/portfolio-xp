import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "@/components/icons";
import { PrintButton } from "@/components/print-button";
import {
  CV_SKILLS,
  CV_SUMMARY,
  EDUCATION,
  EXPERIENCE,
  LANGUAGES,
} from "@/lib/content";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Currículo",
  description: `Currículo de ${SITE.name}, ${SITE.role.toLowerCase()} em ${SITE.location}.`,
  alternates: { canonical: "/cv" },
};

export default function CvPage() {
  return (
    <main id="conteudo" className="cv">
      <div className="container">
        <header className="cv-head">
          <div>
            <Link className="case-back" href="/">
              <ArrowLeft size={13} />
              Voltar ao portfólio
            </Link>
            <h1>{SITE.name}</h1>
            <p className="cv-role">{SITE.role}</p>
            <div className="cv-contact">
              <span>{SITE.location}</span>
              <a href={SITE.phoneHref}>{SITE.phone}</a>
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              <a href={SITE.linkedin} target="_blank" rel="noreferrer noopener">
                linkedin.com/in/rafaelsilva2005
              </a>
              <a href={SITE.github} target="_blank" rel="noreferrer noopener">
                github.com/RafaelGuimaraesSilva
              </a>
            </div>
          </div>
          <div className="cv-actions">
            <PrintButton />
          </div>
        </header>

        <section className="cv-section">
          <h2>Resumo</h2>
          <div className="cv-section__body">
            <p>{CV_SUMMARY}</p>
          </div>
        </section>

        <section className="cv-section">
          <h2>Experiência</h2>
          <div className="cv-section__body">
            {EXPERIENCE.map((job) => (
              <article className="cv-job" key={`${job.company}-${job.period}`}>
                <div className="cv-job__head">
                  <div>
                    <h3>{job.role}</h3>
                    <p className="cv-job__meta">
                      {job.company} · {job.location}
                    </p>
                  </div>
                  <p className="cv-job__meta">{job.period}</p>
                </div>
                <ul>
                  {job.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="cv-section">
          <h2>Habilidades</h2>
          <div className="cv-section__body cv-two-col">
            {CV_SKILLS.map((group) => (
              <div className="cv-block" key={group.area}>
                <h3>{group.area}</h3>
                <p>{group.tools}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="cv-section">
          <h2>Formação</h2>
          <div className="cv-section__body">
            <div className="cv-job">
              <div className="cv-job__head">
                <div>
                  <h3>{EDUCATION.course}</h3>
                  <p className="cv-job__meta">
                    {EDUCATION.school} · {EDUCATION.status}
                  </p>
                </div>
                <p className="cv-job__meta">{EDUCATION.period}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="cv-section">
          <h2>Idiomas</h2>
          <div className="cv-section__body cv-two-col">
            {LANGUAGES.map((language) => (
              <div className="cv-block" key={language.name}>
                <h3>{language.name}</h3>
                <p>{language.level}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
