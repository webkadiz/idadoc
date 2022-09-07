const mongoose = require('mongoose')

startup().catch((err) => console.log(err))

async function startup() {
    await mongoose.connect('mongodb://localhost:27017/idadoc_feed')
}
