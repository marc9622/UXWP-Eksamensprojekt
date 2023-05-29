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
        } // // cannot handle this exception, so rethrow
        else throw err;
    }
}

// save array of users to file
async function save(users = []) {
    let userText = JSON.stringify(users);
    await fs.writeFile(USER_FILE, userText);
}

// helper function for userId
function findUser(userArray, userId) {
    return userArray.findIndex((currentuser) => currentuser.id === userId);
}

// get user by ID
export async function getByID(userId) {
    let userArray = await getAll();
    let index = findUser(userArray, userId);
    if (index === -1) throw new Error(`user with name '${userId}' doesn't exist`);
    else return userArray[index];
}

// create a new user
export async function add(newUser) {
    console.log(newUser);
    let user = newUser;
    user.id = createRandomID("user");
    user.books = [];
    user.orders = [];
    user.bookings = []
    let userArray = await getAll();
    if (findUser(userArray, newUser.id) !== -1)
    throw new Error(`user with ID:${newUser.id} already exists`);
    userArray.push(newUser);
    await save(userArray);
    return user
}

// update existing user
export async function update(userId, user) {
    let userArray = await getAll();
    let index = findUser(userArray, userId); // findIndex
    if (index === -1) throw new Error(`User with ID:${userId} does not exist`);
    else {
        userArray[index] = user;
        await save(userArray);
    }
}

// delete existing user
export async function remove(userId) {
    let userArray = await getAll();
    let index = findUser(userArray, userId); // findIndex
    if (index === -1) throw new Error(`user with ID:${userId} does not exist`);
    else {
        userArray.splice(index, 1); // remove user from array
        await save(userArray);
    }
}

export function setRoutings(router) {

    router.post('/user/add', async (request, response) => {
        try {
            const user = request.body;
            const createdUser = await add(user);
            console.log(createdUser);
            response.status(201).json(createdUser);
        } catch (err) {
            console.error(err);
            response.status(500).json({ error: 'Internal Server Error' });
        }
    });

    router.get('/user/:id', async (request, response) => {
        try {
            var user = await getByID(request.params.id);
            response.setHeader('Content-Type', 'application/json');
            console.log(user);
            response.json(user);
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
            response.json(userList);
        } catch (err) {
            // Handle any errors
            console.error(err);
            response.status(500).json({ error: 'Internal Server Error' });
        }
    });

}
