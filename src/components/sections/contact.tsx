import {
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  Whatsapp,
} from "@/components/icons";
import { SITE } from "@/lib/site";

const LINKS = [
  {
    label: "E-mail",
    value: SITE.email,
    href: `mailto:${SITE.email}`,
    icon: Mail,
    external: false,
  },
  {
    label: "WhatsApp",
    value: SITE.phone,
    href: SITE.whatsapp,
    icon: Whatsapp,
    external: true,
  },
  {
    label: "LinkedIn",
    value: "/in/rafaelsilva2005",
    href: SITE.linkedin,
    icon: Linkedin,
    external: true,
  },
  {
    label: "GitHub",
    value: "@RafaelGuimaraesSilva",
    href: SITE.github,
    icon: Github,
    external: true,
  },
] as const;

export function Contact() {
  return (
    <section className="contact" id="contato" aria-labelledby="contact-title">
      <div className="container">
        <div className="contact-grid">
          <div>
            <p className="kicker">Contato</p>
            <h2 id="contact-title">
              Vamos falar de operação, produto ou automação.
            </h2>
            <a className="contact-email" href={`mailto:${SITE.email}`}>
              {SITE.email}
            </a>
          </div>

          <div>
            <div className="contact-links">
              {LINKS.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    className="contact-link"
                    key={link.label}
                    href={link.href}
                    {...(link.external
                      ? { target: "_blank", rel: "noreferrer noopener" }
                      : {})}
                  >
                    <span className="contact-link__label">
                      <Icon size={12} /> {link.label}
                    </span>
                    <span className="contact-link__value">
                      {link.value}
                      <ArrowUpRight size={12} />
                    </span>
                  </a>
                );
              })}
            </div>

            <p className="contact-note">
              Para recrutadores, o currículo completo está em{" "}
              <a href={SITE.resume}>/cv</a>, com formação, idiomas e todas as
              experiências. Para projetos, o WhatsApp costuma ser mais rápido.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
