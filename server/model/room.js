import { Schema, model } from 'mongoose';


const roomSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  noofbeds: {type: String},
  amenities: [{ type: String }],
  rentAmount: { type: Number, required: true },
  minimumBookingPeriod: { type: Number, required: true },
  maximumBookingPeriod: { type: Number, required: true },
  bookedDates: [{ startDate: { type: Date }, endDate: { type: Date } }],
  ownerId: { type: Schema.Types.ObjectId, ref: 'Owner' },
  photos: [{ type: String }],
});

export default model('Room', roomSchema);
