module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("users", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            age: {
                type: Sequelize.INTEGER
            },
            gender: {
                type: Sequelize.ENUM('F', 'M')
            },
            phone: {
                type: Sequelize.STRING
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        })
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("users")
    }
}
