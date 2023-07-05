import Owner from "../model/owner.js";
import jwt from 'jsonwebtoken'

// Middleware to authenticate owner
function authenticateOwner(req, res, next) {
  const token = req.headers.apikey;

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      res.status(401).json({ error: "Invalid token" });
    } else {
      const ownerId = decoded.id;

      // Find the owner by ID
      Owner.findById(ownerId)
        .then((owner) => {
          if (!owner) {
            res.status(404).json({ error: "Owner not found" });
          } else {
            req.owner = owner;
            console.log('valid user');
            next();
          }
        })
        .catch((err) => {
          console.error(err);
          res.status(500).json({ error: "Failed to fetch owner details" });
        });
    }
  });
}

export default authenticateOwner;
