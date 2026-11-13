import Link from "next/link";
import { ArrowUpRight } from "@/components/icons";
import { SectionHeading } from "@/components/ui/section-heading";
import { EXPERIENCE } from "@/lib/content";
import { SITE } from "@/lib/site";

export function Experience() {
  return (
    <section className="section" id="experiencia" aria-labelledby="exp-title">
      <div className="container">
        <SectionHeading
          kicker="Experiência"
          id="exp-title"
          title="Do suporte à liderança técnica."
          aside={
            <>
              <p>
                Comecei no suporte e fui para o desenvolvimento resolvendo o que
                atrapalhava a operação. Hoje faço as duas coisas no mesmo lugar:
                lidero o time e construo as ferramentas que ele usa.
              </p>
              <p>
                Histórico completo, formação e idiomas em{" "}
                <Link href={SITE.resume}>/cv</Link>.
              </p>
            </>
          }
        />

        <div className="exp-list">
          {EXPERIENCE.map((job) => (
            <article className="exp-row reveal" key={`${job.company}-${job.period}`}>
              <p
                className={`exp-period${job.current ? " exp-period--current" : ""}`}
              >
                {job.current ? <span aria-hidden="true">●</span> : null}
                {job.period}
              </p>

              <div>
                <h3 className="exp-role">{job.role}</h3>
                <p className="exp-company">
                  {job.company} · {job.location}
                </p>

                <ul className="exp-bullets">
                  {job.bullets.slice(0, 2).map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        <Link className="exp-link" href={SITE.resume}>
          Ver currículo completo
          <ArrowUpRight size={13} />
        </Link>
      </div>
    </section>
  );
}
