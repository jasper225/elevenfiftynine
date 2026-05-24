const mongoose = require("mongoose");
const semesterSchema = new mongoose.Schema({
  name:        { type: String, required: true, trim: true },
  description: String,
  owner:       { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  members: [{ user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, role: { type: String, enum: ["owner","admin","member"], default: "member" } }],
  logo:        String,
  slug:        { type: String, unique: true },
}, { timestamps: true });
module.exports = mongoose.model("Semester", semesterSchema);
