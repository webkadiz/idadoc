const MediaService = require("../services/media-service")

MediaService.init()

module.exports = function (fastify, opts, done) {
    fastify.get(
        '/feed/:pageNumber',
        {schema: fastify.getSchema('mediaByPageNumber')},
        async (request, reply) => {
            const media = await MediaService.getMediaByPage(
                request.params.pageNumber
            )

            reply.send(media)
        }
    )

    fastify.get(
        '/feed',
        {schema: fastify.getSchema('mediaAll')},
        async (_, reply) => {
            const media = await MediaService.getMedia()

            reply.send(media)
        }
    )

    done()
}
