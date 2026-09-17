import { createFileRoute } from "@tanstack/react-router";
import { BILLS, CONGRESS_WATCH } from "@/data";
import { formatDeskDate } from "@/lib/utils";

export const Route = createFileRoute("/congress")({ component: CongressPage });

const STEPS = ["Introduced", "Committee", "Floor", "Conference", "Law"] as const;

function CongressPage() {
  return (
    <div className="grid gap-8">
      <header>
        <p className="font-mono text-micro uppercase tracking-[0.18em] text-subtle">
          119th Congress
        </p>
        <h2 className="font-display text-3xl tracking-tight">Legislative track</h2>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          The review bills have not moved. That is not comfort. The executive already
          used visa, aid, and forum tools that do not need a statute. Watch riders on
          must-pass vehicles, not standalone floor fights.
        </p>
      </header>

      <ul className="grid gap-4">
        {BILLS.map((b) => (
          <li key={b.id} className="rounded-xl border border-border bg-surface p-5 sm:p-6">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p className="font-mono text-xs text-watch">{b.number}</p>
              <p className="font-mono text-micro text-subtle">
                {b.chamber} · {formatDeskDate(b.introduced)}
              </p>
            </div>
            <h3 className="mt-2 font-display text-xl tracking-tight">{b.title}</h3>
            <p className="mt-1 text-sm text-muted">{b.sponsor}</p>
            <ol className="mt-4 flex gap-1" aria-label="Bill status">
              {STEPS.map((s, i) => (
                <li
                  key={s}
                  className="flex-1"
                  title={s}
                >
                  <span
                    className={
                      i < b.statusStep
                        ? "block h-1.5 rounded-full bg-watch"
                        : "block h-1.5 rounded-full bg-elevated"
                    }
                  />
                </li>
              ))}
            </ol>
            <p className="mt-2 font-mono text-micro uppercase tracking-wider text-subtle">
              {b.status}
            </p>
            <p className="mt-3 text-sm leading-normal text-muted">{b.summary}</p>
            <p className="mt-3 border-t border-border pt-3 text-sm leading-normal">
              <span className="text-subtle">Sanctions hook. </span>
              {b.sanctionsHook}
            </p>
            <a
              href={b.congressUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex h-11 items-center text-sm text-accent underline-offset-4 hover:underline"
            >
              Open on Congress.gov
            </a>
          </li>
        ))}
      </ul>

      <section>
        <h3 className="font-display text-2xl tracking-tight">Calendar tells</h3>
        <ul className="mt-3 grid gap-3 sm:grid-cols-2">
          {CONGRESS_WATCH.map((c) => (
            <li key={c.id} className="rounded-xl border border-border bg-surface p-4">
              <p className="font-mono text-micro uppercase tracking-wider text-subtle">
                {c.when}
              </p>
              <p className="mt-2 text-sm font-medium">{c.title}</p>
              <p className="mt-1 text-sm text-muted">{c.why}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
