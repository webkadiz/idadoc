require('dotenv').config()
const fastify = require("fastify")({
    logger: false
})
const fp = require('fastify-plugin')
const axiosRetry = require("axios-retry")
const axios = require("axios")
const MediaService = require("./services/media-service")
const swaggerConfig = require("./swagger-config")
const { mediaEntity, mediaByPageNumber, mediaAll } = require("./schemas")
const signup = require('./routes/signup')
const replyWrapperPlugin = require('./plugins/reply-wrapper')
require('./db')

axiosRetry(axios, { retries: 3 })

axios.defaults.baseURL = "https://graph.instagram.com/me"

MediaService.init()

fastify.addSchema(mediaEntity)
fastify.addSchema(mediaByPageNumber)
fastify.addSchema(mediaAll)

fastify.register(fp(replyWrapperPlugin))

fastify.register(require("@fastify/swagger"), swaggerConfig)

fastify.register(signup)

fastify.register(async function (fastify, options, done) {
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

    done()
})

fastify.listen({ port: 4000 }, (err) => {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }

    console.log('Server is listening...')
})
