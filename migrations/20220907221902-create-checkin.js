module.exports = {
    async up(queryInterface, Sequelize) {
        const sql = `CREATE TABLE IF NOT EXISTS "checkins" (
            "id"  SERIAL ,
            "title" VARCHAR(255),
            "desciption" TEXT,
            "status" BOOLEAN,
            "due" DATE,
            "briefengId" INTEGER,
            "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL,
            "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL,
            "userId" INTEGER NOT NULL REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE, PRIMARY KEY ("id")
        );`

        return queryInterface.sequelize.query(sql, {
            type: Sequelize.QueryTypes.RAW,
        })
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("checkins")
    },
}
