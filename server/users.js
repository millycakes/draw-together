const users = []

const newUser = (name, host , key, id) => {
    const user = {name, host, key, id};
    users.push(user);
    return user;
}

const getUsers = () => {
    return users;
}
