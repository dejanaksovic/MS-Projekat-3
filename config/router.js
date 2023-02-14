//When adding a new page or any other html file that needs access add it's relative path from app here
const routes = {
    multiplier: "/pages/multiplier/multiplier.html",
    multiplierOprimized: "/pages/multiplier-optimized/multiplierOptimized.html",
    divider: "/pages/divider/divider.html",
    dividerOptimized: "/pages/divider-optimised/dividerOptimized.html",
    index: "/"
}

const Route = (relativePath) => {
    window.location.href = relativePath
}

const routeBase = () => {
    Route(routes.index)
}

const routeMultiplier = () => {
    Route(routes.multiplier)
}

const routeMultiplierOptimized = () => {
    Route(routes.multiplierOprimized)
}

const routeDivider = () => {
    Route(routes.divider)
}

const routeDividerOptimized = () => {
    Route(routes.dividerOptimized)
}


export {Route, routeBase, routeMultiplier, routeMultiplierOptimized, routeDivider, routeDividerOptimized}
