const express  = require("express");
const mongoose = require("mongoose");
const cors     = require("cors");
require("dotenv").config();

const { Question, Result } = require("./models");

const app = express();
app.use(cors());
app.use(express.json());

// QUICK EDIT FOR EXAM:
// - Change DB name/port in backend/.env  (MONGO_URI, PORT)
// - Change sample data in seed.js

async function connectDB() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("MongoDB Connected");
}

// --- QUESTION APIs ---
app.post("/question", async (req, res) => {
  try {
    const b = req.body;
    const question = await Question.create({
      question:      (b.question      || "").trim(),
      option1:       (b.option1       || "").trim(),
      option2:       (b.option2       || "").trim(),
      option3:       (b.option3       || "").trim(),
      option4:       (b.option4       || "").trim(),
      correctAnswer: (b.correctAnswer || "").trim(),
      subject:       (b.subject       || "").trim(),
    });
    res.json(question);
  } catch (err) {
    res.status(400).json({ message: "Could not add question", error: err.message });
  }
});

app.get("/questions", async (req, res) => {
  try {
    // QUICK EDIT FOR EXAM: filter by subject -> Question.find({ subject: "OS" })
    const questions = await Question.find().sort({ createdAt: -1 });
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: "Could not fetch questions" });
  }
});

// --- RESULT APIs ---
// Score calculation happens on the frontend and is sent here for storage
app.post("/result", async (req, res) => {
  try {
    const b = req.body;
    const result = await Result.create({
      studentName:    (b.studentName    || "").trim(),
      subject:        (b.subject        || "").trim(),
      score:          Number(b.score          || 0),
      totalQuestions: Number(b.totalQuestions || 0),
    });
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: "Could not save result", error: err.message });
  }
});

app.get("/results", async (req, res) => {
  try {
    const results = await Result.find().sort({ createdAt: -1 });
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: "Could not fetch results" });
  }
});

// Health check (optional but helpful in exams)
app.get("/", (req, res) => res.send("Online Exam API Running"));

connectDB()
  .then(() => {
    const port = process.env.PORT || 5000;
    app.listen(port, () => console.log("Server running on port", port));
  })
  .catch((err) => {
    console.log("DB connection error:", err.message);
  });
