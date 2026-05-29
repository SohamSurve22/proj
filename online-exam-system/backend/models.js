const mongoose = require("mongoose");

// QUICK EDIT FOR EXAM:
// - Add/remove fields here if your practical question changes.

const QuestionSchema = new mongoose.Schema(
  {
    question:      { type: String, required: true },
    option1:       { type: String, required: true },
    option2:       { type: String, required: true },
    option3:       { type: String, required: true },
    option4:       { type: String, required: true },
    correctAnswer: { type: String, required: true }, // stores "option1" / "option2" / "option3" / "option4"
    subject:       { type: String, required: true },
  },
  { timestamps: true }
);

const ResultSchema = new mongoose.Schema(
  {
    studentName:    { type: String, required: true },
    subject:        { type: String, required: true },
    score:          { type: Number, required: true },
    totalQuestions: { type: Number, required: true },
  },
  { timestamps: true }
);

const Question = mongoose.model("Question", QuestionSchema);
const Result   = mongoose.model("Result",   ResultSchema);

module.exports = { Question, Result };
