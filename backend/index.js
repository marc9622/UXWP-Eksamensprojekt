import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import * as users from "./users/users.model.js"
import * as rooms from "./rooms/rooms.model.js"
import * as bookings from './bookings/bookings.model.js'
import * as unis from "./Institution/Institutions.model.js"

const app = express();
const PORT = 3001; // fetch url: localhost:3001
const router = express.Router();

app.use(express.json());
app.use(cors());
app.use(fileUpload());
app.use(express.static("public"));
app.use("/images", express.static("images"));
app.use(router);


router.get('/unis-list', async (request, response) => {
  try {
    var uniList = await unis.getAll();
    response.setHeader('Content-Type', 'application/json');
    console.log(uniList);
    response.json(uniList);
  } catch (err) {
    // Handle any errors
    console.error(err);
    response.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/rooms-list', async (request, response) => {
  try {
    var roomList = await rooms.getAll();
    response.setHeader('Content-Type', 'application/json');
    console.log(roomList);
    response.json(roomList);
  } catch (err) {
    // Handle any errors
    console.error(err);
    response.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/bookings-list', async (request, response) => {
  try {
    var bookingList = await bookings.getAll();
    response.setHeader('Content-Type', 'application/json');
    console.log(bookingList);
    response.json(bookingList);
  } catch (err) {
    // Handle any errors
    console.error(err);
    response.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/users-list', async (request, response) => {
  try {
    var userList = await users.getAll();
    response.setHeader('Content-Type', 'application/json');
    console.log(userList);
    response.json(userList);
  } catch (err) {
    // Handle any errors
    console.error(err);
    response.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/user/:id', async (request, response) => {
  try {
    var user = await users.getByID(request.params.id);
    response.setHeader('Content-Type', 'application/json');
    console.log(user);
    response.json(user);
  } catch (err) {
    // Handle any errors
    console.error(err);
    response.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/room/:id', async (request, response) => {
  try {
    var room = await rooms.getByID(request.params.id);
    response.setHeader('Content-Type', 'application/json');
    console.log(room);
    response.json(room);
  } catch (err) {
    // Handle any errors
    console.error(err);
    response.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/unis/:id', async (request, response) => {
  try {
    const uni = await unis.getByID(request.params.id);
    response.setHeader('Content-Type', 'application/json');
    console.log(uni);
    response.json(uni);
  } catch (err) {
    console.error(err);
    response.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/bookings/:id', async (request, response) => {
  try {
    const booking = await bookings.getByID(request.params.id);
    response.setHeader('Content-Type', 'application/json');
    console.log(booking);
    response.json(booking);
  } catch (err) {
    console.error(err);
    response.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/user/add', async (request, response) => {
  try {
    const user = request.body;
    const createdUser = await users.add(user);
    console.log(createdUser);
    response.status(201).json(createdUser);
  } catch (err) {
    console.error(err);
    response.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/room/add', async (request, response) => {
  try {
    const room = request.body;
    const createdRoom = await rooms.add(room);
    console.log(createdRoom);
    response.status(201).json(createdRoom);
  } catch (err) {
    console.error(err);
    response.status(500).json({ error: 'Internal Server Error' });
  }
});


router.post('/booking/add', async (request, response) => {
  try {
    const booking = request.body;
    const createdBooking = await bookings.add(booking);
    console.log(createdBooking);
    response.status(201).json(createdBooking);
  } catch (err) {
    console.error(err);
    response.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/uni/add', async (request, response) => {
  try {
    const uni = request.body;
    const createdUni = await unis.add(uni);
    console.log(createdUni);
    response.status(201).json(createdUni);
  } catch (err) {
    console.error(err);
    response.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, function (err) {
  if (err) console.log("Error in server setup");
  console.log("Server listening on Port", PORT);
});