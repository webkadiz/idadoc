const db = require("../models")
const CheckinsService = require('./checkins-service')

class UserService {
    async create(userParams) {
        try {
            const user = await db.user.create(userParams)

            return await CheckinsService.createClinicalExamination({userId: user.dataValues.id, age: userParams.age})
        } catch (err) {
            return err
        }
    }
}

module.exports = new UserService()
