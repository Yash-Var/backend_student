const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  universityID: String,
  password: String,
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
