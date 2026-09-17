import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Pin } from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  ENVOY_CABLES,
  EVENTS,
  FINANCIAL_SCORE,
  FLASH,
  INDICATORS,
  PRESSURE_SCORE,
  RISK_HISTORY,
  SA_MISSION,
  US_MISSION,
} from "@/data";
import { EscalationLadder } from "@/components/desk/ladder";
import { RiskMeter } from "@/components/desk/risk-meter";
import { SeverityPill } from "@/components/desk/severity";
import { HighlightBoard, HighlightToggle } from "@/components/desk/highlights";
import { formatDeskDate, formatShortDate } from "@/lib/utils";
import { useWatchStore } from "@/lib/watch-store";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const pinned = useWatchStore((s) => s.pinned);
  const latest = EVENTS.slice(0, 5);
  const watchTop = INDICATORS.filter((i) =>
    ["immediate", "near"].includes(i.horizon),
  )
    .filter((i) => i.severity === "critical" || i.severity === "high")
    .slice(0, 6);
  const pinnedItems = INDICATORS.filter((i) => pinned.includes(i.id));

  return (
    <div className="grid gap-8">
      <section className="rounded-xl border border-signal/40 bg-signal/10 p-5 sm:p-6">
        <p className="font-mono text-micro uppercase tracking-[0.18em] text-signal">
          {FLASH.kicker} · {formatDeskDate(FLASH.date)}
        </p>
        <h2 className="mt-2 font-display text-2xl tracking-tight sm:text-3xl">
          {FLASH.title}
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-normal text-muted sm:text-base">
          {FLASH.body}
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          {FLASH.urls.map((u) => (
            <a
              key={u.href}
              href={u.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 items-center text-sm text-accent underline-offset-4 hover:underline"
            >
              {u.label}
            </a>
          ))}
        </div>
      </section>

      <HighlightBoard />

      <section className="grid gap-4 lg:grid-cols-2">
        <RiskMeter
          emphasis
          label="Bilateral pressure"
          score={PRESSURE_SCORE}
          blurb="Visa restrictions, aid freeze, G20 snub, and military drills with China, Russia and Iran. This is already high. It is not yet a country embargo."
        />
        <RiskMeter
          label="Financial-sanctions proximity"
          score={FINANCIAL_SCORE}
          blurb="Visa bans are not asset freezes. Magnitsky, AGOA eligibility, and Russia/Iran helper authorities are the live financial path. Country-wide OFAC isolation remains a tail risk."
        />
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <HeaderRow
            kicker="Path"
            title="Escalation ladder"
            to="/watch"
            link="What to watch"
          />
          <EscalationLadder />
        </div>
        <div>
          <HeaderRow kicker="Series" title="Pressure vs finance" />
          <div className="mt-3 h-64 rounded-xl border border-border bg-surface p-3 sm:h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={RISK_HISTORY} margin={{ top: 8, right: 12, left: -12, bottom: 4 }}>
                <CartesianGrid stroke="var(--color-border)" vertical={false} />
                <XAxis
                  dataKey="date"
                  tick={{ fill: "var(--color-subtle)", fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                  interval={1}
                  tickFormatter={(d: string) => {
                    const [year, month] = d.split("-");
                    return `${month}/${year?.slice(2) ?? ""}`;
                  }}
                />
                <YAxis
                  domain={[0, 100]}
                  tick={{ fill: "var(--color-subtle)", fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    background: "var(--color-elevated)",
                    border: "1px solid var(--color-border)",
                    borderRadius: 8,
                    color: "var(--color-fg)",
                    fontSize: 12,
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="pressure"
                  name="Pressure"
                  stroke="var(--color-signal)"
                  fill="var(--color-signal)"
                  fillOpacity={0.18}
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="financial"
                  name="Financial"
                  stroke="var(--color-info)"
                  fill="var(--color-info)"
                  fillOpacity={0.12}
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-2 text-xs text-subtle">
            Pressure moved first. Finance lags — until a named designation or an AGOA drop.
          </p>
        </div>
      </section>

      <section>
        <HeaderRow kicker="Missions" title="What the ambassadors are saying" to="/envoys" link="Envoy desk" />
        <div className="grid gap-4 lg:grid-cols-2">
          <EnvoyPeek
            label={US_MISSION.shortName}
            post={US_MISSION.post}
            cables={ENVOY_CABLES.filter((c) => c.mission === "us").slice(0, 2)}
          />
          <EnvoyPeek
            label={SA_MISSION.shortName}
            post={SA_MISSION.post}
            cables={ENVOY_CABLES.filter((c) => c.mission === "sa").slice(0, 2)}
          />
        </div>
      </section>

      {pinnedItems.length > 0 ? (
        <section>
          <HeaderRow kicker="Pinned" title="Your watch list" to="/watch" link="Manage" />
          <ul className="mt-3 grid gap-2">
            {pinnedItems.map((i) => (
              <li
                key={i.id}
                className="flex items-start gap-3 rounded-lg border border-border bg-surface px-4 py-3"
              >
                <Pin className="mt-0.5 size-4 shrink-0 text-watch" strokeWidth={1.75} />
                <div>
                  <p className="text-sm font-medium">{i.title}</p>
                  <p className="mt-1 text-sm text-muted">{i.nextTrigger}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="grid gap-8 lg:grid-cols-2">
        <div>
          <HeaderRow kicker="Cable" title="Latest movements" to="/timeline" link="Full timeline" />
          <ul className="mt-3 grid gap-2">
            {latest.map((e) => (
              <li key={e.id} className="rounded-lg border border-border bg-surface p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <time className="font-mono text-micro tabular-nums text-subtle">
                    {formatShortDate(e.date)}
                  </time>
                  <SeverityPill value={e.severity} />
                </div>
                <p className="mt-2 text-sm font-medium leading-snug">{e.title}</p>
                <p className="mt-1 line-clamp-2 text-sm text-muted">{e.summary}</p>
                <div className="mt-3">
                  <HighlightToggle id={e.id} />
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <HeaderRow
            kicker="If visas are step one"
            title="Highest-signal watch items"
            to="/watch"
            link="Full briefing"
          />
          <ul className="mt-3 grid gap-2">
            {watchTop.map((i) => (
              <li key={i.id} className="rounded-lg border border-border bg-surface p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <SeverityPill value={i.severity} />
                  <span className="font-mono text-micro uppercase tracking-wider text-subtle">
                    {i.horizon}
                  </span>
                </div>
                <p className="mt-2 text-sm font-medium leading-snug">{i.title}</p>
                <p className="mt-1 line-clamp-2 text-sm text-muted">{i.nextTrigger}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

function HeaderRow({
  kicker,
  title,
  to,
  link,
}: {
  kicker: string;
  title: string;
  to?: string;
  link?: string;
}) {
  return (
    <div className="mb-3 flex items-end justify-between gap-3">
      <div>
        <p className="font-mono text-micro uppercase tracking-[0.18em] text-subtle">{kicker}</p>
        <h2 className="font-display text-xl tracking-tight sm:text-2xl">{title}</h2>
      </div>
      {to && link ? (
        <Link
          to={to}
          className="inline-flex h-11 items-center gap-1 text-sm text-muted hover:text-fg"
        >
          {link}
          <ArrowRight className="size-4" />
        </Link>
      ) : null}
    </div>
  );
}

function EnvoyPeek({
  label,
  post,
  cables,
}: {
  label: string;
  post: string;
  cables: typeof ENVOY_CABLES;
}) {
  return (
    <article className="rounded-xl border border-border bg-surface p-4 sm:p-5">
      <p className="font-mono text-micro uppercase tracking-wider text-subtle">{post}</p>
      <p className="mt-1 font-display text-xl tracking-tight">{label}</p>
      <ul className="mt-3 grid gap-3">
        {cables.map((c) => (
          <li key={c.id} className="border-t border-border pt-3">
            <time className="font-mono text-micro tabular-nums text-subtle">
              {formatShortDate(c.date)}
            </time>
            <p className="mt-1 text-sm font-medium leading-snug">{c.title}</p>
            {c.quote ? (
              <p className="mt-1 line-clamp-2 text-sm text-muted">{c.quote}</p>
            ) : (
              <p className="mt-1 line-clamp-2 text-sm text-muted">{c.summary}</p>
            )}
          </li>
        ))}
      </ul>
    </article>
  );
}
