const mongoose = require("mongoose");
const listSchema = new mongoose.Schema({
  title:    { type: String, required: true, trim: true },
  course:    { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  cards:     [{ type: mongoose.Schema.Types.ObjectId, ref: "Card" }],
}, { timestamps: true });
module.exports = mongoose.model("List", listSchema);
