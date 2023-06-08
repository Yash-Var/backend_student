const express = require("express");
const uuid = require("uuid");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const moment = require("moment");

const app = express();
app.use(express.json());

// Database setup (Assuming MongoDB)
const mongoose = require("mongoose");
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
