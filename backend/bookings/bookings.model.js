import * as fs from "fs/promises";
import { createRandomID } from "../utility.js";
const BOOKING_FILE = "./bookings/bookings.json";

// return all bookings from file
export async function getAll() {
  try {
    let bookingsText = await fs.readFile(BOOKING_FILE);
    let bookings = JSON.parse(bookingsText);
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
  return bookingArray.findIndex((booking) => booking.id === bookingId);
}

// get booking by ID
export async function getByID(bookingId) {
  let bookingArray = await getAll();
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
