const db = require("../models")

class UserService {
    async create(userParams) {
        try {
            await db.user.create(userParams)
        } catch (err) {
            return err
        }
    }
}

module.exports = new UserService()
