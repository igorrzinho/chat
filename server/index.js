const express = require('express')
const app = express()
const http = require('http')
const { Server } = require('socket.io')
const cors = require('cors')
const server = http.createServer(app)
const port = 3001
app.use(cors())

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
})


io.on("connection", (socket)=>{
    console.log(`user id:${socket.id}`)
       
        socket.on("join_room", (data)=>{
            socket.join(data)
        })

        socket.on("send_message", (data)=>{
            
            socket.to(data.room).emit("receive_message", data)

          //  socket.broadcast.emit("receive_message", data)
        })
})

server.listen(port, ()=>{
console.log(`http://localhost:${port}`)
}) 