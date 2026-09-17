import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MONITOR_QUERIES, SOURCES } from "@/data";
import { getLiveSignals, type LiveBundle } from "@/lib/feeds";
import { formatDeskDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/sources")({ component: SourcesPage });

function SourcesPage() {
  const [data, setData] = useState<LiveBundle | null>(null);
  const [loading, setLoading] = useState(false);

  async function fetchLive() {
    setLoading(true);
    try {
      const bundle = await getLiveSignals();
      setData(bundle);
    } catch (err) {
      setData({
        fetchedAt: new Date().toISOString(),
        register: [],
        error: err instanceof Error ? err.message : "Feed unavailable",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-8">
      <header>
        <p className="font-mono text-micro uppercase tracking-[0.18em] text-subtle">
          Primary
        </p>
        <h2 className="font-display text-3xl tracking-tight">Sources & monitors</h2>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          The desk is compiled from public law, State, Treasury, Congress, DIRCO and
          defence reporting. It is not a sanctions list and not legal advice. Pull the
          Federal Register live when you want a second check against our curated log.
        </p>
      </header>

      <section className="rounded-xl border border-border bg-surface p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="font-display text-xl tracking-tight">Federal Register</h3>
            <p className="mt-1 text-sm text-muted">
              Live search for “South Africa” — EOs, refugee determinations, future OFAC rules.
            </p>
          </div>
          <Button type="button" onClick={() => void fetchLive()} disabled={loading}>
            {loading ? "Fetching…" : "Fetch live"}
          </Button>
        </div>
        {data?.error ? <p className="mt-3 text-sm text-signal">{data.error}</p> : null}
        {data?.register?.length ? (
          <ul className="mt-4 grid gap-2">
            {data.register.map((item) => (
              <li key={item.id} className="rounded-md border border-border px-3 py-2">
                <p className="font-mono text-micro text-subtle">
                  {item.date ? formatDeskDate(item.date) : "—"} · {item.source}
                </p>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1 block text-sm text-accent underline-offset-4 hover:underline"
                >
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        ) : data && !loading && !data.error ? (
          <p className="mt-3 text-sm text-muted">No recent documents returned.</p>
        ) : null}
      </section>

      <section>
        <h3 className="font-display text-2xl tracking-tight">Standing monitors</h3>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {MONITOR_QUERIES.map((m) => (
            <li key={m.url}>
              <a
                href={m.url}
                target="_blank"
                rel="noreferrer"
                className="flex h-14 items-center rounded-lg border border-border bg-surface px-4 text-sm hover:bg-elevated"
              >
                {m.label}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3 className="font-display text-2xl tracking-tight">Cited record</h3>
        <ul className="mt-3 grid gap-3">
          {SOURCES.map((s) => (
            <li key={s.id} className="rounded-xl border border-border bg-surface p-4">
              <p className="font-mono text-micro uppercase tracking-wider text-subtle">
                {s.kind} · {s.org}
              </p>
              <a
                href={s.url}
                target="_blank"
                rel="noreferrer"
                className="mt-1 block text-sm font-medium text-accent underline-offset-4 hover:underline"
              >
                {s.name}
              </a>
              <p className="mt-1 text-sm text-muted">{s.why}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
