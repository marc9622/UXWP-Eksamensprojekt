import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import { setRoutings as setUsersRoutings } from "./users/users.model.js"
import { setRoutings as setInstitutionsRoutings } from "./institutions/institutions.model.js"
import { setRoutings as setRoomsRoutings } from "./rooms/rooms.model.js"
import { setRoutings as setBookingsRoutings } from "./bookings/bookings.model.js"

const app = express();
const PORT = 3001; // fetch url: localhost:3001
const router = express.Router();

app.use(express.json());
app.use(cors());
app.use(fileUpload());
app.use(express.static("public"));
app.use("/images", express.static("images"));
app.use(router);

setUsersRoutings(router);
setInstitutionsRoutings(router);
setRoomsRoutings(router);
setBookingsRoutings(router);

app.listen(PORT, function (err) {
    if (err) console.log("Error in server setup");
    console.log("Server listening on Port", PORT);
});
