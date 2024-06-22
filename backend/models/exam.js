const mongoose = require("mongoose");

const examSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  questions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
    },
  ],
  status: {
    type: String,
    enum: ['available', 'unavailable'],
    default: 'unavailable',
  },
  score:{
    type: Number,
    required: true,
  }
});

const Exam = mongoose.model("Exam", examSchema);
module.exports = Exam;
