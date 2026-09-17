import { i as __toESM } from "../_runtime.mjs";
import { t as cn } from "./utils-D1SGvVSi.mjs";
import { B as require_jsx_runtime, z as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { p as Check, s as Pin } from "../_libs/lucide-react.mjs";
import { n as SeverityPill } from "./router-B9QwNE7V.mjs";
import { n as useWatchStore } from "./watch-store-BWNQBkEV.mjs";
import { t as INDICATORS } from "./indicators-CzFs3_rZ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/watch-DOGX34gk.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var HORIZONS = [
	{
		id: "all",
		label: "All"
	},
	{
		id: "immediate",
		label: "0–90 days"
	},
	{
		id: "near",
		label: "3–12 months"
	},
	{
		id: "structural",
		label: "Structural"
	}
];
function WatchPage() {
	const [horizon, setHorizon] = (0, import_react.useState)("all");
	const checked = useWatchStore((s) => s.checked);
	const pinned = useWatchStore((s) => s.pinned);
	const toggleChecked = useWatchStore((s) => s.toggleChecked);
	const togglePinned = useWatchStore((s) => s.togglePinned);
	const rows = (0, import_react.useMemo)(() => INDICATORS.filter((i) => horizon === "all" ? true : i.horizon === horizon), [horizon]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-micro uppercase tracking-[0.18em] text-subtle",
					children: "Briefing"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-3xl tracking-tight",
					children: "What else to watch"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-2xl text-sm text-muted",
					children: "Visa restrictions on politicians who implement racial quotas are a step, not the destination. They do not freeze assets. The financial case is built from the items below — especially military contact with China, Russia and Iran."
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "rounded-xl border border-border bg-surface p-5 sm:p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-micro uppercase tracking-[0.18em] text-watch",
					children: "Desk note"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 grid gap-3 text-sm leading-normal text-muted",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "If you are tracking a path to US financial sanctions, do not overweight the visa list. INA 212(a)(3)(C) keeps people out of the United States. Global Magnitsky, AGOA eligibility, correspondent-bank de-risking, and the new Russia–Iran helper authorities are what move money." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Pretoria’s defiance on BEE and expropriation keeps the political file open. A first nil-compensation taking of a working farm, or a named visa list that includes cabinet and the ANC SG, is how that file becomes designations." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The military file is the accelerant. Another AIS-dark Russian or Iranian merchant at Simon’s Town, a Denel/Armscor counterparty in the war, or a nuclear-sounding MoU with Tehran or Rosatom would collapse the remaining hesitation in Treasury and on the Hill. Will for Peace 2026 already spent most of the benefit of the doubt." })
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex gap-2 overflow-x-auto pb-1",
				children: HORIZONS.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setHorizon(h.id),
					className: cn("h-11 shrink-0 rounded-full border px-3 text-sm", horizon === h.id ? "border-accent bg-accent text-accent-fg" : "border-border bg-surface text-muted"),
					children: h.label
				}, h.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "grid gap-3",
				children: rows.map((i) => {
					const on = checked.includes(i.id);
					const pin = pinned.includes(i.id);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "rounded-xl border border-border bg-surface p-4 sm:p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SeverityPill, { value: i.severity }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-mono text-micro uppercase tracking-wider text-subtle",
										children: [
											i.horizon,
											" · ",
											i.channel
										]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex shrink-0 gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => togglePinned(i.id),
										className: cn("inline-flex size-11 items-center justify-center rounded-md border border-border", pin ? "text-watch" : "text-subtle"),
										"aria-pressed": pin,
										"aria-label": pin ? "Unpin" : "Pin to desk",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pin, {
											className: "size-4",
											strokeWidth: 1.75
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => toggleChecked(i.id),
										className: cn("inline-flex size-11 items-center justify-center rounded-md border border-border", on ? "text-steady" : "text-subtle"),
										"aria-pressed": on,
										"aria-label": on ? "Mark unwatched" : "Mark as watching",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
											className: "size-4",
											strokeWidth: 1.75
										})
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-3 text-base font-medium leading-snug sm:text-lg",
								children: i.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm leading-normal text-muted",
								children: i.why
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
								className: "mt-4 grid gap-3 sm:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "font-mono text-micro uppercase tracking-wider text-subtle",
									children: "Now"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "mt-1 text-sm text-fg",
									children: i.current
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "font-mono text-micro uppercase tracking-wider text-subtle",
									children: "Next trigger"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "mt-1 text-sm text-fg",
									children: i.nextTrigger
								})] })]
							})
						]
					}, i.id);
				})
			})
		]
	});
}
//#endregion
export { WatchPage as component };
