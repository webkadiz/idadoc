const axios = require("axios")

class Api {
    async getFirstMedia() {
        try {
            const res = await axios(
                `/media?fields=id,thumbnail_url,timestamp,media_url,media_type,caption,children&access_token=${process.env.INST_TOKEN}&limit=20`
            )

            return res.data
        } catch (e) {
            console.log(e)

            return null
        }
    }

    async getNextMedia(paging) {
        try {
            const res = await axios(paging.next)

            return res.data
        } catch (e) {
            console.log(e)

            return null
        }
    }
}

module.exports = new Api()
