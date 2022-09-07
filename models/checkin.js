const {Model} = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class Checkin extends Model {
        static associate(models) {
            models.user.hasMany(Checkin)
            Checkin.belongsTo(models.user)
        }
    }

    Checkin.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            title: DataTypes.STRING,
            desciption: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            status: DataTypes.BOOLEAN,
            due: {
                type: DataTypes.DATEONLY,
                allowNull: true,
            },
            briefengId: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
        },
        {
            sequelize,
            modelName: 'checkin',
        }
    )

    return Checkin
}
