import { cn } from "@/lib/utils";
import type { Severity } from "@/data/types";

const LABEL: Record<Severity, string> = {
  critical: "Critical",
  high: "High",
  elevated: "Elevated",
  watch: "Watch",
  low: "Low",
};

const TONE: Record<Severity, string> = {
  critical: "text-signal border-signal/40 bg-signal/10",
  high: "text-signal border-signal/30 bg-signal/10",
  elevated: "text-watch border-watch/35 bg-watch/10",
  watch: "text-info border-info/30 bg-info/10",
  low: "text-steady border-steady/30 bg-steady/10",
};

export function SeverityPill({
  value,
  className,
}: {
  value: Severity;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2 py-0.5 text-micro font-medium uppercase tracking-wider",
        TONE[value],
        className,
      )}
    >
      {LABEL[value]}
    </span>
  );
}

export function severityLabel(value: Severity) {
  return LABEL[value];
}
