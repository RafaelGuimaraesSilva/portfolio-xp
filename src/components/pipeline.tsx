import type { DiagramNode } from "@/lib/content";

export function PipelineRows({ nodes }: { nodes: DiagramNode[] }) {
  return (
    <div className="pipeline">
      {nodes.map((node, index) => (
        <div className="pipeline__row" key={node.label}>
          <span className="pipeline__index" aria-hidden="true">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div>
            <p className="pipeline__label">{node.label}</p>
            <p className="pipeline__detail">{node.detail}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

type PipelineProps = {
  title: string;
  meta?: string;
  nodes: DiagramNode[];
  note?: string;
};

export function Pipeline({
  title,
  meta = "v1.0",
  nodes,
  note,
}: PipelineProps) {
  return (
    <div className="panel">
      <div className="panel__head">
        <span className="panel__dot">{title}</span>
        <span>{meta}</span>
      </div>

      <PipelineRows nodes={nodes} />

      {note ? <p className="panel__foot">{note}</p> : null}
    </div>
  );
}
