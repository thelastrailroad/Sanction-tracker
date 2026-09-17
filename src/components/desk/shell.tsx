import type { ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  Activity,
  Building2,
  Flag,
  Landmark,
  LayoutGrid,
  Radio,
  Shield,
  Ship,
} from "lucide-react";
import { DESK_AS_OF, DESK_CLASSIFICATION, PRESSURE_BAND } from "@/data";
import { cn, formatDeskDate } from "@/lib/utils";
import { SeverityPill } from "./severity";

const NAV = [
  { to: "/", label: "Desk", icon: LayoutGrid },
  { to: "/timeline", label: "Timeline", icon: Activity },
  { to: "/envoys", label: "Envoys", icon: Flag },
  { to: "/congress", label: "Congress", icon: Landmark },
  { to: "/military", label: "Military", icon: Ship },
  { to: "/watch", label: "Watch", icon: Radio },
  { to: "/exposure", label: "Exposure", icon: Building2 },
  { to: "/sources", label: "Sources", icon: Shield },
] as const;

export function DeskShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-dvh bg-bg text-fg">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:px-6 sm:py-5">
          <div className="flex items-start justify-between gap-4">
            <Link to="/" className="min-w-0">
              <p className="font-mono text-micro uppercase tracking-[0.22em] text-signal">
                Cape corridor desk
              </p>
              <h1 className="font-display text-3xl tracking-tight sm:text-4xl">
                Cape Signal
              </h1>
              <p className="mt-1 text-sm text-muted">
                US financial and diplomatic pressure on South Africa
              </p>
            </Link>
            <div className="hidden text-right sm:block">
              <p className="font-mono text-micro uppercase tracking-wider text-subtle">
                {DESK_CLASSIFICATION}
              </p>
              <p className="mt-1 font-mono text-xs tabular-nums text-muted">
                As of {formatDeskDate(DESK_AS_OF)}
              </p>
              <div className="mt-2 flex justify-end">
                <SeverityPill value={PRESSURE_BAND} />
              </div>
            </div>
          </div>
          <nav className="hidden gap-1 overflow-x-auto md:flex" aria-label="Desk">
            {NAV.map((item) => {
              const active =
                item.to === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.to);
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "inline-flex h-11 items-center gap-2 rounded-md px-3 text-sm transition-colors duration-150",
                    active
                      ? "bg-elevated text-fg"
                      : "text-muted hover:bg-surface hover:text-fg",
                  )}
                >
                  <Icon className="size-4" strokeWidth={1.75} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-4 pb-28 pt-6 sm:px-6 sm:pb-16 sm:pt-8">
        {children}
      </main>

      <nav
        className="fixed inset-x-0 bottom-0 z-20 border-t border-border bg-bg/95 backdrop-blur-sm md:hidden"
        aria-label="Mobile"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <ul className="flex gap-1 overflow-x-auto px-1">
          {NAV.map((item) => {
            const active =
              item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
            const Icon = item.icon;
            return (
              <li key={item.to} className="min-w-14 flex-1">
                <Link
                  to={item.to}
                  className={cn(
                    "flex h-14 min-w-14 flex-col items-center justify-center gap-0.5 px-1 text-micro",
                    active ? "text-fg" : "text-subtle",
                  )}
                >
                  <Icon className="size-4" strokeWidth={1.75} />
                  <span className="truncate">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
