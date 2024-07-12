const asyncHandler = require("express-async-handler")
const { signJWT } = require("../utiles")
const Chat = require("../models/chat")

const getAllChat = asyncHandler(async (req, res) => {
    const chats = await Chat.find().sort({ 'createdDate': 'desc' }).populate('byUserId')
    return res.json(chats)
})

module.exports = { getAllChat }