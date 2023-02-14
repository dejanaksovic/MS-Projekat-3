//When adding a new page or any other html file that needs access add it's relative path from app here
const relativeRoute = {
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
    Route(relativeRoute.index)
}

const routeMultiplier = () => {
    Route(relativeRoute.multiplier)
}

const routeMultiplierOptimized = () => {
    Route(relativeRoute.multiplierOprimized)
}

const routeDivider = () => {
    Route(relativeRoute.divider)
}

const routeDividerOptimized = () => {
    Route(relativeRoute.dividerOptimized)
}


export {Route, routeBase, routeMultiplier, routeMultiplierOptimized, routeDivider, routeDividerOptimized}
