const mongoose = require("mongoose");
require("dotenv").config();

const { Question, Result } = require("./models");

// QUICK EDIT FOR EXAM:
// - Modify questions array to match your practical question's subject/topic.

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await Question.deleteMany({});
    await Result.deleteMany({});

    const questions = [
      {
        question:      "Which layer of OSI model is responsible for routing?",
        option1:       "Data Link Layer",
        option2:       "Network Layer",
        option3:       "Transport Layer",
        option4:       "Session Layer",
        correctAnswer: "option2",
        subject:       "Computer Networks",
      },
      {
        question:      "Which data structure uses LIFO (Last In First Out) order?",
        option1:       "Queue",
        option2:       "Linked List",
        option3:       "Stack",
        option4:       "Tree",
        correctAnswer: "option3",
        subject:       "Data Structures",
      },
      {
        question:      "Which SQL command is used to retrieve data from a table?",
        option1:       "INSERT",
        option2:       "UPDATE",
        option3:       "DELETE",
        option4:       "SELECT",
        correctAnswer: "option4",
        subject:       "Database Management",
      },
      {
        question:      "What does CPU stand for?",
        option1:       "Central Processing Unit",
        option2:       "Core Processing Unit",
        option3:       "Central Program Utility",
        option4:       "Computer Processing Unit",
        correctAnswer: "option1",
        subject:       "Computer Organization",
      },
      {
        question:      "Which of the following is NOT a JavaScript data type?",
        option1:       "String",
        option2:       "Boolean",
        option3:       "Float",
        option4:       "Undefined",
        correctAnswer: "option3",
        subject:       "Web Technology",
      },
    ];

    await Question.insertMany(questions);

    // QUICK EDIT FOR EXAM:
    // - Change sample student names/scores if needed for viva demo.
    const sampleResults = [
      { studentName: "Rahul Patil",   subject: "Computer Networks",    score: 4, totalQuestions: 5 },
      { studentName: "Sneha Joshi",   subject: "Data Structures",      score: 3, totalQuestions: 5 },
      { studentName: "Amit Sharma",   subject: "Database Management",  score: 5, totalQuestions: 5 },
    ];

    await Result.insertMany(sampleResults);
    console.log("Sample Question Data Inserted");
    console.log("Sample Result Data Inserted");
    process.exit(0);
  } catch (err) {
    console.log("Seed failed:", err.message);
    process.exit(1);
  }
}

seed();
