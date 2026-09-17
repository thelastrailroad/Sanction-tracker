import { createFileRoute } from "@tanstack/react-router";
import { FINANCIAL_FACTORS, SECTORS } from "@/data";
import { SeverityPill } from "@/components/desk/severity";

export const Route = createFileRoute("/exposure")({ component: ExposurePage });

function ExposurePage() {
  return (
    <div className="grid gap-8">
      <header>
        <p className="font-mono text-micro uppercase tracking-[0.18em] text-subtle">
          Money
        </p>
        <h2 className="font-display text-3xl tracking-tight">Financial exposure</h2>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          South Africa is a G20 economy with platinum, chrome and manganese the US
          cannot easily replace. That is why a country embargo is still a tail risk —
          and why the realistic path is named people, a trade-preference cut, and
          secondary tools if the military file gets worse.
        </p>
      </header>

      <section>
        <h3 className="font-display text-2xl tracking-tight">How finance actually arrives</h3>
        <ul className="mt-3 grid gap-3">
          {FINANCIAL_FACTORS.map((f) => (
            <li key={f.id} className="rounded-xl border border-border bg-surface p-4 sm:p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="text-sm font-medium">{f.label}</p>
                <p className="font-mono text-sm tabular-nums text-watch">{f.score}</p>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-elevated">
                <span
                  className="block h-full rounded-full bg-watch"
                  style={{ width: `${f.score}%` }}
                />
              </div>
              <p className="mt-3 text-sm text-muted">{f.note}</p>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3 className="font-display text-2xl tracking-tight">Sector map</h3>
        <ul className="mt-3 grid gap-3 sm:grid-cols-2">
          {SECTORS.map((s) => (
            <li key={s.id} className="rounded-xl border border-border bg-surface p-5">
              <div className="flex items-center justify-between gap-2">
                <h4 className="font-medium">{s.name}</h4>
                <SeverityPill value={s.risk} />
              </div>
              <p className="mt-3 text-sm text-muted">{s.exposure}</p>
              <p className="mt-2 text-sm">
                <span className="text-subtle">US leverage. </span>
                {s.usLeverage}
              </p>
              <p className="mt-2 text-sm text-muted">{s.notes}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
