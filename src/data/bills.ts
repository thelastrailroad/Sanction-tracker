import type { Bill } from "./types";

export const BILLS: Bill[] = [
  {
    id: "hr2633",
    chamber: "House",
    number: "H.R.2633",
    title: "U.S.–South Africa Bilateral Relations Review Act of 2025",
    sponsor: "Rep. Ronnie Jackson (R-TX)",
    introduced: "2025-04-03",
    status: "Introduced — referred, no markup",
    statusStep: 1,
    summary:
      "Directs a full review of the bilateral relationship and a classified report listing senior South African government officials and ANC leaders who meet Global Magnitsky criteria (corruption or human rights abuse). Findings argue ANC factions are not non-aligned and have aligned with US adversaries.",
    sanctionsHook:
      "The live financial-sanctions vehicle. If it ever moves, expect named SDN/visa packages against ANC officials rather than a country embargo.",
    congressUrl: "https://www.congress.gov/bill/119th-congress/house-bill/2633",
    live: true,
  },
  {
    id: "s2752",
    chamber: "Senate",
    number: "S.2752",
    title: "U.S.–South Africa Bilateral Relations Review Act",
    sponsor: "Sen. John Kennedy (R-LA)",
    introduced: "2025-09-10",
    status: "Introduced — Senate Foreign Relations",
    statusStep: 1,
    summary:
      "120-day presidential review and an unclassified certification on whether South Africa undermines US national security. Classified Magnitsky annex. If the President certifies in the affirmative, AGOA and specified Trade Act beneficiary status terminate.",
    sanctionsHook:
      "Harder than the House twin: automatic AGOA kill-switch plus Magnitsky list. Watch for a rider on a must-pass bill, not a standalone floor fight.",
    congressUrl: "https://www.congress.gov/bill/119th-congress/senate-bill/2752",
    live: true,
  },
  {
    id: "s2958",
    chamber: "Senate",
    number: "S.2958",
    title: "AGOA Extension and Bilateral Engagement Act of 2025",
    sponsor: "Sen. John Kennedy (R-LA)",
    introduced: "2025-09-30",
    status: "Introduced — Senate Finance (superseded in practice by 2028 extension)",
    statusStep: 1,
    summary:
      "Would have extended AGOA and required a full US–SA bilateral review, including a Magnitsky-eligible officials list. The clean 2028 extension that actually became law did not carry this review language.",
    sanctionsHook:
      "Shows the preferred legislative tactic: bolt a South Africa review onto AGOA. Next AGOA vehicle is the place to watch for a poison pill.",
    congressUrl: "https://www.congress.gov/bill/119th-congress/senate-bill/2958",
    live: true,
  },
];

export const CONGRESS_WATCH = [
  {
    id: "agoa-review",
    title: "AGOA annual eligibility review",
    when: "Expected ~October 2026",
    why: "USTR must publish an updated beneficiary list. A SA drop can happen by executive determination without the Kennedy/Jackson bills moving.",
  },
  {
    id: "graham-impl",
    title: "Graham Russia–Iran Act implementation",
    when: "On signature, then 90–180 days",
    why: "Secondary-sanctions and 100% tariff authorities against countries that help Moscow evade. Port, dual-use, and shadow-fleet facts become expensive.",
  },
  {
    id: "hearings",
    title: "HFAC / SFRC hearings on Africa policy",
    when: "Any markup week",
    why: "A hearing with AfriForum, former US ambassadors, or USTR is how review bills get oxygen. Witness lists are the tell.",
  },
  {
    id: "midterms",
    title: "November 2026 US midterms",
    when: "2026-11-03",
    why: "A thinner Republican majority makes Magnitsky-by-rider harder; a larger one makes AGOA conditionality easier. Either way the executive tools remain.",
  },
];
