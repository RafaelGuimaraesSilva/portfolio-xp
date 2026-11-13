import { SectionHeading } from "@/components/ui/section-heading";
import {
  ABOUT,
  EDUCATION,
  LANGUAGES,
  OFF_CLOCK,
  PRINCIPLES,
} from "@/lib/content";

export function About() {
  return (
    <section className="section" id="sobre" aria-labelledby="about-title">
      <div className="container">
        <SectionHeading
          kicker="Sobre"
          id="about-title"
          title="Como eu trabalho."
          aside={
            <p>
              Menos paixão por tecnologia, mais compromisso com o problema que
              precisa sumir.
            </p>
          }
        />

        <div className="about-grid">
          <div>
            <p className="about-quote">
              Bom software se mede pelo problema que resolve,{" "}
              <em>não pela quantidade de buzzwords no README.</em>
            </p>

            <div className="off-clock">
              {OFF_CLOCK.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>

          <div>
            <div className="about-body">
              {ABOUT.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>

            <div className="principles">
              {PRINCIPLES.map((principle, index) => (
                <div className="principle reveal" key={principle.title}>
                  <span className="principle__index" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3>{principle.title}</h3>
                    <p>{principle.body}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="credentials">
              <div className="credential">
                <h3>Formação</h3>
                <p>
                  {EDUCATION.course}
                  <br />
                  <span>
                    {EDUCATION.school} · {EDUCATION.period} ·{" "}
                    {EDUCATION.status}
                  </span>
                </p>
              </div>

              <div className="credential">
                <h3>Idiomas</h3>
                <p>
                  {LANGUAGES.map((language) => (
                    <span key={language.name}>
                      {language.name}: {language.level}.{" "}
                    </span>
                  ))}
                </p>
              </div>
            </div>

            <p className="about-mcp">
              <span>MCP</span>
              Este portfólio também é um servidor MCP somente leitura:{" "}
              <code>/api/mcp</code>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
