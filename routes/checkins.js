const {pick} = require('lodash')
const {postSchema, putSchema, deleteSchema} = require('../schemas/checkins')
const CheckinsService = require('../services/checkins-service')

module.exports = function (fastify, opts, done) {
    fastify.post('/checkins', {schema: postSchema}, async (request, reply) => {
        const checkinParams = pick(request.body, [
            'title',
            'description',
            'status',
            'date',
            'briefengId',
            'userId',
        ])

        const result = await CheckinsService.create(checkinParams)

        reply.wrap(result)
    })

    fastify.put('/checkins', {schema: putSchema}, async (request, reply) => {
        const checkinParams = pick(request.body, ['id', 'status'])

        const result = await CheckinsService.update(checkinParams)

        reply.wrap(result)
    })

    fastify.delete(
        '/checkins',
        {schema: deleteSchema},
        async (request, reply) => {
            const checkinParams = pick(request.body, ['id'])

            const result = await CheckinsService.delete(checkinParams)

            reply.wrap(result)
        }
    )

    done()
}
