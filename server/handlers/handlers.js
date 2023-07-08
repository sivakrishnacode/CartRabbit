import loginCustomer from "./auth/login.customer.js";
import registerCustomer from "./auth/register.customer.js";

import loginOwner from "./auth/login.owner.js";
import registerOwner from "./auth/register.owner.js";

import createRoom from "./createroom.js";
import updateRoom from "./updateroom.js";
import deleteRoom from "./deleteroom.js";
import getRooms from "./getrooms.js";


import booking from './booking.js'

export default {
  loginOwner,
  registerOwner,
  loginCustomer,
  registerCustomer,

  createRoom,
  updateRoom,
  deleteRoom,
  getRooms,

  booking
};
