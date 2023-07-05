import mongoose from "mongoose";
import { config } from "dotenv";

config();

// We need to define the URL
const CONNECTION_URL = process.env.MONGODB_URI;
const DATABASE_NAME = process.env.DATABASE_NAME || "Clustor0";

//Connection establishment
mongoose.connect(CONNECTION_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

// enabled the Listener
db.on("error", () => {
  console.error("Error occured in db connection");
});

db.on("open", () => {
  console.log(`DB Connection with ${DATABASE_NAME} established successfully`);
});
