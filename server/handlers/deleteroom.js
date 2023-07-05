import Room from "../model/room.js";

const deleteRoom = (req, res) => {
  const { roomId } = req.query;

  Room.findByIdAndRemove(roomId)
    .then((deletedRoom) => {
      if (!deletedRoom) {
        res.status(404).json({ error: 'Room not found' });
        return;
      }

      res.json({ message: 'Room deleted successfully' });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Failed to delete the room' });
    });
};

export default deleteRoom;
