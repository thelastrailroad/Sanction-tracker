import { EVENTS } from "../data/events";
import type { DeskEvent, EventKind, Severity } from "../data/types";

export type Impulse = {
  id: string;
  date: string;
  title: string;
  pressure: number;
  financial: number;
  persist: number;
  halfLifeDays: number;
};

export type CsiPoint = {
  date: string;
  pressure: number;
  financial: number;
  csi: number;
  headlines: string[];
};

export type CsiContributor = {
  id: string;
  date: string;
  title: string;
  pressure: number;
  financial: number;
  csi: number;
};

export type CsiPrint = {
  asOf: string;
  csi: number;
  pressure: number;
  financial: number;
  delta1: number;
  delta30: number;
  contributors: CsiContributor[];
};

const SEV_W: Record<Severity, number> = {
  critical: 16,
  high: 10,
  elevated: 6,
  watch: 2.5,
  low: 1,
};

const KIND_SPEC: Record<
  EventKind,
  { p: number; f: number; persist: number; hl: number }
> = {
  "us-action": { p: 1.2, f: 0.42, persist: 0.74, hl: 280 },
  military: { p: 1.08, f: 0.78, persist: 0.34, hl: 170 },
  congress: { p: 0.52, f: 1.18, persist: 0.44, hl: 220 },
  aid: { p: 0.98, f: 0.36, persist: 0.7, hl: 250 },
  trade: { p: 0.42, f: 1.08, persist: 0.56, hl: 200 },
  diplomatic: { p: 0.78, f: 0.24, persist: 0.12, hl: 48 },
  "sa-response": { p: 0.72, f: 0.18, persist: 0.2, hl: 42 },
};

/** Relief: score falls. Persist 0 so the dip fades as reviews reopen. */
const RELIEF = new Set(["e-2026-09-02-agoa", "e-2026-04-meyer"]);

const OVERRIDES: Record<
  string,
  Partial<Pick<Impulse, "pressure" | "financial" | "persist" | "halfLifeDays">>
> = {
  "e-2022-12-ladyr": { pressure: 11, financial: 6, persist: 0.35, halfLifeDays: 400 },
  "e-2023-02-mosi": { pressure: 8, financial: 2, persist: 0.25, halfLifeDays: 180 },
  "e-2023-05-brigety": { pressure: 11, financial: 5, persist: 0.4, halfLifeDays: 500 },
  "e-2023-12-icj": { pressure: 8, financial: 1, persist: 0.7, halfLifeDays: 240 },
  "e-2024-exprop": { pressure: 11, financial: 3, persist: 0.72, halfLifeDays: 300 },
  "e-2025-02-eo": { pressure: 18, financial: 7, persist: 0.8, halfLifeDays: 400 },
  "e-2025-03-rasool": { pressure: 8, financial: 1, persist: 0.15, halfLifeDays: 60 },
  "e-2025-04-hr2633": { pressure: 4, financial: 8, persist: 0.38, halfLifeDays: 240 },
  "e-2025-05-whitehouse": { pressure: 5, financial: 1, persist: 0.08, halfLifeDays: 50 },
  "e-2025-08-12-iran-military": { pressure: 15, financial: 6, persist: 0.32, halfLifeDays: 200 },
  "e-2025-09-s2752": { pressure: 5, financial: 10, persist: 0.38, halfLifeDays: 240 },
  "e-2025-11-g20-boycott": { pressure: 9, financial: 2, persist: 0.2, halfLifeDays: 80 },
  "e-2025-12-g20": { pressure: 11, financial: 2, persist: 0.7, halfLifeDays: 280 },
  "e-2026-01-wfp": { pressure: 17, financial: 8, persist: 0.32, halfLifeDays: 180 },
  "e-2026-04-meyer": { pressure: -4, financial: -1, persist: 0, halfLifeDays: 70 },
  "e-2026-05-21-refugee": { pressure: 6, financial: 1, persist: 0.55, halfLifeDays: 200 },
  "e-2026-06-pepfar": { pressure: 9, financial: 2, persist: 0.68, halfLifeDays: 240 },
  "e-2026-07-24-301": { pressure: 5, financial: 8, persist: 0.55, halfLifeDays: 200 },
  "e-2026-09-02-agoa": { pressure: -5, financial: -8, persist: 0, halfLifeDays: 90 },
  "e-2026-09-02-denel": { pressure: 9, financial: 5, persist: 0.22, halfLifeDays: 90 },
  "e-2026-09-13-pezeshkian": { pressure: 8, financial: 4, persist: 0.12, halfLifeDays: 55 },
  "e-2026-09-16-visa": { pressure: 18, financial: 4, persist: 0.78, halfLifeDays: 320 },
  "e-2026-09-16-bozell": { pressure: 8, financial: 5, persist: 0.15, halfLifeDays: 45 },
  "e-2026-09-16-graham": { pressure: 5, financial: 11, persist: 0.36, halfLifeDays: 200 },
  "e-2026-09-17-lamola": { pressure: 6, financial: 1, persist: 0.08, halfLifeDays: 35 },
};

export function addDays(iso: string, days: number): string {
  const d = new Date(`${iso}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

export function daysBetween(from: string, to: string): number {
  const a = Date.parse(`${from}T12:00:00Z`);
  const b = Date.parse(`${to}T12:00:00Z`);
  return Math.max(0, Math.round((b - a) / 86_400_000));
}

function remaining(impulse: number, persist: number, halfLife: number, days: number): number {
  const floor = impulse * persist;
  const transient = impulse - floor;
  if (days <= 0) return impulse;
  return floor + transient * 2 ** (-days / halfLife);
}

export function impulseFor(event: DeskEvent): Impulse {
  const spec = KIND_SPEC[event.kind];
  const base = SEV_W[event.severity];
  const flagged = event.flagged ? 1.15 : 1;
  const financeChannel = event.channels.includes("financial") ? 1.2 : 1;
  const sign = RELIEF.has(event.id) ? -1 : 1;
  const computed: Impulse = {
    id: event.id,
    date: event.date,
    title: event.title,
    pressure: sign * base * spec.p * flagged,
    financial: sign * base * spec.f * flagged * financeChannel,
    persist: RELIEF.has(event.id) ? 0 : spec.persist,
    halfLifeDays: spec.hl,
  };
  const over = OVERRIDES[event.id];
  return over ? { ...computed, ...over } : computed;
}

/** Maps stacked shocks onto 0–100 without blowing past the ceiling. */
export function squash(raw: number): number {
  if (raw <= 0) return 0;
  return Math.round(100 * (1 - Math.exp(-raw / 100)));
}

export function blend(pressure: number, financial: number): number {
  return Math.round(0.62 * pressure + 0.38 * financial);
}

export function impulsesFrom(events: DeskEvent[] = EVENTS): Impulse[] {
  return events.map(impulseFor);
}

function rawAt(asOf: string, impulses: Impulse[]): { pressure: number; financial: number } {
  let pressure = 0;
  let financial = 0;
  for (const i of impulses) {
    if (i.date > asOf) continue;
    const d = daysBetween(i.date, asOf);
    pressure += remaining(i.pressure, i.persist, i.halfLifeDays, d);
    financial += remaining(i.financial, i.persist, i.halfLifeDays, d);
  }
  return { pressure, financial };
}

export function scoreAt(asOf: string, events: DeskEvent[] = EVENTS) {
  const raw = rawAt(asOf, impulsesFrom(events));
  const pressure = squash(raw.pressure);
  const financial = squash(raw.financial);
  return {
    pressure,
    financial,
    csi: blend(pressure, financial),
    raw,
  };
}

export function contributorsAt(
  asOf: string,
  events: DeskEvent[] = EVENTS,
): CsiContributor[] {
  return impulsesFrom(events)
    .filter((i) => i.date <= asOf)
    .map((i) => {
      const d = daysBetween(i.date, asOf);
      const pressure = remaining(i.pressure, i.persist, i.halfLifeDays, d);
      const financial = remaining(i.financial, i.persist, i.halfLifeDays, d);
      return {
        id: i.id,
        date: i.date,
        title: i.title,
        pressure,
        financial,
        csi: 0.62 * pressure + 0.38 * financial,
      };
    })
    .filter((c) => Math.abs(c.csi) >= 0.45)
    .sort((a, b) => Math.abs(b.csi) - Math.abs(a.csi));
}

export function printAt(asOf: string, events: DeskEvent[] = EVENTS): CsiPrint {
  const today = scoreAt(asOf, events);
  const y1 = scoreAt(addDays(asOf, -1), events);
  const y30 = scoreAt(addDays(asOf, -30), events);
  return {
    asOf,
    csi: today.csi,
    pressure: today.pressure,
    financial: today.financial,
    delta1: today.csi - y1.csi,
    delta30: today.csi - y30.csi,
    contributors: contributorsAt(asOf, events).slice(0, 8),
  };
}

export function buildSeries(
  from: string,
  to: string,
  stepDays: number,
  events: DeskEvent[] = EVENTS,
): CsiPoint[] {
  const byDate = new Map<string, string[]>();
  for (const e of events) {
    if (e.date < from || e.date > to) continue;
    const list = byDate.get(e.date) ?? [];
    list.push(e.title);
    byDate.set(e.date, list);
  }

  const dates = new Set<string>();
  for (let d = from; d <= to; d = addDays(d, stepDays)) dates.add(d);
  dates.add(to);
  for (const e of events) {
    if (e.date >= from && e.date <= to) dates.add(e.date);
  }

  return [...dates]
    .sort()
    .map((date) => {
      const s = scoreAt(date, events);
      return {
        date,
        pressure: s.pressure,
        financial: s.financial,
        csi: s.csi,
        headlines: byDate.get(date) ?? [],
      };
    });
}
