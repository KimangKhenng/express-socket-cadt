const express = require('express')
const { loginUser } = require('../controller/auth')

const authRouter = express.Router()

authRouter.post('/login', loginUser)

module.exports = authRouter