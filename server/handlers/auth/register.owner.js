import Owner from "../../model/owner.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const registerOwner = (req, res) => {
  const { username, password, email, mobileNumber} = req.query;
  console.log(username, password );

  // Hash the password
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to register an owner" });
    } else {
      // Create a new owner
      const owner = new Owner({
        username,
        password: hashedPassword,
        email,
        mobileNumber
      });

      owner
        .save()
        .then((savedOwner) => {
          const id = savedOwner._id;
          const token = jwt.sign({ id }, process.env.JWT_SECRET);
          res.json({ owner: savedOwner, token , message : 'Register Succesfully' });
        })
        .catch((err) => {
          console.error(err);
          res.status(500).json({ error: "Failed to register an owner" });
        });
    }
  });
};

export default registerOwner;
