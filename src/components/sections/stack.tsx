import { SectionHeading } from "@/components/ui/section-heading";
import { STACK } from "@/lib/content";

export function Stack() {
  return (
    <section className="section" id="stack" aria-labelledby="stack-title">
      <div className="container">
        <SectionHeading
          kicker="Stack"
          id="stack-title"
          title="Ferramenta sem contexto é lista de palavra-chave."
          aside={
            <p>
              Cada linha abaixo aponta para o tipo de problema em que a
              ferramenta apareceu de verdade. Sem barra de progresso, sem
              porcentagem.
            </p>
          }
        />

        <table className="stack-table">
          <thead>
            <tr>
              <th scope="col">Área</th>
              <th scope="col">Ferramentas</th>
              <th scope="col">Onde usei</th>
            </tr>
          </thead>
          <tbody>
            {STACK.map((group) => (
              <tr key={group.area}>
                <td>{group.area}</td>
                <td>
                  <span className="stack-tools">
                    {group.tools.map((tool) => (
                      <span key={tool}>{tool}</span>
                    ))}
                  </span>
                </td>
                <td>{group.where}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
