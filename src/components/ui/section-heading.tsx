import type { ReactNode } from "react";

type SectionHeadingProps = {
  kicker: string;
  title: string;
  id: string;
  aside?: ReactNode;
};

export function SectionHeading({
  kicker,
  title,
  id,
  aside,
}: SectionHeadingProps) {
  return (
    <div className="section-head">
      <div>
        <p className="kicker">{kicker}</p>
        <h2 id={id}>{title}</h2>
      </div>
      {aside ? <div className="section-head__aside">{aside}</div> : null}
    </div>
  );
}
