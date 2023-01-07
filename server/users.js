const users = [];

const newUser = (name, host , key, id, avatar) => {
    const user = {name, host, key, id, avatar};
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

module.exports = {
    newUser,
    getUsers,
    updateMode,
  };
