"use client";

import { useEffect, useState } from "react";

type Section = {
  id: string;
  label: string;
};

export function CaseRail() {
  const [sections, setSections] = useState<Section[]>([]);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let observer: IntersectionObserver | undefined;
    let onScroll: (() => void) | undefined;

    const frame = requestAnimationFrame(() => {
      const found = Array.from(
        document.querySelectorAll<HTMLElement>(".case-section[id]"),
      );
      if (found.length === 0) return;

      setSections(
        found.map((section) => ({
          id: section.id,
          label:
            section
              .querySelector(".case-section__index")
              ?.textContent?.trim() ?? "",
        })),
      );

      onScroll = () => {
        const doc = document.documentElement;
        const max = doc.scrollHeight - doc.clientHeight;
        setProgress(max > 0 ? doc.scrollTop / max : 0);
      };

      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            const index = found.indexOf(entry.target as HTMLElement);
            if (index !== -1) setActive(index);
          }
        },
        { rootMargin: "-30% 0px -55% 0px", threshold: 0 },
      );
      found.forEach((section) => observer?.observe(section));

      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
    });

    return () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
      if (onScroll) {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
      }
    };
  }, []);

  if (sections.length === 0) return null;

  return (
    <nav className="case-rail" aria-label="Progresso do case">
      <div className="case-rail__track" aria-hidden="true">
        <div
          className="case-rail__fill"
          style={{ transform: `scaleY(${progress})` }}
        />
      </div>
      <ol className="case-rail__items">
        {sections.map((section, index) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className={`case-rail__item${index === active ? " is-active" : ""}`}
              aria-current={index === active ? "true" : undefined}
            >
              {section.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
