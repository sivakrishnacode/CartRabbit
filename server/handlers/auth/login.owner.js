import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Owner from '../../model/owner.js'
import dotenv from 'dotenv'
dotenv.config()

const loginOwner = (req, res) => {
  const { username, password } = req.query;
  console.log(username);

  // Find the owner by username
  Owner.findOne({ username })
    .then((owner) => {
      console.log(owner);
      if (!owner) {
        res.status(404).json({ error: "Invalid username or password" });
      } else {
        // Compare the passwords
        bcrypt.compare(password, owner.password, (err, result) => {
          if (err || !result) {
            res.status(404).json({ error: "Invalid username or password" });
          } else {
            const id = owner._id;
            const token = jwt.sign({ id }, process.env.JWT_SECRET);
            res.json({ owner, token, message: 'Login Succesfully' });
          }
        });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Failed to log in as an owner" });
    });
};

export default loginOwner;
