const express = require ('express');
const app = express();
const PORT = 4000;
const http = require('http').Server(app);
const cors = require('cors');
const {newUser, getUsers, updateMode} = require("./users");
const e = require('express');
app.use(cors());

const io = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000"
    }
});

const keys = [];

io.on("connection", (socket) => {
    socket.on("join_room", (key) => {
        socket.join(key);
        console.log(socket.id + " has joined room " + key);
        if (!keys.includes(key)) {
            keys.push(key);
        }
    })
    socket.on("user_join", (data) => {
        const{name, key, host, avatar} = data;
        const user = newUser(name, key, host, avatar);
        if (user.host) {
            socket.to(user.key).emit("host_data",data);
        }
        else {
            socket.to(user.key).emit("player_data",data);
        }
        console.log(name + " is ready to play");
        if (getUsers(user.key).length===2 && getUsers(user.key)[0].mode!=null) {
            socket.to(user.key).emit("ready_two");
            updateMode(getUsers(user.key)[0].mode,user.key);
            socket.to(user.key).emit("player_selection");
            socket.to(user.key).emit("player_mode",getUsers(user.key)[0].mode);
        }
        else if (getUsers(user.key).length===2) {
            socket.to(user.key).emit("ready_two");
            socket.to(user.key).emit("host_data",getUsers(user.key)[0]);
            }
        })
    socket.on("mouse", (data) => {
        // console.log("received mouse data");
        socket.broadcast.emit('mouse', data);
    })
    socket.on("newKey", (data) => {
        keys.push(data);
        let temp = keys;
        socket.emit("newKey", temp);
    })
    socket.on("selection", (data) => {
        const[mode, userkey] = data;
        console.log(socket.id + " has selected a new game mode: " + mode);
        updateMode(mode,userkey);
        socket.to(userkey).emit("player_selection");
        socket.to(userkey).emit("player_mode",mode);
    })
    socket.on("retrieve", (data)=> {
        const[hostKey, hostAvatar] = data;
        socket.to(hostKey).emit("retrieved", hostAvatar);
        console.log("Host has changed their avatar");
    })
})

http.listen(4000, () => {
    console.log(`Server listening on ${PORT}`);
  });