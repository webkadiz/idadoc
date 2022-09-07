module.exports.signupPostSchema = {
    $id: 'signupPost',
    body: {
        type: 'object',
        properties: {
            phone: {
                type: 'string',
            },
            age: {
                type: 'number',
            },
            gender: {
                type: 'string',
                enum: ['F', 'M'],
            },
        },
        required: ['phone', 'age', 'gender'],
    },
    response: {
        default: {
            type: 'object',
            properties: {
                error: {type: 'boolean'},
                message: {type: 'string'},
            },
        },
        200: {
            type: 'object',
            properties: {
                success: {type: 'boolean'},
            },
        },
    },
}
