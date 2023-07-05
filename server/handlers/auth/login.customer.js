import bcrypt from "bcrypt";
import Customer from "../../model/customer.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const loginCustomer = (req, res) => {
  const { username, password } = req.query;

  // Find the customer by username
  Customer.findOne({ username })
    .then((customer) => {
      if (!customer) {
        res.status(404).json({ error: "Invalid username or password" });
      } else {
        // Compare the passwords
        bcrypt.compare(password, customer.password, (err, result) => {
          if (err || !result) {
            res.status(404).json({ error: "Invalid username or password" });
          } else {
            const id = customer._id;
            const token = jwt.sign({ id }, process.env.JWT_SECRET);
            res.json({ customer, token , message :'Login Succesfully'});
          }
        });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Failed to log in as a customer" });
    });
};

export default loginCustomer;
