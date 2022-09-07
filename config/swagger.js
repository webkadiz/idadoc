module.exports = {
    routePrefix: '/docs',
    swagger: {
        info: {
            title: 'Instagram aidadoc API',
            version: '0.1.0',
        },
        host: `${process.env.HOST}:${process.env.PORT}`,
        schemes: [process.env.DEV ? 'http' : 'https'],
        consumes: ['application/json'],
        produces: ['application/json'],
    },
    exposeRoute: true,
}
