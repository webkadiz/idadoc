const mongoose = require("mongoose")

const mediaSchema = new mongoose.Schema({
    id: String,
    media_url: String,
    media_type: String,
    timestamp: String,
    caption: String,
    children: mongoose.Schema({
        data: [
            {
                id: { type: String }
            }
        ]
    }, {_id: false})
})

const Media = mongoose.model('Media', mediaSchema)

module.exports.mediaSchema = mediaSchema
module.exports.Media = Media
