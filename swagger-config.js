module.exports = {
    routePrefix: "/docs",
    swagger: {
        info: {
            title: "Instagram aidadoc API",
            version: "0.1.0"
        },
        host: "instribbon.webkadiz.ru",
        schemes: ["https"],
        consumes: ["application/json"],
        produces: ["application/json"]
    },
    exposeRoute: true
}
