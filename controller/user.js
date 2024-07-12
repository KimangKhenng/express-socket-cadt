const User = require("../models/user")

const getUserById = async (req, res) => {
    const id = req.params.id
    const user = await User.findById(id)
    return res.json(user)
}

module.exports = { getUserById }