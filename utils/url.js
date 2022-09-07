module.exports.baseUrl = process.env.DEV
    ? `http://localhost:${process.env.PORT}`
    : `https://${process.env.HOST}`
