const mongoose = require("mongoose");

const FAQSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  question_hi: { type: String },
  question_bn: { type: String },
  question_od: { type: String }  
});

module.exports = mongoose.model("FAQ", FAQSchema);
