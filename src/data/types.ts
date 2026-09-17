export type Severity = "critical" | "high" | "elevated" | "watch" | "low";
export type EventKind =
  | "us-action"
  | "congress"
  | "sa-response"
  | "military"
  | "trade"
  | "aid"
  | "diplomatic";
export type Channel = "visa" | "aid" | "trade" | "financial" | "military" | "diplomatic" | "domestic";
export type Horizon = "immediate" | "near" | "structural";
export type Actor = "US" | "SA" | "CN" | "RU" | "IR" | "BRICS" | "other";

export type DeskEvent = {
  id: string;
  date: string;
  title: string;
  summary: string;
  kind: EventKind;
  severity: Severity;
  channels: Channel[];
  actors: Actor[];
  source: string;
  sourceUrl: string;
  flagged?: boolean;
};

export type Bill = {
  id: string;
  chamber: "House" | "Senate";
  number: string;
  title: string;
  sponsor: string;
  introduced: string;
  status: string;
  statusStep: 1 | 2 | 3 | 4 | 5;
  summary: string;
  sanctionsHook: string;
  congressUrl: string;
  live: boolean;
};

export type Indicator = {
  id: string;
  title: string;
  why: string;
  current: string;
  nextTrigger: string;
  horizon: Horizon;
  severity: Severity;
  channel: Channel;
  lastUpdate: string;
  sources: string[];
};

export type MilitaryThread = {
  id: string;
  partner: "China" | "Russia" | "Iran";
  posture: string;
  risk: Severity;
  items: { date: string; title: string; detail: string }[];
};

export type Sector = {
  id: string;
  name: string;
  exposure: string;
  usLeverage: string;
  risk: Severity;
  notes: string;
};

export type RiskFactor = {
  id: string;
  label: string;
  weight: number;
  score: number;
  note: string;
};

export type SourceLink = {
  id: string;
  name: string;
  org: string;
  why: string;
  url: string;
  kind: "primary" | "official" | "press";
};
