const express = require ('express');
const app = express();
const http = require('http');
const cors = require('cors');
const path = require('path');
const { newUser, disconnectedUser } = require("./users");
const { Server } = require('socket.io');
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:4000",
    },
});

express.static(path.join(__dirname,'..','client','form.js'));

io.on("connection", (socket) => {
    console.log('User connected');
    socket.on("join_room",(data) => {
        const {username, room} = data;
        newUser(socket.id, username, room);
        socket.join(user.room);
        console.log(`${user.username} has joined the room`);
    });
    socket.on('disconnect', () => {
        disconnectedUser(socket.id);
        console.log('User disconnected');
    });
});

server.listen(3000, () => {
    console.log('Server running');
})

