import { ImageResponse } from "next/og";
import { getProject } from "@/lib/content";
import { SITE } from "@/lib/site";

type Props = {
  params: Promise<{ slug: string }>;
};

export const alt = "Case study";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function CaseOpengraphImage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  const title = project?.name ?? "Case";
  const summary = project?.summary ?? SITE.description;

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
            fontSize: 20,
            letterSpacing: "0.1em",
            color: "#71717a",
          }}
        >
          <span>CASE · {project?.year ?? "2026"}</span>
          <span>RAFAEL GUIMARÃES SILVA</span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          <span
            style={{
              fontSize: 18,
              letterSpacing: "0.12em",
              color: "#ff5c33",
            }}
          >
            {project?.highlight ?? "PROJETO"}
          </span>
          <span
            style={{
              fontSize: 80,
              fontWeight: 700,
              lineHeight: 1,
              letterSpacing: "-0.045em",
              maxWidth: 1000,
            }}
          >
            {title}
          </span>
          <span style={{ fontSize: 28, color: "#a1a1aa", maxWidth: 900 }}>
            {summary}
          </span>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 20,
            letterSpacing: "0.04em",
            color: "#71717a",
          }}
        >
          <span>{project?.stack.slice(0, 4).join(" · ") ?? ""}</span>
          <span>rafaelguimaraes.dev.br</span>
        </div>
      </div>
    ),
    size,
  );
}
