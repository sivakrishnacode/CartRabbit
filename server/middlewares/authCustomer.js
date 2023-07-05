import jwt from 'jsonwebtoken'
import Customer from '../model/customer.js'
import dotenv from 'dotenv'
dotenv.config()

// Middleware to authenticate customer
function authenticateCustomer(req, res, next) {
  const token = req.headers.apikey;

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      res.status(401).json({ error: "Invalid token" });
    } else {
      const customerId = decoded.id;

      // Find the customer by ID
      Customer.findById(customerId)
        .then((customer) => {
          if (!customer) {
            res.status(404).json({ error: "Customer not found" });
          } else {
            req.customer = customer;
            console.log('Customer Valid');
            next();
          }
        })
        .catch((err) => {
          console.error(err);
          res.status(500).json({ error: "Failed to fetch customer details" });
        });
    }
  });
}

export default authenticateCustomer;
