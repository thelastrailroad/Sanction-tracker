import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { DESK_AS_OF, EVENTS, CSI_PRINT, bandFor } from "@/data";
import { addDays, buildSeries } from "@/lib/csi";
import { cn, formatDeskDate, formatShortDate } from "@/lib/utils";
import { SeverityPill } from "./severity";

const RANGES = [
  { id: "90d", label: "90 days", days: 90, step: 1 },
  { id: "1y", label: "1 year", days: 365, step: 7 },
  { id: "all", label: "Since Lady R", days: 0, step: 14 },
] as const;

function signed(n: number): string {
  if (n > 0) return `+${n}`;
  return String(n);
}

function tickFor(range: (typeof RANGES)[number]["id"], iso: string) {
  const [, m, d] = iso.split("-");
  if (range === "all") return `${m}/${iso.slice(2, 4)}`;
  return `${d}/${m}`;
}

export function IndexPrint() {
  const print = CSI_PRINT;
  const band = bandFor(print.csi);
  const [range, setRange] = useState<(typeof RANGES)[number]["id"]>("90d");
  const spec = RANGES.find((r) => r.id === range) ?? RANGES[0];
  const from = spec.days === 0 ? EVENTS[EVENTS.length - 1]!.date : addDays(DESK_AS_OF, -spec.days);
  const series = useMemo(
    () => buildSeries(from, DESK_AS_OF, spec.step),
    [from, spec.step],
  );

  return (
    <section className="overflow-hidden rounded-xl border border-border-strong bg-surface p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="font-mono text-micro uppercase tracking-[0.18em] text-subtle">
            Daily print · {formatDeskDate(print.asOf)}
          </p>
          <h2 className="font-display text-2xl tracking-tight sm:text-3xl">Cape Signal Index</h2>
        </div>
        <SeverityPill value={band} />
      </div>

      <div className="mt-5 grid min-w-0 gap-6 lg:grid-cols-[auto_1fr]">
        <div className="min-w-0 sm:min-w-[11rem]">
          <p className="font-display text-6xl leading-none tracking-tight tabular-nums sm:text-7xl">
            {print.csi}
          </p>
          <p className="mt-3 text-sm text-muted">
            <span className={cn("tabular-nums", print.delta1 > 0 ? "text-signal" : print.delta1 < 0 ? "text-steady" : "text-muted")}>
              {signed(print.delta1)} today
            </span>
            <span className="text-subtle"> · </span>
            <span className={cn("tabular-nums", print.delta30 > 0 ? "text-signal" : "text-muted")}>
              {signed(print.delta30)} / 30d
            </span>
          </p>
          <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-md border border-border bg-elevated px-3 py-2">
              <dt className="font-mono text-micro uppercase tracking-wider text-subtle">Pressure</dt>
              <dd className="mt-1 font-display text-2xl tabular-nums">{print.pressure}</dd>
            </div>
            <div className="rounded-md border border-border bg-elevated px-3 py-2">
              <dt className="font-mono text-micro uppercase tracking-wider text-subtle">Finance</dt>
              <dd className="mt-1 font-display text-2xl tabular-nums">{print.financial}</dd>
            </div>
          </dl>
        </div>

        <div className="min-w-0">
          <div className="flex flex-wrap gap-2">
            {RANGES.map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => setRange(r.id)}
                className={cn(
                  "h-11 rounded-full border px-3 text-sm",
                  range === r.id
                    ? "border-accent bg-accent text-accent-fg"
                    : "border-border bg-elevated text-muted",
                )}
              >
                {r.label}
              </button>
            ))}
          </div>
          <div className="mt-3 h-56 w-full min-w-0 overflow-hidden sm:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={series} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid stroke="var(--color-border)" vertical={false} />
                <XAxis
                  dataKey="date"
                  tick={{ fill: "var(--color-subtle)", fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                  minTickGap={28}
                  tickFormatter={(d: string) => tickFor(range, d)}
                />
                <YAxis
                  domain={[0, 100]}
                  tick={{ fill: "var(--color-subtle)", fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<PrintTooltip />} />
                <Area
                  type="monotone"
                  dataKey="csi"
                  name="Index"
                  stroke="var(--color-signal)"
                  fill="var(--color-signal)"
                  fillOpacity={0.16}
                  strokeWidth={2.25}
                />
                <Line
                  type="monotone"
                  dataKey="pressure"
                  name="Pressure"
                  stroke="var(--color-watch)"
                  strokeWidth={1.5}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="financial"
                  name="Finance"
                  stroke="var(--color-info)"
                  strokeWidth={1.5}
                  dot={false}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-1 font-mono text-micro text-subtle">
            <span className="text-signal">Index</span>
            {" · "}
            <span className="text-watch">Pressure</span>
            {" · "}
            <span className="text-info">Finance</span>
            {" — weekly sampled outside 90-day view; event days always plotted."}
          </p>
        </div>
      </div>

      <div className="mt-6 border-t border-border pt-5">
        <p className="font-mono text-micro uppercase tracking-[0.18em] text-subtle">
          Why this print
        </p>
        <ul className="mt-3 grid gap-2 lg:grid-cols-2">
          {print.contributors.map((c) => (
            <li
              key={c.id}
              className="flex items-start justify-between gap-3 rounded-md border border-border bg-elevated px-3 py-2"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{c.title}</p>
                <p className="font-mono text-micro tabular-nums text-subtle">
                  {formatShortDate(c.date)}
                </p>
              </div>
              <span
                className={cn(
                  "shrink-0 font-mono text-sm tabular-nums",
                  c.csi > 0 ? "text-signal" : "text-steady",
                )}
              >
                {c.csi > 0 ? "+" : ""}
                {c.csi.toFixed(1)}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-5 text-sm">
        <Link
          to="/scoring"
          className="inline-flex h-11 items-center text-accent underline-offset-4 hover:underline"
        >
          How scoring works
        </Link>
      </p>
    </section>
  );
}

function PrintTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: {
    dataKey?: string | number;
    value?: number;
    payload?: { headlines?: string[] };
  }[];
  label?: string;
}) {
  if (!active || !payload?.length || !label) return null;
  const headlines = payload[0]?.payload?.headlines ?? [];
  const names: Record<string, string> = {
    csi: "Index",
    pressure: "Pressure",
    financial: "Finance",
  };
  return (
    <div className="max-w-xs rounded-md border border-border bg-elevated px-3 py-2 text-xs text-fg">
      <p className="font-mono text-micro tabular-nums text-subtle">{formatDeskDate(label)}</p>
      <ul className="mt-1 grid gap-0.5">
        {payload.map((p) => (
          <li key={String(p.dataKey)} className="flex justify-between gap-4">
            <span className="text-muted">{names[String(p.dataKey)] ?? String(p.dataKey)}</span>
            <span className="tabular-nums">{p.value}</span>
          </li>
        ))}
      </ul>
      {headlines.length > 0 ? (
        <ul className="mt-2 border-t border-border pt-2 text-muted">
          {headlines.map((h) => (
            <li key={h} className="leading-snug">
              {h}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
