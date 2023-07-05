import { Schema, model } from 'mongoose';

const customerSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  bookedDates: [{ startDate: { type: Date }, endDate: { type: Date } }],
});

export default model('customer', customerSchema);
