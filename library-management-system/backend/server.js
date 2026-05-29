const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const Detail = require("./models");

const app = express();
app.use(cors());
app.use(express.json());

// QUICK EXAM EDIT:
// Change PORT and MONGO_URI in backend/.env only.
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("DB Error:", err.message));

// Add book (librarian use)
app.post("/book", async (req, res) => {
  try {
    const data = req.body;
    const book = await Detail.create({
      bookTitle: data.bookTitle,
      author: data.author,
      category: data.category,
      isbn: data.isbn,
      available: data.available !== false
    });
    res.json(book);
  } catch (err) {
    res.status(400).json({ message: "Could not add book", error: err.message });
  }
});

// List + search books
app.get("/books", async (req, res) => {
  try {
    const { bookTitle = "", author = "", category = "" } = req.query;
    const books = await Detail.find({
      studentName: "",
      bookTitle: new RegExp(bookTitle, "i"),
      author: new RegExp(author, "i"),
      category: new RegExp(category, "i")
    }).sort({ createdAt: -1 });
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: "Could not fetch books" });
  }
});

// Update book details or availability
app.put("/book/:id", async (req, res) => {
  try {
    const book = await Detail.findById(req.params.id);
    if (!book || book.studentName) {
      return res.status(404).json({ message: "Book not found" });
    }

    book.bookTitle = req.body.bookTitle ?? book.bookTitle;
    book.author = req.body.author ?? book.author;
    book.category = req.body.category ?? book.category;
    book.isbn = req.body.isbn ?? book.isbn;
    book.available = req.body.available !== undefined ? req.body.available : book.available;

    await book.save();
    res.json(book);
  } catch (err) {
    res.status(400).json({ message: "Could not update book", error: err.message });
  }
});

// Issue book to student
app.post("/issue", async (req, res) => {
  try {
    const { bookId, studentName, studentRollNo, issueDate, returnDate } = req.body;
    const book = await Detail.findById(bookId);
    if (!book || !book.bookTitle || book.studentName) {
      return res.status(404).json({ message: "Book not found" });
    }
    if (!book.available) {
      return res.status(400).json({ message: "Book is not available" });
    }

    book.available = false;
    await book.save();

    // Keep issue record as a NEW document in same collection "details"
    const issue = await Detail.create({
      bookTitle: book.bookTitle,
      author: book.author,
      category: book.category,
      isbn: book.isbn,
      available: false,
      studentName,
      studentRollNo,
      issueDate,
      returnDate,
      status: "Issued"
    });

    res.json(issue);
  } catch (err) {
    res.status(400).json({ message: "Issue failed", error: err.message });
  }
});

// Track issued books and return dates
app.get("/issues", async (req, res) => {
  try {
    const issues = await Detail.find({ studentName: { $ne: "" } }).sort({ createdAt: -1 });
    res.json(issues);
  } catch (err) {
    res.status(500).json({ message: "Could not fetch issued books" });
  }
});

// Mark issued book returned
app.put("/issue/:id", async (req, res) => {
  try {
    const issue = await Detail.findById(req.params.id);
    if (!issue || !issue.studentName) {
      return res.status(404).json({ message: "Issue record not found" });
    }

    issue.status = req.body.status || "Returned";
    await issue.save();

    const book = await Detail.findOne({ isbn: issue.isbn, studentName: "" });
    if (book && issue.status === "Returned") {
      book.available = true;
      await book.save();
    }

    res.json(issue);
  } catch (err) {
    res.status(400).json({ message: "Could not update return status", error: err.message });
  }
});

app.get("/", (req, res) => res.send("Library Management API Running"));

app.listen(process.env.PORT, () => {
  console.log("Server running on port", process.env.PORT);
});
