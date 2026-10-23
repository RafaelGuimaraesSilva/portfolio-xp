import type { ReactNode } from "react";
import type { IconName } from "@/lib/icons";

const ICONS: Record<IconName, ReactNode> = {
  computer: (
    <>
      <defs>
        <linearGradient id="arch-mon" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2b3644" />
          <stop offset="1" stopColor="#131a22" />
        </linearGradient>
        <linearGradient id="arch-scr" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0c1620" />
          <stop offset="1" stopColor="#061019" />
        </linearGradient>
      </defs>
      <rect x="4" y="7" width="40" height="28" rx="3" fill="url(#arch-mon)" stroke="#3b4a5c" />
      <rect x="7" y="10" width="34" height="20" rx="1.5" fill="url(#arch-scr)" />
      <path d="M11 16l4 3-4 3" stroke="#7ee787" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18 24h9" stroke="#7ee787" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M18 35h12v4H18z" fill="#2b3644" stroke="#3b4a5c" />
      <path d="M12 39h24v3H12z" fill="#222c38" stroke="#3b4a5c" />
    </>
  ),
  projects: (
    <>
      <defs>
        <linearGradient id="arch-fld" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2f9fdc" />
          <stop offset="1" stopColor="#146a9e" />
        </linearGradient>
      </defs>
      <path d="M4 12h14l3 4h20a3 3 0 0 1 3 3v19a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V15a3 3 0 0 1 3-3z" fill="url(#arch-fld)" stroke="#0b4f78" />
      <path d="M6 21h33l-3 18H10z" fill="#49b6ea" opacity="0.35" stroke="#1a7fb5" />
      <path d="M14 27h17M14 32h12" stroke="#9fd8f5" strokeWidth="2" opacity="0.55" />
    </>
  ),
  stack: (
    <>
      <path d="M24 5 42 14v20L24 43 6 34V14z" fill="#1c6f9e" stroke="#0e4a6c" />
      <path d="M24 5 42 14 24 23 6 14z" fill="#3aa9dd" />
      <path d="M24 23v20L6 34V14z" fill="#165c84" />
      <path d="M24 23 42 14v20L24 43z" fill="#1273a3" />
      <path d="M15 19.5 24 24l9-4.5" stroke="#9fe0ff" fill="none" opacity="0.6" />
    </>
  ),
  mail: (
    <>
      <rect x="4" y="11" width="40" height="26" rx="3" fill="#1a232e" stroke="#3b4a5c" />
      <path d="M6 14l18 13 18-13" fill="none" stroke="#39a7dc" strokeWidth="2" />
      <path d="M6 34l12-10M42 34 30 24" stroke="#2c3a49" strokeWidth="1.5" />
      <path d="M4 11h40" stroke="#3b4a5c" />
    </>
  ),
  terminal: (
    <>
      <rect x="4" y="7" width="40" height="34" rx="4" fill="#0c1117" stroke="#334252" />
      <rect x="7" y="13" width="34" height="25" fill="#050a0e" />
      <path d="M11 20l5 4-5 4" stroke="#7ee787" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M19 29h11" stroke="#7ee787" strokeWidth="2" strokeLinecap="round" />
      <path d="M7 11h34" stroke="#334252" />
      <circle cx="10" cy="9.6" r="1" fill="#f85149" />
      <circle cx="13.4" cy="9.6" r="1" fill="#e3b341" />
      <circle cx="16.8" cy="9.6" r="1" fill="#7ee787" />
    </>
  ),
  mine: (
    <>
      <rect x="3" y="3" width="42" height="42" rx="4" fill="#151d26" stroke="#334252" />
      <circle cx="24" cy="27" r="11" fill="#2b2b2b" />
      <circle cx="20" cy="23" r="3" fill="#5a6a7a" />
      <path d="M29 15c2-4 6-4 7-2s-1 5-4 5" stroke="#e3b341" strokeWidth="2" fill="none" />
      <path d="M33 9l3-2M37 13l4-1M34 18l3 3" stroke="#f0a53b" strokeWidth="2" />
    </>
  ),
  trash: (
    <>
      <defs>
        <linearGradient id="arch-bin" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#2b3644" />
          <stop offset="0.5" stopColor="#1c2632" />
          <stop offset="1" stopColor="#121a23" />
        </linearGradient>
      </defs>
      <path d="M12 14h24l-3 27H15z" fill="url(#arch-bin)" stroke="#3b4a5c" />
      <path d="M9 9h30v6H9z" fill="#26313e" stroke="#3b4a5c" />
      <path d="M20 9V5h8v4" fill="none" stroke="#3b4a5c" strokeWidth="2" />
      <path d="M24 20l4 7h-8z" fill="none" stroke="#39a7dc" strokeWidth="2" />
      <path d="M19 34h10" stroke="#4a5a6c" strokeWidth="2" />
    </>
  ),
  info: (
    <>
      <defs>
        <linearGradient id="arch-inf" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4fc0ee" />
          <stop offset="1" stopColor="#116c9c" />
        </linearGradient>
      </defs>
      <circle cx="24" cy="24" r="19" fill="url(#arch-inf)" stroke="#0a4f72" />
      <circle cx="24" cy="15" r="2.8" fill="#fff" />
      <rect x="21.4" y="20" width="5.2" height="14" rx="2.6" fill="#fff" />
    </>
  ),
  help: (
    <>
      <path d="M5 10c6-3 13-3 19 0v29c-6-3-13-3-19 0z" fill="#1a232e" stroke="#3b4a5c" />
      <path d="M43 10c-6-3-13-3-19 0v29c6-3 13-3 19 0z" fill="#222d3a" stroke="#3b4a5c" />
      <text x="33" y="32" textAnchor="middle" fontSize="19" fontWeight="bold" fontFamily="monospace" fill="#4fc0ee">?</text>
      <path d="M24 10v29" stroke="#3b4a5c" />
    </>
  ),
  settings: (
    <>
      <path d="M24 4l3 6 6-2 2 6 6 2-2 6 4 5-5 4 1 6-6 1-3 6-6-3-6 3-3-6-6-1 1-6-5-4 4-5-2-6 6-2 2-6 6 2z" fill="#2b3644" stroke="#4a5a6c" />
      <circle cx="24" cy="24" r="8" fill="#151d26" stroke="#4a5a6c" />
      <circle cx="24" cy="24" r="3" fill="#39a7dc" />
    </>
  ),
  volume: (
    <g fill="currentColor">
      <path d="M7 18h8l10-9v30l-10-9H7z" />
      <path d="M30 16c4 4 4 12 0 16M35 11c7 7 7 19 0 26" fill="none" stroke="currentColor" strokeWidth="3" />
    </g>
  ),
  volumeMuted: (
    <g fill="currentColor">
      <path d="M7 18h8l10-9v30l-10-9H7z" />
      <path d="M30 18l10 12M40 18 30 30" fill="none" stroke="currentColor" strokeWidth="3" />
    </g>
  ),
  power: (
    <>
      <circle cx="24" cy="24" r="17" fill="#c0392b" stroke="#7d1f16" />
      <path d="M24 13v11" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
      <path d="M16 17a12 12 0 1 0 16 0" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
    </>
  ),
  logoff: (
    <>
      <rect x="6" y="8" width="22" height="32" rx="2" fill="#22303c" stroke="#3b4a5c" />
      <path d="M28 24h12M35 19l5 5-5 5" stroke="#4fc0ee" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="21" cy="24" r="2" fill="#7ee787" />
    </>
  ),
  txt: (
    <>
      <path d="M10 4h18l10 10v30H10z" fill="#1a232e" stroke="#3b4a5c" />
      <path d="M28 4v10h10" fill="#222d3a" stroke="#3b4a5c" />
      <path d="M16 21h16M16 27h16M16 33h10" stroke="#4a5a6c" strokeWidth="2" />
    </>
  ),
  error: (
    <>
      <circle cx="24" cy="24" r="18" fill="#b53226" stroke="#6e1a12" />
      <path d="M17 17l14 14M31 17 17 31" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
    </>
  ),
  user: (
    <>
      <circle cx="24" cy="18" r="8" fill="#d8b38c" stroke="#8a6a48" />
      <path d="M8 42c0-9 7-14 16-14s16 5 16 14z" fill="#1c6f9e" stroke="#0e4a6c" />
    </>
  ),
  network: (
    <>
      <rect x="3" y="8" width="20" height="15" rx="2" fill="#1a232e" stroke="#3b4a5c" />
      <rect x="25" y="25" width="20" height="15" rx="2" fill="#1a232e" stroke="#3b4a5c" />
      <path d="M13 23v6h12v-4" stroke="#3b4a5c" fill="none" strokeWidth="2" />
      <rect x="6" y="11" width="14" height="9" fill="#1273a3" />
      <rect x="28" y="28" width="14" height="9" fill="#1273a3" />
    </>
  ),
  search: (
    <>
      <circle cx="21" cy="21" r="12" fill="#151d26" stroke="#39a7dc" strokeWidth="3" />
      <path d="M30 30l10 10" stroke="#7ee787" strokeWidth="5" strokeLinecap="round" />
    </>
  ),
  back: (
    <path d="M28 12 16 24l12 12" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
  ),
  forward: (
    <path d="M20 12l12 12-12 12" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
  ),
  up: (
    <path d="M12 28 24 16l12 12" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
  ),
  folder: (
    <>
      <path d="M4 12h14l3 4h20a3 3 0 0 1 3 3v19a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V15a3 3 0 0 1 3-3z" fill="#1c6f9e" stroke="#0e4a6c" />
      <path d="M6 21h33l-3 18H10z" fill="#3aa9dd" opacity="0.45" stroke="#1273a3" />
    </>
  ),
  flag: (
    <>
      <path d="M12 6v36" stroke="#3b4a5c" strokeWidth="3" />
      <path d="M13 8h24l-4 7 4 7H13z" fill="#1793d1" stroke="#0e6a99" />
    </>
  ),
};

export function ArchIcon({
  name,
  className,
  size = 48,
}: {
  name: IconName;
  className?: string;
  size?: number;
}) {
  return (
    <svg
      viewBox="0 0 48 48"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {ICONS[name]}
    </svg>
  );
}

export function ArchFlag({
  className,
  size = 18,
}: {
  className?: string;
  size?: number;
}) {
  return <ArchIcon name="flag" className={className} size={size} />;
}

export function ArchLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="arch-logo-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7fd4f5" />
          <stop offset="0.5" stopColor="#1793d1" />
          <stop offset="1" stopColor="#0b6a99" />
        </linearGradient>
      </defs>
      <path
        d="M24 2 2.5 46h9.2l4.1-8.6h16.4L36.3 46h9.2L24 2Zm0 15.4 5.2 10.6h-10.4L24 17.4Z"
        fill="url(#arch-logo-grad)"
        fillRule="evenodd"
      />
    </svg>
  );
}
