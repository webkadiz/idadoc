const fastify = require("fastify")({
    logger: false
})
const axiosRetry = require("axios-retry")
const axios = require("axios")
const MediaService = require("./services/media-service")
const swaggerConfig = require("./swagger-config")
const { mediaEntity, mediaByPageNumber, mediaAll } = require("./schemas")
require('./db')

axiosRetry(axios, { retries: 3 })

axios.defaults.baseURL = "https://graph.instagram.com/me"
MediaService.init()

fastify.addSchema(mediaEntity)
fastify.addSchema(mediaByPageNumber)
fastify.addSchema(mediaAll)

fastify.register(require("@fastify/swagger"), swaggerConfig)

fastify.register(async function (fastify) {
    fastify.get("/", (_, reply) => {
        reply.send("")
    })

    fastify.get(
        "/feed/:pageNumber",
        { schema: fastify.getSchema("mediaByPageNumber") },
        async (request, reply) => {
            const media = await MediaService.getMediaByPage(request.params.pageNumber)

            reply.send(media)
        }
    )

    fastify.get(
        "/feed",
        { schema: fastify.getSchema("mediaAll") },
        async (_, reply) => {
            const media = await MediaService.getMedia()

            reply.send(media)
        }
    )
})

fastify.listen({ port: 4000 }, (err) => {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
})
