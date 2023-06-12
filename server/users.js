const users = [];

const newUser = (name, key, host, avatar, socket) => {
    const user = {name, key, host, avatar, socket};
    users.push(user);
    return user;
}

const getUsers = (matchkey) => {
    const temp = []
    for (let i = 0; i<users.length; i++) {
        if (users[i].key===matchkey) {
            temp.push(users[i]);
        } 
    }
    return temp;
}

const updateMode = (mode, userkey) => {
    for (let i = 0; i<users.length; i++) {
        if (users[i].key===userkey) {
            users[i].mode = mode;
        } 
    }
}

const findSocket = (socketid) => {
    for (let i = 0; i<users.length;i++) {
        if (users[i].socket===socketid) {
            users.splice(i,1);
            return users[i].key;
        }
    }
}



module.exports = {
    newUser,
    getUsers,
    updateMode,
    findSocket
  };
