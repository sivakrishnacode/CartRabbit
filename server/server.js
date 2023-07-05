import "./conf/mongodb.js";
import router from "./router/router.js";

// import upload from "./handlers/uploadHandler.js";
import dotenv from "dotenv";
import express, { json } from "express";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use((req, res, next) => {
  res.append("Access-Control-Allow-Origin", ["*"]);
  res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.append("Access-Control-Allow-Headers", "Content-Type");
  next();
});
app.use(cors());
app.use(json());

app.use("/api", router);


// app.post('/photos', upload.array('photos', 10), (req, res) => {
//   const { roomId } = req.query;
//   console.log(req.body.photos);
//   const photos = req.files.map((file) => file.filename);

//   // Check if the room exists
//   Room.findById(roomId)
//     .then((room) => {
//       if (!room) {
//         res.status(404).json({ error: 'Room not found' });
//       } else {
//         // Add the photos to the room's photo array
//         room.photos.push(...photos);

//         // Save the updated room document
//         return room.save();
//       }
//     })
//     .then((updatedRoom) => {
//       return res.json({ message: 'uploaded'});
//     })
//     .catch((error) => {
//       console.error(error);
//       res.status(500).json({ error: 'Failed to upload photos' });
//     });
// });

app.listen(3000, () => {
  console.log("Server Running on PORT:3000");
});
