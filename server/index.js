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

const keys = [];

io.on("connection", (socket) => {
    socket.on("join_room", (key) => {
        console.log(socket.id + " has joined room " + key);
        if (!keys.includes(key)) {
            keys.push(key);
        }
        socket.join(key);
    })
    socket.on("user_join", (data) => {
        const{name, key, host} = data;
        const user = newUser(name, host, key, socket.id);
        console.log(name + " is ready to play");
        if (getUsers(user.key).length===2) {
            socket.to(user.key).emit("ready_two");
            console.log("Both players ready");
        }
    })
    socket.on("mouse", (data) => {
        console.log("received mouse data");
        console.log(data)
        socket.broadcast.emit('mouse', data);
    })
    socket.on("newKey", (data) => {
        keys.push(data);
        let temp = keys;
        socket.emit("newKey", temp);
    })

    
})

http.listen(4000, () => {
    console.log(`Server listening on ${PORT}`);
  });