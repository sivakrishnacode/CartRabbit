import Room from "../model/room.js";
import Booking from "../model/booking.js";
import Customer from '../model/customer.js'

const booking = (req, res) => {
  const { roomId, startDate, endDate, customer } = req.query;

 

  // Check if the room exists
  Room.findById(roomId)
    .then((room) => {
      if (!room) {
        res.status(404).json({ error: 'Room not found' });
      } else {
        // Check if the room is available for the specified dates
        const overlappingBooking = room.bookedDates.find((booking) => {
          return (
            (booking.startDate <= startDate && booking.endDate >= startDate) ||
            (booking.startDate <= endDate && booking.endDate >= endDate) ||
            (booking.startDate >= startDate && booking.endDate <= endDate)
          );
        });

        if (overlappingBooking) {
          res.status(400).json({ error: 'Room is not available for the specified dates' });
        } else {
          // Create a new booking
          const booking = new Booking({
            room: roomId, // Assign roomId to the room field
            startDate,
            endDate,
            customer,
          });

          booking
            .save()
            .then((savedBooking) => {
              // Update room's bookedDates array
              room.bookedDates.push({ startDate, endDate });
              room
                .save()
                .then(() => {
                  res.json(savedBooking);
                })
                .catch((err) => {
                  console.error(err);
                  res.status(500).json({ error: 'Failed to create a booking' });
                });
            })
            .catch((err) => {
              console.error(err);
              res.status(500).json({ error: 'Failed to create a booking' });
            });

          // Find the customer by their ID
          Customer.findById(customer)
            .then((customer) => {
              if (!customer) {
                res.status(404).json({ error: 'Customer not found' });
              } else {
                console.log(customer);
                // Push the new booking (room ID) into the 'bookings' array
                customer.bookedDates.push(roomId);

                // Save the updated customer document
                return customer.save();
              }
            })
            .then((updatedCustomer) => {
              // res.json(updatedCustomer);
            })
            .catch((error) => {
              console.error(error);
              // res.status(500).json({ error: 'Failed to book the room' });
            });
        }
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch room details' });
    });
};

export default booking;
