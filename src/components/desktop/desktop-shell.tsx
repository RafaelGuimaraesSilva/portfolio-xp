"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useIsMobile } from "@/lib/hooks";
import type { AppId } from "@/lib/wm/types";
import { Wallpaper } from "./wallpaper";
import { DesktopIcons } from "./desktop-icons";
import { Taskbar } from "./taskbar";
import { StartMenu } from "./start-menu";
import { BootScreen } from "./boot-screen";
import { LoginScreen } from "./login-screen";
import { ShutdownScreen } from "./shutdown-screen";
import { KernelPanic } from "./kernel-panic";
import { WindowFrame } from "./window-frame";
import { SoundProvider, useSound } from "./sound";
import { WindowManagerProvider, useWindowManager } from "./window-manager";
import { ShellContext, type ShellContextValue, type Theme } from "./shell-context";
import { MobilePortfolio } from "./mobile-portfolio";

type Phase = "boot" | "login" | "desktop" | "shutdown";

export function DesktopShell() {
  const isMobile = useIsMobile();
  if (isMobile) return <MobilePortfolio />;
  return <DesktopExperience />;
}

function DesktopExperience() {
  const [phase, setPhase] = useState<Phase>("boot");
  const [session, setSession] = useState(0);
  const [theme, setTheme] = useState<Theme>("blue");
  const [panic, setPanic] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem("arch-theme");
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (stored === "blue" || stored === "green") setTheme(stored);
    } catch {
      /* ignore */
    }
  }, []);

  const changeTheme = useCallback((next: Theme) => {
    setTheme(next);
    try {
      window.localStorage.setItem("arch-theme", next);
    } catch {
      /* ignore */
    }
  }, []);

  const showPanic = useCallback(() => setPanic(true), []);
  const logoff = useCallback(() => {
    setPhase("login");
    setSession((value) => value + 1);
  }, []);
  const shutdown = useCallback(() => setPhase("shutdown"), []);
  const powerOn = useCallback(() => {
    setSession((value) => value + 1);
    setPhase("login");
  }, []);

  return (
    <div className="arch-shell" data-theme={theme}>
      <SoundProvider>
        <WindowManagerProvider key={session}>
          {phase === "desktop" ? (
            <DesktopWorkspace
              theme={theme}
              setTheme={changeTheme}
              onPanic={showPanic}
              onLogoff={logoff}
              onShutdown={shutdown}
            />
          ) : null}

          {phase === "boot" ? <BootScreen onDone={() => setPhase("login")} /> : null}
          {phase === "login" ? (
            <LoginScreen onEnter={() => setPhase("desktop")} />
          ) : null}
          {phase === "shutdown" ? <ShutdownScreen onPowerOn={powerOn} /> : null}

          {panic ? <KernelPanic onDismiss={() => setPanic(false)} /> : null}
        </WindowManagerProvider>
      </SoundProvider>
    </div>
  );
}

function DesktopWorkspace({
  theme,
  setTheme,
  onPanic,
  onLogoff,
  onShutdown,
}: {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  onPanic: () => void;
  onLogoff: () => void;
  onShutdown: () => void;
}) {
  const { windows, topId, open } = useWindowManager();
  const { enabled, toggle } = useSound();
  const [startOpen, setStartOpen] = useState(false);

  const openApp = useCallback(
    (app: AppId, payload?: string) => {
      setStartOpen(false);
      open(app, payload);
    },
    [open],
  );

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (!event.metaKey) return;
      if (event.key.toLowerCase() !== "d") return;
      event.preventDefault();
      setStartOpen((value) => !value);
    };
    const onLauncher = () => setStartOpen((value) => !value);
    window.addEventListener("keydown", onKey);
    window.addEventListener("arch-launcher", onLauncher);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("arch-launcher", onLauncher);
    };
  }, []);

  const value = useMemo<ShellContextValue>(
    () => ({
      theme,
      setTheme,
      showPanic: onPanic,
      logoff: onLogoff,
      shutdown: onShutdown,
      open: openApp,
      soundEnabled: enabled,
      toggleSound: toggle,
    }),
    [
      theme,
      setTheme,
      onPanic,
      onLogoff,
      onShutdown,
      openApp,
      enabled,
      toggle,
    ],
  );

  return (
    <ShellContext.Provider value={value}>
      <div className="arch-desktop-area">
        <Wallpaper />
        <DesktopIcons />

        {windows.map((win) => (
          <WindowFrame key={win.id} win={win} active={win.id === topId} />
        ))}
      </div>

      {startOpen ? <StartMenu onClose={() => setStartOpen(false)} /> : null}

      <Taskbar
        startOpen={startOpen}
        onToggleStart={() => setStartOpen((openMenu) => !openMenu)}
      />
    </ShellContext.Provider>
  );
}
