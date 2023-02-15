const pathToApps = "pages";

function Route(path) {
	let pathname = "";

	if(window.location.href.includes("github.io"))
		pathname = window.location.pathname.split("/")[1]

	pathname += path ? `/${pathToApps}/${path}` : "";
	window.location.pathname = pathname;
}

// Adding a new route is as simple as adding a new entry in the Router object
const Router = {
	home: () => Route(),
	multiplier: () => Route("multiplier"),
	multiplierOptimized: () => Route("multiplier-optimized"),
	divider: () => Route("divider"),
	dividerOptimized: () => Route("divider-optimized"),
};

export default Router;
