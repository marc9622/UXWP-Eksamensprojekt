import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import fs from "fs";
import { createRandomID } from "./utility.js";
import * as users from "./users/users.model.js";
import * as rooms from "./rooms/rooms.model.js";
import * as bookings from './bookings/bookings.model.js';
import * as clients  from './clients/clients.model.js';

const app = express();
const PORT = 3001; // fetch url: localhost:3001

app.use(express.json());
app.use(cors());
app.use(fileUpload());
app.use(express.static("public"));
app.use("/images", express.static("images"));

app.post("/upload", (request, response) => {
  
  // Get the file that was set to our field named "image"
  console.log(request.files);
  const { file } = request.files;

  // If no image submitted, exit
  if (!file) return response.sendStatus(400);

  // Move the uploaded image to our upload folder
  const fileName = createRandomID("book") + file.name;
  file.mv("./images/" + fileName);
  response.send(
    JSON.stringify({
      status: 200,
      body: { imagePath: `http://localhost:${PORT}/images/${fileName}` },
    })
  );
});


// vJERES KODE HERv
const clientPath = "clients/clients.json";
let clientData = fs.readFileSync(clientPath);
let clientJSON = JSON.parse(clientData);

app.get("/clientlist", (req, res) => {
  const result = clientJSON.clients;
  res.status(200).send(result);
});

// ^JERES KODE HER^

app.listen(PORT, function (err) {
  if (err) console.log("Error in server setup");
  console.log("Server listening on Port", PORT);
});
