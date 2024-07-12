const mongoose = require('mongoose')
// Define a schema

const chatSchema = new mongoose.Schema({
    byUserId: { required: true, type: mongoose.Types.ObjectId, ref: 'User' },
    text: { type: String, unique: true },
    createdDate: { type: Date, default: Date.now() }
})
// Create a model
const Chat = mongoose.model('Chat', chatSchema)
module.exports = Chat