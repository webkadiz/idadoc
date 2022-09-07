module.exports = {
    routePrefix: '/docs',
    swagger: {
        info: {
            title: 'Instagram aidadoc API',
            version: '0.1.0',
        },
        host: process.env.HOST,
        schemes: ['http', 'https'],
        consumes: ['application/json'],
        produces: ['application/json'],
    },
    exposeRoute: true,
}
