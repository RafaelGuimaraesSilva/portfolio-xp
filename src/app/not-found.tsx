import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "@/components/icons";

export const metadata: Metadata = {
  title: "Página não encontrada",
  description: "A página que você procura não existe ou foi movida.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main id="conteudo">
      <section className="not-found">
        <div className="container">
          <p className="kicker">Erro 404</p>
          <h1 className="not-found__title">
            Essa página<br />não existe.
          </h1>
          <p className="not-found__lede">
            O endereço pode ter mudado ou nunca existiu. Enquanto você está
            aqui, o trabalho está a um clique de distância.
          </p>
          <div className="not-found__actions">
            <Link className="button button--solid" href="/">
              <ArrowLeft size={15} />
              Voltar para o início
            </Link>
            <Link className="button" href="/#trabalho">
              Ver os cases
              <ArrowRight size={15} className="button__arrow" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
