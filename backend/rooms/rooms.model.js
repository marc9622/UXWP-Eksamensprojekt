import * as fs from "fs/promises";
import { createRandomID } from "../utility.js";
const ROOM_FILE = "./rooms/rooms.json";

// return all rooms from file
export async function getAll() {
  try {
    let roomsText = await fs.readFile(ROOM_FILE);
    let rooms = JSON.parse(roomsText);
    return rooms;
  } catch (err) {
    if (err.code === "ENOENT") {
      // file does not exits
      await save([]); // create a new file with empty array
      console.log("No rooms found, returning empty array");
      return []; // return empty array
    } // // cannot handle this exception, so rethrow
    else throw err;
  }
}

// save array of rooms to file
async function save(rooms = []) {
  let roomText = JSON.stringify(rooms);
  await fs.writeFile(ROOM_FILE, roomText);
}

// helper function for roomId
function findRoom(roomArray, roomId) {
  return roomArray.findIndex((currentRoom) => currentRoom.id === roomId);
}

// get room by ID
export async function getByID(roomId) {
  let roomArray = await getAll();
  let index = findRoom(roomArray, roomId);
  if (index === -1) throw new Error(`room with name '${roomId}' doesn't exist`);
  else return roomArray[index];
}

// create a new room
export async function add(newRoom) {
  let room = newRoom;
  room.id = createRandomID("room");
  let roomArray = await getAll();
  if (findRoom(roomArray, newRoom.id) !== -1)
    throw new Error(`room with ID:${newRoom.id} already exists`);
  roomArray.push(newRoom);
  await save(roomArray);
}

// update existing room
export async function update(roomId, room) {
  let roomArray = await getAll();
  let index = findRoom(roomArray, roomId); // findIndex
  if (index === -1) throw new Error(`room with ID:${roomId} does not exist`);
  else {
    roomArray[index] = room;
    await save(roomArray);
  }
}

// delete existing room
export async function remove(roomId) {
  let roomArray = await getAll();
  let index = findRoom(roomArray, roomId); // findIndex
  if (index === -1) throw new Error(`room with ID:${roomId} does not exist`);
  else {
    roomArray.splice(index, 1); // remove room from array
    await save(roomArray);
  }
}
