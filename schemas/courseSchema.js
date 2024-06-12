const mongoose = require("mongoose");

const CourseSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  content: [
    {
      type: Schema.Types.Mixed,
    },
  ],
});

module.exports = mongoose.model("Course", CourseSchema);
