import { cn } from "@/lib/utils";
import { LADDER } from "@/data";

const STATUS: Record<(typeof LADDER)[number]["status"], string> = {
  done: "Complete",
  current: "Now",
  next: "Next",
  watch: "Watch",
  tail: "Tail",
};

export function EscalationLadder() {
  return (
    <ol className="grid gap-2">
      {LADDER.map((rung, i) => (
        <li
          key={rung.step}
          className={cn(
            "grid grid-cols-[auto_1fr] gap-3 rounded-lg border px-3 py-3 sm:px-4",
            rung.status === "current"
              ? "border-signal/40 bg-signal/10"
              : "border-border bg-surface",
          )}
        >
          <span
            className={cn(
              "font-mono text-micro tabular-nums pt-0.5",
              rung.status === "current" ? "text-signal" : "text-subtle",
            )}
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <div>
            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
              <p className="text-sm font-medium">{rung.label}</p>
              <span
                className={cn(
                  "font-mono text-micro uppercase tracking-wider",
                  rung.status === "current"
                    ? "text-signal"
                    : rung.status === "done"
                      ? "text-steady"
                      : "text-subtle",
                )}
              >
                {STATUS[rung.status]}
              </span>
            </div>
            <p className="mt-1 text-sm text-muted leading-normal">{rung.detail}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
