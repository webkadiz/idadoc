const { Model } = require("sequelize")

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            // define association here
        }
    }

    User.init(
        {
            age: DataTypes.INTEGER,
            gender: DataTypes.ENUM('F', 'M'),
            phone: DataTypes.STRING
        },
        {
            sequelize,
            modelName: "User"
        }
    )

    return User
}
