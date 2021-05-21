const mongoose = require("mongoose");
const UsersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    dropDups: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "expert",
  },
  options: {
    host: { type: String, default: "localhost" },
    user: { type: String, default: "root" },
    password: { type: String, default: "root" },
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Users = mongoose.model("users", UsersSchema);
