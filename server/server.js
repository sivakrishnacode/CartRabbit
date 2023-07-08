import "./conf/mongodb.js";
import router from "./router/router.js";

import dotenv from "dotenv";
import express, { json } from "express";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use((req, res, next) => {
  res.append("Access-Control-Allow-Origin", ["*"]);
  res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.append("Access-Control-Allow-Headers", "Content-Type");
  next();
});
app.use(cors());
app.use(json());

app.use("/api", router);

app.listen(3000, () => {
  console.log(`Server Running on PORT:${port}`);
});
