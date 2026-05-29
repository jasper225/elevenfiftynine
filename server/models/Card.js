const mongoose = require("mongoose");
const cardSchema = new mongoose.Schema({
  title:       { type: String, required: true, trim: true },
  list:        { type: mongoose.Schema.Types.ObjectId, ref: "List", required: true },
  course:       { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  dueDate:     Date,
  completed:   { type: Boolean, default: false },
  graded:      { type: Boolean, default: false },
  attachments: [{ filename: String, url: String, uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, uploadedAt: { type: Date, default: Date.now } }],
  archived:    { type: Boolean, default: false },
}, { timestamps: true });
module.exports = mongoose.model("Card", cardSchema);
