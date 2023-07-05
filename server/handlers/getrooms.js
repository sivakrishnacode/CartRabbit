import Room from '../model/room.js'

const getRooms = (req, res) => {
  
  Room.find()
    .then((rooms) => {
      res.json(rooms);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Failed to fetch rooms" });
    });
};

export default getRooms