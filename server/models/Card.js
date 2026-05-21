const mongoose = require("mongoose");
const cardSchema = new mongoose.Schema({
  title:       { type: String, required: true, trim: true },
  description: String,
  list:        { type: mongoose.Schema.Types.ObjectId, ref: "List", required: true },
  board:       { type: mongoose.Schema.Types.ObjectId, ref: "Board", required: true },
  position:    { type: Number, required: true },
  members:     [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  labels:      [{ text: String, color: String }],
  dueDate:     Date,
  completed:   { type: Boolean, default: false },
  checklists:  [{ title: String, items: [{ text: String, checked: { type: Boolean, default: false } }] }],
  attachments: [{ filename: String, url: String, uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, uploadedAt: { type: Date, default: Date.now } }],
  comments:    [{ user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, text: String, createdAt: { type: Date, default: Date.now } }],
  archived:    { type: Boolean, default: false },
}, { timestamps: true });
module.exports = mongoose.model("Card", cardSchema);
