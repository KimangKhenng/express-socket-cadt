const mongoose = require('mongoose')
// Define a schema

const userSchema = new mongoose.Schema({
  username: { required: true, type: String },
  email: { type: String, unique: true },
  password: { type: String, required: true },
  createdDate: { type: Date, default: Date.now() }
})
// Create a model
const User = mongoose.model('User', userSchema)
module.exports = User