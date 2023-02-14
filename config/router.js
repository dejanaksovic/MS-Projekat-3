const pathToApps = "pages";

function Route(path) {
	// If path is defined go to "pages/path" else go home
	window.location.href = path ? `${pathToApps}/${path}` : "";
}

// Adding a new route is as simple as adding a new entry in the Router object
const Router = {
	home: () => Route(),
	multiplier: () => Route("multiplier"),
	multiplierOptimized: () => Route("multiplier-optimized"),
	divider: () => Route("divider"),
	dividerOptimized: () => Route("divider-optimised"),
};

export default Router;
