module.exports.baseUrl = procecss.env.DEV
    ? `http://localhost:${process.env.PORT}`
    : `https://${process.env.HOST}`
