const mongoose = require('mongoose')
const dbName = "cadt-db"
require('dotenv').config()
const uri = `mongodb://localhost:27017/${dbName}`

async function dbConnect() {
    mongoose.connection.on('connected', () => {
        console.log("Connected")
    })
    await mongoose.connect(uri, {
        dbName: dbName
    })
}
module.exports = dbConnect