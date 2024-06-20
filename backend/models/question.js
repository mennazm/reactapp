const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  grade:{
    type:Number,
    required:true
  }
});

module.exports = mongoose.model("Question", questionSchema); //
