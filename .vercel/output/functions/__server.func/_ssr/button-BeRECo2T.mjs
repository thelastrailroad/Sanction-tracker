import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as cn } from "./utils-D1SGvVSi.mjs";
import { B as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/button-BeRECo2T.js
var import_jsx_runtime = require_jsx_runtime();
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var getLiveSignals = createServerFn({ method: "GET" }).handler(createSsrRpc("054c44b1d1fefb39d45d3e5906d31f835cbba2c71d234d0c724945d4474b67a8"));
var getEnvoySignals = createServerFn({ method: "GET" }).handler(createSsrRpc("a324e079dea60769533583f037c2072c7252eebb3478d07349cc6d19c5b28823"));
var buttonVariants = cva("inline-flex items-center justify-center gap-2 font-medium transition-opacity duration-150 ease-[var(--ease-smooth)] disabled:opacity-40 disabled:pointer-events-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent", {
	variants: {
		variant: {
			primary: "bg-accent text-accent-fg hover:opacity-90",
			ghost: "bg-transparent text-fg border border-border hover:bg-elevated",
			quiet: "bg-transparent text-muted hover:text-fg"
		},
		size: {
			sm: "h-11 px-3 text-sm rounded-sm",
			md: "h-11 px-4 text-sm rounded-md"
		}
	},
	defaultVariants: {
		variant: "primary",
		size: "md"
	}
});
function Button({ className, variant, size, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		className: cn(buttonVariants({
			variant,
			size
		}), className),
		...props
	});
}
//#endregion
export { getEnvoySignals as n, getLiveSignals as r, Button as t };
