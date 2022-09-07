module.exports.postSchema = {
    body: {
        type: 'object',
        properties: {
            userId: {type: 'number'},
            title: {type: 'string'},
            description: {type: 'string'},
            status: {type: 'boolean'},
            due: {type: 'string', format: 'date'},
            briefengId: {type: 'integer'},
        },
        required: ['userId', 'title', 'status'],
    },
    response: {
        200: {
            type: 'object',
            properties: {
                error: {type: 'boolean'},
                message: {type: 'string'},
            },
        },
    },
}

module.exports.putSchema = {
    body: {
        type: 'object',
        properties: {
            id: {type: 'number'},
            status: {type: 'boolean'},
        },
        required: ['id', 'status'],
    },
    response: {
        200: {
            type: 'object',
            properties: {
                error: {type: 'boolean'},
                message: {type: 'string'},
            },
        },
    },
}

module.exports.deleteSchema = {
    body: {
        type: 'object',
        properties: {
            id: {type: 'number'},
        },
        required: ['id'],
    },
    response: {
        200: {
            type: 'object',
            properties: {
                error: {type: 'boolean'},
                message: {type: 'string'},
            },
        },
    },
}
