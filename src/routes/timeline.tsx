import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { EVENTS } from "@/data";
import type { EventKind } from "@/data/types";
import { SeverityPill } from "@/components/desk/severity";
import { HighlightToggle } from "@/components/desk/highlights";
import { cn, formatDeskDate } from "@/lib/utils";

export const Route = createFileRoute("/timeline")({ component: TimelinePage });

const KINDS: { id: EventKind | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "us-action", label: "US action" },
  { id: "congress", label: "Congress" },
  { id: "military", label: "Military" },
  { id: "sa-response", label: "Pretoria" },
  { id: "trade", label: "Trade" },
  { id: "aid", label: "Aid" },
  { id: "diplomatic", label: "Diplomatic" },
];

function TimelinePage() {
  const [kind, setKind] = useState<(typeof KINDS)[number]["id"]>("all");
  const [q, setQ] = useState("");

  const rows = useMemo(() => {
    const query = q.trim().toLowerCase();
    return EVENTS.filter((e) => (kind === "all" ? true : e.kind === kind)).filter((e) =>
      query
        ? (e.title + e.summary + e.source).toLowerCase().includes(query)
        : true,
    );
  }, [kind, q]);

  return (
    <div className="grid gap-6">
      <header>
        <p className="font-mono text-micro uppercase tracking-[0.18em] text-subtle">
          Chronology
        </p>
        <h2 className="font-display text-3xl tracking-tight">Signal log</h2>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          From Lady R to the visa policy. Star an item to rank it on the dashboard
          highlight board. Flagged items are the ones that still sit in every
          congressional findings section.
        </p>
      </header>

      <div className="flex flex-col gap-3">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search events, sources, hulls…"
          className="h-11 w-full rounded-md border border-border bg-surface px-3 text-sm text-fg placeholder:text-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        />
        <div className="flex gap-2 overflow-x-auto pb-1">
          {KINDS.map((k) => (
            <button
              key={k.id}
              type="button"
              onClick={() => setKind(k.id)}
              className={cn(
                "h-11 shrink-0 rounded-full border px-3 text-sm",
                kind === k.id
                  ? "border-accent bg-accent text-accent-fg"
                  : "border-border bg-surface text-muted",
              )}
            >
              {k.label}
            </button>
          ))}
        </div>
      </div>

      <ol className="grid gap-3">
        {rows.map((e) => (
          <li
            key={e.id}
            className={cn(
              "rounded-xl border bg-surface p-4 sm:p-5",
              e.flagged ? "border-signal/35" : "border-border",
            )}
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="flex min-w-0 flex-wrap items-center gap-2">
                <time className="font-mono text-xs tabular-nums text-subtle">
                  {formatDeskDate(e.date)}
                </time>
                <SeverityPill value={e.severity} />
                {e.flagged ? (
                  <span className="font-mono text-micro uppercase tracking-wider text-signal">
                    Flagged
                  </span>
                ) : null}
                <span className="font-mono text-micro uppercase tracking-wider text-subtle">
                  {KINDS.find((k) => k.id === e.kind)?.label ?? e.kind}
                </span>
              </div>
              <HighlightToggle id={e.id} />
            </div>
            <h3 className="mt-2 text-base font-medium leading-snug sm:text-lg">{e.title}</h3>
            <p className="mt-2 text-sm leading-normal text-muted">{e.summary}</p>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <a
                href={e.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-11 items-center text-sm text-accent underline-offset-4 hover:underline"
              >
                {e.source}
              </a>
              <span className="font-mono text-micro text-subtle">
                {e.actors.join(" · ")}
              </span>
            </div>
          </li>
        ))}
      </ol>
      {rows.length === 0 ? (
        <p className="text-sm text-muted">No events match that filter.</p>
      ) : null}
    </div>
  );
}
