const mongoose = require("mongoose");

// Define the session schema
const sessionSchema = new mongoose.Schema({
  student: String,
  dean: String,
  startTime: Date,
  booked: Boolean,
});

// Create the Session model using the schema
const Session = mongoose.model("Session", sessionSchema);

module.exports = Session;
