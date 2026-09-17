import { useMemo, useState } from "react";
import { ChevronDown, ChevronUp, Plus, Star, X } from "lucide-react";
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
          : "border-border bg-elevated text-muted hover:border-watch/40 hover:text-watch",
      )}
    >
      <Star className={cn("size-4", on && "fill-watch")} strokeWidth={1.75} />
      {compact ? null : on ? `Rank ${String(rank).padStart(2, "0")}` : "Highlight"}
    </button>
  );
}

function AddEventPicker() {
  const highlighted = useWatchStore((s) => s.highlighted);
  const toggle = useWatchStore((s) => s.toggleHighlight);
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");

  const available = useMemo(() => {
    const query = q.trim().toLowerCase();
    return EVENTS.filter((e) => !highlighted.includes(e.id)).filter((e) =>
      query ? (e.title + e.summary + e.source).toLowerCase().includes(query) : true,
    );
  }, [highlighted, q]);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="inline-flex h-11 items-center gap-2 rounded-md border border-watch/40 bg-watch/10 px-3 text-sm text-watch"
      >
        <Plus className="size-4" strokeWidth={1.75} />
        Add event
      </button>
      {open ? (
        <div className="absolute right-0 z-20 mt-2 w-[min(100vw-2rem,22rem)] rounded-lg border border-border bg-elevated p-3 shadow-lg">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search the signal log…"
            autoFocus
            className="h-11 w-full rounded-md border border-border bg-surface px-3 text-sm text-fg placeholder:text-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          />
          <ul className="mt-2 max-h-64 overflow-y-auto">
            {available.slice(0, 12).map((e) => (
              <li key={e.id}>
                <button
                  type="button"
                  onClick={() => {
                    toggle(e.id);
                    setOpen(false);
                    setQ("");
                  }}
                  className="flex w-full items-start gap-2 rounded-md px-2 py-2 text-left hover:bg-surface"
                >
                  <Star className="mt-0.5 size-4 shrink-0 text-watch" strokeWidth={1.75} />
                  <span>
                    <span className="block font-mono text-micro tabular-nums text-subtle">
                      {formatDeskDate(e.date)}
                    </span>
                    <span className="block text-sm leading-snug">{e.title}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
          {available.length === 0 ? (
            <p className="px-2 py-3 text-sm text-muted">Nothing left to add for that search.</p>
          ) : null}
        </div>
      ) : null}
    </div>
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
        <AddEventPicker />
      </div>
      <p className="mt-2 max-w-2xl text-sm text-muted">
        Use <span className="text-watch">Add event</span> here, or tap Highlight on any
        card in Timeline. Arrows rank; X drops it.
      </p>

      {rows.length === 0 ? (
        <p className="mt-4 text-sm text-muted">
          Board is empty. Add the Iran visit, Denel tour, or anything else you want on
          this desk.
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
