import * as fs from "fs/promises";
import { createRandomID } from "../utility.js";
const CLIENTS_FILE = "./clients/clients.json";


async function save(clients = []) {
    let clientText = JSON.stringify(clients.clients);
    await fs.writeFile(CLIENTS_FILE, clientText);
}

export async function getAll() {
    try {
        let clientsText = await fs.readFile(CLIENTS_FILE);
        let clients = JSON.parse(clientsText);
        return clients;
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

export async function getById(clientId) {
    let clientArray = await getAll();
    let index = findClient(clientArray, clientId);
    if (index === -1)
      throw new Error(`user with name '${clientId}' doesn't exist`);
    else return clientArray[index];
}

//aduser
export async function add(client) {
    const newClient = client;
    newClient.id = createRandomID("client");
    let clientArray = await getAll();
    if (findClient(clientArray, client.id) !== -1)
      throw new Error(`client with ID:${client.id} already exists`);
      clientArray.push(client);
    await save(clientArray);
}

  
//deleteuser
export async function remove(clientId) {
    let clientArray = await getAll();
    let index = findClient(clientArray, clientId); // findIndex
    if (index === -1) throw new Error(`client with ID:${clientId} does not exist`);
    else {
      clientArray.splice(index, 1); // remove client from array
      await save(clientArray);
    }
  }

//updateuser
export async function update(clientId, client) {
  let clientArray = await getAll();
  let index = findClient(clientArray, clientId); // findIndex
  if (index === -1) throw new Error(`client with ID:${clientId} does not exist`);
  else {
    clientArray[index] = client;
    await save(clientArray);
  }
}

//helper function
function findClient(clientArray, clientId) {
    
   // const foundClient = clientArray.find(clientId)
    //return clientArray.findIndex((client) => clientId.id === clientId);
}
