import Link from "next/link";
import { ArrowRight, Download, Whatsapp } from "@/components/icons";
import { Pipeline } from "@/components/pipeline";
import { HERO, HERO_PIPELINE, METRICS } from "@/lib/content";
import { SITE } from "@/lib/site";

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="container">
        <div className="hero-grid">
          <div>
            <p className="hero-eyebrow">{HERO.eyebrow}</p>
            <p className="hero-name">{SITE.name}</p>

            <h1>
              {HERO.title.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </h1>

            <p className="hero-role">{HERO.role}</p>
            <p className="hero-lede">{HERO.lede}</p>

            <div className="hero-actions">
              <a className="button button--solid" href="#trabalho">
                {HERO.primaryCta}
                <ArrowRight size={15} className="button__arrow" />
              </a>
              <Link className="button" href={SITE.resume}>
                <Download size={15} />
                {HERO.secondaryCta}
              </Link>
              <a
                className="button button--ghost"
                href={SITE.whatsapp}
                target="_blank"
                rel="noreferrer noopener"
              >
                <Whatsapp size={15} />
                WhatsApp
              </a>
            </div>

            <p className="hero-note">{HERO.note}</p>
          </div>

          {HERO_PIPELINE ? (
            <Pipeline
              title={HERO_PIPELINE.title}
              meta="em produção"
              nodes={HERO_PIPELINE.nodes}
              note={HERO_PIPELINE.note}
            />
          ) : null}
        </div>

        <div className="metrics">
          {METRICS.map((metric) => (
            <div className="metric" key={metric.label}>
              <span className="metric__value">{metric.value}</span>
              <span className="metric__label">{metric.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
