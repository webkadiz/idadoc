const path = require("path")
const { exec } = require("child_process")
const mongoose = require("mongoose")
const axios = require("axios")
require("./db")
const Api = require("./services/api-service")
const { Media } = require("./mongoose-schemas")
const { baseUrl } = require("./utils/url")

axios.defaults.baseURL = "https://graph.instagram.com/me"

const media = []

async function main() {
    let mediaPortion = await Api.getFirstMedia()

    while (true) {
        if (!mediaPortion) process.exit(1)

        for (const mediaEntity of mediaPortion.data) {
            media.unshift(mediaEntity)
        }

        if (!mediaPortion.paging?.next) break

        mediaPortion = await Api.getNextMedia(mediaPortion.paging)
    }

    console.log(media)

    for (const mediaEntity of media) {
        const mediaPathEnd = mediaEntity.media_url.indexOf("?")
        const mediaPath = mediaEntity.media_url.slice(0, mediaPathEnd)
        const mediaExt = path.extname(mediaPath)
        const execCmd = `curl '${mediaEntity.media_url}' -o public/${mediaEntity.id}${mediaExt}`

        mediaEntity.media_url = `${baseUrl}/public/${mediaEntity.id}${mediaExt}`

        if (mediaEntity.media_type === 'CAROUSEL_ALBUM') mediaEntity.media_type = 'IMAGE'

        console.log(execCmd)

        const curlProcess = exec(execCmd)

        const exitCode = await new Promise(resolve => curlProcess.on('close', resolve))

        if (exitCode !== 0) process.exit(1)
    }

    for (const mediaEntity of media) {
        const mediaDocument = new Media(mediaEntity)

        try {
            const document = await mediaDocument.save()

            console.log(document)
        } catch(e) {
            await Media.deleteMany({})

            process.exit(1)
        }
    }
}

main()
    .then(() => {
        console.log("done")
        
        mongoose.connection.close()
    })
    .catch(() => process.exit(1))
