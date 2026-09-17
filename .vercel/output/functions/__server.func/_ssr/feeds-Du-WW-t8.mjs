import { n as TSS_SERVER_FUNCTION, t as createServerFn } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/feeds-Du-WW-t8.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var FR_URL = "https://www.federalregister.gov/api/v1/documents.json?per_page=8&order=newest&conditions%5Bterm%5D=South+Africa";
function asString(v) {
	return typeof v === "string" ? v : "";
}
var getLiveSignals_createServerFn_handler = createServerRpc({
	id: "054c44b1d1fefb39d45d3e5906d31f835cbba2c71d234d0c724945d4474b67a8",
	name: "getLiveSignals",
	filename: "src/lib/feeds.ts"
}, (opts) => getLiveSignals.__executeServer(opts));
var getLiveSignals = createServerFn({ method: "GET" }).handler(getLiveSignals_createServerFn_handler, async () => {
	try {
		const res = await fetch(FR_URL, {
			headers: { accept: "application/json" },
			signal: AbortSignal.timeout(8e3)
		});
		if (!res.ok) return {
			fetchedAt: (/* @__PURE__ */ new Date()).toISOString(),
			register: [],
			error: `Federal Register ${res.status}`
		};
		const register = ((await res.json()).results ?? []).map((d) => ({
			id: asString(d.document_number) || asString(d.html_url),
			title: asString(d.title),
			date: asString(d.publication_date),
			source: d.agencies?.[0]?.name || asString(d.type) || "Federal Register",
			url: asString(d.html_url)
		}));
		return {
			fetchedAt: (/* @__PURE__ */ new Date()).toISOString(),
			register
		};
	} catch (err) {
		return {
			fetchedAt: (/* @__PURE__ */ new Date()).toISOString(),
			register: [],
			error: err instanceof Error ? err.message : "Feed unavailable"
		};
	}
});
var ENVOY_FEEDS = [
	{
		mission: "us",
		source: "US Embassy Pretoria",
		url: "https://za.usembassy.gov/feed/"
	},
	{
		mission: "us",
		source: "Google News · Bozell",
		url: "https://news.google.com/rss/search?q=%22Brent+Bozell%22+OR+%22L.+Brent+Bozell%22+South+Africa&hl=en-US&gl=US&ceid=US:en"
	},
	{
		mission: "sa",
		source: "Google News · Meyer",
		url: "https://news.google.com/rss/search?q=%22Roelf+Meyer%22+(ambassador+OR+Washington+OR+embassy)&hl=en-US&gl=US&ceid=US:en"
	}
];
var AMP = "&amp;";
var LT = "&lt;";
var GT = "&gt;";
var QUOT = "&quot;";
var APOS = "&#39;";
function decodeXml(s) {
	return s.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1").replaceAll(AMP, "&").replaceAll(LT, "<").replaceAll(GT, ">").replaceAll(QUOT, "\"").replaceAll(APOS, "'").replace(/<[^>]+>/g, "").trim();
}
function tag(xml, name) {
	const m = xml.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`, "i"));
	return m?.[1] ? decodeXml(m[1]) : "";
}
function parseRss(xml, mission, fallbackSource) {
	return (xml.match(/<item[\s\S]*?<\/item>/gi) ?? []).slice(0, 8).map((block, i) => {
		const title = tag(block, "title");
		const link = tag(block, "link") || tag(block, "guid");
		const pub = tag(block, "pubDate") || tag(block, "published");
		const d = pub ? new Date(pub) : /* @__PURE__ */ new Date();
		const date = Number.isNaN(d.getTime()) ? "" : d.toISOString().slice(0, 10);
		const source = tag(block, "source") || fallbackSource;
		return {
			id: link || `${mission}-${i}-${title}`,
			title,
			date,
			source,
			url: link,
			mission
		};
	});
}
var getEnvoySignals_createServerFn_handler = createServerRpc({
	id: "a324e079dea60769533583f037c2072c7252eebb3478d07349cc6d19c5b28823",
	name: "getEnvoySignals",
	filename: "src/lib/feeds.ts"
}, (opts) => getEnvoySignals.__executeServer(opts));
var getEnvoySignals = createServerFn({ method: "GET" }).handler(getEnvoySignals_createServerFn_handler, async () => {
	const errors = [];
	const items = [];
	const results = await Promise.allSettled(ENVOY_FEEDS.map(async (feed) => {
		const res = await fetch(feed.url, {
			headers: {
				accept: "application/rss+xml, application/xml, text/xml, */*",
				"user-agent": "CapeSignal/1.0 (open-source desk)"
			},
			signal: AbortSignal.timeout(8e3)
		});
		if (!res.ok) throw new Error(`${feed.source} ${res.status}`);
		return parseRss(await res.text(), feed.mission, feed.source);
	}));
	for (let i = 0; i < results.length; i++) {
		const r = results[i];
		const feed = ENVOY_FEEDS[i];
		if (r.status === "fulfilled") items.push(...r.value);
		else errors.push(`${feed?.source}: ${r.reason instanceof Error ? r.reason.message : "failed"}`);
	}
	const seen = /* @__PURE__ */ new Set();
	const deduped = items.filter((it) => {
		const key = (it.url || it.title).toLowerCase();
		if (!it.title || seen.has(key)) return false;
		seen.add(key);
		return true;
	});
	deduped.sort((a, b) => a.date < b.date ? 1 : a.date > b.date ? -1 : 0);
	return {
		fetchedAt: (/* @__PURE__ */ new Date()).toISOString(),
		items: deduped.slice(0, 16),
		errors
	};
});
//#endregion
export { getEnvoySignals_createServerFn_handler, getLiveSignals_createServerFn_handler };
