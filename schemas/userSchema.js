const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    photoURL: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
