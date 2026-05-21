const mongoose = require("mongoose");
const activitySchema = new mongoose.Schema({
  user:    { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  board:   { type: mongoose.Schema.Types.ObjectId, ref: "Board", required: true },
  card:    { type: mongoose.Schema.Types.ObjectId, ref: "Card" },
  action:  { type: String, required: true },
  payload: mongoose.Schema.Types.Mixed,
}, { timestamps: true });
module.exports = mongoose.model("Activity", activitySchema);
