const express = require("express");
const uuid = require("uuid");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const moment = require("moment");
const connectDB = require("./db/connect");
const app = express();
app.use(express.json());

// Database setup (Assuming MongoDB)
const mongoose = require("mongoose");
const User = require("./models/user");
const Session = require("./models/session");

// Generate JWT token
function generateToken(user) {
  const payload = {
    id: user._id,
    universityID: user.universityID,
  };
  return jwt.sign(payload, "secret-key", { expiresIn: "1h" });
}

// Middleware to authenticate requests
function authenticate(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, "secret-key", (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = decoded;
    next();
  });
}
app.post("/signup/student", async (req, res) => {
  const { universityID, password } = req.body;
  console.log(req.body);
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ universityID });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Create a new user
    const newUser = new User({
      universityID,
      password,
    });

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newUser.password, salt);

    // Save the hashed password
    newUser.password = hashedPassword;

    // Save the user to the database
    const savedUser = await newUser.save();

    // Generate token
    const token = generateToken(savedUser);

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: `An error occurred ${error}` });
  }
});

app.post("/login/student", async (req, res) => {
  const { universityID, password } = req.body;

  // Check if user exists
  const user = await User.findOne({ universityID });
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Check password
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Generate token
  const token = generateToken(user);

  res.json({ token });
});

const port = 3000;
const start = async () => {
  try {
    await connectDB(
      "mongodb+srv://varshney:Sj55888@cluster0.jqzobx2.mongodb.net/)backend?retryWrites=true&w=majority"
    );
    app.listen(port, () => {
      console.log(`server is listenning on ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
