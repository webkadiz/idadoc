const {Media} = require('../mongoose-schemas')
const Api = require("./api-service")

const HOUR = 60 * 60 * 1000

class MediaService {
    constructor() {
        this.media = []
        this.attempts = 0
    }

    init() {
        this.warmingUpNewMedia()
    }

    async getMedia() {
        const media = await Media.find({}, {_id: 0, __v: 0})

        return media
    }

    async getMediaByPage(pageNumber) {
        const media = await Media.find({}, {_id: 0, __v: 0}).skip((pageNumber - 1) * 20).limit(20)

        return media
    }

    warmingUpNewMedia() {
        setTimeout(this.warmingUpNewMedia.bind(this), 1000)

        // const mediaPortion = await Api.getFirstMedia()

        // if (!mediaPortion || !mediaPortion.data.length) return

        // const newestMediaEntity = mediaPortion.data[0]
        // const newestSavedMediaEntity = await Media.findOne().sort({_id: -1})

        // if (newestSavedMediaEntity.id === newestMediaEntity) return

        // const media = []

        // for (const mediaEntity of mediaPortion.data) {
        //     if (mediaEntity.id === newestSavedMediaEntity) break
            
        //     media.unshift(mediaEntity)
        // }

        // for (const mediaEntity of media) {
        //     if (mediaEntity.media_type === 'CAROUSEL_ALBUM') mediaEntity.media_type = 'IMAGE'

        //     const newMedia = new Media(mediaEntity)

        //     newMedia.save()
        // }
    }
}

module.exports = new MediaService()
