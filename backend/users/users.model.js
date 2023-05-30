import * as fs from "fs/promises";
import { createRandomID } from "../utility.js";
const USER_FILE = "./users/users.json";

// return all users from file
export async function getAll() {
    try {
        let usersText = await fs.readFile(USER_FILE);
        let users = JSON.parse(usersText);
        return users;
    } catch (err) {
        if (err.code === "ENOENT") {
            // file does not exits
            await save([]); // create a new file with empty array
            console.log("No users found, returning empty array");
            return []; // return empty array
        }
        // cannot handle this exception, so rethrow
        else throw err;
    }
}

// save array of users to file
async function save(users = []) {
    let userText = JSON.stringify(users);
    await fs.writeFile(USER_FILE, userText);
}

// helper function for userId
function findUser(userArray, username) {
    return userArray.findIndex(currentuser => currentuser.username === username);
}

// get user by usersame
export async function getByUsername(username) {
    let userArray = await getAll();
    let index = findUser(userArray, username);
    if (index === -1) throw new Error(`User with name '${userId}' doesn't exist`);
    else return userArray[index];
}

// create a new user
export async function add(newUser) {
    console.log(newUser);
    let userArray = await getAll();
    if (findUser(userArray, newUser.username) !== -1) throw new Error(`User with usersame:${newUser.username} already exists`);
    userArray.push(newUser);
    await save(userArray);
    return newUser;
}

// update existing user
export async function update(username, user) {
    let userArray = await getAll();
    let index = findUser(userArray, username);
    if (index === -1) throw new Error(`User with username:${user.username} does not exist`);
    else {
        userArray[index] = user;
        await save(userArray);
    }
}

// delete existing user
export async function remove(username) {
    const userArray = await getAll();
    const index = findUser(userArray, username);
    if (index === -1) throw new Error(`User with username:${username} does not exist`);
    else {
        const user = userArray[index];
        userArray.splice(index, 1);
        await save(userArray);
        return user;
    }
}

export function setRoutings(router) {

    router.post('/user/:username/:password', async (request, response) => {
        try {
            const user = await add({username: request.params.username, password: request.params.password, role: 'user'});
            const responseUser = {username: user.username, role: user.role};
            console.log(responseUser);
            response.status(200).json(responseUser);
        } catch (err) {
            console.error(err);
            response.status(500).json({ error: 'Internal Server Error' });
        }
    });

    router.delete('/user/:username', async (request, response) => {
        try {
            const user = await remove(request.params.username);
            const responseUser = {username: user.username, role: user.role};
            console.log(responseUser);
            response.status(200).json(responseUser);
        } catch (err) {
            console.error(err);
            response.status(500).json({ error: 'Internal Server Error' });
        }
    });

    router.get('/user/:username/:password', async (request, response) => {
        try {
            const user = await getByUsername(request.params.username);
            if (user.password !== request.params.password) return null;
            const responseUser = {username: user.username, role: user.role}
            response.setHeader('Content-Type', 'application/json');
            console.log(responseUser);
            response.status(200).json(responseUser);
        } catch (err) {
            // Handle any errors
            console.error(err);
            response.status(500).json({ error: 'Internal Server Error' });
        }
    });

    router.get('/users-list', async (request, response) => {
        try {
            var userList = await getAll();
            response.setHeader('Content-Type', 'application/json');
            console.log(userList);
            response.status(200).json(userList);
        } catch (err) {
            // Handle any errors
            console.error(err);
            response.status(500).json({ error: 'Internal Server Error' });
        }
    });

}
