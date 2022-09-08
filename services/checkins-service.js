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

    async createClinicalExamination({userId, age}) {
        let isClinicalExamination

        if (age >= 39) isClinicalExamination = true
        else if (age < 18) isClinicalExamination = false
        else if (age % 3 == 0) isClinicalExamination = true
        else isClinicalExamination = false

        return await this.create({
            userId,
            title: isClinicalExamination
                ? 'Диспансеризация'
                : 'Профилактический медосмотр',
            status: false,
        })
    }
}

module.exports = new CheckinsService()
