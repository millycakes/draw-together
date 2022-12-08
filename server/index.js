const express = require ('express');
const app = express();
const PORT = 4000;
const http = require('http').Server(app);
const cors = require('cors');
const {newUser, getUsers} = require("./users");
app.use(cors());

const io = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000"

    }
});

io.on("connection", (socket) => {
    console.log("User connected");
    socket.on("join_room", (key) => {
        console.log(socket.id + " has joined the room");
        socket.join(key);
    })
    socket.on("user_join", (data) => {
        const{name, key, host} = data;
        const user = newUser(name, host, key, socket.id);
        console.log(name + " is ready to play");
    })
    if (getUsers.length===2) {
        socket.emit("ready_two");
        console.log("Both players ready");
    }
})

http.listen(4000, () => {
    console.log(`Server listening on ${PORT}`);
  });