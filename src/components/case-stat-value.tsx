"use client";

import { useLayoutEffect, useRef } from "react";

const PATTERN = /^(\+|-)?(\d+(?:\.\d+)?)(%)?$/;

export function CaseStatValue({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const match = PATTERN.exec(value);
    if (reduce || !match) return;

    const sign = match[1] ?? "";
    const target = Number(match[2]);
    const suffix = match[3] ?? "";
    if (target === 0) return;

    const duration = 1200;
    let raf = 0;

    const run = () => {
      const start = performance.now();
      node.textContent = `${sign}0${suffix}`;

      const tick = (now: number) => {
        const progress = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(2, -10 * progress);
        const current =
          progress === 1 ? target : Math.round(target * eased);
        node.textContent = `${sign}${current}${suffix}`;
        if (progress < 1) raf = requestAnimationFrame(tick);
      };

      raf = requestAnimationFrame(tick);
    };

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              run();
              observer.disconnect();
              break;
            }
          }
        },
        { threshold: 0.4 },
      );
      observer.observe(node);
      return () => {
        observer.disconnect();
        cancelAnimationFrame(raf);
      };
    }

    run();
    return () => cancelAnimationFrame(raf);
  }, [value]);

  return (
    <span ref={ref} className="case-stat__value">
      {value}
    </span>
  );
}
