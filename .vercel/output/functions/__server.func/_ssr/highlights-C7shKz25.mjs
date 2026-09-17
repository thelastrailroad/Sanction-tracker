import { n as formatDeskDate, t as cn } from "./utils-D1SGvVSi.mjs";
import { B as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as ChevronUp, f as ChevronDown, r as Star, t as X } from "../_libs/lucide-react.mjs";
import { n as SeverityPill } from "./router-B9QwNE7V.mjs";
import { n as useWatchStore, t as EVENTS } from "./watch-store-BWNQBkEV.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/highlights-C7shKz25.js
var import_jsx_runtime = require_jsx_runtime();
function HighlightToggle({ id, compact }) {
	const highlighted = useWatchStore((s) => s.highlighted);
	const toggle = useWatchStore((s) => s.toggleHighlight);
	const on = highlighted.includes(id);
	const rank = highlighted.indexOf(id) + 1;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick: () => toggle(id),
		"aria-pressed": on,
		"aria-label": on ? `Remove from highlight board, rank ${rank}` : "Add to highlight board",
		className: cn("inline-flex h-11 items-center gap-1.5 rounded-md border px-2.5 text-sm", on ? "border-watch/40 bg-watch/10 text-watch" : "border-border bg-elevated text-muted hover:text-fg"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, {
			className: cn("size-4", on && "fill-watch"),
			strokeWidth: 1.75
		}), compact ? null : on ? `Rank ${String(rank).padStart(2, "0")}` : "Highlight"]
	});
}
function HighlightBoard() {
	const highlighted = useWatchStore((s) => s.highlighted);
	const move = useWatchStore((s) => s.moveHighlight);
	const toggle = useWatchStore((s) => s.toggleHighlight);
	const rows = highlighted.map((id) => EVENTS.find((e) => e.id === id)).filter((e) => Boolean(e));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-xl border border-watch/35 bg-watch/5 p-5 sm:p-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-end justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-micro uppercase tracking-[0.18em] text-watch",
				children: "Highlight board"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl tracking-tight sm:text-3xl",
				children: "Your ranked file"
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-sm text-sm text-muted",
				children: "Star events on the timeline. Rank them here. Higher is hotter."
			})]
		}), rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-4 text-sm text-muted",
			children: "Nothing pinned. Open the timeline and hit Highlight on anything that should sit on this desk."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
			className: "mt-4 grid gap-3",
			children: rows.map((e, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "grid gap-3 rounded-lg border border-border bg-surface p-4 sm:grid-cols-[auto_1fr_auto] sm:items-start",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-2xl tabular-nums text-watch",
						children: String(i + 1).padStart(2, "0")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", {
									className: "font-mono text-micro tabular-nums text-subtle",
									children: formatDeskDate(e.date)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SeverityPill, { value: e.severity })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-base font-medium leading-snug",
								children: e.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm leading-normal text-muted",
								children: e.summary
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: e.sourceUrl,
								target: "_blank",
								rel: "noreferrer",
								className: "mt-2 inline-flex h-11 items-center text-sm text-accent underline-offset-4 hover:underline",
								children: e.source
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex sm:flex-col",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => move(e.id, -1),
								disabled: i === 0,
								"aria-label": `Rank up ${e.title}`,
								className: "inline-flex size-11 items-center justify-center rounded-md text-muted hover:text-fg disabled:opacity-30",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUp, {
									className: "size-5",
									strokeWidth: 1.75
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => move(e.id, 1),
								disabled: i === rows.length - 1,
								"aria-label": `Rank down ${e.title}`,
								className: "inline-flex size-11 items-center justify-center rounded-md text-muted hover:text-fg disabled:opacity-30",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {
									className: "size-5",
									strokeWidth: 1.75
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => toggle(e.id),
								"aria-label": `Remove ${e.title} from board`,
								className: "inline-flex size-11 items-center justify-center rounded-md text-muted hover:text-signal",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
									className: "size-4",
									strokeWidth: 1.75
								})
							})
						]
					})
				]
			}, e.id))
		})]
	});
}
//#endregion
export { HighlightToggle as n, HighlightBoard as t };
