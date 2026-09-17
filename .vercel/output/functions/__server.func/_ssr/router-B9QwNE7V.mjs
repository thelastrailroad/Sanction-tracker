import { i as __toESM } from "../_runtime.mjs";
import { n as formatDeskDate, t as cn } from "./utils-D1SGvVSi.mjs";
import { B as require_jsx_runtime, _ as createRootRoute, d as useRouterState, g as createFileRoute, h as lazyRouteComponent, l as Scripts, m as Outlet, p as createRouter, u as HeadContent, v as Link, y as useRouter, z as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Ship, c as LayoutGrid, g as Activity, i as Shield, l as Landmark, m as Building2, n as TriangleAlert, o as Radio, u as Flag } from "../_libs/lucide-react.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-B9QwNE7V.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: errorMessage(error)
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
var DESK_AS_OF = "2026-09-17";
var DESK_CLASSIFICATION = "OPEN SOURCE";
var PRESSURE_FACTORS = [
	{
		id: "visa",
		label: "Visa restrictions (INA 212(a)(3)(C))",
		weight: 16,
		score: 88,
		note: "Active as of 16 Sep 2026. Names unpublished. Ambassador called it the first of escalatory steps."
	},
	{
		id: "aid",
		label: "EO 14204 aid freeze + PEPFAR drawdown",
		weight: 12,
		score: 92,
		note: "Aid halt ordered Feb 2025. HIV programme being phased down; Afrikaner refugee track expanded."
	},
	{
		id: "g20",
		label: "G20 exclusion under US presidency",
		weight: 8,
		score: 84,
		note: "South Africa frozen out of 2026 US-hosted G20 cycle after Trump boycotted Johannesburg 2025."
	},
	{
		id: "agoa",
		label: "AGOA eligibility / preference risk",
		weight: 14,
		score: 58,
		note: "Programme extended to Dec 2028, but SA-specific exclusion bills remain live and USTR called SA a unique problem."
	},
	{
		id: "magnitsky",
		label: "Global Magnitsky / ANC list bills",
		weight: 12,
		score: 46,
		note: "H.R.2633 and S.2752 require a classified list of officials. Introduced, not advanced. Visa tool is a partial substitute."
	},
	{
		id: "military",
		label: "Military alignment with CN / RU / IR",
		weight: 18,
		score: 79,
		note: "Will for Peace 2026 hosted PLAN, Baltic Fleet, and IRGC/IRIN hulls at Simon's Town. Western drills have largely stopped."
	},
	{
		id: "domestic",
		label: "BEE, Expropriation Act, incitement",
		weight: 12,
		score: 74,
		note: "The stated predicate for EO 14204 and the visa policy. Pretoria will not unwind; Lamola called it sovereignty."
	},
	{
		id: "icj",
		label: "ICJ case against Israel",
		weight: 8,
		score: 62,
		note: "Named in EO 14204. DIRCO says the case will not be dropped even if Washington waives restrictions."
	}
];
var FINANCIAL_FACTORS = [
	{
		id: "targeted-sdn",
		label: "Targeted Magnitsky / SDN of officials",
		weight: 28,
		score: 52,
		note: "Most probable financial tool. Visa policy does not freeze assets; Magnitsky would."
	},
	{
		id: "agoa-finance",
		label: "AGOA loss (auto, citrus, wine, steel)",
		weight: 22,
		score: 48,
		note: "Trade preference, not a classic OFAC programme, but the largest near-term cash hit to exporters."
	},
	{
		id: "secondary",
		label: "Secondary sanctions (Russia / Iran helper)",
		weight: 20,
		score: 41,
		note: "Graham Russia–Iran package (Sep 2026) authorises tariffs on countries helping Moscow evade. Lady R-class events would light this fuse."
	},
	{
		id: "corr-bank",
		label: "Correspondent banking de-risking",
		weight: 16,
		score: 28,
		note: "Private-sector, not OFAC. Watch dollar clearing for SOEs and dual-use traders if designations land."
	},
	{
		id: "soe",
		label: "SOE / minerals sectoral listing",
		weight: 14,
		score: 18,
		note: "Country-wide financial isolation of a G20 economy is still a tail risk. Platinum, chrome, manganese complicate it."
	}
];
function weighted(factors) {
	const w = factors.reduce((s, f) => s + f.weight, 0);
	return Math.round(factors.reduce((s, f) => s + f.score * f.weight, 0) / w);
}
var PRESSURE_SCORE = weighted(PRESSURE_FACTORS);
var FINANCIAL_SCORE = weighted(FINANCIAL_FACTORS);
function bandFor(score) {
	if (score >= 80) return "critical";
	if (score >= 65) return "high";
	if (score >= 45) return "elevated";
	if (score >= 25) return "watch";
	return "low";
}
var PRESSURE_BAND = bandFor(PRESSURE_SCORE);
var LADDER = [
	{
		step: 1,
		label: "Public pressure",
		status: "done",
		detail: "EO 14204, embassy messaging, Oval Office confrontation May 2025."
	},
	{
		step: 2,
		label: "Aid cutoff",
		status: "done",
		detail: "USAID halt; PEPFAR phased drawdown of ~$400m/year HIV support."
	},
	{
		step: 3,
		label: "Forum exclusion",
		status: "done",
		detail: "Barred from 2026 US G20 cycle; Pretoria suspended G20 work until UK 2027 presidency."
	},
	{
		step: 4,
		label: "Targeted visas",
		status: "current",
		detail: "INA 212(a)(3)(C) policy, 16 Sep 2026. Unpublished list; family members may be covered."
	},
	{
		step: 5,
		label: "AGOA eligibility cut",
		status: "next",
		detail: "Annual review due around Oct 2026. Senate/House review bills would force a harder landing."
	},
	{
		step: 6,
		label: "Magnitsky designations",
		status: "watch",
		detail: "Asset freeze + US-person prohibition on named ANC/state officials. The actual financial step."
	},
	{
		step: 7,
		label: "Secondary / helper sanctions",
		status: "watch",
		detail: "If Pretoria is found to help Russia or Iran evade — port calls, dual-use, shadow fleet, oil."
	},
	{
		step: 8,
		label: "Sectoral / SOE SDN",
		status: "tail",
		detail: "Armscor, Denel, Transnet, IDC, or minerals offtakers. Still politically expensive for Washington."
	}
];
var RISK_HISTORY = [
	{
		date: "2022-12",
		label: "Lady R",
		pressure: 32,
		financial: 14
	},
	{
		date: "2023-02",
		label: "Mosi II",
		pressure: 38,
		financial: 16
	},
	{
		date: "2023-05",
		label: "Brigety",
		pressure: 44,
		financial: 20
	},
	{
		date: "2023-12",
		label: "ICJ filing",
		pressure: 48,
		financial: 22
	},
	{
		date: "2024-12",
		label: "Expropriation Act",
		pressure: 52,
		financial: 24
	},
	{
		date: "2025-02",
		label: "EO 14204",
		pressure: 64,
		financial: 30
	},
	{
		date: "2025-03",
		label: "Rasool expelled",
		pressure: 66,
		financial: 31
	},
	{
		date: "2025-09",
		label: "Review bills",
		pressure: 68,
		financial: 36
	},
	{
		date: "2025-11",
		label: "G20 boycott",
		pressure: 70,
		financial: 38
	},
	{
		date: "2026-01",
		label: "Will for Peace",
		pressure: 74,
		financial: 42
	},
	{
		date: "2026-07",
		label: "12.5% tariff",
		pressure: 72,
		financial: 40
	},
	{
		date: "2026-09",
		label: "Visa policy",
		pressure: PRESSURE_SCORE,
		financial: FINANCIAL_SCORE
	}
];
var FLASH = {
	date: "2026-09-16",
	kicker: "Active measure",
	title: "State Department visa restrictions on South African policymakers",
	body: "Secretary Rubio invoked INA 212(a)(3)(C) against foreign nationals responsible for, or complicit in, uncompensated land seizures, race-based discrimination, or incitement of imminent violence against minorities. No names published. US Ambassador Bozell: this is only the first step in a series of escalatory measures. DIRCO’s Ronald Lamola rejected the premise and called for respect of sovereignty. Ambassador Roelf Meyer is seeking talks.",
	urls: [{
		label: "State Department",
		href: "https://www.state.gov/releases/office-of-the-spokesman/2026/09/announcement-of-new-visa-restriction-policy-targeting-foreign-nationals-involved-in-race-based-discrimination"
	}, {
		label: "EO 14204",
		href: "https://www.presidency.ucsb.edu/documents/executive-order-14204-addressing-egregious-actions-the-republic-south-africa"
	}]
};
var LABEL = {
	critical: "Critical",
	high: "High",
	elevated: "Elevated",
	watch: "Watch",
	low: "Low"
};
var TONE = {
	critical: "text-signal border-signal/40 bg-signal/10",
	high: "text-signal border-signal/30 bg-signal/10",
	elevated: "text-watch border-watch/35 bg-watch/10",
	watch: "text-info border-info/30 bg-info/10",
	low: "text-steady border-steady/30 bg-steady/10"
};
function SeverityPill({ value, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex items-center rounded-full border px-2 py-0.5 text-micro font-medium uppercase tracking-wider", TONE[value], className),
		children: LABEL[value]
	});
}
var NAV = [
	{
		to: "/",
		label: "Desk",
		icon: LayoutGrid
	},
	{
		to: "/timeline",
		label: "Timeline",
		icon: Activity
	},
	{
		to: "/envoys",
		label: "Envoys",
		icon: Flag
	},
	{
		to: "/congress",
		label: "Congress",
		icon: Landmark
	},
	{
		to: "/military",
		label: "Military",
		icon: Ship
	},
	{
		to: "/watch",
		label: "Watch",
		icon: Radio
	},
	{
		to: "/exposure",
		label: "Exposure",
		icon: Building2
	},
	{
		to: "/sources",
		label: "Sources",
		icon: Shield
	}
];
function DeskShell({ children }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "border-b border-border",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:px-6 sm:py-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/",
							className: "min-w-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-mono text-micro uppercase tracking-[0.22em] text-signal",
									children: "Cape corridor desk"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "font-display text-3xl tracking-tight sm:text-4xl",
									children: "Cape Signal"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm text-muted",
									children: "US financial and diplomatic pressure on South Africa"
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "hidden text-right sm:block",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-mono text-micro uppercase tracking-wider text-subtle",
									children: DESK_CLASSIFICATION
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 font-mono text-xs tabular-nums text-muted",
									children: ["As of ", formatDeskDate(DESK_AS_OF)]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-2 flex justify-end",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SeverityPill, { value: PRESSURE_BAND })
								})
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "hidden gap-1 overflow-x-auto md:flex",
						"aria-label": "Desk",
						children: NAV.map((item) => {
							const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
							const Icon = item.icon;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: item.to,
								className: cn("inline-flex h-11 items-center gap-2 rounded-md px-3 text-sm transition-colors duration-150", active ? "bg-elevated text-fg" : "text-muted hover:bg-surface hover:text-fg"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
									className: "size-4",
									strokeWidth: 1.75
								}), item.label]
							}, item.to);
						})
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "mx-auto w-full max-w-6xl px-4 pb-28 pt-6 sm:px-6 sm:pb-16 sm:pt-8",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "fixed inset-x-0 bottom-0 z-20 border-t border-border bg-bg/95 backdrop-blur-sm md:hidden",
				"aria-label": "Mobile",
				style: { paddingBottom: "env(safe-area-inset-bottom)" },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "flex gap-1 overflow-x-auto px-1",
					children: NAV.map((item) => {
						const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
						const Icon = item.icon;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "min-w-14 flex-1",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: item.to,
								className: cn("flex h-14 min-w-14 flex-col items-center justify-center gap-0.5 px-1 text-micro", active ? "text-fg" : "text-subtle"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
									className: "size-4",
									strokeWidth: 1.75
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "truncate",
									children: item.label
								})]
							})
						}, item.to);
					})
				})
			})
		]
	});
}
var styles_default = "/assets/styles-CdQpEvpO.css";
var APP_NAME = "Cape Signal";
function publicShareHost() {
	const host = String("").trim().split(",")[0]?.trim().split(":")[0]?.toLowerCase() ?? "";
	if (!host || !/^[a-z0-9.-]+$/.test(host) || !host.includes(".")) return "";
	if (/^\d{1,3}(?:\.\d{1,3}){3}$/.test(host)) return "";
	if (host === "vercel.app" || host.endsWith(".vercel.app")) return "";
	if (host === "vercel.com" || host.endsWith(".vercel.com")) return "";
	return host;
}
var Route$8 = createRootRoute({
	head: () => {
		const host = publicShareHost();
		const xBanner = host ? `https://${host}/x-banner.jpg` : "";
		return {
			meta: [
				{ charSet: "utf-8" },
				{
					name: "viewport",
					content: "width=device-width, initial-scale=1"
				},
				{ title: APP_NAME },
				{
					name: "description",
					content: "Open-source desk tracking US visa, aid, trade and financial-sanctions pressure on South Africa — Congress, State, DIRCO, and military ties to China, Russia and Iran."
				},
				{
					name: "theme-color",
					content: "#0b0d10"
				},
				...xBanner ? [
					{
						property: "x:game:image",
						content: xBanner
					},
					{
						property: "x:game:image:width",
						content: "1200"
					},
					{
						property: "x:game:image:height",
						content: "264"
					}
				] : []
			],
			links: [
				{
					rel: "icon",
					type: "image/svg+xml",
					href: "/favicon.svg"
				},
				{
					rel: "preconnect",
					href: "https://fonts.googleapis.com"
				},
				{
					rel: "preconnect",
					href: "https://fonts.gstatic.com",
					crossOrigin: "anonymous"
				},
				{
					rel: "stylesheet",
					href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:ital,wght@0,400;0,500;0,600;1,400&family=Instrument+Serif:ital@0;1&display=swap"
				},
				{
					rel: "stylesheet",
					href: styles_default
				},
				{
					rel: "manifest",
					href: "/__grok/manifest.webmanifest"
				},
				{
					rel: "apple-touch-icon",
					href: "/__grok/icon-180.png"
				}
			]
		};
	},
	component: Root
});
function Root() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		suppressHydrationWarning: true,
		className: "antialiased",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", {
			className: "bg-bg text-fg",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeskShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
			]
		})]
	});
}
var $$splitComponentImporter$7 = () => import("./routes-BRFUmjVP.mjs");
var Route$7 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./congress-KZuypXqf.mjs");
var Route$6 = createFileRoute("/congress")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./envoys-Bx3JBWjn.mjs");
var Route$5 = createFileRoute("/envoys")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./exposure-DEa0SklS.mjs");
var Route$4 = createFileRoute("/exposure")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./military-Bglp8ybY.mjs");
var Route$3 = createFileRoute("/military")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./sources-DZncWZ5T.mjs");
var Route$2 = createFileRoute("/sources")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./timeline-Dc9-llAu.mjs");
var Route$1 = createFileRoute("/timeline")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./watch-DOGX34gk.mjs");
var Route = createFileRoute("/watch")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var rootRouteChildren = {
	IndexRoute: Route$7.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$8
	}),
	CongressRoute: Route$6.update({
		id: "/congress",
		path: "/congress",
		getParentRoute: () => Route$8
	}),
	EnvoysRoute: Route$5.update({
		id: "/envoys",
		path: "/envoys",
		getParentRoute: () => Route$8
	}),
	ExposureRoute: Route$4.update({
		id: "/exposure",
		path: "/exposure",
		getParentRoute: () => Route$8
	}),
	MilitaryRoute: Route$3.update({
		id: "/military",
		path: "/military",
		getParentRoute: () => Route$8
	}),
	SourcesRoute: Route$2.update({
		id: "/sources",
		path: "/sources",
		getParentRoute: () => Route$8
	}),
	TimelineRoute: Route$1.update({
		id: "/timeline",
		path: "/timeline",
		getParentRoute: () => Route$8
	}),
	WatchRoute: Route.update({
		id: "/watch",
		path: "/watch",
		getParentRoute: () => Route$8
	})
};
var routeTree = Route$8._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { FLASH as a, RISK_HISTORY as c, FINANCIAL_SCORE as i, bandFor as l, SeverityPill as n, LADDER as o, FINANCIAL_FACTORS as r, PRESSURE_SCORE as s, router_exports as t };
