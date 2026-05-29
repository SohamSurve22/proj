const express  = require("express");
const mongoose = require("mongoose");
const cors     = require("cors");
require("dotenv").config();

const { Course, Student } = require("./models");

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

// --- COURSE APIs ---
app.post("/course", async (req, res) => {
  try {
    const b = req.body;
    const course = await Course.create({
      title:       (b.title       || "").trim(),
      instructor:  (b.instructor  || "").trim(),
      category:    (b.category    || "").trim(),
      videoUrl:    (b.videoUrl    || "").trim(),
      description: (b.description || "").trim(),
    });
    res.json(course);
  } catch (err) {
    res.status(400).json({ message: "Could not add course", error: err.message });
  }
});

app.get("/courses", async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: "Could not fetch courses" });
  }
});

// --- STUDENT APIs ---
app.post("/student", async (req, res) => {
  try {
    const b = req.body;
    const student = await Student.create({
      studentName: (b.studentName || "").trim(),
      email:       (b.email       || "").trim(),
      courseName:  (b.courseName  || "").trim(),
      progress:    Number(b.progress || 0),
    });
    res.json(student);
  } catch (err) {
    res.status(400).json({ message: "Could not enroll student", error: err.message });
  }
});

app.get("/students", async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: "Could not fetch students" });
  }
});

// Health check (optional but helpful in exams)
app.get("/", (req, res) => res.send("E-Learning API Running"));

connectDB()
  .then(() => {
    const port = process.env.PORT || 5000;
    app.listen(port, () => console.log("Server running on port", port));
  })
  .catch((err) => {
    console.log("DB connection error:", err.message);
  });
