import { i as __toESM } from "../_runtime.mjs";
import { n as formatDeskDate, t as cn } from "./utils-D1SGvVSi.mjs";
import { B as require_jsx_runtime, z as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as SeverityPill } from "./router-B9QwNE7V.mjs";
import { t as EVENTS } from "./watch-store-BWNQBkEV.mjs";
import { n as HighlightToggle } from "./highlights-C7shKz25.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/timeline-Dc9-llAu.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var KINDS = [
	{
		id: "all",
		label: "All"
	},
	{
		id: "us-action",
		label: "US action"
	},
	{
		id: "congress",
		label: "Congress"
	},
	{
		id: "military",
		label: "Military"
	},
	{
		id: "sa-response",
		label: "Pretoria"
	},
	{
		id: "trade",
		label: "Trade"
	},
	{
		id: "aid",
		label: "Aid"
	},
	{
		id: "diplomatic",
		label: "Diplomatic"
	}
];
function TimelinePage() {
	const [kind, setKind] = (0, import_react.useState)("all");
	const [q, setQ] = (0, import_react.useState)("");
	const rows = (0, import_react.useMemo)(() => {
		const query = q.trim().toLowerCase();
		return EVENTS.filter((e) => kind === "all" ? true : e.kind === kind).filter((e) => query ? (e.title + e.summary + e.source).toLowerCase().includes(query) : true);
	}, [kind, q]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-micro uppercase tracking-[0.18em] text-subtle",
					children: "Chronology"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-3xl tracking-tight",
					children: "Signal log"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-2xl text-sm text-muted",
					children: "From Lady R to the visa policy. Star an item to rank it on the dashboard highlight board. Flagged items are the ones that still sit in every congressional findings section."
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: q,
					onChange: (e) => setQ(e.target.value),
					placeholder: "Search events, sources, hulls…",
					className: "h-11 w-full rounded-md border border-border bg-surface px-3 text-sm text-fg placeholder:text-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex gap-2 overflow-x-auto pb-1",
					children: KINDS.map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setKind(k.id),
						className: cn("h-11 shrink-0 rounded-full border px-3 text-sm", kind === k.id ? "border-accent bg-accent text-accent-fg" : "border-border bg-surface text-muted"),
						children: k.label
					}, k.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "grid gap-3",
				children: rows.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: cn("rounded-xl border bg-surface p-4 sm:p-5", e.flagged ? "border-signal/35" : "border-border"),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", {
									className: "font-mono text-xs tabular-nums text-subtle",
									children: formatDeskDate(e.date)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SeverityPill, { value: e.severity }),
								e.flagged ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-micro uppercase tracking-wider text-signal",
									children: "Flagged"
								}) : null,
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-micro uppercase tracking-wider text-subtle",
									children: KINDS.find((k) => k.id === e.kind)?.label ?? e.kind
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-2 text-base font-medium leading-snug sm:text-lg",
							children: e.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm leading-normal text-muted",
							children: e.summary
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 flex flex-wrap items-center gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HighlightToggle, { id: e.id }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: e.sourceUrl,
									target: "_blank",
									rel: "noreferrer",
									className: "inline-flex h-11 items-center text-sm text-accent underline-offset-4 hover:underline",
									children: e.source
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-micro text-subtle",
									children: e.actors.join(" · ")
								})
							]
						})
					]
				}, e.id))
			}),
			rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "No events match that filter."
			}) : null
		]
	});
}
//#endregion
export { TimelinePage as component };
