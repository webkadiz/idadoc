const _ = require('lodash')
const {signupPostSchema} = require('../schemas/signup')
const UserService = require('../services/user')

module.exports = function (fastify, opts, done) {
    fastify.post(
        '/signup',
        {schema: signupPostSchema},
        async (request, reply) => {
            console.log(request.body)
            const userParams = _.pick(request.body, ['phone', 'age', 'gender'])

            const result = await UserService.create(userParams)

            reply.wrap(result)
        }
    )

    done()
}
