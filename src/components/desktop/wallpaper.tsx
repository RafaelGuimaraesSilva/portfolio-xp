import { ArchLogo } from "@/components/icons/arch-icons";

export function Wallpaper({ muted = false }: { muted?: boolean }) {
  return (
    <div className={`arch-wallpaper${muted ? " is-muted" : ""}`} aria-hidden="true">
      <div className="arch-wall-glow arch-wall-glow-a" />
      <div className="arch-wall-glow arch-wall-glow-b" />
      <div className="arch-wall-grid" />
      <div className="arch-wall-mark">
        <ArchLogo className="arch-wall-logo" />
        <span className="arch-wall-label">ARCH LINUX</span>
        <span className="arch-wall-sub">Hyprland · rolling release</span>
      </div>
      <div className="arch-wall-term">
        <span className="arch-wall-user">rafael@arch</span>
        <span className="arch-wall-path">~</span>
        <span className="arch-wall-cmd">neofetch --off</span>
        <span className="arch-wall-cursor" />
      </div>
    </div>
  );
}
