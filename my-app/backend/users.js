const users = []

const newUser = (userId, name, room) => {
    const user = {id, name, room};
    users.push(user);
    return user;
}

const disconnectedUser = (userId) => {
    for (var i = 0; i<users.length; i++) {
        if (users[i].userId===userId) {
            users.splice(i,1);
        }
    }
}
