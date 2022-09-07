module.exports = function (fastify, opts, done) {
    fastify.decorateReply('wrap', function (payload) {
        if (payload instanceof Error) {
            this.send({
                error: true,
                message: payload.message,
            })

            return
        }

        this.send({
            success: true,
            data: payload,
        })
    })

    done()
}
