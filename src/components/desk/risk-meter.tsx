import { cn } from "@/lib/utils";
import { bandFor, type Severity } from "@/data";
import { SeverityPill } from "./severity";

export function RiskMeter({
  label,
  score,
  blurb,
  emphasis,
}: {
  label: string;
  score: number;
  blurb: string;
  emphasis?: boolean;
}) {
  const band: Severity = bandFor(score);
  const filled = Math.max(0, Math.min(10, Math.round(score / 10)));

  return (
    <article
      className={cn(
        "rounded-xl border border-border bg-surface p-5 sm:p-6",
        emphasis && "border-border-strong",
      )}
    >
      <p className="font-mono text-micro uppercase tracking-[0.18em] text-subtle">
        {label}
      </p>
      <div className="mt-3 flex items-end justify-between gap-4">
        <p className="font-display text-4xl leading-none tracking-tight tabular-nums">
          {score}
        </p>
        <SeverityPill value={band} />
      </div>
      <div className="mt-5 flex gap-1" aria-hidden="true">
        {Array.from({ length: 10 }, (_, i) => (
          <span
            key={i}
            className={cn(
              "h-2 flex-1 rounded-xs",
              i < filled
                ? band === "critical" || band === "high"
                  ? "bg-signal"
                  : band === "elevated"
                    ? "bg-watch"
                    : "bg-info"
                : "bg-elevated",
            )}
          />
        ))}
      </div>
      <p className="mt-4 text-sm leading-normal text-muted">{blurb}</p>
    </article>
  );
}
