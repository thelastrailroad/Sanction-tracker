import { n as formatDeskDate, r as formatShortDate, t as cn } from "./utils-D1SGvVSi.mjs";
import { B as require_jsx_runtime, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as US_MISSION, r as SA_MISSION, t as ENVOY_CABLES } from "./envoys-CZElzyCI.mjs";
import { h as ArrowRight, s as Pin } from "../_libs/lucide-react.mjs";
import { a as FLASH, c as RISK_HISTORY, i as FINANCIAL_SCORE, l as bandFor, n as SeverityPill, o as LADDER, s as PRESSURE_SCORE } from "./router-B9QwNE7V.mjs";
import { n as useWatchStore, t as EVENTS } from "./watch-store-BWNQBkEV.mjs";
import { t as INDICATORS } from "./indicators-CzFs3_rZ.mjs";
import { n as HighlightToggle, t as HighlightBoard } from "./highlights-C7shKz25.mjs";
import { a as CartesianGrid, i as Area, n as YAxis, o as ResponsiveContainer, r as XAxis, s as Tooltip, t as AreaChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BRFUmjVP.js
var import_jsx_runtime = require_jsx_runtime();
var STATUS = {
	done: "Complete",
	current: "Now",
	next: "Next",
	watch: "Watch",
	tail: "Tail"
};
function EscalationLadder() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
		className: "grid gap-2",
		children: LADDER.map((rung, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
			className: cn("grid grid-cols-[auto_1fr] gap-3 rounded-lg border px-3 py-3 sm:px-4", rung.status === "current" ? "border-signal/40 bg-signal/10" : "border-border bg-surface"),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: cn("font-mono text-micro tabular-nums pt-0.5", rung.status === "current" ? "text-signal" : "text-subtle"),
				children: String(i + 1).padStart(2, "0")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-baseline gap-x-2 gap-y-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-medium",
					children: rung.label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: cn("font-mono text-micro uppercase tracking-wider", rung.status === "current" ? "text-signal" : rung.status === "done" ? "text-steady" : "text-subtle"),
					children: STATUS[rung.status]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted leading-normal",
				children: rung.detail
			})] })]
		}, rung.step))
	});
}
function RiskMeter({ label, score, blurb, emphasis }) {
	const band = bandFor(score);
	const filled = Math.max(0, Math.min(10, Math.round(score / 10)));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: cn("rounded-xl border border-border bg-surface p-5 sm:p-6", emphasis && "border-border-strong"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-micro uppercase tracking-[0.18em] text-subtle",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex items-end justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-4xl leading-none tracking-tight tabular-nums",
					children: score
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SeverityPill, { value: band })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-5 flex gap-1",
				"aria-hidden": "true",
				children: Array.from({ length: 10 }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("h-2 flex-1 rounded-xs", i < filled ? band === "critical" || band === "high" ? "bg-signal" : band === "elevated" ? "bg-watch" : "bg-info" : "bg-elevated") }, i))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-sm leading-normal text-muted",
				children: blurb
			})
		]
	});
}
function Home() {
	const pinned = useWatchStore((s) => s.pinned);
	const latest = EVENTS.slice(0, 5);
	const watchTop = INDICATORS.filter((i) => ["immediate", "near"].includes(i.horizon)).filter((i) => i.severity === "critical" || i.severity === "high").slice(0, 6);
	const pinnedItems = INDICATORS.filter((i) => pinned.includes(i.id));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-xl border border-signal/40 bg-signal/10 p-5 sm:p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-mono text-micro uppercase tracking-[0.18em] text-signal",
						children: [
							FLASH.kicker,
							" · ",
							formatDeskDate(FLASH.date)
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-2 font-display text-2xl tracking-tight sm:text-3xl",
						children: FLASH.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 max-w-3xl text-sm leading-normal text-muted sm:text-base",
						children: FLASH.body
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 flex flex-wrap gap-3",
						children: FLASH.urls.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: u.href,
							target: "_blank",
							rel: "noreferrer",
							className: "inline-flex h-11 items-center text-sm text-accent underline-offset-4 hover:underline",
							children: u.label
						}, u.href))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HighlightBoard, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-4 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RiskMeter, {
					emphasis: true,
					label: "Bilateral pressure",
					score: PRESSURE_SCORE,
					blurb: "Visa restrictions, aid freeze, G20 snub, and military drills with China, Russia and Iran. This is already high. It is not yet a country embargo."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RiskMeter, {
					label: "Financial-sanctions proximity",
					score: FINANCIAL_SCORE,
					blurb: "Visa bans are not asset freezes. Magnitsky, AGOA eligibility, and Russia/Iran helper authorities are the live financial path. Country-wide OFAC isolation remains a tail risk."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-6 lg:grid-cols-[1.15fr_0.85fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeaderRow, {
					kicker: "Path",
					title: "Escalation ladder",
					to: "/watch",
					link: "What to watch"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EscalationLadder, {})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeaderRow, {
						kicker: "Series",
						title: "Pressure vs finance"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 h-64 rounded-xl border border-border bg-surface p-3 sm:h-72",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: "100%",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
								data: RISK_HISTORY,
								margin: {
									top: 8,
									right: 12,
									left: -12,
									bottom: 4
								},
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
										stroke: "var(--color-border)",
										vertical: false
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
										dataKey: "date",
										tick: {
											fill: "var(--color-subtle)",
											fontSize: 10
										},
										axisLine: false,
										tickLine: false,
										interval: 1,
										tickFormatter: (d) => {
											const [year, month] = d.split("-");
											return `${month}/${year?.slice(2) ?? ""}`;
										}
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
										domain: [0, 100],
										tick: {
											fill: "var(--color-subtle)",
											fontSize: 10
										},
										axisLine: false,
										tickLine: false
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
										background: "var(--color-elevated)",
										border: "1px solid var(--color-border)",
										borderRadius: 8,
										color: "var(--color-fg)",
										fontSize: 12
									} }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
										type: "monotone",
										dataKey: "pressure",
										name: "Pressure",
										stroke: "var(--color-signal)",
										fill: "var(--color-signal)",
										fillOpacity: .18,
										strokeWidth: 2
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
										type: "monotone",
										dataKey: "financial",
										name: "Financial",
										stroke: "var(--color-info)",
										fill: "var(--color-info)",
										fillOpacity: .12,
										strokeWidth: 2
									})
								]
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-xs text-subtle",
						children: "Pressure moved first. Finance lags — until a named designation or an AGOA drop."
					})
				] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeaderRow, {
				kicker: "Missions",
				title: "What the ambassadors are saying",
				to: "/envoys",
				link: "Envoy desk"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EnvoyPeek, {
					label: US_MISSION.shortName,
					post: US_MISSION.post,
					cables: ENVOY_CABLES.filter((c) => c.mission === "us").slice(0, 2)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EnvoyPeek, {
					label: SA_MISSION.shortName,
					post: SA_MISSION.post,
					cables: ENVOY_CABLES.filter((c) => c.mission === "sa").slice(0, 2)
				})]
			})] }),
			pinnedItems.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeaderRow, {
				kicker: "Pinned",
				title: "Your watch list",
				to: "/watch",
				link: "Manage"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 grid gap-2",
				children: pinnedItems.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-start gap-3 rounded-lg border border-border bg-surface px-4 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pin, {
						className: "mt-0.5 size-4 shrink-0 text-watch",
						strokeWidth: 1.75
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium",
						children: i.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: i.nextTrigger
					})] })]
				}, i.id))
			})] }) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-8 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeaderRow, {
					kicker: "Cable",
					title: "Latest movements",
					to: "/timeline",
					link: "Full timeline"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 grid gap-2",
					children: latest.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "rounded-lg border border-border bg-surface p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", {
									className: "font-mono text-micro tabular-nums text-subtle",
									children: formatShortDate(e.date)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SeverityPill, { value: e.severity })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm font-medium leading-snug",
								children: e.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 line-clamp-2 text-sm text-muted",
								children: e.summary
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HighlightToggle, { id: e.id })
							})
						]
					}, e.id))
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeaderRow, {
					kicker: "If visas are step one",
					title: "Highest-signal watch items",
					to: "/watch",
					link: "Full briefing"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 grid gap-2",
					children: watchTop.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "rounded-lg border border-border bg-surface p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SeverityPill, { value: i.severity }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-micro uppercase tracking-wider text-subtle",
									children: i.horizon
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm font-medium leading-snug",
								children: i.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 line-clamp-2 text-sm text-muted",
								children: i.nextTrigger
							})
						]
					}, i.id))
				})] })]
			})
		]
	});
}
function HeaderRow({ kicker, title, to, link }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-3 flex items-end justify-between gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-mono text-micro uppercase tracking-[0.18em] text-subtle",
			children: kicker
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-xl tracking-tight sm:text-2xl",
			children: title
		})] }), to && link ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to,
			className: "inline-flex h-11 items-center gap-1 text-sm text-muted hover:text-fg",
			children: [link, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
		}) : null]
	});
}
function EnvoyPeek({ label, post, cables }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "rounded-xl border border-border bg-surface p-4 sm:p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-micro uppercase tracking-wider text-subtle",
				children: post
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 font-display text-xl tracking-tight",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 grid gap-3",
				children: cables.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "border-t border-border pt-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", {
							className: "font-mono text-micro tabular-nums text-subtle",
							children: formatShortDate(c.date)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm font-medium leading-snug",
							children: c.title
						}),
						c.quote ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 line-clamp-2 text-sm text-muted",
							children: c.quote
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 line-clamp-2 text-sm text-muted",
							children: c.summary
						})
					]
				}, c.id))
			})
		]
	});
}
//#endregion
export { Home as component };
