const express = require ('express');
const app = express();
const http = require('http');
const cors = require('cors');
const path = require('path');
const { Server } = require('socket.io');
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:4000",
    },
});

io.on("connection", (socket) => {
    console.log("User connected");
    socket.on("join_room", (key) => {
        socket.join(key);
    })
    socket.on("user_join", (data) => {
        const{name, key, host} = data;
        const user = newUser(name, host, key, socket.id);
    })
    if (getUsers.length===2) {
        socket.emit("ready_two");
        console.log("Both players ready");
    }
})