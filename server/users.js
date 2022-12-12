const users = [];

const newUser = (name, host , key, id) => {
    const user = {name, host, key, id};
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

module.exports = {
    newUser,
    getUsers,
  };
