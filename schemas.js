module.exports.mediaEntity = {
    $id: "mediaEntity",
    type: "object",
    properties: {
        id: { type: "string" },
        media_url: { type: "string" },
        media_type: { type: "string" },
        timestamp: { type: "string" },
        caption: { type: "string" },
        children: {
            type: "object",
            properties: {
                data: {
                    type: "array",
                    items: {
                        type: "object",
                        properties: {
                            id: { type: "string" }
                        }
                    }
                }
            }
        }
    },
    required: ["id", "media_url", "media_type"]
}

module.exports.mediaByPageNumber = {
    $id: "mediaByPageNumber",
    params: {
        type: "object",
        properties: {
            pageNumber: { type: "number" }
        },
        required: ["pageNumber"]
    },
    response: {
        200: {
            type: "array",
            items: {
                $ref: "mediaEntity#"
            }
        }
    }
}

module.exports.mediaAll = {
    $id: "mediaAll",
    response: {
        200: {
            type: "array",
            items: {
                $ref: "mediaEntity#"
            }
        }
    }
}
