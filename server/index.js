const express = require ("express");
const app = express();
const PORT = 4000;
const http = require("http").Server(app);
const cors = require("cors");
const {newUser, getUsers, updateMode, findSocket,getMode,checkHasMode} = require("./users");
app.use(cors());

const io = require("socket.io")(http, {
    cors: {
        origin: "http://localhost:3000"
    }
});

const keys = [];
let net = 0;

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
        const user = newUser(name, key, host, avatar, socket.id);
        if (user.host) {
            socket.to(user.key).emit("host_data",data);
        }
        else {
            socket.to(user.key).emit("player_data",data);
        }
        console.log(name + " is ready to play");
        const usersinroom = getUsers(user.key);
        const mode = getMode(user.key);
        if (usersinroom.length===2) {
            let i = 0;
            while (i<usersinroom.length) {
                if (usersinroom[i].host) {
                    socket.to(user.key).emit("host_data",usersinroom[i]);
                }
                else {
                    socket.to(user.key).emit("player_data",usersinroom[i]);
                }
                i++;
            }
        }
        if (usersinroom.length===2 && mode!=null) {
            socket.to(user.key).emit("ready_two");
            updateMode(mode,user.key);
            socket.to(user.key).emit("player_selection");
            socket.to(user.key).emit("player_mode",mode);
        }
        else if (usersinroom.length===2) {
            socket.to(user.key).emit("ready_two");
        }
    })
    socket.on("drawing", (data) => {
        console.log("received drawing data")
        console.log(data)
        socket.broadcast.emit("drawing", data);
    })

    socket.on("newKey", (data) => {
        keys.push(data);
        let temp = keys;
        socket.emit("newKey", temp);
    })
    socket.on("selection", (data) => {
        const[mode, userkey] = data;
        console.log(socket.id + " has selected a new game mode: " + mode);
        let check = false;
        if (checkHasMode(userkey)) {
            check = true;
        }
        updateMode(mode,userkey);
        socket.to(userkey).emit("player_selection");
        socket.to(userkey).emit("player_mode",mode);
        if (check) {
            socket.to(userkey).emit("ready_two");
        }
    })
    socket.on("retrieve", (data) => {
        const[hostKey, hostAvatar] = data;
        socket.to(hostKey).emit("retrieved", hostAvatar);
        console.log("Host has changed their avatar");
    })
    socket.on("clear", (data) => {
        if (!data[0]){
            console.log("request to clear canvas: invalid mode")
            return;
        }
        console.log("request to clear canvas; game mode: " + data[0] + " ;host: " + data[1])
        socket.broadcast.emit("clear", data);
    })
    
    socket.on("swap", (data) => {
        const[canvasImage, key, ishost] = data;
        console.log("swapping canvas");
        let i = 0;
        const u = getUsers(key);
        while (i<2) {
            if (u[i].host===ishost) {
                u[i].canvas = canvasImage;
                u[i].swapkey = key;
            }
            i++;
        }
        console.log(u[0].swapkey+" " + u[1].swapkey);
        if (u[0].hasOwnProperty("swapkey") && u[1].hasOwnProperty("swapkey") && u[0].swapkey===u[1].swapkey) {
            console.log("canvas swap ready for both players");
            socket.to(key).emit("ready_swap");
        }
    })

    socket.on("swap_fin", (data)=> {
        const[key, ishost] = data;
        let swapdata = "";
        let c = 0;
        while (c<2) {
            if (getUsers(key)[c].host===ishost) {
                swapdata = getUsers(key)[c].canvas;
            }
            c++;
        }
        socket.broadcast.emit("swap", [swapdata, ishost]);
        let temp = 0;
        let count = 0;
        while(temp<2) {
            if (getUsers(key)[temp].host===ishost) {
                getUsers(key)[temp].swapped=true;
            }
            if (getUsers(key)[temp].swapped!=null && getUsers(key)[temp].swapped) {
                count++;
            }

            temp++;
        }
        console.log("finish swapping " +ishost);
        if (count===2) {
            let i = 0;
            while (i<2) {
                getUsers(key)[i].swapkey = i;
                getUsers(key)[i].swapped = false;
                i++;
            }
        }
    })

    socket.on("split_half", (data)=> {
        console.log("two halves assigned")
        socket.broadcast.emit("split_half", data);
    })

    socket.on('disconnect', () => {
        if (net===0) {
            const k = findSocket(socket.id);
            if (k!=-1 && getUsers(k).length===0) {
                keys.splice(keys.indexOf(k),1);
            }
            net++;
        }
    });
})

http.listen(4000, () => {
    console.log(`Server listening on ${PORT}`);
  });