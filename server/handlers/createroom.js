import Room from "../model/room.js";

const createRoom = (req, res) => {
  const {
    name,
    description,
    noofbeds,
    amenities,
    rentAmount,
    minimumBookingPeriod,
    maximumBookingPeriod,
    photos,
    ownerId,
  } = req.query;

  const room = new Room({
    name,
    description,
    noofbeds,
    amenities,
    rentAmount,
    minimumBookingPeriod,
    maximumBookingPeriod,
    ownerId,
  });

  room
    .save()
    .then((savedRoom) => {
      res.json({savedRoom, message: 'Room Created Succesfully'});
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Failed to create a room" });
    });
};

export default createRoom;
