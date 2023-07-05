import { Schema, model } from 'mongoose';

const ownerSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  mobileNumber: { type: String, required: true },
});

export default model('owner', ownerSchema);
