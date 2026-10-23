import type { WindowState } from "@/lib/wm/types";
import { AboutApp } from "./about-app";
import { ProjectsApp } from "./projects-app";
import { ProjectDetailApp } from "./project-detail-app";
import { StackApp } from "./stack-app";
import { ContactApp } from "./contact-app";
import { RunApp } from "./run-app";
import { CommandPromptApp } from "./command-prompt-app";
import { MinesweeperApp } from "./minesweeper-app";
import { RecycleBinApp } from "./recycle-bin-app";
import { NeofetchApp } from "./winver-app";
import { HelpApp } from "./help-app";

export function AppHost({ win }: { win: WindowState }) {
  switch (win.app) {
    case "computer":
      return <AboutApp />;
    case "projects":
      return <ProjectsApp />;
    case "project":
      return <ProjectDetailApp projectId={win.payload ?? ""} windowId={win.id} />;
    case "stack":
      return <StackApp />;
    case "contact":
      return <ContactApp />;
    case "run":
      return <RunApp windowId={win.id} />;
    case "cmd":
      return <CommandPromptApp windowId={win.id} />;
    case "mine":
      return <MinesweeperApp />;
    case "recycle":
      return <RecycleBinApp />;
    case "winver":
      return <NeofetchApp windowId={win.id} />;
    case "help":
      return <HelpApp />;
    default:
      return null;
  }
}
