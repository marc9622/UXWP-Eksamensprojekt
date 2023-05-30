import * as fs from "fs/promises";
import { createRandomID } from "../utility.js";
var BOOKING_FILE = "";


function getBookingFile(UNI_ID){
    console.log(UNI_ID)
    BOOKING_FILE = "./bookings/"+UNI_ID+"_bookings.json";
}
// return all bookings from file
export async function getAll(UNI_ID) {
    try {
        getBookingFile(UNI_ID);
        let bookingsText = await fs.readFile(BOOKING_FILE);
        let bookings = JSON.parse(bookingsText);
        console.log(bookings);
        return bookings;
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
async function save(bookings = []) {
    let bookingsText = JSON.stringify(bookings);
    await fs.writeFile(BOOKING_FILE, bookingsText);
}

// helper function
function findBooking(bookingArray, bookingId) {
    return bookingArray.findIndex((booking) => booking.bookingID === bookingId);
}

// get booking by ID
export async function getByID(bookingId,UNI_ID) {
    getBookingFile(UNI_ID);
    let bookingArray = await getAll(UNI_ID);
    let index = findBooking(bookingArray, bookingId);
    if (index === -1)
    throw new Error(`user with name '${bookingId}' doesn't exist`);
    else return bookingArray[index];
}

// create a new user
export async function add(booking) {
    console.log(booking);
    const newBooking = booking;
    newBooking.id = createRandomID("booking");
    let bookingArray = await getAll();
    if (findBooking(bookingArray, booking.id) !== -1)
    throw new Error(`booking with ID:${booking.id} already exists`);
    bookingArray.push(booking);
    await save(bookingArray);
}

  // delete existing room
export async function remove(UNI_ID,bookingId) {
    let bookingArray = await getAll(UNI_ID);
    let index = findRoom(bookArray, bookingId); // findIndex
    if (index === -1) throw new Error(`room with ID:${bookingId} does not exist`);
    else {
        bookingArray.splice(index, 1); // remove room from array
        await save(bookingArray);
    }
}

export function setRoutings(router) {

    router.get('/:uniID/bookings-list', async (request, response) => {
        try {
            console.log("HELLO");
            console.log(request.params.uniID);
            var bookingList = await getAll(request.params.uniID);
            response.setHeader('Content-Type', 'application/json');
            console.log(bookingList);
            response.json(bookingList);
        } catch (err) {
            // Handle any errors
            console.error(err);
            response.status(500).json({ error: 'Internal Server Error' });
        }
    });

    router.get('/:uniID/bookings/:id', async (request, response) => {
        try {
            const booking = await getByID(request.params.id,request.params.uniID);
            response.setHeader('Content-Type', 'application/json');
            console.log(booking);
            response.json(booking);
        } catch (err) {
            console.error(err);
            response.status(500).json({ error: 'Internal Server Error' });
        }
    });

    router.post('/booking/add', async (request, response) => {
        try {
            const booking = request.body;
            const createdBooking = await add(booking);
            console.log(createdBooking);
            response.status(201).json(createdBooking);
        } catch (err) {
            console.error(err);
            response.status(500).json({ error: 'Internal Server Error' });
        }
    });

    router.delete("/:uniID/bookings/:id", async (request, response) => {
        try {
          await remove(request.params.uniID,request.params.id);
          response.status(204).end();
        } catch (err) {
          console.error(err);
          response.status(500).json({ error: "Internal Server Error" });
        }
      });
}
