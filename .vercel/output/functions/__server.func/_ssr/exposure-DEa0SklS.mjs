import { B as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as SeverityPill, r as FINANCIAL_FACTORS } from "./router-B9QwNE7V.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/exposure-DEa0SklS.js
var import_jsx_runtime = require_jsx_runtime();
var SECTORS = [
	{
		id: "auto",
		name: "Automotive",
		exposure: "Largest AGOA export. BMW, Mercedes, Ford, Toyota value chains through PE, East London, Rosslyn.",
		usLeverage: "AGOA drop + existing 25% Section 232 vehicle tariff. Plants can re-route to EU/UK, not overnight.",
		risk: "high",
		notes: "The political hostage. A beneficiary-list drop is felt in Gauteng and the Eastern Cape within a quarter."
	},
	{
		id: "citrus",
		name: "Citrus & wine",
		exposure: "Western Cape and Limpopo exporters. Seasonal, dollar-invoiced, AGOA-sensitive.",
		usLeverage: "AGOA eligibility and phytosanitary friction. Fast to hurt, easy to message on the Hill.",
		risk: "high",
		notes: "Farm-level pain is the point of a preference cut. Watch the 2027 shipping season bookings."
	},
	{
		id: "pgm",
		name: "Platinum group & chrome / manganese",
		exposure: "SA is not optional in PGM, chrome, manganese, vanadium. China is already the dominant buyer.",
		usLeverage: "Investment screening and offtake politics more than an embargo. A full SDN on miners is a tail risk because it hits US industry too.",
		risk: "elevated",
		notes: "The strategic reason Washington will prefer targeted tools over a country embargo — and the reason China will offer a market."
	},
	{
		id: "hiv",
		name: "HIV / health system",
		exposure: "PEPFAR ~$400m/year being drawn down. Highest human cost, limited sanctions-law content.",
		usLeverage: "Already used. State tied remaining funds to incitement condemnations.",
		risk: "high",
		notes: "Not a financial-market channel. It is the domestic political channel inside South Africa."
	},
	{
		id: "banks",
		name: "Banks & SOEs",
		exposure: "USD clearing, trade finance, IDC/PIC, Transnet, Denel, Armscor.",
		usLeverage: "Correspondent de-risking, Magnitsky on PEPs, 311 on an institution, SDN on a defence SOE.",
		risk: "elevated",
		notes: "This is how ‘financial sanctions’ actually arrive. Watch RMA cuts before any Federal Register drama."
	},
	{
		id: "defence",
		name: "Defence industry",
		exposure: "Denel, Armscor, Paramount, small dual-use shops. Lady R sits on this ledger.",
		usLeverage: "Direct. Any Russia/Iran counterparty is designation-ready. ITAR already tight.",
		risk: "critical",
		notes: "Highest probability of a named entity designation if a new cargo fact appears."
	},
	{
		id: "ports",
		name: "Ports & bunkering",
		exposure: "Simon’s Town, Durban, Saldanha, ship-chandlers, insurers.",
		usLeverage: "OFAC maritime advisories, shadow-fleet helper theory, Graham Act tariffs.",
		risk: "high",
		notes: "The physical place where military alignment becomes a financial case."
	},
	{
		id: "farmland",
		name: "Commercial agriculture / land",
		exposure: "Title risk under Expropriation Act 13 of 2024. US political predicate, not a large US FDI stock.",
		usLeverage: "Visa list, Magnitsky on implementing officials, AGOA agri-lines.",
		risk: "high",
		notes: "A single gazetted nil-compensation taking of a working farm is worth more to the file than a year of communiqués."
	}
];
function ExposurePage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-micro uppercase tracking-[0.18em] text-subtle",
					children: "Money"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-3xl tracking-tight",
					children: "Financial exposure"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-2xl text-sm text-muted",
					children: "South Africa is a G20 economy with platinum, chrome and manganese the US cannot easily replace. That is why a country embargo is still a tail risk — and why the realistic path is named people, a trade-preference cut, and secondary tools if the military file gets worse."
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display text-2xl tracking-tight",
				children: "How finance actually arrives"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 grid gap-3",
				children: FINANCIAL_FACTORS.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "rounded-xl border border-border bg-surface p-4 sm:p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-baseline justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-medium",
								children: f.label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-sm tabular-nums text-watch",
								children: f.score
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 h-1.5 overflow-hidden rounded-full bg-elevated",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block h-full rounded-full bg-watch",
								style: { width: `${f.score}%` }
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm text-muted",
							children: f.note
						})
					]
				}, f.id))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display text-2xl tracking-tight",
				children: "Sector map"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 grid gap-3 sm:grid-cols-2",
				children: SECTORS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "rounded-xl border border-border bg-surface p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "font-medium",
								children: s.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SeverityPill, { value: s.risk })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm text-muted",
							children: s.exposure
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-subtle",
								children: "US leverage. "
							}), s.usLeverage]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted",
							children: s.notes
						})
					]
				}, s.id))
			})] })
		]
	});
}
//#endregion
export { ExposurePage as component };
