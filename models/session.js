const mongoose = require("mongoose");

const Session = mongoose.model("Session", {
  student: String,
  dean: String,
  startTime: Date,
  booked: Boolean,
});

module.exports = Session;
