import type { RiskFactor, Severity } from "./types";

export const DESK_AS_OF = "2026-09-17";
export const DESK_CLASSIFICATION = "OPEN SOURCE";

export const PRESSURE_FACTORS: RiskFactor[] = [
  {
    id: "visa",
    label: "Visa restrictions (INA 212(a)(3)(C))",
    weight: 16,
    score: 88,
    note: "Active as of 16 Sep 2026. Names unpublished. Ambassador called it the first of escalatory steps.",
  },
  {
    id: "aid",
    label: "EO 14204 aid freeze + PEPFAR drawdown",
    weight: 12,
    score: 92,
    note: "Aid halt ordered Feb 2025. HIV programme being phased down; Afrikaner refugee track expanded.",
  },
  {
    id: "g20",
    label: "G20 exclusion under US presidency",
    weight: 8,
    score: 84,
    note: "South Africa frozen out of 2026 US-hosted G20 cycle after Trump boycotted Johannesburg 2025.",
  },
  {
    id: "agoa",
    label: "AGOA eligibility / preference risk",
    weight: 14,
    score: 58,
    note: "Programme extended to Dec 2028, but SA-specific exclusion bills remain live and USTR called SA a unique problem.",
  },
  {
    id: "magnitsky",
    label: "Global Magnitsky / ANC list bills",
    weight: 12,
    score: 46,
    note: "H.R.2633 and S.2752 require a classified list of officials. Introduced, not advanced. Visa tool is a partial substitute.",
  },
  {
    id: "military",
    label: "Military alignment with CN / RU / IR",
    weight: 18,
    score: 79,
    note: "Will for Peace 2026 hosted PLAN, Baltic Fleet, and IRGC/IRIN hulls at Simon's Town. Western drills have largely stopped.",
  },
  {
    id: "domestic",
    label: "BEE, Expropriation Act, incitement",
    weight: 12,
    score: 74,
    note: "The stated predicate for EO 14204 and the visa policy. Pretoria will not unwind; Lamola called it sovereignty.",
  },
  {
    id: "icj",
    label: "ICJ case against Israel",
    weight: 8,
    score: 62,
    note: "Named in EO 14204. DIRCO says the case will not be dropped even if Washington waives restrictions.",
  },
];

export const FINANCIAL_FACTORS: RiskFactor[] = [
  {
    id: "targeted-sdn",
    label: "Targeted Magnitsky / SDN of officials",
    weight: 28,
    score: 52,
    note: "Most probable financial tool. Visa policy does not freeze assets; Magnitsky would.",
  },
  {
    id: "agoa-finance",
    label: "AGOA loss (auto, citrus, wine, steel)",
    weight: 22,
    score: 48,
    note: "Trade preference, not a classic OFAC programme, but the largest near-term cash hit to exporters.",
  },
  {
    id: "secondary",
    label: "Secondary sanctions (Russia / Iran helper)",
    weight: 20,
    score: 41,
    note: "Graham Russia–Iran package (Sep 2026) authorises tariffs on countries helping Moscow evade. Lady R-class events would light this fuse.",
  },
  {
    id: "corr-bank",
    label: "Correspondent banking de-risking",
    weight: 16,
    score: 28,
    note: "Private-sector, not OFAC. Watch dollar clearing for SOEs and dual-use traders if designations land.",
  },
  {
    id: "soe",
    label: "SOE / minerals sectoral listing",
    weight: 14,
    score: 18,
    note: "Country-wide financial isolation of a G20 economy is still a tail risk. Platinum, chrome, manganese complicate it.",
  },
];

function weighted(factors: RiskFactor[]): number {
  const w = factors.reduce((s, f) => s + f.weight, 0);
  return Math.round(factors.reduce((s, f) => s + f.score * f.weight, 0) / w);
}

export const PRESSURE_SCORE = weighted(PRESSURE_FACTORS);
export const FINANCIAL_SCORE = weighted(FINANCIAL_FACTORS);

export function bandFor(score: number): Severity {
  if (score >= 80) return "critical";
  if (score >= 65) return "high";
  if (score >= 45) return "elevated";
  if (score >= 25) return "watch";
  return "low";
}

export const PRESSURE_BAND = bandFor(PRESSURE_SCORE);
export const FINANCIAL_BAND = bandFor(FINANCIAL_SCORE);

export const LADDER = [
  {
    step: 1,
    label: "Public pressure",
    status: "done" as const,
    detail: "EO 14204, embassy messaging, Oval Office confrontation May 2025.",
  },
  {
    step: 2,
    label: "Aid cutoff",
    status: "done" as const,
    detail: "USAID halt; PEPFAR phased drawdown of ~$400m/year HIV support.",
  },
  {
    step: 3,
    label: "Forum exclusion",
    status: "done" as const,
    detail: "Barred from 2026 US G20 cycle; Pretoria suspended G20 work until UK 2027 presidency.",
  },
  {
    step: 4,
    label: "Targeted visas",
    status: "current" as const,
    detail: "INA 212(a)(3)(C) policy, 16 Sep 2026. Unpublished list; family members may be covered.",
  },
  {
    step: 5,
    label: "AGOA eligibility cut",
    status: "next" as const,
    detail: "Annual review due around Oct 2026. Senate/House review bills would force a harder landing.",
  },
  {
    step: 6,
    label: "Magnitsky designations",
    status: "watch" as const,
    detail: "Asset freeze + US-person prohibition on named ANC/state officials. The actual financial step.",
  },
  {
    step: 7,
    label: "Secondary / helper sanctions",
    status: "watch" as const,
    detail: "If Pretoria is found to help Russia or Iran evade — port calls, dual-use, shadow fleet, oil.",
  },
  {
    step: 8,
    label: "Sectoral / SOE SDN",
    status: "tail" as const,
    detail: "Armscor, Denel, Transnet, IDC, or minerals offtakers. Still politically expensive for Washington.",
  },
];

export const RISK_HISTORY = [
  { date: "2022-12", label: "Lady R", pressure: 32, financial: 14 },
  { date: "2023-02", label: "Mosi II", pressure: 38, financial: 16 },
  { date: "2023-05", label: "Brigety", pressure: 44, financial: 20 },
  { date: "2023-12", label: "ICJ filing", pressure: 48, financial: 22 },
  { date: "2024-12", label: "Expropriation Act", pressure: 52, financial: 24 },
  { date: "2025-02", label: "EO 14204", pressure: 64, financial: 30 },
  { date: "2025-03", label: "Rasool expelled", pressure: 66, financial: 31 },
  { date: "2025-09", label: "Review bills", pressure: 68, financial: 36 },
  { date: "2025-11", label: "G20 boycott", pressure: 70, financial: 38 },
  { date: "2026-01", label: "Will for Peace", pressure: 74, financial: 42 },
  { date: "2026-07", label: "12.5% tariff", pressure: 72, financial: 40 },
  { date: "2026-09", label: "Visa policy", pressure: PRESSURE_SCORE, financial: FINANCIAL_SCORE },
];

export const FLASH = {
  date: "2026-09-16",
  kicker: "Active measure",
  title: "State Department visa restrictions on South African policymakers",
  body: "Secretary Rubio invoked INA 212(a)(3)(C) against foreign nationals responsible for, or complicit in, uncompensated land seizures, race-based discrimination, or incitement of imminent violence against minorities. No names published. US Ambassador Bozell: this is only the first step in a series of escalatory measures. DIRCO’s Ronald Lamola rejected the premise and called for respect of sovereignty. Ambassador Roelf Meyer is seeking talks.",
  urls: [
    {
      label: "State Department",
      href: "https://www.state.gov/releases/office-of-the-spokesman/2026/09/announcement-of-new-visa-restriction-policy-targeting-foreign-nationals-involved-in-race-based-discrimination",
    },
    {
      label: "EO 14204",
      href: "https://www.presidency.ucsb.edu/documents/executive-order-14204-addressing-egregious-actions-the-republic-south-africa",
    },
  ],
};
