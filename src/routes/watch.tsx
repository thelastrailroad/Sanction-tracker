import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Check, Pin } from "lucide-react";
import { INDICATORS } from "@/data";
import type { Horizon } from "@/data/types";
import { SeverityPill } from "@/components/desk/severity";
import { cn } from "@/lib/utils";
import { useWatchStore } from "@/lib/watch-store";

export const Route = createFileRoute("/watch")({ component: WatchPage });

const HORIZONS: { id: Horizon | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "immediate", label: "0–90 days" },
  { id: "near", label: "3–12 months" },
  { id: "structural", label: "Structural" },
];

function WatchPage() {
  const [horizon, setHorizon] = useState<(typeof HORIZONS)[number]["id"]>("all");
  const checked = useWatchStore((s) => s.checked);
  const pinned = useWatchStore((s) => s.pinned);
  const toggleChecked = useWatchStore((s) => s.toggleChecked);
  const togglePinned = useWatchStore((s) => s.togglePinned);

  const rows = useMemo(
    () => INDICATORS.filter((i) => (horizon === "all" ? true : i.horizon === horizon)),
    [horizon],
  );

  return (
    <div className="grid gap-8">
      <header>
        <p className="font-mono text-micro uppercase tracking-[0.18em] text-subtle">
          Briefing
        </p>
        <h2 className="font-display text-3xl tracking-tight">What else to watch</h2>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          Visa restrictions on politicians who implement racial quotas are a step, not
          the destination. They do not freeze assets. The financial case is built from
          the items below — especially military contact with China, Russia and Iran.
        </p>
      </header>

      <article className="rounded-xl border border-border bg-surface p-5 sm:p-6">
        <p className="font-mono text-micro uppercase tracking-[0.18em] text-watch">
          Desk note
        </p>
        <div className="mt-3 grid gap-3 text-sm leading-normal text-muted">
          <p>
            If you are tracking a path to US financial sanctions, do not overweight the
            visa list. INA 212(a)(3)(C) keeps people out of the United States. Global
            Magnitsky, AGOA eligibility, correspondent-bank de-risking, and the new
            Russia–Iran helper authorities are what move money.
          </p>
          <p>
            Pretoria’s defiance on BEE and expropriation keeps the political file open.
            A first nil-compensation taking of a working farm, or a named visa list that
            includes cabinet and the ANC SG, is how that file becomes designations.
          </p>
          <p>
            The military file is the accelerant. Another AIS-dark Russian or Iranian
            merchant at Simon’s Town, a Denel/Armscor counterparty in the war, or a
            nuclear-sounding MoU with Tehran or Rosatom would collapse the remaining
            hesitation in Treasury and on the Hill. Will for Peace 2026 already spent
            most of the benefit of the doubt.
          </p>
        </div>
      </article>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {HORIZONS.map((h) => (
          <button
            key={h.id}
            type="button"
            onClick={() => setHorizon(h.id)}
            className={cn(
              "h-11 shrink-0 rounded-full border px-3 text-sm",
              horizon === h.id
                ? "border-accent bg-accent text-accent-fg"
                : "border-border bg-surface text-muted",
            )}
          >
            {h.label}
          </button>
        ))}
      </div>

      <ul className="grid gap-3">
        {rows.map((i) => {
          const on = checked.includes(i.id);
          const pin = pinned.includes(i.id);
          return (
            <li key={i.id} className="rounded-xl border border-border bg-surface p-4 sm:p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <SeverityPill value={i.severity} />
                  <span className="font-mono text-micro uppercase tracking-wider text-subtle">
                    {i.horizon} · {i.channel}
                  </span>
                </div>
                <div className="flex shrink-0 gap-1">
                  <button
                    type="button"
                    onClick={() => togglePinned(i.id)}
                    className={cn(
                      "inline-flex size-11 items-center justify-center rounded-md border border-border",
                      pin ? "text-watch" : "text-subtle",
                    )}
                    aria-pressed={pin}
                    aria-label={pin ? "Unpin" : "Pin to desk"}
                  >
                    <Pin className="size-4" strokeWidth={1.75} />
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleChecked(i.id)}
                    className={cn(
                      "inline-flex size-11 items-center justify-center rounded-md border border-border",
                      on ? "text-steady" : "text-subtle",
                    )}
                    aria-pressed={on}
                    aria-label={on ? "Mark unwatched" : "Mark as watching"}
                  >
                    <Check className="size-4" strokeWidth={1.75} />
                  </button>
                </div>
              </div>
              <h3 className="mt-3 text-base font-medium leading-snug sm:text-lg">{i.title}</h3>
              <p className="mt-2 text-sm leading-normal text-muted">{i.why}</p>
              <dl className="mt-4 grid gap-3 sm:grid-cols-2">
                <div>
                  <dt className="font-mono text-micro uppercase tracking-wider text-subtle">
                    Now
                  </dt>
                  <dd className="mt-1 text-sm text-fg">{i.current}</dd>
                </div>
                <div>
                  <dt className="font-mono text-micro uppercase tracking-wider text-subtle">
                    Next trigger
                  </dt>
                  <dd className="mt-1 text-sm text-fg">{i.nextTrigger}</dd>
                </div>
              </dl>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
