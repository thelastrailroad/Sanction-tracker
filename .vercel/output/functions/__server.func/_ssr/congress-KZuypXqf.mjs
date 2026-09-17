import { n as formatDeskDate } from "./utils-D1SGvVSi.mjs";
import { B as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/congress-KZuypXqf.js
var import_jsx_runtime = require_jsx_runtime();
var BILLS = [
	{
		id: "hr2633",
		chamber: "House",
		number: "H.R.2633",
		title: "U.S.–South Africa Bilateral Relations Review Act of 2025",
		sponsor: "Rep. Ronnie Jackson (R-TX)",
		introduced: "2025-04-03",
		status: "Introduced — referred, no markup",
		statusStep: 1,
		summary: "Directs a full review of the bilateral relationship and a classified report listing senior South African government officials and ANC leaders who meet Global Magnitsky criteria (corruption or human rights abuse). Findings argue ANC factions are not non-aligned and have aligned with US adversaries.",
		sanctionsHook: "The live financial-sanctions vehicle. If it ever moves, expect named SDN/visa packages against ANC officials rather than a country embargo.",
		congressUrl: "https://www.congress.gov/bill/119th-congress/house-bill/2633",
		live: true
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
		summary: "120-day presidential review and an unclassified certification on whether South Africa undermines US national security. Classified Magnitsky annex. If the President certifies in the affirmative, AGOA and specified Trade Act beneficiary status terminate.",
		sanctionsHook: "Harder than the House twin: automatic AGOA kill-switch plus Magnitsky list. Watch for a rider on a must-pass bill, not a standalone floor fight.",
		congressUrl: "https://www.congress.gov/bill/119th-congress/senate-bill/2752",
		live: true
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
		summary: "Would have extended AGOA and required a full US–SA bilateral review, including a Magnitsky-eligible officials list. The clean 2028 extension that actually became law did not carry this review language.",
		sanctionsHook: "Shows the preferred legislative tactic: bolt a South Africa review onto AGOA. Next AGOA vehicle is the place to watch for a poison pill.",
		congressUrl: "https://www.congress.gov/bill/119th-congress/senate-bill/2958",
		live: true
	}
];
var CONGRESS_WATCH = [
	{
		id: "agoa-review",
		title: "AGOA annual eligibility review",
		when: "Expected ~October 2026",
		why: "USTR must publish an updated beneficiary list. A SA drop can happen by executive determination without the Kennedy/Jackson bills moving."
	},
	{
		id: "graham-impl",
		title: "Graham Russia–Iran Act implementation",
		when: "On signature, then 90–180 days",
		why: "Secondary-sanctions and 100% tariff authorities against countries that help Moscow evade. Port, dual-use, and shadow-fleet facts become expensive."
	},
	{
		id: "hearings",
		title: "HFAC / SFRC hearings on Africa policy",
		when: "Any markup week",
		why: "A hearing with AfriForum, former US ambassadors, or USTR is how review bills get oxygen. Witness lists are the tell."
	},
	{
		id: "midterms",
		title: "November 2026 US midterms",
		when: "2026-11-03",
		why: "A thinner Republican majority makes Magnitsky-by-rider harder; a larger one makes AGOA conditionality easier. Either way the executive tools remain."
	}
];
var STEPS = [
	"Introduced",
	"Committee",
	"Floor",
	"Conference",
	"Law"
];
function CongressPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-micro uppercase tracking-[0.18em] text-subtle",
					children: "119th Congress"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-3xl tracking-tight",
					children: "Legislative track"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-2xl text-sm text-muted",
					children: "The review bills have not moved. That is not comfort. The executive already used visa, aid, and forum tools that do not need a statute. Watch riders on must-pass vehicles, not standalone floor fights."
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "grid gap-4",
				children: BILLS.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "rounded-xl border border-border bg-surface p-5 sm:p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-baseline justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-xs text-watch",
								children: b.number
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-mono text-micro text-subtle",
								children: [
									b.chamber,
									" · ",
									formatDeskDate(b.introduced)
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-2 font-display text-xl tracking-tight",
							children: b.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted",
							children: b.sponsor
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
							className: "mt-4 flex gap-1",
							"aria-label": "Bill status",
							children: STEPS.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
								className: "flex-1",
								title: s,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: i < b.statusStep ? "block h-1.5 rounded-full bg-watch" : "block h-1.5 rounded-full bg-elevated" })
							}, s))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 font-mono text-micro uppercase tracking-wider text-subtle",
							children: b.status
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm leading-normal text-muted",
							children: b.summary
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-3 border-t border-border pt-3 text-sm leading-normal",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-subtle",
								children: "Sanctions hook. "
							}), b.sanctionsHook]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: b.congressUrl,
							target: "_blank",
							rel: "noreferrer",
							className: "mt-4 inline-flex h-11 items-center text-sm text-accent underline-offset-4 hover:underline",
							children: "Open on Congress.gov"
						})
					]
				}, b.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display text-2xl tracking-tight",
				children: "Calendar tells"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 grid gap-3 sm:grid-cols-2",
				children: CONGRESS_WATCH.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "rounded-xl border border-border bg-surface p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-micro uppercase tracking-wider text-subtle",
							children: c.when
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm font-medium",
							children: c.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted",
							children: c.why
						})
					]
				}, c.id))
			})] })
		]
	});
}
//#endregion
export { CongressPage as component };
