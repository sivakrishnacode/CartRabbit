import { Schema, model } from 'mongoose';

const bookingSchema = new Schema({
  room: { type: Schema.Types.ObjectId, ref: 'Room', required: true },
  customer: { type: Schema.Types.ObjectId, ref: 'Customer', required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
});
export default model('Booking', bookingSchema);
