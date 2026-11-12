import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

export const alt = `${SITE.name} — ${SITE.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0a0b",
          color: "#f4f4f5",
          padding: "64px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 20,
            letterSpacing: "0.1em",
            color: "#71717a",
          }}
        >
          <span>RAFAEL GUIMARÃES SILVA</span>
          <span>PORTFÓLIO · 2026</span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 92,
            fontWeight: 700,
            lineHeight: 0.96,
            letterSpacing: "-0.05em",
          }}
        >
          <span>Sistemas críticos</span>
          <span style={{ color: "#a1a1aa" }}>de pé. Trabalho manual</span>
          <span style={{ color: "#ff5c33" }}>fora do caminho.</span>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            gap: 40,
          }}
        >
          <span style={{ fontSize: 26, maxWidth: 780, color: "#a1a1aa" }}>
            Supervisor de Operações Técnicas & Desenvolvedor Fullstack ·
            Salvador, BA
          </span>
          <span
            style={{
              display: "flex",
              width: 160,
              height: 10,
              background: "#ff5c33",
            }}
          />
        </div>
      </div>
    ),
    size,
  );
}
