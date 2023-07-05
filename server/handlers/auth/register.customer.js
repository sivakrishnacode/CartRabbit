import Customer from '../../model/customer.js'
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const registerCustomer = (req, res) => {
  const { username, password, email, mobileNumber } = req.query;

  // Hash the password
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to register a customer" });
    } else {
      // Create a new customer
      const customer = new Customer({
        username,
        password: hashedPassword,
        email,
        mobileNumber
      });

      customer
        .save()
        .then((savedCustomer) => {
          const id = savedCustomer._id;
          const token = jwt.sign({ id }, process.env.JWT_SECRET);
          res.json({ customer: savedCustomer, token , message :'Register Succesfully'});
        })
        .catch((err) => {
          console.error(err);
          res.status(500).json({ error: "Failed to register a customer" });
        });
    }
  });
}

export default registerCustomer
