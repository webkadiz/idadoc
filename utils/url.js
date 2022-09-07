module.exports.baseUrl = process.env.DEV
    ? `http://${process.env.HOST}`
    : `https://${process.env.HOST}`
