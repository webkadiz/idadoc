const db = require('../models')

class CheckinsService {
    async create(params) {
        try {
            await db.checkin.create(params)
        } catch (err) {
            return err
        }
    }

    async update({status, id}) {
        try {
            const res = await db.checkin.update(
                {status},
                {
                    where: {
                        id,
                    },
                }
            )

            if (res[0] === 0) return new Error('checkin not found')
        } catch (err) {
            return err
        }
    }

    async delete({id}) {
        try {
            const res = await db.checkin.destroy({
                where: {
                    id,
                },
            })

            if (res === 0) return new Error('checkin not found')
        } catch (err) {
            return err
        }
    }
}

module.exports = new CheckinsService()
