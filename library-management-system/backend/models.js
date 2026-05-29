const mongoose = require("mongoose");

// QUICK EXAM EDIT:
// Add/remove fields here if your practical question changes.
const detailsSchema = new mongoose.Schema(
  {
    bookTitle: { type: String, default: "" },
    author: { type: String, default: "" },
    category: { type: String, default: "" },
    isbn: { type: String, default: "" },
    available: { type: Boolean, default: true },
    studentName: { type: String, default: "" },
    studentRollNo: { type: String, default: "" },
    issueDate: { type: String, default: "" },
    returnDate: { type: String, default: "" },
    status: { type: String, default: "" }
  },
  { timestamps: true, collection: "details" }
);

module.exports = mongoose.model("Detail", detailsSchema);
