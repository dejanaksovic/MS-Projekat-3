const pathToApps = "pages";
const nameOfRepo = "MS-Projekat-3"

function Route(path) {
	// If path is defined go to "pages/path" else go home
	if(window.location.href.includes("github.io"))
		window.location.pathname = path ? `/${nameOfRepo}/${pathToApps}/${path}` : "${nameOfRepo}";
	else
		window.location.pathname = path ? `/${pathToApps}/${path}` : "";
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
