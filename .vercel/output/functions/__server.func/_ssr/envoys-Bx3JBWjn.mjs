import { i as __toESM } from "../_runtime.mjs";
import { n as formatDeskDate, t as cn } from "./utils-D1SGvVSi.mjs";
import { B as require_jsx_runtime, z as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as VACANCY, i as US_MISSION, n as FIVE_ASKS, r as SA_MISSION, t as ENVOY_CABLES } from "./envoys-CZElzyCI.mjs";
import { n as getEnvoySignals, t as Button } from "./button-BeRECo2T.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/envoys-Bx3JBWjn.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var KIND_LABEL = {
	press: "Press",
	interview: "Interview",
	social: "Social",
	speech: "Speech"
};
function EnvoysPage() {
	const [side, setSide] = (0, import_react.useState)("all");
	const [live, setLive] = (0, import_react.useState)(null);
	const [liveErrors, setLiveErrors] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const cables = (0, import_react.useMemo)(() => ENVOY_CABLES.filter((c) => side === "all" ? true : c.mission === side), [side]);
	const liveRows = (0, import_react.useMemo)(() => (live ?? []).filter((c) => side === "all" ? true : c.mission === side), [live, side]);
	async function pullLive() {
		setLoading(true);
		try {
			const bundle = await getEnvoySignals();
			setLive(bundle.items);
			setLiveErrors(bundle.errors);
		} catch (err) {
			setLiveErrors([err instanceof Error ? err.message : "Feed unavailable"]);
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
					children: "Bilateral missions"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-3xl tracking-tight",
					children: "Envoy cables"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-2xl text-sm text-muted",
					children: "Press, interviews, and social from the two people who actually talk across the corridor. The Washington post is not vacant — Roelf Meyer has held it since May, after a 13-month gap when Rasool was expelled."
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-4 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MissionCard, { profile: US_MISSION }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MissionCard, { profile: SA_MISSION })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-xl border border-border bg-surface p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-micro uppercase tracking-[0.18em] text-watch",
					children: "Vacancy, closed"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-sm leading-normal text-muted",
					children: [
						VACANCY.predecessor,
						" was PNG’d ",
						formatDeskDate(VACANCY.start),
						". The chair sat empty until Meyer’s appointment on ",
						formatDeskDate(VACANCY.end),
						".",
						" ",
						VACANCY.why,
						" That gap is why Bozell, in March, told Pretoria to put someone in Washington."
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-2xl tracking-tight",
					children: "Bozell’s five asks"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: "Delivered to Pretoria in 2025, restated at Hermanus in March 2026. The visa policy is what happens when they go unanswered."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "mt-3 grid gap-2",
					children: FIVE_ASKS.map((ask, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "grid grid-cols-[auto_1fr] gap-3 rounded-lg border border-border bg-surface px-3 py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-micro tabular-nums text-subtle pt-0.5",
							children: String(i + 1).padStart(2, "0")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm",
							children: ask
						})]
					}, ask))
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex gap-2 overflow-x-auto pb-1",
					children: [
						{
							id: "all",
							label: "Both desks"
						},
						{
							id: "us",
							label: "Bozell"
						},
						{
							id: "sa",
							label: "Meyer"
						}
					].map((opt) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setSide(opt.id),
						className: cn("h-11 shrink-0 rounded-full border px-3 text-sm", side === opt.id ? "border-accent bg-accent text-accent-fg" : "border-border bg-surface text-muted"),
						children: opt.label
					}, opt.id))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					onClick: () => void pullLive(),
					disabled: loading,
					children: loading ? "Pulling…" : "Pull live wires"
				})]
			}),
			liveErrors.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-watch",
				children: liveErrors.join(" · ")
			}) : null,
			liveRows.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-2xl tracking-tight",
					children: "Live wires"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: "Embassy RSS and news search. Ranked by date. Not a substitute for the curated log."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 grid gap-2",
					children: liveRows.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "rounded-lg border border-border bg-surface p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-micro uppercase tracking-wider text-subtle",
									children: item.mission === "us" ? "US Pretoria" : "SA Washington"
								}),
								item.date ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", {
									className: "font-mono text-micro tabular-nums text-subtle",
									children: formatDeskDate(item.date)
								}) : null,
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-micro text-subtle",
									children: item.source
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: item.url,
							target: "_blank",
							rel: "noreferrer",
							className: "mt-2 block text-sm font-medium text-accent underline-offset-4 hover:underline",
							children: item.title
						})]
					}, item.id))
				})
			] }) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display text-2xl tracking-tight",
				children: "Curated log"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 grid gap-3",
				children: cables.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CableCard, { cable: c }, c.id))
			})] })
		]
	});
}
function MissionCard({ profile }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "rounded-xl border border-border bg-surface p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "flex size-12 shrink-0 items-center justify-center rounded-md bg-elevated font-display text-lg text-fg",
					"aria-hidden": true,
					children: profile.initials
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-micro uppercase tracking-wider text-subtle",
							children: profile.post
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-xl tracking-tight",
							children: profile.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 font-mono text-micro uppercase tracking-wider text-steady",
							children: "Seated"
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-muted",
				children: profile.statusNote
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm",
				children: profile.line
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex flex-wrap gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: profile.webUrl,
					target: "_blank",
					rel: "noreferrer",
					className: "inline-flex h-11 items-center text-sm text-accent underline-offset-4 hover:underline",
					children: "Mission site"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: profile.xUrl,
					target: "_blank",
					rel: "noreferrer",
					className: "inline-flex h-11 items-center text-sm text-accent underline-offset-4 hover:underline",
					children: profile.mission === "us" ? "Embassy on X" : "Embassy home"
				})]
			})
		]
	});
}
function CableCard({ cable }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		className: cn("rounded-xl border bg-surface p-4 sm:p-5", cable.flagged ? "border-signal/40" : "border-border"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", {
						className: "font-mono text-xs tabular-nums text-subtle",
						children: formatDeskDate(cable.date)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-mono text-micro uppercase tracking-wider text-subtle",
						children: [
							cable.mission === "us" ? "Bozell" : "Meyer",
							" · ",
							KIND_LABEL[cable.kind]
						]
					}),
					cable.flagged ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-micro uppercase tracking-wider text-signal",
						children: "Flagged"
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
				className: "mt-2 text-base font-medium leading-snug",
				children: cable.title
			}),
			cable.quote ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("blockquote", {
				className: "mt-3 border-l-2 border-watch/50 pl-3 text-sm leading-normal text-fg",
				children: cable.quote
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm leading-normal text-muted",
				children: cable.summary
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: cable.sourceUrl,
				target: "_blank",
				rel: "noreferrer",
				className: "mt-3 inline-flex h-11 items-center text-sm text-accent underline-offset-4 hover:underline",
				children: cable.source
			})
		]
	});
}
//#endregion
export { EnvoysPage as component };
