const mongoose = require("mongoose");
const boardSchema = new mongoose.Schema({
  title:       { type: String, required: true, trim: true },
  description: String,
  workspace:   { type: mongoose.Schema.Types.ObjectId, ref: "Workspace", required: true },
  owner:       { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  members: [{ user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, role: { type: String, enum: ["admin","member","viewer"], default: "member" } }],
  background:  { type: String, default: "#0052cc" },
  visibility:  { type: String, enum: ["private","workspace","public"], default: "workspace" },
  starred:     [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  archived:    { type: Boolean, default: false },
}, { timestamps: true });
module.exports = mongoose.model("Board", boardSchema);
