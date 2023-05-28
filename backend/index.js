import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import fs from "fs";
import { createRandomID } from "./utility.js";

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

app.get("/clientlist/getusers", (req, res) => {
  const results = clients.getAll().then((results) =>{
    res.status(200).send(results);
  });
});

app.get('/unilist', (_, res) => {
    res.status(200).send(
        // Test data
        JSON.stringify([
            {id: 'itu', name: 'IT-Universitetet i København'},
            {id: 'dtu', name: 'Danmarks Tekniske Universitet'},
            {id: 'cbs', name: 'Copenhagen Business School'},
            {id: 'ku',  name: 'Københavns Universitet'},
        ])
    )
});

app.get('/uni/:uniId/roomlist', (req, res) => {
    res.status(200).send(
        // Test data
        JSON.stringify([
            {id: 'aud1', name: 'Auditorium 1'},
            {id: 'aud2', name: 'Auditorium 2'},
            {id: 'aud3', name: 'Auditorium 3'},
            {id: 'room1', name: 'Room 1'},
            {id: 'room2', name: 'Room 2'},
            {id: 'room3', name: 'Room 3'},
        ])
    )
});
app.get('/uni/:uniId/room/:roomId', (req, res) => {
    res.status(200).send(
        // Test data
        JSON.stringify({
            facilities: {
                chairs: 12,
                powerOutlets: 12,
                isFoodAllowed: false,
                hasScreen: true,
                hasCamera: false,
                hasProjector: true,
                hasWhiteboard: true,
            },
            bookings: {
                today: [
                    {
                        id: 0,
                        startTimeHour: 10,
                        startTimeMinute: 30,
                        endTimeHour: 12,
                        endTimeMinute: 30,
                    },
                    {
                        id: 1,
                        startTimeHour: 13,
                        startTimeMinute: 0,
                        endTimeHour: 14,
                        endTimeMinute: 30,
                    },
                    {
                        id: 2,
                        startTimeHour: 16,
                        startTimeMinute: 0,
                        endTimeHour: 18,
                        endTimeMinute: 0,
                    }
                ],
                thisMonth: [
                    {
                        date: 27,
                        bookedAmount: "fully",
                    },
                    {
                        date: 28,
                        bookedAmount: "half",
                    },
                    {
                        date: 29,
                        bookedAmount: "not",
                    },
                    {
                        date: 30,
                        bookedAmount: "nearly",
                    },
                ],
            },
        })
    )
});

app.get("/clientlist/getbyid/:id", (req,res)=>{
  const clientId = req.params.id;
  const reqClient = clients.getById(clientId);
 // const result = JSON.parse(reqClient);
  res.status(200).send(reqClient);

  

})

app.post("/clientlist/add", (req,res)=>{
  
})

app.delete("/clientlist/delete", (req,res)=>{
  
})

app.delete("/clientlist/delete", (req,res)=>{
  
})

// ^JERES KODE HER^

app.listen(PORT, function (err) {
    if (err) console.log("Error in server setup");
    console.log("Server listening on Port", PORT);
});
