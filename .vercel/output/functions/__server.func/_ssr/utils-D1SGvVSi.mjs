import { n as clsx } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/utils-D1SGvVSi.js
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function formatDeskDate(iso) {
	const d = /* @__PURE__ */ new Date(iso + (iso.length === 10 ? "T12:00:00Z" : ""));
	if (Number.isNaN(d.getTime())) return iso;
	return new Intl.DateTimeFormat("en-GB", {
		day: "2-digit",
		month: "short",
		year: "numeric",
		timeZone: "UTC"
	}).format(d);
}
function formatShortDate(iso) {
	const d = /* @__PURE__ */ new Date(iso + (iso.length === 10 ? "T12:00:00Z" : ""));
	if (Number.isNaN(d.getTime())) return iso;
	return new Intl.DateTimeFormat("en-GB", {
		day: "2-digit",
		month: "short",
		timeZone: "UTC"
	}).format(d);
}
//#endregion
export { formatDeskDate as n, formatShortDate as r, cn as t };
