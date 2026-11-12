"use client";

import { Download } from "@/components/icons";

export function PrintButton() {
  return (
    <button
      type="button"
      className="button button--solid"
      onClick={() => window.print()}
    >
      <Download size={15} />
      Imprimir / salvar PDF
    </button>
  );
}
