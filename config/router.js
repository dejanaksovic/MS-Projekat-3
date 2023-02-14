//When adding a new page or any other html file that needs access add it's relative path from app here
const routes = {
    index: "/",
    multiplier: "/pages/multiplier",
    multiplierOprimized: "/pages/multiplier-optimized",
    divider: "/pages/divider/divider.html",
    dividerOptimized: "/pages/divider-optimised",
}

const Route = (path = "") => {
    window.location.href = path
}

const Router = {
    home: () => Route(),
    multiplier: () => Route(routes.multiplier),
    multiplierOptimized: () => Route(routes.multiplierOprimized),
    divider: () => Route(routes.divider),
    dividerOptimized: () => Route(routes.dividerOptimized)
}

export default Router
