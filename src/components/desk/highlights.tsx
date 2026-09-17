import { ChevronDown, ChevronUp, Star, X } from "lucide-react";
import { EVENTS } from "@/data";
import { cn, formatDeskDate } from "@/lib/utils";
import { useWatchStore } from "@/lib/watch-store";
import { SeverityPill } from "./severity";

export function HighlightToggle({
  id,
  compact,
}: {
  id: string;
  compact?: boolean;
}) {
  const highlighted = useWatchStore((s) => s.highlighted);
  const toggle = useWatchStore((s) => s.toggleHighlight);
  const on = highlighted.includes(id);
  const rank = highlighted.indexOf(id) + 1;

  return (
    <button
      type="button"
      onClick={() => toggle(id)}
      aria-pressed={on}
      aria-label={on ? `Remove from highlight board, rank ${rank}` : "Add to highlight board"}
      className={cn(
        "inline-flex h-11 items-center gap-1.5 rounded-md border px-2.5 text-sm",
        on
          ? "border-watch/40 bg-watch/10 text-watch"
          : "border-border bg-elevated text-muted hover:text-fg",
      )}
    >
      <Star className={cn("size-4", on && "fill-watch")} strokeWidth={1.75} />
      {compact ? null : on ? `Rank ${String(rank).padStart(2, "0")}` : "Highlight"}
    </button>
  );
}

export function HighlightBoard() {
  const highlighted = useWatchStore((s) => s.highlighted);
  const move = useWatchStore((s) => s.moveHighlight);
  const toggle = useWatchStore((s) => s.toggleHighlight);
  const rows = highlighted
    .map((id) => EVENTS.find((e) => e.id === id))
    .filter((e): e is NonNullable<typeof e> => Boolean(e));

  return (
    <section className="rounded-xl border border-watch/35 bg-watch/5 p-5 sm:p-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="font-mono text-micro uppercase tracking-[0.18em] text-watch">
            Highlight board
          </p>
          <h2 className="font-display text-2xl tracking-tight sm:text-3xl">Your ranked file</h2>
        </div>
        <p className="max-w-sm text-sm text-muted">
          Star events on the timeline. Rank them here. Higher is hotter.
        </p>
      </div>

      {rows.length === 0 ? (
        <p className="mt-4 text-sm text-muted">
          Nothing pinned. Open the timeline and hit Highlight on anything that should sit
          on this desk.
        </p>
      ) : (
        <ol className="mt-4 grid gap-3">
          {rows.map((e, i) => (
            <li
              key={e.id}
              className="grid gap-3 rounded-lg border border-border bg-surface p-4 sm:grid-cols-[auto_1fr_auto] sm:items-start"
            >
              <span className="font-display text-2xl tabular-nums text-watch">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <time className="font-mono text-micro tabular-nums text-subtle">
                    {formatDeskDate(e.date)}
                  </time>
                  <SeverityPill value={e.severity} />
                </div>
                <p className="mt-1 text-base font-medium leading-snug">{e.title}</p>
                <p className="mt-1 text-sm leading-normal text-muted">{e.summary}</p>
                <a
                  href={e.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-flex h-11 items-center text-sm text-accent underline-offset-4 hover:underline"
                >
                  {e.source}
                </a>
              </div>
              <div className="flex sm:flex-col">
                <button
                  type="button"
                  onClick={() => move(e.id, -1)}
                  disabled={i === 0}
                  aria-label={`Rank up ${e.title}`}
                  className="inline-flex size-11 items-center justify-center rounded-md text-muted hover:text-fg disabled:opacity-30"
                >
                  <ChevronUp className="size-5" strokeWidth={1.75} />
                </button>
                <button
                  type="button"
                  onClick={() => move(e.id, 1)}
                  disabled={i === rows.length - 1}
                  aria-label={`Rank down ${e.title}`}
                  className="inline-flex size-11 items-center justify-center rounded-md text-muted hover:text-fg disabled:opacity-30"
                >
                  <ChevronDown className="size-5" strokeWidth={1.75} />
                </button>
                <button
                  type="button"
                  onClick={() => toggle(e.id)}
                  aria-label={`Remove ${e.title} from board`}
                  className="inline-flex size-11 items-center justify-center rounded-md text-muted hover:text-signal"
                >
                  <X className="size-4" strokeWidth={1.75} />
                </button>
              </div>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
