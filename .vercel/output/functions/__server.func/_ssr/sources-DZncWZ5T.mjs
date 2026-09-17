import { i as __toESM } from "../_runtime.mjs";
import { n as formatDeskDate } from "./utils-D1SGvVSi.mjs";
import { B as require_jsx_runtime, z as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as getLiveSignals, t as Button } from "./button-BeRECo2T.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/sources-DZncWZ5T.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var SOURCES = [
	{
		id: "state-visa",
		name: "Visa restriction policy (16 Sep 2026)",
		org: "US Department of State",
		why: "Primary text of the INA 212(a)(3)(C) measure.",
		url: "https://www.state.gov/releases/office-of-the-spokesman/2026/09/announcement-of-new-visa-restriction-policy-targeting-foreign-nationals-involved-in-race-based-discrimination",
		kind: "primary"
	},
	{
		id: "eo14204",
		name: "Executive Order 14204",
		org: "White House",
		why: "The governing US policy: aid halt, Afrikaner resettlement, Iran/ICJ/land findings.",
		url: "https://www.presidency.ucsb.edu/documents/executive-order-14204-addressing-egregious-actions-the-republic-south-africa",
		kind: "primary"
	},
	{
		id: "hr2633",
		name: "H.R.2633",
		org: "Congress.gov",
		why: "House Magnitsky-list and bilateral review bill.",
		url: "https://www.congress.gov/bill/119th-congress/house-bill/2633",
		kind: "primary"
	},
	{
		id: "s2752",
		name: "S.2752",
		org: "Congress.gov",
		why: "Senate review bill with AGOA kill-switch.",
		url: "https://www.congress.gov/bill/119th-congress/senate-bill/2752",
		kind: "primary"
	},
	{
		id: "s2958",
		name: "S.2958",
		org: "Congress.gov",
		why: "AGOA extension vehicle that also asked for an SA review.",
		url: "https://www.congress.gov/bill/119th-congress/senate-bill/2958",
		kind: "primary"
	},
	{
		id: "crs-agoa",
		name: "CRS R49187 — AGOA",
		org: "Congressional Research Service",
		why: "Clean numbers on AGOA flows, 232/301 tariffs, SA as top beneficiary.",
		url: "https://www.congress.gov/crs-product/R49187",
		kind: "official"
	},
	{
		id: "fr",
		name: "Federal Register",
		org: "NARA",
		why: "EO publication, refugee determinations, future OFAC rules.",
		url: "https://www.federalregister.gov/documents/search?conditions%5Bterm%5D=South+Africa",
		kind: "primary"
	},
	{
		id: "ofac",
		name: "OFAC sanctions list search",
		org: "US Treasury",
		why: "Confirm whether a name is designated. Gupta/Essa already are.",
		url: "https://sanctionssearch.ofac.treas.gov/",
		kind: "official"
	},
	{
		id: "dirco",
		name: "DIRCO media",
		org: "Republic of South Africa",
		why: "Pretoria’s official line: sovereignty, ICJ, non-alignment.",
		url: "https://dirco.gov.za/",
		kind: "official"
	},
	{
		id: "embassy",
		name: "US Embassy South Africa",
		org: "State Department",
		why: "Bozell’s local escalation language.",
		url: "https://za.usembassy.gov/",
		kind: "official"
	},
	{
		id: "usni",
		name: "Will for Peace hull list",
		org: "USNI News",
		why: "Best public order of battle for the Jan 2026 drill.",
		url: "https://news.usni.org/2026/01/09/chinese-russian-iranian-warships-gather-near-south-africa-for-multilateral-drill",
		kind: "press"
	},
	{
		id: "reuters-drill",
		name: "BRICS Plus naval exercises",
		org: "Reuters",
		why: "Contemporaneous wire on China/Russia/Iran at Simon’s Town.",
		url: "https://www.reuters.com/world/china/china-russia-iran-start-brics-plus-naval-exercises-south-african-waters-2026-01-10/",
		kind: "press"
	},
	{
		id: "embassy-visa",
		name: "Embassy copy of the visa policy",
		org: "US Embassy Pretoria",
		why: "Local distribution of the 16 Sep Rubio announcement.",
		url: "https://za.usembassy.gov/announcement-of-new-visa-restriction-policy/",
		kind: "official"
	},
	{
		id: "meyer-news24",
		name: "Meyer on continued talks",
		org: "News24 / Briefly",
		why: "SA ambassador’s reply to Bozell’s ‘no more dialogue’ line.",
		url: "https://briefly.co.za/south-africa/253469-roelf-meyer-south-africa-seeks-continued-talks-visa-restrictions/",
		kind: "press"
	},
	{
		id: "maphwanya-iran",
		name: "SANDF chief in Tehran",
		org: "The Citizen",
		why: "Primary public account of Maphwanya’s August 2025 military visit to Iran.",
		url: "https://www.citizen.co.za/news/south-africa/sandf-chief-visits-iran-to-discuss-mutual-national-interests/",
		kind: "press"
	},
	{
		id: "denel-ramaphosa",
		name: "Ramaphosa at Denel",
		org: "DefenceWeb",
		why: "2 Sep 2026 tour of Aerospace, Land Systems and PMP ahead of AAD.",
		url: "https://defenceweb.co.za/industry/ramaphosa-visits-denel-facilities-making-good-on-an-aad-2024-commitment/",
		kind: "press"
	}
];
var MONITOR_QUERIES = [
	{
		label: "Congress — South Africa",
		url: "https://www.congress.gov/search?q=%7B%22congress%22%3A119%2C%22source%22%3A%22all%22%2C%22search%22%3A%22South+Africa%22%7D"
	},
	{
		label: "Federal Register — South Africa",
		url: "https://www.federalregister.gov/documents/search?conditions%5Bterm%5D=South+Africa"
	},
	{
		label: "OFAC recent actions",
		url: "https://ofac.treasury.gov/recent-actions"
	},
	{
		label: "DIRCO statements",
		url: "https://dirco.gov.za/"
	},
	{
		label: "State Department South Africa",
		url: "https://www.state.gov/countries-areas/south-africa/"
	},
	{
		label: "SANDF / defenceWeb",
		url: "https://www.defenceweb.co.za/"
	},
	{
		label: "US Embassy Pretoria",
		url: "https://za.usembassy.gov/"
	},
	{
		label: "U.S. Mission SA on X",
		url: "https://x.com/USEmbassySA"
	},
	{
		label: "SA Embassy Washington",
		url: "https://dirco.gov.za/washingtondc/"
	}
];
function SourcesPage() {
	const [data, setData] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(false);
	async function fetchLive() {
		setLoading(true);
		try {
			const bundle = await getLiveSignals();
			setData(bundle);
		} catch (err) {
			setData({
				fetchedAt: (/* @__PURE__ */ new Date()).toISOString(),
				register: [],
				error: err instanceof Error ? err.message : "Feed unavailable"
			});
		} finally {
			setLoading(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-micro uppercase tracking-[0.18em] text-subtle",
					children: "Primary"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-3xl tracking-tight",
					children: "Sources & monitors"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-2xl text-sm text-muted",
					children: "The desk is compiled from public law, State, Treasury, Congress, DIRCO and defence reporting. It is not a sanctions list and not legal advice. Pull the Federal Register live when you want a second check against our curated log."
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-xl border border-border bg-surface p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-xl tracking-tight",
							children: "Federal Register"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted",
							children: "Live search for “South Africa” — EOs, refugee determinations, future OFAC rules."
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							onClick: () => void fetchLive(),
							disabled: loading,
							children: loading ? "Fetching…" : "Fetch live"
						})]
					}),
					data?.error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm text-signal",
						children: data.error
					}) : null,
					data?.register?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-4 grid gap-2",
						children: data.register.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "rounded-md border border-border px-3 py-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-mono text-micro text-subtle",
								children: [
									item.date ? formatDeskDate(item.date) : "—",
									" · ",
									item.source
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: item.url,
								target: "_blank",
								rel: "noreferrer",
								className: "mt-1 block text-sm text-accent underline-offset-4 hover:underline",
								children: item.title
							})]
						}, item.id))
					}) : data && !loading && !data.error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm text-muted",
						children: "No recent documents returned."
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display text-2xl tracking-tight",
				children: "Standing monitors"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 grid gap-2 sm:grid-cols-2",
				children: MONITOR_QUERIES.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: m.url,
					target: "_blank",
					rel: "noreferrer",
					className: "flex h-14 items-center rounded-lg border border-border bg-surface px-4 text-sm hover:bg-elevated",
					children: m.label
				}) }, m.url))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display text-2xl tracking-tight",
				children: "Cited record"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 grid gap-3",
				children: SOURCES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "rounded-xl border border-border bg-surface p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-mono text-micro uppercase tracking-wider text-subtle",
							children: [
								s.kind,
								" · ",
								s.org
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: s.url,
							target: "_blank",
							rel: "noreferrer",
							className: "mt-1 block text-sm font-medium text-accent underline-offset-4 hover:underline",
							children: s.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted",
							children: s.why
						})
					]
				}, s.id))
			})] })
		]
	});
}
//#endregion
export { SourcesPage as component };
