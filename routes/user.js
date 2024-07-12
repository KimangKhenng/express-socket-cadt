const express = require('express')
const { getUserById } = require('../controller/user')

const userRouter = express.Router()

userRouter.get('/:id', getUserById)

module.exports = userRouter