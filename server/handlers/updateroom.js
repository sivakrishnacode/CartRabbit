import Room from "../model/room.js";

const updateRoom = (req, res) => {
  const { name, description, rentAmount, noofbeds, minimumBookingPeriod, maximumBookingPeriod, amenities } = req.query;
  const { roomId } = req.query;

  Room.findByIdAndUpdate(
    roomId,
    {
      name,
      description,
      rentAmount,
      noofbeds,
      minimumBookingPeriod,
      maximumBookingPeriod,
      amenities,
    },
    { new: true }
  )
    .then((updatedRoom) => {
      res.json({updatedRoom, message: 'Room Updated Succesfully'});
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Failed to update the room' });
    });
}

export default updateRoom;
