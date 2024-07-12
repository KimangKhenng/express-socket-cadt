const express = require('express')
const { loginUser } = require('../controller/auth')
const { getAllChat } = require('../controller/chat')

const chatRouter = express.Router()

chatRouter.get('/', getAllChat)

module.exports = chatRouter