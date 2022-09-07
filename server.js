require('dotenv').config()
const fastify = require('fastify')({
    logger: false,
})
const fp = require('fastify-plugin')
const axiosRetry = require('axios-retry')
const axios = require('axios')
const swaggerConfig = require('./config/swagger')
const {mediaEntity, mediaByPageNumber, mediaAll} = require('./schemas')
const replyWrapperPlugin = require('./plugins/reply-wrapper')
require('./db')

axiosRetry(axios, {retries: 3})

axios.defaults.baseURL = 'https://graph.instagram.com/me'

fastify.addSchema(mediaEntity)
fastify.addSchema(mediaByPageNumber)
fastify.addSchema(mediaAll)

fastify.register(fp(replyWrapperPlugin))

fastify.register(require('@fastify/swagger'), swaggerConfig)

fastify.register(require('./routes/signup'))
fastify.register(require('./routes/media'))
fastify.register(require('./routes/checkins'))

fastify.listen({port: process.env.PORT}, (err) => {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }

    console.log('Server is listening...')
})
