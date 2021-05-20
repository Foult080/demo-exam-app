const mongoose = require("mongoose");
const EventsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  expert: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  students: [
    {
      name: { type: String },
      database: { type: String },
      login: { type: String },
      pass: { type: String },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Events = mongoose.model("events", EventsSchema);