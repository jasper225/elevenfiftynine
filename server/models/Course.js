const mongoose = require("mongoose");
const courseSchema = new mongoose.Schema({
  title:       { type: String, required: true, trim: true },
  semester:   { type: mongoose.Schema.Types.ObjectId, ref: "Semester", required: true },
  user:       { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });
module.exports = mongoose.model("Course", courseSchema);
