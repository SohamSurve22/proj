const mongoose = require("mongoose");
require("dotenv").config();
const Detail = require("./models");

const sampleBooks = [
  { bookTitle: "Clean Code", author: "Robert C. Martin", category: "Programming", isbn: "9780132350884", available: true },
  { bookTitle: "Database System Concepts", author: "Silberschatz", category: "Database", isbn: "9780073523323", available: true },
  { bookTitle: "Let Us C", author: "Yashavant Kanetkar", category: "Programming", isbn: "9788183331630", available: true },
  { bookTitle: "Operating System Concepts", author: "Silberschatz", category: "Operating System", isbn: "9781118063330", available: true },
  { bookTitle: "Computer Networks", author: "Andrew S. Tanenbaum", category: "Networking", isbn: "9780132126953", available: true }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Detail.deleteMany({});
    await Detail.insertMany(sampleBooks);
    console.log("Sample Book Data Inserted");
  } catch (err) {
    console.log("Seed Error:", err.message);
  } finally {
    await mongoose.connection.close();
  }
}

seed();
