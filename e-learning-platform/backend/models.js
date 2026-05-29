const mongoose = require("mongoose");

// QUICK EDIT FOR EXAM:
// - Add/remove fields here if your practical question changes.

const CourseSchema = new mongoose.Schema(
  {
    title:       { type: String, required: true },
    instructor:  { type: String, required: true },
    category:    { type: String, required: true }, // e.g. "Web Dev", "Data Science"
    videoUrl:    { type: String, required: true }, // YouTube or any URL
    description: { type: String, required: true },
  },
  { timestamps: true }
);

const StudentSchema = new mongoose.Schema(
  {
    studentName: { type: String, required: true },
    email:       { type: String, required: true },
    courseName:  { type: String, required: true }, // course title stored as string
    progress:    { type: Number, required: true, min: 0, max: 100 }, // percentage 0-100
  },
  { timestamps: true }
);

const Course  = mongoose.model("Course",  CourseSchema);
const Student = mongoose.model("Student", StudentSchema);

module.exports = { Course, Student };
