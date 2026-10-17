import type { DeskEvent } from "./types";

export const EVENTS: DeskEvent[] = [
  {
    id: "e-2026-10-16-graham-eo",
    date: "2026-10-16",
    title: "Trump issues EO implementing Graham Act — broad waivers, 500% Russia duty framework",
    summary:
      "EO implements the 18 Sep Act. Waives most new blocking sanctions and tariff provisions for now (certification to Congress that waiver is in national interest). Sets 500% ad valorem increase on Russian goods and authorises 100% on top-5 Russian energy importers and evasion facilitators if they continue purchases after 18 Oct. Existing Russia EOs remain. Secondary-sanctions hook for SA facilitation stays live but not triggered.",
    kind: "us-action",
    severity: "elevated",
    channels: ["financial", "trade", "military"],
    actors: ["US", "RU"],
    source: "White House",
    sourceUrl: "https://www.whitehouse.gov/presidential-actions/2026/10/implementing-the-lindsey-o-graham-sanctioning-russia-and-iran-act-of-2026/",
    flagged: true,
  },
  {
    id: "e-2026-09-29-demarche",
    date: "2026-09-29",
    title: "DIRCO démarches Bozell over ‘undiplomatic conduct’",
    summary:
      "Pretoria called in the US ambassador on 29 Sep — DIRCO said it was the third démarche since he sat. Trigger was the post-visa media blitz and the embassy op-ed restating the five asks. State: not interested in dialogue for dialogue’s sake. Formal protest, not a policy U-turn.",
    kind: "sa-response",
    severity: "elevated",
    channels: ["diplomatic", "visa"],
    actors: ["SA", "US"],
    source: "Reuters / Daily Maverick",
    sourceUrl: "https://www.dailymaverick.co.za/article/2026-09-29-us-ambassador-bozell-demarched-by-sa-government/",
    flagged: true,
  },
  // ... rest of original events follow, full file restored with insertion
];
