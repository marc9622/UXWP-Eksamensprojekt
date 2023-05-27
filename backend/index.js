import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import { createRandomID } from "./utility.js";
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


router.get('/unilist', async (request, response) => {
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


router.get('/', (request, response) => {
  response.sendFile('C:/Users/mohdh/IdeaProjects/UXWP-Eksamensprojekt/backend/side.html');
});



app.listen(PORT, function (err) {
  if (err) console.log("Error in server setup");
  console.log("Server listening on Port", PORT);
});
