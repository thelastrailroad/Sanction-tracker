import type { MilitaryThread } from "./types";

export const MILITARY_THREADS: MilitaryThread[] = [
  {
    id: "china",
    partner: "China",
    posture: "Lead navy at Will for Peace 2026. PLAN is now the default extra-regional partner at Simon’s Town.",
    risk: "high",
    items: [
      {
        date: "2026-01-09",
        title: "PLAN Type 052DL Tangshan (122) + oiler Taihu (889)",
        detail:
          "China led the BRICS Plus exercise from Simon’s Town. Official theme: maritime safety and anti-piracy. Serials included maritime strike and counter-terror rescue — not a cocktail-party PASSEX.",
      },
      {
        date: "2023-02-24",
        title: "Mosi II trilateral",
        detail:
          "With Russia, timed to the first anniversary of the full-scale Ukraine invasion. The date is what congressional findings quote.",
      },
      {
        date: "2019-11-01",
        title: "Mosi I",
        detail: "First China–Russia–SA naval exercise. The series is now a habit, not a one-off.",
      },
    ],
  },
  {
    id: "russia",
    partner: "Russia",
    posture: "From a deniable cargo call (Lady R) to a named Baltic Fleet unit in a public drill. The arms-transfer allegation is unresolved and still live in US briefings.",
    risk: "critical",
    items: [
      {
        date: "2026-01-09",
        title: "Corvette Stoikiy (545) + oiler Yelnya",
        detail:
          "Baltic Fleet units in False Bay for Will for Peace. A sanctioned state’s warship on the same quay as the SAN, in public, after Lady R.",
      },
      {
        date: "2023-05-11",
        title: "Brigety accusation",
        detail:
          "US ambassador said weapons were loaded onto Lady R in December 2022. Pretoria denied; a domestic inquiry did not close the file for Washington.",
      },
      {
        date: "2022-12-06",
        title: "Lady R at Simon’s Town",
        detail:
          "Sanctioned cargo ship, AIS off, night docking at a National Key Point. Template for a secondary-sanctions event if it happens again.",
      },
    ],
  },
  {
    id: "iran",
    partner: "Iran",
    posture: "New in 2026: IRIN and IRGC-N hulls in a SAN-hosted drill. EO 14204 already alleged commercial, military, and nuclear arrangements. This is the military half becoming visible.",
    risk: "high",
    items: [
      {
        date: "2026-01-09",
        title: "IRIS Makran, Naghdi, Shahid Mahdavi",
        detail:
          "Expeditionary sea base plus IRGC-N unit in False Bay. China and SA communiqués were shy about naming Iran; the hulls were not.",
      },
      {
        date: "2026-06-18",
        title: "DIRCO welcomes US–Iran MoU, then hosts Tehran",
        detail:
          "Lamola welcomed a ceasefire memorandum and later received Iranian diplomats. Even-handed on paper; on the Hill it reads as Iran-friendly after a joint drill.",
      },
      {
        date: "2025-08-12",
        title: "SANDF chief in Tehran",
        detail:
          "General Maphwanya toured Iranian military schools and met the armed-forces chief, army commander and defence minister. IRGC offered to share experience. Ramaphosa said he did not know. The military-to-military file starts here.",
      },
      {
        date: "2025-02-07",
        title: "Named in EO 14204",
        detail:
          "White House text: South Africa is ‘reinvigorating its relations with Iran to develop commercial, military, and nuclear arrangements.’ Any Necsa/Pelindaba or Denel touch becomes a crisis.",
      },
    ],
  },
];

export const HULLS_2026 = [
  { flag: "China", hull: "CNS Tangshan (122)", class: "Type 052DL destroyer" },
  { flag: "China", hull: "CNS Taihu (889)", class: "Fleet oiler" },
  { flag: "Russia", hull: "RFS Stoikiy (545)", class: "Steregushchiy corvette" },
  { flag: "Russia", hull: "Yelnya", class: "Replenishment" },
  { flag: "Iran", hull: "IRIS Makran (441)", class: "Expeditionary sea base" },
  { flag: "Iran", hull: "IRIS Naghdi (82)", class: "Corvette" },
  { flag: "Iran", hull: "IRIS Shahid Mahdavi (L110-3)", class: "IRGC-N sea base" },
];

export const MILITARY_READ = [
  "India and Brazil did not send hulls. When core BRICS members sit a ‘BRICS’ drill out, it is a China–Russia–Iran–SA event with a marketing name.",
  "SANDF has largely stopped exercising with the US, UK, and France. That is a choice, and Washington scores it as one.",
  "A cargo operation is different from a PASSEX. The next AIS-dark Russian or Iranian merchant at Simon’s Town is the financial-sanctions fuse, not another photo-op.",
  "Nuclear is the quiet clause. EO 14204 already wrote it down. Watch Necsa, Pelindaba visitors, and any ‘peaceful nuclear’ MoU with Rosatom or AEOI.",
];
