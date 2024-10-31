const express = require('express')
const cors = require('cors')
const { join } = require('node:path')
const app = express()
const { createServer } = require('node:http')
const server = createServer(app, (req, res) => {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Request-Method', '*')
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET')
    res.setHeader('Access-Control-Allow-Headers', req.header.origin)
    if (req.method === 'OPTIONS') {
        res.writeHead(200)
        res.end()
        return
    }
})
const parser = require('body-parser')
//DB Connect
const dbConnect = require('./db/db.js')
dbConnect().catch((err) => { console.log(err) })

app.use(cors())
app.use(parser.json())

const { Server } = require('socket.io')
const Chat = require('./models/chat.js')
const authRouter = require('./routes/auth.js')
const chatRouter = require('./routes/chat.js')
const userRouter = require('./routes/user.js')

const io = new Server(server, {
    cors: {
        origin: '*'
    },
})

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'))
})

app.use('/auth', authRouter)
app.use('/chats', chatRouter)
app.use('/users', userRouter)

io.on('connect', function (socket) {
    socket.on('send-message', async (payload) => {
        // Validate payload - Homework
        console.log(payload)
        const chat = new Chat({
            byUserId: payload.byUserId,
            username: payload.username,
            text: payload.text
        })
        const newChat = await chat.save()
        const chatWithUsername = await Chat.findById(newChat._id).populate('byUserId')
        // Broadcast to all
        io.emit('re-message', chatWithUsername)
    })
})

server.listen(4000, () => {
    console.log("Server listening to port 4000")
})