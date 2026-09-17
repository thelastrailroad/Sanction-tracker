import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  ENVOY_CABLES,
  FIVE_ASKS,
  SA_MISSION,
  US_MISSION,
  VACANCY,
  type CableKind,
  type EnvoyCable,
  type EnvoyMission,
  type EnvoyProfile,
} from "@/data";
import { getEnvoySignals, type EnvoyLiveItem } from "@/lib/feeds";
import { cn, formatDeskDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/envoys")({ component: EnvoysPage });

const KIND_LABEL: Record<CableKind, string> = {
  press: "Press",
  interview: "Interview",
  social: "Social",
  speech: "Speech",
};

function EnvoysPage() {
  const [side, setSide] = useState<EnvoyMission | "all">("all");
  const [live, setLive] = useState<EnvoyLiveItem[] | null>(null);
  const [liveErrors, setLiveErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const cables = useMemo(
    () => ENVOY_CABLES.filter((c) => (side === "all" ? true : c.mission === side)),
    [side],
  );

  const liveRows = useMemo(
    () => (live ?? []).filter((c) => (side === "all" ? true : c.mission === side)),
    [live, side],
  );

  async function pullLive() {
    setLoading(true);
    try {
      const bundle = await getEnvoySignals();
      setLive(bundle.items);
      setLiveErrors(bundle.errors);
    } catch (err) {
      setLiveErrors([err instanceof Error ? err.message : "Feed unavailable"]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-8">
      <header>
        <p className="font-mono text-micro uppercase tracking-[0.18em] text-subtle">
          Bilateral missions
        </p>
        <h2 className="font-display text-3xl tracking-tight">Envoy cables</h2>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          Press, interviews, and social from the two people who actually talk across the
          corridor. The Washington post is not vacant — Roelf Meyer has held it since May,
          after a 13-month gap when Rasool was expelled.
        </p>
      </header>

      <section className="grid gap-4 lg:grid-cols-2">
        <MissionCard profile={US_MISSION} />
        <MissionCard profile={SA_MISSION} />
      </section>

      <section className="rounded-xl border border-border bg-surface p-5">
        <p className="font-mono text-micro uppercase tracking-[0.18em] text-watch">
          Vacancy, closed
        </p>
        <p className="mt-2 text-sm leading-normal text-muted">
          {VACANCY.predecessor} was PNG’d {formatDeskDate(VACANCY.start)}. The chair sat
          empty until Meyer’s appointment on {formatDeskDate(VACANCY.end)}.{" "}
          {VACANCY.why} That gap is why Bozell, in March, told Pretoria to put someone in
          Washington.
        </p>
      </section>

      <section>
        <h3 className="font-display text-2xl tracking-tight">Bozell’s five asks</h3>
        <p className="mt-1 text-sm text-muted">
          Delivered to Pretoria in 2025, restated at Hermanus in March 2026. The visa
          policy is what happens when they go unanswered.
        </p>
        <ol className="mt-3 grid gap-2">
          {FIVE_ASKS.map((ask, i) => (
            <li
              key={ask}
              className="grid grid-cols-[auto_1fr] gap-3 rounded-lg border border-border bg-surface px-3 py-3"
            >
              <span className="font-mono text-micro tabular-nums text-subtle pt-0.5">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-sm">{ask}</p>
            </li>
          ))}
        </ol>
      </section>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {(
            [
              { id: "all", label: "Both desks" },
              { id: "us", label: "Bozell" },
              { id: "sa", label: "Meyer" },
            ] as const
          ).map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => setSide(opt.id)}
              className={cn(
                "h-11 shrink-0 rounded-full border px-3 text-sm",
                side === opt.id
                  ? "border-accent bg-accent text-accent-fg"
                  : "border-border bg-surface text-muted",
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
        <Button type="button" onClick={() => void pullLive()} disabled={loading}>
          {loading ? "Pulling…" : "Pull live wires"}
        </Button>
      </div>

      {liveErrors.length > 0 ? (
        <p className="text-sm text-watch">{liveErrors.join(" · ")}</p>
      ) : null}

      {liveRows.length > 0 ? (
        <section>
          <h3 className="font-display text-2xl tracking-tight">Live wires</h3>
          <p className="mt-1 text-sm text-muted">
            Embassy RSS and news search. Ranked by date. Not a substitute for the curated log.
          </p>
          <ul className="mt-3 grid gap-2">
            {liveRows.map((item) => (
              <li key={item.id} className="rounded-lg border border-border bg-surface p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-micro uppercase tracking-wider text-subtle">
                    {item.mission === "us" ? "US Pretoria" : "SA Washington"}
                  </span>
                  {item.date ? (
                    <time className="font-mono text-micro tabular-nums text-subtle">
                      {formatDeskDate(item.date)}
                    </time>
                  ) : null}
                  <span className="font-mono text-micro text-subtle">{item.source}</span>
                </div>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 block text-sm font-medium text-accent underline-offset-4 hover:underline"
                >
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section>
        <h3 className="font-display text-2xl tracking-tight">Curated log</h3>
        <ul className="mt-3 grid gap-3">
          {cables.map((c) => (
            <CableCard key={c.id} cable={c} />
          ))}
        </ul>
      </section>
    </div>
  );
}

function MissionCard({ profile }: { profile: EnvoyProfile }) {
  return (
    <article className="rounded-xl border border-border bg-surface p-5">
      <div className="flex items-start gap-3">
        <span
          className="flex size-12 shrink-0 items-center justify-center rounded-md bg-elevated font-display text-lg text-fg"
          aria-hidden
        >
          {profile.initials}
        </span>
        <div className="min-w-0">
          <p className="font-mono text-micro uppercase tracking-wider text-subtle">
            {profile.post}
          </p>
          <h3 className="font-display text-xl tracking-tight">{profile.name}</h3>
          <p className="mt-1 font-mono text-micro uppercase tracking-wider text-steady">
            Seated
          </p>
        </div>
      </div>
      <p className="mt-3 text-sm text-muted">{profile.statusNote}</p>
      <p className="mt-2 text-sm">{profile.line}</p>
      <div className="mt-4 flex flex-wrap gap-3">
        <a
          href={profile.webUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-11 items-center text-sm text-accent underline-offset-4 hover:underline"
        >
          Mission site
        </a>
        <a
          href={profile.xUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-11 items-center text-sm text-accent underline-offset-4 hover:underline"
        >
          {profile.mission === "us" ? "Embassy on X" : "Embassy home"}
        </a>
      </div>
    </article>
  );
}

function CableCard({ cable }: { cable: EnvoyCable }) {
  return (
    <li
      className={cn(
        "rounded-xl border bg-surface p-4 sm:p-5",
        cable.flagged ? "border-signal/40" : "border-border",
      )}
    >
      <div className="flex flex-wrap items-center gap-2">
        <time className="font-mono text-xs tabular-nums text-subtle">
          {formatDeskDate(cable.date)}
        </time>
        <span className="font-mono text-micro uppercase tracking-wider text-subtle">
          {cable.mission === "us" ? "Bozell" : "Meyer"} · {KIND_LABEL[cable.kind]}
        </span>
        {cable.flagged ? (
          <span className="font-mono text-micro uppercase tracking-wider text-signal">
            Flagged
          </span>
        ) : null}
      </div>
      <h4 className="mt-2 text-base font-medium leading-snug">{cable.title}</h4>
      {cable.quote ? (
        <blockquote className="mt-3 border-l-2 border-watch/50 pl-3 text-sm leading-normal text-fg">
          {cable.quote}
        </blockquote>
      ) : null}
      <p className="mt-2 text-sm leading-normal text-muted">{cable.summary}</p>
      <a
        href={cable.sourceUrl}
        target="_blank"
        rel="noreferrer"
        className="mt-3 inline-flex h-11 items-center text-sm text-accent underline-offset-4 hover:underline"
      >
        {cable.source}
      </a>
    </li>
  );
}
