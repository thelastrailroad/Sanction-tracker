import { createFileRoute } from "@tanstack/react-router";
import { HULLS_2026, MILITARY_READ, MILITARY_THREADS } from "@/data";
import { SeverityPill } from "@/components/desk/severity";
import { formatDeskDate } from "@/lib/utils";

export const Route = createFileRoute("/military")({ component: MilitaryPage });

function MilitaryPage() {
  return (
    <div className="grid gap-8">
      <header>
        <p className="font-mono text-micro uppercase tracking-[0.18em] text-subtle">
          China · Russia · Iran
        </p>
        <h2 className="font-display text-3xl tracking-tight">Military alignment</h2>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          This is the file that turns a bilateral spat into a sanctions case. Washington
          does not need Pretoria to join a formal alliance. Serial drills, a sanctioned
          cargo ship, and an Iranian flotilla at Simon’s Town are enough to write the
          certification that S.2752 asks for.
        </p>
      </header>

      <section className="rounded-xl border border-border bg-surface p-5 sm:p-6">
        <p className="font-mono text-micro uppercase tracking-[0.18em] text-subtle">
          Will for Peace 2026 · Simon’s Town
        </p>
        <h3 className="mt-2 font-display text-2xl tracking-tight">Order of battle, January</h3>
        <p className="mt-2 text-sm text-muted">
          China-led. Hosted by the SAN. India and Brazil did not send ships. Treat the
          “BRICS Plus” label as marketing.
        </p>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {HULLS_2026.map((h) => (
            <li
              key={h.hull}
              className="flex items-baseline justify-between gap-3 rounded-md border border-border px-3 py-2"
            >
              <div>
                <p className="text-sm font-medium">{h.hull}</p>
                <p className="text-xs text-muted">{h.class}</p>
              </div>
              <span className="font-mono text-micro uppercase text-subtle">{h.flag}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        {MILITARY_THREADS.map((t) => (
          <article key={t.id} className="rounded-xl border border-border bg-surface p-5">
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-display text-2xl tracking-tight">{t.partner}</h3>
              <SeverityPill value={t.risk} />
            </div>
            <p className="mt-2 text-sm leading-normal text-muted">{t.posture}</p>
            <ol className="mt-4 grid gap-3">
              {t.items.map((item) => (
                <li key={item.title} className="border-t border-border pt-3">
                  <p className="font-mono text-micro tabular-nums text-subtle">
                    {formatDeskDate(item.date)}
                  </p>
                  <p className="mt-1 text-sm font-medium leading-snug">{item.title}</p>
                  <p className="mt-1 text-sm text-muted">{item.detail}</p>
                </li>
              ))}
            </ol>
          </article>
        ))}
      </section>

      <section>
        <h3 className="font-display text-2xl tracking-tight">How to read it</h3>
        <ul className="mt-3 grid gap-3">
          {MILITARY_READ.map((line) => (
            <li
              key={line}
              className="rounded-lg border border-border bg-surface px-4 py-3 text-sm leading-normal text-muted"
            >
              {line}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
