import { CSI_PRINT, DESK_AS_OF, bandFor } from "@/data";
import { formatDeskDate } from "@/lib/utils";
import { SeverityPill } from "./severity";

const BANDS = [
  { range: "0–24", label: "Low", note: "Normal friction. No live US measures." },
  { range: "25–44", label: "Watch", note: "Allegations, bills, or drills. No financial tool yet." },
  { range: "45–64", label: "Elevated", note: "Aid, tariffs, or forum exclusion in force." },
  { range: "65–79", label: "High", note: "Targeted visas or a live Magnitsky path. This print." },
  { range: "80–100", label: "Critical", note: "Named SDN / AGOA drop / secondary helper finding." },
];

const UP = [
  { move: "Hostile speech, embassy ‘first step’, Pretoria defiance", print: "+1 to +3" },
  { move: "Military visit or CRI drill (Iran, Russia, China)", print: "+4 to +8" },
  { move: "Visa policy, aid freeze, G20 lockout", print: "+8 to +12" },
  { move: "Magnitsky designations, AGOA eligibility cut, Lady R repeat", print: "+10 to +18" },
];

const DOWN = [
  { move: "Quiet tape (no new hostile news)", print: "−1 over a few days" },
  { move: "Ambassador restored, AGOA rollover, bill stalls", print: "−1 to −3" },
  { move: "Visa list unpublished and ‘first step’ walked back", print: "−4 to −6" },
  { move: "EO 14204 aid freeze lifted", print: "−8 to −12" },
];

export function ScoringReadme() {
  const print = CSI_PRINT;

  return (
    <article id="scoring" className="rounded-xl border border-border bg-surface p-5 sm:p-6">
      <header>
        <p className="font-mono text-micro uppercase tracking-[0.18em] text-subtle">
          Readme · {formatDeskDate(DESK_AS_OF)}
        </p>
        <h2 className="font-display text-2xl tracking-tight sm:text-3xl">How scoring works</h2>
        <p className="mt-3 max-w-3xl text-sm leading-normal text-muted sm:text-base">
          The Cape Signal Index is a published 0–100 print of US pressure on South
          Africa. It is not a probability of country sanctions and not an OFAC list.
          Hostile news raises it. Silence and relief lower it. Legal instruments stay
          until they are reversed.
        </p>
      </header>

      <section className="mt-8">
        <h3 className="font-display text-xl tracking-tight">The number</h3>
        <p className="mt-2 max-w-3xl text-sm leading-normal text-muted">
          Two books, then a blend. Pressure (visas, aid, G20, military alignment) is
          62% of the headline. Finance (Magnitsky path, AGOA, secondary/helper risk)
          is 38%. Visa bans do not freeze assets, so finance lags until a designation
          or an eligibility cut. A squash keeps the stacked log inside 0–100.
        </p>
        <p className="mt-3 font-mono text-sm tabular-nums text-fg">
          CSI = round(0.62 × pressure + 0.38 × finance)
        </p>
        <div className="mt-4 flex flex-wrap items-end gap-6">
          <Stat label="Today" value={print.csi} />
          <Stat label="Pressure" value={print.pressure} />
          <Stat label="Finance" value={print.financial} />
          <div>
            <p className="font-mono text-micro uppercase tracking-wider text-subtle">Band</p>
            <div className="mt-1">
              <SeverityPill value={bandFor(print.csi)} />
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8">
        <h3 className="font-display text-xl tracking-tight">Stock and flow</h3>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-border bg-elevated p-4">
            <p className="font-mono text-micro uppercase tracking-wider text-watch">Stock</p>
            <p className="mt-2 text-sm leading-normal text-muted">
              Measures still in force leave a residual that does not decay: EO 14204,
              the 16 Sep visa policy, the aid freeze, G20 exclusion. Those are the
              floor. They only fall if Washington reverses them.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-elevated p-4">
            <p className="font-mono text-micro uppercase tracking-wider text-signal">Flow</p>
            <p className="mt-2 text-sm leading-normal text-muted">
              Each event in the signal log adds a shock. Speeches and visits fade with
              a 35–180 day half-life. Drills last longer. Relief (AGOA extension,
              restoring an ambassador) scores negative and fades as reviews reopen.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8">
        <h3 className="font-display text-xl tracking-tight">Bands</h3>
        <ul className="mt-3 grid gap-2">
          {BANDS.map((b) => (
            <li
              key={b.range}
              className="grid gap-1 border-b border-border py-3 text-sm last:border-0 sm:grid-cols-[5.5rem_7rem_1fr] sm:items-baseline sm:gap-3 sm:py-2"
            >
              <span className="font-mono tabular-nums text-subtle">{b.range}</span>
              <span className="font-medium">{b.label}</span>
              <span className="text-muted">{b.note}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-8 grid gap-8 lg:grid-cols-2">
        <div>
          <h3 className="font-display text-xl tracking-tight">What prints up</h3>
          <MoveTable rows={UP} tone="up" />
        </div>
        <div>
          <h3 className="font-display text-xl tracking-tight">What prints down</h3>
          <MoveTable rows={DOWN} tone="down" />
        </div>
      </section>

      <section className="mt-8">
        <h3 className="font-display text-xl tracking-tight">What a −1 is</h3>
        <p className="mt-2 max-w-3xl text-sm leading-normal text-muted">
          The print is a whole number. After a spike, shocks fade a little every
          night. With nothing new on the tape, the first −1 typically lands a few
          quiet days later — from this week’s visa package, that is 20 Sep. A small
          relief event (channel restored, AGOA rolled forward with no carve-out, a
          bill that never marks up) can also print −1. It is not a reset. The stock
          from the EO, the visa policy, aid, and G20 is still there.
        </p>
      </section>

      <section className="mt-8">
        <h3 className="font-display text-xl tracking-tight">This print</h3>
        <p className="mt-2 max-w-3xl text-sm leading-normal text-muted">
          {formatDeskDate(print.asOf)} closed at {print.csi}. Pressure {print.pressure},
          finance {print.financial}. {print.delta1 >= 0 ? "+" : ""}
          {print.delta1} today, {print.delta30 >= 0 ? "+" : ""}
          {print.delta30} over 30 days. The 16 Sep visa package is the largest live
          shock. Will for Peace and the SANDF chief’s Tehran visit still sit in the
          residual. Finance is below the headline because nobody has been designated.
        </p>
      </section>

      <section className="mt-8">
        <h3 className="font-display text-xl tracking-tight">How to move tomorrow’s figure</h3>
        <p className="mt-2 max-w-3xl text-sm leading-normal text-muted">
          Add or drop events on the timeline. The index is computed from that log —
          date, kind, severity, and whether the item is a legal instrument or a news
          shock. Highlighting a story ranks it on the board; it does not change the
          print. Pinning a watch item does not either.
        </p>
      </section>
    </article>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <p className="font-mono text-micro uppercase tracking-wider text-subtle">{label}</p>
      <p className="mt-1 font-display text-3xl tabular-nums leading-none">{value}</p>
    </div>
  );
}

function MoveTable({
  rows,
  tone,
}: {
  rows: { move: string; print: string }[];
  tone: "up" | "down";
}) {
  return (
    <ul className="mt-3 grid gap-2">
      {rows.map((r) => (
        <li
          key={r.move}
          className="flex items-start justify-between gap-3 rounded-md border border-border bg-elevated px-3 py-2 text-sm"
        >
          <span className="text-muted">{r.move}</span>
          <span
            className={
              tone === "up"
                ? "shrink-0 font-mono tabular-nums text-signal"
                : "shrink-0 font-mono tabular-nums text-steady"
            }
          >
            {r.print}
          </span>
        </li>
      ))}
    </ul>
  );
}
