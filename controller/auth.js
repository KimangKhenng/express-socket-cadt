const asyncHandler = require("express-async-handler")
const { signJWT } = require("../utiles")
const User = require("../models/user")
const bcrypt = require('bcrypt')

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email: email })
    if (!user) {
        return res.json({ message: "User not found!" })
    }
    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) {
        return res.json({ message: "Email or password is incorrect!" })
    }
    // Sign JWT 
    const token = signJWT(user._id, user.email)
    return res.json({ id: user._id, email: user.email, token })
})

module.exports = { loginUser }